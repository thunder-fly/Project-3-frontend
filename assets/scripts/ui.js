'use strict'

const store = require('./store')
const showPagesTemplate = require('./templates/pages-listing.handlebars')
const showMyPagesTemplate = require('./templates/my-pages-listing.handlebars')
const showBlogsTemplate = require('./templates/blogs-listing.handlebars')
const showMyBlogTemplate = require('./templates/my-blog.handlebars')
const showAllUsersTemplate = require('./templates/all-users-sites.handlebars')
const showOnePageTemplate = require('./templates/one-page.handlebars')
const api = require('./api')
const getFormFields = require(`../../lib/get-form-fields`)

const signUpSuccess = (data) => {
  return data
}

const signUpFailure = (error) => {
  return error
}

const signInSuccess = (data) => {
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
  for (let i = 0; i < data.blogs.length; i++) {
    if (data.blogs[i]._owner === store.user.id) {
      $('#create-new-blog').hide()
    } else {
      $('#create-new-blog').show()
    }
  }
}

const signInFailure = (error) => {
  return error
}

const changePasswordSuccess = () => {
  console.log('change password in UI working')
}

const changePasswordFailure = (error) => {
  return error
}

const signOutSuccess = () => {
  $('#change-password').hide()
  $('#sign-in').show()
  $('#sign-up').show()
}

const signOutFailure = (error) => {
  return error
}

const viewAllUsersSuccess = (data) => {
  console.log(data)
  $('.content').show()
  $('.content').html('')
  const showUsersHtml = showAllUsersTemplate({ users: data.users })
  $('.content').append(showUsersHtml)

  $('.user-button').on('click', onViewUserAssets)
}

const onViewUserAssets = function (event) {
  console.log('onViewUserAssets in events working')
  event.preventDefault()
  console.log('event.target is', event.target)
  const data = $(event.target).attr('data-id')
  api.viewUserPages(data)
  // this one replaces div
    .then(viewUserPagesSuccess)
    .then(() => api.viewUserBlogs(data))
    // this one expects that "pages" are already there and appends to that div
    .then(viewUserBlogSuccess)
    .catch(viewUserPagesFailure)
}

const viewUserBlogSuccess = (data) => {
  console.log('data is', data)
  $('.content').show()

  const showBlogsHtml = showBlogsTemplate({ blogs: data.blogs })
  $('.content').append(showBlogsHtml)
}

const viewUserPagesSuccess = (data) => {
  console.log('data is', data)
  $('.content').show()
  $('.content').html('')
  const showPagesHtml = showPagesTemplate({ pages: data.pages })
  $('.content').append(showPagesHtml)
  // once user clicks on View Page
  $('.view-page').on('click', onViewPage)
}

const viewUserPagesFailure = (error) => {
  return error
}
const onViewPage = function (event) {
  console.log('onViewPage in events working')
  event.preventDefault()
  const data = ($(this).parent().attr('data-id'))
  api.viewPage(data)
    .then(viewPageSuccess)
    .catch(viewPageFailure)
}
const viewUserAssetsFailure = (error) => {
  return error
}

const viewAllUsersFailure = (error) => {
  return error
}

const viewAllPagesSuccess = (data) => {
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
  $('#edit-page-modal').hide()
  return data
}

const updatePageFailure = function (error) {
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
  api.deletePage(data)
  .then(deletePageSuccess, $(this).parent().hide(400))
  .catch(deletePageFailure)
}

const viewAllPagesFailure = (error) => {
  return error
}
const viewPageSuccess = (data) => {
  console.log('data is', data)
  $('.content').show()
  $('.content').html('')
  const showPageHtml = showOnePageTemplate({ pages: data })
  $('.content').append(showPageHtml)
  // this button returns visiter back to user home site
  $('.back-to-user-site').on('click', onReturnUserAssets)
}

const onReturnUserAssets = function (event) {
  event.preventDefault()
  console.log('event.target is', event.target)
  // this grabs the page._owner value, which is user ID
  const data = $(this).parent().attr('data-id')
  api.viewUserPages(data)
  // this one replaces div
    .then(viewUserPagesSuccess)
    .then(() => api.viewUserBlogs(data))
    // this one expects that "pages" are already there and appends to that div
    .then(viewUserBlogSuccess)
    .catch(viewUserPagesFailure)
}
const viewPageFailure = (error) => {
  return error
}
const createPageSuccess = (data) => {
  return data
}

const createPageFailure = (error) => {
  return error
}

const deletePageSuccess = (data) => {
}

const deletePageFailure = (error) => {
  console.log('deletePageFailure in ui')
  return error
}

const createBlogSuccess = (data) => {
  store.blog = data.blog
  return data
}

const createBlogFailure = (error) => {
  return error
}

const viewAllBlogsSuccess = (data) => {
  $('.content').show()
  $('.content').html('')

  const showBlogsHtml = showBlogsTemplate({ blogs: data.blogs })
  $('.content').append(showBlogsHtml)
  // $('.remove-button').on('click', onDeleteBlog)
  return data
}

const viewAllBlogsFailure = (error) => {
  return error
}

const createPostSuccess = () => console.log('post successful')

const failure = () => console.log('that didnt work')

const viewMyBlogSuccess = (data) => {
  $('#my-blog-container').show()
  $('#my-blog-container').html('')

  const showMyBlogHtml = showMyBlogTemplate({ blogs: data.blogs })
  $('#my-blog-container').append(showMyBlogHtml)
  return data
}

const viewMyBlogFailure = (error) => {
  return error
}
const viewBlogSuccess = (data) => {
  return data
}

const viewBlogFailure = (error) => {
  return error
}

const viewPostSuccess = (data) => {
  return data
}

const viewPostFailure = (error) => {
  return error
}

const updateBlogSuccess = (data) => {
}

const updateBlogFailure = (error) => {
  return error
}

const updatePostSuccess = () => {}

const updatePostFailure = (error) => error

const deletePostSuccess = (data) => {
}

const deletePostFailure = (error) => {
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
  onViewUserAssets,
  viewUserAssetsFailure

}
