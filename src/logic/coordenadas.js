const path = require('path');
const { readFileSync } = require('fs');
const { distancia, tempoInterceptar, consegueInterceptar } = require('./uteis.js');
const { VELOCIDADE_MAXIMA_M } = require('./constantes.js');

const filePath = path.join(__dirname, '../trajetoria_bola.txt');

const serialize = ([tempo, x, y]) => ({ tempo, x, y });

const pegarCoordenadasBola = () => {
  const arquivo = readFileSync(filePath, { encoding: 'utf16le' });

  const coordenadas = arquivo.split('\n')
    .slice(1)
    .map((e) => e.replace('\r', '')
      .replace(/\,/g, '.')
      .split('\t')
      .map(n => parseFloat(n)))
    .map(serialize);

  return coordenadas
}


const pontoDeInterceptacao = (roboX, roboY) => {
  const cordenadasBola = pegarCoordenadasBola();

  const inteceptar = cordenadasBola.find(({ tempo, x: xBola, y: yBola }) => {
    const dist = distancia(roboX, xBola, roboY, yBola);
    const tempoRobo = tempoInterceptar(dist);
    return consegueInterceptar(tempoRobo, tempo, dist);
  });

  return { x: inteceptar.x, y: inteceptar.y, tempo: inteceptar.tempo };
}


const pegarCoordenadasRobo = (x, y) => {
  const pontoFinal = pontoDeInterceptacao(x, y);
  const pos = [{ tempo: 0, x, y }];
  let x2 = x, y2 = y, tempo;
  let i = 0;
  while (x2 != pontoFinal.x || y2 != pontoFinal.y) {
    let vX, vY;
    const xAnterior = pos[i].x
    const yAnterior = pos[i].y


    if (pontoFinal.x > x && x2 != pontoFinal.x) {
      vX = (pontoFinal.x - xAnterior) > VELOCIDADE_MAXIMA_M ? VELOCIDADE_MAXIMA_M : pontoFinal.x - xAnterior;

    } else if (pontoFinal.x < x && x2 != pontoFinal.x) {
      vX = (pontoFinal.x - xAnterior) < -VELOCIDADE_MAXIMA_M ? -VELOCIDADE_MAXIMA_M : pontoFinal.x - xAnterior

    } else {
      vX = 0;
    }

    if (pontoFinal.y > y && y2 != pontoFinal.y) {
      vY = (pontoFinal.y - yAnterior) > VELOCIDADE_MAXIMA_M ? VELOCIDADE_MAXIMA_M : pontoFinal.y - yAnterior

    } else if (pontoFinal.y < y && y2 != pontoFinal.y) {
      vY = (pontoFinal.y - yAnterior) < -VELOCIDADE_MAXIMA_M ? -VELOCIDADE_MAXIMA_M : pontoFinal.y - yAnterior

    } else {
      vY = 0;
    }

    x2 += vX
    y2 += vY

    tempo = pos[i].tempo + 0.01
    pos.push({ tempo, x: x2, y: y2 })
    i++
  }


  return pos
}

module.exports = { pegarCoordenadasBola, pegarCoordenadasRobo }

