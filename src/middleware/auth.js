const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
	const authorization = req.header('authorization');
	if (!authorization) {
		return res.status(401).send({
			status: 'failed',
			message: 'Access denied : Unauthorization',
		});
	}
	const token = authorization.split(' ')[1];
	try {
		const data = jwt.verify(token, process.env.SECRET_KEY);
		req.user = data;
	} catch (error) {
		return res.status(400).send({
			status: 'failed',
			message: 'invalid token',
		});
	}
	next();
};
