const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
//comment back in when done with thought controller and routes
//router.use('/thoughts', thoughtRoutes);

module.exports = router;
