/**
 * Created by Orlando on 24/8/2014.
 */

var fs = require('fs');
var  util = require('util');

exports.play = function(req, res){

    var movie_mp4;

    fs.readFile('./videos/video.mp4', function (err, data) {
        if (err) {
            throw err;
        }
        movie_mp4 = data;
    });

    total = movie_mp4.length;

    var range = req.headers.range;

    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    // if last byte position is not present then it is the last byte of the video file.
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = (end-start)+1;

    res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type":"video/mp4"});
    res.end(movie_mp4.slice(start, end+1), "binary");
};