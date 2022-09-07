const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Like, Artist } = require('../models');

//GET ALL SONGS
router.get('/', (req, res) => {
    Song.findAll({
        order: [['artist_name','ASC']],
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
        res.render('artists', {
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