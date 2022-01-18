const { genders } = require('../../models');

exports.getGenders = async (req, res) => {
	try {
		const data = await genders.findAll();
		console.log(data);
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
