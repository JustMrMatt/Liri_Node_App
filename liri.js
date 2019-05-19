require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv.slice(2,3);
var medAr = process.argv.slice(3);
var media = medAr.join(" ");

function switchStuff(command, media) {
    switch (command) {

        case 'spotify-this-song':
            spotifyThisSong(media); break;
        case 'movie-this':
            movieThis(media); break;
        case 'concert-this':
            concertThis(media); break;
        case 'do-what-it-says':
            doWhatItSays(); break;
    }
};

function spotifyThisSong(media) {
    if (media == "") {
        media = "The Sign"
    }

    spotify
        .search({ type: 'track', query: media, limit: 1 }).then(
        function (input) {
            var song = input.tracks.items[0];
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

    axios.get("http://www.omdbapi.com/?t="+media+"&y=&plot=short&apikey=trilogy").then(
        function (input, data) {
                var input = JSON.parse(data)
                if (input.Title != undefined) {
                    console.log("Title: " + input.Title);
                    console.log("Year: " + input.Year);
                    console.log("MPAA Rating: " + input.Ratings[0].Value);
                    console.log("Plot: " + input.Plot);
                    console.log("Cast: " + input.Actors);
                } else {
                    console.log("Movie Unavailable");
                }
            }
    );
}

function concertThis(media) {
    if (media == "") {
        media = "Taylor Swift"
    }
    axios.get("https://rest.bandsintown.com/artists/" + media + "/events?app_id=codingbootcamp", function (input, data) {
            var input = JSON.parse(data)
            if (input.length != 0) {
                console.log("Upcoming Concerts: " + media);
                input.forEach(function (info) {
                    console.log("Venue name: " + info.venue.name);
                    if (info.venue.country == "United States") {
                        console.log("City: " + info.venue.city + ", " + info.venue.region);
                    } else {
                        console.log("City: " + info.venue.city + ", " + info.venue.country);
                    }
                    console.log("Date: " + moment(info.datetime).format('MM/DD/YYYY'));
                })
            } else {
                console.log("No concerts found.");
            }
        }
    );
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, input) {
        if (error) {
            return console.log(error);
        }
        console.log(input);
})};


switchStuff(command, media);