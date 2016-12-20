(function() {
  angular
    .module('app')
    .directive('projects', Projects);

  function Projects() {
    return {
      restrict: 'AE',
      templateUrl: '/src/projects/projects.index.html',
      controller: 'projectsController',
      controllerAs: 'projectsView'
    };
  }
})();
