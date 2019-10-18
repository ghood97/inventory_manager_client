const api = require('./api.js')

const unique = (productId) => {
  console.log(api.inventoryIndex())
//   const uniq = response.inventories.some((x) => {
//     return x.product_id === productId
//   })
//   return !uniq
}

module.exports = {
  unique
}
