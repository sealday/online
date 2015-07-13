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
  vm.menuOpened = false;

  activate();

  ////////////////

  function activate() {
  }

  function toggleMenu() {
    if (!vm.menuOpened) {
      angular.element('.s-left-nav').css({
        display: 'block',
        width: '200px',
        float: 'left',
        position: 'fixed',
        'z-index': 1
      })
    } else {
      angular.element('.s-left-nav').css({
        display: 'none'
      })
    }
    vm.menuOpened = !vm.menuOpened;
  }
}
