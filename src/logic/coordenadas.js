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
    .map(serialize)
    .filter((e) => !Number.isNaN(e.x)  && !Number.isNaN(e.y) && !Number.isNaN(e.tempo));

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

const bola = pegarCoordenadasBola(9, 9)
const velocidade = bola.map((pos, i, arr) => {
  if(i == 0 || i == arr.length - 1)
  return {tempo: pos.tempo, vx: 0, vy: 0};

  const nextPos = arr[i+1];
  const vx = Math.abs(pos.x - nextPos.x).toFixed(2)
  const vy =  Math.abs(pos.y - nextPos.y).toFixed(2);

  return {tempo: pos.tempo, vx, vy}
});

const aceleracao = velocidade.map((pos, i, arr) => {
  let ax, ay;

  const firstOrLast = i == 0;

  switch(true){
    case firstOrLast:
      ax = 0;
      ay = 0
      break;

    default:
      const previousPos = arr[i-1];
      ax = (pos.vx - previousPos.vx).toFixed(2)
      ay =  (pos.vy - previousPos.vy).toFixed(2);
      break;
  }

  return {tempo: pos.tempo, ax, ay}
});

module.exports = { pegarCoordenadasBola, pegarCoordenadasRobo }
