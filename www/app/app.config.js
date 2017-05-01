;
(function () {
  'use strict';
  angular
    .module('NPSL.config', ['d7-services.commons.configurations', 'd7-services.commons.http.configurations'])
    .config(configFunction);
    configFunction.$inject = ['DrupalApiConstant'];

    /** @ngInject */
    function configFunction(DrupalApiConstant) {
      DrupalApiConstant.filesPath = "sites/default/files";
      DrupalApiConstant.LocalFilesPath = "assets/img/";
      DrupalApiConstant.drupal_instance = 'http://slbr.sl/';
      DrupalApiConstant.api_endpoint += 'v1/';
    }
})();
