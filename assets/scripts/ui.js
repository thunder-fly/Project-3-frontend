'use strict'

const store = require('./store')
const showPagesTemplate = require('./templates/pages-listing.handlebars')
const showBlogsTemplate = require('./templates/blogs-listing.handlebars')
const showMyBlogTemplate = require('./templates/owned-blog.handlebars')
const showAllUsersTemplate = require('./templates/all-users-sites.handlebars')
const showOnePageTemplate = require('./templates/one-page.handlebars')
const showOneBlogTemplate = require('./templates/one-blog.handlebars')
const showMyPagesTemplate = require('./templates/owned-pages.handlebars')
const api = require('./api')
// const moment = require('moment')

const signUpSuccess = (data) => {
  $('.clear').val('')
  $('#failure').text('')
  return data
}

const signUpFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Sign up failed. Please try again')
  $('#create-post-modal').hide(400)
  return error
}

const signInSuccess = (data) => {
  $('#failure').text('')
  $('.clear').val('')
  store.user = data.user
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#create-new-page').show()
  $('#create-new-post').show()
  // $('#sign-out').show()
  $('#update-blog').show()
  $('#update-post').show()
  $('#delete-post').show()
  $('#view-my-blog').show()
  $('#all-users-sites').hide()
  $('#view-my-assets').show()
  $('.content').html('')
  $('.content').show()
  // $('#view-my-assets').on('submit', onViewMyAssets)
  $('#sign-out-button').show()
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#change-password-button').show()
  $('#add-page-button').show()
  $('#add-blog-button').show()
  $('#my-pages').show()
  $('#my-blog').show()
  $('#welcome-msg').hide(400)
}

// const onViewMyAssets = function (event) {
//   console.log('onViewUserAssets in events working')
//   event.preventDefault()
//   console.log('this is store.user ', store.user)
//   const data = store.user.id
//   api.viewUserPages(data)
//     .then(viewMyPagesSuccess)
//     .then(() => api.viewUserBlogs(data))
//     .then(viewMyBlogSuccess)
//     .catch(viewMyPagesFailure)
// }

const checkForUserBlog = function (event) {
  console.log('checkForUserBlog running')
  const data = store.user.id
  api.viewUserBlogs(data)
    .then(checkForUserBlogSuccess)
}

const checkForUserBlogSuccess = function (data) {
  // checks to see if the length of the api data returned is greater than 0.
  // greater than 0 means they already created a blog.
  if (data.blogs.length > 0) {
    console.log('this is user blogs length ', data.blogs.length)
    $('#add-blog-button').hide()
    $('#view-my-assets').show()
  } else {
    $('##add-blog-button').show()
    $('#view-my-assets').hide()
  }
}
const checkForUserPages = function (event) {
  console.log('checkForUserPages running')
  const data = store.user.id
  api.viewUserPages(data)
    .then(checkForUserPagesSuccess)
}

const checkForUserPagesSuccess = function (data) {
  if (data.pages.length > 0) {
    console.log('this is user pages length ', data.pages.length)
    $('#view-my-assets').show()
  } else {
  }
}
const signInFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Sign in failed. Please try again')
  return error
}

const changePasswordSuccess = () => {
  $('.clear').val('')
  $('#failure').show()
  $('#failure').html('Password successfully updated!')
}

const changePasswordFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Password not updated. Please try again')
  return error
}

const signOutSuccess = () => {
  $('.clear').val('')
  $('#change-password').hide()
  $('.content').html('')
  $('.content').hide()
  $('#create-page-modal').hide()
  $('#sign-out').hide()
  $('#view-my-assets').hide()
  $('#create-new-page').hide()
  $('#create-new-blog').hide()
  $('#all-users-sites').show()
  $('#sign-up-button').show()
  $('#sign-in-button').show()
  $('#sign-out-button').hide()
  $('#change-password-button').hide()
  $('#change-password').hide(400)
  $('#add-page-button').hide()
  $('#add-blog-button').hide()
  $('#my-pages').hide()
  $('#my-blog').hide()
  $('#welcome-msg').show(400)
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
  $('.user-button').on('click', function () {
    $('#welcome-msg').hide(400)
    $('#all-users-sites').hide(400)
    $('#sign-up').hide(400)
    $('#sign-in').hide(400)
    $('#change-password').hide(400)
  })
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
  $('#sign-up').hide(400)
  $('#sign-in').hide(400)
  console.log('data is', data)
  $('.content').show()
  const showBlogsHtml = showBlogsTemplate({ blogs: data.blogs })
  $('.content').append(showBlogsHtml)
  // once user clicks on View Blog
  $('.view-blog').on('click', onViewBlog)
  $('.view-blog').on('click', function () {
    $('#sign-up').hide(400)
    $('#sign-in').hide(400)
    $('#change-password').hide(400)
  })
}

const viewUserPagesSuccess = (data) => {
  $('#sign-up').hide(400)
  $('#sign-in').hide(400)
  $('#change-password').hide(400)
  console.log('data is', data)
  $('.content').show()
  $('.content').html('')
  const showPagesHtml = showPagesTemplate({ pages: data.pages })
  $('.content').append(showPagesHtml)
  // once user clicks on View Page
  $('.view-page').on('click', onViewPage)
  $('.view-page').on('click', function () {
    $('#sign-up').hide(400)
    $('#sign-in').hide(400)
    $('#change-password').hide(400)
  })
}

const viewUserPagesFailure = (error) => {
  return error
}
const onViewPage = function (event) {
  event.preventDefault()
  const data = ($(this).parent().attr('data-id'))
  api.viewPage(data)
    .then(viewPageSuccess)
    .catch(viewPageFailure)
}

const onViewBlog = function (event) {
  console.log('onViewBlog in ui working')
  event.preventDefault()
  console.log('this is data-id ', ($(this).parent().attr('data-id')))
  const data = ($(this).parent().attr('data-id'))
  api.viewBlog(data)
    .then(viewBlogSuccess)
    .catch(viewBlogFailure)
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
  $('#edit-page-modal').show(400)
}

const viewMyPagesSuccess = (data) => {
  console.log('viewMyPagesSuccess in ui running')
  console.log(data)
  $('.content').show()
  $('.content').html('')

  const showPagesHtml = showPagesTemplate({ pages: data.pages })
  $('.content').append(showPagesHtml)
  $('.view-page').on('click', onViewMyPage)
}

const onViewMyPage = function (event) {
  event.preventDefault()
  const data = ($(this).parent().attr('data-id'))
  api.viewPage(data)
    .then(viewMyPageSuccess)
    .catch(viewMyPageFailure)
}

const viewMyPageSuccess = (data) => {
  $('.content').show()
  $('.content').html('')
  const showMyPagesHtml = showMyPagesTemplate({ pages: data })
  $('.content').append(showMyPagesHtml)

  $('.remove-button').on('click', onDeletePage)
  $('.edit-button').on('click', function (event) {
    const pageId = $(event.target).parent().find('#page-id').val()
    const pageTitle = $(event.target).parent().find('#page-title').text()
    const pageContent = $(event.target).parent().find('#page-content').text()

    openUpdatePageModal(event)
    onUpdatePage(pageId, pageTitle, pageContent)
  })
}

const viewMyPageFailure = (error) => {
  return error
}
const viewMyPagesFailure = (error) => {
  console.log('viewMyPagesFailure in ui')
  return error
}

const onUpdatePage = function (pageId, pageTitle, pageContent) {
  event.preventDefault()
  $('#edit-page-modal').show(400)
  $('#page-title-update').val(pageTitle)
  $('#page-content-update').val(pageContent)

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
    .then(rerunMyPageHandlebars)
    .catch(updatePageFailure)
  })
  $('#close-edit-page-modal').click(function () {
    $('#submit-page-edit').off()
    $('#edit-page-modal').hide(400)
    $('#edit-page-modal').off()
  })
}

const updatePageSuccess = function (data) {
  $('.clear').val('')
  $('#edit-page-modal').hide()
  $('#failure').hide()
  return data
}

const rerunMyPageHandlebars = (redisplay) => {
  $('.content').show()
  const data = ($('.content').find('input').val())
  api.viewPage(data)
    .then(viewMyPageSuccess)
    .catch(viewMyPageFailure)
}

const updatePageFailure = function (error) {
  $('#failure').show()
  $('#failure').html('Page not updated. Please try again')
  $('#edit-page-modal').hide(400)
  return error
}

const onDeletePage = function (event) {
  const data = ($('.content').find('input').val())
  api.deletePage(data)
  .then(deletePageSuccess, $(this).parent().hide(400))
  .then(rerunAssetsHandlebars)
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
  // the rest of the function is spitting out user assets
  api.viewUserPages(data)
    .then(viewUserPagesSuccess)
    .then(() => api.viewUserBlogs(data))
    .then(viewUserBlogSuccess)
    .catch(viewUserPagesFailure)
}
const viewPageFailure = (error) => {
  return error
}
const createPageSuccess = (data) => {
  $('#create-page-modal').hide(400)
  $('.clear').val('')
  $('#failure').hide()
  rerunAssetsHandlebars(data)
}

const createPageFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Page not created. Title and Content are required. Please try again')
  $('#create-page-modal').hide(400)
  return error
}

const deletePageSuccess = (data) => {
  $('.clear').val('')
}
const rerunAssetsHandlebars = function (rerun) {
  const data = store.user.id
  api.viewUserPages(data)
    .then(viewMyPagesSuccess)
    .then(() => api.viewUserBlogs(data))
    .then(viewMyBlogSuccess)
    .catch(viewMyPagesFailure)
}
const deletePageFailure = (error) => {
  console.log('deletePageFailure in ui')
  return error
}

const createBlogSuccess = (data) => {
  $('.clear').val('')
  store.blog = data.blog
  $('#submit-create-blog').off()
  $('#create-blog-modal').hide(400)
  $('#create-blog-modal').off()
  $('#create-new-blog').hide()
  $('#add-blog-button').hide()
  $('#view-my-assets').show()
  $('#failure').hide()
  rerunAssetsHandlebars(data)
}

const createBlogFailure = (error) => {
  // $('#failure').html('')
  $('#failure').html('Blog not created. Title is required. Please try again')
  $('#create-blog-modal').hide()
  return error
}

const viewAllBlogsFailure = (error) => {
  return error
}

const createPostSuccess = () => {
  $('#create-post-modal').hide(400)
  $('.clear').val('')
  $('#failure').hide()
}

const createPostFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Post not created. Please try again')
  $('#create-post-modal').hide(400)
  return error
}

const failure = () => {}

const viewMyBlogSuccess = (data) => {
  $('.content').show()
  $('.content').html('')
  const showMyBlogHtml = showBlogsTemplate({ blogs: data.blogs })
  $('.content').append(showMyBlogHtml)
  $('.view-blog').on('click', onViewMyBlog)
}
const onViewMyBlog = (event) => {
  const data = ($(event.target).parent().attr('data-id'))
  api.viewBlog(data)
    .then(viewMyBlogPostsSuccess)
    .catch(viewMyBlogPostsFailure)
}

const viewMyBlogPostsSuccess = (data) => {
  $('.content').show()
  $('.content').html('')
  const showMyBlogPostsHtml = showMyBlogTemplate({ blogs: data })
  $('.content').append(showMyBlogPostsHtml)
  // to edit blog title
  $('.edit-blog-title').on('click', function (event) {
    const blogId = $(event.target).parent().find('#blog-id').val()
    const blogTitle = $(event.target).parent().find('#blog-title').text()
    openUpdateBlogTitleModal(event)
    onUpdateBlogTitle(blogId, blogTitle)
  })
  // to create a blog post
  $('.create-blog-post').on('click', function (event) {
    const blogId = $(event.target).parent().find('input').val()
    console.log('blogId is ', blogId)
    // const postTitle = $(event.target).parent().find('#post-title').text()
    // const postBody = $(event.target).parent().find('#post-body').text()
    openCreatePostModal(event)
    onCreatePost(blogId)
  })
  // to edit blog posts
  $('.edit-post-button').on('click', function (event) {
    const blogId = $(event.target).parent().parent().find('#blog-id').val()
    console.log('this is blog-id merp', blogId)
    const postId = $(event.target).parent().find('input').val()
    console.log('this is post-id merp', postId)

    const postTitle = $(event.target).parent().find('#post-title').text()
    const postBody = $(event.target).parent().find('#post-body').text()
    openUpdatePostModal(event)
    onUpdatePost(blogId, postId, postTitle, postBody)
  })
  $('.remove-button').on('click', onDeletePost)
  $('#close-edit-blog-modal').click(function () {
    $('#submit-blog-edit').off()
    $('#edit-blog-modal').hide(400)
    $('#edit-blog-modal').off()
  })
}
const openUpdateBlogTitleModal = (event) => {
  $('#edit-blog-modal').show(400)
}

const onUpdateBlogTitle = function (blogId, blogTitle) {
  console.log('onUpdateBlogTItle in ui working')
  $('#edit-blog-modal').show(400)
  $('#blog-title-update').val(blogTitle)
  $('#submit-blog-edit').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#updateBlogForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-blog-edit').off()
    api.updateBlog(values, blogId)
      .then(updateBlogTitleSuccess)
      .then(rerunMyBlogHandlebars)
      .catch(updateBlogTitleFailure)
  })
  $('#close-modal').click(function () {
    $('#submit-page-edit').off()
    $('#edit-page-modal').hide(400)
    $('#edit-page-modal').off()
  })
}

const updateBlogTitleSuccess = (data) => {
  $('.clear').val('')
  $('#edit-blog-modal').hide(400)
  $('#failure').hide()
  return data
}

const updateBlogTitleFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Blog not updated. Please try again')
  $('#edit-blog-modal').hide(400)
  return error
}

const rerunMyBlogHandlebars = (event) => {
  $('.content').show()
  const data = ($('.content').find('input').val())
  api.viewBlog(data)
    .then(viewMyBlogPostsSuccess)
    .catch(viewMyBlogPostsFailure)
}
const openCreatePostModal = function (event) {
  $('#create-post-modal').on()
  $('#create-post-modal').show(400)
  $('#create-post-modal-form').show(400)
  $('#submit-create-post').on()
  $('#submit-create-post').show()
  $('#close-create-post-modal').text('Cancel')
}

const onCreatePost = function (blogId, postTitle, postBody) {
  $('#create-post-modal').show(400)
  event.preventDefault()
  $('#post-title-create').val(postTitle)
  $('#post-body-create').val(postBody)
  $('#submit-create-post').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#createPostForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-create-post').off()
    api.createPost(values, blogId)
      .then(createPostSuccess)
      .then(rerunMyBlogHandlebars)
      .catch(createPostFailure)
  })
  $('#close-create-post-modal').click(function () {
    $('#submit-create-post').off()
    $('#create-post-modal').hide(400)
    $('#create-post-modal').off()
  })
}

const openUpdatePostModal = (event) => {
  $('#edit-post-modal').show(400)
}

const onUpdatePost = (blogId, postId, postTitle, postBody) => {
  $('#edit-post-modal').show(400)
  $('#update-post-title').val(postTitle)
  $('#update-post-body').val(postBody)
  $('#submit-post-edit').click(function (event) {
    let values = {}
    event.preventDefault()
    $.each($('#updatePostForm').serializeArray(), function (i, field) {
      values[field.name] = field.value
    })
    $('#submit-post-edit').off()
    api.updatePost(values, blogId, postId)
      .then(updatePostSuccess)
      .then(rerunMyBlogHandlebars)
      .catch(updatePostFailure)
  })
  $('#close-edit-post-modal').click(function () {
    $('#submit-post-edit').off()
    $('#edit-post-modal').hide(400)
    $('#edit-post-modal').off()
  })
}
const onDeletePost = (event) => {
  const blogId = $(event.target).parent().parent().find('#blog-id').val()
  const postId = $(event.target).parent().find('input').val()
  api.deletePost(blogId, postId)
  .then(deletePostSuccess, $(this).parent().hide(400))
  .then(rerunMyBlogHandlebars)
  .catch(deletePostFailure)
}
const viewMyBlogPostsFailure = (error) => {
  return error
}

const viewMyBlogFailure = (error) => {
  return error
}
const viewBlogSuccess = (data) => {
  $('.content').show()
  $('.content').html('')
  const showBlogHtml = showOneBlogTemplate({ blogs: data })
  $('.content').append(showBlogHtml)
  // this button returns visiter back to user home site
  $('.back-to-user-site').on('click', onReturnUserAssets)
}

const viewBlogFailure = (error) => {
  return error
}

const viewPostSuccess = () => {
  console.log('post was successful')
}

const viewPostFailure = (error) => {
  return error
}

const updateBlogSuccess = (data) => {
}

const updateBlogFailure = (error) => {
  return error
}

const updatePostSuccess = () => {
  $('#edit-post-modal').hide(400)
  $('#failure').hide()
}

const updatePostFailure = (error) => {
  $('#failure').show()
  $('#failure').html('Post not updated. Please try again')
  $('#edit-post-modal').hide(400)
  return error
}

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
  // viewAllBlogsSuccess,
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
  // rerunMyPagesHandlebars,
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
  viewUserAssetsFailure,
  checkForUserPages

}
