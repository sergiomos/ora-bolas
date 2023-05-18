const velocidade = (coordenadas) => coordenadas.map((pos, i, arr) => {
    if (i == 0 || i == arr.length - 1)
      return { tempo: pos.tempo, vx: 0, vy: 0 };

    const nextPos = arr[i + 1];
    const vx = Math.abs(pos.x - nextPos.x).toFixed(2)
    const vy = Math.abs(pos.y - nextPos.y).toFixed(2);

    return { tempo: pos.tempo, vx, vy }
  });


const aceleracao = (coordenadas) => coordenadas.map((pos, i, arr) => {
  let ax, ay;

  const firstOrLast = i == 0;

  switch (true) {
    case firstOrLast:
      ax = 0;
      ay = 0
      break;

    default:
      const previousPos = arr[i - 1];
      ax = (pos.vx - previousPos.vx).toFixed(2)
      ay = (pos.vy - previousPos.vy).toFixed(2);
      break;a
  }

  return { tempo: pos.tempo, ax, ay }
});

const distancia = (bola, robo) => {

  const distancias = robo.map(({tempo, x, y}, i) => {
    const dX = Math.pow((bola[i].x - x), 2);
    const dY = Math.pow((bola[i].y - y), 2);
  
    return {tempo, d: Math.sqrt(dY + dX) - (21.5/100)}
  })
 
  return distancias;
}

