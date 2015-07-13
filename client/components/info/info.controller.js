/**
 * Created by seal on 15/7/13.
 */
angular
  .module('online')
  .controller('InfoController', InfoController);

InfoController.$inject = ['userService'];

/* @ngInject */
function InfoController(userService) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'InfoController';

  activate();

  ////////////////

  function activate() {
  }

}
