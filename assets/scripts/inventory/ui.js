const store = require('../store.js')
const api = require('./api.js')
const productListTemplate = require('../templates/product-listing.handlebars')
const inventoryListTemplate = require('../templates/inventory-listing.handlebars')
const inventoryShowTemplate = require('../templates/inventory-show.handlebars')

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

const lookupSuccessMessage = (newText) => {
  $('#lookup-status').text(newText)
  $('#lookup-status').removeClass('failure')
  $('#lookup-status').addClass('success')
}

const lookupFailureMessage = (newText) => {
  $('#lookup-status').text(newText)
  $('#lookup-status').removeClass('success')
  $('#lookup-status').addClass('failure')
}

const welcomeMessage = () => {
  successMessage('Sign-in or Sign-up to see your inventory')
}

const onProductIndexSuccess = (response) => {
  const productHTML = productListTemplate({products: response.products})
  $('.products-table tbody').html('')
  $('.products-table tbody').append(productHTML)
  $('#p-price-header').html('Suggested Retail Price')
  successMessage('These are all of the available products ')
  $('#lookup-status').text('')
  $('#lookup-id').val('')
  $('.lookup-table tbody').html('')
  store.inventory = false
  $('#lookup-label').text('Product Lookup')
  $('#lookup-id').attr('placeholder', 'Product ID')
  $('.info-right').text('Click the "My Inventory" button to view and edit the items to your inventory, or add more products to your inventory')
  $('#add-product-form').show()
  $('#update-inventory-form').hide()
}

const onProductIndexFailure = (response) => {
  failureMessage('Could not retireve products. Please try again.')
}

const onInventoryIndexSuccess = (response) => {
  const inventoryHTML = inventoryListTemplate({inventories: response.inventories})
  successMessage('This is your inventory')
  $('.products-table tbody').html('')
  $('.products-table tbody').append(inventoryHTML)
  $('#p-price-header').html('Price')
  $('#lookup-status').text('')
  $('#lookup-id').val('')
  $('.lookup-table tbody').html('')
  store.inventory = true
  $('#lookup-label').text('Inventory Lookup')
  $('#lookup-id').attr('placeholder', 'Inventory ID')
  $('.info-right').text('Click the products button to add more items to your inventory, or update an existing inventory item')
  $('#add-product-form').hide()
  $('#update-inventory-form').show()
}

const onInventoryIndexFailure = (response) => {
  failureMessage('Could not retrieve your inventory. Please try again')
}

const onLookupInventorySuccess = (response) => {
  const inventoryHTML = inventoryShowTemplate({inventory: response.inventory})
  lookupSuccessMessage('Inventory Lookup Success')
  $('.lookup-table tbody').html('')
  $('.lookup-table tbody').append(inventoryHTML)
  $('#price-header-display').html('Price')
}

const onLookupInventoryFailure = (response) => {
  lookupFailureMessage('Inventory Lookup Failed')
  $('.lookup-table tbody').html('')
}

const onCreateInventorySuccess = (response) => {
  successMessage('Item Added to Inventory')
  $('#add-product-form').trigger('reset')
  api.productIndex().then(onProductIndexSuccess).catch(onProductIndexFailure)
}

const onCreateInventoryFailure = (response) => {
  failureMessage('Failed to add item. Please try again')
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
  $('#sign-in-form').trigger('reset')
  $('.sign-out-div').css('visibility', 'visible')
  $('.change-pw-div').css('visibility', 'visible')
  $('.links').show()
  $('.table-div').show()
  $('.sign-in-up-div').hide()
  api.inventoryIndex().then(onInventoryIndexSuccess).catch(onInventoryIndexFailure)
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
  $('.products-table tbody').html('')
  $('#lookup-status').text('')
  $('#lookup-id').val('')
  $('.lookup-table tbody').html('')
  successMessage('Sign-Out Successful!')
  setTimeout(welcomeMessage, 1000)
  store.inventory = true
  $('.info-right').text('Click the products button to add more items to your inventory, or update an existing inventory item')
  delete store.user
}

const onSignOutFailure = (response) => {
  failureMessage('Sign-Out failed')
}

const onChangePasswordSuccess = (response) => {
  successMessage('Password changed successfully')
  $('#change-pw-form').trigger('reset')
}

const onChangePasswordFailure = (response) => {
  failureMessage('Password change failure')
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
  onCreateInventoryFailure
}
