const { pegarCoordenadasBola: pegarCoordenadas } = require('./coordenadas.js');
const { distancia, tempoInterceptar, consegueInterceptar, interceptou } = require('./uteis.js');

const raioDeInterceptacao = 2.15;
const velocidadeMaxima = 2.8;

const pontoDeInterceptacao = (roboX, roboY, velocidade) => {
    const cordenadasBola = pegarCoordenadas();

    const inteceptar = cordenadasBola.find(({ tempo, xBola, yBola }) => {
        const dist = distancia(roboX, xBola, roboY, yBola, raioDeInterceptacao);
        const tempoRobo = tempoInterceptar(dist, velocidade);
        return consegueInterceptar(tempoRobo, tempo);
    });

    return {x: inteceptar.xBola, y: inteceptar.yBola, tempo: inteceptar.tempo};
}


const pegarCoordenadasRobo = (x, y) => {
    const pontoFinal = pontoDeInterceptacao(x, y, velocidadeMaxima);
    console.log(pontoFinal);
    const pos = [];
    
    for(tempo = 0; tempo != pontoFinal.tempo; tempo += 0.01){
        const x2 = velocidadeMaxima/pontoFinal.tempo - y
        const y2 = velocidadeMaxima/pontoFinal.tempo - x

        pos.push({x: x2, y: y2, tempo})
    }

    return pos
}

console.log(pegarCoordenadasRobo(9, 8));

