const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');

router.get('/', (req, res)=> {
    Users.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Users.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Posts,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comments,
                attributes: [ 'id', 'comments_text', 'created_at'],
                include: {
                    model: Posts,
                    attributes: ['title']
                }
            }
         
        ]
    })
    .then(dbUsersData => {
        if(!dbUsersData) { 
            res.status(404).json({ message: 'No user found with this id' });
         return;
        }
        res.json(dbUsersData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {

    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUsersData => {
        res.json(dbUsersData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;