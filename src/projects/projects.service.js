(function() {
  angular
    .module('app')
    .service('ProjectService', ProjectService);

  ProjectService.$inject = ['$q']

  function ProjectService($q) {
    var ProjectService = this;

    ProjectService.index = index;

    function index(response) {
      var deferred = $q.defer();
      var indexed = [];

      for (var i = 0; i < response.data.length; i++) {
        indexed.push(response.data[i]);
      }

      deferred.resolve(indexed);
      return deferred.promise;
    }

    return ProjectService;
  }
})();
