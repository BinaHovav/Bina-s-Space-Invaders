'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const LASER = '&#8593;'
const SKY = 'SKY'
const GROUND = 'GROUND'

var gBoard
var gGame

function onInit() {
  gGame = {
    isOn: true,
    score: 0,
    aliensCount: 0,
    isVictory: false,
  }
  gAliensTopRowIdx = 0
  gAliensBottomRowIdx = 2
  gAliensLeftColIdx = 3
  gAliensRightColIdx = 10
  gBoard = buildBoard()
  console.log('gBoard', gBoard)
  createHero(gBoard)
  createAliens(gBoard)
  renderBoard(gBoard)
  clearInterval(gAliensInterval)
  moveAliens()
  gGame.score = 0
  updateScore(0)
  closeModal()
}

function buildBoard() {
  const board = []
  for (var i = 0; i < BOARD_SIZE; i++) {
    board.push([])
    for (var j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = createCell()
      if (i === BOARD_SIZE - 1) {
        board[i][j].type = GROUND
      }
    }
  }
  gGame.aliensCount = ALIENS_ROW_COUNT * ALIENS_ROW_LENGTH
  return board
}

function renderBoard(board) {
  var strHTML = '<table>'
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j]

      var cellClass = getClassName({ i: i, j: j }) + ' '
      cellClass += cell.type === SKY ? 'sky' : 'ground'

      const cellObject = board[i][j].gameObject || ''

      strHTML += `<td class="cell ${cellClass}"> ${cellObject}
                  </td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</table>'
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function updateScore(num) {
  gGame.score += num
  document.querySelector('h2 span').innerText = gGame.score
}

function checkVictory() {
  if (gGame.aliensCount === 0) {
    gGame.isVictory = true
    console.log('you won')
    gameOver()
  }
}

function gameOver() {
  clearInterval(gAliensInterval)
  gGame.isOn = false
  var msg = gGame.isVictory ? 'You Won! 🏆' : 'Game Over, Try Again'
  openModal(msg)
}
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
