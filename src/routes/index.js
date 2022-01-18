require('dotenv').config();
const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getGenders } = require('../controllers/data');
const { getMusics } = require('../controllers/music');
const { addTransaction } = require('../controllers/transaction');

const { auth } = require('../middleware/auth');

router.get('/', (req, res) => {
	res.status(200).send({
		status: 'success',
		message: 'welcome to dumbsound api v1',
	});
});

router.post('/register', register);
router.post('/login', login);
router.get('/genders', getGenders);

router.get('/musics', getMusics);

router.post('/transaction', auth, addTransaction);

module.exports = router;
