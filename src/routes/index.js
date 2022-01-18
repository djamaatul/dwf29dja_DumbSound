require('dotenv').config();
const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getGenders } = require('../controllers/data');
const { getMusics, addMusic } = require('../controllers/music');
const { addTransaction, getTransaction } = require('../controllers/transaction');
const { addArtist } = require('../controllers/artist');

const { auth } = require('../middleware/auth');
const { uploads } = require('../middleware/uploads');

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
router.post('/music', auth, uploads('attachment', 'musics'), addMusic);

router.post('/transaction', auth, uploads('attachment', 'invoices'), addTransaction);
router.get('/transaction', auth, getTransaction);

router.post('/artist', auth, addArtist);

module.exports = router;
