const store = require('../../store')

module.exports = function (userId, options) {
  if (store.user && (store.user.id === userId)) {
    return options.fn(this)
  } else {
  }
}
