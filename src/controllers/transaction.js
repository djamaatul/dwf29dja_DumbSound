const { transactions, users } = require('../../models');
const attachment_dir = 'http://localhost:5000/assets/invoices/';
exports.addTransaction = async (req, res) => {
	const userid = req.user.id;
	const { accountnumber } = req.body;
	try {
		const data = await transactions.create({
			userid,
			accountnumber,
			status: 'pending',
			attachment: req.files.attachment[0].filename,
		});
		return res.status(200).send({
			status: 'success',
			data,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			status: 'failed',
			message: 'addTransaction server error',
		});
	}
};
exports.getTransactions = async (req, res) => {
	const id = req.user.id;
	try {
		const isAdmin = await users.findOne({
			where: {
				id,
			},
		});
		if (isAdmin.roleid !== 1) {
			return res.status(401).send({
				status: 'failed',
				message: 'Acces Denied',
			});
		}
		let data = await transactions.findAll({
			include: {
				model: users,
				as: 'user',
				attributes: {
					exclude: ['password'],
				},
			},
		});
		const newdata = [];
		data.map((e, i) => {
			newdata.push({ ...e.dataValues, attachment_link: attachment_dir + e.attachment });
		});
		console.log(newdata);
		return res.status(200).send({
			status: 'success',
			data: newdata,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'failed',
			message: 'get transaction server error',
		});
	}
};

exports.approveTransaction = async (req, res) => {
	const idTransaction = req.params.id;
	const id = req.user.id;
	try {
		const isAdmin = await users.findOne({
			where: {
				id,
			},
		});
		if (isAdmin.roleid !== 1) {
			return res.status(401).send({
				status: 'failed',
				message: 'Acces Denied',
			});
		}
		const dataExist = await transactions.findOne({
			where: {
				id: idTransaction,
			},
		});
		if (!dataExist) {
			return res.status(404).send(status_failed('data is not exist'));
		}

		const startDate = new Date();
		const dueDate = new Date(new Date().setMonth(a.getMonth() + 1));

		await transactions.update(
			{
				startDate,
				dueDate,
			},
			{
				where: {
					id: idTransaction,
				},
			}
		);
		return res.status(200).send({
			status: 'success',
			message: `transaction at id ${idTransaction} succesfully approved`,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'failed',
			message: 'approve transaction server error',
		});
	}
};
