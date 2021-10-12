const router = require('express').Router();
const { Comments, Users, Posts } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
	Comments.findAll({})
		.then((dbCommentsData) => res.json(dbCommentsData))	
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});




router.get('/:id', withAuth,   (req, res) => {
	Comments.findOne({
		where: {
            id: req.params.id,
			users_id: req.params.users_id
        },
        attributes: [ 'id', 'comments_text', 'posts_id', 'users_id' ],
        include: [
            {
                model: Posts,
				attributes: [ 'id', 'title', 'post_text', 'created_at'],
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
		.then((dbCommentsData) => {
			if (!dbCommentsData) {
				res.status(404).json({ message: 'No comments found with this specific id' });
				return;
			}
			res.json(dbCommentsData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/', withAuth,  (req, res) => {
	
	Comments.create({
		comments_text: req.body.comments_text,
		users_id: req.session.users_id,
		posts_id: req.body.posts_id,
	})
		.then((dbCommentsData) => res.json(dbCommentsData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		})
	
});


//route to update a comment
router.put('/:id', withAuth,  (req, res) => {
	
    Comments.update({
        comments_text: req.body.comments_text,
		users_id: req.body.users_id
      },
      {
        where: {
          id: req.params.id,	  
        }
    }) 
	
	.then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//route to delete a comment
router.delete('/:id',  withAuth, (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;
