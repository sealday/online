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
  vm.menuListener = null;

  activate();

  ////////////////

  function activate() {
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 768px)');
      mq.addListener(mqListener);
      mqListener();
      function mqListener() {
        if (mq.matches) {
          angular.element('.s-left-nav').css({
            display: 'block',
            width: '200px',
            float: 'left'
          });
          if (vm.menuListener) {
            window.removeEventListener('click', vm.menuListener);
          }
        } else {
          angular.element('.s-left-nav').css({
            display: 'none'
          });
          vm.menuListener = window.addEventListener('click', function(e){
            console.log(e.target);
            toggleMenu();
          });
        }
        vm.menuOpened = false;
      };
    }
  }

  function toggleMenu($event) {
    if ($event) {
      $event.stopPropagation();
    }
    if (!vm.menuOpened && $event) {
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
      });
    }
    vm.menuOpened = !vm.menuOpened;
  }
}
