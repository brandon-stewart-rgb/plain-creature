const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, (req, res)=> {
    Posts.findAll({
        attributes: [ 'id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: Comments,
                attributes: [ 'id', 'comments_text', 'posts_id', 'users_id' ],
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
            ['created_at', 'DESC']

        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    }); 
});

router.get('/:id',withAuth, (req, res)=> {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [ 'id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: Comments,
                attributes: [ 'id', 'comments_text', 'posts_id', 'users_id' ],
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
            res.status(404).json({ message: 'No post found with this specific id' });
            return;
        }
        res.json(dbPostData);
        // serialize data before passing to template
        // const posts = dbPostData.map(post => post.get({ plain: true }));
        // res.render('dashboard', { posts, loggedIn: true });
      })
   .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create post
router.post('/',withAuth, (req, res) => {
    Posts.create({
        title: req.body.title,
        post_text: req.body.post_text,
        users_id: req.session.users_id
    })
    .then(dbPostData => res.json(dbPostData))
     // console.log(chalk.blue(req.session.users_id))
  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
   
});

router.put('/:id', withAuth, (req, res)=> {
    Posts.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
            
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'There are no posts found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id',withAuth, (req, res)=> {
    console.log('id', req.params.id);
    Posts.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id to delete' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;