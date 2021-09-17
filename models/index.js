const Posts = require('./Posts');
const Users = require('./Users');
const Comments = require('./Comments');

Users.hasMany(Posts, {
    foreignKey: 'users_id'
});

Posts.belongsTo(Users, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
});

Comments.belongsTo(Users, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
});

Comments.belongsTo(Posts, {
    foreignKey: 'posts_id',
    onDelete: 'SET NULL'
});

Users.hasMany(Comments, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
})

Posts.hasMany(Comments, {
    foreignKey: 'posts_id'
})


module.exports = { Posts, Users, Comments};