const {pegarCoordenadas} = require('./coordenadas.js');
const { distancia, tempoInterceptar, consegueInterceptar } = require('./uteis.js');

const robo = {
    x: 8,
    y: 4,
    vX: 2.8,
    vY: 2.8,
}

const cordenadasBola = pegarCoordenadas();

const inteceptar = cordenadasBola.find(({tempo, xBola, yBola}) => {
    const {dX, dY} = distancia(robo.x, xBola, robo.y, yBola);
    const tempoRoboX = tempoInterceptar(robo.vX, dX);
    const tempoRoboY = tempoInterceptar(robo.vY, dY);
    
    return consegueInterceptar(tempoRoboX, tempo) && consegueInterceptar(tempoRoboY, tempo);
});


console.log(inteceptar);


