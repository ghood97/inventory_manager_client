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
  $('#change-pw-form').on('submit', events.onChangePassword)
  // Add Product modal
  $('#add-product-modal').on('show.bs.modal', event => {
    const productId = $(event.relatedTarget).attr('data-product-id')
    const productName = $(event.relatedTarget).attr('data-product-name')
    $('#add-product-modal .modal-title').text(productName)
    $('#add-product-form-modal').attr('data-product-id', productId)
  })
  $('#add-product-form-modal').on('submit', events.onAddProductModal)
  // Update inventory modal
  $('#update-inventory-modal').on('show.bs.modal', event => {
    const inventoryId = $(event.relatedTarget).data('inventory-id')
    const productId = $(event.relatedTarget).data('product-id')
    const productName = $(event.relatedTarget).data('product-name')
    $('#update-inventory-modal .modal-title').text(productName)
    $('#update-inventory-form-modal').data('inventory-id', inventoryId)
    $('#update-inventory-form-modal').data('product-id', productId)
    $('#delete-inventory-form-modal').data('inventory-id', inventoryId)
  })
  $('#update-inventory-form-modal').on('submit', events.onUpdateInventoryModal)
  $('#delete-inventory-form-modal').on('submit', events.onDeleteInventoryModal)
})
