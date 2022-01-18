'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class transactions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			transactions.belongsTo(models.users, {
				as: 'user',
				foreignKey: 'userid',
			});
		}
	}
	transactions.init(
		{
			startdate: DataTypes.DATE,
			duedate: DataTypes.DATE,
			userid: DataTypes.INTEGER,
			attachment: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'transactions',
		}
	);
	return transactions;
};
