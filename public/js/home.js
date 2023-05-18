let canvas, ctx;

let px = 0;
let py = 0;
let anima;
let animaRobo;

let coordenadasBola, coordenadasRobo;

const dentroDaTela = (x, y, width, height) => {
  const dentroDeX = x >= 0 && x + width <= canvas.width
  const dentroDeY =  y >= 0 && y + height <= canvas.height

  return dentroDeX && dentroDeY;
}

const getCoordenadasBola = async () => {
  const res = await fetch('/coordenadas/bola')
  const body = await res.json();
  
  return body.data;
}

const getCoordenadasRobo = async (x, y) => {
  const res = await fetch(`/coordenadas/robo?x=${x}&y=${y}`)
  const body = await res.json();
  
  return body.data;
}

const desenha = (x, y, raio, color) => {
    if(dentroDaTela(x, y, raio, raio)) {
      ctx.beginPath()
      ctx.fillStyle = color;
      ctx.arc(x, y, raio, 0, 2 * Math.PI);
      ctx.fill();
    }
}

const desenhaRobo = () => {
  const roboRaio = 30;
  const roboX = coordenadasRobo[py].x * 100 + roboRaio
  const roboY = coordenadasRobo[py].y * 100 + roboRaio
  
  if(dentroDaTela(roboX, roboY, roboRaio, roboRaio) || py < coordenadasRobo.length) {
    py++
  }

  ctx.beginPath()
  ctx.fillStyle = 'red';
  ctx.arc(roboX, roboY, roboRaio, 0, 2 * Math.PI);
  ctx.fill();

  animaRobo = requestAnimationFrame(desenhaRobo);
}

const distancia = (xRobo, xBola, yRobo, yBola) => {
  const dX = Math.pow((xBola - xRobo), 2);
  const dY = Math.pow((yBola - yRobo), 2);

  return Math.sqrt(dY + dX) - RAIO_INTERCEPTACAO_M
}

const interceptou = (distancia) =>  distancia <= 21.5/100;

const desenharTudo = () => {
  const bolaRaio = 20;
  const bolaX = coordenadasBola[px].x * 100 + bolaRaio
  const bolaY = coordenadasBola[px].y * 100 + bolaRaio

  const roboRaio = 30;
  const roboX = coordenadasRobo[py].x * 100 + roboRaio
  const roboY = coordenadasRobo[py].y * 100 + roboRaio

  ctx.clearRect(0,0, canvas.width, canvas.height);
  const ttt = 30.9
  const teste = bolaX + ttt > roboX &&
  bolaX - ttt < roboX + roboRaio &&
  bolaY + ttt > roboY &&
  bolaY - ttt < roboY + roboRaio

  if(bolaX && bolaY && !teste) {
    desenha(bolaX, bolaY, bolaRaio, 'purple');
    px ++
  } else {
    px--
  }

  

 if(roboX && roboY) {
    desenha(roboX, roboY, roboRaio, 'red');
 }
 if(py != coordenadasRobo.length -1) {
  py ++
}

  anima = requestAnimationFrame(desenharTudo)
}


const handleStart = async () => {
  const inputX = document.getElementById('x_robo').value;
  const inputY = document.getElementById('y_robo').value;


  px = 0;
  py = 0;
  cancelAnimationFrame(anima);
 // cancelAnimationFrame(animaRobo);



  coordenadasRobo = await getCoordenadasRobo(inputX, inputY)
  coordenadasBola = await getCoordenadasBola()
  
  desenharTudo()
  //desenhaRobo()
}

window.onload = () => {

  const startButton = document.getElementById('start');

  canvas = document.getElementById('campo');
  ctx = canvas.getContext('2d');


  
  startButton.addEventListener('click', handleStart);
}
