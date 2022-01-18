const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
	res.status(200).send({
		status: 'success',
		message: 'welcome to dumbsound api v1',
	});
});
module.exports = router;
