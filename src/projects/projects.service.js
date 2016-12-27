(function() {
  angular
    .module('app')
    .service('ProjectService', ProjectService);

  function ProjectService() {
    var ProjectService = this;
    var indexed = {};

    ProjectService.index = index;

    function index(response) {
      console.log(response.data);
    }

    function getIndexed() {
      return indexed;
    }

    return ProjectService;
  }
})();
