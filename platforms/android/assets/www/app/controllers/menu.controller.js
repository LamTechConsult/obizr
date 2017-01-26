
OBizR.controller('menuCtrl',function($rootScope,$sce,$scope,locationService,$localStorage,$state,pageService,$cordovaGeolocation,businessesService){
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.serverErrors = [];
  	//$rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      pageService.getAboutPage()
        .then(function (aboupage) {
          $scope.aboupage = aboupage[0].node;
      });
      pageService.getAboutPressKitPage()
        .then(function (aboutpresskitpage) {
          $scope.aboutpresskitpage = aboutpresskitpage[0].node;
      });
      pageService.getAboutProfesSrvPage()
        .then(function (aboutprofessrvpage) {
          $scope.aboutprofessrvpage = aboutprofessrvpage[0].node;
      });
      pageService.getAboutBizSubsPage()
        .then(function (aboutbizsubspage) {
          $scope.aboutbizsubspage = aboutbizsubspage[0].node;
      });
      //////////////////////////////////////////////
      
      pageService.getGSReviverPage()
        .then(function (gsreviverpage) {
          $scope.gsreviverpage = gsreviverpage[0].node;
      });
      pageService.getGSBizPage()
        .then(function (gsbizpage) {
          $scope.gsbizpage = gsbizpage[0].node;
      });
      pageService.getGSBuildPage()
        .then(function (gsbuildpage) {
          $scope.gsbuildpage = gsbuildpage[0].node;
      });
      pageService.getGSLearnPage()
        .then(function (gslearnpage) {
          $scope.gslearnpage = gslearnpage[0].node;
      });
      pageService.getGSPubSevPage()
        .then(function (gspubsevpage) {
          $scope.gspubsevpage = gspubsevpage[0].node;
      });
      
      //////////////////////////////////////////////
      pageService.getSupportPage()
        .then(function (supportpage) {
          $scope.supportpage = supportpage;
      });

      //////////////////////////////////////////////
      pageService.getPrivacyPolicyPage()
        .then(function (privacypolicypage) {
          $scope.privacypolicypage = privacypolicypage[0].node;
      });
      pageService.getTermUsePage()
        .then(function (termusepage) {
          $scope.termusepage = termusepage[0].node;
      }); //.finally(function () { $rootScope.$broadcast('loading:hide');});     
  });
  $scope.$on('$ionicView.beforeLeave', function (event, viewData) {
    $rootScope.serverErrors = [];
  });
  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };
  $scope.captureCurrentLocation = function () {

    $rootScope.serverErrors = [];
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    locationService.getCurrentPosition().then(function (position) {

      $localStorage.currentLocation.lat = position.lat;
      $localStorage.currentLocation.long = position.long;
      $localStorage.currentLocation.address = position.address;
      $localStorage.currentLocation.address_components = position.address_components;
      $rootScope.currentLocation = $localStorage.currentLocation;
      $localStorage.isLocationAllowed = true;
      $scope.sortBizBycurrentLoc();
      $rootScope.$broadcast('loading:hide');
    },function(err) {
      $rootScope.$broadcast('loading:hide');
      $rootScope.serverErrors.push('Unable to get loacation try after sometime.');
    });
  }
  $scope.newLocation = {};
  $scope.newLocation.country = 'Sierra Leone';

  $scope.enterNewLocation = function() {
    $rootScope.serverErrors = [];
    if($scope.newLocation.city == undefined || $scope.newLocation.city == ''){
      $rootScope.serverErrors.push('City is required.');
      return;
    }
    if($scope.newLocation.street == undefined || $scope.newLocation.street == ''){
      $rootScope.serverErrors.push('Street is required.');
      return;
    }else{
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      var commaSeparateVal = $scope.newLocation.street+","+$scope.newLocation.city+","+$scope.newLocation.country;
      locationService.getGeocodeByAddress(commaSeparateVal).then(function (position) {
        
        $localStorage.currentLocation.lat = position.lat;
        $localStorage.currentLocation.long = position.long;
        $localStorage.currentLocation.address = position.address;
        $localStorage.currentLocation.address_components = position.address_components;
        $rootScope.currentLocation = $localStorage.currentLocation;
        $localStorage.isLocationAllowed = true;
        $rootScope.$broadcast('loading:hide');
        $scope.sortBizBycurrentLoc();
      },function(err) {
        $rootScope.$broadcast('loading:hide');
        $rootScope.serverErrors.push('Unable to set loacation try after sometime.');
      });
    }
  }
  $scope.sortBizBycurrentLoc = function () {
    businessesService.sortBizDataByCurrentDis({nodes:$rootScope.displayBusinesses}).then(function (newSortedBiz) {
      $localStorage.biz = newSortedBiz.nodes;
    });
  }
});