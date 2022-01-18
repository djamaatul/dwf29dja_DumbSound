'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class musics extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			musics.belongsTo(models.artists, {
				as: 'artist',
				foreignKey: 'artistid',
			});
		}
	}
	musics.init(
		{
			title: DataTypes.STRING,
			year: DataTypes.STRING,
			thumbnail: DataTypes.STRING,
			attachment: DataTypes.STRING,
			artistid: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'musics',
		}
	);
	return musics;
};
