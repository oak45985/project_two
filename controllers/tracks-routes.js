const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Like, Artist } = require('../models');

//GET ALL SONGS
router.get('/', (req, res) => {
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
        res.render('tracks', {
            songs,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;