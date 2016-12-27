(function() {
  angular
    .module('app')
    .controller('projectsController', ProjectsController);

  ProjectsController.$inject = ['$http', 'ProjectService'];

  function ProjectsController($http, ProjectService) {
    var projectsView = this;

    projectsView.submitForm = submitForm;

    init();

    function init() {
      $http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/projects'
      })
      .then(indexProjects);
    }

    function indexProjects(response) {
      ProjectService.index(response);
    }

    function submitForm($event) {
      $event.preventDefault();
      var form = $event.target
      var data = new FormData(form)
      var xhr = new XMLHttpRequest()
      xhr.open(form.method, form.action)
      xhr.send(data)
    }

  }
})();
