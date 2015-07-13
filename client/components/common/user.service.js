/**
 * Created by seal on 15/7/13.
 */

angular
  .module('online')
  .factory('userService', userService);

userService.$inject = ['$http'];

/* @ngInject */
function userService() {
  var service = {
    id: '',
    logged: false,
    login: login,
    logout: logout,
    info: null
  };

  return service;

  ////////////////
  function login() {

  }

  function logout() {

  }
}

