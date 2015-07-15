/**
 * Created by seal on 7/14/15.
 */
angular
  .module('online')
  .controller('InfoEditController', InfoEditController);

InfoEditController.$inject = ['$scope'];

/* @ngInject */
function InfoEditController($scope) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'InfoEditController';
  console.log($scope);

  activate();

  ////////////////

  function activate() {
  }


}
