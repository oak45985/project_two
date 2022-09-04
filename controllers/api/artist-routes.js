const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Like, Artist, Song } = require('../../models');
const checkAuth = require('../../utils/auth');

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
                attributes: ['id', 'title', 'bpm', 'key', 'mood'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbArtistData => res.json(dbArtistData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET ONE ARTIST
router.get('/:id', (req, res) => {
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
        res.json(dbArtistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//CREATE AN ARTIST
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

router.delete('/:id', checkAuth, (req, res) => {
    Artist.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbArtistData => {
        if (!dbArtistData) {
            res.status(404).json({ message: 'No Artist matches ID' });
            return;
        }
        res.json(dbArtistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;