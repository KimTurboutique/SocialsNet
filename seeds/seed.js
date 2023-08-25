const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB database connection
mongoose.connect('mongodb://localhost/socialsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Users
const users = [
  {
    userName: 'user1',
    email: 'user1@example.com',
    thoughts: [],
    friends: [], 
  },
  {
    userName: 'user2',
    email: 'user2@example.com',
    thoughts: [],
    friends: [],
  },
  {
    userName: 'user3',
    email: 'user3@example.com',
    thoughts: [],
    friends: [],
  },
  {
    userName: 'user4',
    email: 'user4@example.com',
    thoughts: [],
    friends: [],
  },
  {
    userName: 'user5',
    email: 'user5@example.com',
    thoughts: [],
    friends: [],
  },
];

async function seed() {
  try {
    await User.deleteMany({});

    const createdUsers = await User.create(users);

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close DB connection
    mongoose.connection.close();
  }
}

seed();
