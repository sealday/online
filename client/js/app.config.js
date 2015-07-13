/**
 * Created by seal on 15/7/13.
 */

angular
  .module('online')
  .config(onlineConfig);

onlineConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

/* @ngInject */
function onlineConfig($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  var base = 'components/';

  $stateProvider.state('home', {
    url: '/',
    templateUrl: base + 'home/home.html'
  }).state('info', {
    url: '/info',
    templateUrl: base + 'info/info.html',
    controller: 'InfoController',
    controllerAs: 'ic'
  });
}
