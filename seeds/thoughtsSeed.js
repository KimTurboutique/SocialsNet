const mongoose = require('mongoose');
const { Thought } = require('../models');

// MongoDB database connection
mongoose.connect('mongodb://localhost/socialsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Thoughts
const thoughts = [
  {
    thoughtText: 'This is thought 1',
    userName: 'user1'
  },
  {
    thoughtText: 'This is thought 2',
    userName: 'user4'
  },
  {
    thoughtText: 'This is thought 3',
    userName: 'user3'
  },
  {
    thoughtText: 'This is thought 4',
    userName: 'user2'
  },
  {
    thoughtText: 'This is thought 5',
    userName: 'user5'
  },
];

async function seed() {
  try {
    await Thought.deleteMany({});

    // Create thoughts
    const createdThoughts = await Thought.insertMany(thoughts);

    console.log('Thought seed data created successfully.');
  } catch (error) {
    console.error('Error seeding thought data:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seed();
