const Posts = require('./Posts');
const Comments = require('./Comments');
const Users = require('./Users');

Posts.belongsTo(Users, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
});
Users.hasMany(Posts, {
    foreignKey: 'users_id'
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


module.exports = { Posts, Users, Comments };