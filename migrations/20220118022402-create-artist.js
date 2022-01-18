'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('artists', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			old: {
				type: Sequelize.STRING,
			},
			typeid: {
				type: Sequelize.INTEGER,
				references: {
					model: 'artist_types',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			startCarrer: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('artists');
	},
};
