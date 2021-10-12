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
            console.log(req.session.users_id);
            console.log(data.users_id);
            // need to add an error page.
            res.redirect('/');
   
         } else {
            next();
         }
    });    
};

module.exports =  canEditComment;
