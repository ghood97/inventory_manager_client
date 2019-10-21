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
  $('#sign-out-btn').on('click', events.onSignOut)
  $('#products-btn').on('click', events.getProducts)
  $('#inventory-btn').on('click', events.getInventory)
  $('#change-pw-form').on('submit', events.onChangePassword)
  $('.inventory-lookup-form').on('submit', events.onlookupInventory)
  $('.product-lookup-form').on('submit', events.onLookupProduct)
  $('#add-product-form').on('submit', events.onAddItem)
  $('#update-inventory-form').on('submit', events.onUpdateInventory)
  $('#delete-inventory-form').on('submit', events.onDeleteInventory)
  $('#change-pw-form').on('submit', events.onChangePassword)
  $('#add-product-modal').on('show.bs.modal', function (event) {
    const nameCell = $(event.relatedTarget)
    console.log(nameCell)
    const productId = $(event.relatedTarget).attr('data-product-id')
    $('#add-product-form-modal').attr('data-product-id', productId)
  })
  $('#add-product-form-modal').on('submit', events.onAddProductModal)
})
