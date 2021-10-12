const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');
const chalk = require('chalk');

// dashboard
router.get('/',  (req, res) => {	
		Posts.findAll({
		
			where: {
				users_id: req.session.users_id,	
			},
			attributes: ['id', 'title', 'post_text', 'created_at'],
			
		})
		.then(dbPostData => {
			const posts = dbPostData.map(post => post.get({ plain: true }));	
			console.log(chalk.yellow(dbPostData));
			console.log('posts.id ', posts.id)
			console.log('anything')
			res.render('dashboard', { posts, loggedIn: true});	
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});	 
		
		
});


// get single post by id and render edit page
router.get('/edit/:id',  (req,res) => {
	Posts.findByPk( req.params.id, {
		attributes: ['id', 'title', 'post_text', 'created_at'],
		include: [
			{
			model: Comments,
			attributes: ['id', 'comments_text', 'posts_id', 'users_id', 'created_at'],
			include: {
				model: Users,
				attributes: ['username']
			}
		},
		{
			model: Users,
			attributes: ['username']
		}
		
	]

	})
	.then(dbPostData => {
		if(dbPostData) {
			// serialize the post data!!
			const post = dbPostData.get({ plain: true });
			res.render('edit-post', { post, loggedIn: req.session.loggedIn, pageTitle: 'Edit Post' });
		} else {
			res.status(404).end();
		}		
	})
	.catch(err => {
		res.status(500).json(err);
	})
});





module.exports = router;