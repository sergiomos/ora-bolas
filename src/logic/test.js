const { pegarCoordenadas } = require("./coordenadas");

// Função para calcular a distância entre dois pontos no plano cartesiano
function calcularDistancia(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Função para calcular os pontos em que o robô passará até interceptar a bola
function calcularPontosInterceptacao(xRobo, yRobo, xBola, yBola, vxBola, vyBola, trajetoriaBola) {
  const pontosInterceptacao = [];
  
  let t = 0;
  let xInterceptacao, yInterceptacao;
  let distanciaRoboBola, distanciaRoboInterceptacao;
  
  while (true) {
    // Calcular a posição da bola no tempo t
    const {xBolaT, yBolaT} = trajetoriaBola();
    
    // Calcular a distância entre o robô e a bola no tempo t
    distanciaRoboBola = calcularDistancia(xRobo, yRobo, xBolaT, yBolaT);
    
    // Calcular o tempo de interceptação
    const tempoInterceptacao = distanciaRoboBola / calcularDistancia(vxBola, vyBola, 0, 0);
    
    // Calcular a posição de interceptação do robô com a bola
    xInterceptacao = xBolaT + vxBola * tempoInterceptacao;
    yInterceptacao = yBolaT + vyBola * tempoInterceptacao;
    
    // Calcular a distância entre o robô e a posição de interceptação
    distanciaRoboInterceptacao = calcularDistancia(xRobo, yRobo, xInterceptacao, yInterceptacao);
    
    // Adicionar a posição de interceptação aos pontos de interceptação
    pontosInterceptacao.push([xInterceptacao, yInterceptacao]);
    
    // Verificar se o robô já interceptou a bola
    if (distanciaRoboInterceptacao < 1) {
      break;
    }
    
    // Atualizar o tempo t para o próximo cálculo
    t += 2; // Atualizar a cada 2 segundos (tempo de atualização da posição da bola)
  }
  
  return pontosInterceptacao;
}

// Exemplo de uso:
const xRobo = 0;
const yRobo = 0;
const xBola = 10;
const yBola = 10;
const vxBola = 1;
const vyBola = 1;

// Função de trajetória da bola (exemplo: movimento retilíneo uniforme)
function trajetoriaBola(t) {
  // Atualizar a posição da bola a cada 2 segundos
  const tempoAtualizacaoBola = 2;
  const tAtualizado = Math.floor(t / tempoAtualizacaoBola) * tempoAtualizacaoBola;
  return [xBola + vxBola * tAtualizado, yBola + vyBola * tAtualizado];
}

const pontosInterceptacao = calcularPontosInterceptacao(xRobo, yRobo, xBola, yBola, vxBola, vyBola, pegarCoordenadas);
console.log("Pontos de interceptação:", pontosInterceptacao)
