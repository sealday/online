/**
 * Created by seal on 15/7/13.
 */
angular
  .module('online')
  .controller('NavController', NavController);

NavController.$inject = ['userService'];

/* @ngInject */
function NavController(userService) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'NavController';
  vm.userService = userService;
  vm.toggleMenu = toggleMenu;

  activate();

  ////////////////

  function activate() {
  }

  function toggleMenu() {
    angular.element('.s-left-nav').css({
      display: 'block',
      width: '100px',
      float: 'left'
    })
  }
}
