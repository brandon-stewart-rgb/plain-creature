const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../config/connection.js');

class Posts extends Model {}

Posts.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		post_text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		
		created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false
			
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'Posts',
	}
);

module.exports = Posts;
