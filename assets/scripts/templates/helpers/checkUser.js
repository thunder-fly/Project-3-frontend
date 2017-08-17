const store = require('../../store')

module.exports = function (userId) {
  if (userId === store.user.id) {
    return '<button type="submit" class="remove-button" name="remove-button">Remove</button>  <button type="submit" class="edit-button" name="edit-button">Edit</button>'
  } else {
  }
}
