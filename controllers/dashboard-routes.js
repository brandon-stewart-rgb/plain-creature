const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, Users, Comments } = require('../models');

// router.get('/', (req, res) => {
//     res.render('dashboard', { loggedIn: true });
// });

// dashboard
router.get('/',  (req, res) => {
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

module.exports = router;