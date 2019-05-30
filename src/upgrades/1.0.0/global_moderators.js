'use strict';

var async = require('async');

module.exports = {
	name: 'Creating Global moderators group',
	timestamp: Date.UTC(2016, 0, 23),
	method: function (callback) {
		var groups = require('../../groups');
		async.waterfall([
			function (next) {
				groups.exists('Global Maintainer', next);
			},
			function (exists, next) {
				if (exists) {
					return next(null, null);
				}
				groups.create({
					name: 'Global Maintainer',
					userTitle: 'Global Moderator',
					description: 'Forum wide moderators',
					hidden: 0,
					private: 1,
					disableJoinRequests: 1,
				}, next);
			},
			function (groupData, next) {
				groups.show('Global Maintainer', next);
			},
		], callback);
	},
};
