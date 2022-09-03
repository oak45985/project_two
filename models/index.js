const Song = require('./Song');
const User = require('./User');
const Like = require('./Like');
const Artist = require('./Artist');

User.hasMany(Song, {
    foreignKey: 'user_id'
});

Song.belongsTo(User, {
    foreignKey: 'user_id'
});

Artist.hasMany(Song, {
    foreignKey: 'artist_id'
});

Song.belongsToMany(User, {
    through: Like,
    as: 'liked_songs',
    foreignKey: 'song_id'
});

