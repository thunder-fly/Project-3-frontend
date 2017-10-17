'use strict'

const getFormFields = require(`../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const onViewAllUsers = function (event) {
  console.log('onViewAllUsers in events working')
  event.preventDefault()
  api.viewAllUsers()
    .then(ui.viewAllUsersSuccess)
    .catch(ui.viewAllUsersFailure)
}

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
    .then(ui.checkForUserBlog)
    .then(ui.checkForUserPages)
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
  $('#create-page-modal').show(400)
  $('#create-page-modal-form').show(400)
  $('#submit-create').on()
  $('#submit-create').show()
  $('#create-page-success').text('')
  $('#close-create-page-modal').text('Cancel')
}

const onCreatePage = function (event) {
  event.preventDefault()
  openCreatePageModal(event)
  console.log('now in onCreatePage')
  $('#submit-create-page').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#createPageForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-create-page').off()
    console.log('this is values for create page', values)
    api.createPage(values)
      .then(ui.createPageSuccess)
      .catch(ui.createPageFailure)
  })
  $('#close-create-page-modal').click(function () {
    $('#submit-create-page').off()
    $('#create-page-modal').hide(400)
    $('#create-page-modal').off()
  })
}

const openCreateBlogModal = function (event) {
  $('#create-blog-modal').on()
  $('#create-blog-modal').show(400)
  $('#create-blog-modal-form').show(400)
  $('#submit-create-blog').on()
  $('#submit-create-blog').show()
  $('#create-blog-success').text('')
  $('#close-create-blog-modal').text('Cancel')
}

const onCreateBlog = function (event) {
  event.preventDefault()
  console.log('hitting onCreateBlog')
  openCreateBlogModal(event)
  $('#submit-create-blog').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#createBlogForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-create-blog').off()
    api.createBlog(values)
      .then(values => {
        console.log('this is values ', values)
        return values
      })
      .then(ui.createBlogSuccess)
      .catch(ui.createBlogFailure)
  })
  $('#close-create-blog-modal').click(function () {
    $('#submit-create-blog').off()
    $('#create-blog-modal').hide(400)
    $('#create-blog-modal').off()
  })
}

const onViewMyBlog = function (event) {
  console.log('onViewMyBlog in events working')
  event.preventDefault()
  api.viewUserBlogs(store.user.id)
    .then(ui.viewMyBlogSuccess)
    .catch(ui.viewMyBlogFailure)
}

const onUpdatePost = function (event) {
  console.log('onUpdatePost in events working')
  event.preventDefault()
  const data = getFormFields(this)
  api.updatePost(data)
    .then(ui.updatePostSuccess)
    .catch(ui.updatePostFailure)
}

const onViewMyPages = function (event) {
  console.log('onViewMyPages in events working')
  event.preventDefault()
  console.log('store.user.id is ', store.user.id)
  api.viewUserPages(store.user.id)
    .then(ui.viewMyPagesSuccess)
    .catch(ui.viewMyPagesFailure)
}

const onViewPost = function (event) {
  console.log('onViewPost in events working')
  event.preventDefault()
  // const data = ($(this).parent().attr('data-id'))
  const data = getFormFields(this)
  api.viewPost(data)
    .then(ui.viewPostSuccess)
    .catch(ui.viewPostFailure)
}
const onDeletePost = function (event) {
  console.log('onDeletePost in events working')
  event.preventDefault()
  // const data = ($(this).parent().attr('data-id'))
  const data = getFormFields(this)
  api.deletePost(data)
    .then(ui.deletePostSuccess)
    .catch(ui.deletePostFailure)
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-button').on('click', onSignOut)
  $('#view-all-pages').on('submit', onViewAllPages)
  $('#create-page-modal').hide()
  $('#add-page-button').on('submit', onCreatePage)
  $('#create-new-blog').on('submit', onCreateBlog)
  $('#create-blog-modal').hide()
  // $('#view-all-blogs').on('submit', onViewAllBlogs)
  // $('#create-new-post').on('submit', onCreatePost)
  $('#my-pages').on('click', onViewMyPages)
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-new-page').hide()
  $('#create-page-modal').hide()
  $('#edit-page-modal').hide()
  $('#create-new-blog').hide()
  $('#create-new-post').hide()
  $('#create-post-modal').hide()
  $('#view-my-pages').hide()
  // $('#view-page').on('submit', onViewPage)
  // $('#view-blog').on('submit', onViewBlog)
  // $('#update-blog').on('submit', onUpdateBlog)
  $('#update-post').on('submit', onUpdatePost)
  $('#view-post').on('submit', onViewPost)
  $('#delete-post').on('submit', onDeletePost)
  $('#edit-blog-modal').hide()
  $('#update-blog').hide()
  $('#update-post').hide()
  $('#edit-post-modal').hide()
  $('#delete-post').hide()
  $('#view-my-blog').hide()
  // $('#view-my-blog').on('submit', onViewMyBlog)
  $('#all-users-sites').on('submit', onViewAllUsers)
  $('#view-my-assets').hide()
  $('#sign-out-button').hide()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-up-button').on('click', function () {
    $('#sign-up').show()
    $('#sign-in').hide()
  })
  $('#sign-in-button').on('click', function () {
    $('#sign-in').show()
    $('#sign-up').hide()
  })
  $('#change-password-button').hide()
  $('#add-page-button').hide()
  $('#add-blog-button').hide()
  $('#my-pages').hide()
  $('#my-blog').hide()
  $('#add-blog-button').on('click', function () {
    $('#create-new-blog').show()
  })
  $('#add-page-button').on('click', onCreatePage)
  $('#my-blog').on('click', onViewMyBlog)
}

module.exports = {
  addHandlers
}
