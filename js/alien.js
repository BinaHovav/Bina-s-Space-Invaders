'use strict'
const ALIEN_SPEED = 500
const ALIEN = '👽'

var gAliensInterval
// var gIsAlienFreeze = true

var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 2
var gAliensLeftColIdx = 3
var gAliensRightColIdx = 10

function createAliens(board) {
  for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
    for (var j = gAliensLeftColIdx; j <= gAliensRightColIdx; j++) {
      board[i][j] = createCell(ALIEN)
    }
  }
}

function handleAlienHit(location) {
  console.log('you hit an Alien')
  gHero.isShoot = false
  console.log('gHero.isShoot: false', gHero.isShoot)
  gGame.aliensCount--
  updateScore()
  checkVictory()
  clearInterval(gLaserInterval)
  gLaserInterval = null
  blinkLaser(location)
  gBoard[location.i - 1][location.j].gameObject = null
  updateCell({ i: location.i - 1, j: location.j }, null)
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
  // gIsAlienFreeze = true
  // console.log('moveAliens')
  gAliensInterval = setInterval(() => {
    if ((gAliensRightColIdx === BOARD_SIZE - 1 && gAliensLeftColIdx === 6) || (gAliensLeftColIdx === 0 && gAliensRightColIdx === 8)) {
      // console.log('BOOM')
      shiftAliensDown(gBoard)
      // gAliensLeftColIdx++
      // gAliensRightColIdx--
      gAliensTopRowIdx++
      gAliensBottomRowIdx++
      console.log('gAliensTopRowIdx', gAliensTopRowIdx)
      console.log('gAliensBottomIdx', gAliensBottomRowIdx)
      console.log('gAliensLeftColIdx', gAliensLeftColIdx)
      console.log('gAliensRightColIdx', gAliensRightColIdx)
      console.log('gBoard44', gBoard)

      // renderBoard(gBoard)
      // console.log('DOWN')
      // console.log('gBoardCHECK', gBoard)
    }
    // console.log('gAliensTopRowIdx', gAliensTopRowIdx)
    if (gAliensTopRowIdx % 2 === 0) {
      console.log('EVEN')
      shiftAliensRight(gBoard)
      gAliensLeftColIdx++
      gAliensRightColIdx++
    } else {
      console.log('ODD')
      shiftAliensLeft(gBoard)
      gAliensLeftColIdx--
      gAliensRightColIdx--
    }

    // renderBoard(gBoard)
  }, 500)
}

function shiftAliensRight(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = board[0].length - 1; j >= 0; j--) {
      if (board[i][j].gameObject === ALIEN) {
        if (j < board.length - 1) {
          board[i][j].gameObject = null
          j++
          board[i][j].gameObject = ALIEN
        } else {
          return
        }
      }
    }
  }
  console.log('After Shift Right', gBoard)
  renderBoard(gBoard)
}

function shiftAliensLeft(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (j > 0) {
          board[i][j].gameObject = null
          j--
          board[i][j].gameObject = ALIEN
        } else {
          return
        }
      }
    }
  }
  console.log('After Shift Left', board)
  renderBoard(gBoard)
}

function shiftAliensDown(board) {
  // Update Model:
  for (var i = board.length - 1; i >= 0; i--) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (i < board.length - 2) {
          board[i][j].gameObject = null
          i++
          board[i][j].gameObject = ALIEN
        } else {
          console.log('Alien Hit The ground')
          return
        }
      }
    }
  }
  console.log('After Shift Down', board)
  renderBoard(gBoard)
}
