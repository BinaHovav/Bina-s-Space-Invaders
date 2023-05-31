'use strict'
const LASER_SPEED = 80

var gHero
var gLaserInterval

function createHero(board) {
  gHero = {
    location: { i: 12, j: 5 },
    isShoot: false,
  }
  board[gHero.location.i][gHero.location.j].gameObject = HERO
  //   gGame.foodCount--
}

function onMoveHero(ev) {
  if (!gGame.isOn) return
  // if (gHero.isShoot) return

  const nextHeroLocation = getNextLocation(ev)
  const currHeroLocation = gHero.location
  const nextCellObject = gBoard[nextHeroLocation.i][nextHeroLocation.j]

  console.log('nextHeroLocation', nextHeroLocation)
  console.log('currHeroLocation', currHeroLocation)
  console.log('nextCellObject', nextCellObject)
  //   if (!nextLocation) return // CHECK WHAT DOES THIS MEAN

  if (nextHeroLocation.j === BOARD_SIZE || nextHeroLocation.j === -1) return

  updateCell(currHeroLocation, null)
  gHero.location = nextHeroLocation
  updateCell(nextHeroLocation, HERO)
  // console.log('gBoardAfterMove', gBoard)

  if (ev.code === 'Space') {
    updateCell(currHeroLocation, HERO)
    updateCell(nextHeroLocation, LASER)

    shoot()
    // console.log('space')
    // blinkLaser(nextLaserLocation, ev)
  }
  // const nextLaserLocation = getNextLocation(ev)
  // console.log('nextLaserLocation', nextLaserLocation)

  // blinkLaser(nextHeroLocation, ev)
  // console.log('nextLaserLocation', temp)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  console.log('shoot')
  if (gLaserInterval !== null) return

  // gLaserInterval = setInterval(function () {
  const laserLocation = getNextLocation('Space')
  console.log('laserLocation', laserLocation)

  gLaserInterval = setInterval(function () {
    blinkLaser(laserLocation)
    // }, 1000)

    laserLocation.i--
    if (laserLocation.i <= 0) {
      clearInterval(gLaserInterval)
      gLaserInterval = null
    }
  }, LASER_SPEED)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(location) {
  var nextLaserLocation = { i: location.i - 1, j: location.j }
  updateCell(location, null)
  updateCell(nextLaserLocation, LASER)

  //   var currLaserLocation = { i: location.i - 1, j: location.j }
  //   console.log('currLaserLocation', currLaserLocation)

  //   const laserInterval = setInterval(function () {
  //     updateCell(currLaserLocation, null)
  //     currLaserLocation.i--

  //     if (currLaserLocation.i >= 0) {
  //       updateCell(currLaserLocation, LASER)
  //     } else {
  //       clearInterval(laserInterval)
  //     }
  //   }, LASER_SPEED)
}
// if (nextLocation.gameObject === ALIEN) {
//   console.log('you hit an alien!')
//   return
// }
//   updateCell(location, null)
//   updateCell(nextLaserLocation, LASER)
// }

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
    case 'Space':
      // gHero.isShoot = true
      if (nextLocation.i > 0) {
        nextLocation.i--
      }
      break
  }
  return nextLocation
}
