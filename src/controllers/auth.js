const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { users, transactions } = require('../../models');

exports.login = async (req, res) => {
	const body = req.body;
	const schema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().min(4).required(),
	});
	const { error } = schema.validate(body);

	if (error) {
		return res.status(400).send({
			status: 'failed',
			message: error.details[0].message,
		});
	}
	try {
		const userExist = await users.findOne({
			where: {
				email: body.email,
			},
		});
		if (!userExist) {
			return res.status(404).send({
				status: 'failed',
				message: 'email  user not exist',
			});
		}

		const authenticate = await bcrypt.compare(body.password, userExist.password);

		if (!authenticate) {
			res.status(401).send({
				status: 'failed',
				message: 'email and password combination not match',
			});
		}

		const checkSubscribe = await transactions.findAll({
			where: {
				userid: userExist.id,
			},
		});

		let remaining = [];
		const checkDate = checkSubscribe.map((e) => {
			remaining.push(
				Math.round(
					(parseInt(new Date(e.duedate).getTime()) - parseInt(new Date().getTime())) / (1000 * 60 * 60 * 24)
				)
			);
			if (remaining[remaining.length - 1] <= 0) {
				const update = async () => {
					await transactions.update(
						{ duedate: null, startdate: null },
						{
							where: {
								id: e.id,
							},
						}
					);
				};
				update();
			}
		});
		const remaining_filtered = remaining.filter((e) => e > 0);
		if (remaining_filtered.length == 0) {
			await users.update(
				{ subscribe: false },
				{
					where: {
						id: userExist.id,
					},
				}
			);
		} else {
			await users.update(
				{ subscribe: true },
				{
					where: {
						id: userExist.id,
					},
				}
			);
		}
		const NewDataUserExist = await users.findOne({
			where: {
				email: body.email,
			},
		});

		const token = jwt.sign({ id: NewDataUserExist.id }, process.env.SECRET_KEY);

		return res.status(200).send({
			status: 'success',
			data: {
				email: NewDataUserExist.email,
				role: NewDataUserExist.roleid,
				token,
				subscribe: NewDataUserExist.subscribe,
			},
		});
	} catch (error) {
		return res.status(500).send({
			status: 'failed',
			message: 'login server error',
		});
	}
};

exports.register = async (req, res) => {
	const body = req.body;
	console.log(body);
	const schema = joi.object({
		fullname: joi.string().min(3).required(),
		email: joi.string().email().required(),
		password: joi.string().min(4).required(),
		genderid: joi.number().required(),
		phone: joi.string().min(11).required(),
		address: joi.string().min(8).required(),
	});
	const { error } = schema.validate(body);

	if (error) {
		return res.status(400).send({
			status: 'failed',
			message: error.details[0].message,
		});
	}
	try {
		const userExist = await users.findAll({
			where: {
				email: body.email,
			},
		});
		if (userExist.length > 0) {
			return res.status(400).send({
				status: 'failed',
				message: 'user email already exist',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);

		const registeredData = await users.create({ ...body, password: hashedPassword, roleid: 2 });

		const token = jwt.sign({ id: registeredData.dataValues.id }, process.env.SECRET_KEY);
		return res.status(200).send({
			status: 'success',
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			status: 'failed',
			message: 'register server error',
		});
	}
};
exports.checkAuth = async (req, res) => {
	const authHeader = req.header('Authorization');
	if (!authHeader) {
		return res.status(404).send({
			status: 'failed',
			message: 'token not found',
		});
	}
	const token = authHeader.split(' ')[1];
	try {
		const isVerified = jwt.verify(token, process.env.SECRET_KEY);
		const userExist = await users.findOne({
			where: {
				id: isVerified.id,
			},
			attributes: {
				exclude: ['password', 'createdAt', 'updatedAt'],
			},
		});
		if (!userExist) {
			return res.status(401).send({
				status: 'failed',
				message: 'invalid token',
			});
		}
		res.status(200).send({
			status: 'success',
			data: { role: userExist.roleid, token, subscribe: userExist.subscribe },
		});
	} catch (error) {
		return res.status(401).send({
			status: 'failed',
			message: 'invalid token',
		});
	}
};
