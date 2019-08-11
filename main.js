//
// V 2.0
// Server side Node.JS Code for the Page handling
// --> In general there is nothing to change in this file for standard usage
//
//  Install Node.JS  (https://nodejs.org/en/download/)
//  Issue in e.g. powershell (Windows)
//  $ npm install express sanitize-filename
//
//  Adjust the listening port below  (var port = NNNNN)
//  Issue in e.g. powershell (Windows)
//  $ npm run start
//  to run the server
//
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

// TO BE ADJUSTED TO YOUR NEEDS...

// The listening port of the HTTP Server
const port = 9042;
// The Logo shown for the main page of the site
const myLogoImage = 'my-logo.jpg';
// The main folder where the public HTML content is located
const publicHtml = 'www';


// Adjust from here but beware..

// Import express und http Module. 
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var path = require('path');
const webRoot = path.join( __dirname, publicHtml ); // current folder + our public one
const dataLoc = path.join( webRoot , 'data' ) + '/';

// Start the simple Webserver
server.listen(port, function () {
    console.log('Webserver running, listens at port %d', port);
});

// Setup the 'public' WebSite Files path
app.use(express.static(webRoot));


// Helper to validate the IPV4 parameter for UDP Call
// If you need V6 either extend this or return true all the time (unsafe...)
function ValidateIPaddress(ipaddress) 
{
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    {
        return (true)
    }
    return (false)
}

  
// Add routes for client inquiries

// Receive the UDP command request from the Client
// uses regex to match port as number only
/*
Route path: /calludp/ip/:IP/port/:PORT(\\d+)/msg/:MSG
Request URL: http://localhost:PORT/calludp/ip/192.168.1.42/port/32145/msg/{command}
req.params: { "IP": "192.168.1.42", "PORT": "32145", "MSG": "{command}" }
*/
app.get('/calludp/ip/:IP/port/:PORT(\\d+)/msg/:MSG', function (req, res) {
    console.log('UDP Called! ' + req.params.MSG + '   IP:' + req.params.IP + '   Port:' + req.params.PORT); // DEBUG

    var PORT = req.params.PORT;
    var HOST = req.params.IP;
    var dgram = require('dgram');
    var message = new Buffer.from(req.params.MSG); // UDP call wants a Buffer obj
    var trusted = true;

    // Validation section - can be omitted in safe environments
    if (! ValidateIPaddress(HOST)) {
        console.log('ERR: IP format not valid ' + HOST);
        trusted = false;
    }
    if (! JSON.parse(req.params.MSG)){
        console.log('ERR: invalid command ' + req.params.MSG);
        trusted = false;
    }
    // END Validation section

    if ( trusted===true) {
        var client = dgram.createSocket('udp4');
        client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
            if (err) {
                console.log('ERR: sending UDP message to ' + HOST +':'+ PORT); // DEBUG
            }
            else{
                console.log('UDP message sent to ' + HOST +':'+ PORT); // DEBUG
                client.close();
                res.send(req.params.MSG + '   IP:' + req.params.IP + '   Port:' + req.params.PORT); // DEBUG Reply
            }
        });
    }
});

// Receive the File Request command request from the Client
/*
Route path: /filequery/file/:FILE
Request URL: http://localhost:PORT/filequery/file/something.json
req.params: { "FILE": "something.json" }
*/
app.get('/filequery/file/:FILE', function (req, res) {
    // console.log('FILE Called! ' + req.params.FILE); // DEBUG ONLY

    var fs = require('fs');
    var sanitize = require("sanitize-filename");

    var basename = sanitize(req.params.FILE); // Sanitize the string to be safe for use as a filename.
    var filename = dataLoc + basename;

    if ( ! fs.existsSync(filename)) {
        console.log('ERR: file does not exist ' + filename);
        return;
    }

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            console.log('ERR: getting file content '); // DEBUG
        }
        else{
            if (data.length>0) {
                res.send(data); // Reply with filecontent
            }
        }
        // Demo Mode - get one of the data files 0-xy .. 9-xy
        // !!!! Remove this for production !!!!
        var nextFile  = dataLoc + Math.floor(Math.random() * 10) + '-' + basename;
        fs.copyFile(nextFile, filename, function(err) {
            if (err) ; // ignore and try next time
        });
        // END Demo Mode

    });    
});

// Route when the site is accessed without further args
// ie  http://<HOST>:PORT/
// it will show a tiny page with the subdirs linked for selection
app.get('/', function (req, res) {
    console.log('Root dir accessed'); // DEBUG

    const fs = require('fs');
    const dirents = fs.readdirSync(webRoot, { withFileTypes: true });
    const dirNames = dirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    // use dirNames now

    // simple HTML Reply with the subdirs found in web root
    var reply = '<!DOCTYPE html><html><head><title>SC Remote Server</title>';
    reply += '<link rel="stylesheet" type="text/css" href="style.css" />'
    reply += '</head>';
    reply += '<body><center>';
    reply += '<br><br><div class="mainblock">';
    reply += '<img src="' + myLogoImage + '" height="120">';
    reply += '<h2>SC Remote Server - up and running</h2>';
    reply += '<hr><h2>Game Hosts available:</h2>';

    if ( dirNames.length<1){
        reply += '<h3>Unfortunately... none, pls. check your config..</h3>';
    }
    else {
        // get all dirs and provide a link for them
        dirNames.forEach(element => {
            // ignore the data folder
            if ( element !== 'data') {
                reply += '<li><a class="afolder" href="/'+element+'">'+element+'</a></li><br>';
            }
        });
    }
    reply += '</div>';
    reply += '</center></body></html>';

    // reply now
    res.send(reply);
});

