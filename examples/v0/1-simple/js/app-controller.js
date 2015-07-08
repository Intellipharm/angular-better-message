(function () {

    "use strict";

	//-------------------------
	// App Controller
	//-------------------------

	var controller = function ($s, MessageService) {
        var self = this;
        var count = 0;

        this.better_message = MessageService.getMessageConfig();

        this.onChange = function() {
            count++;
            switch (count) {
                case 1:
                    self.better_message = MessageService.getMessageConfig('info', "Hello you");
                    break;
                case 2:
                    self.better_message = MessageService.getMessageConfig('saving');
                    break;
                case 3:
                    self.better_message = MessageService.getMessageConfig('saved');
                    break;
                case 4:
                    self.better_message = MessageService.getMessageConfig('required');
                    break;
                case 5:
                    self.better_message = MessageService.getMessageConfig('invalid');
                    break;
                case 6:
                    self.better_message = MessageService.getMessageConfig('undo');
                    count = 0;
                    break;
            }
        };

        this.onPromptClick = function() {
            console.log("Prompt Click Handler Called");
        };
	};

	controller.$inject = ['$scope', 'AngularBetterMessageHelperService'];

	angular.module('App').controller('AppController', controller);

})();
