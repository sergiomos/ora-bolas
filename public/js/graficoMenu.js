const options = document.getElementsByClassName('graficoMenu');

const getCanvasId = (option) => {
  switch (option) {
    case 'grafico1':
      return 'xBolaRobo'

    case 'grafico2':
      return 'yBolaRobo'

    case 'grafico3':
      return 'interceptacaoSpan'

    default:
      return 'xBolaRobo';
  }
}

const updateCanvasVisibility = (id) => {
  const canvas = document.getElementsByClassName('grafico');

  for (const canva of canvas) {
    canva.classList.remove('selectedGraph')
    if (canva.id == id) {
      canva.classList.add('selectedGraph')
    }
  }

}

const updatedSelectedOption = (optionSelected) => {
  for (const opition of options) {
    opition.classList.remove('selected');
  }

  optionSelected.classList.add('selected')
}

const handleOptionClick = ({ target }) => {
  const id = getCanvasId(target.id);

  updatedSelectedOption(target)
  updateCanvasVisibility(id);
  
}


for (const option of options) {
  option.addEventListener('click', handleOptionClick)
}
