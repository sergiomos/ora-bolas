const { RAIO_INTERCEPTACAO_M, VELOCIDADE_MAXIMA_M } = require("./constantes");

exports.distancia = (xRobo, xBola, yRobo, yBola) => {
  const dX = Math.pow((xBola - xRobo), 2);
  const dY = Math.pow((yBola - yRobo), 2);

  return Math.sqrt(dY + dX) - RAIO_INTERCEPTACAO_M
}

exports.tempoInterceptar = (distancia) => {
  return distancia / VELOCIDADE_MAXIMA_M;
}

const posicaoFutura = (posicaoAtual, velocidade, tempo) => {
  return posicaoAtual + (velocidade * tempo);
}

exports.consegueInterceptar = (tempoRobo, tempoBola) => {
  const tempoIdeal = tempoRobo < tempoBola 
  return tempoIdeal;
}

exports.interceptou = (distancia) =>  distancia <= RAIO_INTERCEPTACAO_M;


const milimetroParaMetro = (milimetro) => milimetro / 1000;

const metroParaMilimetro = (metro) => metro * 1000;
