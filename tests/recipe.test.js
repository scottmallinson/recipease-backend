import request from 'supertest';
import { ObjectId } from 'mongodb';
import app from '../app.js';
import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import * as dbHandler from './db-handler.js';

describe('Recipe Routes', () => {
	beforeAll(async () => {
		await dbHandler.connect();
	});

	beforeEach(async () => {
		await dbHandler.clearDatabase();
	});

	afterAll(async () => {
		await dbHandler.closeDatabase();
	});

	describe('GET /api/recipes', () => {
		it('should return all recipes', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			await Recipe.create({
				creatorId: user._id,
				name: 'Test Recipe',
				description: 'Test description',
				duration: 30,
				servings: 4,
				ingredients: [{ name: 'Flour', quantity: '200g' }],
				instructions: ['Mix ingredients']
			});

			const res = await request(app).get('/api/recipes');
			expect(res.status).toBe(200);
			expect(res.body).toHaveLength(1);
			expect(res.body[0].name).toBe('Test Recipe');
		});
	});

	describe('GET /api/recipes/:id', () => {
		it('should return recipe by id with populated creator', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			const recipe = await Recipe.create({
				creatorId: user._id,
				name: 'Test Recipe',
				description: 'Test description',
				duration: 30,
				servings: 4,
				ingredients: [{ name: 'Flour', quantity: '200g' }],
				instructions: ['Mix ingredients']
			});

			const res = await request(app).get(`/api/recipes/${recipe._id}`);
			expect(res.status).toBe(200);
			expect(res.body.name).toBe('Test Recipe');
		});

		it('should handle invalid recipe id', async () => {
			const res = await request(app).get('/api/recipes/invalidid');
			expect(res.status).toBe(500); // Invalid ObjectId format
		});
	});

	describe('POST /api/recipes/create', () => {
		it('should create a new recipe', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			const recipeData = {
				creatorId: user._id,
				name: 'New Recipe',
				description: 'A delicious recipe',
				photoUrl: 'http://example.com/photo.jpg',
				duration: 45,
				ingredients: [
					{ name: 'Flour', quantity: '300g' },
					{ name: 'Sugar', quantity: '200g' }
				],
				instructions: ['Step 1', 'Step 2'],
				servings: 6
			};

			const res = await request(app)
				.post('/api/recipes/create')
				.send(recipeData);

			expect(res.status).toBe(200);
			expect(res.body.name).toBe('New Recipe');
			expect(res.body.duration).toBe(45);
			expect(res.body.servings).toBe(6);

			// Verify recipe was added to user's createdRecipes
			const updatedUser = await User.findById(user._id);
			expect(updatedUser.createdRecipes).toHaveLength(1);
		});

		it('should handle missing required fields', async () => {
			const incompleteData = {
				name: 'Incomplete Recipe'
				// Missing required fields like creatorId, description, etc.
			};

			const res = await request(app)
				.post('/api/recipes/create')
				.send(incompleteData);

			expect(res.status).toBe(500); // Validation error
		});
	});

	describe('PUT /api/recipes/update', () => {
		it('should update existing recipe', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			const recipe = await Recipe.create({
				creatorId: user._id,
				name: 'Original Recipe',
				description: 'Original description',
				duration: 30,
				servings: 4,
				ingredients: [{ name: 'Flour', quantity: '200g' }],
				instructions: ['Original step']
			});

			const updateData = {
				_id: recipe._id,
				name: 'Updated Recipe',
				description: 'Updated description',
				duration: 45,
				servings: 6,
				ingredients: [{ name: 'Updated Flour', quantity: '300g' }],
				instructions: ['Updated step']
			};

			const res = await request(app)
				.put('/api/recipes/update')
				.send(updateData);

			expect(res.status).toBe(200);
			expect(res.body.name).toBe('Updated Recipe');
			expect(res.body.duration).toBe(45);
		});
	});

	describe('DELETE /api/recipes/:id', () => {
		it('should delete recipe', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			const recipe = await Recipe.create({
				creatorId: user._id,
				name: 'Recipe to Delete',
				description: 'Will be deleted',
				duration: 30,
				servings: 4,
				ingredients: [{ name: 'Flour', quantity: '200g' }],
				instructions: ['Step 1']
			});

			const res = await request(app).delete(`/api/recipes/${recipe._id}`);
			expect(res.status).toBe(204);

			// Verify recipe was deleted
			const deletedRecipe = await Recipe.findById(recipe._id);
			expect(deletedRecipe).toBeNull();
		});

		it('should return 404 for non-existent recipe', async () => {
			const nonExistentId = new ObjectId();
			const res = await request(app).delete(`/api/recipes/${nonExistentId}`);
			expect(res.status).toBe(404);
		});
	});

	describe('PUT /api/recipes/save', () => {
		it('should save recipe to user favorites', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			const recipe = await Recipe.create({
				creatorId: user._id,
				name: 'Recipe to Save',
				description: 'Favorite recipe',
				duration: 30,
				servings: 4,
				ingredients: [{ name: 'Flour', quantity: '200g' }],
				instructions: ['Step 1']
			});

			const res = await request(app)
				.put('/api/recipes/save')
				.send({ recipeId: recipe._id, userId: user._id });

			expect(res.status).toBe(200);
			expect(res.body.savedRecipes).toContain(recipe._id.toString());
		});
	});

	describe('PUT /api/recipes/unsave', () => {
		it('should remove recipe from user favorites', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			const recipe = await Recipe.create({
				creatorId: user._id,
				name: 'Recipe to Unsave',
				description: 'Will be unsaved',
				duration: 30,
				servings: 4,
				ingredients: [{ name: 'Flour', quantity: '200g' }],
				instructions: ['Step 1']
			});

			// First save the recipe
			await User.findByIdAndUpdate(user._id, { $push: { savedRecipes: recipe._id } });

			// Then unsave it
			const res = await request(app)
				.put('/api/recipes/unsave')
				.send({ recipeId: recipe._id, userId: user._id });

			expect(res.status).toBe(200);
			expect(res.body.savedRecipes).not.toContain(recipe._id.toString());
		});
	});

	describe('GET /api/recipes/search', () => {
		it('should search recipes by text query', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			await Recipe.create({
				creatorId: user._id,
				name: 'Chocolate Cake',
				description: 'Delicious chocolate dessert',
				duration: 60,
				servings: 8,
				ingredients: [{ name: 'Chocolate', quantity: '200g' }],
				instructions: ['Melt chocolate']
			});

			const res = await request(app)
				.get('/api/recipes/search')
				.query({ s: 'chocolate' });

			expect(res.status).toBe(200);
			expect(res.body).toHaveLength(1);
			expect(res.body[0].name).toBe('Chocolate Cake');
		});
	});

	describe('POST /api/recipes/search', () => {
		it('should search recipes by ingredients', async () => {
			const user = await User.create({
				username: 'testuser',
				password: 'hashedpass'
			});

			await Recipe.create({
				creatorId: user._id,
				name: 'Flour Recipe',
				description: 'Recipe with flour',
				duration: 30,
				servings: 4,
				ingredients: [
					{ name: 'Flour', quantity: '200g' },
					{ name: 'Sugar', quantity: '100g' }
				],
				instructions: ['Mix ingredients']
			});

			const res = await request(app)
				.post('/api/recipes/search')
				.send({ selectedIngredients: ['flour', 'sugar'] });

			expect(res.status).toBe(200);
			expect(res.body).toHaveLength(1);
		});
	});
});
