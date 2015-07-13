/**
 * Created by seal on 15/7/13.
 */

angular
  .module('online')
  .controller('NavController', NavController);

NavController.$inject = [];

/* @ngInject */
function NavController() {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'NavController';
  vm.routes = [{
    name: '个人信息',
    state: 'info'
  }, {
    name: '报销',
    state: 'reimbursement'
  }];

  activate();

  ////////////////

  function activate() {
  }


}
