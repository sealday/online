/**
 * Created by seal on 15/7/13.
 */
angular
  .module('online')
  .controller('UserController', UserController);

UserController.$inject = ['userService'];

/* @ngInject */
function UserController(userService) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'UserController';
  vm.userService = userService;

  activate();

  ////////////////

  function activate() {
  }


}
