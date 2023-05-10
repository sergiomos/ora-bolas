const {pegarCoordenadas} = require('./coordenadas.js');
const { distancia, tempoInterceptar, consegueInterceptar, interceptou } = require('./uteis.js');

const raioDeInterceptacao = 21.5;

const robo = {
    x: 0,
    y: 0,
    velocidade: 2.8
}

const cordenadasBola = pegarCoordenadas();

let i;
while(true) {
    const  {xBola, yBola, tempo} = cordenadasBola[i]
    const distanciaRoboBola = distancia(robo.x, xBola, robo.y, yBola);

    if(interceptou(distanciaRoboBola, raioDeInterceptacao))
        break;

    const tempoParaInterceptar = 
    i++
}


const inteceptar = cordenadasBola.find(({tempo, xBola, yBola}) => {
    const {dX, dY} = distancia(robo.x, xBola, robo.y, yBola);
    const tempoRoboX = tempoInterceptar(robo.vX, dX);
    const tempoRoboY = tempoInterceptar(robo.vY, dY);
    
    return consegueInterceptar(tempoRoboX, tempo) && consegueInterceptar(tempoRoboY, tempo);
});

const roboPos = [] 

let pos = {tempo: 0, xRobo: 0, yRobo: 0}

while(pos.xRobo <= inteceptar.xBola && pos.yRobo <= inteceptar.xBola){

    pos.xRobo += robo.vX
    pos.yRobo += robo.vY
    pos.tempo += 0.01

    roboPos.push(pos)
}

console.log(roboPos);

console.log(inteceptar);


