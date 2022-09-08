const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model {
    static dolike(body, models){
        return models.Like.create({
            user_id: body.user_id,
            song_id: body.song_id
        }).then(() => {
            return Song.findOne({
                where: {
                    id: body.song_id
                },
                attributes: [
                    'id',
                    'song_url',
                    'title',
                    'bpm',
                    'key'
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM like WHERE song.id = like.song_id)'),
                        'like_count'
                    ]
                ]
            });
        });
    }
}

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bpm: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        artist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'artist',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'song'
    }
);

// Song.bulkCreate([
//     {song_url: "https://soundcloud.com/unichordofficial/by-your-side", title: "UNICHORD - By Your Side", bpm: "150", key: "E major"},
//     {song_url: "https://soundcloud.com/chiphvzvrd/bvller", title: "CHIP HVZVRD - BVLLER", bpm: "128", key: "G major"},
//     {song_url: "https://soundcloud.com/chippena/chp-frend", title: "CHiP - FRiEND", bpm: "150", key: "D major"}
// ]);

module.exports = Song;