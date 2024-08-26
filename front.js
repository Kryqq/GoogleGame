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
game.settings.pointsToWin = 3
// game.settings.googleJumpInterval = 5000

const tableElement = document.getElementById('grid')
const score1 = document.getElementById('score1')
const score2 = document.getElementById('score2')

game.start()
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      game.movePlayer1Up()
      break
    case 'ArrowDown':
      game.movePlayer1Down()
      break
    case 'ArrowLeft':
      game.movePlayer1Left()
      break
    case 'ArrowRight':
      game.movePlayer1Right()
      break
    case 'w':
      game.movePlayer2Up()
      break
    case 's':
      game.movePlayer2Down()
      break
    case 'a':
      game.movePlayer2Left()
      break
    case 'd':
      game.movePlayer2Right()
      break

    default:
      break
  }
})
const render = () => {
  tableElement.innerHTML = ''
  score1.innerHTML = ''
  score2.innerHTML = ''

  score1.append(game.score[1].points)
  score2.append(game.score[2].points)

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
