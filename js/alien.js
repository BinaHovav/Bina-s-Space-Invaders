'use strict'
const ALIEN_SPEED = 500
const ALIEN = '👽'

var gAliensInterval
var gAliensLocations = getAlienLocations()
var gAliens

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gAliensLeftColIdx
var gAliensRightColIdx

var gIsAlienFreeze = true

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

function handleAlienHit(location) {} //GET BACK TO THIS LATER!!

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
  console.log('moveAliens')
  gAliensInterval = setInterval(() => {
    shiftAliensRight(gBoard)
    gAliensLeftColIdx++
    gAliensRightColIdx++
    // gAliensBottomRowIdx--
    // gAliensTopRowIdx--
  }, ALIEN_SPEED)
}

function shiftAliensRight(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      // var currCell = board[i][j]
      if (board[i][j].gameObject === ALIEN) {
        if (j === gAliensLeftColIdx && board[i][j].gameObject === ALIEN) {
          board[i][j].gameObject = null
        }
      }
      if (j === gAliensRightColIdx + 1 && board[i][j].gameObject === null) {
        board[i][j].gameObject = ALIEN
      }
    }
  }
  console.log('After Shift Right', gBoard)

  //Update DOM:

  for (var i = 0; i < gAliens.length; i++) {
    var currAlien = gAliens[i]
    if (
      currAlien.location.i >= gAliensTopRowIdx &&
      currAlien.location.i <= gAliensBottomRowIdx &&
      currAlien.location.j === gAliensLeftColIdx
    ) {
      updateCell(currAlien.location, null)
      currAlien.location.j++
    } else if (currAlien.location.i >= 0 && currAlien.location.i <= 2 && currAlien.location.j === gAliensRightColIdx) {
      currAlien.location.j++
      updateCell(currAlien.location, ALIEN)
    }
  }
}

function shiftAliensLeft(board) {
  // Update Model:
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (j === 0 && board[i][j].gameObject === ALIEN) {
          board[i][j].gameObject = null
        }
      }
      if (j === 8 && board[i][j].gameObject === null) {
        board[i][j].gameObject = ALIEN
      }
    }
  }
  console.log('After Shift Left', board)

  // Update DOM:
  for (var i = 0; i < gAliens.length; i++) {
    var currAlien = gAliens[i]
    if (
      currAlien.location.i >= gAliensTopRowIdx &&
      currAlien.location.i <= gAliensTopRowIdx + 2 &&
      currAlien.location.j === gAliensRightColIdx
    ) {
      updateCell(currAlien.location, null)
      currAlien.location.j--
    } else if (currAlien.location.i >= 0 && currAlien.location.i <= 2 && currAlien.location.j === gAliensLeftColIdx) {
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
          board[gAliensBottomRowIdx + 1][j].gameObject = ALIEN
          // } else {
          //   board[gAliensBottomRowIdx + 2][j].gameObject = ALIEN
          // board[i][j].gameObject = null
        }
      }
    }
  }
  console.log('After Shift Down', board)

  // Update DOM:
  for (var i = 0; i < gAliens.length; i++) {
    var currAlien = gAliens[i]
    if (
      currAlien.location.i >= gAliensTopRowIdx &&
      currAlien.location.i < gAliensBottomRowIdx &&
      currAlien.location.i === gAliensTopRowIdx
    ) {
      updateCell(currAlien.location, null)
      currAlien.location.i = currAlien.location.i + ALIENS_ROW_COUNT
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
