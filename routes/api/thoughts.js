const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtController');
  
  // localhost:3001/api/thoughts
  router.route('/').get(getThoughts).post(createThought);
  
  // /api/thoughts/:thoughtId
  router.route('/:userId').get(getSingleThought).delete(deleteThought);
  
  // /api/thoughts/:thoughtId/update
  router.route('/:thoughtId').put(updateThought);
  
  // /api/thoughts/:thoughtId/reactions
  router.route('/:thoughtId/thoughts').post(addReaction);
  
  // /api/thoughts/:thoughtId/reactions/:reactionId
  router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
  
  module.exports = router;