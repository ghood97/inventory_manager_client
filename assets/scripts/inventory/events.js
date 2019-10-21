
const api = require('./api.js')
const store = require('../store.js')
const ui = require('./ui.js')
const methods = require('./methods.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const getProducts = (event) => {
  event.preventDefault()
  api.productIndex().then(ui.onProductIndexSuccess).catch(ui.onProductIndexFailure)
}

const onLookupProduct = (event) => {
  event.preventDefault()
  const productId = $('#product-lookup-id').val()
  api.productShow(productId).then(ui.onLookupProductSuccess).catch(ui.onLookupProductFailure)
}

const getInventory = (event) => {
  event.preventDefault()
  api.inventoryIndex().then(ui.onInventoryIndexSuccess).catch(ui.onInventoryIndexFailure)
}

const onlookupInventory = (event) => {
  event.preventDefault()
  const inventoryId = $('#inventory-lookup-id').val()
  api.inventoryShow(inventoryId).then(ui.onLookupInventorySuccess).catch(ui.onLookupInventoryFailure)
}

const onAddItem = (event) => {
  event.preventDefault()
  const productId = $('#add-product-id').val()
  const price = $('#add-product-price').val()
  if (methods.unique(productId)) {
    api.inventoryCreate(productId, price).then(ui.onCreateInventorySuccess).catch(ui.onCreateInventoryFailure)
  }
}

const onUpdateInventory = (event) => {
  event.preventDefault()
  const inventoryId = parseInt($('#update-inventory-id').val())
  const newPrice = $('#update-inventory-price').val()
  const itemToUpdate = store.inventories.find(x => x.id === inventoryId)
  if (itemToUpdate) {
    api.inventoryUpdate(inventoryId, newPrice).then(ui.onInventoryUpdateSuccess).catch(ui.onInventoryUpdateFailure)
  } else {
    ui.onInventoryUpdateFailure()
  }
}

const onDeleteInventory = (event) => {
  event.preventDefault()
  const inventoryId = parseInt($('#delete-inventory-id').val())
  const itemToUpdate = store.inventories.find(x => x.id === inventoryId)
  if (itemToUpdate) {
    api.inventoryDelete(inventoryId).then(ui.onInventoryDeleteSuccess).catch(ui.onInventoryDeleteFailure)
  } else {
    ui.onInventoryDeleteFailure()
  }
}

const onItemClicked = (event) => {
  event.preventDefault()
  const row = $(event.target).parent()
  if (row.attr('data-inventory-id')) {
    $('#update-inventory-pop-up').show()
  } else {
    console.log('product')
  }
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
  onlookupInventory,
  onAddItem,
  onUpdateInventory,
  onDeleteInventory,
  onLookupProduct,
  onItemClicked
}
