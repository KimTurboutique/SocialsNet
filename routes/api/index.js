const router = require('express').Router();
const userRoutes = require('./users');
const thoughtsRoutes = require('./thoughts');

// localhost:3001/api/users
router.use('/users', userRoutes)
router.use('/thoughts', thoughtsRoutes)

module.exports = router;

// ./ is used to access a file or folder that's in the same folder relative to the file you are importing in

// ../ is used to acces a file  or folder 1 level up from the file you are currently importing in