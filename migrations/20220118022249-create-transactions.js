'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('transactions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			startdate: {
				type: Sequelize.DATE,
			},
			duedate: {
				type: Sequelize.DATE,
			},
			userid: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			attachment: {
				type: Sequelize.STRING,
			},
			status: {
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
		await queryInterface.dropTable('transactions');
	},
};
