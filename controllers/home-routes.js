const router = require('express').Router();
const { Posts,  Comments, Users } = require('../models');
const withAuth = require('../utils/auth');

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
        order: [
            ['created_at', 'DESC']
        ]
	})
		.then((dbPostsData) => {
			const posts = dbPostsData.map((post) => post.get({ plain: true }));
			res.render('homepage', { posts,loggedIn: req.session.loggedIn, pageTitle : 'Home'});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
// login page
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
	  res.redirect('/dashboard');
	  return;
	}
  // render login page and make page title dynamic
	res.render('login', { pageTitle: 'Login' }); 
  });

// single post
router.get('/api/posts/:id', (req, res) => {	
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
        ], 
		order: [
			[ 'created_at', 'DESC']
		]
    }).then(dbPostData => {
		if (!dbPostData) {
		  res.status(404).json({ message: 'No post found with this id' });
		  return;
		}
		// serialize the data
		const post = dbPostData.get({ plain: true });
		// pass data to template
		res.render('single-post', { post, loggedIn: req.session.loggedIn, pageTitle: 'Single Post' });
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

// get single comment
router.get('/edit/comment/:id',  (req,res) => {
	Comments.findByPk( req.params.id, {	
		attributes: ['id', 'comments_text', 'posts_id', 'users_id', 'created_at'],
		include: [
			{
			model: Posts,
			attributes: ['id', 'title', 'post_text', 'created_at'],
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
	.then(dbCommentData => {
		if(dbCommentData) {
			// serialize the post data!!
			const comment = dbCommentData.get({ plain: true });
			res.render('edit-comment', { comment, loggedIn: true, pageTitle: 'Edit Comment' });
		} else {
			res.status(404).end();
		}		
	})
	.catch(err => {
		res.status(500).json(err);
	})
})

module.exports = router;