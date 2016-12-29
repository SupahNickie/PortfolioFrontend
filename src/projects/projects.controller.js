(function() {
  angular
    .module('app')
    .controller('projectsController', ProjectsController);

  ProjectsController.$inject = ['$http', 'ProjectService', '$routeParams', '$sce'];

  function ProjectsController($http, ProjectService, $routeParams, $sce) {
    var projectsView = this;

    projectsView.projects = [];
    projectsView.images = [];
    projectsView.targets = {
      "imageIndex": $sce.trustAsResourceUrl("http://127.0.0.1:8080/project/" + Math.floor($routeParams["id"]) + "/images"),
      "imagePost": $sce.trustAsResourceUrl("http://127.0.0.1:8080/project/" + Math.floor($routeParams["id"]) + "/images"),
      "imagePut": "http://127.0.0.1:8080/image/",
      "projectEdit": $sce.trustAsResourceUrl("http://127.0.0.1:8080/project/" + Math.floor($routeParams["id"])),
      "projectIndex": 'http://127.0.0.1:8080/projects'
    }

    init();

    projectsView.grabImages = grabImages;
    projectsView.chooseImage = chooseImage;

    function init() {
      $http({
        method: 'GET',
        url: projectsView.targets.projectIndex
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

    function grabImages() {
      $http({
        method: 'GET',
        url: projectsView.targets.imageIndex,
        headers: {
          'portfolio-authorization': window.localStorage['portfolio-token']
        }
      })
      .then(function(response) {
        projectsView.images = response.data;
      })
    }

    function chooseImage(image) {
      $http({
        method: 'PUT',
        url: $sce.trustAsResourceUrl(projectsView.targets.imagePut + image.id),
        headers: {
          'portfolio-authorization': window.localStorage['portfolio-token']
        },
        data: {
          'id': image.id,
          'project_id': image.project_id,
          'url': image.url,
          'is_hero_image': true
        }
      })
    }

  }
})();
