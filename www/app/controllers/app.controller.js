OBizR.controller('mainCtrl', function ($scope, $localStorage, $window, $cordovaGeolocation, $rootScope, $state, taxonomyService, $cordovaNetwork) {
  $rootScope.ProvienceItem = []
  $rootScope.DistrictItem = []
  $rootScope.ChiefdomItem = []
  $rootScope.days = [
    {label: 'Mon', value: 'Mon'},
    {label: 'Tue', value: 'Tue'},
    {label: 'Wed', value: 'Wed'},
    {label: 'Thu', value: 'Thu'},
    {label: 'Fri', value: 'Fri'},
    {label: 'Sat', value: 'Sat'},
    {label: 'Sun', value: 'Sun'},
    {label: 'Closed', value: 'closed'}
  ]
  $rootScope.weekdays = [
    {value: 'mon'},
    {value: 'tue'},
    {value: 'wed'},
    {value: 'thu'},
    {value: 'fri'},
    {value: 'sat'},
    {value: 'sun'}
  ]
  $rootScope.hours = [
    {label: '12:00 AM', value: '12:00 AM'},
    {label: '12:30 AM', value: '12:30 AM'},
    {label: '01:00 AM', value: '01:00 AM'},
    {label: '01:30 AM', value: '01:30 AM'},
    {label: '02:00 AM', value: '02:00 AM'},
    {label: '02:30 AM', value: '02:30 AM'},
    {label: '03:00 AM', value: '03:00 AM'},
    {label: '03:30 AM', value: '03:30 AM'},
    {label: '04:00 AM', value: '04:00 AM'},
    {label: '04:30 AM', value: '04:30 AM'},
    {label: '05:00 AM', value: '05:00 AM'},
    {label: '05:30 AM', value: '05:30 AM'},
    {label: '06:00 AM', value: '06:00 AM'},
    {label: '06:30 AM', value: '06:30 AM'},
    {label: '07:00 AM', value: '07:00 AM'},
    {label: '07:30 AM', value: '07:30 AM'},
    {label: '08:00 AM', value: '08:00 AM'},
    {label: '08:30 AM', value: '08:30 AM'},
    {label: '09:00 AM', value: '09:00 AM'},
    {label: '09:30 AM', value: '09:30 AM'},
    {label: '10:00 AM', value: '10:00 AM'},
    {label: '10:30 AM', value: '10:30 AM'},
    {label: '11:00 AM', value: '11:00 AM'},
    {label: '11:30 AM', value: '11:30 AM'},
    {label: '12:00 PM', value: '12:00 PM'},
    {label: '12:30 PM', value: '12:30 AM'},
    {label: '01:00 PM', value: '01:00 PM'},
    {label: '01:30 PM', value: '01:30 PM'},
    {label: '02:00 PM', value: '02:00 PM'},
    {label: '02:30 PM', value: '02:30 PM'},
    {label: '03:00 PM', value: '03:30 PM'},
    {label: '03:30 PM', value: '03:30 PM'},
    {label: '04:00 PM', value: '04:00 PM'},
    {label: '04:30 PM', value: '04:30 PM'},
    {label: '05:00 PM', value: '05:00 PM'},
    {label: '05:30 PM', value: '05:30 PM'},
    {label: '06:00 PM', value: '06:00 PM'},
    {label: '06:30 PM', value: '06:30 PM'},
    {label: '07:00 PM', value: '07:00 PM'},
    {label: '07:30 PM', value: '07:30 PM'},
    {label: '08:00 PM', value: '08:00 PM'},
    {label: '08:30 PM', value: '08:30 PM'},
    {label: '09:00 PM', value: '09:00 PM'},
    {label: '09:30 PM', value: '09:30 PM'},
    {label: '10:00 PM', value: '10:00 PM'},
    {label: '10:30 PM', value: '10:30 PM'},
    {label: '11:00 PM', value: '11:00 PM'},
    {label: '11:30 PM', value: '11:30 PM'},
    {label: 'Closed', value: 'closed'}
  ]

  if ($localStorage.category) {
    $rootScope.category = $localStorage.category
  }else {
    taxonomyService.getCategory().then(function (category) {
      $localStorage.category = category
      $rootScope.category = $localStorage.category
    })
  }
  if ($localStorage.keywords) {
    $rootScope.keywords = $localStorage.keywords
  }else {
    taxonomyService.getKeywords().then(function (keywords) {
      $localStorage.keywords = keywords
      $rootScope.keywords = $localStorage.keywords
    })
  }
  if ($localStorage.provience) {
    $rootScope.ProvienceItem = $localStorage.provience
  }else {
    taxonomyService.getProvience().then(function (provience) {
      $localStorage.provience = provience
      $rootScope.ProvienceItem = $localStorage.provience
    })
  }
  if ($localStorage.currentUser) {
    $rootScope.currentUser = $localStorage.currentUser
  }
  if (!$localStorage.currentLocation) {
    $localStorage.currentLocation = {}
  }else {
    $rootScope.currentLocation = $localStorage.currentLocation
  }
})

OBizR.controller('reviewDetailsCtrl', function ($scope, $state, $ionicHistory, $rootScope, $stateParams, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    $rootScope.reviewsDetails = {}
    if ($stateParams.rid) {
      console.log('fetching review details ....')
      businessesService.getBusinessesReviewById($stateParams.rid)
        .then(function (bizReviewDetail) {
          console.log(bizReviewDetail)
          $rootScope.reviewsDetails = bizReviewDetail
        }).finally(function () {$rootScope.$broadcast('loading:hide');})
    }
  })

  $scope.reviewerDetails = function (rid) {
    $state.go('app.reviewDetails', {cid: rid})
  }
  $scope.reviewerProfile = function (uid) {
    $state.go('app.reviewerProfile', {uid: uid})
  }
})

OBizR.controller('writeReviewCtrl', function ($scope, $state, CameraService, $ionicHistory, $rootScope, $stateParams, $localStorage, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })

  // set the rate and max variables
  $scope.rating = {}
  $scope.rating.rate = 0
  $scope.rating.max = 5

  $scope.writeReviewData = {
    // subject:'',
    // comment_body:{und:[{value:''}]},
    nid: parseInt($stateParams.bid),
  // uid:1,
  // field_ltc_biz_photos:{und:[{rating:$scope.rating,target:null}]}
  }

  $scope.serverErrors = []
  $scope.saveWriteReview = function () {
    if ($scope.rating.rate > 0) {
      var percentRating = $scope.rating.rate * 20
    }
    $scope.writeReviewData.field_ltc_biz_rating = {und: [{rating: percentRating,target: null}]}
    $scope.serverErrors = []
    if ($scope.writeReviewData.subject == undefined) {
      $scope.serverErrors.push('subject is required')
    }
    if ($scope.writeReviewData.comment_body == undefined || $scope.writeReviewData.comment_body.und[0].value == '') {
      $scope.serverErrors.push('review is required')
    }else {
      console.log($scope.writeReviewData)
      $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
      businessesService.postReviews($scope.writeReviewData).then(function (data) {
        $scope.writeReviewData = {}
        $state.go('app.businessDetails', {bid: $stateParams.bid})
      }, function (errorResult) {
        if (errorResult.status >= 400 && errorResult.status < 500) {
          $scope.serverErrors.push(errorResult.data[0])
        }else {
          $scope.serverErrors.push(errorResult.statusText)
        }
      }).finally(function () {
        $rootScope.$broadcast('loading:hide')
      })
    }
  }

  $scope.takePicture = function () {
    $state.go('app.camSource', {bid: $stateParams.bid})
  }
  $scope.useCamera = function () {
    var options = {
      destinationType: Camera.DestinationType.DATA_URL, // Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      quality: 80,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    // correctOrientation:true
    }

    CameraService.getPicture(options).then(function (imageData) {
      $rootScope.pictureURL = imageData
      $ionicHistory.goBack()
    }, function (err) {
      alert(JSON.stingify(error))
    })
  // $cordovaCamera.cleanup().then() // only for FILE_URI
  }
  $scope.useGallery = function () {
    var options = {
      destinationType: Camera.DestinationType.DATA_URL, // Camera.DestinationType.FILE_URI,
      sourceType: 0,
      quality: 80,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    // correctOrientation:true
    }

    CameraService.getPicture(options).then(function (imageData) {
      $rootScope.pictureURL = imageData
      $ionicHistory.goBack()
    }, function (err) {
      alert(JSON.stingify(error))
    })
  // $cordovaCamera.cleanup().then() // only for FILE_URI
  }
})

OBizR.controller('bizCtrl', function ($scope, $state, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
  })
  $scope.$on('$ionicView.enter', function (event, data) {
    $rootScope.businessesReview = []
    $rootScope.businessesDetails = null

    if ($stateParams.bid) {
      businessesService.searchedBusinessDetails($stateParams.bid).then(function (biz) {
        $rootScope.businessesDetails = biz.nodes[0].node
        if ($rootScope.businessesDetails.geocode_lat) {
          $rootScope.businessesDetails.lat = parseFloat($rootScope.businessesDetails.geocode_lat)
          $rootScope.businessesDetails.long = parseFloat($rootScope.businessesDetails.geocode_long)
        }else {
          $rootScope.businessesDetails.lat = 8.465257
          $rootScope.businessesDetails.long = -13.232233
        }
        var bizDetail = {}
        bizDetail.lat = $rootScope.businessesDetails.lat
        bizDetail.long = $rootScope.businessesDetails.long
        bizDetail.title = $rootScope.businessesDetails.title

        businessesService.getBusinessesReview($stateParams.bid).then(function (reviews) {
          $rootScope.businessesReview = reviews
          $scope.getBusinessesMap(bizDetail)
        })
      }).finally(function () { $rootScope.$broadcast('loading:hide');})
    }
  })

  // /////////////////// Show map on business detail page/////////////////////
  $scope.getBusinessesMap = function (bizDetail) {
    var bizLatLng = new google.maps.LatLng(bizDetail.lat, bizDetail.long)
    var mapOptions = {
      zoom: 15,
      center: bizLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(bizDetail.lat, bizDetail.long),
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      title: bizDetail.title,
      icon: 'assets/img/map-marker.png'
    })

    google.maps.event.addListener(marker, 'click', function () {
      $state.go('app.businessDetailsMap', {bid: $stateParams.bid})
    })
  }

  $scope.showMoreDetails = false
  $scope.showMoreBizDetail = function () {
    return $scope.showMoreDetails = !$scope.showMoreDetails
  }
  $scope.writeReviewClick = function () {
    $state.go('app.writeReview', {bid: $stateParams.bid})
  }
  $scope.reviewerDetails = function (rid) {
    $state.go('app.reviewDetails', {rid: rid})
  }
  $scope.reviewerProfile = function (uid) {
    $state.go('app.reviewerProfile', {uid: uid})
  }
  $scope.editBusinessClick = function () {
    $rootScope.editBizData = ''
    $state.go('app.editBusiness', {bid: $stateParams.bid})
  }
  $scope.businessDetailsMapClick = function () {
    $state.go('app.businessDetailsMap', {bid: $stateParams.bid})
  }
  $scope.showDirectionMapClick = function () {
    $state.go('app.businessDirectionsMapOptions', {bid: $stateParams.bid})
  }
  $scope.claimBusinessClick = function () {
    $state.go('app.claimBiz', {bid: $stateParams.bid})
  }
})

OBizR.controller('bizCtrlMap', function ($scope, $state, $filter, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {
    $scope.getBusinessesMap($rootScope.businessesDetails)
  })

  // /////////////////// Show map on business detail page/////////////////////
  $scope.getBusinessesMap = function (bizDetail) {
    console.log(bizDetail)
    var bizLatLng = new google.maps.LatLng(bizDetail.lat, bizDetail.long)
    var mapOptions = {
      zoom: 15,
      center: bizLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)

    var infoWindow = new google.maps.InfoWindow()
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(bizDetail.lat, bizDetail.long),
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      title: bizDetail.title,
      icon: 'assets/img/map-marker.png'
    })

    // Creating marker content
    var createMarkerContent = '<em>' + marker.title + '</em>'
    createMarkerContent += '<div class="biz-ratings ' + $filter('ratingClass')(bizDetail.ratings) + '">'
    createMarkerContent += '<div class="star-rating"><span style="width:' + bizDetail.ratings + '"></span></div>'
    createMarkerContent += bizDetail.reviewcount + ' Reviews</div>'
    createMarkerContent += '<p>' + bizDetail.street + ',' + bizDetail.city + '</p>'
    createMarkerContent += '<p>' + bizDetail.distance + ' mi' + '</p>'

    marker.content = createMarkerContent
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(marker.content)
      infoWindow.open($scope.map, marker)
    })
  }

  $scope.reviewerProfile = function (uid) {
    $state.go('app.reviewerProfile', {uid: uid})
  }

  $scope.showDirectionMapClick = function () {
    $state.go('app.businessDirectionsMapOptions', {bid: $stateParams.bid})
  }
})

OBizR.controller('bizCtrlMapDirectionsOptions', function ($scope, $state, $cordovaInAppBrowser, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {
    $scope.initializeData()
  })
  $scope.initializeData = function () {
    if ($rootScope.choice == undefined) {
      $rootScope.choice = 'google'
      $rootScope.startpoint = {}
      $rootScope.startpoint.myLocation = {}
      $rootScope.startpoint.myLocation.lat = $localStorage.currentLocation.lat
      $rootScope.startpoint.myLocation.long = $localStorage.currentLocation.lat
      // $rootScope.startpoint.customLocation = {}
      $rootScope.endpoint = {}
      $rootScope.endpoint.bizLocation = {}
      $rootScope.endpoint.bizLocation.lat = $rootScope.businessesDetails.lat
      $rootScope.endpoint.bizLocation.long = $rootScope.businessesDetails.long
    // $rootScope.endpoint.customLocation = {}
    }
  }
  $scope.directionStartPoint = function () {
    $state.go('app.businessDirectionsMapStartPoint', {bid: $stateParams.bid})
  }
  $scope.directionEndPoint = function () {
    $state.go('app.businessDirectionsMapEndPoint', {bid: $stateParams.bid})
  }

  $scope.directionMap = function (choice) {
    var mayLoc = ''
    var bizLoc = ''
    if ($rootScope.startpoint.myLocation) {
      mayLoc = $rootScope.startpoint.myLocation
    }else {
      mayLoc = $rootScope.startpoint.customLocation
    }
    if ($rootScope.endpoint.bizLocation) {
      bizLoc = $rootScope.endpoint.bizLocation
    }else {
      bizLoc = $rootScope.endpoint.customLocation
    }

    if (choice == 'google') {
      // $state.go('app.routeMap')
      var link = '' + 'http://maps.google.com/maps?saddr=' + mayLoc.lat + ',' + mayLoc.long + ' &daddr=' + bizLoc.lat + ',' + bizLoc.long
      // window.location = link
      $cordovaInAppBrowser.open(link, '_system')
    }
    if (choice == 'apple') {
      var link = '' + 'http://maps.apple.com/?ll=' + bizLoc.lat + ',' + bizLoc.long + '&dirflg=d&t=h'
      // window.location = link
      $cordovaInAppBrowser.open(link)
    }
    if (choice == 'waze') {
      var link = '' + 'waze://?ll=' + bizLoc.lat + ',' + bizLoc.long + '&navigate=yes'
      // window.location = link
      $cordovaInAppBrowser.open(link)
    }
  }
})

OBizR.controller('bizCtrlMapDirectionsStartPoint', function ($scope, $state, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {})
  $scope.getMyCurrentLocation = function () {
    $rootScope.startpoint.myLocation.lat = $localStorage.currentLocation.lat
    $rootScope.startpoint.myLocation.long = $localStorage.currentLocation.lat
    delete $rootScope.startpoint.customLocation
  }
  $scope.directionStartPointLocation = function () {
    $state.go('app.businessDirectionsMapStartPointLocation', {bid: $stateParams.bid})
  }
})

OBizR.controller('bizCtrlMapDirectionsStartPointLocation', function ($scope, $state, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {
    $rootScope.startpoint.customLocation = {}
    $rootScope.startpoint.customLocation.country = 'Sierra Leone'
  })

  $scope.setStartPointLocation = function () {
    if ($rootScope.startpoint.customLocation.street == undefined || $rootScope.startpoint.customLocation.street == '') {
      return
    }
    if ($rootScope.startpoint.customLocation.city == undefined || $rootScope.startpoint.customLocation.city == '') {
      return
    }
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    var commaSeparateVal = $rootScope.startpoint.customLocation.street + ',' + $rootScope.startpoint.customLocation.city + ',' + $rootScope.startpoint.customLocation.country
    var request = {
      address: commaSeparateVal
    }
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode(request, function (data, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $rootScope.$broadcast('loading:hide')
        if (data[0] != null) {
          $scope.$apply(function () {
            $rootScope.startpoint.customLocation.lat = data[0].geometry.location.lat()
            $rootScope.startpoint.customLocation.long = data[0].geometry.location.lng()
            $rootScope.startpoint.customLocation.address = data[0].formatted_address
            delete $rootScope.startpoint.myLocation
            $state.go('app.businessDirectionsMapOptions', {bid: $stateParams.bid})
          })
        } else {
          $rootScope.$broadcast('loading:hide')
          $rootScope.serverErrors.push('Unable to set loacation try after sometime.')
        }
      }
    })
  }
})

OBizR.controller('bizCtrlMapDirectionsEndPointLocation', function ($scope, $state, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {
    $rootScope.endpoint.customLocation = {}
    $rootScope.endpoint.customLocation.country = 'Sierra Leone'
  })

  $scope.setEndPointLocation = function () {
    if ($rootScope.endpoint.customLocation.street == undefined || $rootScope.endpoint.customLocation.street == '') {
      return
    }
    if ($rootScope.endpoint.customLocation.city == undefined || $rootScope.endpoint.customLocation.city == '') {
      return
    }
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    var commaSeparateVal = $rootScope.endpoint.customLocation.street + ',' + $rootScope.endpoint.customLocation.city + ',' + $rootScope.endpoint.customLocation.country
    var request = {
      address: commaSeparateVal
    }
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode(request, function (data, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $rootScope.$broadcast('loading:hide')
        if (data[0] != null) {
          $scope.$apply(function () {
            $rootScope.endpoint.customLocation.lat = data[0].geometry.location.lat()
            $rootScope.endpoint.customLocation.long = data[0].geometry.location.lng()
            $rootScope.endpoint.customLocation.address = data[0].formatted_address
            delete $rootScope.endpoint.bizLocation
            $state.go('app.businessDirectionsMapOptions', {bid: $stateParams.bid})
          })
        } else {
          $rootScope.$broadcast('loading:hide')
          $rootScope.serverErrors.push('Unable to set loacation try after sometime.')
        }
      }
    })
  }
})

OBizR.controller('bizCtrlMapDirectionsEndPoint', function ($scope, $state, $ionicHistory, $rootScope, $stateParams, $localStorage, $cordovaGeolocation, ProfileService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {})
  $scope.setBizEndPointLocation = function () {
    $rootScope.endpoint.bizLocation.lat = $rootScope.businessesDetails.lat
    $rootScope.endpoint.bizLocation.long = $rootScope.businessesDetails.long
    delete $rootScope.endpoint.customLocation
  }
  $scope.directionEndPointLocation = function () {
    $state.go('app.businessDirectionsMapEndPointLocation', {bid: $stateParams.bid})
  }
})

OBizR.controller('homeCtrl', function ($scope, $state, $ionicHistory, $cordovaGeolocation, $rootScope, $localStorage, ProfileService, businessesService) {
  $scope.$on('$ionicView.enter', function (event, data) {
    $ionicHistory.clearHistory(); // hide the back button.
    if (!$localStorage.biz) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
      businessesService.getBusinesses(true).then(function (biz) {
        $localStorage.biz = biz.nodes
        $rootScope.displayBusinesses = $localStorage.biz
      }).finally(function () { $rootScope.$broadcast('loading:hide'); })
    }
    $scope.initializeData()
  })
  $scope.initializeData = function () {
    if ($scope.more) {
      return
    }
    $scope.more = 20
    $scope.moreDataCanBeLoaded = true
    if ($localStorage.biz) {
      $rootScope.displayBusinesses = $localStorage.biz
    }
  }
  $scope.loadMore = function () {
    if ($scope.more >= $rootScope.displayBusinesses.length) {
      $scope.moreDataCanBeLoaded = false
    }else {
      $scope.more += 20
      $scope.$broadcast('scroll.infiniteScrollComplete')
    }
  }
  $scope.doRefresh = function () {
    businessesService.getBusinesses(true).then(function (biz) {
      console.log('businesses');console.log(biz)
      $localStorage.biz = biz.nodes
    }).finally(function () {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete')
    })
  }

  $scope.sort = function (biz) {
    var sort_param = ''
    if ($rootScope.filter) {
      if ($rootScope.filter.distance) {
        if ($rootScope.distance === 'DESC') {
          return '-biz.node.distance'
        }
        return 'biz.node.distance'
      }
    }
    return 'biz.node.distance'
  }

  $scope.getTimeFormat = function (argument) {
    var val = argument.split('-')
    return val[1] + '-' + val[2]
  }
  $scope.getStatus = function (argument) {
    var val = argument.split('-')
    // var status = val[0].split(' ')
    return val[0]
  }
  $scope.businessDetails = function (bid) {
    $state.go('app.businessDetails', {bid: bid})
  }
  $scope.getFilterView = function () {
    $state.go('app.filter')
  }
  $scope.getMapView = function () {
    $state.go('app.mapView')
  }
})

OBizR.controller('SplashCtrl', function ($rootScope, $scope, $state, $window, $ionicSlideBoxDelegate) {
  $scope.signinClick = function () {
    $state.go('login')
  }
  $scope.signupClick = function () {
    $state.go('signup')
  }
  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next()
  }
})

OBizR.controller('DashCtrl', function ($scope, $state, $ionicHistory, $rootScope, $localStorage, ProfileService) {
  // $scope.currentUser = profile
  $scope.$on('$ionicView.enter', function (event, data) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    $ionicHistory.clearHistory(); // hide the back button.
    ProfileService.getProfile()
      .then(function (profile) {
        $rootScope.currentUser = profile
        console.log($rootScope.currentUser)
      }).finally(function () { $rootScope.$broadcast('loading:hide');})
  })
})

OBizR.controller('AccountCtrl', function ($scope, AuthenticationService, $localStorage, $ionicHistory, $stateParams, $state, $rootScope, myAccountService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })

  $scope.myFriends = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    myAccountService.getMyFriends($rootScope.currentUser.uid).then(function (data) {
      $rootScope.friends = data.relationships
      console.log(data.relationships)
    }).finally(function () { $rootScope.$broadcast('loading:hide');})
  }
  $scope.myFollowers = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    myAccountService.getMyFollowers($rootScope.currentUser.uid).then(function (data) {
      $rootScope.followers = data.relationships
      console.log(data)
    }).finally(function () { $rootScope.$broadcast('loading:hide');})
  }
  $scope.myFollowings = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    myAccountService.getMyFollowings($rootScope.currentUser.uid).then(function (data) {
      $rootScope.followings = data.relationships
      console.log(data)
    }).finally(function () { $rootScope.$broadcast('loading:hide');})
  }
  $scope.myMessages = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    myAccountService.getMyMessages($rootScope.currentUser.uid).then(function (data) {
      $rootScope.messages = data
      console.log(data)
    }).finally(function () { $rootScope.$broadcast('loading:hide');})
  }
  $scope.myBookmarks = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    myAccountService.getMyBookmarks().then(function (data) {
      $rootScope.bookmarks = data.nodes
      console.log(data)
    }).finally(function () { $rootScope.$broadcast('loading:hide');})
  }
  $scope.myReviews = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    myAccountService.getMyReviews($rootScope.currentUser.uid).then(function (data) {
      $rootScope.myReviews = data.nodes
      console.log(data)
    }).finally(function () { $rootScope.$broadcast('loading:hide');})
  }

  $scope.myBusinesses = function () {
    console.log('enetred my business view ...');
    $rootScope.$broadcast('loading:show', { loading_settings: { template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>' } })

    myAccountService.getMyBusinesses($rootScope.currentUser.uid).then(function (result) {
      console.log(result);

      result = { "nodes": [{ "node": { "nid": "40181", "uid": "16598", "title": "Florence Restaurant", "ratings": "5/5", "Postal Address - Thoroughfare (i.e. Street address)": "2 Michael Street,", "city": "Freetown", "email": "info@ntb.gov.sl", "phone": "+23276642003", "website": "http://www.ntb.gov.sl", "chiefdom": "Freetown", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "", "geocode_long": "", "hours": "Monday - Saturday: 8:00-23:00Sunday: Closed", "reviewcount": "0", "description": "Italian & International menu, sea view & Sea\r\nfood" } }, { "node": { "nid": "9051", "uid": "16598", "title": "J.T.Reffal Memorial Pre-School - 109248", "ratings": "5/5", "Postal Address - Thoroughfare (i.e. Street address)": "J.T.Reffal Memorial Pre-School,Back Of Fire Force", "city": "Freetown", "email": "info@education.gov.sl", "phone": "+232 76919472", "website": "http://education.gov.sl", "chiefdom": "Freetown", "category": "School", "keyword": "Preschools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.465676500000", "geocode_long": "-13.231722500000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 1940 and located at J.T.Reffal  Memorial  Pre-School,Back Of Fire Force and can be contacted using 76919472" } }, { "node": { "nid": "41486", "uid": "16598", "title": "Club Where Else", "ratings": "5/5", "Postal Address - Thoroughfare (i.e. Street address)": "C/o Bintumani Hotel Aberdeen Hills,", "city": "Freetown", "email": "", "phone": "", "website": "", "chiefdom": "Freetown", "category": "Restaurant", "keyword": "Senegalese", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.491901700000", "geocode_long": "-13.287993600000", "hours": "", "reviewcount": "0", "description": "Fitness/gym, AC,  Multiple    VIP  Room,    Large  Car\r\nPark, Satellite TV, Bars, Snookers, dining rooms" } }, { "node": { "nid": "30426", "uid": "16598", "title": "Saint Augustine Agricultural Secondary School - 103792", "ratings": "3/5", "Postal Address - Thoroughfare (i.e. Street address)": "St. Augustine Agricultural Senior Secondary School Tintafor", "city": "Tintafor", "email": "info@education.gov.sl", "phone": "", "website": "http://education.gov.sl", "chiefdom": "Mahera", "category": "School", "keyword": "Senior Secondary Schools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.628644700000", "geocode_long": "-13.215855700000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 1984 and located at St. Augustine Agricultural Senior  Secondary School Tintafor, Tintafor and can be contacted using " } }, { "node": { "nid": "41661", "uid": "16598", "title": "M.J Motel-1", "ratings": "2/5", "Postal Address - Thoroughfare (i.e. Street address)": "14 Azzolini High Way", "city": "Makeni", "email": "info@ntb.gov.sl", "phone": "232713945", "website": "http://www.ntb.gov.sl", "chiefdom": "Masongbon", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.872053000000", "geocode_long": "-12.037142000000", "hours": "Monday: 8:00-23:30Tuesday: 8:00-23:00Wednesday: 8:00-23:15Thursday: 8:00-23:30Friday: 8:00-22:15Saturday: 8:00-23:15Sunday: 8:00-23:30", "reviewcount": "0", "description": "Tel, Satellite TV, AC, Fans, Rest & Bar, Car park,\r\nCold & Hot Water Facility" } }, { "node": { "nid": "19416", "uid": "16598", "title": "Lumley High School - 109882", "ratings": "2/5", "Postal Address - Thoroughfare (i.e. Street address)": "6 Babadorie Lane, Grassfield, Lumley.", "city": "Freetown", "email": "info@education.gov.sl", "phone": "+232 76523484", "website": "http://education.gov.sl", "chiefdom": "Freetown", "category": "School", "keyword": "Junior Secondary Schools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.465676500000", "geocode_long": "-13.231722500000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 2002 and located at 6 Babadorie Lane, Grassfield, Lumley., Freetown and can be contacted using 76523484" } }, { "node": { "nid": "31156", "uid": "16598", "title": "Saint Monica Pre School - 106539", "ratings": "2/5", "Postal Address - Thoroughfare (i.e. Street address)": "Bafla Waterloo", "city": "Benguema", "email": "info@education.gov.sl", "phone": "+232 77 801224", "website": "http://education.gov.sl", "chiefdom": "Benguema", "category": "School", "keyword": "Preschools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.326609500000", "geocode_long": "-13.064502100000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 2008 and located at  Bafla Waterloo, Benguema and can be contacted using 77801224" } }, { "node": { "nid": "5536", "uid": "16598", "title": "Every Nation Academy Junior Secondary School - 109946", "ratings": "1/5", "Postal Address - Thoroughfare (i.e. Street address)": "11B Williams Street, Looking Town, Kissy.", "city": "Freetown", "email": "info@education.gov.sl", "phone": "+232 76509571", "website": "http://education.gov.sl", "chiefdom": "Freetown", "category": "School", "keyword": "Junior Secondary Schools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.471227900000", "geocode_long": "-13.187012200000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 2009 and located at 11B Williams Street, Looking Town, Kissy., Freetown and can be contacted using 76509571" } }, { "node": { "nid": "41531", "uid": "16598", "title": "Companero Night Club", "ratings": "1/5", "Postal Address - Thoroughfare (i.e. Street address)": "New Site, Rokel Village York Rural District,", "city": "Freetown", "email": "", "phone": "", "website": "", "chiefdom": "Freetown", "category": "Travel and Tourism", "keyword": "Senegalese", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.311498300000", "geocode_long": "-13.035694000000", "hours": "", "reviewcount": "0", "description": "Tel,  Fans, Intertlocal Menu,  band show Satellite&\r\nSatellite TV" } }, { "node": { "nid": "41121", "uid": "16598", "title": "Levuma Beach G/H", "ratings": "2/5", "Postal Address - Thoroughfare (i.e. Street address)": "Levuma via Russel", "city": "Freetown", "email": "info@ntb.gov.sl", "phone": "+ 232 76 605894", "website": "http://www.ntb.gov.sl", "chiefdom": "Freetown", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "", "geocode_long": "", "hours": "Monday - Thursday: 9:00-17:00Friday - Sunday: 8:00-23:00", "reviewcount": "2", "description": "Tel, Fans, Satellite TV, Agro-tourism farm" } }, { "node": { "nid": "40361", "uid": "16598", "title": "Bintu's Bar & Restaurant 1", "ratings": "3/5", "Postal Address - Thoroughfare (i.e. Street address)": "5 Howe Street", "city": "Freetown", "email": "info@ntb.gov.sl", "phone": "+232 76 601722", "website": "http://www.ntb.gov.sl", "chiefdom": "Freetown", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "", "geocode_long": "", "hours": "Monday - Thursday: 9:00-17:00Friday - Saturday: 9:00-23:00Sunday: 9:00-17:00", "reviewcount": "1", "description": "African &  Internal menu, shop  Satellite TV,\r\nAC, Tel, Music" } }, { "node": { "nid": "41591", "uid": "16598", "title": "Lungi Airport Hotel", "ratings": "1/5", "Postal Address - Thoroughfare (i.e. Street address)": "Tulun Road, Lungi P.O. Box 54,Lungi", "city": "Lungi", "email": "management.lungihotel@hotmail.com", "phone": "+23277 707777", "website": "http://www.ntb.gov.sl", "chiefdom": "Mahera", "category": "Travel and Tourism", "keyword": "Hotel", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.612562328132", "geocode_long": "-13.204064369202", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "1", "description": "Satellite TV, AC Tel, Swim/pool, Hall, Shops, Rest,\r\nConference         hall,         tennis         curt         etc lungihotel@hotmail.com" } }, { "node": { "nid": "37331", "uid": "16598", "title": "KingHarman Rd Sat. (EPI) Hospital", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "King Harman Road", "city": "Western Area Urban", "email": "changeme@obizr.sl", "phone": "", "website": "", "chiefdom": "Freetown", "category": "Healthcare", "keyword": "Hospitals", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/health-banner.jpg?itok=FSNhPuyG", "alt": "" }, "geocode_lat": "89.999991930698", "geocode_long": "94.921875000000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "1", "description": "KingHarman Rd Sat. (EPI) Hospital is a Hospital in King Harman Road,  Western Urban district " } }, { "node": { "nid": "40651", "uid": "16598", "title": "The Place @ Tokeh Beach Restaurant", "ratings": "4/5", "Postal Address - Thoroughfare (i.e. Street address)": "Tokeh Village", "city": "Freetown", "email": "welcome@stayattheplace.com", "phone": "+ 232 99 604002", "website": "http://www.stayattheplace.com", "chiefdom": "Freetown", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "", "geocode_long": "", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "1", "description": "Enjoy the very best of Sierra Leone at The Place, where our friendly attentive, staff are waiting to welcome you. Whether you are a day visitor, guest or conference delegate, the soft white sand and gentle waves of our beautiful beaches, and the greenery all around us, will relax and inspire you. Our spacious private suites are comfortable and equipped with rain showers, abundant hot water, great AC, and fresh, white cotton sheets on your king size bed." } }, { "node": { "nid": "40806", "uid": "16598", "title": "Lac's Villa Guest House", "ratings": "5/5", "Postal Address - Thoroughfare (i.e. Street address)": "3a/9 Cantonment Road, River Side Drive", "city": "Freetown", "email": "lacsvilla@yahoo.com", "phone": "+ 232 88 217981", "website": "http://www.ntb.gov.sl", "chiefdom": "Freetown", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "", "geocode_long": "", "hours": "Monday - Friday: 8:00-23:30Saturday - Sunday: 8:00-23:00", "reviewcount": "1", "description": "Tel,      Fans,      Satellite      TV,      AC,      Internet,\r\nlacsvilla@yahoo.com" } }, { "node": { "nid": "26701", "uid": "16598", "title": "Roman Catholic Primary - 100889", "ratings": "4/5", "Postal Address - Thoroughfare (i.e. Street address)": "Roman Catholic", "city": "Jomie", "email": "info@education.gov.sl", "phone": "+232 76 443340", "website": "http://education.gov.sl", "chiefdom": "", "category": "School", "keyword": "Primary Schools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "-26.030952000000", "geocode_long": "27.927121000000", "hours": "", "reviewcount": "1", "description": "Founded 1952 and located at Roman Catholic, Jomie, Jomie and can be contacted using 76443340" } }, { "node": { "nid": "43347", "uid": "16598", "title": "Exemplar Enterprise", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "5C George Brook", "city": "Freetown", "email": "info@health.gov.sl", "phone": "23276989520", "website": "http://www.health.gov.sl", "chiefdom": "Freetown", "category": "", "keyword": "Pharmacy", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/health-banner.jpg?itok=FSNhPuyG", "alt": "" }, "geocode_lat": "8.468215100000", "geocode_long": "-13.235502200000", "hours": "Monday - Saturday: 9:00-17:00Sunday: 9:00-16:00", "reviewcount": "1", "description": "Exemplar Enterprise, Drug Store, 5C George Brook" } }, { "node": { "nid": "43298", "uid": "16598", "title": "Albert Enterprise", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "257 Baibureh Road", "city": "Freetown", "email": "info@health.gov.sl", "phone": "23277493834", "website": "http://www.health.gov.sl", "chiefdom": "Freetown", "category": "", "keyword": "Pharmacy", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/health-banner.jpg?itok=FSNhPuyG", "alt": "" }, "geocode_lat": "8.451342800000", "geocode_long": "-13.167788300000", "hours": "Monday - Saturday: 9:00-17:00Sunday: 9:00-16:00", "reviewcount": "1", "description": "Albert Enterprise, Drug Store, 257 Baibureh Road" } }, { "node": { "nid": "43149", "uid": "16598", "title": "Ganpati Bappa Enterprise", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "86 Sanders Street", "city": "Freetown", "email": "info@health.gov.sl", "phone": "23233272787", "website": "http://www.health.gov.sl", "chiefdom": "Freetown", "category": "", "keyword": "Pharmacy", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/health-banner.jpg?itok=FSNhPuyG", "alt": "" }, "geocode_lat": "8.481420600000", "geocode_long": "-13.241159800000", "hours": "Monday - Saturday: 9:00-17:00Sunday: 9:00-16:00", "reviewcount": "1", "description": "Ganpati Bappa Enterprise, Drug Store, 86 Sanders Street" } }, { "node": { "nid": "40601", "uid": "16598", "title": "Reconcile Bar & Grill", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Forest Industry Canteen1 Blama Road", "city": "Kenema", "email": "info@ntb.gov.sl", "phone": "+ 23276660935", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Restaurant", "keyword": "Hotel", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Saturday: 8:30-24:00Sunday: Closed", "reviewcount": "0", "description": "African & International menu, Satellite TV, AC" } }, { "node": { "nid": "40606", "uid": "16598", "title": "Capitol Snacks/ Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "51 Hanga Road", "city": "Kenema", "email": "info@ntb.gov.sl", "phone": "+ 23277618888", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Restaurant", "keyword": "Hotel", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Saturday: 8:30-24:00Sunday: Closed", "reviewcount": "0", "description": "African & International menu Satellite TV" } }, { "node": { "nid": "40551", "uid": "16598", "title": "Yean's Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "18 Fenton Road", "city": "Bo", "email": "daudalumeh@yahoo.com", "phone": "+23278594932", "website": "http://www.reviews.com.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.964229100000", "geocode_long": "-11.740666800000", "hours": "Monday - Sunday: 6:00-22:00", "reviewcount": "0", "description": "Tel, TV, Fans, African & Int. Menu\r\ndaudalumeh@yahoo.com" } }, { "node": { "nid": "42356", "uid": "16598", "title": "Capitol Hotel", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "51 Hanga Road", "city": "Kenema", "email": "nourhashim@hotmail.com", "phone": "+23276746457", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Travel and Tourism", "keyword": "Hotel", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel,  Sate-  Rest/Bar  TV,  Fans,  AC,  Shop,\r\nSwim/Pool, Casino,  capitol@capitol.com, nourhashim@hotmail.com" } }, { "node": { "nid": "41631", "uid": "16598", "title": "Capitol Hotel", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "23 Airport Ferry Road", "city": "Lungi", "email": "info@ntb.gov.sl", "phone": "23276102444", "website": "http://www.ntb.gov.sl", "chiefdom": "Mahera", "category": "Travel and Tourism", "keyword": "Senegalese", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.623397310600", "geocode_long": "-13.214312249152", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, AC, Satellite TV Bar, Boutique  Restaurant, &\r\nGift Shop" } }, { "node": { "nid": "40616", "uid": "16598", "title": "Kono Restaurant & Bar", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Main Massingbi Road", "city": "Koidu", "email": "info@ntb.gov.sl", "phone": "+23222272520", "website": "http://www.ntb.gov.sl", "chiefdom": "Sewafe", "category": "Restaurant", "keyword": "Hotel", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.644812500000", "geocode_long": "-10.969396800000", "hours": "Monday - Saturday: 8:00-23:00Sunday: Closed", "reviewcount": "0", "description": "African & International menu" } }, { "node": { "nid": "41236", "uid": "16598", "title": "Oremi Rest Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Siaka Stevens Street", "city": "Freetown", "email": "info@ntb.gov.sl", "phone": "+ 232 76706507", "website": "http://www.ntb.gov.sl", "chiefdom": "Kossoh Town", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "89.223116361718", "geocode_long": "102.656250000000", "hours": "Monday - Thursday: 9:00-17:00Friday - Sunday: 8:00-23:00", "reviewcount": "0", "description": "Tel, Restaurant/Bar Hill view, Sea food, etc" } }, { "node": { "nid": "41941", "uid": "16598", "title": "Nar-Sarah Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "27 Forest Road-Yogomia", "city": "Kabala", "email": "peacemakerkargbo@gmail.com", "phone": "23276605331", "website": "http://www.reviews.com.sl", "chiefdom": "Gbawuria", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "9.584592109214", "geocode_long": "-11.557445526123", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel,       Fans,       Hill/Forest       View       &       Clinic\r\nfacilitypeacemakerkargbo@gmail.com" } }, { "node": { "nid": "42521", "uid": "16598", "title": "O.A.U. VillageGuest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "1, Dama Road", "city": "Kenema", "email": "info@ntb.gov.sl", "phone": "+232 76642876", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Travel and Tourism", "keyword": "Hotel", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Restaurant & Mini Bar Facilities" } }, { "node": { "nid": "6351", "uid": "16598", "title": "Fourah Bay College Junior Secondary - 108869", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Kortright. Mt . Aureol", "city": "Mount Aureol", "email": "info@education.gov.sl", "phone": "+232 76695426", "website": "http://education.gov.sl", "chiefdom": "Freetown", "category": "School", "keyword": "Junior Secondary Schools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.482902200000", "geocode_long": "-13.220087600000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 2010 and located at Kortright. Mt . Aureol, Mount Aureol and can be contacted using 76695426" } }, { "node": { "nid": "6356", "uid": "16598", "title": "Fourah Bay College Pre-Primary - 106475", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Mount Aurel", "city": "Mountain", "email": "info@education.gov.sl", "phone": "+232 76 622802", "website": "http://education.gov.sl", "chiefdom": "Freetown", "category": "School", "keyword": "Preschools", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/education-banner_0.jpg?itok=YaNrJfwI", "alt": "" }, "geocode_lat": "8.465676500000", "geocode_long": "-13.231722500000", "hours": "Monday - Friday: 8:00-17:00Saturday - Sunday: Closed", "reviewcount": "0", "description": "Founded 1961 and located at Mount Aurel, Mountain and can be contacted using 76622802" } }, { "node": { "nid": "40626", "uid": "16598", "title": "Sun Shine Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "12 Gbenseh Gumbu St.", "city": "Koidu", "email": "info@ntb.gov.sl", "phone": "+23277552232", "website": "http://www.ntb.gov.sl", "chiefdom": "Sewafe", "category": "Restaurant", "keyword": "Fast Food", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.644812500000", "geocode_long": "-10.969396800000", "hours": "Monday - Thursday: 8:00-23:00Friday: 8:00-22:00Saturday: 8:00-23:00Sunday: Closed", "reviewcount": "0", "description": "African & International menu, Tel & Fans" } }, { "node": { "nid": "40636", "uid": "16598", "title": "Amuloma Bar & Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Kenema Shopping Plaza", "city": "Kenema", "email": "info@ntb.gov.sl", "phone": "+23278430490", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Thursday: 8:00-23:00Friday: 23:00-23:00Saturday: 8:00-23:00Sunday: Closed", "reviewcount": "0", "description": "Tel, Fans, Satellite TVs African & Internal menu" } }, { "node": { "nid": "40631", "uid": "16598", "title": "After Work Bar & Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Kenema Shopping Plaza", "city": "Kenema", "email": "info@ntb.gov.sl", "phone": "+ 232 76114490", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Restaurant", "keyword": "Sierra Leonean", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Saturday: 8:30-24:00Sunday: Closed", "reviewcount": "0", "description": "African & International Menu, Tel & Fans" } }, { "node": { "nid": "40641", "uid": "16598", "title": "Fat Pee Restaurant/Bar", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "3 Blama Road", "city": "Kenema", "email": "info@ntb.gov.sl", "phone": "+ 232 76 667120", "website": "http://www.ntb.gov.sl", "chiefdom": "Kenema", "category": "Restaurant", "keyword": "Sierra Leonean", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.863214700000", "geocode_long": "-11.195717200000", "hours": "Monday - Saturday: 8:00-24:00Sunday: Closed", "reviewcount": "0", "description": "Tel, Fans, Satellite TVs, African & Sport Centre" } }, { "node": { "nid": "40646", "uid": "16598", "title": "Mother_s Help Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "66 Kainkordu Road", "city": "Koidu", "email": "info@ntb.gov.sl", "phone": "+ 23277852729", "website": "http://www.ntb.gov.sl", "chiefdom": "Sewafe", "category": "Restaurant", "keyword": "Sierra Leonean", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.644812500000", "geocode_long": "-10.969396800000", "hours": "Monday - Saturday: 8:00-24:00Sunday: Closed", "reviewcount": "0", "description": "Tel, Fans, Satellite TVs African & International menu" } }, { "node": { "nid": "40586", "uid": "16598", "title": "Cool Zone Life Top Up Centre Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "17 Dambala Road", "city": "Bo", "email": "info@ntb.gov.sl", "phone": "+232 22 272520", "website": "http://www.ntb.gov.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.972597900000", "geocode_long": "-11.740288800000", "hours": "Monday - Saturday: 9:00-23:00Sunday: 10:00-23:00", "reviewcount": "0", "description": "African menu AC, Fans, Shops" } }, { "node": { "nid": "41911", "uid": "16598", "title": "Tina's Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Barmoi Lumor, Kambia - Highway", "city": "Kambia", "email": "info@ntb.gov.sl", "phone": "23276895576", "website": "http://www.ntb.gov.sl", "chiefdom": "Kambia", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "9.041042471250", "geocode_long": "-12.908935546875", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Mini Bar Facilities ,local goods" } }, { "node": { "nid": "41916", "uid": "16598", "title": "Lakoyema Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "48 Yagala Road, Gbawuria", "city": "Kabala", "email": "laminmansaray2009@yahoo.com", "phone": "23276966285", "website": "http://www.reviews.com.sl", "chiefdom": "Gbawuria", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "9.584147822991", "geocode_long": "-11.558384787033", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Mini Bar Facilities, local goods\r\nlaminmansaray2009@yahoo.com" } }, { "node": { "nid": "41921", "uid": "16598", "title": "Suffi Zain Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "1 Airport Ferry Road, Lungi", "city": "Lungi", "email": "info@ntb.gov.sl", "phone": "23276412811", "website": "http://www.ntb.gov.sl", "chiefdom": "Mahera", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.610801420419", "geocode_long": "-13.196403980255", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Fans, Tel, Carpark TV, African huts, mini Bar" } }, { "node": { "nid": "41926", "uid": "16598", "title": "Gulf Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Azzoloni Highway", "city": "Makeni", "email": "info@ntb.gov.sl", "phone": "23277560918", "website": "http://www.ntb.gov.sl", "chiefdom": "Masongbon", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.874116305189", "geocode_long": "-12.039556503296", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Garden View And Car Park facility" } }, { "node": { "nid": "41931", "uid": "16598", "title": "Rogbonko Village Retreat", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Rogbonko Mathaka", "city": "Tonkolili", "email": "info@rogbonkovillage.com", "phone": "23276877018", "website": "http://www.ntb.gov.sl", "chiefdom": "Matotoka", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.980142108471", "geocode_long": "-11.789875030518", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Garden View\r\ninfo@rogbonkovillage.com" } }, { "node": { "nid": "41936", "uid": "16598", "title": "Multiple Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "7 Lower mathankoh Street", "city": "Makeni", "email": "info@ntb.gov.sl", "phone": "23276675672", "website": "http://www.ntb.gov.sl", "chiefdom": "Makeni", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "8.875027622680", "geocode_long": "-12.039273113769", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Fans, Tel, Carpark TV ,mini Bar" } }, { "node": { "nid": "41946", "uid": "16598", "title": "Kabala Hill View Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Off Agriculture Road", "city": "Kabala", "email": "info@ntb.gov.sl", "phone": "23276896676", "website": "http://www.ntb.gov.sl", "chiefdom": "Gbawuria", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "9.583745782509", "geocode_long": "-11.558271646500", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Hill/Forest View & Town View" } }, { "node": { "nid": "41951", "uid": "16598", "title": "Moon Light Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Kambia - Conakry Highway", "city": "Kambia", "email": "info@ntb.gov.sl", "phone": "", "website": "http://www.ntb.gov.sl", "chiefdom": "Kambia", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "9.124970536982", "geocode_long": "-12.916166782379", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Fans, Tel, Carpark TV, mini Bar" } }, { "node": { "nid": "41906", "uid": "16598", "title": "Ya Mary Lane Guest House", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Kamakwie Number -1Road", "city": "Kamakwie", "email": "info@ntb.gov.sl", "phone": "23276883176", "website": "http://www.ntb.gov.sl", "chiefdom": "Kamakwie", "category": "Travel and Tourism", "keyword": "Guest House", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "9.497856456033", "geocode_long": "-12.240390340475", "hours": "Monday - Sunday: 0:00-24:00", "reviewcount": "0", "description": "Tel, Fans, Mini Bar and Restaurant Facilities" } }, { "node": { "nid": "40591", "uid": "16598", "title": "Central Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "15 Dambara Road", "city": "Bo", "email": "info@ntb.gov.sl", "phone": "+232 76 658924", "website": "http://www.ntb.gov.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.972597900000", "geocode_long": "-11.740288800000", "hours": "Monday - Saturday: 9:00-23:00Sunday: 10:00-23:00", "reviewcount": "0", "description": "African & Fast Food menu" } }, { "node": { "nid": "40581", "uid": "16598", "title": "Madam Wokie Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "25 Dambara Road", "city": "Bo", "email": "info@ntb.gov.sl", "phone": "+232 76 600868", "website": "http://www.ntb.gov.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.972597900000", "geocode_long": "-11.740288800000", "hours": "Monday - Saturday: 9:00-23:00Sunday: 10:00-23:00", "reviewcount": "0", "description": "African & International menu AC, Satellite TV" } }, { "node": { "nid": "40576", "uid": "16598", "title": "Nenneh Haja Walliya Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "26 Dambala Road", "city": "Bo", "email": "info@ntb.gov.sl", "phone": "+232 78 199069", "website": "http://www.ntb.gov.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.972597900000", "geocode_long": "-11.740288800000", "hours": "Monday: ClosedTuesday - Sunday: 9:00-23:00", "reviewcount": "0", "description": "African & International menu AC, Satellite TV" } }, { "node": { "nid": "40571", "uid": "16598", "title": "Sir Milton Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "6 Kissy Town Road", "city": "Bo", "email": "info@ntb.gov.sl", "phone": "+232 22 272520", "website": "http://www.ntb.gov.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.969165700000", "geocode_long": "-11.738966500000", "hours": "Monday - Saturday: 9:00-23:00Sunday: 10:00-23:00", "reviewcount": "0", "description": "African & International menu AC, Satellite TV" } }, { "node": { "nid": "40566", "uid": "16598", "title": "Bo Friendship House Restaurant", "ratings": "0/5", "Postal Address - Thoroughfare (i.e. Street address)": "Bo/Kenema High Way", "city": "Bo", "email": "info@ntb.gov.sl", "phone": "+232 76 602861", "website": "http://www.ntb.gov.sl", "chiefdom": "Kakua", "category": "Restaurant", "keyword": "Restaurant", "image": { "src": "http://slbr.sl/sites/default/files/styles/bis_mob_view/public/default_images/restaurant-banner.jpg?itok=bh0Y0njE", "alt": "" }, "geocode_lat": "7.948236800000", "geocode_long": "-11.721548300000", "hours": "Monday - Saturday: 9:00-23:00Sunday: 10:00-23:00", "reviewcount": "0", "description": "African  &  International  menu  AC,  Satellite  TV\r\nNight Club, Car park" } }] };

      $rootScope.myBusinesses = result
    }).finally(function () { $rootScope.$broadcast('loading:hide'); })
  }

  $scope.revieweDetails = function (rid) {
    console.log(rid)
    $state.go('app.reviewDetails', {rid: rid})
  }
  $scope.showMyDetails = function (fid) {
    console.log()
  }
  $scope.showProfile = function () {
    $state.go('app.viewProfile')
  }

  $scope.doLogout = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    AuthenticationService.logout().then(function (data) {
      delete $localStorage.isLogedin
      delete $localStorage.currentUser
      // $localStorage.$reset()
      $state.go('login', {}, {reload: true})
      $ionicHistory.clearCache()
      $ionicHistory.clearHistory()
    }, function (error) {
      $state.go('login', {}, {reload: true})
      // $localStorage.$reset()
      $ionicHistory.clearCache()
      $ionicHistory.clearHistory()
    }).finally(function () {$rootScope.$broadcast('loading:hide');})
  }
})

OBizR.controller('reviewerProfileCtrl', function ($scope, $state, $stateParams, businessesService, $rootScope, $localStorage, ProfileService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })

  $scope.$on('$ionicView.enter', function (event, data) {
    $scope.reviewerProfile = {}
    if ($stateParams.uid) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
      businessesService.getReviewerProfile($stateParams.uid)
        .then(function (data) {
          $scope.reviewerProfile = data
          console.log($scope.reviewerProfile)
        }).finally(function () { $rootScope.$broadcast('loading:hide');})
    }
  })

  $scope.reviewerDetails = function (rid) {
    $state.go('app.reviewDetails', {rid: rid})
  }

  $scope.reviewerProfile = function (uid) {
    $state.go('app.reviewerProfile', {uid: uid})
  }
})

OBizR.controller('ProfileCtrl', function ($scope, $rootScope, ProfileService, $ionicHistory, $localStorage, $state, AuthenticationServiceConstant, AuthenticationService, businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.profileUpdate = {}

  $scope.reviewDetails = function (cid, nid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    businessesService.getBusinessesReview(nid).then(function (reviews) {
      $rootScope.businessesReview = reviews
      $state.go('app.reviewDetails', {rid: cid})
    }).finally(function () {$rootScope.$broadcast('loading:hide');})
  }

  $rootScope.$on('profile:changed', function (e, data) {
    ProfileService.getUpdatedProfile().then(function (updateProfile) {
      $rootScope.profile = updateProfile
      $rootScope.currentUser = updateProfile
    }).finally(function () {
      $rootScope.$broadcast('loading:hide')
    })
  })

  $scope.$on('$ionicView.enter', function (event, data) {
    ProfileService.getProfile().then(function (profile) {
      $rootScope.profile = profile
      $scope.profileUpdate = {'uid': profile.uid}
      if (!angular.isArray(profile.field_user_nick_name)) {
        $scope.profileUpdate.field_user_nick_name = {'und': [{'value': profile.field_user_nick_name.und[0].value}]}
      }
      if (angular.isArray(profile.field_user_nick_name)) {
        $scope.profileUpdate.field_user_nick_name = {'und': [{'value': ''}]}
      }
      if (!angular.isArray(profile.field_mobile_user_telephone)) {
        $scope.profileUpdate.field_mobile_user_telephone = {'und': [{'value': profile.field_mobile_user_telephone.und[0].value}]}
      }
      if (angular.isArray(profile.field_mobile_user_telephone)) {
        $scope.profileUpdate.field_mobile_user_telephone = {'und': [{'value': ''}]}
      }
      if (!angular.isArray(profile.field_user_about_me)) {
        $scope.profileUpdate.field_user_about_me = {'und': [{'value': profile.field_user_about_me.und[0].value}]}
      }
      if (angular.isArray(profile.field_user_about_me)) {
        $scope.profileUpdate.field_user_about_me = {'und': [{'value': ''}]}
      }
    }).finally(function () {})
  })

  $scope.editProfile = function () {
    $state.go('app.updateProfile')
  }

  $scope.saveProfile = function (editProfileForm) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Loading...</p>'}})
    ProfileService.updateProfile($scope.profileUpdate).then(function (profile) {
      $rootScope.$broadcast('profile:changed')
    })
    $state.go('app.viewProfile')
  }
})

OBizR.controller('ForgetPassCtrl', function ($rootScope, $scope, $state, $window, $ionicSlideBoxDelegate) {
  $rootScope.doSignup = function () {
    console.log($state.is)
  }
})

OBizR.controller('LoginCtrl', function ($scope, $rootScope, $window, $cordovaGeolocation, DeviceService, AuthService, $ionicPopup, $state, $ionicLoading, $localStorage, AuthenticationService, locationService) {
  // data for vm.loginForm
  $scope.user = {}
  $scope.serverErrors = []
  $scope.doLogin = function (loginForm) {
    $scope.serverErrors = []

    if (loginForm.$valid) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Connecting...</p>'}})
      AuthenticationService.login($scope.user).then(function (data) {
        $localStorage.currentUser = data.data.user
        $rootScope.currentUser = $localStorage.currentUser
        $localStorage.isLogedin = true
        $localStorage.isRegistered = true
        $rootScope.$broadcast('loading:hide')
        if (!$localStorage.allowedPushNot) {
          // var deviceInfo = {}
          // deviceInfo.type = angular.lowercase('Android')
          // deviceInfo.token = 'SESSe9406935ef5cb2ee8ff0cb98f6928491=3EM8Y73swmYlbuNVhJ5OYkQDnRZalh8K9_ZG8tdUJJ8'
          // AuthService.deleteNotificationToken(deviceInfo.token).success(function (res) {
          //  // $localStorage.allowedPushNot = true
          //  delete $localStorage.allowedPushNot
          //   console.log(res)
          // }).error(function (error) {
          //   alert(JSON.stringify(error))
          // })

          DeviceService.getDeviceInfo().then(function (deviceInfo) {
            AuthService.registerForPushNotification(deviceInfo).success(function (res) {
              $localStorage.allowedPushNot = true
            }).error(function (error) {
              alert(JSON.stringify(error))
            })
          }, function (error) {
            console.log(error)
          })
        }
        if ($localStorage.isLocationAllowed) {
          $state.go('app.nearby')
        }else {
          $state.go('location')
        }
      },
        // error
        function (errorResult) {
          console.log(errorResult)
          if (errorResult.status >= 400 && errorResult.status < 500) {
            $scope.serverErrors.push(errorResult.data[0])
            console.log(errorResult)
          }
          if (errorResult.status == -1) {
            $scope.serverErrors.push("The 'Access-Control-Allow-Origin' header has a value that is not equal to the supplied origin.")
          }else {
            $scope.serverErrors.push(errorResult.statusText)
          }
        }).finally(function () {$rootScope.$broadcast('loading:hide'); })
    } else {
      $scope.serverErrors.push('Username and Password is required')
    }
  }
  $scope.ContinueOfflineMode = function () {
    $localStorage.currentLocation = {}
    $state.go('app.nearby')
  }
  $scope.iAgree = function () {
    var confirmPopup = $ionicPopup.confirm({
      template: 'Allow OBizR to access your location while you use the app?',
      cancelText: "Don't Allow",
      okText: 'Allow',
      cancelType: 'button button-clear button-positive',
      okType: 'button button-clear button-positive'
    })

    confirmPopup.then(function (res) {
      $localStorage.currentLocation = {}
      $rootScope.$broadcast('loading:show')
      if (res) {
        locationService.getCurrentPosition().then(function (position) {
          $localStorage.currentLocation.lat = position.lat
          $localStorage.currentLocation.long = position.long
          $localStorage.currentLocation.address = position.address
          $localStorage.currentLocation.address_components = position.address_components
          $rootScope.currentLocation = $localStorage.currentLocation
          $localStorage.isLocationAllowed = true
          $rootScope.$broadcast('loading:hide')
          $state.go('app.nearby')
        }, function (err) {
          $rootScope.$broadcast('loading:hide')
          $scope.serverErrors.push('unable to get your location, try after sometime.')
          $state.go('location')
        })
      } else {
        $rootScope.$broadcast('loading:hide')
      }
    })
  }

  $scope.userEmail = {}
  $scope.passwordReset = function (passwordResetForm) {
    $scope.serverErrors = []
    console.log(passwordResetForm)
    if (passwordResetForm.$valid) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: '<p><ion-spinner></ion-spinner><br/>Connecting...</p>'}})
      AuthService.requestNewPassword($scope.userEmail).success(function (res) {
        console.log(res[0])
        if (res[0] == false) {
          $scope.serverErrors.push('Temporarily, service is not available.')
        }else {
          $scope.serverErrors.push('Password reset link has been sent to your email address')
        }
      }).error(function (error) {
        $scope.serverErrors.push(error[0])
      }).finally(function () {
        $rootScope.$broadcast('loading:hide')
      })
    }else {
      $scope.serverErrors.push('Please provide Username or Email')
    }
  }
  $scope.skipAuthorization = function () {
    if ($localStorage.isLocationAllowed) {
      $state.go('app.nearby')
    }else {
      $state.go('location')
    }
  }
})

OBizR.controller('SocialCtrl', function ($rootScope, $http, $location, $cordovaOauth, $scope, $state, $window, $ionicSlideBoxDelegate) {
  $scope.data = []
  $scope.facebookLogin = function () {
    $cordovaOauth.facebook('325681044294287', ['email']).then(function (result) {
      // results
      console.log(result)
      alert(JSON.stringify(result))
    }, function (error) {
      alert(JSON.stringify(error))
    // error
    })
  }
  $scope.twitterLogin = function () {
    $cordovaOauth.twitter('YzRRNJ4GvW66ukutM57g', 'XN181qoow0hrqVoEMnDdb1qnGRo0KK1O7cKmyvV2LM').then(function (result) {
      alert(JSON.stringify(result))
    }, function (error) {
      alert(JSON.stringify(error))
    })
  }
  $scope.googleLogin = function () {
    $cordovaOauth.google('763923498182-4rt0vruclqkc0itb6k4tvl0h3ec2bt95.apps.googleusercontent.com', $scope.data).then(function (result) {
      alert(JSON.stringify(result))
    }, function (error) {
      alert(JSON.stringify(error))
    })
  }
})

OBizR.controller('anonymousCtrl', function ($rootScope, $http, $location, $cordovaOauth, $scope, $state, $window, $ionicSlideBoxDelegate) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
  })
  $scope.$on('$ionicView.enter', function (event, data) {})
})
