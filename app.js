const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const beer2 = punkAPI.getBeer(1);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then((beersFromApi) => {
			//console.log('Beers from the database: ', beersFromAPI);
			//res.render('beers', { beersFromApi });
			res.render('beers', { beersFromApi });
			////res.send({ beersFromApi });
		})
		.catch((error) => console.log(error));
});

app.get('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then((randomBeer) => {
			res.render('random-beer', randomBeer[0]);
		})
		.catch((error) => console.log(error));
});

app.get('/beers/beer/:id', (req, res, next) => {
	punkAPI
		.getBeer(req.params.id)
		.then((beer) => {
			//console.log(beer);
			res.render('beerid', beer[0]);
		})
		.catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
