'use strict'

const getFormFields = require(`../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const onSignUp = function (event) {
  console.log('onSignUp in events working')
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  console.log('onSignIn in events working')
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(ui.checkForUserEntries)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  console.log('onChangePwd in events working')
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  console.log('onSignOut in events working')
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onViewAllPages = function (event) {
  console.log('onViewAllPages in events working')
  event.preventDefault()
  api.viewAllPages()
    .then(ui.viewAllPagesSuccess)
    .catch(ui.viewAllPagesFailure)
}

const openCreatePageModal = function (event) {
  $('#create-page-modal').on()
  $('#create-page-modal').show()
  $('#create-page-modal-form').show()
  $('#submit-create').on()
  $('#submit-create').show()
  $('#create-page-success').text('')
  $('#close-create-page-modal').text('Cancel')
}

const onCreatePage = function (event) {
  event.preventDefault()
  openCreatePageModal(event)
  $('#submit-create').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#createPageForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-create').off()
    api.createPage(values)
      .then(ui.createPageSuccess)
      .catch(ui.createPageFailure)
  })
  $('#close-create-page-modal').click(function () {
    $('#submit-create').off()
    $('#create-page-modal').hide(400)
    $('#create-page-modal').off()
  })
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#view-all-pages').on('submit', onViewAllPages)
  $('#create-page-modal').hide()
  $('#create-new-page').on('submit', onCreatePage)
}

module.exports = {
  addHandlers
}
