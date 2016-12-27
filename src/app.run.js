(function() {
  angular
    .module('app', [
      'ngRoute'
    ])
    .config(ConfigureRoutes)
    .run(ListenForRouteChange);

  ConfigureRoutes.$inject = ['$routeProvider', '$locationProvider'];

  function ConfigureRoutes($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/src/app.splash.html",
      })
      .when("/projects", {
        templateUrl: "/src/projects/projects.index.html",
        controller: "projectsController"
      })
      .when("/contact", {
        templateUrl: "/src/contact/contact.index.html",
        controller: "contactController"
      })
    $locationProvider.html5Mode(true);
  }

  ListenForRouteChange.$inject = ['$rootScope'];

  function ListenForRouteChange($rootScope) {
    $scope = $rootScope.$new();
    $scope.$on('$routeChangeSuccess', function() {
      var body = document.getElementsByTagName('body')[0];
      if (window.location.pathname == "/") {
        body.setAttribute('class', 'seattle');
      }
      else {
        body.setAttribute('class', '');
      }
    })
  }

})();
