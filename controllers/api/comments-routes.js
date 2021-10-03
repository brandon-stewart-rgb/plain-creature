const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, Users } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
	Comments.findAll()
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
		},
		attributes: ['id', 'comments_text', 'created_at'],
		include: [
			{
				model: Users,
				attributes: ['id', 'username'],
			},
		],
	})
		.then((dbCommentsData) => {
			if (!dbCommentsData) {
				res
					.status(404)
					.json({ message: 'No comments found with this specific id' });
				return;
			}
			res.json(dbCommentsData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/',  (req, res) => {
	Comments.create({
		comments_text: req.body.comments_text,
		users_id: req.session.users_id,
		posts_id: req.body.posts_id,
	})
		.then((dbCommentsData) => res.json(dbCommentsData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.delete('/:id', (req, res) => {
	Comments.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentsData) => {
			if (!dbCommentsData) {
				res
					.status(404)
					.json({ message: 'No comment found with that particular id' });
				return;
			}
			res.json(dbCommentsData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
