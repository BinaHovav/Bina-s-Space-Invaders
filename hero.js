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
  //dir: right = j+1, left = j-1

  const currHeroLocation = gHero.location

  const nextHeroLocation = { i: gHero.location.i, j: gHero.location.j + dir }

  if (nextHeroLocation.j === BOARD_SIZE || nextHeroLocation.j === -1) return

  updateCell(currHeroLocation, null) // move from cell
  gHero.location = nextHeroLocation // updaing the current hero location
  updateCell(nextHeroLocation, HERO) // move to cell
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  if (gLaserInterval) return // can't shoot during when laserInterval is working
  gHero.isShoot = true

  // updateCell(gHero.location, HERO)
  var gLaserLocation = { i: gHero.location.i - 1, j: gHero.location.j }
  // updateCell(gLaserLocation, LASER)

  gLaserInterval = setInterval(() => {
    blinkLaser(gLaserLocation)
    gLaserLocation.i--

    if (gLaserLocation.i <= 0) {
      finishShooting()
      return
    }
    var nextCellObject = gBoard[gLaserLocation.i - 1][gLaserLocation.j]

    if (nextCellObject.gameObject === ALIEN) {
      handleAlienHit(gLaserLocation)
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
  gHero.isShoot = false
  clearInterval(gLaserInterval)
  gLaserInterval = null
}

function onKeyDown(ev) {
  if (!gGame.isOn) return

  if (ev.code === 'Space') shoot()

  if (ev.key === 'n') {
    console.log('n')
    blowUpNegs(gLaserLocation)
  }
  if (ev.key === 'x') {
    console.log('x')
    superMode(gLaserLocation)
  }

  switch (ev.key) {
    case 'ArrowRight':
      moveHero(1)
      break
    case 'ArrowLeft':
      moveHero(-1)
      break
  }
}
