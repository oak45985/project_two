const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User, Like, Artist } = require('../models');

//GET ALL ARTISTS
router.get('/', (req, res) => {
    Artist.findAll({
        order: [['artist_name', 'DESC']],
        attributes: [
            'id',
            'artist_name',
            'artist_webpage'
        ],
        order: [['title', 'DESC']],
        include: [
            {
                model: Song,
                attributes: ['id', 'title', 'bpm', 'key', 'mood',
                [sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
                    'like_count']
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
        res.render('artistpage', {
            artists,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET ONE ARTIST
router.get('/artist/:id', (req, res) => {
    Artist.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'artist_name',
            'artist_webpage'
        ],
        order: [['title', 'DESC']],
        include: [
            {
                model: Song,
                attributes: ['id', 'title', 'bpm', 'key', 'mood'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbArtistData => {
        if (!dbArtistData) {
            res.status(404).json({ message: 'No Artist matches ID' });
            return;
        }
        const artist = dbArtistData.get({ plain: true });

        res.render('sing-artist', {
            artist,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;