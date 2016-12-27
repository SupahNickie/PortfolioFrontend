(function() {
  angular
    .module('app', [
      'ngRoute'
    ])
    .config(ConfigureRoutes);

  ConfigureRoutes.$inject = ['$routeProvider', '$locationProvider']

  function ConfigureRoutes($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/src/app.splash.html",
      })
      .when("/projects", {
        templateUrl: "/src/projects/projects.index.html",
        controller: "projectsController"
      });
    $locationProvider.html5Mode(true);
  }
})();
