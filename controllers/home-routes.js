const router = require('express').Router();
const sequelize = require('../config/connection');
// add this back once you have more models
// const { Posts, User, Comment } = require('../models');
const { Posts } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
      id: 1,
      post_url: 'https://handlebarsjs.com/guide/',
      title: 'Handlebars Docs',
      created_at: new Date(),
      vote_count: 10,
      comments: [{}, {}],
      user: {
        username: 'test_user'
      }
    });
  });

module.exports = router;