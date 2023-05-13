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
  try{
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
  const chartConfig = {
    type: 'scatter',
    data: {
      labels: coordenadasBola.filter((a,i )=> i < 15).map(row => row.tempo),
      datasets: [
        {
          label: 'Bola',
          data: coordenadasBola.map(row => row.xBola)
        },
        {
          label: 'Robo',
          data: coordenadasRobo.map(row => row.x)
        }
      ]
    },
    options: {
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
  const chartConfig = {
    type: 'scatter',
    data: {
      labels: coordenadasBola.filter((a,i )=> i < 15).map(row => row.tempo),
      datasets: [
        {
          label: 'Bola',
          data: coordenadasBola.map(row => row.yBola)
        },
        {
          label: 'Robo',
          data: coordenadasRobo.map(row => row.y)
        }
      ]
    },
    options: {
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
    datasets: [{
      label: 'Bola',
      data: coordenadasBola.map(({xBola, yBola}) =>( {x: xBola, y: yBola})),
    },
    {
      label: 'Robo',
      data: coordenadasRobo.map(({y, x}) => ( {x, y})),
    }
  ]
  }
  const chartConfig = {
    type: 'scatter',
    data: data,
    options: {
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

const handleStart = async() => {
  const roboX = document.getElementById('x_robo').value;
  const RoboY = document.getElementById('y_robo').value;

  const coordenadasBola = await getCoordenadasBola();
  const coordenadasRobo = await getCoordenadasRobo(roboX, RoboY);

  console.log('bola', coordenadasBola);
  console.log('Robo', coordenadasRobo);

  await gerarGraficos(coordenadasBola, coordenadasRobo);
}

window.onload = () => {
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', handleStart);
}


