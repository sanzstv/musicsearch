(function(){
	'use strict';
 
	angular.module('MusicSearchApp',[])
	.controller('MusicSearchController', MusicSearchController)
	.service('MusicSearchService', MusicSearchService)
	.constant('API_BASE', "https://api.spotify.com");

	var api_id;
    var api_secret;
    var access_token;
    var auth_code;
    $.getJSON("config.json", function (data) {
    	api_id=data.SPOTIFY_CLIENT_ID;
    	api_secret=data.SPOTIFY_CLIENT_SECRET;
    });

	MusicSearchController.$inject = ["$http", 'MusicSearchService'];
	function MusicSearchController($http, MusicSearchService){
	    /*Authenticate user*/
	    $http({
	    	url: ("https://accounts.spotify.com/authorize"),
	    	params: { 
	    		client_id: api_id,
	    		redirect_uri: "http://localhost/",
	    		response_type: "code"
	    	}
	    }).then(function(response){
	    	auth_code = response.code;
	    });

		/*Now receive access token from Spotify API*/
		console.log(auth_code);
		var artists = this;
		artists.query = "";
		artists.matches = [];
		artists.message = "";
		artists.search = function(){
			if(artists.query){
				var promise = MusicSearchService.getArtist(artists.query);
				promise.then(function(response){
					artists.matches = response;
					if (artists.matches.length == 0){
						artists.message = "No matches for \""+ artists.query +"\" ";
					}
					else{
						artists.message = "All results for \""+ artists.query +"\" (" +artists.matches.length +" results)";
					}
				});
			}
			else{
				artists.message = "Please enter a search string.";
			}
		};


	}
	MusicSearchService.$inject =["$http", "API_BASE"];
	function MusicSearchService($http, API_BASE){
		var service = this;
		//find items from API and return matches
		service.getArtist = function(query){
			console.log(access_token);
			/*return $http({
				method: "GET",
				url: (API_BASE + "/search"),
				headers: {
				    'Authorization': 'Bearer ' + access_token
				},
				params: {
					q: query, 
					type: "artist"
				}
			}).then(function (result) {
			    var response = result.data;
			    console.log(response);
			    return response.filter(function(item){
				    return item !== -1;
				});
			
			});*/
		};
	}




})();