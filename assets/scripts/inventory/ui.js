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
  $('#inventory-lookup-name').val('')
  $('#inventory-lookup-display').html('')
  store.inventory = false
  $('.info-right').text('Click the "My Inventory" button to view and edit the items to your inventory, or click a product to add it to your inventory')
  $('#delete-inventory-form').hide()
  $('#update-delete-status').html('')
}

const onProductIndexFailure = (response) => {
  failureMessage('Could not retireve products. Please try again.')
}

const onLookupProductSuccess = (response) => {
  if (jQuery.isEmptyObject(response)) {
    productLookupFailureMessage('Search returned 0 results')
    $('#product-lookup-display').html('')
  } else {
    const productHTML = productShowTemplate({products: response.products})
    productLookupSuccessMessage(`Search returned ${response.products.length} result(s)`)
    $('#product-lookup-display').html('')
    $('#product-lookup-display').append(productHTML)
    $('#inventory-lookup-form').trigger('reset')
  }
}

const onLookupProductFailure = (response) => {
  productLookupFailureMessage('Product Lookup Failed')
  $('#product-lookup-display').html('')
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
  $('#product-lookup-name').val('')
  $('#product-lookup-display').html('')
  store.inventory = true
  $('.info-right').text('Click the "Products" button to add more items to your inventory, or click an item to update your existing inventory')
  $('#delete-inventory-form').show()
}

const onInventoryIndexFailure = (response) => {
  failureMessage('Could not retrieve your inventory. Please try again')
}

const onLookupInventorySuccess = (response) => {
  if (jQuery.isEmptyObject(response)) {
    inventoryLookupFailureMessage(`Search returned 0 results`)
    $('#inventory-lookup-display').html('')
  } else {
    const inventoryHTML = inventoryShowTemplate({inventories: response.inventories})
    inventoryLookupSuccessMessage(`Search returned ${response.inventories.length} result(s)`)
    $('#inventory-lookup-display').html('')
    $('#inventory-lookup-display').append(inventoryHTML)
  }
}

const onLookupInventoryFailure = (response) => {
  inventoryLookupFailureMessage('Inventory Lookup Failed')
  $('#inventory-lookup-display').html('')
}

const onCreateInventorySuccess = (response) => {
  api.inventoryIndex().then(successMessage('Item Added to Inventory')).catch(onInventoryIndexFailure)
  $('#product-lookup-status').text('')
  $('#product-lookup-name').val('')
  $('#product-lookup-display').html('')
}

const onCreateInventoryFailure = (response) => {
  failureMessage('Failed to add item. Please try again')
}

const onInventoryUpdateSuccess = (response) => {
  api.inventoryIndex().then(onInventoryIndexSuccess).catch(onInventoryIndexFailure)
  updateDeleteSuccessMessage('Update Successful')
  $('#inventory-lookup-name').val('')
  $('#inventory-lookup-display').html('')
  $('#inventory-lookup-status').text('')
  $('#product-lookup-status').text('')
}

const onInventoryUpdateFailure = (response) => {
  updateDeleteFailureMessage('Update Failed')
}

const onInventoryDeleteSuccess = (response) => {
  $('#delete-inventory-form-modal').trigger('reset')
  $('#update-inventory-form-modal').trigger('reset')
  api.inventoryIndex().then(onInventoryIndexSuccess).catch(onInventoryIndexFailure)
  updateDeleteSuccessMessage('Deletion Successful')
  $('#inventory-lookup-name').val('')
  $('#inventory-lookup-display').html('')
  $('#inventory-lookup-status').text('')
  $('#product-lookup-status').text('')
}

const onInventoryDeleteFailure = (response) => {
  $('#delete-inventory-form-modal').trigger('reset')
  $('#update-inventory-form-modal').trigger('reset')
  updateDeleteFailureMessage('Deletion Failed')
}

const onSignUpSuccess = (response) => {
  const passwordInput = $('#sign-up-password').val()
  const emailInput = $('#sign-up-email').val()
  const creds = {
    'credentials': {
      'email': `${emailInput}`,
      'password': `${passwordInput}`
    }
  }
  api.signIn(creds).then(onSignInSuccess).catch(onSignInFailure)
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
  $('.navbar').removeClass('d-none')
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
  $('.navbar').addClass('d-none')
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
  $('#inventory-lookup-name').val('')
  $('#inventory-lookup-display').html('')
  $('#delete-inventory-form').trigger('reset')
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
  $('#change-pw-modal').modal('toggle')
  setTimeout(function () {
    changePwSuccessMessage('')
  }, 5000)
}

const onChangePasswordFailure = (response) => {
  changePwFailureMessage('Password change failure')
  $('#change-pw-form').trigger('reset')
  $('#change-pw-modal').modal('toggle')
  setTimeout(function () {
    changePwFailureMessage('')
  }, 5000)
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
