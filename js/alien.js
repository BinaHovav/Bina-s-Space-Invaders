'use strict'
const ALIEN_SPEED = 500
const ALIEN = '👽'

var gAliens
var gIntervalAliens

var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIsAlienFreeze = true

function createAlien(board) {
  var alien = {
    id: makeId(),
    location: {
      i: 2,
      j: 6,
    },
    // currCellContent: FOOD,
    // color: getRandomColor(),
  }
  gAliens.push(alien)

  board[alien.location.i][alien.location.j].gameObject = ALIEN
}

function createAliens(board) {
  gAliens = []
  for (var i = 0; i < 18; i++) {
    createAlien(board)
  }
  console.log('gAliens', gAliens)
  // gGhostsInterval = setInterval(moveGhosts, 1000)
}

function renderAliens() {}
// function moveGhosts() {
//   for (var i = 0; i < gGhosts.length; i++) {
//     const ghost = gGhosts[i]
//     moveGhost(ghost)
//   }
// }

// function moveGhost(ghost) {
//   const moveDiff = getMoveDiff()
//   const nextLocation = {
//     i: ghost.location.i + moveDiff.i,
//     j: ghost.location.j + moveDiff.j,
//   }
//   const nextCell = gBoard[nextLocation.i][nextLocation.j]

//   // return if cannot move
//   if (nextCell === WALL) return
//   if (nextCell === GHOST) return

//   // hitting a pacman? call gameOver
//   if (nextCell === PACMAN) {
//     if (gPacman.isSuper) return
//     gameOver()
//     return
//   }

//   // moving from current location:
//   // update the model (restore prev cell contents)
//   gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
//   // update the DOM
//   renderCell(ghost.location, ghost.currCellContent)

//   // Move the ghost to new location:
//   // update the model (save cell contents so we can restore later)
//   ghost.currCellContent = nextCell
//   ghost.location = nextLocation
//   gBoard[nextLocation.i][nextLocation.j] = GHOST
//   // update the DOM
//   renderCell(nextLocation, getGhostHTML(ghost))
// }

// function getMoveDiff() {
//   const randNum = getRandomIntInclusive(1, 4)

//   switch (randNum) {
//     case 1:
//       return { i: 0, j: 1 }
//     case 2:
//       return { i: 1, j: 0 }
//     case 3:
//       return { i: 0, j: -1 }
//     case 4:
//       return { i: -1, j: 0 }
//   }
// }

// function getGhostHTML(ghost) {
//   const color = gPacman.isSuper ? 'blue' : ghost.color
//   return `<span style="background-color:${color};">${GHOST}</span>`
// }

// function renderGhosts() {
//   for (var i = 0; i < gGhosts.length; i++) {
//     var currGhost = gGhosts[i]
//     renderCell(currGhost.location, getGhostHTML(currGhost))
//   }
// }

// function killGhost(location) {
//   // console.log(gGhosts)
//   for (var i = 0; i < gGhosts.length; i++) {
//     var currLocation = gGhosts[i].location
//     if (currLocation.i === location.i && currLocation.j === location.j) {
//       const deadGhost = gGhosts.splice(i, 1)[0]
//       console.log('deadGhost', deadGhost)
//       checkGhostCellContent(deadGhost)
//       setTimeout(reviveGhost, 5000, deadGhost)
//     }
//   }
// }

// function checkGhostCellContent(ghost) {
//   if (ghost.currCellContent === FOOD) {
//     handleFood()
//     ghost.currCellContent = EMPTY
//   }
// }

// function reviveGhost(ghost) {
//   gGhosts.push(ghost)
// }
