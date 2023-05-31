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

  if (ev.code === 'Space') {
    updateCell(currHeroLocation, HERO)
    updateCell(nextHeroLocation, LASER)

    shoot()
  }
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  console.log('shoot')
  if (gLaserInterval !== null) return

  const laserLocation = getNextLocation('Space')
  console.log('laserLocation', laserLocation)
  // const nextLaserLocation = { i: location.i - 1, j: location.j }

  var firstAlien = null // an object of the Alien I want to kill
  console.log('firstAlien', firstAlien)

  gLaserInterval = setInterval(function () {
    blinkLaser(laserLocation)
    laserLocation.i--
    // const nextCellObject = gBoard[laserLocation.i - 1][laserLocation.j]
    // console.log('nextCellObject99', nextCellObject)

    // console.log('gBoard999', gBoard)

    if (laserLocation.i <= 0) {
      clearInterval(gLaserInterval)
      gLaserInterval = null
    }

    if (nextCellObject.gameObject === ALIEN) {
      console.log('you hit an alien')

      // }else{

      // }
      // firstAlien = nextCellObject
      // console.log('firstAlienAfterShoot', firstAlien)
      // nextCellObject.gameObject = LASER
      // updateCell(laserLocation, null)
      // updateCell(nextLaserLocation, LASER)
      // console.log('gBoard99', gBoard)
      // clearInterval(gLaserInterval)
      // gLaserInterval = null
    }
  }, LASER_SPEED)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(location) {
  const nextLaserLocation = { i: location.i - 1, j: location.j }
  updateCell(location, null)
  updateCell(nextLaserLocation, LASER)
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
    case 'Space':
      // gHero.isShoot = true
      if (nextLocation.i > 0) {
        nextLocation.i--
      }
      break
  }
  return nextLocation
}
