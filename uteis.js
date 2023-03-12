
const distancia = (x1, x2, y1, y2) => {
  const x = Math.pow((x2 - x1), 2);
  const y = Math.pow((y2 - y1), 2);

  return Math.sqrt(x + y);
}

const tempo = (velocidade, distancia) => {
  return distancia / velocidade;
}

const posicaoFutura = (posicaoAtual, velocidade, tempo) => {
  return posicaoAtual + (velocidade * tempo);
}

const consegueInterceptar = (tempoRobo, tempoBola) => {
  return tempoRobo < tempoBola;
}

const interceptou = (distancia, raioDeInterceptacao) => {
  return distancia < raioDeInterceptacao;
}
