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
  const currLocation = gHero.location
  const nextCell = gBoard[nextLocation.i][nextLocation.j]

  console.log('nextLocation', nextLocation)
  //   if (!nextLocation) return // CHECK WHAT DOES THIS MEAN

  if (nextLocation.j === BOARD_SIZE || nextLocation.j === -1) {
    return
  }
  console.log('nextCell', nextCell)
  console.log('gHero.location', gHero.location)

  updateCell(currLocation, null)
  gHero.location = nextLocation
  updateCell(nextLocation, HERO)

  // renderBoard(gBoard)
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
