const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Song, Artist } = require('../models');
const checkAuth = require('../utils/auth');

//GET ALL SONGS
router.get('/', checkAuth, (req, res) => {
    Song.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['title','DESC']],
        attributes: [
            'id',
            'title',
            'artist_name',
            'artist_web',
            'bpm',
            'key',
            'mood',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
            // 'like_count']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
    .then(dbSongData => {
        const songs = dbSongData.map(song => song.get({ plain: true }));
        res.render('profile', { songs, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET ONE SONG
router.get('/song/:id', checkAuth, (req, res) => {
    Song.findOne({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'artist_name',
            'artist_web',
            'bpm',
            'key',
            'mood',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
            // 'like_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbSongData => {
        if(!dbSongData) {
            res.status(404).json({ message: 'No song matches this ID' });
            return;
        }
        const song = dbSongData.get({ plain: true });

        res.render('single-song', {
            song,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;