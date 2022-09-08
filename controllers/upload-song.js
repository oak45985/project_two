const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Like, Artist } = require('../models');
const checkAuth = require('../utils/auth');

router.get('/', checkAuth, (req, res) => {
    Artist.findAll({
        order: [['artist_name', 'DESC']],
        attributes: [
            'id',
            'artist_name',
            'artist_webpage'
        ],
    })
    .then(dbArtistData => {
        const artists = dbArtistData.map(artist => artist.get({ plain: true }));
        res.render('uploadsong', { artists, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', checkAuth, (req, res) => {
    Song.create({
        title: req.body.title,
        bpm: req.body.bpm,
        key: req.body.key,
        mood: req.body.mood,
        user_id: req.session.user_id,
        artist_id: req.body.artist_id
    })
    .then(dbSongData => res.json(dbSongData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;