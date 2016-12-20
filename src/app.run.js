(function() {
  angular
    .module('app', [
      'ngRoute'
    ])
    .config(ConfigureRoutes);

  ConfigureRoutes.$inject = ['$routeProvider']

  function ConfigureRoutes($routeProvider) {
    var routeName;
    var routes = getRoutes();

    function getRoutes() {
      var app, projects;

      projects = {
        url: 'projects',
        templateUrl: 'src/projects/projects.index.html'
      };

      return {
        'projects': projects
      }
    }
  }
})();
