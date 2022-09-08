const router = require('express').Router();
const apiRoutes = require('./api');
const profileRoutes = require('./profile-routes');
const artistRoutes = require('./artistlist-routes');
const homepageRoutes = require('./homepage-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/artists', artistRoutes);
router.use('./djs', homepageRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;