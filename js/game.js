'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '🔱'
const LASER = '&#8593;'
const SKY = 'SKY'
const EARTH = 'EARTH'
const EMPTY = ''

var gBoard
var gGame = {
  isOn: true,
  aliensCount: 0,
  isVictory: false,
}

function onInit() {
  gBoard = buildBoard()
  console.log('gBoard', gBoard)
  createAliens(gBoard)
  createHero(gBoard)
  renderBoard(gBoard, '.board-container')

  //   closeModal()
}

function buildBoard() {
  const board = []
  for (var i = 0; i < BOARD_SIZE; i++) {
    board.push([])
    for (var j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = createCell()
      //   gGame.aliensCount++
      if (i === BOARD_SIZE - 1) {
        // console.log('BOARD_SIZE.length', BOARD_SIZE.length)
        board[i][j].type = EARTH
        // gGame.foodCount--
      }
      if (i === 0 || i === 1 || i === 2) {
        board[i][j].gameObject = ALIEN
      }
      if (
        j === 0 ||
        j === 1 ||
        j === 2 ||
        j === 3 ||
        j === BOARD_SIZE - 1 ||
        j === BOARD_SIZE - 2 ||
        j === BOARD_SIZE - 3 ||
        j === BOARD_SIZE - 4
      ) {
        board[i][j].gameObject = null
      }
    }
  }
  //   addPowerFood(board)
  return board
}

function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  }
}

// position such as: {i: 2, j: 7}
function updateCell(location, gameObject = null) {
  gBoard[location.i][location.j].gameObject = gameObject
  var elCell = getElCell(location)
  console.log('elCell: ', elCell)
  elCell.innerHTML = gameObject || ''
}

function getElCell(location) {
  return document.querySelector(`.cell-${location.i}-${location.j}`)
}

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      var cellClass = getClassName({ i: i, j: j }) + ' ' // 'cell-0-0 '
      cellClass += currCell.type === SKY ? 'sky' : 'earth' // 'cell-0-0 wall'

      strHTML += `<td class="cell ${cellClass}">`

      if (currCell.gameObject === HERO) {
        strHTML += HERO
      } else if (currCell.gameObject === ALIEN) {
        strHTML += ALIEN
      } else if (currCell.gameObject === LASER) {
        strHTML += LASER
      }
      strHTML += '</td>'
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }

// function renderCell(pos, value) {
//   // Select the elCell and set the value
//   const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//   elCell.innerHTML = value
// }

// function addPowerFood(board) {
//   board[1][1] = POWER_FOOD
//   board[1][board[0].length - 2] = POWER_FOOD
//   board[board.length - 2][1] = POWER_FOOD
//   board[board.length - 2][board[0].length - 2] = POWER_FOOD
//   gGame.foodCount -= 4
// }

// function updateScore(diff) {
//   // Model
//   gGame.score += diff
//   // DOM
//   document.querySelector('h2 span').innerText = gGame.score
// }

// function addCherry() {
//   var emptyLocation = getEmptyLocation(gBoard)
//   if (!emptyLocation) return
//   // Update Model
//   gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
//   // Update DOM
//   renderCell(emptyLocation, CHERRY)
// }

// function getEmptyLocation(board) {
//   var emptyLocations = []
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[0].length; j++) {
//       if (board[i][j] === EMPTY) {
//         emptyLocations.push({ i, j })
//       }
//     }
//   }
//   if (!emptyLocations.length) return null
//   var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
//   return emptyLocations[randIdx]
// }

// function gameOver() {
//   console.log('Game Over')
//   clearInterval(gGhostsInterval)
//   clearInterval(gCherryInterval)
//   gGame.isOn = false
//   renderCell(gPacman.location, EMPTY)
//   var msg = gGame.isVictory ? 'You Won!!!' : 'Game Over'
//   openModal(msg)
// }

// function checkVictory() {
//   if (gGame.foodCount === 0) {
//     gGame.isVictory = true
//     gameOver()
//   }
// }

// function openModal(msg) {
//   const elModal = document.querySelector('.modal')
//   const elSpan = elModal.querySelector('.msg')
//   elSpan.innerText = msg
//   elModal.style.display = 'block'
// }

// function closeModal() {
//   const elModal = document.querySelector('.modal')
//   elModal.style.display = 'none'
// }

// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}
