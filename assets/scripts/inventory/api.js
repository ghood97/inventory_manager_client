const config = require('../config.js')
const store = require('../store.js')

const productIndex = () => {
  return $.ajax({
    url: config.apiUrl + '/products',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const productShow = (productId) => {
  return $.ajax({
    url: config.apiUrl + `/products/${productId}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const inventoryIndex = () => {
  return $.ajax({
    url: config.apiUrl + '/inventories',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const inventoryShow = (id) => {
  return $.ajax({
    url: config.apiUrl + `/inventories/${id}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const inventoryCreate = (productId, price) => {
  return $.ajax({
    url: config.apiUrl + `/inventories`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      inventory: {
        user_id: store.user.id,
        product_id: productId,
        price: price
      }
    }
  })
}

const inventoryUpdate = (inventoryId, productId, newPrice) => {
  return $.ajax({
    url: config.apiUrl + `/inventories/${inventoryId}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      inventory: {
        user_id: store.user.id,
        product_id: productId,
        price: newPrice
      }
    }
  })
}

const inventoryDelete = (inventoryId) => {
  return $.ajax({
    url: config.apiUrl + `/inventories/${inventoryId}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const signUp = (formData) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: formData
  })
}

const signIn = (formData) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data: formData
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  productIndex,
  inventoryIndex,
  inventoryShow,
  inventoryCreate,
  inventoryUpdate,
  inventoryDelete,
  productShow
}
