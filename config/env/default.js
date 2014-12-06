'use strict';


module.exports = {
	app: {
		title: 'ShortcutJunkie',
		description: 'The stackoverflow of neat keyboard tricks!',
		keywords: 'shortcuts',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
