const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const mongoDBConnectionString = process.env.MONGODB_URI;

let db;
let usersCollection;

module.exports.connect = async function () {
    try {
        console.log(mongoDBConnectionString);
        const client = await MongoClient.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db();
        usersCollection = db.collection('bts530'); // Change collection name here
        console.log('Connected to MongoDB yayyyy');
        console.log(mongoDBConnectionString);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports.registerUser = async function (userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await usersCollection.insertOne({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        });
        console.log('User successfully registered');
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

module.exports.checkUser = async function (email, password) {
    try {
        const user = await usersCollection.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        return user;
    } catch (error) {
        console.error('Error checking user:', error);
        throw error;
    }
};
