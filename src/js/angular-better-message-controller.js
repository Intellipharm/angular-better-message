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

                var message = !_.isUndefined($s.message) ? $s.message : null;
                var state = !_.isUndefined($s.state) ? $s.state : null;
                var key = !_.isUndefined($s.key) ? $s.key : null;
                var data = !_.isUndefined($s.data) ? $s.data : null;

                $s.onClick({message: message, state: state, key: key, data: data});
            }
            $s.close();
        };
    };

    controller.$inject = ['$scope'];

    angular.module('AngularBetterMessage').controller('AngularBetterMessageCtrl', controller);

})();
