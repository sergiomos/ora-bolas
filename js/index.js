const {pegarCordenadas} = require('./cordenadas.js');
const { distancia, tempoInterceptar, consegueInterceptar } = require('./uteis.js');

const robo = {
    x: 2,
    y: 3,
    velocidade: 2.8,
    aceleracao: 0
}

const cordenadasBola = pegarCordenadas();

const inteceptar = cordenadasBola.find(({tempo, xBola, yBola}) => {
    const distanciaRobo = distancia(robo.x, xBola, robo.y, yBola);
    const tempoRobo = tempoInterceptar(robo.velocidade, distanciaRobo);
    
    return consegueInterceptar(tempoRobo, tempo);
});


console.log(inteceptar);


