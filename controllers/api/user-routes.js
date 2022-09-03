const router = require('express').Router();
const { User, Song, Like, Artist } = require('../../models');
const checkAuth = require('../../utils/auth');

//GET ALL USERS
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET ONE USER
router.get('/:id', (req, res) => {
    User.findOne({ 
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Song,
                attributes: ['id', 'title', 'bpm', 'key', 'mood', 'created_at'],
                include: {
                    Model: Artist,
                    attributes: ['artist_name']
                }
            },
            {
                model: Song,
                attributes: ['id', 'title'],
                through: Like,
                as: 'liked_songs' 
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with ID" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});