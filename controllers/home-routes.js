const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/connection');
const { Posts,  Comments, Users } = require('../models');

router.get('/', (req, res) => {
	//console log all the session variables
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
			res.render('homepage', { posts, pageTitle : 'Home'});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
	  res.redirect('/dashboard');
	  return;
	}
  // render login page and make page title dynamic
	res.render('login', { pageTitle: 'Login' });
  });



// dashboard
router.get('/dashboard',  (req, res) => {
	if(req.session.loggedIn) {
		Posts.findAll({
			attributes: ['title'],
			where: {
				users_id: req.body.users_id
			}
		});
	 
	  res.render('dashboard', { pageTitle: 'Dashboard'});
	  return;

	} else {
		res.redirect('/');
		return;
	  }
	
});

// single post
router.get('/post/:id', (req, res) => {
	Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: Comments,
                attributes: [ 'id', 'comments_text', 'posts_id', 'users_id', 'created_at'],
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
    }).then(dbPostData => {
		if (!dbPostData) {
		  res.status(404).json({ message: 'No post found with this id' });
		  return;
		}
  
		// serialize the data
		const post = dbPostData.get({ plain: true });
  
		// pass data to template
		res.render('single-post', { post });
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json(err);
	  });
  });



//signup
router.get('/signup', (req, res) => {
	
  // render login page and make title dynamic
	res.render('signup', { pageTitle: 'Signup' });
});


module.exports = router;
