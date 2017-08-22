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

const createPost = function (data) {
  console.log('this is data ', data)
  console.log('this is data.blog[ID] ', data.blogID)
  return $.ajax({
    url: app.host + '/blogs/' + data.blogID + '/posts',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
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
  updateBlog
}
