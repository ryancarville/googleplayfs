const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//comment
const app = express();
app.use(morgan('common'));
app.use(cors());
const playApps = require('./playApps.js');
app.get('/apps', (req, res) => {
	const { genre = '', sort } = req.query;

	let results = playApps.filter(app =>
		app.Genres.toLowerCase().includes(genre.toLowerCase())
	);
	if (genre) {
		if (
			!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(
				genre
			)
		)
			return res.status(400).send('That genre does not exsist');
	}

	if (sort) {
		if (!['title', 'rank'].includes(sort)) {
			return res.status(400).send('Sort must be one of rating or app');
		}
	}

	if (sort === 'title') {
		results.sort((a, b) => (a.App > b.App ? 1 : -1));
	}
	if (sort === 'rank') {
		results.sort((a, b) => (a.Rating > b.Rating ? 1 : -1));
	}
	res.json(results);
});

module.exports = app;
