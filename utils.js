'use strict'

// position such as: {i: 2, j: 7}
function updateCell(location, gameObject = null) {
  gBoard[location.i][location.j].gameObject = gameObject //moving from current location
  var elCell = getElCell(location)
  elCell.innerHTML = gameObject || ''
}

function getElCell(location) {
  return document.querySelector(`.cell-${location.i}-${location.j}`)
}

function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  }
}

// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

function openModal(msg) {
  const elModal = document.querySelector('.modal')
  const elSpan = elModal.querySelector('.msg')
  elSpan.innerText = msg
  elModal.style.display = 'block'
}

function closeModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function makeId(length = 3) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
