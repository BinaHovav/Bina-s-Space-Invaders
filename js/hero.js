'use strict'

const HERO = '🔱'
const LASER_SPEED = 80

var gHero
var gLaserInterval
var gLaserLocation

function createHero(board) {
  gHero = {
    location: { i: 12, j: 5 },
    isShoot: false,
  }
  board[gHero.location.i][gHero.location.j].gameObject = HERO
  return gHero
}

function moveHero(dir) {
  //dir: right = j+1, left = j- 1

  const currHeroLocation = gHero.location
  console.log('currHeroLocation', currHeroLocation)

  const nextHeroLocation = { i: gHero.location.i, j: gHero.location.j + dir }
  console.log('nextHeroLocation', nextHeroLocation)

  if (nextHeroLocation.j === BOARD_SIZE || nextHeroLocation.j === -1) return

  updateCell(currHeroLocation, null) // move from cell
  gHero.location = nextHeroLocation // updaing the current hero location
  updateCell(nextHeroLocation, HERO) // move to cell
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  if (gLaserInterval) return // can't shoot during when laserInterval is working
  gHero.isShoot = true
  console.log('gHero.isShoot: true', gHero.isShoot)

  updateCell(gHero.location, HERO)
  gLaserLocation = { i: gHero.location.i - 1, j: gHero.location.j }
  updateCell(gLaserLocation, LASER)

  gLaserInterval = setInterval(() => {
    blinkLaser(gLaserLocation)
    gLaserLocation.i--

    if (gLaserLocation.i <= 0) {
      finishShooting()
      return
    }

    const nextCellObject = gBoard[gLaserLocation.i - 1][gLaserLocation.j]
    console.log('nextCellObject99', nextCellObject)

    console.log('gLaserLocation', gLaserLocation)

    if (nextCellObject.gameObject === ALIEN) {
      // handleAlienHit(gLaserLocation)
      console.log('you hit an Alien')
      gHero.isShoot = false
      gGame.aliensCount--
      updateScore()
      checkVictory()
      clearInterval(gLaserInterval)
      gLaserInterval = null
      blinkLaser(gLaserLocation)
      nextCellObject.gameObject = null
      console.log('gBoardAfterShoot', gBoard)
      return
    }
  }, LASER_SPEED)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(location) {
  const nextLaserLocation = { i: location.i - 1, j: location.j }
  updateCell(location, null)
  updateCell(nextLaserLocation, LASER)
}

function finishShooting() {
  // console.log('you hit the top')
  gHero.isShoot = false
  updateCell(gLaserLocation, null)
  clearInterval(gLaserInterval)
  gLaserInterval = null
}

// function handleAlienHit(location) {
//   console.log('you hit an alien')
//   gGame.aliensCount--
//   gHero.isShoot = false
//   updateScore()
//   checkVictory()
//   clearInterval(gLaserInterval)
//   gLaserInterval = null
//   blinkLaser(gLaserLocation)
//   nextCellObject.gameObject = null
//   // updateCell()
//   console.log('gBoardAfterShoot', gBoard)
// }
function onKeyDown(ev) {
  if (!gGame.isOn) return
  if (ev.code === 'Space') shoot()

  switch (ev.key) {
    case 'ArrowRight':
      moveHero(1)
      break
    case 'ArrowLeft':
      moveHero(-1)
      break
  }
}
