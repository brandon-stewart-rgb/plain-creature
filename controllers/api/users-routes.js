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
  if(!req.session.views){
    req.session.views =1;
    console.log("This is your first visit to this site");
  } else {
    req.session.views++
    console.log(`You have visited ${req.session.views} times`);
  }
    Users.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Posts,
                attributes: ['id', 'title', 'created_at']
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
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
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
      .then(dbUserData => {
        req.session.save(() => {
          req.session.users_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json(dbUserData);
          console.log(dbUserData)
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/login', (req, res) => {
    Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.users_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

  router.post('/logout', (req,res) => {
    if(req.session.loggedIn){
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

 router.put('/:id', (req, res)=> {
   Users.update(req.body, {
     individualHooks: true,
     where: {
       id: req.params.id
     }
   }).then(dbUserData => {
     if(!dbUserData) {
       res.status(404).json({ message: 'No user found with this exact id' });
       return;
     }
     res.json(dbUserData);
   }).catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 });
 

router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

 

module.exports = router;