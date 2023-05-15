const express = require('express');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const { pegarCoordenadasBola, pegarCoordenadasRobo } = require('./logic/coordenadas');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/grafico', (req, res) => {
  res.redirect('grafico.html');
});

app.get('/coordenadas/bola', (req, res) => {
  res.status(200).json({data: pegarCoordenadasBola()});
});

app.get('/coordenadas/robo', (req, res) => {
  const x = req.query.x || 0;
  const y = req.query.y || 0;

  res.status(200).json({data: pegarCoordenadasRobo(parseInt(x), parseInt(y))});
});

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
