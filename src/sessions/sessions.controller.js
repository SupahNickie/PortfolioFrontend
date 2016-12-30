(function() {
  angular
    .module("app")
    .controller("sessionsController", SessionsController);

  SessionsController.$inject = ['$http', '$rootScope', 'FlashService']

  function SessionsController($http, $rootScope, FlashService) {
    var sessionsView = this;

    sessionsView.submit = submit;

    function submit($event) {
      $http({
        method: 'POST',
        url: 'http://127.0.0.1:8080/sessions',
        data: JSON.stringify({"password": document.getElementById('sessions-password-input').value})
      })
      .then(handleAuthResponse);
    }

    function handleAuthResponse(response) {
      if (response.data.secret && response.data.secret.length > 0) {
        $rootScope.$broadcast("authenticated");
        window.localStorage['portfolio-token'] = response.data['secret'];
        FlashService.broadcast("Successfully authenticated!")
      }
      else {
        window.location = "/";
      }
    }
  }
})();
