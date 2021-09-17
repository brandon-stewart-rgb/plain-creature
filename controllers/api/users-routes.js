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
    .then(dbUsersData => {
        req.session.save(()=> {
          req.session.users_id = dbUsersData.id;
          req.session.username = dbUsersData.username;
          req.session.loggedIn = true;
          res.json(dbUsersData);
        });
        
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
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/login', (req, res) => {
    
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No such user with that email address, please try again' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
        res.json({ user: dbUserData, message: 'You are now officially logged in' });
      });
 });

 router.put('/:id', (req, res)=> {
   Users.update(req.body, {
     individualHooks: true,
     where: {
       id: req.params.id
     }
   }).then(dbUserData => {
     if(!dbUserData) {
       res.status(404).json({ message: 'No user found with this id' });
       return;
     }
     res.json(dbUserData);
   }).catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 });
 

// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//     }
//     else {
//       res.status(404).end();
//     }
//   });


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