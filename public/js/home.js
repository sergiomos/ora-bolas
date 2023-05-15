let canvas, ctx;

let px = 0;
let py = 0;
let anima;
let animaRobo;

let bolaCoordenadas;
let roboCoordenadas;

const dentroDaTela = (x, y, width, height) => {
  const dentroDeX = x > 0 && x + width < canvas.width
  const dentroDeY =  y > 0 && y + height < canvas.height

  return dentroDeX && dentroDeY;
}

const getCoordenadasBola = async () => {
  const res = await fetch('/coordenadas/bola')
  const body = await res.json();
  
  return body.data;
}

const getCoordenadasRobo = async () => {
  const res = await fetch('/coordenadas/robo')
  const body = await res.json();
  
  return body.data;
}

const desenhaBola = () => {
  const bolaX = bolaCoordenadas[px].x*100 + 20;
  const bolaY = bolaCoordenadas[px].y*100 + 20;
  const bolaRaio = 20;

  if(dentroDaTela(bolaX, bolaY, bolaRaio, bolaRaio)) {
    ctx.clearRect(0, 0, 900, 530)
    ctx.beginPath()
    ctx.fillStyle = 'purple';
    ctx.arc(bolaX, bolaY, bolaRaio, 0, 2 * Math.PI);
    ctx.fill();
    px++
  
    anima = requestAnimationFrame(desenhaBola);

  } else {
    cancelAnimationFrame(anima);
  }
}

const desenhaRobo = () => {
  console.log(roboCoordenadas);
  let roboX = roboCoordenadas[py].x*100 + 20;
  let roboY = roboCoordenadas[py].y*100 + 20;
  const roboRaio = 30;

  if(dentroDaTela(roboX, roboY, roboRaio, roboRaio) && roboX && roboY) {
    ctx.clearRect(0, 0, 900, 530)
    ctx.beginPath()
    ctx.fillStyle = 'purple';
    ctx.arc(roboX, roboY, roboRaio, 0, 2 * Math.PI);
    ctx.fill();
    py++
  
    animaRobo = requestAnimationFrame(desenhaRobo);

  } else {

    ctx.beginPath()
    ctx.fillStyle = 'purple';
    ctx.arc(roboX, roboY, roboRaio, 0, 2 * Math.PI);
    ctx.fill();
    cancelAnimationFrame(animaRobo);
  }
}


const handleStart = () => {
  px = 0;
  py = 0;
  cancelAnimationFrame(anima);
  cancelAnimationFrame(animaRobo);
  desenhaBola()
  desenhaRobo()
}

window.onload = () => {
  const inputX = document.getElementById('x_robo');
  const inputY = document.getElementById('y_robo');
  const startButton = document.getElementById('start');

  canvas = document.getElementById('campo');
  ctx = canvas.getContext('2d');

  getCoordenadasBola().then(c => bolaCoordenadas = c);
  getCoordenadasRobo().then(c => roboCoordenadas = c);
  
  startButton.addEventListener('click', handleStart);
}
