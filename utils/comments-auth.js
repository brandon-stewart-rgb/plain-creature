const  Comments  = require('../models/Comments.js');
// middleware
const canEditComment = (req, res, next) => { 
    Comments.findOne({
        where: {
			id: req.params.id,
		},
    })
    .then((data) => {   
        if (req.session.users_id != data.users_id) {      
            res.redirect('/error');
         } else {
            next();
         }
    });    
};
module.exports =  canEditComment;
