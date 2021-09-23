const withAuth = (req, res, next) => {
    if (!req.session.users__id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;