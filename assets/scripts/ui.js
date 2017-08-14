'use strict'

const store = require('./store')

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
  return data
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
}

const signOutFailure = (error) => {
  console.log('signOut Failure in UI')
  return error
}

const viewAllPagesSuccess = (data) => {
  console.log('viewAllPagesSuccess in ui running')
  console.log(data)
  return data
}

const viewAllPagesFailure = (error) => {
  console.log('viewAllPagesFailure in ui')
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
  createPageFailure
}
