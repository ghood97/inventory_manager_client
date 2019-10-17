'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const events = require('./inventory/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('.table-div').hide()
  $('.links').hide()
})