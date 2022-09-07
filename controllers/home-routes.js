const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Like, Artist } = require('../models');

//GET ALL SONGS
router.get('/home', (req, res) => {
    res.render('home');
  });


router.get('/', (req, res) => {
    Song.findAll({
        order: [['created_at','ASC']],
        attributes: [
            'id',
            'title',
            'bpm',
            'key',
            'mood',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
            'like_count']
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
        res.render('homepage', {
            songs,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//LOGIN
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;