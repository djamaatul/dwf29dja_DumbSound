const { genders, roles } = require('../../models');

exports.getGenders = async (req, res) => {
	try {
		const data = await genders.findAll();
		return res.status(200).send({
			status: 'success',
			data,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'failed',
			message: 'getgender server error',
		});
	}
};
exports.createGender = async (req, res) => {
	try {
		const body = req.body;
		const data = await genders.create(body);
		return res.status(200).send({
			status: 'success',
			data,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'failed',
			message: 'getgender server error',
		});
	}
};

exports.createRole = async (req, res) => {
	try {
		const body = req.body;
		const data = await roles.create(body);
		return res.status(200).send({
			status: 'success',
			data,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'failed',
			message: error.message,
		});
	}
};
