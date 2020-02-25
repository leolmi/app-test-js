
const F1AvailableAction = {
  home: 'home',
  alonso: 'alonso',
  massa: 'massa'
};

angular.module('F1FeederApp', [
  'F1FeederApp.services',
  'F1FeederApp.controllers',
  'ngRoute'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider.
    when('/', {templateUrl: 'partials/home.html', controller: 'driversController'}).
    when('/driver/:id', {templateUrl: 'partials/driver.html', controller: 'driverController'}).
    otherwise({redirectTo: '/'});

}])
.run(['$rootScope', function($rootScope) {

  // privma connessione per rcavare info di login
  raven.state({
    name:'drivers',
    version:'2.1.432'
  }).then(function(resp){
    console.log('CONTAINER RESPONSE', resp);

    /**
     * Nel caso sia necessaria l'autenticazione:
     *  - la risposta contiene il token ed il nome utente
     */

    const token = resp.token;
    const user = resp.user;

    /**
     * Nel caso in cui sia gestito il tema:
     *  - la risposta contiene il nome del tema
     */

    const theme = resp.theme;

  }, function(err) {
    console.error('CONTAINER ERROR RESPONSE', err);
  });

  // disposing della libreria (superfluo)
  $rootScope.$on('$destroy', () => raven.dispose());
}]);
