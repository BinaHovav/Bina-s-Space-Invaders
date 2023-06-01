'use strict'
const ALIEN_SPEED = 500
const ALIEN = '👽'

var gAliensInterval
var gAliensLocations = getAlienLocations()
var gAliens

var gIsAlienFreeze = true

var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 2
var gAliensLeftColIdx = 3
var gAliensRightColIdx = 10

function createAlien(board) {
  if (gAliensLocations.length === 0) {
    return
  }
  var location = gAliensLocations.shift()

  var alien = {
    id: makeId(),
    location: {
      i: location.i,
      j: location.j,
    },
  }
  gAliens.push(alien)
  board[alien.location.i][alien.location.j].gameObject = ALIEN
}

function createAliens(board) {
  gAliens = []
  for (var i = 0; i < ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT; i++) {
    createAlien(board)
  }
  console.log('gAliens', gAliens)
  // gGhostsInterval = setInterval(moveGhosts, 1000)
}

function getAlienLocations() {
  var aliensLocations = []
  for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
    for (var j = 3; j < ALIENS_ROW_LENGTH + 3; j++) {
      var currLocation = { i: i, j: j }
      aliensLocations.push(currLocation)
    }
  }
  return aliensLocations
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

  console.log('moveAliens')
  gAliensInterval = setInterval(() => {
    shiftAliensRight(gBoard)
    gAliensLeftColIdx++
    gAliensRightColIdx++
    if (gAliensRightColIdx >= BOARD_SIZE - 1) {
      console.log('BOOM')
      shiftAliensDown(gBoard)
      gAliensLeftColIdx = 6
      console.log('gAliensLeftColIdx', gAliensLeftColIdx)
      gAliensRightColIdx = BOARD_SIZE - 1
      console.log('gAliensRightColIdx', gAliensRightColIdx)
      shiftAliensLeft()

      // renderBoard(gBoard)
      // gAliensTopRowIdx++
      // console.log('gAliensTopRowIdx', gAliensTopRowIdx)
      // gAliensBottomRowIdx++
      // console.log('gAliensBottomRowIdx', gAliensBottomRowIdx)
    }
  }, ALIEN_SPEED)
}

function shiftAliensRight(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (j === gAliensLeftColIdx) {
          board[i][j].gameObject = null
          j++
          board[i][j].gameObject = ALIEN
        }
      }
    }
  }
  console.log('After Shift Right', gBoard)

  //Update DOM:
  for (var i = 0; i < gAliens.length; i++) {
    var currAlien = gAliens[i]
    if (
      // currAlien.location.i >= gAliensTopRowIdx &&
      // currAlien.location.i <= gAliensBottomRowIdx &&
      currAlien.location.j === gAliensLeftColIdx
    ) {
      updateCell(currAlien.location, null)
      currAlien.location.j++
    } else if (
      currAlien.location.i >= gAliensTopRowIdx &&
      currAlien.location.i <= gAliensBottomRowIdx
      // &&
      // currAlien.location.j === gAliensRightColIdx
    ) {
      currAlien.location.j++
      updateCell(currAlien.location, ALIEN)
    }
  }
}

function shiftAliensLeft(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (j === gAliensRightColIdx) {
          board[i][j].gameObject = null
          board[i][j - 1].gameObject = ALIEN
          // } else {
          //   return
        }
      }
    }
  }
  console.log('After Shift Left', board)
  // renderBoard(gBoard)

  // Update DOM:
  for (var i = 0; i < gAliens.length; i++) {
    var currAlien = gAliens[i]
    if (
      // currAlien.location.i >= gAliensTopRowIdx &&
      // currAlien.location.i <= gAliensBottomRowIdx &&
      currAlien.location.j === gAliensRightColIdx
    ) {
      console.log('blabla')
      updateCell(currAlien.location, null)
      currAlien.location.j--
    } else if (
      // currAlien.location.i >= gAliensTopRowIdx &&
      // currAlien.location.i <= gAliensBottomRowIdx
      // // &&
      currAlien.location.j === gAliensLeftColIdx
    ) {
      currAlien.location.j--
      updateCell(currAlien.location, ALIEN)
    }
  }
}

function shiftAliensDown(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (i === gAliensTopRowIdx) {
          board[i][j].gameObject = null
          i++
          board[i][j].gameObject = ALIEN
        }
      }
    }
  }
  console.log('After Shift Down', board)

  // Update DOM:
  for (var i = 0; i < gAliens.length; i++) {
    var currAlien = gAliens[i]
    if (
      // currAlien.location.i >= gAliensTopRowIdx &&
      // currAlien.location.i < gAliensBottomRowIdx &&
      currAlien.location.i === gAliensTopRowIdx
    ) {
      updateCell(currAlien.location, null)
      currAlien.location.i++
      // console.log('currAlien.location', currAlien.location)
    }
    if (currAlien.location.i === gAliensBottomRowIdx) {
      console.log('hey')
      currAlien.location.i++
      console.log('currAlien.location', currAlien.location)
      updateCell(currAlien.location, ALIEN)
    }
  }
}
