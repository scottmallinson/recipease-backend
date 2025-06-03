const request = require('supertest');
const { ObjectId } = require('mongodb');
const app = require('../app');
const User = require('../models/user');
const dbHandler = require('./db-handler');

describe('User Routes', () => {
    beforeAll(async () => {
        await dbHandler.connect();
    });

    beforeEach(async () => {
        await dbHandler.clearDatabase();
    });

    afterAll(async () => {
        await dbHandler.closeDatabase();
    });

    describe('GET /api/user/profile/:id', () => {
        it('should return user profile with populated recipes', async () => {
            const user = await User.create({
                username: 'testuser',
                password: 'hashedpass',
                displayName: 'Test User',
                biography: 'Test bio'
            });

            const res = await request(app).get(`/api/user/profile/${user._id}`);
            expect(res.status).toBe(200);
            expect(res.body.username).toBe('testuser');
            expect(res.body.displayName).toBe('Test User');
        });

        it('should return 404 for non-existent user', async () => {
            const nonExistentId = new ObjectId();
            const res = await request(app).get(`/api/user/profile/${nonExistentId}`);
            expect(res.status).toBe(404);
        });
    });

    describe('GET /api/user/:id', () => {
        it('should return user data by id', async () => {
            const user = await User.create({
                username: 'testuser',
                password: 'hashedpass',
                displayName: 'Test User'
            });

            const res = await request(app).get(`/api/user/${user._id}`);
            expect(res.status).toBe(200);
            expect(res.body.username).toBe('testuser');
        });

        it('should handle invalid user id', async () => {
            const res = await request(app).get('/api/user/invalidid');
            expect(res.status).toBe(500); // Invalid ObjectId format
        });
    });

    describe('PUT /api/user/:id', () => {
        it('should update user profile', async () => {
            const user = await User.create({
                username: 'testuser',
                password: 'hashedpass'
            });

            const updateData = {
                _id: user._id,
                displayName: 'Updated Name',
                biography: 'Updated bio',
                measurements: 'Imperial'
            };

            const res = await request(app)
                .put(`/api/user/${user._id}`)
                .send(updateData);

            expect(res.status).toBe(200);
            expect(res.body.displayName).toBe('Updated Name');
            expect(res.body.biography).toBe('Updated bio');
            expect(res.body.measurements).toBe('Imperial');
        });
    });

    describe('PUT /api/user/pantry', () => {
        it('should update user pantry', async () => {
            const user = await User.create({
                username: 'testuser',
                password: 'hashedpass'
            });

            const pantryData = {
                _id: user._id,
                pantry: [
                    { item: 'Flour', quantity: '2kg' },
                    { item: 'Sugar', quantity: '1kg' }
                ]
            };

            const res = await request(app)
                .put('/api/user/pantry')
                .send(pantryData);

            expect(res.status).toBe(200);
            expect(res.body.pantry).toHaveLength(2);
            expect(res.body.pantry[0].item).toBe('Flour');
            expect(res.body.pantry[1].item).toBe('Sugar');
        });

        it('should handle invalid user id for pantry update', async () => {
            const pantryData = {
                _id: 'invalidid',
                pantry: [{ item: 'Flour', quantity: '2kg' }]
            };

            const res = await request(app)
                .put('/api/user/pantry')
                .send(pantryData);

            expect(res.status).toBe(500); // Invalid ObjectId
        });
    });

    describe('DELETE /api/user/delete', () => {
        it('should delete user account', async () => {
            const user = await User.create({
                username: 'testuser',
                password: 'hashedpass'
            });

            const res = await request(app)
                .delete('/api/user/delete')
                .send({ id: user._id });

            expect(res.status).toBe(204);

            // Verify user was deleted
            const deletedUser = await User.findById(user._id);
            expect(deletedUser).toBeNull();
        });

        it('should return 404 for non-existent user deletion', async () => {
            const nonExistentId = new ObjectId();
            const res = await request(app)
                .delete('/api/user/delete')
                .send({ id: nonExistentId });

            expect(res.status).toBe(404);
        });
    });
});
