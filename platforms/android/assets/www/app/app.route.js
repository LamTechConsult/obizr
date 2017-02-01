OBizR.config(function($stateProvider, $localStorageProvider, AuthenticationServiceConstant, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $ionicConfigProvider.backButton.text('Back').icon('ion-chevron-left');
  $ionicConfigProvider.tabs.style('standard'); //tabs style
  $ionicConfigProvider.tabs.position('bottom');//tabsposition
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.views.transition('ios');

  //set default URL
  if (!$localStorageProvider.get('isRegistered')) {
    $urlRouterProvider.otherwise('splash');
  }
  else if (!$localStorageProvider.get('isLogedin')) {
    $urlRouterProvider.otherwise('login');
  }
  else {
    $urlRouterProvider.otherwise('app/nearby');
  }

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('app', {
    url: '/app',
      abstract: true,
      templateUrl: 'app/templates/tabs.html',
      controller: 'mainCtrl'
  })

  // Each tab has its own nav history stack:
  .state('app.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'app/templates/home.html',
        controller: 'DashCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })

  .state('app.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'app/templates/profile/account.html',
        controller: 'AccountCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })

  .state('app.menu', {
    url: '/menu',
    views: {
      'tab-menu': {
        templateUrl: 'app/templates/menu/menu.html',
        controller: 'AccountCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })

  .state('app.viewProfile', {
    url: '/view-profile',
    views: {
      'tab-viewProfile': {
        templateUrl: 'app/templates/profile/view-profile.html',
        controller: 'ProfileCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })

  .state('app.updateProfile', {
    url: '/update-profile',
    views: {
      'tab-updateProfile': {
        templateUrl: 'app/templates/profile/update-profile.html',
        controller: 'ProfileCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })

  .state('app.nearby', {
    url: '/nearby',
    views: {
      'tab-nearby': {
        templateUrl: 'app/templates/others/nearby.html',
        controller: 'homeCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })
  .state('app.filter', {
    url: '/filter',
    views: {
      'tab-filter': {
        templateUrl: 'app/templates/others/filter.html',
        controller: 'filterCtrl'
      }
    }
  })
  .state('app.filterSetFieldValue', {
    url: '/filterSetFieldValue',
    views: {
      'tab-filter': {
        templateUrl: 'app/templates/others/filter_setfieldvalue.html',
        controller: 'filterCtrl'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'app/templates/others/search.html',
        controller: 'searchCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })
  .state('app.searchResults', {
    url: '/searchResults/:srchId',
    views: {
      'tab-search': {
        templateUrl: 'app/templates/others/search_result.html',
        controller: 'srchResCtrl'
      }
    }
  })
  .state('app.addbusiness', {
    url: '/addbusiness',
    views: {
      'tab-addbusiness': {
        templateUrl: 'app/templates/biz/addbusiness.html',
        controller: 'addBizCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })
  .state('app.addBizsetBizFieldValue', {
    url: '/addBizsetBizFieldValue',
    views: {
      'tab-addbusiness': {
        templateUrl: 'app/templates/biz/addbiz_setbizfieldvalue.html',
        controller: 'addBizCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })
  .state('app.editBizsetBizFieldValue', {
    url: '/editBizsetBizFieldValue',
    views: {
      'menu-editBusiness': {
        templateUrl: 'app/templates/biz/editbz_setbizfieldvalue.html',
        controller: 'editBizCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })
  .state('app.claimBiz', {
    url: '/claimBiz/:bid',
    views: {
      'menu-claimBiz': {
        templateUrl: 'app/templates/biz/claimBiz.html',
        controller: 'claimBizCtrl'
      }
    },
    data: {
      'access': AuthenticationServiceConstant.accessLevels.user
    }
  })
 
  .state('app.anonymous', {
    url: '/anonymous',
    cache:false,
    views: {
      'menu-anonymous': {
        templateUrl: 'app/templates/anonymousPopup.html',
        controller: 'anonymousCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
        templateUrl: 'app/templates/auth/login.html',
        controller: 'LoginCtrl'
  })
  .state('fblogin', {
    url: '/fblogin',
       templateUrl: 'app/templates/auth/fb-login.html',
       controller: 'SocialCtrl'
  })
  .state('twitterlogin', {
    url: '/twitterlogin',
      templateUrl: 'app/templates/auth/twitter-login.html',
      controller: 'SocialCtrl'
  })
  .state('googlelogin', {
     url: '/googlelogin',
     templateUrl: 'app/templates/auth/google-login.html',
     controller: 'SocialCtrl'
  })

  .state('signup', {
    url: '/signup',
        templateUrl: 'app/templates/auth/signup.html',
        controller: 'SignupCtrl'
  })

  .state('phone-verify',{
        url:'/phone-verify',
        templateUrl: 'app/templates/phone-verify.html',
        controller: 'SignupCtrl'
  })

  .state('forget-password', {
    url: '/forget-password',
        templateUrl: 'app/templates/auth/forget-password.html',
        controller: 'LoginCtrl'
  })

  .state('splash',{
        url:'/splash',
        templateUrl: 'app/templates/splash/splash.html',
        controller: 'SplashCtrl'
  })

  .state('location',{
        url:'/location',
        templateUrl: 'app/templates/location.html',
        controller: 'LoginCtrl'
  })

  .state('privacy-policy',{
        url:'/privacy-policy',
        templateUrl: 'app/templates/menu/privacy-policy.html',
        controller: 'menuCtrl'
  })
  .state('term-of-use',{
        url:'/term-of-use',
        templateUrl: 'app/templates/menu/terms-of-use.html',
        controller: 'menuCtrl'
  })

  .state('support',{
        url:'/support',
        templateUrl: 'app/templates/menu/support.html',
        controller: 'menuCtrl'
  })

  .state('app.gettingStarted',{
      url:'/getting-started',
      views: {
        'menu-gettingStarted': {
          templateUrl: 'app/templates/menu/getting-started.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.about-app',{
      url:'/about-app',
      views: {
        'menu-about-app': {
          templateUrl: 'app/templates/menu/about-app.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.blog',{
      url:'/blog',
      views: {
        'menu-blog': {
          templateUrl: 'app/templates/menu/latest-blog.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.news',{
      url:'/news',
      views: {
        'menu-news': {
          templateUrl: 'app/templates/menu/latest-news.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.rate',{
      url:'/rate',
      views: {
        'menu-rate': {
          templateUrl: 'app/templates/menu/rate-app.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.share',{
      url:'/share',
      views: {
        'menu-share': {
          templateUrl: 'app/templates/menu/share-app.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.set-location',{
      url:'/set-location',
      views: {
        'menu-set-location': {
          templateUrl: 'app/templates/menu/set-location.html',
          controller: 'menuCtrl'
        }
      }
  })
  .state('app.mapView',{
      url:'/map-view',
      views: {
        'menu-mapView': {
          templateUrl: 'app/templates/others/map-view.html',
          controller: 'otherCtrl'
        }
      }
  })
  .state('app.myReviews',{
      url:'/myReviews',
      views: {
        'menu-myReviews': {
          templateUrl: 'app/templates/profile/my-reviews.html',
          controller: 'ProfileCtrl'
        }
      }
  })
  .state('app.reviewerProfile',{
    url:'/reviewerProfile/:uid',
    views: {
      'menu-reviewerProfile': {
        templateUrl: 'app/templates/profile/reviewer-profile.html',
        controller: 'reviewerProfileCtrl'
      }
    }
  })
  .state('app.myBookMarks',{
      url:'/myBookMarks',
      views: {
        'menu-myBookMarks': {
          templateUrl: 'app/templates/profile/my-bookmarks.html',
          controller: 'ProfileCtrl'
        }
      }
  })
  .state('app.myMessages',{
      url:'/myMessages',
      views: {
        'menu-myMessages': {
          templateUrl: 'app/templates/profile/my-messages.html',
          controller: 'ProfileCtrl'
        }
      }
  })
  .state('app.myFriends',{
      url:'/myFriends',
      views: {
        'menu-myFriends': {
          templateUrl: 'app/templates/profile/my-friends.html',
          controller: 'AccountCtrl'
        }
      }
  })
  .state('app.myFollowers',{
      url:'/myFollowers',
      views: {
        'menu-myFollowers': {
          templateUrl: 'app/templates/profile/my-followers.html',
          controller: 'ProfileCtrl'
        }
      }
  })
  .state('app.myFollowings',{
      url:'/myFollowings',
      views: {
        'menu-myFollowings': {
          templateUrl: 'app/templates/profile/my-followings.html',
          controller: 'ProfileCtrl'
        }
      }
  })
  .state('app.recentActivies',{
      url:'/recentActivies',
      views: {
        'menu-recentActivies': {
          templateUrl: 'app/templates/profile/recent-activities.html',
          controller: 'ProfileCtrl'
        }
      }
  })
  .state('app.myFriendsDetails',{
    url:'/myFriendsDetails/:fid',
    views: {
      'menu-myFriendsDetails': {
        templateUrl: 'app/templates/profile/my-reviewer-profile.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('app.businessDetails',{
    cache: false,
    url:'/businessDetails/:bid',
    views: {
      'menu-businessDetails': {
        templateUrl: 'app/templates/biz/business_details.html',
        controller: 'bizCtrl'
      }
    }
  })
  .state('app.editBusiness',{
    cache:false,
    url:'/editBusiness/:bid',
    views: {
      'menu-editBusiness': {
        templateUrl: 'app/templates/biz/editbusiness.html',
        controller: 'editBizCtrl'
      }
    }
  })
  .state('app.businessDetailsMap',{
    cache:false,
    url:'/businessDetailsMap/:bid',
    views: {
      'menu-businessDetailsMap': {
        templateUrl: 'app/templates/biz/business-map.html',
        controller: 'bizCtrlMap'
      }
    }
  })
  .state('app.businessDirectionsMapOptions',{
     cache:false,
    url:'/businessDirectionsMapOptions/:bid',
    views: {
      'menu-businessDirectionsMapOptions': {
        templateUrl: 'app/templates/biz/business-map-options.html',
        controller: 'bizCtrlMapDirectionsOptions'
      }
    }
  })
   .state('app.businessDirectionsMapStartPoint',{
    cache:false,
    url:'/businessDirectionsMapStartPoint/:bid',
    views: {
      'menu-businessDirectionsMapStartPoint': {
        templateUrl: 'app/templates/biz/business-map-start-point.html',
        controller: 'bizCtrlMapDirectionsStartPoint'
      }
    }
  })
   
   .state('app.businessDirectionsMapStartPointLocation',{
    cache:false,
    url:'/businessDirectionsMapStartPointLocation/:bid',
    views: {
      'menu-businessDirectionsMapStartPointLocation': {
        templateUrl: 'app/templates/biz/business-map-an-address-location-form.html',
        controller: 'bizCtrlMapDirectionsStartPointLocation'
      }
    }
  })
   
    .state('app.businessDirectionsMapEndPoint',{
      cache:false,
    url:'/businessDirectionsMapEndPoint/:bid',
    views: {
      'menu-businessDirectionsMapEndPoint': {
        templateUrl: 'app/templates/biz/business-map-end-point.html',
        controller: 'bizCtrlMapDirectionsEndPoint'
      }
    }
  })
	
	.state('app.businessDirectionsMapEndPointLocation',{
    cache:false,
    url:'/businessDirectionsMapEndPointLocation/:bid',
    views: {
      'menu-businessDirectionsMapEndPointLocation': {
        templateUrl: 'app/templates/biz/business-map-an-address-location-form.html',
        controller: 'bizCtrlMapDirectionsEndPointLocation'
      }
    }
  })
  .state('app.writeReview',{
    url:'/writeReview/:bid',
    views: {
      'menu-writeReview': {
        templateUrl: 'app/templates/biz/write-review.html',
        controller: 'writeReviewCtrl'
      }
    }
  })
  .state('app.reviewDetails',{
    url:'/reviewDetails/:rid',
    views: {
      'menu-reviewDetails': {
        templateUrl: 'app/templates/biz/review-details.html',
        controller: 'reviewDetailsCtrl'
      }
    }
  })

  .state('app.camSource',{
    url:'/camSource/:bid',
    views: {
      'menu-camSource': {
        templateUrl: 'app/templates/biz/cam-source.html',
        controller: 'writeReviewCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('splash');
});

OBizR.run(function ($rootScope, AuthenticationService, $window, $cordovaNetwork, $ionicPopup, $cordovaToast, $state, $localStorage, DrupalApiConstant, $urlRouter, $ionicLoading) {
  $rootScope.$on('loading:show', loadingShowCallback);
  $rootScope.$on('loading:hide', loadingHideCallback);

    //http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider#methods_deferintercept
    //location change logic => before any view is rendered
    $rootScope.$on('$locationChangeStart', locationChangeStartCallback)
    
    $rootScope.$on('$cordovaNetwork:offline', offlineCallback);
    $rootScope.$on('$cordovaNetwork:online', onlineCallback);

    //state change logic
    $rootScope.$on("$stateChangeStart", stateChangeStartCallback);

    // show ionicLoading overlay with args of event
    function loadingShowCallback(event, args) {
      $ionicLoading.show((args && 'loading_settings' in args) ? args.loading_settings : {});
    }

    // hide ionicLoading overlay
    function loadingHideCallback(event, args) {
      $ionicLoading.hide()
    }

    //we need this to have out current auth state before any other thing in router happens
    function locationChangeStartCallback(e) {
      
      $rootScope.isOffline = $window.navigator.onLine;
      $window.addEventListener("online", function () {
        $rootScope.isOffline = true;
        $rootScope.$digest();
      }, true);

      $window.addEventListener("offline", function () {
          $rootScope.isOffline = false;
          $rootScope.$digest();
      }, true);

      if(!$rootScope.isOffline){
        return;
      }

      if (AuthenticationService.getLastConnectTime() > 0) {
        //sync the current URL to the router
        $urlRouter.sync();
        return;
      }

      // Prevent $urlRouter's default handler from firing
      e.preventDefault();
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connecting...</p>"}});
      // init or refresh Authentication service connection
      AuthenticationService
        .refreshConnection()
        .then(
        function (success) {
          $rootScope.$broadcast('loading:hide');
          //sync the current URL to the router
          $urlRouter.sync();
        }
      )
        .catch(
        function (error) {
          $rootScope.$broadcast('loading:hide');
          //sync the current URL to the router
          $urlRouter.sync();
        }
      );
      // Configures $urlRouter's listener *after* your custom listener
      $urlRouter.listen();
    };

    // set offline mode
    function offlineCallback(event, networkState) {
      $rootScope.isOffline = true;
      $cordovaToast.show('Operating app in offline mode','long','center');
    }
     // set online mode
    function onlineCallback(event, networkState) {
      $rootScope.isOffline = false;
      $cordovaToast.show('Operating in online mode','long','center');
    }
    //TODO: add more state that need to be sucured.
    $rootScope.authorizedState = [
      {path:'app.account'},
      {path:'app.addbusiness'},
      {path:'app.writeReview'},
      {path:'app.editBusiness'},
      {path:'app.claimBiz'},      
    ];
    $rootScope.needAuthorization = function (argument) {
      var flag = false;
      for (var i = 0; i < $rootScope.authorizedState.length; i++) {
        if($rootScope.authorizedState[i].path == argument){
          flag = true;
        }
      }
      return flag;
    }

    function stateChangeStartCallback(event, toState, toParams, fromState, fromParams) {
      //redirects for logged in user away from login or register and show its profile instead
      // if (toState.name == 'login' || toState.name == 'signup') {
      //   if (AuthenticationService.getConnectionState()) {
      //     event.preventDefault();
      //     $state.go('app.nearby');
      //     return;
      //   }
      // }
      if(!$localStorage.isLogedin && $rootScope.needAuthorization(toState.name)){
        $state.go('app.anonymous', {}, {reload: true});
        event.preventDefault();
        return;
      }
    }
});
