import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod;
let isConnected = false;

export const connect = async () => {
	// Reuse existing connection if already connected
	if (isConnected && mongoose.connection.readyState === 1) {
		return;
	}

	try {
		// Configure MongoDB Memory Server for better performance
		mongod = await MongoMemoryServer.create({
			binary: {
				skipMD5: true, // Skip MD5 verification for faster startup
			},
			instance: {
				dbName: 'test',
				storageEngine: 'ephemeralForTest', // Faster in-memory storage
			},
		});

		const uri = mongod.getUri();

		// Optimize Mongoose connection options for testing
		await mongoose.connect(uri, {
			maxPoolSize: 5, // Limit connection pool for tests
			serverSelectionTimeoutMS: 5000, // Reduce timeout
			socketTimeoutMS: 10000, // Reduce socket timeout
		});

		isConnected = true;
	} catch (error) {
		console.error('Database connection error:', error);
		throw error;
	}
};

export const closeDatabase = async () => {
	if (!isConnected) return;

	try {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		if (mongod) {
			await mongod.stop();
		}
		isConnected = false;
	} catch (error) {
		console.error('Database close error:', error);
		throw error;
	}
};

export const clearDatabase = async () => {
	if (!isConnected) return;

	try {
		const collections = mongoose.connection.collections;

		// Use Promise.all for parallel deletion - much faster
		const promises = Object.keys(collections).map(key =>
			collections[key].deleteMany({})
		);

		await Promise.all(promises);
	} catch (error) {
		console.error('Database clear error:', error);
		throw error;
	}
};
