const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const artistRoutes = require('./artistlist-routes');
const tracksRoutes = require('./tracks-routes');
const uploadArtist = require('./upload-artist');
const uploadSong = require('./upload-song');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/artists', artistRoutes);
router.use('/tracks', tracksRoutes);
router.use('/uploadartist', uploadArtist);
router.use('/uploadsong', uploadSong);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;