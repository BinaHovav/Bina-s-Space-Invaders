'use strict'
const ALIEN_SPEED = 500
const ALIEN = '&#128125;'

var gAliensInterval

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gAliensLeftColIdx
var gAliensRightColIdx
// var gIsAlienFreeze = true

function createAliens(board) {
  for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
    for (var j = gAliensLeftColIdx; j <= gAliensRightColIdx; j++) {
      board[i][j] = createCell(ALIEN)
    }
  }
}

function moveAliens() {
  // gIsAlienFreeze = true
  if (!gGame.isOn) return
  gAliensInterval = setInterval(function () {
    if ((gAliensRightColIdx === BOARD_SIZE - 1 && gAliensLeftColIdx === 6) || (gAliensLeftColIdx === 0 && gAliensRightColIdx === 8)) {
      shiftAliensDown(gBoard)
      gAliensTopRowIdx++
      gAliensBottomRowIdx++
    }
    if (gAliensTopRowIdx % 2 === 0) {
      shiftAliensRight(gBoard)
      gAliensLeftColIdx++
      gAliensRightColIdx++
    } else {
      shiftAliensLeft(gBoard)
      gAliensLeftColIdx--
      gAliensRightColIdx--
    }
  }, ALIEN_SPEED)
}

function handleAlienHit(location) {
  gHero.isShoot = false
  gGame.aliensCount--
  updateScore(10)
  checkVictory()
  clearInterval(gLaserInterval)
  gLaserInterval = null
  blinkLaser(location)
  gBoard[location.i - 1][location.j].gameObject = null
  updateCell({ i: location.i - 1, j: location.j }, null)
}

function shiftAliensRight(board) {
  var reachedRightEdge = false
  for (var i = 0; i < board.length; i++) {
    for (var j = board[0].length - 1; j >= 0; j--) {
      if (board[i][j].gameObject === ALIEN) {
        if (j < board.length - 1) {
          board[i][j].gameObject = null
          j++
          board[i][j].gameObject = ALIEN
        } else {
          reachedRightEdge = true
          break
        }
      }
    }
  }
  if (reachedRightEdge) {
    shiftAliensDown(board)
    changeDirection(-1)
    shiftAliensLeft(board)
  }
  renderBoard(gBoard)
}

function shiftAliensLeft(board) {
  var reachedLeftEdge = false
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (j > 0) {
          board[i][j].gameObject = null
          j--
          board[i][j].gameObject = ALIEN
        } else {
          reachedLeftEdge = true
          break
        }
      }
    }
  }
  if (reachedLeftEdge) {
    changeDirection(1)
    shiftAliensDown(gBoard)
    shiftAliensRight(gBoard)
  }
  renderBoard(gBoard)
}

function shiftAliensDown(board) {
  var aliensHitGround = false

  for (var i = board.length - 1; i >= 0; i--) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (i < board.length - 2) {
          board[i][j].gameObject = null
          i++
          board[i][j].gameObject = ALIEN
        } else {
          aliensHitGround = true
          break
        }
      }
    }

    if (aliensHitGround) {
      break
    }
  }

  renderBoard(gBoard)

  if (aliensHitGround) {
    console.log('Aliens Hit The ground')
    gGame.isVictory = false
    gGame.lives--
    updateLives()

    if (gGame.lives >= 1) {
      openModal(`You have ${gGame.lives} lives left`)
    } else {
      gameOver()
    }

    clearInterval(gAliensInterval)
    gAliensInterval = null
  }
}

function changeDirection(dir) {
  gAliensTopRowIdx++
  gAliensBottomRowIdx++
  gAliensLeftColIdx += dir
  gAliensRightColIdx += dir
}

function blowUpNegs(location) {
  for (var i = location.i - 1; i <= location.i + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = location.j - 1; j <= location.j + 1; j++) {
      if (j < 0 || j >= gBoard[0].length) continue
      if (i === location.i && j === location.j) continue
      if (gBoard[i][j].gameObject === LASER) {
        renderBoard(gBoard)
      }
    }
  }
}
