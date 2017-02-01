// angular.module is a global place for creating, registering and retrieving Angular modules
// 'OBizR' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'dependencies'

var OBizR = angular.module('OBizR', ['ionic','ngCordova','ionic-autocomplete','angularMoment','d7-services','ngCordovaOauth','ionic.rating','ngStorage','ngSanitize','OBizR.config']);

OBizR.run(function($ionicPlatform, $rootScope, $cordovaStatusbar, $ionicHistory, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //navigator.splashscreen.hide();

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleLightContent();
      //$cordovaStatusbar.overlaysWebView(true);
      StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function() {

    if ($state.is('splash')) {
        navigator.app.exitApp();
    }
    if ($state.is('login')) {
        navigator.app.exitApp();
    }
    if($state.is('app.nearby')){
        navigator.app.exitApp();
    }
    else {
      $ionicHistory.goBack();
    }
  }, 100);
});
