const {pegarCoordenadas} = require('./coordenadas.js');
const { distancia, tempoInterceptar, consegueInterceptar } = require('./uteis.js');

const robo = {
    x: 2,
    y: 3,
    vX: 2.8,
    vY: 2.8,
}

const cordenadasBola = pegarCoordenadas();

const inteceptar = cordenadasBola.find(({tempo, xBola, yBola}) => {
    const distanciaRobo = distancia(robo.x, xBola, robo.y, yBola);
    const tempoRobo = tempoInterceptar(robo.velocidade, distanciaRobo);
    
    return consegueInterceptar(tempoRobo, tempo);
});


console.log(inteceptar);


