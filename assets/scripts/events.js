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

// const onViewOneUser = function (event) {
//   console.log('onViewOneUser in events working')
//   event.preventDefault()
//   api.viewUser()
//     .then(ui.viewUserSuccess)
//     .catch(ui.viewUserFailure)
// }

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
  $('#submit-create-page').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#createPageForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-create-page').off()
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
  $('#create-blog-modal').show()
  $('#create-blog-modal-form').show()
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

// const onViewAllBlogs = function (event) {
//   console.log('onViewAllBlogs in events working')
//   event.preventDefault()
//   api.viewAllBlogs()
//     .then(ui.viewAllBlogsSuccess)
//     .catch(ui.viewAllBlogsFailure)
// }

const onViewMyBlog = function (event) {
  console.log('onViewMyBlog in events working')
  event.preventDefault()
  api.viewAllBlogs()
    .then(ui.viewMyBlogSuccess)
    .catch(ui.viewMyBlogFailure)
}

const onCreatePost = function (event) {
  console.log('onCreatePost in events running')
  event.preventDefault()
  // openCreatePostModal(event)
  // $('#submit-create-post').click(function (event) {
  //   let values = {}
  //   event.preventDefault()
  //   $.each($('#createPostForm').serializeArray(), function (i, field) {
  //     values[field.name] = field.value
  //   })
  //   $('#submit-create-post').off()
  //   api.createPost(values)
  //     .then(ui.createPostSuccess)
  //     .catch(ui.createPostFailure)
  // })
  // $('#close-create-post-modal').click(function () {
  //   $('#submit-create-post').off()
  //   $('#create-post-modal').hide(400)
  //   $('#create-post-modal').off()
  // })
// }

// const openCreatePostModal = function (event) {
//   $('#create-post-modal').on()
//   $('#create-post-modal').show()
//   $('#create-post-modal-form').show()
//   $('#submit-create-post').on()
//   $('#submit-create-post').show()
//   $('#create-post-success').text('')
//   $('#close-create-post-modal').text('Cancel')
// }
  const data = getFormFields(this)
  api.createPost(data)
    .then(ui.createPostSuccess)
    .then(ui.createPostFailure)
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
  api.viewAllPages()
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
  $('#sign-out').on('submit', onSignOut)
  $('#view-all-pages').on('submit', onViewAllPages)
  $('#create-page-modal').hide()
  $('#create-new-page').on('submit', onCreatePage)
  $('#create-new-blog').on('submit', onCreateBlog)
  $('#create-blog-modal').hide()
  // $('#view-all-blogs').on('submit', onViewAllBlogs)
  $('#create-new-post').on('submit', onCreatePost)
  $('#view-my-pages').on('submit', onViewMyPages)
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
  $('#update-blog').hide()
  $('#update-post').hide()
  $('#delete-post').hide()
  $('#view-my-blog').hide()
  $('#view-my-blog').on('submit', onViewMyBlog)
  $('#all-users-sites').on('submit', onViewAllUsers)
  $('#view-my-assets').hide()
}

module.exports = {
  addHandlers
}
