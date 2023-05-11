exports.distancia = (xRobo, xBola, yRobo, yBola, raioDeInterceptacao) => {
  const dX = Math.pow((xBola - xRobo), 2);
  const dY = Math.pow((yBola - yRobo), 2);

  return Math.sqrt(dY + dX) - raioDeInterceptacao
}

exports.tempoInterceptar = (velocidade, distancia) => {
  return distancia / velocidade;
}

const posicaoFutura = (posicaoAtual, velocidade, tempo) => {
  return posicaoAtual + (velocidade * tempo);
}

exports.consegueInterceptar = (tempoRobo, tempoBola, distancia, raio) => {
  return tempoRobo < tempoBola;
}

exports.interceptou = (distancia, raioDeInterceptacao) =>  distancia <= raioDeInterceptacao;


const milimetroParaMetro = (milimetro) => milimetro / 1000;

const metroParaMilimetro = (metro) => metro * 1000;
