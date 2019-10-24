
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

const onAddProductModal = (event) => {
  event.preventDefault()
  const productId = $(event.target).attr('data-product-id')
  const price = $('#add-product-price-modal').val()
  if (methods.unique(productId)) {
    api.inventoryCreate(productId, price).then(ui.onCreateInventorySuccess).catch(ui.onCreateInventoryFailure)
  }
  $('#add-product-form-modal').trigger('reset')
  $('#add-product-modal').modal('toggle')
}

const onUpdateInventoryModal = (event) => {
  event.preventDefault()
  const inventoryId = $(event.target).data('inventory-id')
  const productId = $(event.target).data('product-id')
  const price = $('#update-inventory-price-modal').val()
  api.inventoryUpdate(inventoryId, productId, price).then(ui.onInventoryUpdateSuccess).catch(ui.onInventoryUpdateFailure)
  $('#update-inventory-form-modal').trigger('reset')
  $('#update-inventory-modal').modal('toggle')
}

const onDeleteInventoryModal = (event) => {
  event.preventDefault()
  $('#update-inventory-modal').modal('toggle')
  const inventoryId = $(event.target).data('inventory-id')
  const itemToUpdate = store.inventories.find(x => x.id === inventoryId)
  if (itemToUpdate) {
    api.inventoryDelete(inventoryId).then(ui.onInventoryDeleteSuccess).catch(ui.onInventoryDeleteFailure)
  } else {
    ui.onInventoryDeleteFailure()
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
  onLookupProduct,
  onAddProductModal,
  onUpdateInventoryModal,
  onDeleteInventoryModal
}
