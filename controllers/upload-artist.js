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
        include: [
            {
                model: Song,
                attributes: ['id', 'title', 'bpm', 'key', 'mood',
                // [sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
                //     'like_count']
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbArtistData => {
        const artists = dbArtistData.map(artist => artist.get({ plain: true }));
        res.render('uploadartist', {
            artists,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', checkAuth, (req, res) => {
    Artist.create({
        artist_name: req.body.artist_name,
        artist_webpage: req.body.artist_webpage,
        user_id: req.session.user_id
    })
    .then(dbArtistData => res.json(dbArtistData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;