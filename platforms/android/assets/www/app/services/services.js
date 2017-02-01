/**
 * Device Services :
 */
OBizR.service('DeviceService', function($q,$cordovaDevice) {

   return {
      getDeviceInfo: function() {
        var q = $q.defer();
        if (window.cordova) {
        	 var deviceInfo = {};
	        //var device = $cordovaDevice.getDevice();
	        //var cordova = $cordovaDevice.getCordova();
	        //var model = $cordovaDevice.getModel();
	        var platform = $cordovaDevice.getPlatform();
	        deviceInfo.type = angular.lowercase(platform);
	        deviceInfo.token = $cordovaDevice.getUUID();
	        //var version = $cordovaDevice.getVersion();

	        q.resolve(deviceInfo);
        }else{
        	q.reject("Webview not supptted.");
        }
      
        return q.promise;
      }
   }
});
/**
 * Localstorage Services :
 */
OBizR.service('LSService', function($q,$window) {

   return {
      getItem: function(item) {
        var q = $q.defer();
        if(item){
        	q.resolve(JSON.parse($window.localStorage.getItem(item)));
        }
        return q.promise;
      }
   }
});
/**
 * location Services :
 */
OBizR.service('locationService', function($q,$cordovaGeolocation) {
	var locationService = {
		getCurrentPosition:getCurrentPosition,
		getGeocodeByAddress:getGeocodeByAddress,
		getGeocodeByLatLong:getGeocodeByLatLong,
	};
	var myLocation = null;

///////////////////////////////////////////////////

    function getCurrentPosition() {
        
        var q = $q.defer();
	    var onSuccess = function(position) {
	    	myLocation = getGeocodeByLatLong(position.coords);
	    	q.resolve(myLocation);
	    };
	    function onError(error) {
	    	q.reject(error);
	    }

	    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    	return q.promise;
    }

    function getGeocodeByLatLong(coords) {

    	var q = $q.defer();
    	var position = {};
    	var lat = coords.latitude;
      	var lng = coords.longitude;

      	var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        var request = {
        	  latLng: latlng
          	};
      	geocoder.geocode(request, function(data, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (data[0] != null) {
	            position.address = data[0].formatted_address;
	            position.address_components = data[0].address_components;
	            position.lat = data[0].geometry.location.lat();
	            position.long = data[0].geometry.location.lng();
	            q.resolve(position);
              } else {
                q.reject(position);
              }
            }
        });
       return q.promise;
    }

    function getGeocodeByAddress(commaSeparateVal) {

      var q = $q.defer();
      var position = {};
      var request = {
            address: commaSeparateVal
          };
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(request, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (data[0] != null) {
            position.address = data[0].formatted_address;
            position.address_components = data[0].address_components;
            position.lat = data[0].geometry.location.lat();
            position.long = data[0].geometry.location.lng();
            q.resolve(position);
          } else {
            q.reject(position);
          }
        }
      });
      return q.promise;
    }
    return locationService;
});

/**
 * Camera Services :
 */
OBizR.service('CameraService', function($q,$cordovaCamera) {

   return {
      getPicture: function(options) {
        var q = $q.defer();

        $cordovaCamera.getPicture(options).then(function(imageURI) {
	        q.resolve(imageURI);
	    }, function(err) {
	        q.reject(err);
	    },options);
         return q.promise;
      }
   }
});
/**
 * pageService
 */
OBizR.service('pageService', function($q,$filter,$rootScope,StaticPageService) {
	var pageService = {
		getAboutPage:getAboutPage,
		getAboutBizSubsPage:getAboutBizSubsPage,
		getAboutPressKitPage:getAboutPressKitPage,
		getAboutProfesSrvPage:getAboutProfesSrvPage,

		getSupportPage:getSupportPage,
		getTermUsePage:getTermUsePage,

		getGSReviverPage:getGSReviverPage,
		getGSBizPage:getGSBizPage,
		getGSBuildPage:getGSBuildPage,
		getGSLearnPage:getGSLearnPage,
		getGSPubSevPage:getGSPubSevPage,

		getPrivacyPolicyPage:getPrivacyPolicyPage,
	}
	var aboutpage = null;
	var aboutbizsubspage = null;
	var aboutpresskitpage = null;
	var aboutprofessrvpage = null;

	var termusepage = null;
	var supportpage = null;
	var privacypolicypage = null;

	var gsreviverpage = null;
	var gsbizpage = null;
	var gsbuildpage = null;
	var gslearnpage = null;
	var gspubsevpage = null;

	return pageService;
///////////////////////////////////////////////////////////////
	
	/**
	 * Get about page content from backend.
	 */
	function getAboutPage() {
			
		var defer = $q.defer();
		if (aboutpage == null) {
			StaticPageService.fetchAboutPage().success(function (data) {	
				aboutpage = data.nodes;	

			    defer.resolve(aboutpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(aboutpage);
		}
	    return defer.promise;
	}
		/**
	 * Get about page content from backend.
	 */
	function getAboutBizSubsPage() {
			
		var defer = $q.defer();
		if (aboutbizsubspage == null) {
			StaticPageService.fetchAboutBizSubsPage().success(function (data) {	
				aboutbizsubspage = data.nodes;	

			    defer.resolve(aboutbizsubspage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(aboutbizsubspage);
		}
	    return defer.promise;
	}
		/**
	 * Get about page content from backend.
	 */
	function getAboutPressKitPage() {
			
		var defer = $q.defer();
		if (aboutpresskitpage == null) {
			StaticPageService.fetchAboutPressKitPage().success(function (data) {	
				aboutpresskitpage = data.nodes;	

			    defer.resolve(aboutpresskitpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(aboutpresskitpage);
		}
	    return defer.promise;
	}
		/**
	 * Get about page content from backend.
	 */
	function getAboutProfesSrvPage() {
			
		var defer = $q.defer();
		if (aboutprofessrvpage == null) {
			StaticPageService.fetchAboutProfesSrvPage().success(function (data) {	
				aboutprofessrvpage = data.nodes;	

			    defer.resolve(aboutprofessrvpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(aboutprofessrvpage);
		}
	    return defer.promise;
	}
	//////////////////////////////////////////////////////////
	
	/**
	 * Get privacy policy page content from backend.
	 */
	function getPrivacyPolicyPage() {
			
		var defer = $q.defer();
		if (privacypolicypage == null) {
			StaticPageService.fetchPrivacyPolicyPage().success(function (data) {	
				privacypolicypage = data.nodes;	

			    defer.resolve(privacypolicypage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(privacypolicypage);
		}
	    return defer.promise;
	}
	/**
	 * Get term of use page content from backend.
	 */
	function getTermUsePage() {
			
		var defer = $q.defer();
		if (termusepage == null) {
			StaticPageService.fetchTermUsePage().success(function (data) {	
				termusepage = data.nodes;	

			    defer.resolve(termusepage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(termusepage);
		}
	    return defer.promise;
	}
	//////////////////////////////////////////////////////////////

	/**
	 * Get getting started page content from backend.
	 */
	function getGSReviverPage() {
			
		var defer = $q.defer();
		if (gsreviverpage == null) {
			StaticPageService.fetchGSReviverPage().success(function (data) {	
				gsreviverpage = data.nodes;	

			    defer.resolve(gsreviverpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(gsreviverpage);
		}
	    return defer.promise;
	}
	/**
	 * Get getting started page content from backend.
	 */
	function getGSBizPage() {
			
		var defer = $q.defer();
		if (gsbizpage == null) {
			StaticPageService.fetchGSBizPage().success(function (data) {	
				gsbizpage = data.nodes;	

			    defer.resolve(gsbizpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(gsbizpage);
		}
	    return defer.promise;
	}
	/**
	 * Get getting started page content from backend.
	 */
	function getGSBuildPage() {
			
		var defer = $q.defer();
		if (gsbuildpage == null) {
			StaticPageService.fetchGSBuildPage().success(function (data) {	
				gsbuildpage = data.nodes;	

			    defer.resolve(gsbuildpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(gsbuildpage);
		}
	    return defer.promise;
	}
	/**
	 * Get getting started page content from backend.
	 */
	function getGSLearnPage() {
			
		var defer = $q.defer();
		if (gslearnpage == null) {
			StaticPageService.fetchGSLearnPage().success(function (data) {	
				gslearnpage = data.nodes;	

			    defer.resolve(gslearnpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(gslearnpage);
		}
	    return defer.promise;
	}
	/**
	 * Get getting started page content from backend.
	 */
	function getGSPubSevPage() {
			
		var defer = $q.defer();
		if (gspubsevpage == null) {
			StaticPageService.fetchGSLearnPage().success(function (data) {	
				gspubsevpage = data.nodes;	

			    defer.resolve(gspubsevpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(gspubsevpage);
		}
	    return defer.promise;
	}
	//////////////////////////////////////////////////////////////
	
	/**
	 * Get Support/faq page content from backend.
	 */
	function getSupportPage() {
			
		var defer = $q.defer();
		if (supportpage == null) {
			StaticPageService.fetchSupportPage().success(function (data) {	
				supportpage = data.nodes;	
				
			    defer.resolve(supportpage);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(supportpage);
		}
	    return defer.promise;
	}
});
/**
 * BiZ Services :
 */
OBizR.service('taxonomyService', function($q,$filter,$rootScope,$http,DrupalHelperService,DrupalApiConstant,DataService,UserResource,NodeResource,FileResource,CommentResource) {
	var taxonomyService = {
		getCategory:getCategory,
		getKeywords:getKeywords,
		getProvience:getProvience,
		getDistrict:getDistrict,
		getChiefdoms:getChiefdoms,
	}
	var category = null;
    var keywords = null;
    var provience = null;
    var district = null;
    var chiefdoms = null;

	return taxonomyService;
///////////////////////////////////////////////////////////////
	
	/**
	 * Get active Category from backend.
	 */
	function getCategory() {
			
		var defer = $q.defer();
		if (category == null) {
			DataService.fetchCategory().success(function (data) {	
				category = data.nodes;	
				prepareCategory(category);

			    defer.resolve(category);
			    lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(category);
		}
	    return defer.promise;
	}
	function prepareCategory(category){
		angular.forEach(category, function (value, key) {
			category[key].name = category[key].node.name;
		});
    	return category;
	}
	/**
	 * Get active Keywords from backend.
	 */
	function getKeywords() {
			
		var defer = $q.defer();
		if (keywords == null) {
			DataService.fetchKeywords().success(function (data) {	
				keywords = data.Keywords;	
				prepareKeywords(data.Keywords);
				
			    defer.resolve(keywords);
			    lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(keywords);
		}
	    return defer.promise;
	}
	function prepareKeywords(keywords){
		angular.forEach(keywords, function (value, key) {
			keywords[key].name = keywords[key].keyword.keyword;
		});
    	return keywords;
	}
	/**
	 * Get active Chiefdoms from backend.
	 */
	function getProvience() {
			
		var defer = $q.defer();
		if (provience == null) {
			DataService.fetchProvience().success(function (data) {	
				provience = data.locations;	

			    defer.resolve(provience);
			    lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(provience);
		}
	    return defer.promise;
	}
	/**
	 * Get active Chiefdoms from backend.
	 */
	function getDistrict(pid) {
			
		var defer = $q.defer();
		DataService.fetchDistricts(pid).success(function (data) {	
			district = data.districts;
	
		    defer.resolve(district);
	    }).catch(function (error) {
	        defer.reject(error);
	    });
	    return defer.promise;
	}
	/**
	 * Get active Chiefdoms from backend.
	 */
	function getChiefdoms(did) {
			
		var defer = $q.defer();
		DataService.fetchChiefdoms(did).success(function (data) {	
			chiefdoms = data.locations;	

		    defer.resolve(chiefdoms);
	    }).catch(function (error) {
	        defer.reject(error);
	    });
	    return defer.promise;
	}
});
/**
 * BiZ Services :
 */
OBizR.service('businessesService', function($q,$filter,customPostService,OfflineDataService,$rootScope,$localStorage,$http,DrupalHelperService,DrupalApiConstant,DataService,UserResource,NodeResource,FileResource,CommentResource) {
    var businessesService = {
		  getBusinesses: getBusinesses,
		  getBusinessesReview:getBusinessesReview,
		  getBusinessesReviewById:getBusinessesReviewById,
		  sortBusinessesByDistance:sortBusinessesByDistance,
		  searchedBusinessDetails:searchedBusinessDetails,
		  sortBusinessesByDistanceFilter:sortBusinessesByDistanceFilter,
		  postReviews:postReviews,
		  sortBizDataByCurrentDis:sortBizDataByCurrentDis,
		  claimBiz:claimBiz,
		  
		  businessDetails:businessDetails,
		  searchBusinesses:searchBusinesses,
		  filterBusinesses:filterBusinesses,
		  addBiz:addBiz,
		  editBiz:editBiz,
		  getReviewerProfile:getReviewerProfile,
		  //setReviewUser:setReviewUser
		}
    var lastFetched = null;
    var businesses = null;
    var reviews = null;
   
    var searchedBiz = null;
    var filteredBiz = null;
    var searchedBizDetails = null;
    return businessesService;

//////////////////////////////////////////////////////////
	function claimBiz(bizData) {
		var defer = $q.defer();
		customPostService.postClaimBusiness(bizData).success(function (data) {
			console.log(data);
		    defer.resolve(data);
	    }).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}
	/**
	 * Get getReviewerProfile from backend.
	 */
	function getReviewerProfile(uid) {
		var reviewerProfile = null;
		var defer = $q.defer();
		UserResource.retrieve({uid:uid}).success(function (data) {
	 			reviewerProfile = data;
		    	defer.resolve(reviewerProfile);
		}).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}

	/**
	 * Post getBusinessesReviewById.
	 */
	 function getBusinessesReviewById(rid){
	 	console.log(rid);
	 	var defer = $q.defer();
	 	var reviewsDetails = '';
	 	if(reviews!==null){
	 		angular.forEach(reviews, function (value, key) {
	 			if(value.cid == rid){
	 				reviewsDetails = value;
	 			}
	 		});
	 		UserResource.retrieve({uid:reviewsDetails.uid}).success(function (data) {
	 			reviewsDetails.user = data;
		    	defer.resolve(reviewsDetails);
			}).catch(function (error) {
			    defer.reject(error);
			});
	 		
	 		//console.log(reviewsDetails);
	 	}else{
	 		defer.reject();
	 	}
	    return defer.promise;
	 }

	/**
	 * Post review to the business.
	 */
	function postReviews(reviewData){

		// var defer = $q.defer();
		// CommentResource.create(reviewData).success(function (data) {
		//     defer.resolve(data);
		// }).catch(function (error) {
		//     defer.reject(error);
		// });
	 	// return defer.promise;

    	return uploadImage()
	        .then(
	        function (result) {
	          reviewData.field_ltc_biz_photos = DrupalHelperService.structureField({fid: result.data.fid});
	        },
	        function (error) {
	        	alert('error:'+JSON.stringify(error));
	          //resolve without image
	          return $q.resolve(true);
	        })

	        .finally(
	        function () {
	        	//console.log(reviewData);
	          return CommentResource.create(reviewData);
	        });
   
		//returns promise
	    // - resolve after saved image to server
	    // - rejects if saving image fails or no image given
	    function uploadImage() {
	        //if data is given
	        if ($rootScope.pictureURL) {
	     	
	          var imgData = $rootScope.pictureURL;
	          delete $rootScope.pictureURL;
	          //Create a new name for the photo
			  var d = new Date(),
			      n = d.getTime(),
			      newFileName = n + ".jpg";
			      
	          var newImage = {};

	          newImage.file = imgData;
	          newImage.filename = newFileName;
	          newImage.filesize = newImage.file.length;
	          newImage.filepath = 'photos/biz/reviews/';
	          newImage.filemime = "image/jpeg",
	          newImage.image_file_name = newFileName;

	          return FileResource.create(newImage);
	        }
	        //else fail
	        return $q.reject(false);
	    }
    }

	/**
	 * Get active business reviews from backend.
	 */
	function getBusinessesReview(bid) {
			
		var defer = $q.defer();
		if($rootScope.lastFetchedBizRev != bid){
			NodeResource.comments({nid: bid}).success(function (data) {
				reviews = data;	 
			    //console.log(data.length);
			    if (reviews.length != 0) {
	            	prepareReviews(data);
	            	console.log(reviews);
	          	}
			    defer.resolve(reviews);
		    }).catch(function (error) {
			    defer.reject(error);
			});
		}else{
			 defer.resolve(reviews);
		}
	    return defer.promise;
	}

	function prepareReviews(reviews){
		angular.forEach(reviews, function (value, key) {
			if("field_ltc_biz_photos" in reviews[key] && "und" in reviews[key].field_ltc_biz_photos) {
				angular.forEach(reviews[key].field_ltc_biz_photos.und, function (value, key1) {

			        var imgPath = reviews[key].field_ltc_biz_photos.und[key1].uri.split('//')[1].replace(/^\/+/, "");
			        reviews[key].field_ltc_biz_photos.und[key1].imgPath = DrupalHelperService.getDrupalPath()+'sites/default/files/' + imgPath;
			       //console.log(reviews[key].field_ltc_biz_photos.und[key1].imgPath);
	        	});
			}
		});
    	return reviews;
	}

	/**
	 * Get active business from offline data.
	 */
	function getBusinesses(forceUpdate) {
			
		var defer = $q.defer();
		if(!$rootScope.isOffline){
			OfflineDataService.fetchBusinesses().success(function (data) {
				saveBizDistance(data,'getBusinesses');
			       
			    defer.resolve(businesses);
			}).catch(function (error) {
		        defer.reject(error);
		    });
		}
		else if (businesses == null || forceUpdate) {

			DataService.fetchBusinesses().success(function (data) {
		       //businesses = data;
		       saveBizDistance(data,'getBusinesses');
			       
			    defer.resolve(businesses);
			    lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(businesses);
		}
	    return defer.promise;
	}
	function sortBizDataByCurrentDis(biz) {
		var defer = $q.defer();
		if (biz != null) {
		     saveBizDistance(biz,'getBusinesses');
		}else{
			defer.resolve(businesses);
		}
	    return defer.promise;
	}
	/**
	 * Add distance field to the populated business data.
	 */
	function saveBizDistance(bizData,funNane) {
	    var prepareBizData = bizData;
	   	for (a=0;a<prepareBizData.nodes.length;a++){
	 		prepareBizData.nodes[a].node.distance = $filter('distance')($localStorage.currentLocation.lat,$localStorage.currentLocation.long,prepareBizData.nodes[a].node.geocode_lat,prepareBizData.nodes[a].node.geocode_long,"N");
	 	}   
	    sortBusinessesByDistance(prepareBizData,funNane);
	}
	/**
	 * Sort bussiness according to user location.
	 */
	function sortBusinessesByDistance(sortBizData,funNane) {
		var sortedBizData = sortBizData;
	   	for (a=0;a<sortedBizData.nodes.length;a++){
	   		for (b=a+1;b<sortedBizData.nodes.length;b++){
	   			bsA=sortedBizData.nodes[a].node;
	   			bsB=sortedBizData.nodes[b].node;
	   			if (bsA.distance>bsB.distance){
	   				tmp=sortedBizData.nodes[a].node;
	   				sortedBizData.nodes[a].node=bsB;
	   				sortedBizData.nodes[b].node=tmp;
	   			}
	   		}
	   	}
	   	if(funNane == 'getBusinesses'){
	   		businesses = sortedBizData;
	   	}
	   	if(funNane == 'searchBusinesses'){
	   		searchedBiz = sortedBizData;
	   	}
	   	else{
	   		searchedBizDetails = sortedBizData;
	   	}
	   	
	}	
	/**
	 * add business to backend.
	 */
	function addBiz(newBizData) {
			
		var defer = $q.defer();
		NodeResource.create(newBizData).success(function (data) {
			console.log(data);
		    defer.resolve(data);
	    }).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}	
	/**
	 * get business details to backend.
	 */
	function businessDetails(bid) {
			
		var defer = $q.defer();
		NodeResource.retrieve({nid:bid}).success(function (data) {
	
		    defer.resolve(data);
	    }).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}	
	/**
	 * get searched business details to backend.
	 */
	function searchedBusinessDetails(bid) {
			
		var defer = $q.defer();
		if($rootScope.lastSearchedBiz != bid){
			DataService.fetchSearchedBusinessDetails(bid).success(function (data) {
				//searchedBizDetails = data;
				
				$rootScope.lastSearchedBiz = bid;
				saveBizDistance(data,'searchedBusinessDetails');     
				defer.resolve(searchedBizDetails);
		    }).catch(function (error) {
			    defer.reject(error);
			});
		}else{
			defer.resolve(searchedBizDetails);
		}
		
	    return defer.promise;
	}	
	/**
	 * update business to backend.
	 */
	function editBiz(updateData) {
			
		var defer = $q.defer();
		NodeResource.update(updateData).success(function (data) {
			console.log(data);
		    defer.resolve(data);
	    }).catch(function (error) {
		    defer.reject(error);
		});
	    return defer.promise;
	}
	/**
	 * Search businesse from backend.
	 */
	function searchBusinesses(bizName){
		var defer = $q.defer();
		if($rootScope.lastSearchName != bizName){
			DataService.fetchSearchedBusinesses(bizName).success(function (data) {
		        //searchedBiz = data;
		        $rootScope.lastSearchName = bizName;
		        saveBizDistance(data,'searchBusinesses');
		        defer.resolve(searchedBiz);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(searchedBiz);
		}
        return defer.promise;
	}
	/**
	 * Filter businesse from backend.
	 */
	function filterBusinesses(filterData){
		var defer = $q.defer();

			DataService.fetchFilteredBusinesses(filterData).success(function (data) {
		        //filteredBiz = data;
		        saveBizDistanceFilter(data,filterData);
		        defer.resolve(filteredBiz);
		    }).catch(function (error) {
		        defer.reject(error);
		    });
        return defer.promise;
	}
	/**
	 * Add distance field to the populated business data.
	 */
	function saveBizDistanceFilter(bizData,filterData) {
	    var prepareBizData = bizData;
	   	for (a=0;a<prepareBizData.nodes.length;a++){
	 		prepareBizData.nodes[a].node.distance = $filter('distance')($localStorage.currentLocation.lat,$localStorage.currentLocation.long,prepareBizData.nodes[a].node.geocode_lat,prepareBizData.nodes[a].node.geocode_long,"N");
	 		prepareBizData.nodes[a].node.status = $filter('getStatus')(prepareBizData.nodes[a].node.hours);
	 	}   
	 	//sortBusinessesByDistanceFilter(prepareBizData,filterData);
	 	filteredBiz = prepareBizData;
	}

	/**
	 * Filter bussiness according to givern fileter criteria.
	 */
	function sortBusinessesByDistanceFilter(sortBizData,filterData) {
		var sortedBizData = sortBizData;
		var sortedBizData1 = {nodes:[]};
	   	for (a=0;a<sortedBizData.nodes.length;a++){
	   		if($filter('getStatus')(sortedBizData.nodes[a].node.hours) == 'closed'){
	   			sortedBizData1.nodes.push(sortedBizData.nodes[a]);
	   		}
	   	}
	   	filteredBiz = sortedBizData1;
	}
});

/**
 * myAccountService :
 */
OBizR.service('myAccountService', function($q,$http,DrupalApiConstant,DataService) {
	var myAccountService = {
		  getMyFriends: getMyFriends,
		  getMyFollowers:getMyFollowers,
		  getMyFollowings:getMyFollowings,
		  getMyMessages:getMyMessages,
		  getMyBookmarks:getMyBookmarks
	};
	var myFriends = null;
	var myFollowers = null;
	var myFollowings = null;
	var myMessages = null;
	var myBookmarks = null;	
	var lastFetched = null;
	
	return myAccountService;
////////////////////////////////////////////////////////////////////////////////

	/**
	 * Get my friends from backend.
	 */
	function getMyFriends(uid) {
		var defer = $q.defer();
		if (myFriends == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyFriends(uid).success(function (data) {
		       myFriends = data;
		        defer.resolve(myFriends);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFriends);
		}
        return defer.promise;
	}

	/**
	 * Get my Followers from backend.
	 */
	function getMyFollowers(uid) {
		var defer = $q.defer();
		if (myFollowers == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchFollowers(uid).success(function (data) {
		        myFollowers = data;
		        defer.resolve(myFollowers);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFollowers);
		}
        return defer.promise;
	}
	/**
	 * Get my Followings from backend.
	 */
	function getMyFollowings(uid) {
		var defer = $q.defer();
		if (myFollowings == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyFollowings(uid).success(function (data) {
		        myFollowings = data;
		        defer.resolve(myFollowings);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFollowings);
		}
        return defer.promise;
	}
	/**
	 * Get my Messages from backend.
	 */
	function getMyMessages(uid) {
		var defer = $q.defer();
		if (myMessages == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyMessages(uid).success(function (data) {
		         myMessages = data;
		         defer.resolve(myMessages);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myMessages);
		}
        return defer.promise;
	}
	/**
	 * Get my Bookmarks from backend.
	 */
	function getMyBookmarks() {
		var defer = $q.defer();
		if (myBookmarks == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyBookmarks().success(function (data) {
		         myBookmarks = data;
		         defer.resolve(myBookmarks);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myBookmarks);
		}
        return defer.promise;
	}
});
