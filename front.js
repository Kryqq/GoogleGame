import { Game } from './game.js'
import { EventEmitter } from './eventEmitter.js'

const eventEmitter = new EventEmitter()
const game = new Game(eventEmitter)

game.settings = {
  gridSize: {
    columns: 4,
    rows: 4,
  },
}

const tableElement = document.getElementById('grid')

game.start()
const render = () => {
  tableElement.innerHTML = ''
  for (let y = 1; y <= game.settings.gridSize.rows; y++) {
    const trElement = document.createElement('tr')
    tableElement.append(trElement)

    for (let x = 1; x <= game.settings.gridSize.columns; x++) {
      const tdElement = document.createElement('td')
      trElement.append(tdElement)

      if (game.google.position.x === x && game.google.position.y === y) {
        const imgElement = document.createElement('img')
        imgElement.src = '#'
        imgElement.alt = 'google img'
        tdElement.append(imgElement)
      }
      if (game.player1.position.x === x && game.player1.position.y === y) {
        const imgElement = document.createElement('img')
        imgElement.src = '#'
        imgElement.alt = 'player1'
        tdElement.append(imgElement)
      }
      if (game.player2.position.x === x && game.player2.position.y === y) {
        const imgElement = document.createElement('img')
        imgElement.src = '#'
        imgElement.alt = 'player2'
        tdElement.append(imgElement)
      }
    }
  }
}
render()
game.eventEmitter.subscribe('changePosition', render)
