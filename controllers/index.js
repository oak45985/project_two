const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const artistRoutes = require('./artistlist-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/artistupload', artistRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;