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

exports.addMusic = async (req, res) => {
	const id = req.user.id;
	const body = req.body;
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
		const newdata = await musics.create(body);

		const music = await musics.findOne({
			where: {
				id: newdata.dataValues.id,
			},
			include: {
				model: artists,
				as: 'artist',
			},
		});

		return res.status(200).send({
			status: 'success',
			data: music,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			status: 'failed',
			message: 'addArtist server error',
		});
	}
};
