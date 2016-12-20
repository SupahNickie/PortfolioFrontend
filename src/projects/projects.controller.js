(function() {
  angular
    .module('app')
    .controller('projectsController', ProjectsController);

  ProjectsController.$inject = ['$scope'];

  function ProjectsController($scope) {
    $scope.imageFile;
    var projectsView = this;

    projectsView.submitForm = submitForm;

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
