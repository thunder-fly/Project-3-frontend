'use strict'

const app = require('./app')

// use store for storing password
const store = require('./store')

const signUp = function (data) {
  console.log('signUp in api running')
  return $.ajax({
    url: app.host + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = function (data) {
  console.log('signin in api running')
  console.log(data)
  return $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  console.log('changepwd in api running')
  return $.ajax({
    url: app.host + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function (data) {
  console.log('signOut in api running')
  return $.ajax({
    url: app.host + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const viewAllUsers = function (data) {
  console.log('viewAllUsers in api running')
  return $.ajax({
    url: app.host + '/users',
    method: 'GET'
  })
}

const viewUserBlog = function (data) {
  console.log('viewUserAssets in api running')
  return $.ajax({
    url: app.host + '/blogs/' + data,
    method: 'GET'
  })
}

const viewUserPages = function (userId) {
  console.log('viewUserPages in api running')
  console.log('userId is ', userId)
  return $.ajax({
    // url: app.host + '/pages/' + data,
    url: `${app.host}/pages?_owner=${userId}`,
    method: 'GET'
  })
}
const viewUserBlogs = function (userId) {
  console.log('viewUserBlogs in api running')
  console.log('userId is ', userId)
  return $.ajax({
    // url: app.host + '/pages/' + data,
    url: `${app.host}/blogs?_owner=${userId}`,
    method: 'GET'
  })
}

// const viewUser = function (data) {
//   console.log('viewUser in api running')
//   console.log('this is data: ', data)
//   return $.ajax({
//     url: app.host + '/users/' + data,
//     method: 'GET'
//   })
// }

const viewAllPages = function (data) {
  console.log('viewAllPages in api running')
  return $.ajax({
    url: app.host + '/pages',
    method: 'GET'
  })
}

const viewPage = function (data) {
  console.log('viewPage in api running')
  console.log('this is data: ', data.pageId)
  return $.ajax({
    url: app.host + '/pages/' + data.pageId,
    method: 'GET'
  })
}

const createPage = function (data) {
  console.log('createPage in api running')
  return $.ajax({
    url: app.host + '/pages',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updatePage = function (data, id) {
  console.log('updatePage in api running')
  return $.ajax({
    url: app.host + '/pages/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deletePage = function (data) {
  console.log('deletePage in api running')
  return $.ajax({
    url: app.host + '/pages/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createBlog = function (data) {
  console.log('createBlog in api running')
  return $.ajax({
    url: app.host + '/blogs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const viewAllBlogs = function (data) {
  console.log('viewAllBlogs in api running')
  return $.ajax({
    url: app.host + '/blogs',
    method: 'GET'
  })
}
const viewBlog = function (data) {
  console.log('viewBlog in api running')
  console.log('this is data: ', data.blogId)
  return $.ajax({
    url: app.host + '/blogs/' + data.blogId,
    method: 'GET'
  })
}
const updateBlog = function (data) {
  console.log('this is data.blog ', data.blog)
  console.log('this is store: ', store)
  return $.ajax({
    url: app.host + '/blogs/' + data.blog.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const viewPost = function (data) {
  console.log('viewPost in api running')
  console.log('this is data.posts: ', data.posts)
  return $.ajax({
    url: app.host + '/blogs/' + data.blog.id + '/posts/' + data.posts.id,
    method: 'GET'
  })
}

const createPost = function (data) {
  console.log('this is data ', data)
  console.log('this is data.posts ', data.posts)
  return $.ajax({
    url: app.host + '/blogs/' + data.posts._owner + '/posts',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updatePost = function (data) {
  console.log('this is data.posts ', data.posts)
  console.log('this is data.blog.id', data.blog.id)
  return $.ajax({
    url: app.host + '/blogs/' + data.blog.id + '/posts/' + data.posts.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const deletePost = function (data) {
  console.log('deletePost in api running')
  console.log('this is data.posts: ', data.posts)
  return $.ajax({
    url: app.host + '/blogs/' + data.blog.id + '/posts/' + data.posts.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  viewAllPages,
  createPage,
  createBlog,
  viewAllBlogs,
  deletePage,
  createPost,
  updatePage,
  viewPage,
  viewBlog,
  updateBlog,
  updatePost,
  viewPost,
  deletePost,
  viewAllUsers,
  viewUserPages,
  viewUserBlogs
}
