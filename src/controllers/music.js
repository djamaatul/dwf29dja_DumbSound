const { musics, artists, users } = require('../../models');
const musics_dir = 'http://localhost:5000/assets/musics/';

exports.getMusics = async (req, res) => {
	try {
		const data = await musics.findAll({
			include: {
				model: artists,
				as: 'artist',
			},
		});
		data.map((e) => {
			e.thumbnail = musics_dir + e.thumbnail;
			e.attachment = musics_dir + e.attachment;
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
	console.log(req.body);
	if (!req.files) {
		return res.status(400).send({
			status: 'failed',
			message: 'please upload file!',
		});
	}
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
		const newdata = await musics.create({
			...body,
			artistid: parseInt(body.artistid),
			attachment: req.files.attachment[0].filename,
			thumbnail: req.files.thumbnail[0].filename,
		});

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
			// data: music,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			status: 'failed',
			message: 'add Music server error',
		});
	}
};