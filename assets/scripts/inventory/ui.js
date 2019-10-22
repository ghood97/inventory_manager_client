const store = require('../store.js')
const api = require('./api.js')
const productListTemplate = require('../templates/product-listing.handlebars')
const inventoryListTemplate = require('../templates/inventory-listing.handlebars')
const inventoryShowTemplate = require('../templates/inventory-show.handlebars')
const productShowTemplate = require('../templates/product-show.handlebars')

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

const changePwSuccessMessage = (newText) => {
  $('#pw-status-message').text(newText)
  $('#pw-status-message').removeClass('failure')
  $('#pw-status-message').addClass('success')
}

const changePwFailureMessage = (newText) => {
  $('#pw-status-message').text(newText)
  $('#pw-status-message').removeClass('success')
  $('#pw-status-message').addClass('failure')
}

const inventoryLookupSuccessMessage = (newText) => {
  $('#inventory-lookup-status').text(newText)
  $('#inventory-lookup-status').removeClass('failure')
  $('#inventory-lookup-status').addClass('success')
}

const inventoryLookupFailureMessage = (newText) => {
  $('#inventory-lookup-status').text(newText)
  $('#inventory-lookup-status').removeClass('success')
  $('#inventory-lookup-status').addClass('failure')
}

const productLookupSuccessMessage = (newText) => {
  $('#product-lookup-status').text(newText)
  $('#product-lookup-status').removeClass('failure')
  $('#product-lookup-status').addClass('success')
}

const productLookupFailureMessage = (newText) => {
  $('#product-lookup-status').text(newText)
  $('#product-lookup-status').removeClass('success')
  $('#product-lookup-status').addClass('failure')
}

const updateDeleteSuccessMessage = (newText) => {
  $('#update-delete-status').text(newText)
  $('#update-delete-status').removeClass('failure')
  $('#update-delete-status').addClass('success')
}

const updateDeleteFailureMessage = (newText) => {
  $('#update-delete-status').text(newText)
  $('#update-delete-status').removeClass('success')
  $('#update-delete-status').addClass('failure')
}

const welcomeMessage = () => {
  successMessage('Sign-in or Sign-up to see your inventory')
}

const onProductIndexSuccess = (response) => {
  store.products = response.products
  const productHTML = productListTemplate({products: response.products})
  $('.products-table tbody').html('')
  $('.products-table tbody').append(productHTML)
  $('#price-header').html('Suggested Retail Price')
  successMessage('These are all of the available products ')
  $('#inventory-lookup-status').text('')
  $('#product-lookup-div').show()
  $('#inventory-lookup-div').hide()
  $('#inventory-lookup-id').val('')
  $('.inventory-lookup-table tbody').html('')
  store.inventory = false
  $('.info-right').text('Click the "My Inventory" button to view and edit the items to your inventory, or add more products to your inventory below')
  $('#add-product-form').show()
  $('#update-inventory-form').hide()
  $('#delete-inventory-form').hide()
  $('#update-inventory-form').trigger('reset')
  $('#update-delete-status').html('')
}

const onProductIndexFailure = (response) => {
  failureMessage('Could not retireve products. Please try again.')
}

const onLookupProductSuccess = (response) => {
  const productHTML = productShowTemplate({product: response.product})
  productLookupSuccessMessage('Product Lookup Success')
  $('.product-lookup-table tbody').html('')
  $('.product-lookup-table tbody').append(productHTML)
}

const onLookupProductFailure = (response) => {
  productLookupFailureMessage('Product Lookup Failed')
  $('.product-lookup-table tbody').html('')
}

const onInventoryIndexSuccess = (response) => {
  store.inventories = response.inventories
  const inventoryHTML = inventoryListTemplate({inventories: response.inventories})
  successMessage('This is your inventory')
  $('.products-table tbody').html('')
  $('.products-table tbody').append(inventoryHTML)
  $('#price-header').html('Price')
  $('#product-lookup-status').text('')
  $('#product-lookup-div').hide()
  $('#inventory-lookup-div').show()
  $('#product-lookup-id').val('')
  $('.product-lookup-table tbody').html('')
  store.inventory = true
  $('.info-right').text('Click the products button to add more items to your inventory, or update an existing inventory item below')
  $('#add-product-form').hide()
  $('#update-inventory-form').show()
  $('#delete-inventory-form').show()
  $('#add-product-form').trigger('reset')
}

const onInventoryIndexFailure = (response) => {
  failureMessage('Could not retrieve your inventory. Please try again')
}

const onLookupInventorySuccess = (response) => {
  const inventoryHTML = inventoryShowTemplate({inventory: response.inventory})
  inventoryLookupSuccessMessage('Inventory Lookup Success')
  $('.inventory-lookup-table tbody').html('')
  $('.inventory-lookup-table tbody').append(inventoryHTML)
}

const onLookupInventoryFailure = (response) => {
  inventoryLookupFailureMessage('Inventory Lookup Failed')
  $('.inventory-lookup-table tbody').html('')
}

const onCreateInventorySuccess = (response) => {
  $('#add-product-form').trigger('reset')
  api.inventoryIndex().then(successMessage('Item Added to Inventory')).catch(onInventoryIndexFailure)
}

const onCreateInventoryFailure = (response) => {
  failureMessage('Failed to add item. Please try again')
  $('#add-product-form').trigger('reset')
}

const onInventoryUpdateSuccess = (response) => {
  $('#update-inventory-form').trigger('reset')
  api.inventoryIndex().then(onInventoryIndexSuccess).catch(onInventoryIndexFailure)
  updateDeleteSuccessMessage('Update Successful')
}

const onInventoryUpdateFailure = (response) => {
  updateDeleteFailureMessage('Update Failed')
  $('#update-inventory-form').trigger('reset')
}

const onInventoryDeleteSuccess = (response) => {
  $('#delete-inventory-form').trigger('reset')
  api.inventoryIndex().then(onInventoryIndexSuccess).catch(onInventoryIndexFailure)
  updateDeleteSuccessMessage('Deletion Successful')
}

const onInventoryDeleteFailure = (response) => {
  $('#delete-inventory-form').trigger('reset')
  updateDeleteFailureMessage('Deletion Failed')
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
  store.user = response.user
  $('#title').css('color', '#1175f7')
  $('#sign-in-form').trigger('reset')
  $('.sign-out-div').css('visibility', 'visible')
  $('.change-pw-div').css('visibility', 'visible')
  $('.links').show()
  $('.table-div').show()
  $('#product-lookup-div').hide()
  $('.sign-in-up-div').hide()
  api.inventoryIndex().then(onInventoryIndexSuccess).catch(onInventoryIndexFailure)
}

const onSignInFailure = (response) => {
  failureMessage('Try Again.')
  $('#sign-in-form').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('#title').css('color', '#b90641')
  $('.sign-out-div').css('visibility', 'hidden')
  $('.change-pw-div').css('visibility', 'hidden')
  $('.links').hide()
  $('.table-div').hide()
  $('.sign-in-up-div').show()
  $('.products-table tbody').html('')
  $('#lookup-status').text('')
  $('#lookup-id').val('')
  $('.lookup-table tbody').html('')
  successMessage('Sign-Out Successful!')
  $('#pw-status-message').text('')
  $('#change-pw-form').trigger('reset')
  $('#update-delete-status').html('')
  $('#product-lookup-id').val('')
  $('.product-lookup-table tbody').html('')
  $('#inventory-lookup-id').val('')
  $('.inventory-lookup-table tbody').html('')
  $('#update-inventory-form').trigger('reset')
  $('#delete-inventory-form').trigger('reset')
  $('#add-product-form').trigger('reset')
  setTimeout(welcomeMessage, 1000)
  store.inventory = true
  $('.info-right').text('Click the products button to add more items to your inventory, or update an existing inventory item below')
  delete store.user
}

const onSignOutFailure = (response) => {
  failureMessage('Sign-Out failed')
}

const onChangePasswordSuccess = (response) => {
  changePwSuccessMessage('Password changed successfully')
  $('#change-pw-form').trigger('reset')
}

const onChangePasswordFailure = (response) => {
  changePwFailureMessage('Password change failure')
  $('#change-pw-form').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onProductIndexSuccess,
  onProductIndexFailure,
  onInventoryIndexSuccess,
  onInventoryIndexFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onLookupInventorySuccess,
  onLookupInventoryFailure,
  onCreateInventorySuccess,
  onCreateInventoryFailure,
  onInventoryUpdateSuccess,
  onInventoryUpdateFailure,
  updateDeleteFailureMessage,
  updateDeleteSuccessMessage,
  onInventoryDeleteSuccess,
  onInventoryDeleteFailure,
  onLookupProductSuccess,
  onLookupProductFailure
}
