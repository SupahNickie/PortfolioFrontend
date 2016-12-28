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
        controller: "projectsController",
        controllerAs: "projectsView"
      })
      .when("/projects/:id/edit", {
        templateUrl: "/src/projects/projects.edit.html",
        controller: "projectsController",
        controllerAs: "projectsView"
      })
      .when("/contact", {
        templateUrl: "/src/contact/contact.index.html",
        controller: "contactController",
        controllerAs: "contactView"
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
