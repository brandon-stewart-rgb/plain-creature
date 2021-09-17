const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts,  Comments, Users } = require('../models');

router.get('/', (req, res) => {
	console.log(req.session);
	Posts.findAll({
		attributes: ['id', 'title', 'post_text', 'created_at'],
		include: [
			{
				model: Comments,
				attributes: ['id', 'comments_text', 'posts_id', 'users_id'],
				include: {
					model: Users,
					attributes: ['username'],
				},
			},
			{
				model: Users,
				attributes: ['username'],
			},
		],
	})
		.then((dbPostsData) => {
			const posts = dbPostsData.map((post) => post.get({ plain: true }));
			res.render('homepage', { posts });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
	  res.redirect('/');
	  return;
	}
  
	res.render('login');
  });

module.exports = router;
