'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class genders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			genders.hasMany(models.users, {
				as: 'gender',
				foreignKey: 'genderid',
			});
		}
	}
	genders.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'genders',
		}
	);
	return genders;
};
