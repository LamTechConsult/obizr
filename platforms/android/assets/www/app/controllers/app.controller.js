
OBizR.controller('mainCtrl', function($scope,$localStorage,$window,$cordovaGeolocation,$rootScope,$state,taxonomyService) {
  $rootScope.ProvienceItem = [];
  $rootScope.DistrictItem = [];
  $rootScope.ChiefdomItem = [];
  $rootScope.days = [
      {label:'Mon', value:'Mon'},
      {label:'Tue', value:'Tue'},
      {label:'Wed', value:'Wed'},
      {label:'Thu', value:'Thu'},
      {label:'Fri', value:'Fri'},
      {label:'Sat', value:'Sat'},
      {label:'Sun', value:'Sun'},
      {label:'Closed', value:'closed'}
    ];
  $rootScope.weekdays = [
      {value:"mon"},
      {value:"tue"},
      {value:"wed"},
      {value:"thu"},
      {value:"fri"},
      {value:"sat"},
      {value:"sun"}
    ];
  $rootScope.hours = [
      {label:'12:00 AM', value:'12:00 AM'},
      {label:'12:30 AM', value:'12:30 AM'},
      {label:'01:00 AM', value:'01:00 AM'},
      {label:'01:30 AM', value:'01:30 AM'},
      {label:'02:00 AM', value:'02:00 AM'},
      {label:'02:30 AM', value:'02:30 AM'},
      {label:'03:00 AM', value:'03:00 AM'},
      {label:'03:30 AM', value:'03:30 AM'},
      {label:'04:00 AM', value:'04:00 AM'},
      {label:'04:30 AM', value:'04:30 AM'},
      {label:'05:00 AM', value:'05:00 AM'},
      {label:'05:30 AM', value:'05:30 AM'},
      {label:'06:00 AM', value:'06:00 AM'},
      {label:'06:30 AM', value:'06:30 AM'},
      {label:'07:00 AM', value:'07:00 AM'},
      {label:'07:30 AM', value:'07:30 AM'},
      {label:'08:00 AM', value:'08:00 AM'},
      {label:'08:30 AM', value:'08:30 AM'},
      {label:'09:00 AM', value:'09:00 AM'},
      {label:'09:30 AM', value:'09:30 AM'},
      {label:'10:00 AM', value:'10:00 AM'},
      {label:'10:30 AM', value:'10:30 AM'},
      {label:'11:00 AM', value:'11:00 AM'},
      {label:'11:30 AM', value:'11:30 AM'},
      {label:'12:00 PM', value:'12:00 PM'},
      {label:'12:30 PM', value:'12:30 AM'},
      {label:'01:00 PM', value:'01:00 PM'},
      {label:'01:30 PM', value:'01:30 PM'},
      {label:'02:00 PM', value:'02:00 PM'},
      {label:'02:30 PM', value:'02:30 PM'},
      {label:'03:00 PM', value:'03:30 PM'},
      {label:'03:30 PM', value:'03:30 PM'},
      {label:'04:00 PM', value:'04:00 PM'},
      {label:'04:30 PM', value:'04:30 PM'},
      {label:'05:00 PM', value:'05:00 PM'},
      {label:'05:30 PM', value:'05:30 PM'},
      {label:'06:00 PM', value:'06:00 PM'},
      {label:'06:30 PM', value:'06:30 PM'},
      {label:'07:00 PM', value:'07:00 PM'},
      {label:'07:30 PM', value:'07:30 PM'},
      {label:'08:00 PM', value:'08:00 PM'},
      {label:'08:30 PM', value:'08:30 PM'},
      {label:'09:00 PM', value:'09:00 PM'},
      {label:'09:30 PM', value:'09:30 PM'},
      {label:'10:00 PM', value:'10:00 PM'},
      {label:'10:30 PM', value:'10:30 PM'},
      {label:'11:00 PM', value:'11:00 PM'},
      {label:'11:30 PM', value:'11:30 PM'},
      {label:'Closed', value:'closed'},
    ];

  if($localStorage.category){
    $rootScope.category = $localStorage.category;
  }else{
    taxonomyService.getCategory().then(function (category) {
      $localStorage.category = category;
      $rootScope.category = $localStorage.category;
    });
  }
  if($localStorage.keywords){
    $rootScope.keywords = $localStorage.keywords;
  }else{
    taxonomyService.getKeywords().then(function (keywords) {
      $localStorage.keywords = keywords;
      $rootScope.keywords = $localStorage.keywords;
    });
  }
  if($localStorage.provience){
     $rootScope.ProvienceItem = $localStorage.provience;
  }else{
    taxonomyService.getProvience().then(function (provience) {
      $localStorage.provience = provience;
      $rootScope.ProvienceItem = $localStorage.provience;
    });
  }
  if($localStorage.currentUser){
    $rootScope.currentUser = $localStorage.currentUser;
  }
   if(!$localStorage.currentLocation){
    $localStorage.currentLocation = {};
  }else{
    $rootScope.currentLocation = $localStorage.currentLocation;
  }
});

OBizR.controller('reviewDetailsCtrl', function($scope,$state,$ionicHistory,$rootScope,$stateParams,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    $rootScope.reviewsDetails = {};
    if($stateParams.rid){
      businessesService.getBusinessesReviewById($stateParams.rid)
        .then(function (bizReviewDetail) {
          $rootScope.reviewsDetails = bizReviewDetail;
          console.log($rootScope.reviewsDetails);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
 
});

OBizR.controller('writeReviewCtrl', function($scope,$state,CameraService,$ionicHistory,$rootScope,$stateParams,$localStorage,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
      
  // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 0;
  $scope.rating.max = 5;

  $scope.writeReviewData={
    // subject:'',
    //comment_body:{und:[{value:''}]},
    nid:parseInt($stateParams.bid),
    //uid:1,
    //field_ltc_biz_photos:{und:[{rating:$scope.rating,target:null}]}
  };
  
  $scope.serverErrors = [];
  $scope.saveWriteReview = function () {
    if($scope.rating.rate>0){
       var percentRating = $scope.rating.rate*20;
    }
    $scope.writeReviewData.field_ltc_biz_rating = {und:[{rating:percentRating,target:null}]}
    $scope.serverErrors = [];
    if($scope.writeReviewData.subject == undefined){
      $scope.serverErrors.push('subject is required');
    }
    if($scope.writeReviewData.comment_body == undefined || $scope.writeReviewData.comment_body.und[0].value == '' ){
      $scope.serverErrors.push('review is required');
    }else{
      console.log($scope.writeReviewData);
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.postReviews($scope.writeReviewData).then(function (data) {
        $scope.writeReviewData = {};
        $state.go('app.businessDetails',{bid:$stateParams.bid});
      },function (errorResult) {
          if (errorResult.status >= 400 && errorResult.status < 500) {
              $scope.serverErrors.push(errorResult.data[0]);
          }
          else {
            $scope.serverErrors.push(errorResult.statusText);
          }
      }).finally(function () { 
        $rootScope.$broadcast('loading:hide');
        
      });
    }  
  }

  $scope.takePicture = function(){
    $state.go('app.camSource',{bid:$stateParams.bid});
  }
  $scope.useCamera = function(){
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        quality: 80,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 200,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        //correctOrientation:true
      };

      CameraService.getPicture(options).then(function(imageData) {

        $rootScope.pictureURL =  imageData;
        $ionicHistory.goBack();
      }, function(err) {
          alert(JSON.stingify(error));
      });
     //$cordovaCamera.cleanup().then(); // only for FILE_URI
  }
  $scope.useGallery = function(){
    var options = {
      destinationType: Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,
      sourceType: 0,
      quality: 80,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      //correctOrientation:true
    };

    CameraService.getPicture(options).then(function(imageData) {
      $rootScope.pictureURL =  imageData;
      $ionicHistory.goBack();
    }, function(err) {
      alert(JSON.stingify(error));
    });
    //$cordovaCamera.cleanup().then(); // only for FILE_URI
  }
});

OBizR.controller('bizCtrl', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.businessesReview = [];
    $rootScope.businessesDetails = null;
    
    if($stateParams.bid){
      businessesService.searchedBusinessDetails($stateParams.bid).then(function (biz) {
        $rootScope.businessesDetails = biz.nodes[0].node;
        if($rootScope.businessesDetails.geocode_lat){
          $rootScope.businessesDetails.lat  = parseFloat($rootScope.businessesDetails.geocode_lat);
          $rootScope.businessesDetails.long = parseFloat($rootScope.businessesDetails.geocode_long);
        }else{
          $rootScope.businessesDetails.lat  = 8.465257;
          $rootScope.businessesDetails.long = -13.232233;
        }
        var bizDetail = {};
        bizDetail.lat = $rootScope.businessesDetails.lat;
        bizDetail.long = $rootScope.businessesDetails.long;
        bizDetail.title = $rootScope.businessesDetails.title;
        
        businessesService.getBusinessesReview($stateParams.bid).then(function(review) {
          $rootScope.businessesReview = review;
          $scope.getBusinessesMap(bizDetail);
        });
        console.log($rootScope.businessesDetails);
      }).finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });

  ///////////////////// Show map on business detail page/////////////////////
  $scope.getBusinessesMap = function (bizDetail) {
    console.log(bizDetail)
      var bizLatLng = new google.maps.LatLng(bizDetail.lat, bizDetail.long);
      var mapOptions = {
        zoom: 15,
        center: bizLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(bizDetail.lat, bizDetail.long),
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        title: bizDetail.title,
        icon: 'assets/img/map-marker.png'
      });

      google.maps.event.addListener(marker, 'click', function(){
        $state.go('app.businessDetailsMap',{bid:$stateParams.bid});
      });
  };

  $scope.showMoreDetails = false;
  $scope.showMoreBizDetail = function () {
    return $scope.showMoreDetails = !$scope.showMoreDetails;
  }
  $scope.writeReviewClick = function () {
    $state.go('app.writeReview',{bid:$stateParams.bid});
  }
  $scope.reviewerDetails = function (rid) {
    console.log(rid);
    $state.go('app.reviewDetails',{rid:rid});
  }
  $scope.reviewerProfile = function(uid){
    $state.go('app.reviewerProfile',{uid:uid});
  }
  $scope.reviewerProfile = function(uid){
    $state.go('app.reviewerProfile',{uid:uid});
  }
  $scope.editBusinessClick = function () {
    $rootScope.editBizData = '';
    $state.go('app.editBusiness',{bid:$stateParams.bid});
  }
  $scope.businessDetailsMapClick = function(){
    $state.go('app.businessDetailsMap',{bid:$stateParams.bid});
  }
  $scope.showDirectionMapClick = function () {
    $state.go('app.businessDirectionsMapOptions',{bid:$stateParams.bid});
  }
  $scope.claimBusinessClick = function () {
    $state.go('app.claimBiz',{bid:$stateParams.bid});
  }
});

OBizR.controller('bizCtrlMap', function($scope,$state,$filter,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.getBusinessesMap($rootScope.businessesDetails);
  });
  
  ///////////////////// Show map on business detail page/////////////////////
  $scope.getBusinessesMap = function (bizDetail) {
    console.log(bizDetail)
      var bizLatLng = new google.maps.LatLng(bizDetail.lat, bizDetail.long);
      var mapOptions = {
        zoom: 15,
        center: bizLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(bizDetail.lat, bizDetail.long),
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        title: bizDetail.title,
        icon: 'assets/img/map-marker.png'
      });

      //Creating marker content
      var createMarkerContent = '<em>' + marker.title + '</em>';
      createMarkerContent += '<div class="biz-ratings '+$filter('ratingClass')(bizDetail.ratings)+'">';
      createMarkerContent += '<div class="star-rating"><span style="width:'+bizDetail.ratings+'"></span></div>';
      createMarkerContent += bizDetail.reviewcount+' Reviews</div>';
      createMarkerContent += '<p>'+bizDetail.street+','+bizDetail.city+'</p>';
      createMarkerContent += '<p>'+bizDetail.distance+' mi'+'</p>';

      marker.content = createMarkerContent;
      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent(marker.content);
        infoWindow.open($scope.map, marker);
      });
  };

  $scope.reviewerProfile = function(uid){
    $state.go('app.reviewerProfile',{uid:uid});
  }
  
  $scope.showDirectionMapClick = function () {
    $state.go('app.businessDirectionsMapOptions',{bid:$stateParams.bid});
  }
});

OBizR.controller('bizCtrlMapDirectionsOptions', function($scope,$state,$cordovaInAppBrowser,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.initializeData(); 
  });
  $scope.initializeData = function () {
    if($rootScope.choice == undefined){
      $rootScope.choice = 'google';
      $rootScope.startpoint = {};
      $rootScope.startpoint.myLocation = {};
      $rootScope.startpoint.myLocation.lat  = $localStorage.currentLocation.lat;
      $rootScope.startpoint.myLocation.long =$localStorage.currentLocation.lat;
      //$rootScope.startpoint.customLocation = {};
      $rootScope.endpoint = {};
      $rootScope.endpoint.bizLocation = {};
      $rootScope.endpoint.bizLocation.lat = $rootScope.businessesDetails.lat;
      $rootScope.endpoint.bizLocation.long = $rootScope.businessesDetails.long;
      //$rootScope.endpoint.customLocation = {};
    }
  }
  $scope.directionStartPoint = function () {
    $state.go('app.businessDirectionsMapStartPoint',{bid:$stateParams.bid});
  }
  $scope.directionEndPoint = function () {
    $state.go('app.businessDirectionsMapEndPoint',{bid:$stateParams.bid});
  }

	$scope.directionMap = function (choice) {
    var mayLoc = '';
    var bizLoc = '';
    if($rootScope.startpoint.myLocation){
      mayLoc = $rootScope.startpoint.myLocation;
    }else{
       mayLoc = $rootScope.startpoint.customLocation;
    }
    if($rootScope.endpoint.bizLocation){
      bizLoc = $rootScope.endpoint.bizLocation;
    }else{
      bizLoc = $rootScope.endpoint.customLocation;
    }
	 
  	if(choice=="google"){
      //$state.go('app.routeMap');
      var link = ""+"http://maps.google.com/maps?saddr="+mayLoc.lat+","+mayLoc.long+" &daddr="+bizLoc.lat+","+bizLoc.long;
      // window.location = link;
      $cordovaInAppBrowser.open(link,'_system');
  	 }
  	 if(choice=="apple"){
      var link= ""+"http://maps.apple.com/?ll="+bizLoc.lat+","+bizLoc.long+"&dirflg=d&t=h";
      //window.location = link;
     $cordovaInAppBrowser.open(link);
  	 }
  	 if(choice=="waze"){
      var link = ""+"waze://?ll="+bizLoc.lat+","+bizLoc.long+"&navigate=yes";
      //window.location = link;
      $cordovaInAppBrowser.open(link);
  	 }
  } 
});

OBizR.controller('bizCtrlMapDirectionsStartPoint', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
  });
  $scope.getMyCurrentLocation = function () {
    $rootScope.startpoint.myLocation.lat  = $localStorage.currentLocation.lat;
    $rootScope.startpoint.myLocation.long =$localStorage.currentLocation.lat;
    delete $rootScope.startpoint.customLocation;
  }
  $scope.directionStartPointLocation = function () {
    $state.go('app.businessDirectionsMapStartPointLocation',{bid:$stateParams.bid});
  }
});

OBizR.controller('bizCtrlMapDirectionsStartPointLocation', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.startpoint.customLocation = {};
    $rootScope.startpoint.customLocation.country = 'Sierra Leone';
  });

  $scope.setStartPointLocation = function () {
    if($rootScope.startpoint.customLocation.street == undefined || $rootScope.startpoint.customLocation.street == ''){
      return;
    }
    if($rootScope.startpoint.customLocation.city == undefined || $rootScope.startpoint.customLocation.city == ''){
      return;
    }
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    var commaSeparateVal = $rootScope.startpoint.customLocation.street+","+$rootScope.startpoint.customLocation.city+","+$rootScope.startpoint.customLocation.country;
      var request = {
        address: commaSeparateVal
      };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, function(data, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $rootScope.$broadcast('loading:hide');
        if (data[0] != null) {
          $scope.$apply(function() {
           $rootScope.startpoint.customLocation.lat = data[0].geometry.location.lat();
            $rootScope.startpoint.customLocation.long = data[0].geometry.location.lng();
            $rootScope.startpoint.customLocation.address = data[0].formatted_address;
            delete $rootScope.startpoint.myLocation;
            $state.go('app.businessDirectionsMapOptions',{bid:$stateParams.bid});
          });
        } else {
          $rootScope.$broadcast('loading:hide');
          $rootScope.serverErrors.push('Unable to set loacation try after sometime.');
        }
      }
    });
  }
});

OBizR.controller('bizCtrlMapDirectionsEndPointLocation', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.endpoint.customLocation = {};
    $rootScope.endpoint.customLocation.country = 'Sierra Leone';
  });
  
  $scope.setEndPointLocation = function () {
    if($rootScope.endpoint.customLocation.street == undefined || $rootScope.endpoint.customLocation.street == ''){
      return;
    }
    if($rootScope.endpoint.customLocation.city == undefined || $rootScope.endpoint.customLocation.city == ''){
      return;
    }
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    var commaSeparateVal = $rootScope.endpoint.customLocation.street+","+$rootScope.endpoint.customLocation.city+","+$rootScope.endpoint.customLocation.country;
      var request = {
        address: commaSeparateVal
      };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, function(data, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $rootScope.$broadcast('loading:hide');
        if (data[0] != null) {
          $scope.$apply(function() {
           $rootScope.endpoint.customLocation.lat = data[0].geometry.location.lat();
            $rootScope.endpoint.customLocation.long = data[0].geometry.location.lng();
            $rootScope.endpoint.customLocation.address = data[0].formatted_address;
            delete $rootScope.endpoint.bizLocation;
            $state.go('app.businessDirectionsMapOptions',{bid:$stateParams.bid});
          });
        } else {
          $rootScope.$broadcast('loading:hide');
          $rootScope.serverErrors.push('Unable to set loacation try after sometime.');
        }
      }
    });
  }
});

OBizR.controller('bizCtrlMapDirectionsEndPoint', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
  });
  $scope.setBizEndPointLocation = function () {
    $rootScope.endpoint.bizLocation.lat = $rootScope.businessesDetails.lat;
    $rootScope.endpoint.bizLocation.long = $rootScope.businessesDetails.long;
    delete $rootScope.endpoint.customLocation;
  }
  $scope.directionEndPointLocation = function () {
    $state.go('app.businessDirectionsMapEndPointLocation',{bid:$stateParams.bid});
  }
});

OBizR.controller('homeCtrl', function($scope,$state,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService) {
  
  $scope.$on("$ionicView.enter", function(event, data){

  $ionicHistory.clearHistory(); //hide the back button.
    if(!$localStorage.biz){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.getBusinesses(false).then(function (biz) {
        $localStorage.biz = biz.nodes;
        $rootScope.displayBusinesses = $localStorage.biz;
      }).finally(function () { $rootScope.$broadcast('loading:hide'); });
    }
    $scope.initializeData();
  });
  $scope.initializeData = function () {
    if($scope.more){
      return;
    }
    $scope.more = 20;
    $scope.moreDataCanBeLoaded = true;
    if($localStorage.biz){
      $rootScope.displayBusinesses = $localStorage.biz;
    }
  }
  $scope.loadMore = function () {

    if($scope.more >= $rootScope.displayBusinesses.length){
      $scope.moreDataCanBeLoaded = false;
    }else{
      $scope.more += 20;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  }
  $scope.doRefresh = function() {
    businessesService.getBusinesses(true).then(function (biz) {
       $localStorage.biz = biz.nodes;
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };

  $scope.getTimeFormat = function (argument) {
    var val = argument.split('-');
    return val[1]+'-'+val[2];
  }
  $scope.getStatus = function (argument) {
    var val = argument.split('-');
    //var status = val[0].split(' ');
    return val[0];
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

OBizR.controller('SplashCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
  $scope.signinClick = function () {
    $state.go('login');
  }
  $scope.signupClick = function () {
    $state.go('signup');
  }
  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }
});

OBizR.controller('DashCtrl', function($scope,$state,$ionicHistory,$rootScope,$localStorage,ProfileService) {
  //$scope.currentUser = profile;
  $scope.$on("$ionicView.enter", function(event, data){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      $ionicHistory.clearHistory(); //hide the back button.
      ProfileService.getProfile()
        .then(function (profile) {
          $rootScope.currentUser = profile;
          console.log($rootScope.currentUser);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
  });
});

OBizR.controller('AccountCtrl', function($scope,AuthenticationService,$localStorage,$ionicHistory,$stateParams,$state,$rootScope,myAccountService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  
  $scope.myFriends = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyFriends($rootScope.currentUser.uid).then(function (data) {
      $rootScope.friends = data.relationships;
      console.log(data.relationships);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  } 
  $scope.myFollowers = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyFollowers($rootScope.currentUser.uid).then(function (data) {
      $rootScope.followers = data.relationships;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.myFollowings = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyFollowings($rootScope.currentUser.uid).then(function (data) {
      $rootScope.followings = data.relationships;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.myMessages = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyMessages($rootScope.currentUser.uid).then(function (data) {
      $rootScope.messages = data;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.myBookmarks = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyBookmarks().then(function (data) {
      $rootScope.bookmarks = data.nodes;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.showMyDetails = function (fid) {
    console.log();
  }
  $scope.showProfile = function () {
    $state.go('app.viewProfile');
  }

  $scope.doLogout = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    AuthenticationService.logout().then(function (data) {
      delete $localStorage.isLogedin;
      delete $localStorage.currentUser;
      //$localStorage.$reset();
      $state.go('login', {}, {reload: true});
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    },function (error) {
      $state.go('login', {}, {reload: true});
      //$localStorage.$reset();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    }).finally(function () {$rootScope.$broadcast('loading:hide');});
  }
});

OBizR.controller('reviewerProfileCtrl', function($scope,$state,$stateParams,businessesService,$rootScope,$localStorage,ProfileService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.reviewerProfile = {};
    if($stateParams.uid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.getReviewerProfile($stateParams.uid)
        .then(function (data) {
          $rootScope.reviewerProfile = data;
          console.log($rootScope.reviewerProfile);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
});

OBizR.controller('ProfileCtrl', function($scope,$rootScope,ProfileService,$ionicHistory,$localStorage,$state,AuthenticationServiceConstant, AuthenticationService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.profileUpdate = {};

  $rootScope.$on('profile:changed', function(e,data) {
    ProfileService.getUpdatedProfile().then(function (updateProfile) {
            $rootScope.profile = updateProfile;
            $rootScope.currentUser = updateProfile;
    }).finally(function () {
       $rootScope.$broadcast('loading:hide');
    });
  });

  $scope.$on("$ionicView.enter", function(event, data){
     ProfileService.getProfile().then(function (profile) {
          $rootScope.profile = profile;
          $scope.profileUpdate = {"uid": profile.uid};
          if(!angular.isArray(profile.field_user_nick_name)){
            $scope.profileUpdate.field_user_nick_name = {"und":[{"value":profile.field_user_nick_name.und[0].value}]};
          }
          if(angular.isArray(profile.field_user_nick_name)){
            $scope.profileUpdate.field_user_nick_name = {"und":[{"value":''}]};
          }
          if(!angular.isArray(profile.field_mobile_user_telephone)){
            $scope.profileUpdate.field_mobile_user_telephone = {"und":[{"value": profile.field_mobile_user_telephone.und[0].value}]};
          }
          if(angular.isArray(profile.field_mobile_user_telephone)){
            $scope.profileUpdate.field_mobile_user_telephone = {"und":[{"value":''}]};
          }
          if(!angular.isArray(profile.field_user_about_me)){
            $scope.profileUpdate.field_user_about_me = {"und":[{"value":profile.field_user_about_me.und[0].value}]};
          }
          if(angular.isArray(profile.field_user_about_me)){
            $scope.profileUpdate.field_user_about_me = {"und":[{"value":""}]};
          }
      }) .finally(function () { });
  });

  $scope.editProfile = function () {
    $state.go('app.updateProfile');
  }

  $scope.saveProfile = function (editProfileForm) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    ProfileService.updateProfile($scope.profileUpdate).then(function (profile) {
        $rootScope.$broadcast('profile:changed');
    });
    $state.go('app.viewProfile');
  }
});

OBizR.controller('ForgetPassCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
  $rootScope.doSignup = function () {
    console.log($state.is);
  }
});

OBizR.controller('LoginCtrl',function($scope,$rootScope,$window,$cordovaGeolocation,DeviceService,AuthService,$ionicPopup,$state,$ionicLoading,$localStorage,AuthenticationService,locationService){
  //data for vm.loginForm
  $scope.user = {};
  $scope.serverErrors = [];
  $scope.doLogin = function(loginForm) {
    $scope.serverErrors = [];

    if (loginForm.$valid) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connecting...</p>"}});
      AuthenticationService.login($scope.user).then(function (data) {
          $localStorage.currentUser = data.data.user;
          $rootScope.currentUser = $localStorage.currentUser;
          $localStorage.isLogedin = true;
          $localStorage.isRegistered = true;
          $rootScope.$broadcast('loading:hide');
          if(!$localStorage.allowedPushNot){
              // var deviceInfo = {};
              // deviceInfo.type = angular.lowercase('Android');
              // deviceInfo.token = 'SESSe9406935ef5cb2ee8ff0cb98f6928491=3EM8Y73swmYlbuNVhJ5OYkQDnRZalh8K9_ZG8tdUJJ8';
              // AuthService.deleteNotificationToken(deviceInfo.token).success(function (res) {
              //  // $localStorage.allowedPushNot = true;
              //  delete $localStorage.allowedPushNot;
              //   console.log(res);
              // }).error(function (error) {
              //   alert(JSON.stringify(error));
              // });

            DeviceService.getDeviceInfo().then(function (deviceInfo) {
              AuthService.registerForPushNotification(deviceInfo).success(function (res) {
                $localStorage.allowedPushNot = true;

              }).error(function (error) {
                alert(JSON.stringify(error));
              });
            },function (error) {
              console.log(error);
            });
          }
          if($localStorage.isLocationAllowed){
            $state.go('app.nearby');
          }else{
            $state.go('location');
          }
          
        },
        //error
        function (errorResult) {
          if (errorResult.status >= 400 && errorResult.status < 500) {
              $scope.serverErrors.push(errorResult.data[0]);
          }
          if(errorResult.status == -1){
              $scope.serverErrors.push("The 'Access-Control-Allow-Origin' header has a value that is not equal to the supplied origin.");
          }
          else {
            $scope.serverErrors.push(errorResult.statusText);
          }

        }).finally(function() {$rootScope.$broadcast('loading:hide'); });
    } else {
        $scope.serverErrors.push('Username and Password is required');
    }
  }
  $scope.ContinueOfflineMode = function () {
    $localStorage.currentLocation = {};
    $state.go('app.nearby');
  }
  $scope.iAgree = function () {
    var confirmPopup = $ionicPopup.confirm({
         template: 'Allow OBizR to access your location while you use the app?',
         cancelText:"Don't Allow",
         okText: 'Allow',
         cancelType:'button button-clear button-positive',
         okType:'button button-clear button-positive'
      });

      confirmPopup.then(function(res) {
        $localStorage.currentLocation = {};
        $rootScope.$broadcast('loading:show');
        if(res) {
          locationService.getCurrentPosition().then(function (position) {

            $localStorage.currentLocation.lat = position.lat;
            $localStorage.currentLocation.long = position.long;
            $localStorage.currentLocation.address = position.address;
            $localStorage.currentLocation.address_components = position.address_components;
            $rootScope.currentLocation = $localStorage.currentLocation;
            $localStorage.isLocationAllowed = true;
            $rootScope.$broadcast('loading:hide');
            $state.go('app.nearby');
          }, function(err) {
            $rootScope.$broadcast('loading:hide');
            $scope.serverErrors.push('unable to get your location, try after sometime.');
            $state.go('location');
          });
        } else {
         $rootScope.$broadcast('loading:hide');
        }
      });
  }

  $scope.userEmail = {};
  $scope.passwordReset = function (passwordResetForm){
    $scope.serverErrors = [];
    console.log(passwordResetForm);
    if(passwordResetForm.$valid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connecting...</p>"}});
      AuthService.requestNewPassword($scope.userEmail).success(function (res) {
        console.log(res[0]);
        if(res[0] == false){
          $scope.serverErrors.push('Temporarily, service is not available.');
        }else{
          $scope.serverErrors.push('Password reset link has been sent to your email address');
        }
      }).error(function (error) {
        $scope.serverErrors.push(error[0]);       
      }).finally(function () {
        $rootScope.$broadcast('loading:hide');
      });
    }else{
      $scope.serverErrors.push('Please provide Username or Email');
    }
    
  }
  $scope.skipAuthorization = function () {
    if($localStorage.isLocationAllowed){
      $state.go('app.nearby');
    }else{
      $state.go('location');
    }
  }
});

OBizR.controller('SocialCtrl',function($rootScope,$http, $location, $cordovaOauth,$scope,$state,$window,$ionicSlideBoxDelegate){
  $scope.data = [];
  $scope.facebookLogin = function() {
    $cordovaOauth.facebook("325681044294287", ["email"]).then(function(result) {
            // results
            console.log(result);
            alert(JSON.stringify(result));
        }, function(error) {
          alert(JSON.stringify(error));
            // error
    });
  }
  $scope.twitterLogin = function() {

    $cordovaOauth.twitter('YzRRNJ4GvW66ukutM57g','XN181qoow0hrqVoEMnDdb1qnGRo0KK1O7cKmyvV2LM').then(function(result) {
        alert(JSON.stringify(result));
    }, function(error) {
      alert(JSON.stringify(error));
    });
  }
  $scope.googleLogin = function() {
    $cordovaOauth.google('763923498182-4rt0vruclqkc0itb6k4tvl0h3ec2bt95.apps.googleusercontent.com',$scope.data).then(function(result) {
      alert(JSON.stringify(result));
    }, function(error) {
      alert(JSON.stringify(error));
    });
  }
});

OBizR.controller('anonymousCtrl',function($rootScope,$http, $location, $cordovaOauth,$scope,$state,$window,$ionicSlideBoxDelegate){
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    
  });

});