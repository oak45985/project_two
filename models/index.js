const Song = require('./Song');
const User = require('./User');
const Like = require('./Like');
const Artist = require('./Artist');

User.hasMany(Song, {
    foreignKey: 'user_id'
});

Artist.hasMany(Song, {
    foreignKey: 'artist_id'
});

Song.belongsTo(User, {
    foreignKey: 'user_id'
});

Song.belongsTo(Artist, {
    foreginKey: 'artist_id'
});

User.belongsToMany(Song, {
    through: Like,
    as: 'liked_songs',
    foreignKey: 'user_id'
})

Song.belongsToMany(User, {
    through: Like,
    as: 'liked_songs',
    foreignKey: 'song_id'
});

Like.belongsTo(User, {
    foreignKey: 'user_id'
});

Like.belongsTo(Song, {
    foreignKey: 'song_id'
});

User.hasMany(Like, {
    foreignKey: 'song_id'
});

Song.hasMany(Like, {
    foreignKey: 'song_id'
});

module.exports = { User, Song, Like, Artist }