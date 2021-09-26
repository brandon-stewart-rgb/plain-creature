const sequelize = require('../config/connection');
const { Users, Posts, Comments } = require('../models');

const commentData = [
    {
    comments_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et risus vulputate, vehicula ligula vel, aliquet nunc. Sed.',
    users_id: 3,
    posts_id: 1
    },

    {
    comments_text: 'Ut et risus vulputate, vehicula ligula vel, aliquet nunc. Sed.',
    users_id: 2,
    posts_id: 2
    },

    {
    comments_text: 'Consectetur adipiscing elit. Ut et risus vulputate, vehicula ligula vel, aliquet nunc. Sed.',
    users_id: 1,
    posts_id: 3
    }
];



const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;

