const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Dj extends Model {}

Dj.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dj_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dj_webpage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl:true
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'dj'
    }
);

Dj.bulkCreate([
    {dj_name: "Chip Hvzvrd", dj_webpage: "https://soundcloud.com/chiphvzvrd"},
    {dj_name: "STRYTLLR", dj_webpage: "https://soundcloud.com/imstrytllr"},
    {dj_name: "CHiP", dj_webpage: "https://soundcloud.com/chippena"},
    {dj_name: "UNICHORD", dj_webpage: "https://soundcloud.com/unichordofficial"},
    {dj_name: "SinSaySays", dj_webpage: "https://soundcloud.com/sinsaysays"},
]);

module.exports = Dj;