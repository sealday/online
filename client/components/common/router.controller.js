/**
 * Created by seal on 15/7/13.
 */

angular
  .module('online')
  .controller('RouterController', RouterController);

RouterController.$inject = [];

/* @ngInject */
function RouterController() {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'RouterController';
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
