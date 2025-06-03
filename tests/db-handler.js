const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

module.exports.connect = async () => {
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

module.exports.clearDatabase = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
};
