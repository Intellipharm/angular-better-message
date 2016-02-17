(function() {

    "use strict";

    //----------------------------------
    // Angular Better Message
    //----------------------------------

    angular.module('AngularBetterMessage', []);

})();

angular.module("AngularBetterMessage", []).run(["$templateCache", function($templateCache) {$templateCache.put("html/angular-better-message.html","<div class=\"angular-better-message\" ng-class=\"[state, outer_prompt_class]\" ng-show=\"is_visible\"><div ng-class=\"message_class\"><span ng-class=\"message_icon_class\"></span> <span class=\"angular-better-message-wrapper\"></span> <span class=\"countdown\" ng-if=\"show_count_down\">{{count_down}}</span></div><div ng-if=\"prompt\" ng-class=\"prompt_class\"><button ng-class=\"prompt_button_class\" ng-click=\"ctrl.onClick()\">{{prompt}} <span ng-class=\"prompt_icon_class\"></span></button></div></div>");}]);
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

(function() {

    "use strict";

    //----------------------------------
    // angular-better-message directive
    //----------------------------------

    var directive = function(
        $window,
        $timeout,
        $compile,
        MESSAGE_CLASS,
        PROMPT_CLASS,
        HAS_PROMPT_CLASS
    ) {

        function getPosition(element) {
            var xPosition = 0;
            var yPosition = 0;

            while(element) {
                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
            return { x: xPosition, y: yPosition };
        }

        return {
            restrict: 'EA',
            scope: {
                api:                    "=",
                message:                "=", // will be passed back on events
                state:                  "=", // will be passed back on events
                key:                    "=", // will be passed back on events
                data:                   "=", // will be passed back on events
                message_icon_class:     "=messageIconClass",
                prompt:                 "=",
                prompt_button_class:    "=promptButtonClass",
                prompt_icon_class:      "=promptIconClass",
                display_seconds:        "=displaySeconds",
                show_count_down:        "=showCountDown",
                fixed_position_on_scroll: "=fixedPositionOnScroll",
                onClick:                "&onPromptClick"
            },
            controller: "AngularBetterMessageCtrl as ctrl",
            link: function(scope, element, attrs, controller) {

                var api = scope.api || {};

                // classes
                scope.message_class = MESSAGE_CLASS;
                scope.prompt_class = PROMPT_CLASS;

                // control
                var wait_timer;
                var element_visible_timer;
                var element_top;
                scope.is_visible = false;

                // fix on scroll
                var detached_position;
                var window_element = angular.element($window);

                //--------------------------------------------------------
                // api
                //--------------------------------------------------------

                api.close = function() {
                    scope.close();
                };

                api.update = function() {
                    scope.update();
                };

                //--------------------------------------------------------
                // utils
                //--------------------------------------------------------

                /**
                 * close
                 */
                scope.close = function() {
                    scope.is_visible = false;
                };

                /**
                 * wait
                 */
                scope.wait = function() {

                    wait_timer = $timeout(function() {

                        if (--scope.count_down === 0) {
                            $timeout.cancel(wait_timer);
                            scope.close();
                        } else {
                            scope.wait();
                        }
                    }, 1000);
                };

                /**
                 * checkPosition
                 */
                scope.checkPosition = function() {

                    // element is visible & is not detached & is not ready
                    if (scope.is_visible && !element.hasClass('detached') && _.isNull(element[0].offsetParent)) {

                        // wait
                        element_visible_timer = $timeout(scope.checkPosition, 100);
                    } else {

                        // get element top offset
                        element_top = element[0].getBoundingClientRect().top;

                        // update
                        scope.updateDetached();
                    }
                };

                /**
                 * updateDetached
                 */
                scope.updateDetached = function() {

                    // cancel timer
                    $timeout.cancel(element_visible_timer);

                    // element is not detached and is at the top of viewport, then detach
                    if (!element.hasClass('detached') && element_top <= 0 && $window.pageYOffset > 0) {
                        detached_position = $window.pageYOffset;
                        element.addClass('detached');
                    }
                    // element is detached and is at or above detached position, then attach
                    else if (element.hasClass('detached') && !_.isUndefined(detached_position) && $window.pageYOffset <= detached_position) {
                        //detached_position = undefined;
                        element.removeClass('detached');
                    }
                };

                /**
                 * update
                 */
                scope.update = function() {

                    // set visibility
                    scope.is_visible = true;

                    // check position
                    if (scope.fixed_position_on_scroll) {
                        scope.checkPosition();
                    }

                    // reset count down
                    scope.count_down = _.parseInt(scope.display_seconds);

                    // stop timeout
                    $timeout.cancel(wait_timer);

                    // auto close after interval
                    if (!_.isUndefined(scope.count_down) && scope.count_down !== 0) {

                        // start wait
                        scope.wait();

                        // set outer promt class
                        scope.outer_prompt_class = HAS_PROMPT_CLASS;
                    }
                };

                //--------------------------------------------------------
                // watchers
                //--------------------------------------------------------

                scope.$watch('display_seconds', function(val) {

                    if (!_.isUndefined(val) && val !== "") {
                        scope.display_seconds = _.parseInt(val);
                        scope.count_down = _.parseInt(val);
                    }
                });

                scope.$watch('message', function(val) {
                    var wrapper = angular.element(element[0].querySelector('.angular-better-message-wrapper'));
                    wrapper.empty();

                    if (!_.isUndefined(val) && val !== "") {
                        var compiled_message = $compile('<span>' + val + '</span>')(scope.$parent.$parent);
                        wrapper.append(compiled_message);

                        scope.update();
                    } else {
                        $timeout.cancel(wait_timer);
                        scope.close();
                    }
                });

                scope.$watch('prompt', function(val) {

                    // set outer promt class
                    if (!_.isUndefined(val) && val !== "") {
                        scope.outer_prompt_class = HAS_PROMPT_CLASS;
                    } else {
                        scope.outer_prompt_class = "";
                    }
                });

                //--------------------------------------------------------
                // events
                //--------------------------------------------------------

                // window scroll

                if (scope.fixed_position_on_scroll) {
                    window_element.on('scroll', function() {
                        if (!_.isUndefined(scope.message) && scope.message !== "") {

                            // check position
                            scope.checkPosition();
                        }
                    });
                }
            },
            replace: true,
            templateUrl: 'html/angular-better-message.html'
        };
    };

    directive.$inject = [
        '$window',
        '$timeout',
        '$compile',
        'ANGULAR_BETTER_MESSAGE_CLASS',
        'ANGULAR_BETTER_MESSAGE_PROMPT_CLASS',
        'ANGULAR_BETTER_MESSAGE_HAS_PROMPT_CLASS'
    ];

    angular.module('AngularBetterMessage')
        .directive('angularBetterMessage', directive);

})();

(function () {

    "use strict";

    //-------------------------
    // Angular Better Message settings
    //-------------------------

    angular.module('AngularBetterMessage')
        .constant('ANGULAR_BETTER_MESSAGE_CLASS',               "message")
        .constant('ANGULAR_BETTER_MESSAGE_PROMPT_CLASS',        "prompt")
        .constant('ANGULAR_BETTER_MESSAGE_HAS_PROMPT_CLASS',    "has-prompt");

})();
