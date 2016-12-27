(function() {
  angular
    .module('app')
    .controller('projectsController', ProjectsController);

  function ProjectsController() {
    var projectsView = this;

    projectsView.submitForm = submitForm;

    init();

    function init() {
      console.log("I should index the projects")
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
