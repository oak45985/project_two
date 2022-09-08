const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Song, User, Like, Artist } = require('../../models');
const checkAuth = require('../../utils/auth');

//GET ALL SONGS
router.get('/', (req, res) => {
    Song.findAll({
        order: [['title','DESC']],
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
    .then(dbSongData => res.json(dbSongData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET ONE SONG
router.get('/:id', (req, res) => {
    Song.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: ['artist_name']
            },
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
        res.json(dbSongData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//CREATE SONG
router.post('/', checkAuth, (req, res) => {
    Artist.create({
        artist_name: req.body.artist_name,
        artist_webpage: req.body.artist_webpage
    })
    .then(dbArtistData => {
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
    }
    );
});

//PUT GIVE A LIKE
router.put('/like', checkAuth, (req, res) => {
    if(req.session) {
        Song.dolike({ ...req.body, user_id: req.session.user_id }, { Like, User, Artist })
        .then(updatedSongData => res.json(updatedSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.put('/:id', checkAuth, (req, res) => {
    Song.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbSongData => {
        if(!dbSongData) {
            res.status(404).json({ message: "No Song matches this ID" });
            return;
        }
        res.json(dbSongData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE ONE SONG
router.delete('/:id', checkAuth, (req, res) => {
    Song.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbSongData => {
        if(!dbSongData) {
            res.status(404).json({ message: "No song matches ID" });
            return;
        }
        res.json(dbSongData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;