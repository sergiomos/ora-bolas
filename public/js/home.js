let canvas, ctx;

let px = 0;
let anima;

let bolaCoordenadas;

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
  const bolaX = bolaCoordenadas[px].xBola*100 + 20;
  const bolaY = bolaCoordenadas[px].yBola*100 + 20;
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

const changeRoboPosition = ({ target }) => {
  const positionName = target.name[0];
  const position = target.value || 0;

  robo[positionName] = parseFloat(position);

  // fetch('coordenadas/bola')
  // .then((res) => res.json())
  // .then((data) => console.log(data))
}

const handleStart = () => {
  px = 0;
  cancelAnimationFrame(anima);
  desenhaBola()
}

window.onload = () => {
  const inputX = document.getElementById('x_robo');
  const inputY = document.getElementById('y_robo');
  const startButton = document.getElementById('start');

  canvas = document.getElementById('campo');
  ctx = canvas.getContext('2d');

  getCoordenadasBola().then(c => bolaCoordenadas = c);

  inputX.addEventListener('input', changeRoboPosition);
  inputY.addEventListener('input', changeRoboPosition);
  startButton.addEventListener('click', handleStart);

}
