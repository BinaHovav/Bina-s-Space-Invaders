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
    aliensCount: 0,
    score: 0,
    isVictory: false,
  }
  gBoard = buildBoard()
  console.log('gBoard', gBoard)
  createAliens(gBoard)
  createHero(gBoard)
  renderBoard(gBoard)
  console.log('gGame.aliensCount', gGame.aliensCount)

  gLaserInterval = null
  // shiftAliensRight(gBoard)
  // shiftAliensLeft(gBoard)
  // shiftAliensDown(gBoard)
  moveAliens()
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
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      var cellClass = getClassName({ i: i, j: j }) + ' ' // 'cell-0-0 '
      cellClass += currCell.type === SKY ? 'sky' : 'ground' // 'cell-0-0 wall'

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

function updateScore() {
  // Model
  gGame.score += 10
  // DOM
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
