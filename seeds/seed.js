const mongoose = require('mongoose');
const { User, Thought } = require('../models');

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

    const createdUsers = await User.insertMany(users);
    const thought = await Thought.find();
    console.log(thought[0]._id)
    for (let i = 0; i < thought.length; i++) {
      let userName = thought[i].userName
      await User.findOneAndUpdate({ userName }, { $push: { thoughts: thought[i]._id } }, { new: true })
    }
    const user = await User.find()
      console.log(user[Math.floor(Math.random()*user.length)]._id)
    for (let i = 0; i < user.length; i++) {
      await User.findOneAndUpdate({ _id:user[i]._id}, { $push:{friends:user[Math.floor(Math.random()*user.length)]._id }}, {new:true})
    }
    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close DB connection
    mongoose.connection.close();
  }
}

seed();
