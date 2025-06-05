import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../app.js';
import User from '../models/user.js';
import * as dbHandler from './db-handler.js';

describe('Auth Routes', () => {
	beforeAll(async () => {
		await dbHandler.connect();
	});

	beforeEach(async () => {
		await dbHandler.clearDatabase();
	});

	afterAll(async () => {
		await dbHandler.closeDatabase();
	});

	describe('GET /api/auth/me', () => {
		it('should return 401 for unauthenticated user', async () => {
			const res = await request(app).get('/api/auth/me');
			expect(res.status).toBe(401);
		});

		it('should return user data when authenticated', async () => {
			// Create a user and simulate login session
			const hashedPassword = bcrypt.hashSync('testpass', 10);
			const user = await User.create({
				username: 'testuser',
				password: hashedPassword
			});

			const agent = request.agent(app);
			await agent
				.post('/api/auth/login')
				.send({ username: 'testuser', password: 'testpass' });

			const res = await agent.get('/api/auth/me');
			expect(res.status).toBe(200);
			expect(res.body.username).toBe('testuser');
		});
	});

	describe('POST /api/auth/login', () => {
		beforeEach(async () => {
			const hashedPassword = bcrypt.hashSync('testpass', 10);
			await User.create({
				username: 'testuser',
				password: hashedPassword
			});
		});

		it('should login with valid credentials', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ username: 'testuser', password: 'testpass' });

			expect(res.status).toBe(200);
			expect(res.body.username).toBe('testuser');
		});

		it('should return 404 for non-existent user', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ username: 'nonexistent', password: 'password' });

			expect(res.status).toBe(404);
		});

		it('should return 401 for invalid password', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ username: 'testuser', password: 'wrongpass' });

			expect(res.status).toBe(401);
		});

		it('should return 422 for missing credentials', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ username: '', password: '' });

			expect(res.status).toBe(422);
		});
	});

	describe('POST /api/auth/signup', () => {
		it('should create new user with valid data', async () => {
			const res = await request(app)
				.post('/api/auth/signup')
				.send({ username: 'newuser', password: 'newpass' });

			expect(res.status).toBe(200);
			expect(res.body.username).toBe('newuser');

			// Verify user was created in database
			const user = await User.findOne({ username: 'newuser' });
			expect(user).toBeTruthy();
		});

		it('should return 422 for duplicate username', async () => {
			// Create existing user
			await User.create({
				username: 'existinguser',
				password: 'hashedpass'
			});

			const res = await request(app)
				.post('/api/auth/signup')
				.send({ username: 'existinguser', password: 'newpass' });

			expect(res.status).toBe(422);
		});

		it('should return 422 for invalid data', async () => {
			const res = await request(app)
				.post('/api/auth/signup')
				.send({ username: '', password: '' });

			expect(res.status).toBe(422);
		});
	});

	describe('POST /api/auth/logout', () => {
		it('should logout authenticated user', async () => {
			// Create and login user
			const hashedPassword = bcrypt.hashSync('testpass', 10);
			await User.create({
				username: 'testuser',
				password: hashedPassword
			});

			const agent = request.agent(app);
			await agent
				.post('/api/auth/login')
				.send({ username: 'testuser', password: 'testpass' });

			const res = await agent.post('/api/auth/logout');
			expect(res.status).toBe(204);
		});

		it('should return 401 for unauthenticated user', async () => {
			const res = await request(app).post('/api/auth/logout');
			expect(res.status).toBe(401);
		});
	});

	describe('GET /api/auth/private', () => {
		it('should return private message for authenticated user', async () => {
			// Create and login user
			const hashedPassword = bcrypt.hashSync('testpass', 10);
			await User.create({
				username: 'testuser',
				password: hashedPassword
			});

			const agent = request.agent(app);
			await agent
				.post('/api/auth/login')
				.send({ username: 'testuser', password: 'testpass' });

			const res = await agent.get('/api/auth/private');
			expect(res.status).toBe(200);
			expect(res.body.message).toBe('This is a private message');
		});

		it('should return 401 for unauthenticated user', async () => {
			const res = await request(app).get('/api/auth/private');
			expect(res.status).toBe(401);
		});
	});
});
