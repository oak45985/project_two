const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        artist_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        artist_webpage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl:true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'id'
            }
        },
        song_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'song',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'artist'
    }
)

// Artist.bulkCreate([
//     {artist_name: "Don Diablo", artist_webpage: "dondiablo.com"},
//     {artist_name: "John Summit", artist_webpage: "johnsummit.com"},
//     {artist_name: "Above & Beyond", artist_webpage: "Aboveandbeyond.com"},
// ]);

module.exports = Artist;