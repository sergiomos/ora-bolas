exports.distancia = (xRobo, xBola, yRobo, yBola) => {
  const dX = Math.pow((xBola - xRobo), 2);
  const dY = Math.pow((yBola - yRobo), 2);

  return {dX , dY};
}

exports.tempoInterceptar = (velocidade, distancia) => {
  return distancia / velocidade;
}

const posicaoFutura = (posicaoAtual, velocidade, tempo) => {
  return posicaoAtual + (velocidade * tempo);
}

exports.consegueInterceptar = (tempoRobo, tempoBola) => {
  return tempoRobo < tempoBola;
}

const interceptou = (distancia, raioDeInterceptacao) => {
  return distancia < raioDeInterceptacao;
}

const milimetroParaMetro = (milimetro) => milimetro / 1000;

const metroParaMilimetro = (metro) => metro * 1000;
