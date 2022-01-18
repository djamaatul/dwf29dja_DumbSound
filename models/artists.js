'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class artists extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			artists.belongsTo(models.artist_types, {
				as: 'type',
				foreignKey: 'typeid',
			});
			artists.hasMany(models.musics, {
				as: 'artists',
				foreignKey: 'artistid',
			});
		}
	}
	artists.init(
		{
			name: DataTypes.STRING,
			old: DataTypes.STRING,
			typeid: DataTypes.INTEGER,
			startcarrer: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'artists',
		}
	);
	return artists;
};
