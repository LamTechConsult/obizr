;
(function () {
  'use strict';
  angular
    .module('OBizR.config', ['d7-services.commons.configurations', 'd7-services.commons.http.configurations'])
    .config(configFunction);
    configFunction.$inject = ['DrupalApiConstant'];

    /** @ngInject */
    function configFunction(DrupalApiConstant) {
      DrupalApiConstant.filesPath = "sites/default/files";
      DrupalApiConstant.LocalFilesPath = "assets/img/";
      //drupal services configurations
      //DrupalApiConstant.drupal_instance = 'http://localhost/2016slbrapp/ionic-d7/slbizreviewslinode/docroot/';
      //DrupalApiConstant.drupal_instance = 'http://slbizreviewslinode.local/';
      //DrupalApiConstant.api_endpoint += 'v1/slbiz/';
      //DrupalApiConstant.drupal_instance = 'http://dev.openbiz.slbr.sl/';
      DrupalApiConstant.drupal_instance = 'http://obizr.io/';
      //DrupalApiConstant.drupal_instance =  'http://dev.openbiz.slbr.sl/'; //'http://localhost/D7-testing/';
      DrupalApiConstant.api_endpoint += 'v1/';
    }
})();
