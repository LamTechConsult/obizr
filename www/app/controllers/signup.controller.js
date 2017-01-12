OBizR.controller('SignupCtrl',function ($scope,$state,smsService,$ionicPopup,$rootScope,UserResource, AuthenticationService, $localStorage) {
  // jshint validthis: true
  //data for $scope.registerForm
  $scope.serverErrors = [];
  $scope.user = {
    status:1, //activate user.
    notify:1, //notify user by mail.
    field_mobile_user_telephone: {und: [{value:''}]},
    field_user_nick_name: {und: [{value: ''}]}
    };
 
  $rootScope.doSignup = function (signupForm) {
    $scope.serverErrors = [];
    console.log(signupForm);
    if (signupForm.$valid) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connecting...</p>"}});
      console.log($scope.user);
      $rootScope.phonenumber = $scope.user.field_mobile_user_telephone.und[0].value;
      $rootScope.otpData = {};
      $rootScope.otpData.user = $scope.user.name;
      $rootScope.otpData.password = $scope.user.pass;
      $rootScope.otpData.msg = 'Thank You for Signing Up OBizR';
      $rootScope.otpData.phonenumber = $scope.user.field_mobile_user_telephone.und[0].value;

      UserResource.register($scope.user).then(function (data) {
          console.log(data);
          $localStorage.isRegistered = true;
          //$scope.showPoup();
          return AuthenticationService.login({username: $scope.user.name, password: $scope.user.pass});
      })
        //login
        .then(function (data) {
          //$scope.showPoup();
          $localStorage.currentUser = data.data.user;
          $rootScope.currentUser = $localStorage.currentUser;
          $localStorage.isLogedin = true;
          $localStorage.isRegistered = true;
          if($localStorage.isLocationAllowed){
            $state.go('app.nearby');
          }else{
            $state.go('location');
          }
        })
        .catch(function (errorResult) {
          if (errorResult.status >= 400 && errorResult.status < 500) {
            //Not found
            if (errorResult.status == 404) {
              $scope.serverErrors.push("Service not available!");
            }
            //Not Acceptable
            else if (errorResult.status == 406) {
              //errors for specific fields
              if (angular.isObject(errorResult.data) && 'form_errors' in errorResult.data) {
                if (errorResult.data.form_errors.name) {
                //  $scope.registerForm.name.$setValidity('name-taken', false);
                  $scope.serverErrors.push('username is alreday taken');
                }
                if (errorResult.data.form_errors.mail) {
                  //$scope.registerForm.mail.$setValidity('email-taken', false);
                  $scope.serverErrors.push('email is alreday taken');
                }
              }
              //general errors
              else {
                $scope.serverErrors.push(errorResult.statusText);
              }
            }
            //400 - 500 default message
            else {
              $scope.serverErrors.push(errorResult.data[0]);
            }
          }
        })
      .finally(function () {$rootScope.$broadcast('loading:hide');} );
    }else{
      if(signupForm.name.$invalid){
        $scope.serverErrors.push('Username is required');
      }
      else if(signupForm.pass.$invalid){
        $scope.serverErrors.push('The password is too short: it must be at least 6 characters');
      }
      else if(signupForm.email.$invalid){
        $scope.serverErrors.push('Invalid email address');
      }
      else if(signupForm.phone.$error.minlength || signupForm.phone.$error.required){
        $scope.serverErrors.push('Invalid phone number: it must be at least 10 digit');
      }      
    }
  }
 $scope.showPoup = function () {
  smsService.validateUserOTP($rootScope.otpData).success(function (data) {  
    console.log(data)
  }).error(function (error) {
   console.log(error)
  })
   var alertPopup = $ionicPopup.alert({
        title:'<b>Thank You for Signing Up</b>',
        template: "A text message with your PIN has been sent to {{phonenumber}}.<br>Please check your SMS Message and click below to verify your phone number",
        okText: 'VERIFY YOU PHONE NUMBER',
        okType:'button button-clear button-positive'
     });

     alertPopup.then(function(res) {
       $state.go('phone-verify');
     });
 }
  $scope.skipMobileVerification = function () {
    $state.go('location');
  }
  $scope.confirmPin = function () {
    var alertPopup = $ionicPopup.alert({
         title:'<b>Phone number VERIFIED</b>',
         template: "Thank you for verifying you phone number.</br> Your registration is completed",
         okText: 'HIDE THIS MESSAGE',
         okType:'button button-clear button-positive'
      });
      alertPopup.then(function(res) {
          $localStorage.isPhoneVerified =true;
          $state.go('location');
      });
  }
  $scope.requestNewPin = function () {
    var alertPopup = $ionicPopup.alert({
         title:'<b>Phone number VERIFIED</b>',
         template: "New PIN has been sent to:</br> {{phonenumber}}",
         okText: 'HIDE THIS MESSAGE',
         okType:'button button-clear button-positive'
      });
      alertPopup.then(function(res) {

      });
  }
  $scope.skipAuthorization = function () {
    if($localStorage.isLocationAllowed){
      $state.go('app.nearby');
    }else{
      $state.go('location');
    }
  }
});
