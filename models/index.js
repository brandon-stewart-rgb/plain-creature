const Posts = require('./Posts');
const Users = require('./Users');
const Comments = require('./Comments');

Posts.belongsTo(Users, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
});

Comments.belongsTo(Users, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
});

Comments.belongsTo(Posts, {
    foreignKey: 'users_id',
    onDelete: 'SET NULL'
});

Posts.hasMany(Comments, {
    foreignKey: 'posts_id'
})


module.exports = { Posts, Users, Comments};