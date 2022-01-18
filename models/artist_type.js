'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class artist_type extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			artist_type.hasMany(models.artist, {
				as: 'type',
				foreignKey: 'typeid',
			});
		}
	}
	artist_type.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'artist_type',
			freezeTableName: true,
		}
	);
	return artist_type;
};
