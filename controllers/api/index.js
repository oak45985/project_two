const router = require('express').Router();

const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');
const artistRoutes = require('./artist-routes');
const discover = require('./discover-routes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);
router.use('/artists', artistRoutes);

module.exports = router;