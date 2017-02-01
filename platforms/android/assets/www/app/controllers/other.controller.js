OBizR.controller('filterCtrl', function($scope,$state,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService,taxonomyService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on("$ionicView.enter", function(event, data){
  	// $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
   //    taxonomyService.getCategory()
   //      .then(function (category) {
   //        $rootScope.category = category;
   //    }) .finally(function () { $rootScope.$broadcast('loading:hide');}); 
   //  taxonomyService.getKeywords()
   //      .then(function (keywords) {
   //        $rootScope.keywords = keywords;
   //    }) .finally(function () { $rootScope.$broadcast('loading:hide');}); 
    $scope.initializeFilterData();
    console.log($ionicHistory.backView());//get from state name
  });
  
  $scope.setFilterValFor = function (caseStr) {
    $rootScope.currentFieldName = caseStr;
    $state.go('app.filterSetFieldValue');
  }
  $scope.doCancel = function () {
    $ionicHistory.goBack();
  }
  $scope.doSaveFilterFieldValue = function () {
    $ionicHistory.goBack();

  }
  $scope.initializeFilterData = function () {
    if($rootScope.filter == undefined){
      $rootScope.filter = {};
      //$rootScope.filter.openNow = true;
      $rootScope.filter.claimed = true;
      // $rootScope.filter.distance = "ASC";
      // $rootScope.filter.reviews = "ASC";
      // $rootScope.filter.ratings = "ASC";
    }
  }
  /////////////////////Autocomplete fuctionality///////////////////////////////
  $scope.setModel = function (item) {
    $scope.selectedItem = item;
     if($rootScope.currentFieldName == 'Category'){
      $rootScope.filter.category = $scope.selectedItem.node.categoryid;
    }else{
      $rootScope.filter.keywords = $scope.selectedItem.keyword.id;
    }
  };

  $scope.autocompleteInput = {
    'propNameToDisplay': 'name',
    'placeholder': 'Education, Professional Services, NGO and Government  ',
    'ID':'StaicData',
    'listClass': ['border-energized'], //optional cutsom classes for matched items
    'labelContainerClass': ['bottom-border'] //optional
  };

  $scope.autocompleteInput.itemSelectCallback = $scope.setModel;
  if($rootScope.currentFieldName == 'Category'){
    $scope.autocompleteInput.searchlist = $rootScope.category;
  }else{
    $scope.autocompleteInput.searchlist = $rootScope.keywords;
  }
  
  $scope.$root.$broadcast($scope.autocompleteInput.ID);
  /////////////////////////////////////////////////////////////////////////////
  
  $scope.dofilterSerarch = function () {
    if($ionicHistory.backView().stateName == 'app.nearby'){
      $state.go('app.searchResults',{srchId:'filterFromNearby'});
    }else{
      $state.go('app.searchResults',{srchId:'filterFromSearchRes'});
    }
  }
});

OBizR.controller('searchCtrl', function($scope,$state,$ionicHistory,$rootScope) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.initializeSearchData();
  });
  $scope.initializeSearchData = function () {
    if($rootScope.searchData == undefined){
        $rootScope.searchData = {};
        $rootScope.lastSearchName = '';
    }
  }
  $scope.doSearch = function () {
    if ($rootScope.searchData.name == '' || $rootScope.searchData.name == undefined) {
      return;
    }
    $state.go('app.searchResults',{srchId:'search'});
  }
});

OBizR.controller('srchResCtrl', function($scope,$state,$filter,$stateParams,$ionicHistory,$rootScope,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.searchedBusinesses = [];
    if($stateParams.srchId == 'search'){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.searchBusinesses($rootScope.searchData.name)
        .then(function (biz) {
          $rootScope.searchedBusinesses = biz.nodes;
          console.log($rootScope.searchedBusinesses);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    }
    if($stateParams.srchId == 'filterFromNearby'){

      if($rootScope.filter.distance!= undefined || $rootScope.filter.reviews!= undefined || $rootScope.filter.ratings!= undefined){
        $scope.doSortBiz();
      }else{
        $scope.doFiler('nonDefault');
      }
    }
    if($stateParams.srchId == 'filterFromSearchRes'){
      
      if($rootScope.filter.distance!= undefined || $rootScope.filter.reviews!= undefined || $rootScope.filter.ratings!= undefined){
        $scope.doSortBiz();
      }else{
        $scope.doFiler('default');
      }
    }
  });
  $scope.doFiler = function (type) {
    if(type == 'nonDefault'){
      $rootScope.searchedBusinesses = $rootScope.displayBusinesses;
      console.log('nonDefault');
    }else{
      console.log('Default');
    }

  }
  $scope.doSortBiz = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.filterBusinesses()
      .then(function (biz) {
          $rootScope.searchedBusinesses = biz.nodes;
          $scope.doFiler('default');
          console.log($rootScope.searchedBusinesses)
          $rootScope.filter = undefined;
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.businessDetails = function (bid) {
    $state.go('app.businessDetails',{bid:bid});
  }
  $scope.getFilterView = function () {
    $state.go('app.filter');
  }
  $scope.getMapView = function () {
    $state.go('app.mapView');
  }
});

OBizR.controller('otherCtrl', function($scope,$state,$filter,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService,taxonomyService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.initializeMap();
  });
  $scope.listBizView = function () {
    $state.go('app.nearby');
  }
  $scope.getFilterView = function () {
   $state.go('app.filter');
  }

  //////////////////////////Map View///////////////////////////////////
  $scope.initializeMap = function () {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        var mapOptions = {
          center: myLatLng,
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map-view"), mapOptions);

        // Additional Markers
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (biz){
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(biz.geocode_lat, biz.geocode_long),
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            title: biz.title,
            icon: 'assets/img/map-marker.png'
          });

          //Creating marker content
          var createMarkerContent = '<em>' + marker.title + '</em>';
          createMarkerContent += '<div class="biz-ratings '+$filter('ratingClass')(biz.ratings)+'">';
          createMarkerContent += '<div class="star-rating"><span style="width:'+biz.ratings+'"></span></div>';
          createMarkerContent += biz.reviewcount+' Reviews</div>';
          createMarkerContent += '<p>'+biz.street+','+biz.city+'</p>';
          createMarkerContent += '<p>'+biz.distance+' mi'+'</p>';

          marker.content = createMarkerContent;
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.content);
            infoWindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);
        }  
        //Taking 20 nearest biz for standard
        for (i = 0; i < 20; i++){
            createMarker($rootScope.displayBusinesses[i].node);
        }
        console.log($rootScope.displayBusinesses);
      }, function(error){
        console.log("Could not get location");
    });
  }
});
OBizR.controller('claimBizCtrl', function($scope,$state,$stateParams,$ionicHistory,$cordovaGeolocation,$rootScope,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.bizClaim = {};
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.serverErrors = [];
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    businessesService.searchedBusinessDetails($stateParams.bid).then(function (biz) {
       $scope.bizClaim.business_name  = biz.nodes[0].node.title;
       $scope.bizClaim.field_claimed_biz_node_id = biz.nodes[0].node.nid;
       $scope.bizClaim.uid = $rootScope.currentUser.uid;
       $scope.bizClaim.type = 'obizr_backend';
       $scope.bizClaim.bundle = 'claim_business';
    }) .finally(function () { $rootScope.$broadcast('loading:hide');});
  });
  $scope.$on("$ionicView.beforeLeave", function(event, data){
    $rootScope.serverErrors = [];
  });

  $scope.doClaimBiz = function () {
    $rootScope.serverErrors = [];
    if($scope.bizClaim.field_are_you_the_legal_owner == undefined){
      $rootScope.serverErrors.push('Legal owner field is required.');
      return;
    }
    if($scope.bizClaim.field_claim_instruc_for_our_team == undefined){
      $rootScope.serverErrors.push('Instruction is required.');
      return;
    }
    else{
      //TODO:request api to send mail or write code to mail.
      console.log($scope.bizClaim);
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.claimBiz($scope.bizClaim).then(function (biz) {
        console.log(biz)
        $scope.sucessMsg = "Thank you, we have recieved your business claim request and will contacet you shortly."
      },function(error){
        $rootScope.serverErrors.push('Something went wrong.');
      }).finally(function () { $rootScope.$broadcast('loading:hide');});
    }
  }
});