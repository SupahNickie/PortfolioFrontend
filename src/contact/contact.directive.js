(function() {
  angular
    .module('app')
    .directive('contact', Contact);

  function Contact() {
    return {
      restrict: 'AE',
      templateUrl: '/src/contact/contact.index.html',
      controller: 'contactController',
      controllerAs: 'contactView'
    };
  }
})();
