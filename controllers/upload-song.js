const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Like, Artist } = require('../models');
const checkAuth = require('../utils/auth');

//GET ALL SONGS
router.get('/', checkAuth, (req, res) => {
    Song.findAll({
        order: [['title','ASC']],
        attributes: [
            'id',
            'title',
            'bpm',
            'key',
            'mood',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
            // 'like_count']
        ],
        include: [
            {
                model: Artist,
                attributes: ['id', 'artist_name', 'artist_webpage']
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
    .then(dbSongData => {
        const songs = dbSongData.map(song => song.get({ plain: true }));
        res.render('uploadsong', {
            songs,
            loggedIn: req.session.loggedIn
        });
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
        artist_id: dbArtistData.id
    })
    .then(dbSongData => res.json(dbSongData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;