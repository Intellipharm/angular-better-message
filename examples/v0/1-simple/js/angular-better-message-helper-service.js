(function () {

    "use strict";

    //-------------------------
    // Angular Better Message Helper service
    //-------------------------

    var service = function () {

        this.INFO       = 'info';
        this.SUCCESS    = 'success';
        this.ERROR      = 'error';
        this.WARNING    = 'warning';
        this.SAVING     = 'saving';
        this.SAVED      = 'saved';
        this.REQUIRED   = 'required';
        this.INVALID    = 'invalid';
        this.DELETE     = 'delete';

        var default_config = {
            message: "",
            state: "",
            prompt: "",
            icon_class: "",
            prompt_icon_class: "fa fa-chevron-right",
            prompt_button_class: "btn",
            show_count_down: false,
            display_seconds: 1,
        };

        var config = {
            'info': {
                message: "",
                state: "info"
            },
            'success': {
                message: "",
                state: "success"
            },
            'error': {
                message: "",
                state: "danger"
            },
            'warning': {
                message: "",
                state: "warning"
            },
            'saving': {
                message: "Saving",
                state: "info",
                icon_class: "fa fa-cog fa-spin"
            },
            'saved': {
                message: "Successfully Saved",
                state: "success",
                icon_class: "fa fa-check"
            },
            'required': {
                message: "Please complete all required fields",
                state: "warning"
            },
            'invalid': {
                message: "Some items are not complete",
                state: "warning",
                icon_class: "fa fa-exclamation-triangle",
                prompt: "Continue Anyway",
                prompt_button_class: "btn btn-warning",
                prompt_icon_class: "fa fa-chevron-right",
                display_seconds: 0 // don't auto close
            },
            'undo': {
                message: "This item will be permanently deleted in",
                state: "danger",
                icon_class: "fa fa-exclamation-triangle",
                prompt: "Undo",
                prompt_button_class: "btn btn-warning",
                prompt_icon_class: "fa fa-undo",
                display_seconds: 5,
                show_count_down: true
            }
        };

        /**
         * getMessageConfig
         *
         * @param  {string} key
         * @param  {string} message
         * @return {object}
         */
        this.getMessageConfig = function(key, message) {

            // get default config
            var result = _.clone(default_config);

            // get specific config
            if (!_.isUndefined(key) && _.has(config, key)) {
                result = _.merge(result, _.clone(config[key]))
                result.key = key;
            }

            // override message
            if (!_.isUndefined(message)) {
                result.message = message;
            }

            return result;
        };
    };

    service.$inject = [];

    angular.module('App').service('AngularBetterMessageHelperService', service);

})();
