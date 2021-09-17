const sequelize = require('../config/connection');
const { Users, Posts } = require('../models');

const userData = [
  {
    username: 'alesmonsdfde0',
    email: 'nwsdfnedge0@cbc.ca',
    password: 'password123'
  },
  {
    username: 'jwillousdffghway1',
    email: 'rmsdfs1@sogou.com',
    password: 'password123'
  },
  {
    username: 'iboddam2',
    email: 'cssdfman2@last.fm',
    password: 'password123'
  }
];

const seedUsers = () => Users.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;