const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
	Comments.findAll({})
		.then((dbCommentsData) => res.json(dbCommentsData))	
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	Comments.findOne({
		where: {
			id: req.params.id,
		}
		
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

router.post('/',   (req, res) => {
	if(req.session) {
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
	}
});

router.delete('/:id', withAuth, (req, res) => {
	Comments.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentsData) => {
			if (!dbCommentsData) {
				res.status(404).json({ message: 'No comment found with that particular id' });
				return;
			}
			res.json(dbCommentsData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//route to update a comment
router.put('/:id', withAuth, (req, res) => {
    Comments.update({
        comment_text: req.body.comment_text
      },
      {
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

//route to delete a comment
router.delete('/:id', withAuth, (req, res) => {
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
