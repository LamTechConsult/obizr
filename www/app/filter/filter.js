
OBizR.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail);
  };
});

// Setup the filter
OBizR.filter('ratingClass', function() {

  // Create the return function
  return function(rating) {

    if(angular.isUndefined(rating)){
      return 'grey';
    }
    // Ensure that the passed in data is a number
    numRating = parseInt(rating);
    if(numRating == 20 || numRating == 40 || numRating == 1 || numRating == 2){
      return 'red';
    }
    if(numRating == 60 | numRating == 3) {
      return 'yellow';
    } 
    else {
       return;
    }
  }
});

// Setup the filter
OBizR.filter('rating', function() {

  // Create the return function
  return function(rating) {
    if(angular.isUndefined(rating)){
      return '0';
    }
    // Ensure that the passed in data is a number
    numRating = parseInt(rating);
    if(numRating >= 20) {
      return numRating/20;
    } else {
       return numRating;
    }
  }
});

// Setup the filter
OBizR.filter('ratingPercentage', function() {

  // Create the return function
  return function(rating) {
    if(angular.isUndefined(rating)){
      return '0%';
    }else{
      return rating+'%';
    }
  }
});

// Setup the filter
OBizR.filter('distance', function() {

  // Create the return function
  return function(lat1, lon1, lat2, lon2, unit) {
    //console.log("lat1: "+lat1+"lon1: "+lon1+"lat2 :"+lat2+"lon2 :"+lon2+"unit :"+unit);
    if (lat1==0 || lon1==0){
      return 0;
    }
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344; }
    if (unit=="N") { dist = dist * 0.8684; }
    dist=parseFloat(Math.round(dist * 100) / 100);
    return dist;
  }
});

// Setup the time format
OBizR.filter('getTimeFormat', function() {

  // Create the return function
  return function(hours) {
    if(angular.isUndefined(hours) || hours == ''){
      return ' : 00:00';
    }
    var val = hours.split('-');
    return val[1]+'-'+val[2];
  }
});

// Setup the time format
OBizR.filter('getStatus', function() {

  // Create the return function
  return function(hours) {
    if(angular.isUndefined(hours) || hours == ''){
      return '';
    }
    var val = hours.split('-');
    //var status = val[0].split(' ');
    return val[0];
  }
});

// Setup the getSelectedKeyword filter
OBizR.filter('getSelectedKeyword', function() {

  // Create the return function
  return function(niddle,keyword) {
    if(angular.isUndefined(keyword) || keyword == ''){
      return '';
    }
    var keyName = false;
    angular.forEach(keyword, function(value, key) {
      if(value.keyword.id == niddle){
        keyName = value.keyword.keyword
        console.log(value.keyword.keyword);
      }
      
    });
    if(keyName)
    return keyName;
    return keyName;
  }
});
// Setup the getSelectedCategory filter
OBizR.filter('getSelectedCategory', function() {

  // Create the return function
  return function(niddle,category) {

    if(angular.isUndefined(category) || category == ''){
      return '';
    }

    var catName = false;
    angular.forEach(category, function(value, key) {
      if(value.node.categoryid == niddle){
        catName = value.node.name
        console.log(value.node.name);
      }
      
    });
    if(catName)
    return catName;
    return catName;
  }
});
// Setup custom business filter
OBizR.filter('customBizFilter', function() {

  // Create the return function
  return function(biz,filterCriteria) {

    if(biz.length == 0){
      return '';
    }

    var filterRes = [];
    angular.forEach(biz, function(value, key) {
      console.log(value.node)
      //this.push(value.node);
    }, filterRes);
    return filterRes;
  }
});