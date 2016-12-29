(function() {
  angular
    .module('app')
    .service('FlashService', FlashService);

  FlashService.$inject = ['$rootScope']

  function FlashService($rootScope) {
    var self = this;

    self.broadcast = broadcast;

    function broadcast(message) {
      $rootScope.$broadcast('flashMessage', message);
    }
  }
})();
