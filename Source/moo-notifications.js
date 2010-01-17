
var NotificationCenter = new(new Class({
	observers: {
		'*': []
	},

	addObserver: function(notification, callback) {
		if (this.observers[notification]) {
			this.observers[notification].push(callback);
		} else {
			this.observers[notification] = [callback];
		}
		if (notification != '*') this.observers['*'].push(callback);
	},

	postNotification: function(notification, message) {
		if (this.observers[notification] || notification === '*') {
			this.observers[notification].each(function(observer) {
				observer(message);
		});
	}

}))();
