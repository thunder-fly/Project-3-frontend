'use strict'

const store = require('./store')
const showPagesTemplate = require('./templates/pages-listing.handlebars')
const showMyPagesTemplate = require('./templates/my-pages-listing.handlebars')
const showBlogsTemplate = require('./templates/blogs-listing.handlebars')
const showMyBlogTemplate = require('./templates/my-blog.handlebars')
const showAllUsersTemplate = require('./templates/all-users.handlebars')
const api = require('./api')

const signUpSuccess = (data) => {
  console.log('signUpSuccess in UI working')
  return data
}

const signUpFailure = (error) => {
  console.log('signUpfailure in UI working')
  return error
}

const signInSuccess = (data) => {
  console.log('signUpSuccess in UI working')
  store.user = data.user
  $('#sign-in').hide()
  $('#change-password').show()
  $('#sign-up').hide()
  $('#create-new-page').show()
  $('#create-new-blog').show()
  $('#create-new-post').show()
  $('#view-my-pages').show()
  $('#sign-out').show()
  $('#update-blog').show()
  $('#update-post').show()
  $('#delete-post').show()
  $('#view-my-blog').show()
  return data
}
const checkForUserBlog = function (event) {
  api.viewAllBlogs()
    .then(checkForUserBlogSuccess)
}

const checkForUserBlogSuccess = function (data) {
  console.log('this is data.blogs', data.blogs)
  for (let i = 0; i < data.blogs.length; i++) {
    if (data.blogs[i]._owner === store.user.id) {
      $('#create-new-blog').hide()
    } else {
      $('#create-new-blog').show()
    }
  }
}

const signInFailure = (error) => {
  console.log('signUpfailure in UI working')
  return error
}

const changePasswordSuccess = () => {
  console.log('change password in UI working')
}

const changePasswordFailure = (error) => {
  console.log('change password failure in UI')
  return error
}

const signOutSuccess = () => {
  console.log('signOutSuccess in UI working')
  $('#change-password').hide()
  $('#sign-in').show()
  $('#sign-up').show()
}

const signOutFailure = (error) => {
  console.log('signOut Failure in UI')
  return error
}

const viewAllUsersSuccess = (data) => {
  console.log('viewAllUsersSuccess in ui')
  console.log(data)
  $('#all-users-container').show()
  $('#all-users-container').html('')
  const showUsersHtml = showAllUsersTemplate({ users: data.users })
  $('#all-users-container').append(showUsersHtml)

  $('.user-button').on('click', onViewUserAssets)
}

const onViewUserAssets = function (event) {
  console.log('onViewUserAssets in events working')
  event.preventDefault()
  const data = $('.user-button').attr('data-id')
  api.viewUserPages(data)
    .then(viewUserAssetsSuccess)
    .catch(viewUserAssetsFailure)
}

const viewUserAssetsSuccess = (data) => {
  console.log('data is', data)
}

const viewUserAssetsFailure = (error) => {
  return error
}

const viewAllUsersFailure = (error) => {
  console.log('viewAllUsersFailure in UI')
  return error
}

const viewAllPagesSuccess = (data) => {
  console.log('viewAllPagesSuccess in ui running')
  console.log(data)
  $('#all-pages-container').show()
  $('#all-pages-container').html('')

  const showPagesHtml = showPagesTemplate({ pages: data.pages })
  $('#all-pages-container').append(showPagesHtml)
  $('.remove-button').on('click', onDeletePage)
  $('.edit-button').on('click', function (event) {
    const pageId = $(event.target).parent().attr('data-id')
    const pageTitle = $(event.target).parent().find('#page-title').text()
    const pageContent = $(event.target).parent().find('#page-content').text()

    openUpdatePageModal(event)
    onUpdatePage(pageId, pageTitle, pageContent)
  })
}

const openUpdatePageModal = function (event) {
  $('#edit-page-modal').show()
}

const viewMyPagesSuccess = (data) => {
  console.log('viewMyPagesSuccess in ui running')
  console.log(data)
  $('#my-pages-container').show()
  $('#my-pages-container').html('')

  const showMyPagesHtml = showMyPagesTemplate({ pages: data.pages })
  $('#my-pages-container').append(showMyPagesHtml)
  $('.remove-button').on('click', onDeletePage)
  $('.edit-button').on('click', function (event) {
    const pageId = $(event.target).parent().attr('data-id')
    const pageTitle = $(event.target).parent().find('#page-title').text()
    const pageContent = $(event.target).parent().find('#page-content').text()

    openUpdatePageModal(event)
    onUpdatePage(pageId, pageTitle, pageContent)
  })
}

const viewMyPagesFailure = (error) => {
  console.log('viewMyPagesFailure in ui')
  return error
}

const onUpdatePage = function (pageId, pageTitle, pageContent) {
  event.preventDefault()
  $('#edit-page-modal').show()
  $('#page-title-update').val(pageTitle)
  $('#page-body-update').val(pageContent)

  $('#submit-page-edit').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#updatePageForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-page-edit').off()
    console.log(values)
    api.updatePage(values, pageId)
    .then(updatePageSuccess)
    .then(rerunMyPagesHandlebars)
    .catch(updatePageFailure)
  })
  $('#close-modal').click(function () {
    $('#submit-page-edit').off()
    $('#edit-page-modal').hide(400)
    $('#edit-page-modal').off()
  })
}

const updatePageSuccess = function (data) {
  console.log('updatePageSuccess in ui')
  $('#edit-page-modal').hide()
  return data
}

const updatePageFailure = function (error) {
  console.log('updatePageFailure in ui')
  return error
}
const rerunMyPagesHandlebars = (data) => {
  $('#my-pages-container').show()
  api.viewAllPages()
    .then(viewMyPagesSuccess)
    .catch(viewMyPagesFailure)
}

const onDeletePage = function (event) {
  const data = ($(this).parent().attr('data-id'))
// event.preventDefault()
  api.deletePage(data)
  .then(deletePageSuccess, $(this).parent().hide(400))
  .catch(deletePageFailure)
}

const viewAllPagesFailure = (error) => {
  console.log('viewAllPagesFailure in ui')
  return error
}
const viewPageSuccess = (data) => {
  console.log('viewPageSuccess in ui')
  console.log(data)
  return data
}
const viewPageFailure = (error) => {
  console.log('viewPageFailure in ui')
  return error
}
const createPageSuccess = (data) => {
  console.log('createPageSuccess in ui')
  console.log(data)
  return data
}

const createPageFailure = (error) => {
  console.log('createPageFailure in ui')
  return error
}

const deletePageSuccess = (data) => {
  console.log('deletePageSuccess in ui')
}

const deletePageFailure = (error) => {
  console.log('deletePageFailure in ui')
  return error
}

const createBlogSuccess = (data) => {
  store.blog = data.blog
  console.log('this is data.blog ', data.blog)
  console.log(data)
  return data
}

const createBlogFailure = (error) => {
  console.log('createBlogFailure in ui')
  return error
}

const viewAllBlogsSuccess = (data) => {
  console.log('viewAllBlogsSuccess in ui running')
  console.log(data)
  $('#all-blogs-container').show()
  $('#all-blogs-container').html('')

  const showBlogsHtml = showBlogsTemplate({ blogs: data.blogs })
  $('#all-blogs-container').append(showBlogsHtml)
  // $('.remove-button').on('click', onDeleteBlog)
  return data
}

const viewAllBlogsFailure = (error) => {
  console.log('viewAllBlogsFailure in ui')
  return error
}

const createPostSuccess = () => console.log('post successful')

const failure = () => console.log('that didnt work')

const viewMyBlogSuccess = (data) => {
  console.log('viewMyBlogSuccess in ui')
  console.log(data)
  $('#my-blog-container').show()
  $('#my-blog-container').html('')

  const showMyBlogHtml = showMyBlogTemplate({ blogs: data.blogs })
  $('#my-blog-container').append(showMyBlogHtml)
  return data
}

const viewMyBlogFailure = (error) => {
  console.log('viewMyBlogFailure in ui')
  return error
}
const viewBlogSuccess = (data) => {
  console.log('viewBlogSuccess in ui')
  console.log(data)
  return data
}

const viewBlogFailure = (error) => {
  console.log('viewBlogFailure in ui')
  return error
}

const viewPostSuccess = (data) => {
  console.log('viewPostSuccess in ui')
  console.log(data)
  return data
}

const viewPostFailure = (error) => {
  console.log('viewPostFailure in ui')
  return error
}

const updateBlogSuccess = (data) => {
  console.log('updateBlogSuccess in ui')
  console.log(data)
}

const updateBlogFailure = (error) => {
  console.log('updateBlogFailure in ui')
  return error
}

const updatePostSuccess = () => console.log('update post works')

const updatePostFailure = (error) => console.log(error)

const deletePostSuccess = (data) => {
  console.log('deletePostSuccess in ui')
}

const deletePostFailure = (error) => {
  console.log('deletePostFailure in ui')
  return error
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  viewAllPagesSuccess,
  viewAllPagesFailure,
  createPageSuccess,
  createPageFailure,
  createBlogSuccess,
  createBlogFailure,
  viewAllBlogsSuccess,
  viewAllBlogsFailure,
  deletePageSuccess,
  deletePageFailure,
  onDeletePage,
  openUpdatePageModal,
  onUpdatePage,
  updatePageSuccess,
  updatePageFailure,
  viewMyPagesSuccess,
  viewMyPagesFailure,
  rerunMyPagesHandlebars,
  viewPageSuccess,
  viewPageFailure,
  viewBlogSuccess,
  viewBlogFailure,
  updateBlogSuccess,
  updateBlogFailure,
  createPostSuccess,
  failure,
  updatePostSuccess,
  updatePostFailure,
  viewPostSuccess,
  viewPostFailure,
  deletePostSuccess,
  deletePostFailure,
  checkForUserBlog,
  checkForUserBlogSuccess,
  viewMyBlogSuccess,
  viewMyBlogFailure,
  viewAllUsersSuccess,
  viewAllUsersFailure,
  onViewUserAssets

}
