angular
  .module('F1FeederApp.services', [])
  .factory('ergastAPIservice', ['$http', '$window', function($http, $window) {

    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http.get('http://ergast.com/api/f1/2013/driverStandings.json');
    };

    ergastAPI.getDriverDetails = function(id) {
      return $http.get('http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json');
    };

    ergastAPI.getDriverRaces = function(id) {
      return $http.get('http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json');
    };

    // sottoscrizione per la ricezione dei messaggi di tipo action
    raven.subscribe((e) => {
      console.log('MENU ACTION: %s' ,e.action, e.data);

      /**
       * Gestione della risposta per scatenare azioni interne:
       * in questo esempio si sono mappate tutte le possibili action nella costante F1AvailableAction
       */
      switch(e.action) {
        case F1AvailableAction.home:
          $window.location.href = './';
          break;
        case F1AvailableAction.alonso:
        case F1AvailableAction.massa:
          $window.location.href = './#!/driver/' + e.action;
          break;
        default:
          // se l'azione richiesta da raven non è gestita lo segnala
          if (!!e.action) console.warn('Not available action (%s)!', e.action);
          break;
      }

    }, (e) => e.type === 'action');

    return ergastAPI;
  }]);
