(function(){
	'use strict';
	var Spotify = require('spotify-web-api-js');
	var s = new Spotify();
	var spotifyApi = new SpotifyWebApi();
	/*spotifyApi.setAccessToken('');*/

	angular.module('MusicSearchApp', [])
	.controller('MusicSearchController', MusicSearchController)
	.factory('MusicService', MusicService);

	MusicSearchController.$inject = ['$scope', '$location'];
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

			spotifyApi.searchArtists('Hole')
			  .then(function(data) {
			    console.log('Search artists by "Love"', data);
			  }, function(err) {
			    console.error(err);
			  });
	}

})();