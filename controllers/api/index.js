const router = require('express').Router();

const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');
const artistRoutes = require('./artist-routes');
const djRoutes = require('./dj-routes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);
router.use('/artists', artistRoutes);
router.use('/djs', djRoutes);

module.exports = router;