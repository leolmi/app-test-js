angular.module('F1FeederApp.controllers', []).

  /* Drivers controller */
  controller('driversController', function($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };
    $scope.sendToRaven = function() {
      raven.state({
        action: 'f1action',
        data: {
          value: 2000
        },
        type: 'action'
      })
    };

    ergastAPIservice.getDrivers().then(function (response) {
        //Digging into the response to get the relevant data
        $scope.driversList = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }, function(err) {
        console.error(err);
    });
  }).

  /* Driver controller */
  controller('driverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    ergastAPIservice.getDriverDetails($scope.id).then(function (response) {
        $scope.driver = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    }, console.error);

    ergastAPIservice.getDriverRaces($scope.id).then(function (response) {
        $scope.races = response.data.MRData.RaceTable.Races;
    }, console.error);
  });
