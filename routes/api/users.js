const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/update
router.route('/:userId').put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend);

module.exports = router;
