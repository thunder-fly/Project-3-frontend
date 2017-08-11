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

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
