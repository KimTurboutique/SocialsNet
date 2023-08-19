const { User, Thought } = require('../models');


module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')

      if (!thought) {
        return res.status(404).json({ message: 'No thought that ID' })
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
 
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate({userName: req.body.userName}, {$push: {thoughts:thought._id}}, {new:true})
      if (!user){
        return res.status(404).json({ message: 'Thought created but no such user exists' });
      }
      res.json('thought created successfully!');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      const user = await User.findOneAndUpdate({userName: thought.userName}, {$pull: {thoughts: req.params.thoughtId}}, {new: true})
      if (!user){
        return res
        .status(404)
        .json({ message: 'Thought deleted but no user found with that ID :(' });
      }  
      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req,res) {
    try {
      const thought= await thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {runValidators: true, new: true})
      if (!thought){
        return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
      }res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
  },  

  async addReaction(req, res) {

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.params.reactionId} } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
