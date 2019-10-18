
const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const getProducts = (event) => {
  event.preventDefault()
  api.productIndex().then(ui.onProductIndexSuccess).catch(ui.onProductIndexFailure)
}

const getInventory = (event) => {
  event.preventDefault()
  api.inventoryIndex().then(ui.onInventoryIndexSuccess).catch(ui.onInventoryIndexFailure)
}

const onlookupInventory = (event) => {
  event.preventDefault()
  const inventoryId = $('#lookup-id').val()
  api.inventoryShow(inventoryId).then(ui.onLookupInventorySuccess).catch(ui.onLookupInventoryFailure)
}

const onSignUp = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData).then(ui.onSignUpSuccess).catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData).then(ui.onSignInSuccess).catch(ui.onSignInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onSignOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData).then(ui.onChangePasswordSuccess).catch(ui.onChangePasswordFailure)
}

module.exports = {
  onSignIn,
  onSignUp,
  onChangePassword,
  onSignOut,
  getProducts,
  getInventory,
  onlookupInventory
}
