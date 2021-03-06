'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('musics', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			year: {
				type: Sequelize.STRING,
			},
			thumbnail: {
				type: Sequelize.STRING,
			},
			attachment: {
				type: Sequelize.STRING,
			},
			artistid: {
				type: Sequelize.INTEGER,
				references: {
					model: 'artists',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('musics');
	},
};
