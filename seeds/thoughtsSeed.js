const mongoose = require('mongoose');
const Thought = require('./models/Thought');

// MongoDB database connection
mongoose.connect('mongodb://localhost/socialsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Thoughts
const thoughts = [
  {
    content: 'This is thought 1',
  },
  {
    content: 'This is thought 2',
  },
  {
    content: 'This is thought 3',
  },
  {
    content: 'This is thought 4',
  },
  {
    content: 'This is thought 5',
  },
];

async function seed() {
  try {
    await Thought.deleteMany({});

    // Create thoughts
    const createdThoughts = await Thought.create(thoughts);

    console.log('Thought seed data created successfully.');
  } catch (error) {
    console.error('Error seeding thought data:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seed();
