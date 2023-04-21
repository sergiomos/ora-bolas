const posicoesRobo = [];
const posicoesBola = [];

const adicionarPosicaoRobo = (tempo, x, y) => {
  const posicao = { tempo, x, y };
  posicoesRobo.append(posicao);
}

const adicionarPosicaoBola = (tempo, x, y) => {
  const posicao = { tempo, x, y };
  posicoesBola.append(posicao);
}
