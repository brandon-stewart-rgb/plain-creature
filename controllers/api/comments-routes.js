
const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res)=> {
    Comment.findAll()
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res)=> {
    Comment.create({
        comments_text: req.body.comments_text,
        users_id: req.session.users_id,
        posts_id: req.body.posts_id
    })
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err => {
console.log(err);
res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    });
});

module.exports = router;