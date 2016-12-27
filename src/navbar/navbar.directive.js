(function() {
  angular
    .module('app')
    .directive('navbar', Navbar);

  function Navbar() {
    return {
      templateUrl: "/src/navbar/navbar.index.html",
      controller: "navbarController",
      controllerAs: "navbarView"
    }
  }
})();
