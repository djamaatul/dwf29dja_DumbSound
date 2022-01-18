const { users, transaction } = require('../../models');

exports.addTransaction = async (req, res) => {
	const userid = req.user;
	const { accountnumber } = req.body;
	// const startDate = new Date();
	// const dueDate = new Date(new Date().setMonth(a.getMonth() + 1));
	try {
		await transaction.create({
			userid,
			accountnumber,
			status: 'pending',
		});
		return res.status(200).send({
			status: 'success',
			data,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			status: 'failed',
			message: 'getmusic server error',
		});
	}
};
