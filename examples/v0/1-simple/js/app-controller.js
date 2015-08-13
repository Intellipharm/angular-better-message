(function () {

    "use strict";

	//-------------------------
	// App Controller
	//-------------------------

	var controller = function ($s, MessageService) {
        var self = this;
        var count = 0;

        this.angular_better_message_api = {};
        this.better_message = MessageService.getMessageConfig();

        this.onEnd = function() {
            self.angular_better_message_api.close();
        };

        this.onChange = function() {
            count++;
            switch (count) {
                case 1:
                    self.better_message = MessageService.getMessageConfig('undo');
                    break;
                case 2:
                    self.better_message = MessageService.getMessageConfig('undo');
                    self.angular_better_message_api.update(); // must call update becasue message has not changed
                    break;
                case 3:
                    self.better_message = MessageService.getMessageConfig('undo');
                    self.angular_better_message_api.update(); // must call update becasue message has not changed
                    break;
                case 4:
                    self.better_message = MessageService.getMessageConfig('invalid');
                    break;
                case 5:
                    self.better_message = MessageService.getMessageConfig('invalid');
                    self.angular_better_message_api.update(); // must call update becasue message has not changed
                    break;
                case 6:
                    self.better_message = MessageService.getMessageConfig('saving');
                    break;
                case 7:
                    self.better_message = MessageService.getMessageConfig('saved');
                    break;
                case 8:
                    self.better_message = MessageService.getMessageConfig('required');
                    break;
                case 9:
                    self.better_message = MessageService.getMessageConfig('invalid');
                    break;
                case 10:
                    self.better_message = MessageService.getMessageConfig('info', "Hello");
                    break;
                case 11:
                    self.better_message = MessageService.getMessageConfig('info', "Hello again");
                    count = 0;
                    break;
            }
        };

        this.onPromptClick = function(message, state, key) {
            console.log("Prompt Click Handler Called");
            console.log("message: "+message);
            console.log("state: "+state);
            console.log("key: "+key);
        };
	};

	controller.$inject = ['$scope', 'AngularBetterMessageHelperService'];

	angular.module('App').controller('AppController', controller);

})();
