const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comments_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        users_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'Users',
                key:'id'
            }
        },
        posts_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Posts',
                key: 'id'
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comments'
    }
);

module.exports = Comments; 