require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv.slice(2,3);
var medArray = process.argv.slice(3);
var media = medArray.join(" ");

function switchStuff(command, media) {
    switch (command) {

        case 'spotify-this-song':
            spotifyThis(media); break;
        case 'movie-this':
            movieThis(media); break;
        case 'concert-this':
            concertThis(media); break;
        case 'do-what-it-says':
            doWhatItSays(); break;
    }
};

 // Not currently functioning, unsure why //
function spotifyThis(media) {
    if (media == "") {
        media = "The Sign"
    }

    spotify
        .search({ type: 'track', query: media, limit: 1 })
        .then(function (response) {
            var song = response.tracks.items[0];
            if (song != undefined) {
                console.log("Song: " + song.name);
                console.log("Artist: " + song.artists.name);
                console.log("Song Preview: " + song.external_urls.spotify);
                console.log("Album: " + song.album.name);
            } else {
                console.log("Song is Unavailable")
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis(media) {
    if (media == "") {
        media = "Mr. Nobody"
    }

    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + media, function (err, response, data) {
        try {
            var response = JSON.parse(data)
            if (response.Title != undefined) {
                console.log(response.Title);
                console.log(response.Year);
                console.log(response.Ratings[0].Value);
            } else {
                console.log("Movie Unavailable");
            }
        }
        catch (err) {
            console.log("Movie Unavailable");
        }
    });
}



switchStuff(command, media);