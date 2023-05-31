'use strict'
const LASER_SPEED = 80

var gHero

function createHero(board) {
  gHero = {
    location: { i: 12, j: 5 },
    isShoot: false,
  }
  board[gHero.location.i][gHero.location.j].gameObject = HERO
  console.log('gHero.location', gHero.location)
  console.log('HERO', HERO)
  //   gGame.foodCount--
}

function onMoveHero(ev) {
  if (!gGame.isOn) return

  const nextLocation = getNextLocation(ev)
  console.log('nextLocation', nextLocation)
  //   if (!nextLocation) return // CHECK WHAT DOES THIS MEAN

  if (nextLocation.j === BOARD_SIZE || nextLocation.j === -1) return
  const nextCell = gBoard[nextLocation.i][nextLocation.j]
  console.log('nextCell', nextCell)
  console.log('gHero.location', gHero.location)
  // return if cannot move
  //   if (nextCell === WALL) return

  //   // hitting a ghost? call gameOver
  //   if (nextCell === GHOST) {
  //     if (gPacman.isSuper) {
  //       killGhost(nextLocation)
  //     } else {
  //       gameOver()
  //       return
  //     }
  //   } else if (nextCell === FOOD) {
  //     handleFood()
  //   } else if (nextCell === POWER_FOOD) {
  //     if (gPacman.isSuper) return
  //     handlePowerFood()
  //   } else if (nextCell === CHERRY) {
  //     updateScore(10)
  //   }

  updateCell(nextLocation, HERO)
  // moving from current location:
  // update the model
  // gBoard[gHero.location.i][gHero.location.j].gameObject = null
  // // update the DOM
  // renderCell(gHero.location, EMPTY)

  // // Move the pacman to new location:
  // // update the model
  // gHero.location = nextLocation
  // gBoard[nextLocation.i][nextLocation.j].gameObject = HERO
  // // update the DOM
  // renderCell(nextLocation, HERO)
  console.log('gBoardAfterMove', gBoard)
}

function getNextLocation(eventKeyboard) {
  const nextLocation = {
    i: gHero.location.i,
    j: gHero.location.j,
  }
  switch (eventKeyboard.code) {
    case 'ArrowRight':
      nextLocation.j++
      break
    case 'ArrowLeft':
      nextLocation.j--
      break
  }
  return nextLocation
}

// function getPacmanHTML(deg) {
//   return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
// }

// function handleFood() {
//   gGame.foodCount--
//   updateScore(1)
//   checkVictory()
// }

// function handlePowerFood() {
//   gPacman.isSuper = true
//   renderGhosts()
//   setTimeout(() => {
//     gPacman.isSuper = false
//     renderGhosts()
//   }, 5000)
// }
