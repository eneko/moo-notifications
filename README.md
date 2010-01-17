NotificationCenter
==================

NotificationCenter handles messages and distributes them to all observers.

How to use
----------

NotificationCenter facilitates communications between classes or plugins that do not know about each other.

When a class posts a notification, all observers are notified. The object posting the notification does not need to know anything about the observers.

	var MyTabController = new Class({
		// Tab controller code here
		activateTab: function(tab) {
			// set styles, etc
			NotificationCenter.postNotification('TabActivated', { controller: this, tab: tab });
		}
	});

An object can add itself as an observer for a notification by passing a callback function that will be executed when another object posts that notification.

	var MyVideoPlayer = new Class({
		initialize: function() {
			// Video player code here
			NotificationCenter.addObserver('TabActivated', function(message) {
				if (message.tab.id === '#video') {
					this.restartPlayer();
				}
			})
		}
	});

An object can post notifications to all listeners using the wildcard '*'. Additionaly, an object can observe all notifications using the '*' wildcard.

	var MyBroadcaster = new Class({
		initialize: function() {
			// Notify all observers
			NotificationCenter.postNotification('*', {msg: 'Broadcaster initialized!'});
		}
	});
	
	var MySpy = new Class({
		initialize: function() {
			NotificationCenter.addObserver('*', this.logNotification.bind(this));
		},
		logNotification: function(message) {
			console.dir(message);
		}
	});
