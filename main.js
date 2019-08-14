//
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer
//
// V 2.0
// Server side Node.JS Code for the Page handling
// --> In general there is nothing to change in this file for standard usage
//
//  This implements a WebServer able to:
//   - serve the scripts and images for a game site
//   - serve the Joystick/Kbd comment (sending UDP dgrams to a receiver)
//   - serve data files for the clients Display Items
//   - serve as file upload target for the above Display Items
//   - serve a default page when accessing the web root to choose from 
//     available game hosts (folders containing the remote control page files)
//
// Setup:
//  Install Node.JS  (https://nodejs.org/en/download/)
//  Issue in e.g. powershell (Windows)
//  $ npm install express sanitize-filename
//
//  Adjust the listening port below  (var port = NNNNN)
//
// Run:
//  Issue in e.g. powershell (Windows)
//  $ npm run start
//  .. to run the server
//

// TO BE ADJUSTED TO YOUR NEEDS...

// The listening port of the HTTP Server
const port = 9042;
// The Logo shown for the main page of the site
const myLogoImage = 'my-logo.jpg';
// The main folder where the public HTML content is located
const publicHtml = 'www';


// Adjust from here but beware..

// Import express und http Module. 
const express = require('express');
const formidableMiddleware = require('express-formidable');
const fs = require('fs-extra');
const sanitize = require("sanitize-filename");
const path = require('path');

var app = express();
var server = require('http').createServer(app);

const webRoot = path.join( __dirname, publicHtml ); // current folder + our public one
const dataLocName = 'data';
const dataLoc = path.join( webRoot , dataLocName ) + '/';

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

// Receive the UDP command GET request from the Client
// uses regex to match port as number only
/*
Route path: /calludp/ip/:IP/port/:PORT(\\d+)/msg/:MSG
Request URL: http://localhost:PORT/calludp/ip/192.168.1.42/port/32145/msg/{command}
req.params: { "IP": "192.168.1.42", "PORT": "32145", "MSG": "{command}" }
*/
app.get('/api/calludp/ip/:IP/port/:PORT(\\d+)/msg/:MSG', function (req, res) {
    console.log('UDP Called! ' + req.params.MSG + '   IP:' + req.params.IP + '   Port:' + req.params.PORT); // DEBUG

    var PORT = req.params.PORT;
    var HOST = req.params.IP;
    var dgram = require('dgram');
    var message = new Buffer.from(req.params.MSG); // UDP call wants a Buffer obj
    var trusted = true;

    // Validation section - can be omitted in safe environments
    try {
        var jTest = JSON.parse(req.params.MSG);
    } catch (e) {
        trusted = false;
        console.log('ERR: calludp - JSON test failed'); // DEBUG
        console.error(e);
        rep.send('Error - JSON test failed');
        return;
    }
    if (! ValidateIPaddress(HOST)) {
        console.log('ERR: calludp - IP format not valid ' + HOST);
        trusted = false;
    }
    // END Validation section

    if ( trusted===true) {
        var client = dgram.createSocket('udp4');
        client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
            if (err) {
                console.log('ERR: calludp - failed to send UDP message to ' + HOST +':'+ PORT); // DEBUG
            }
            else{
                console.log('UDP message sent to ' + HOST +':'+ PORT); // DEBUG
                res.send(req.params.MSG + '   IP:' + req.params.IP + '   Port:' + req.params.PORT); // DEBUG Reply
            }
            client.close();
        });
    }
});

// Receive the File Request command GET request from the Client
/*
Route path: /filequery/file/:FILE
Request URL: http://localhost:PORT/filequery/file/something.json
req.params: { "FILE": "something.json" }
*/
app.get('/api/filequery/file/:FILE', function (req, res) {
    // console.log('filequery Called! ' + req.params.FILE); // DEBUG ONLY

    var basename = sanitize(req.params.FILE); // Sanitize the string to be safe for use as a filename.
    var filename = dataLoc + basename;

    if ( ! fs.existsSync(filename)) {
        console.log('ERR: filequery - file does not exist ' + filename);
        return;
    }

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            console.log('ERR: filequery - getting file content '); // DEBUG
        }
        else{
            if (data.length>0) {
                res.send(data); // Reply with filecontent
            }
        }
        // ******!!!!!!!!!!*******
        // Demo Mode - cycle example data files  0-xy.json .. 9-xy.json
        // !!!! Remove this for production !!!!
        var nextFile  = dataLoc + Math.floor(Math.random() * 10) + '-' + basename;
        fs.copyFile(nextFile, filename, function(err) {
            if (err) ; // ignore and try next time
        });
        // END Demo Mode
        // ******!!!!!!!!!!*******

    });    
});

// Receive the File Upload Request POST from the Client
/*
Route path: /api/fileupload
Request URL: http://localhost:PORT/fileupload/something.json
*/
app.post('/api/fileupload', formidableMiddleware({ 
    uploadDir: dataLoc,     // load to our data folder
    keepExtensions: true    // cosmetics only..
   }), function (req, rep) {

    // console.log(req.files.file.name); // DEBUG the original filename
    // console.log(req.files.file.path); // DEBUG the full path to the uploaded (temp)file

    var basename = req.files.file.name; // the original filename
    basename = sanitize(basename);      // Sanitize the string to be safe for use as a filename.
    const filename = dataLoc + basename;  // the upload file with path
    const tempname = req.files.file.path; // the temp upload from formidable

    if ( ! path.extname(basename) === 'json' ) {
        console.log('ERR: fileupload - only JSON files are allowed ' + basename);
        rep.send('Error - only JSON files are allowed');
        return;
    }
    // Get the content and check for problems - on error return immediately
    fs.readFile(tempname, 'utf8', function(err, data) {
        if (err) {
            console.log('ERR: fileupload - cannot read file content'); // DEBUG
            rep.send('Error - cannot read file content');
            return;
        }
        if (data.length==0) {
            console.log('ERR: fileupload - file is empty'); // DEBUG
            rep.send('Error - file is empty');
            return;
        }
        
        try {
            var jTest = JSON.parse(data);
        } catch (e) {
            console.log('ERR: fileupload - JSON test failed'); // DEBUG
            console.error(e);
            rep.send('Error - JSON test failed');
            return;
        }

        // finally move temp to target name
        fs.move(tempname, filename, { overwrite: true }, function(err) {
            if (err){
                console.log('ERR: fileupload - cannot move temp to target'); // DEBUG
                rep.send('Error - cannot move temp to target');
                return;
            } 
            console.log('The file ' + filename + ' has been uploaded'); // DEBUG
            rep.send('The file ' + basename + ' has been uploaded'); // reply to sender
        });
    });    
    
});


// Route when the site is accessed without further args
// ie  http://<HOST>:PORT/
// it will show a tiny page with the subdirs linked for selection
app.get('/', function (req, res) {
    console.log('Root dir accessed'); // DEBUG

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
            if ( element !== dataLocName ) {
                reply += '<li><a class="afolder" href="/'+element+'">'+element+'</a></li><br>';
            }
        });
    }
    reply += '</div>';
    reply += '</center></body></html>';

    // reply now
    res.send(reply);
});

