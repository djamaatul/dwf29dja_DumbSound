const { artists, artist_types, users } = require('../../models');

exports.addArtist = async (req, res) => {
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
		const newdata = await artists.create(body);

		const artist = await artists.findOne({
			where: {
				id: newdata.dataValues.id,
			},
			include: {
				model: artist_types,
				as: 'type',
			},
		});

		return res.status(200).send({
			status: 'success',
			data: { ...newdata.dataValues, type: artist.type.name },
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			status: 'failed',
			message: 'addArtist server error',
		});
	}
};
