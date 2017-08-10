(function(){
	'use strict';
	angular.module('MusicSearchApp', ['elasticsearch'],
  	['$locationProvider', function($locationProvider) {
    	$locationProvider.html5Mode(true);
  	}])
	.controller('MusicSearchController', MusicSearchController)
	.factory('MusicService', MusicService);

	MusicSearchController.inject('$scope', '$location');
	function MusicSearchController($scope, $location){
		/*initially for testing*/
		var options = [
			"Sonic Youth",
			"Joy Division",
			"Nine Inch Nails",
			"The Velvet Underground",
			"Siouxsie and the Banshees",
			"Nick Cave and the Bad Seeds",
			"Cocteau Twins",
			"Radiohead",
			"Talking Heads",
			"Aphex Twin",
			"My Bloody Valentine"
		];

		var start = Math.floor(Math.random() * options.length);

		$scope.results=[];
		$scope.searchQuery = $location.search().q || options[start];
		$scope.search = function() {
			$scope.results = [];
			$location.search({'q': $searchQuery});
			$scope.page = 0;
		};
	}

	MusicService.inject('$q', '$location', 'esFactory');
	function MusicService($)
})();