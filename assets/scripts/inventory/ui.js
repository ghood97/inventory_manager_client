const store = require('../store.js')

const successMessage = (newText) => {
  $('#status-message').text(newText)
  $('#status-message').removeClass('failure')
  $('#status-message').addClass('success')
}

const failureMessage = (newText) => {
  $('#status-message').text(newText)
  $('#status-message').removeClass('success')
  $('#status-message').addClass('failure')
}

const welcomeMessage = () => {
  successMessage('Sign-in or Sign-up to see your inventory')
}

const onProductIndexSuccess = (response) => {
  console.log(response)
}

const onProductIndexFailure = (response) => {
  console.log(response)
}

const onSignUpSuccess = (response) => {
  successMessage('Sign-Up Successful! Please Sign in to play.')
  $('#sign-up-form').trigger('reset')
}

const onSignUpFailure = (response) => {
  failureMessage(`Sign-Up Failed! Try Again!`)
  $('#sign-up-form').trigger('reset')
}

const onSignInSuccess = (response) => {
  successMessage('Signed In Successfully')
  $('#sign-in-form').trigger('reset')
  store.user = response.user
  $('.sign-out-div').css('visibility', 'visible')
  $('.change-pw-div').css('visibility', 'visible')
  $('.links').show()
  $('.table-div').show()
  $('.sign-in-up-div').hide()
}

const onSignInFailure = (response) => {
  failureMessage('Try Again.')
  $('#sign-in-form').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('.sign-out-div').css('visibility', 'hidden')
  $('.change-pw-div').css('visibility', 'hidden')
  $('.links').hide()
  $('.table-div').hide()
  $('.sign-in-up-div').show()
  successMessage('Sign-Out Successful!')
  setTimeout(welcomeMessage, 1000)
  delete store.user
}

const onSignOutFailure = (response) => {

}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onProductIndexSuccess,
  onProductIndexFailure
}
