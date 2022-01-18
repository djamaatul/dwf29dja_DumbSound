const { musics, artists } = require('../../models');

exports.getMusics = async (req, res) => {
	try {
		const data = await musics.findAll({
			include: {
				model: artists,
				as: 'artist',
			},
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
