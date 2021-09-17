const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Posts, Users, Comments } = require('../../models');

router.get('/', (req, res)=> {
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
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    }); 
});

router.get('/:id', (req, res)=> {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'created_at'],
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
            res.status(404).json({ message: 'No post found with this specific id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Posts.create({
        title: req.body.title,
        user_id: req.session.users_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res)=> {
    Posts.update(
        {
            title: req.body.title
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

router.delete('/:id', (req, res)=> {
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