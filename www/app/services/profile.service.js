OBizR.service('ProfileService',ProfileService);
function ProfileService($q, $http, $filter, $rootScope,DrupalApiConstant, UserResource, AuthenticationService, AuthenticationChannel){

  var profile = false,
  scope = $rootScope.$new();

  AuthenticationChannel.subCurrentUserUpdated(scope, saveProfileData);

  //profile service object
  var profileService = {
    getProfile: getProfile,
    getUpdatedProfile: getUpdatedProfile,
    updateProfile: updateProfile,
    changePassword: changePassword
  };

  return profileService;
  /////////////////////////////////////////////////////////////

  function getUpdatedProfile() {
   var defer = $q.defer();
   var currentUser = AuthenticationService.getCurrentUser();

    if (currentUser.uid != 0) {

      UserResource
        .retrieve({uid: currentUser.uid})
        .success(function (data) {
          saveProfileData(data);
          defer.resolve(profile);
        })
        .catch(function (error) {
          defer.reject(error);
        });

    }

    return defer.promise;
  }


  function getProfile() {

    var defer = $q.defer();

    //return profile form cache
    if (angular.isObject(profile) && typeof Object.keys(profile)[0] !== 'undefined') {
      return $q.resolve(profile);
    }

    var currentUser = AuthenticationService.getCurrentUser();

    if (currentUser.uid != 0) {

      UserResource
        .retrieve({uid: currentUser.uid})
        .success(function (data) {
          saveProfileData(data);
          defer.resolve(profile);
        })
        .catch(function (error) {
          defer.reject(error);
        });

    }

    return defer.promise;
  }
  function saveProfileData(newProfile) {
    var preparedProfile = newProfile;
    preparedProfile.pictureUrl = (preparedProfile.picture) ? preparedProfile.picture.url : false;
    profile = preparedProfile;
  }

  function updateProfile(profileData) {
    var defer = $q.defer();
    UserResource.update(profileData)
    .success(function (profile) {
        defer.resolve(profile);
    })
    .catch(function (error) {
        defer.reject(error);
    });

    return defer.promise;
  }

  function changePassword(data) {
    url = DrupalApiConstant.drupal_instance + "custom-api/change-password";
    config = {};
    var defer = $q.defer();
    $http.post(url, data, config)
    .success(function (data) {
        defer.resolve(data);
    })
    .catch(function (error) {
        defer.reject(error);
    });

    return defer.promise;
  }
};

// OBizR.service('accountService',ProfileService);
// function accountService($q, $http, $filter, $rootScope,DrupalApiConstant, UserResource, AuthenticationService, AuthenticationChannel){

//   var account = false,
//   scope = $rootScope.$new();

//   AuthenticationChannel.subCurrentUserUpdated(scope, saveProfileData);

//   //account service object
//   var accountService = {
//     getMyFriends: getMyFriends
//   };

//   return accountService;
//   /////////////////////////////////////////////////////////////

//   function getMyFriends() {

//     var defer = $q.defer();

//     //return account form cache
//     if (angular.isObject(account) && typeof Object.keys(account)[0] !== 'undefined') {
//       return $q.resolve(account);
//     }

//     var currentUser = AuthenticationService.getCurrentUser();

//     if (currentUser.uid != 0) {

//       UserResource
//         .retrieve({uid: currentUser.uid})
//         .success(function (data) {
//           saveAccountData(data);
//           defer.resolve(account);
//         })
//         .catch(function (error) {
//           defer.reject(error);
//         });

//     }

//     return defer.promise;
//   }
//   function saveAccountData(newAccount) {
//     var preparedAccount = newAccount;
//   //  preparedProfile.pictureUrl = (preparedProfile.picture) ? DrupalHelperService.getDrupalPath() + 'sites/default/files/pictures/' + preparedProfile.picture.filename : false;
//     account = preparedAccount;
//   }

// };
