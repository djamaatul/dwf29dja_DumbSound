'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class artist_types extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			artist_types.hasMany(models.artists, {
				as: 'type',
				foreignKey: 'typeid',
			});
		}
	}
	artist_types.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'artist_types',
		}
	);
	return artist_types;
};
