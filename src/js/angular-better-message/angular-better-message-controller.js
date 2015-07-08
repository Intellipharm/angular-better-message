(function () {

    "use strict";

    //-------------------------
    // Angular Better Message controller
    //-------------------------

    var controller = function ($s) {

        /**
         * onClick
         */
        this.onClick = function() {
            if (!_.isUndefined($s.onClick)) {
                $s.onClick();
            }
            $s.close();
        };
    };

    controller.$inject = ['$scope'];

    angular.module('AngularBetterMessage').controller('AngularBetterMessageCtrl', controller);

})();
