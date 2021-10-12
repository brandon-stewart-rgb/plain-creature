const withAuth = (req, res, next) => {
    if (!req.session.users_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;


