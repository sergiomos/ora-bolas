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

let xBolaRoboPorTempoChart, yBolaRoboPorTempoChart, bolaRoboInterceptacaoChart;

const gerarGraficos = async (coordenadasBola, coordenadasRobo) => {
  try {
    xBolaRoboPorTempoChart.destroy();
    yBolaRoboPorTempoChart.destroy();
    bolaRoboInterceptacaoChart.destroy();
  } finally {
    xBolaRoboPorTempoChart = await xBolaRoboPorTempo(coordenadasBola, coordenadasRobo);
    yBolaRoboPorTempoChart = await yBolaRoboPorTempo(coordenadasBola, coordenadasRobo);
    bolaRoboInterceptacaoChart = await bolaRoboInterceptacao(coordenadasBola, coordenadasRobo);
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

const xBolaRoboPorTempo = async (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('x-robo-bola');

  const data = {
    datasets: [
      {
        label: 'Robo',
        data: coordenadasRobo.map(({ x, tempo }) => ({ x: tempo, y: x })),

      },
      {
        label: 'Bola',
        data: coordenadasBola.map(({ x, tempo }) => ({ x: tempo, y: x })),
      }

    ]
  }

  const chartConfig = configs({
    textX: 'Tempo',
    textY: 'X',
    title: 'Pontos X bola e do robô em relação ao tempo',
    data
  })

  const chart = new Chart(canvas, chartConfig);
  return chart;
}

const yBolaRoboPorTempo = async (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('y-robo-bola');

  const data = {
    datasets: [
      {
        label: 'Robo',
        data: coordenadasRobo.map(({ y, tempo }) => ({ x: tempo, y: y })),

      },
      {
        label: 'Bola',
        data: coordenadasBola.map(({ y, tempo }) => ({ x: tempo, y: y })),
      }

    ]
  }
  const chartConfig = configs({
    textX: 'Tempo',
    textY: 'Y',
    title: 'Pontos Y bola e do robô em relação ao tempo',
    data
  })


  const chart = new Chart(canvas, chartConfig);
  return chart;
}

const bolaRoboInterceptacao = async (coordenadasBola, coordenadasRobo) => {
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

const handleStart = async () => {
  const roboX = document.getElementById('x_robo').value;
  const RoboY = document.getElementById('y_robo').value;

  const coordenadasRobo = await getCoordenadasRobo(roboX, RoboY);
  const inter = coordenadasRobo[coordenadasRobo.length - 1]
  const tete = await getCoordenadasBola();
  const coordenadasBola = await tete.filter((e) => e.x <= inter.x && e.y <= inter.y);

  await gerarGraficos(coordenadasBola, coordenadasRobo);
}

window.onload = () => {
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', handleStart);
}


