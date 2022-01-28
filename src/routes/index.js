require('dotenv').config();
const express = require('express');
const router = express.Router();

const { login, register, checkAuth } = require('../controllers/auth');
const { getGenders, createGender } = require('../controllers/data');
const { getMusics, addMusic, deleteMusic } = require('../controllers/music');
const { addTransaction, getTransactions, approveTransaction } = require('../controllers/transaction');
const { addArtist, getArtists, getTypeArtists } = require('../controllers/artist');

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
router.get('/check-auth', checkAuth);

router.get('/genders', getGenders);
router.post('/gender', createGender);

router.get('/musics', getMusics);
router.post('/music', auth, uploads('attachment', 'musics'), addMusic);
router.delete('/music/:id', auth, deleteMusic);

router.post('/transaction', auth, uploads('attachment', 'invoices'), addTransaction);
router.get('/transactions', auth, getTransactions);
router.patch('/transaction/:id', auth, approveTransaction);

router.post('/artist', auth, addArtist);
router.get('/artists', getArtists);
router.get('/type_artists', getTypeArtists);

module.exports = router;
