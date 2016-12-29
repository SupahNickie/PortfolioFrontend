(function() {
  angular
    .module('app')
    .controller('projectsController', ProjectsController);

  ProjectsController.$inject = ['$http', 'ProjectService', '$routeParams', '$sce'];

  function ProjectsController($http, ProjectService, $routeParams, $sce) {
    var projectsView = this;

    projectsView.projects = [];
    projectsView.targets = {
      "imagePost": $sce.trustAsResourceUrl("http://127.0.0.1:8080/project/" + Math.floor($routeParams["id"]) + "/images"),
      "editProject": $sce.trustAsResourceUrl("http://127.0.0.1:8080/project/" + Math.floor($routeParams["id"]))
    }

    init();

    function init() {
      $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/projects',
        headers: {
          "portfolio-authorization": "hardcoded for now"
        }
      })
      .then(indexProjects);
    }

    function indexProjects(response) {
      ProjectService
        .index(response)
        .then(function(indexed) {
          projectsView.projects = indexed;
          projectsView.currentProject = getCurrentProject();
        });
    }

    function getCurrentProject() {
      return projectsView.projects[Math.floor($routeParams["id"]) - 1];
    }

  }
})();
