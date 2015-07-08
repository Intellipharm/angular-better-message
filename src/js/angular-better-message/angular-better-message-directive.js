(function() {

    "use strict";

    //----------------------------------
    // angular-better-message directive
    //----------------------------------

    var directive = function(
        $window,
        $timeout,
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
                state:                  "=state",
                message:                "=message",
                message_icon_class:     "=messageIconClass",
                prompt:                 "=prompt",
                prompt_button_class:    "=promptButtonClass",
                prompt_icon_class:      "=promptIconClass",
                display_seconds:        "=displaySeconds",
                show_count_down:        "=showCountDown",
                fixed_position_on_scroll: "=fixedPositionOnScroll",
                onClick:                "&onPromptClick"
            },
            controller: "AngularBetterMessageCtrl as ctrl",
            link: function(scope, element, attrs, controller) {

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

                    // get element top offset
                    element_top = element[0].getBoundingClientRect().top;

                    // if element is not visible yet (we can't calculate it's position)
                    if (element_top === 0 && $window.pageYOffset > 0 && _.isNull(element[0].offsetParent)) {

                        // update after timeout
                        element_visible_timer = $timeout(scope.updateDetached, 1);
                    } else {

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
                    // TODO: incase current does not work
                    // if (!element.hasClass('detached') && _.parseInt(getPosition(element[0]).y) <= 0 && $window.pageYOffset > 0) {
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

                    if (!_.isUndefined(val) && val !== "") {

                        // check position
                        if (scope.fixed_position_on_scroll) {
                            scope.checkPosition();
                        }

                        // reset count down
                        scope.count_down = _.parseInt(scope.display_seconds);

                        // stop timeout
                        $timeout.cancel(wait_timer);

                        // set visibility
                        scope.is_visible = true;

                        // auto close after interval
                        if (!_.isUndefined(scope.count_down) && scope.count_down !== 0) {

                            // start wait
                            scope.wait();

                            // set outer promt class
                            scope.outer_prompt_class = HAS_PROMPT_CLASS;
                        }
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
        'ANGULAR_BETTER_MESSAGE_CLASS',
        'ANGULAR_BETTER_MESSAGE_PROMPT_CLASS',
        'ANGULAR_BETTER_MESSAGE_HAS_PROMPT_CLASS'
    ];

    angular.module('AngularBetterMessage')
        .directive('angularBetterMessage', directive);

})();
