'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			users.belongsTo(models.roles, {
				as: 'role',
				foreignKey: 'roleid',
			});
			users.hasMany(models.transactions, {
				as: 'user',
				foreignKey: 'userid',
			});
			users.belongsTo(models.genders, {
				as: 'gender',
				foreignKey: 'genderid',
			});
		}
	}
	users.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullname: DataTypes.STRING,
			roleid: DataTypes.INTEGER,
			genderid: DataTypes.INTEGER,
			phone: DataTypes.STRING,
			address: DataTypes.TEXT,
			subscribe: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'users',
		}
	);
	return users;
};
