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

