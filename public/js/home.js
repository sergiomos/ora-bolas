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

const desenhaBola = () => {
  const bolaRaio = 20;
  const bolaX = coordenadasBola[px].x * 100 + bolaRaio
  const bolaY = coordenadasBola[px].y * 100 + bolaRaio

    if(dentroDaTela(bolaX, bolaY, bolaRaio, bolaRaio)) {
      ctx.beginPath()
      ctx.fillStyle = 'purple';
      ctx.arc(bolaX, bolaY, bolaRaio, 0, 2 * Math.PI);
      ctx.fill();

      px += 1
      anima = requestAnimationFrame(desenhaBola)
    } else {
      cancelAnimationFrame(anima)
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

  return Math.sqrt(dY + dX)
}

const handleStart = async () => {
  const inputX = document.getElementById('x_robo').value;
  const inputY = document.getElementById('y_robo').value;


  px = 0;
  py = 0;
  cancelAnimationFrame(anima);
  cancelAnimationFrame(animaRobo);



  coordenadasRobo = await getCoordenadasRobo(inputX, inputY)
  const inter = coordenadasRobo[coordenadasRobo.length - 1]
  bolas = await getCoordenadasBola()
  coordenadasBola = await bolas.filter((e) => {
    const distanciaa = distancia(inter.x, e.x, inter.y, e.y)
    console.log(distanciaa, e.x);
    return e.x < inter.x && e.y < inter.y && distanciaa < 1
  })
  desenhaBola()
  desenhaRobo()
}

window.onload = () => {

  const startButton = document.getElementById('start');

  canvas = document.getElementById('campo');
  ctx = canvas.getContext('2d');


  
  startButton.addEventListener('click', handleStart);
}
