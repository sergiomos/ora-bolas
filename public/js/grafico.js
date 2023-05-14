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

const xBolaRoboPorTempo = async (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('x-robo-bola');
  const data = {
    datasets: [{
      label: 'Bola',
      data: coordenadasBola.map(({ x, tempo }) => ({ x, tempo }))
    },
      // {
      //   label: 'Robo',
      //   data: coordenadasRobo.map(({ x, tempo }) => ({ x, tempo }))
      // }
    ]
  };
  const chartConfig = {
    type: 'line',
    data: data,
    options: {
      borderDash: [3, 4],
      tension: 0.3,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  }

  const chart = new Chart(canvas, chartConfig);
  return chart;
}

const yBolaRoboPorTempo = async (coordenadasBola, coordenadasRobo) => {
  const canvas = document.getElementById('y-robo-bola');


  const data = {
    datasets: [{
      label: 'Bola',
      data: coordenadasBola.map(({ y, tempo }) => ({ y, tempo }))
    },
    {
      label: 'Robo',
      data: coordenadasRobo.map(({ y, tempo }) => ({ y, tempo }))
    }
    ]
  };
  const chartConfig = {
    type: 'line',
    data: data,
    options: {
      borderDash: [3, 4],
      tension: 0.3,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  }

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
        radius: 1
      }

    ]
  }
  const chartConfig = {
    type: 'scatter',
    data: data,
    options: {
      showLine: true,
      tension: 0.3,
      borderDash: [3, 4],
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'X',
          }
        },
        y: {
          title: {
            display: true,
            text: 'Y',
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Trajetórias da bola e do robô até o ponto de interceptação'
        },
        legend: {
          display: true,
          labels: {
            color: 'rgb(255, 99, 132)'
          }
        }
      }
    }
  }

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


