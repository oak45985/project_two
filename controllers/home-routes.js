const router = require('express').Router();
const { Dj } = require('../models');
// Import the custom middleware
// const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbDjData = await Dj.findAll({
      include: [
        {
          model: song,
          attributes: ['title', 'bpm'],
        },
      ],
    });

    const djs = dbDjData.map((dj) =>
      dj.get({ plain: true })
    );

    res.render('/homepage', { djs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one gallery
// // Use the custom middleware before allowing the user to access the gallery
// router.get('/dj/:id', async (req, res) => {
//   try {
//     const dbDjData = await Dj.findByPk(req.params.id, {
//       include: [
//         {
//           model: song,
//           attributes: [
//             'id',
//             'song_url',
//             'title',
//             'bpm',
//             'key'
//           ],
//         },
//       ],
//     });

//     const dj = dbDjData.get({ plain: true });
//     res.render('djs', { dj });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;