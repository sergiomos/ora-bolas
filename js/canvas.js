const { pegarCordenadas } = require("./cordenadas");

const campo = document.getElementById("campo");
const bola = document.getElementById("bola");
const robo = document.getElementById("robo");

const ctx = campo.getContext("2d");

const campoConfig = {
  width: 900,
  height: 530
};

const bolaPa = {
  x: 0,
  y: 0,
}

const invertField = (x, y) => ({x, y: y == 0? campoConfig.height : campoConfig.height - y});

const toEscale = (number) => number / 3;

const desenharRobo = (ctx, a, b, r) => {
  const {x, y} = invertField(a, b);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

const desenharBola = (ctx, a, b, r) => {
  const {x, y} = invertField(a, b);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

const mover = (x, y) => {
  desenharBola(ctx, x, y, 20);
}


function animacao(){
  const cord = pegarCordenadas();
  cord.forEach(({xBola, yBola}) => mover(xBola, yBola))

}

animacao();







