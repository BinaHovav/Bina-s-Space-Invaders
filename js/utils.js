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
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function makeId(length = 3) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}
