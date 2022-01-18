'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class artist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			artist.belongsTo(models.artist_type, {
				as: 'type',
				foreignKey: 'typeid',
			});
			artist.hasMany(models.music, {
				as: 'artist',
				foreignKey: 'artistid',
			});
		}
	}
	artist.init(
		{
			name: DataTypes.STRING,
			old: DataTypes.STRING,
			typeid: DataTypes.INTEGER,
			startcarrer: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'artist',
			freezeTableName: true,
		}
	);
	return artist;
};
