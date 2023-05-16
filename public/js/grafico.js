let canvas, ctx;

const getCoordenadasBola = async () => {
  const res = await fetch('/coordenadas/bola')
  const body = await res.json();

  return body.data;
}

const getCoordenadasRobo = async (roboX, roboY) => {
  const res = await fetch(`/coordenadas/robo?x=${roboX}&y=${roboY}`)
  const body = await res.json();

  return body.data;
}

let xyBolaRoboPorTempoChart, bolaRoboInterceptacaoChart, velocidadesBolaRoboChart;

const gerarGraficos = (coordenadasBola, coordenadasRobo) => {
  try {
    xyBolaRoboPorTempoChart.destroy();
    bolaRoboInterceptacaoChart.destroy();
    velocidadesBolaRoboChart.destroy();
  } finally {
    xyBolaRoboPorTempoChart =  xyBolaRoboPorTempo(coordenadasBola, coordenadasRobo);
    bolaRoboInterceptacaoChart =  bolaRoboInterceptacao(coordenadasBola, coordenadasRobo);
    velocidadesBolaRoboChart =  velocidadesBolaRobo(coordenadasBola, coordenadasRobo);
  }
}

const configs = ({ textX, textY, title, data }) => ({
  type: 'scatter',
  data,
  options: {
    showLine: true,
    borderDash: [3, 8],
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: textX,
        }
      },
      y: {
        title: {
          display: true,
          text: textY,
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: title
      },
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      }
    }
  }
})

const bolaRoboInterceptacao = (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('interceptacao');

  const data = {
    datasets: [
      {
        label: 'Robo',
        data: coordenadasRobo.map(({ y, x }) => ({ x, y })),

      },
      {
        label: 'Bola',
        data: coordenadasBola.map(({ x, y }) => ({ x, y })),
      }

    ]
  }
  const chartConfig = configs({
    textX: 'X',
    textY: 'Y',
    title: 'Trajetórias da bola e do robô até o ponto de interceptação',
    data
  })

  const chart = new Chart(canvas, chartConfig);
  return chart;
}

const xyBolaRoboPorTempo = (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('xy-robo-bola');

  const data = {
    datasets: [
      {
        label: 'Robo X',
        data: coordenadasRobo.map(({ x, tempo }) => ({ x: tempo, y: x })),

      },
      {
        label: 'Bola X',
        data: coordenadasBola.map(({ x, tempo }) => ({ x: tempo, y: x })),
      },
      {
        label: 'Robo Y',
        data: coordenadasRobo.map(({ y, tempo }) => ({ x: tempo, y: y })),

      },
      {
        label: 'Bola Y',
        data: coordenadasBola.map(({ y, tempo }) => ({ x: tempo, y: y })),
      }

    ]
  }

  const chartConfig = configs({
    textX: 'Tempo',
    textY: 'X e Y',
    title: 'Pontos X e Y da bola e do robô em relação ao tempo',
    data
  })

  const chart = new Chart(canvas, chartConfig);
  return chart;
}

const velocidadesBolaRobo = (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('vx-vy-robo-bola');

  const velocidadeBola = velocidade(coordenadasBola);
  const velocidadeRobo = velocidade(coordenadasRobo);

  console.log(velocidadeBola, velocidadeRobo);

  const data = {
    datasets: [
      {
        label: 'Robo Vx',
        data: velocidadeRobo.map(({ vx, tempo }) => ({ x: tempo, y: vx }))

      },
      {
        label: 'Bola Vx',
        data: velocidadeBola.map(({ vx, tempo }) => ({ x: tempo, y: vx }))
      },
      {
        label: 'Robo Vx',
        data: velocidadeRobo.map(({ vy, tempo }) => ({ x: tempo, y: vy }))

      },
      {
        label: 'Bola Vy',
        data: velocidadeBola.map(({ vy, tempo }) => ({ x: tempo, y: vy }))
      }

    ]
  }

  const chartConfig = configs({
    textX: 'Tempo',
    textY: 'vX e vY',
    title: 'vX e vY da bola e do robô em relação ao tempo',
    data
  })

  const chart = new Chart(canvas, chartConfig);
  return chart;
}


const handleStart = async () => {
  const roboX = document.getElementById('x_robo').value;
  const RoboY = document.getElementById('y_robo').value;

  const coordenadasRobo = await getCoordenadasRobo(roboX, RoboY);
  const inter = coordenadasRobo[coordenadasRobo.length - 1]
  const tete = await getCoordenadasBola();
  const coordenadasBola = await tete.filter((e) => e.x <= inter.x && e.y <= inter.y);

  gerarGraficos(coordenadasBola, coordenadasRobo);
}

window.onload = () => {
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', handleStart);
}


