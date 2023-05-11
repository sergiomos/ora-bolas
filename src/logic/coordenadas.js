const { readFileSync } = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../trajetoria_bola.txt');

const serialize = ([tempo, xBola, yBola]) => ({tempo, xBola, yBola})

exports.pegarCoordenadasBola = () => {
  const arquivo = readFileSync(filePath, {encoding: 'utf16le'});

  const coordenadas = arquivo.split('\n')
  .slice(1) // retirando a primeira linha (t/s, x/m,  y/m)
  .map((e) => e.replace('\r', '') //remove os returns
              .replace(/\,/g, '.') // substitui as virgulas pelo ponto
              .split('\t') // remove os tabs
              .map(n => parseFloat(n))) // passa os numeros de string pra float
  .map(serialize); // transforma um array em objeto

  return coordenadas
}

