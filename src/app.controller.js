(function() {
  angular
    .module('app')
    .controller('appController', AppController);

  function AppController() {
    var appView = this;
    appView.authenticated = true;

    appView.submitJSON = submitJSON;
    appView.submitMultipart = submitMultipart;

    function submitJSON($event) {
      $event.preventDefault();
      var form = $event.target
      var data = JSON.stringify(objectify(form))
      var xhr = new XMLHttpRequest()
      xhr.open(form.getAttribute('data-http-verb'), form.action)
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(data)
    }

    function submitMultipart($event) {
      $event.preventDefault();
      var form = $event.target
      var data = new FormData(form)
      var xhr = new XMLHttpRequest()
      xhr.open(form.getAttribute('data-http-verb'), form.action)
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
