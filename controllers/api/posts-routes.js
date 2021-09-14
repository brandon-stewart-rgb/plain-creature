const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');

router.get('/', (req, res)=> {
    Posts.findAll({
        attributes: [ 'id', 'post_url', 'title', 'post_text', 'created_at'],
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
        attributes: ['id', 'post_url', 'title']
    })
})

module.exports = router;