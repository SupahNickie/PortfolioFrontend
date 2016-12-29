(function() {
  angular
    .module('app')
    .controller('projectsController', ProjectsController);

  ProjectsController.$inject = ['$http', 'ProjectService', '$routeParams', '$sce', '$rootScope', 'FlashService'];

  function ProjectsController($http, ProjectService, $routeParams, $sce, $rootScope, FlashService) {
    var projectsView = this;
    var BACKEND_BASE_URL = 'http://127.0.0.1:8080/'

    projectsView.projects = [];
    projectsView.images = [];
    projectsView.targets = {
      "imageIndex": $sce.trustAsResourceUrl(BACKEND_BASE_URL + "project/" + Math.floor($routeParams["id"]) + "/images"),
      "imagePost": $sce.trustAsResourceUrl(BACKEND_BASE_URL + "project/" + Math.floor($routeParams["id"]) + "/images"),
      "imagePut": $sce.trustAsResourceUrl(BACKEND_BASE_URL + "image/"),
      "projectIndex": $sce.trustAsResourceUrl(BACKEND_BASE_URL + "projects"),
      "projectPost": $sce.trustAsResourceUrl(BACKEND_BASE_URL + "project/"),
      "projectPut": $sce.trustAsResourceUrl(BACKEND_BASE_URL + "project/" + Math.floor($routeParams["id"]))
    }

    init();

    projectsView.grabProjects = grabProjects;
    projectsView.deleteProject = deleteProject;
    projectsView.grabImages = grabImages;
    projectsView.chooseImage = chooseImage;
    projectsView.deleteImage = deleteImage;

    function init() {
      grabProjects();
    }

    function grabProjects() {
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

    function deleteProject(project) {
      $http({
        method: 'DELETE',
        url: $sce.trustAsResourceUrl(projectsView.targets.projectPost + project.id),
        headers: {
          'portfolio-authorization': window.localStorage['portfolio-token']
        }
      })
      .success()
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

    function deleteImage(image) {
      $http({
        method: 'DELETE',
        url: $sce.trustAsResourceUrl(projectsView.targets.imagePut + image.id),
        headers: {
          'portfolio-authorization': window.localStorage['portfolio-token']
        }
      })
    }

  }
})();
