const seedUsers = require('./users-seeds');
const seedPosts = require('./posts-seeds');
const seedComments = require('./comments-seeds');

const sequelize = require('../config/connection');


const oneSeedToRuleThemAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');
    await seedPosts();
    console.log('--------------');
    await seedComments();
    console.log('--------------');

    process.exit(0);
};

oneSeedToRuleThemAll();