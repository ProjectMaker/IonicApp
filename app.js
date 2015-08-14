// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('ionicApp', ['ionic','ngRoute']);

app.factory('favoryService', function() {
	var countries = [{code:'FR', label: 'France'}, {code: 'IR', label: 'Irlande'}];
	var cities = [{code:'PA', label: 'Paris'}, {code: 'DJ', label: 'Dijon'}];
	
	return {
		all: function() { return countries; },
		allCities: function() {
			return cities;
		},
		
		getNbFavoryByCountry: function(countryCode) {
			return 2;
		},
		
		getNbFavoryByCity: function(cityCode) {
			return 2;
		}
	};
	
});

app.controller('MenuNavBarCtrl', 
		["$scope",
		 "$ionicSideMenuDelegate", 
	function($scope, $ionicSideMenuDelegate) {
		$scope.openMenu = function () {
			console.log('openMenu');
			$ionicSideMenuDelegate.toggleLeft();
			
		};
		
		
		$scope.openFormFavori = function() {
			$ionicSideMenuDelegate.toggleRight();
		}
	}
]);

app.controller('TabsFavoryCtrl',
		["$scope",
		 "$rootScope",
		 "$state",
		 "$location",
	function($scope,$rootScope,$state,$location) {
		$scope.disabledBack = function() { 
			if ( ['/favory/localisation','/favory/event'].indexOf($location.path()) >= 0 ) return true;
			
			return false;
		}
		
		$scope.goBack = function() {
			if ( $rootScope.regex.pathFavoryCityGoBack.test($location.path()) )
				$state.go('favory.localisation');
		}
	}
]);
app.controller('CountryCtrl', 
		["$scope",
		 "favoryService", 
	function($scope,favoryService) {
		$scope.favoryService = favoryService;
		
		$scope.openCountry = function() { console.log('openCountry'); };
	}
]);

app.controller('CityCtrl', 
		["$scope",
		 "favoryService", 
	function($scope,favoryService) {
		$scope.favoryService = favoryService;
	}
]);

app.run(function($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleLightContent();
	    }
	});
  
	$rootScope.regex = {
		pathFavoryCityGoBack: new RegExp(/favory\/localisation\/[a-z0-9]+\/city/i)	
			  
	}
})

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/favory/localisation');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('favory', {
    	url: '/favory',
    	templateUrl: 'templates/tabs-favory.html',
    	controller: 'TabsFavoryCtrl',
    	abstract: true
    })
    .state('favory.localisation', {
    	url: '/localisation',
    	views: {
    		'favory-localisation': {
    			templateUrl: 'templates/country.html',
    			controller: 'CountryCtrl'
    		}
    	}
    })
  	.state('favory.localisation-city', {
    	url: '/localisation/:code/city',
    	views: {
  			'favory-localisation': {
		  		templateUrl: 'templates/city.html',
		    	controller: 'CityCtrl'
  			}
  		}
    	
    })
    .state('favory.event', {
    	url: '/event',
    	views: {
  			'favory-event': {
		  		templateUrl: 'templates/form-favory.html'
  			}
  		}
    	
    })
    .state('favoryform', {
    	url: '/favory/form',
    	templateUrl: 'templates/form-favory.html'
    });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/');

});
