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
        artist_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist_web: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
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
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'song'
    }
);

module.exports = Song;