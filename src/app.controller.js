(function() {
  angular
    .module('app')
    .controller('appController', AppController);

  AppController.$inject = ['$rootScope']

  function AppController($rootScope) {
    var appView = this;

    appView.isAuthenticated = false;

    appView.submitJSON = submitJSON;
    appView.submitMultipart = submitMultipart;

    $rootScope.$on('authenticated', function() {
      appView.isAuthenticated = true;
    });
    $rootScope.$on('flashMessage', function(event, message) {
      setFlash(message);
    });

    function setFlash(message) {
      var flash = document.getElementById("flash-message");
      flash.innerText = message;
      setTimeout(function() {
        flash.innerText = "";
      }, 3000);
    }

    function submitJSON($event) {
      $event.preventDefault();
      var form = $event.target
      var data = JSON.stringify(objectify(form))
      var xhr = new XMLHttpRequest()
      xhr.open(form.getAttribute('data-http-verb'), form.action)
      xhr.setRequestHeader("portfolio-authorization", window.localStorage['portfolio-token']);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(data)
    }

    function submitMultipart($event) {
      $event.preventDefault();
      var form = $event.target
      var data = new FormData(form)
      var xhr = new XMLHttpRequest()
      xhr.open(form.getAttribute('data-http-verb'), form.action)
      xhr.setRequestHeader("portfolio-authorization", window.localStorage['portfolio-token']);
      xhr.send(data)
    }

    function objectify(form) {
      var q = {};
      for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name != "") q[form.elements[i].name] = form.elements[i].value;
      }
      return q;
    }

  }
})();
