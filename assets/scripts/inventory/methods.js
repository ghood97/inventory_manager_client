const store = require('../store.js')

const unique = (productId) => {
  const uniq = !store.inventories.some(x => x.product_id === productId)
  return uniq
}

module.exports = {
  unique
}
