SCremoteServer V 2.0<br>
====================<br>
<br>
SC Remote Interaction Web Server <br>
<br>
A small Web Site that utilizes the SCvJoyServer to issue keystrokes and vJoy commands.<br>
(SC) refers to the StarCitzen game which is the primary intent of this project, but it may <br>
be used for other purposes as well.<br>
<br>
New with 2.0: the WebServer is included (NodeJS, express)<br>
Install Node.JS  (https://nodejs.org/en/download/)<br>
Issue in e.g. powershell (Windows)<br>
<code>$ npm install express sanitize-filename</code><br>
Then it should run when issuing:<br>
<code>$ npm run start</code><br>
Or running the 'run-server.ps1' powershell script from the installation root<br>
<br>
New with 2.0: ability to issue Macros for Touch type targets<br>
Update with 2.0: Using Babel to 'compile' for older browsers (iOS 9.3 Safari included)<br>
Update with 2.0: a lot but only internal part - pages.js needs rework (see provided examples)<br>
<br>
Uses the UDP protocol to supply commands issued from the remote Web Browser<br>
which may run on a tablet or similar interactive device appart from the game PC<br>
It issues a Key/Button _down_ as long as pressing or clicking and holding the mouse on the target.<br>
It can also issue vJoy Axis or Slider input with a distinct value or analog sliders<br>
Supports control of multiple vJoy devices<br>
<br>
The server can store or indicate states of toggles.<br>
However I found that the game still looses keystrokes once in a while and then the<br>
toggle persistence is not helpful but even confuses the user...<br>
<br>
NEW: This version supports real-time display of data available from a json file in various forms.<br>
The upload can be automated using SCJoyServer which now carries a web uploader.<br>
For more information - see doc.<br>
<br>
Uses: easelJS library - see license file<br>
Uses: NodeJS, express, sanitize-filename library (via download)<br>
<br>
Note: <br>
You have to install the SCvJoyServer which is available here:<br>
https://github.com/SCToolsfactory/SCJoyServer/releases
<br>
You have to install the vJoy (V 2.1) driver to make use of Joystick Buttons.<br>
The driver is not available here but you may use this link.<br>
http://vjoystick.sourceforge.net/site/index.php/download-a-install/download    <br>
<br>
This project serves as example on how to use the SCvJoyServer.<br>
There are 5 different Tabs which provide context based access to functions.<br>
<br>
See screenshots from an iPad2:<br>
https://github.com/SCToolsfactory/SCRemoteServer/blob/master/screenshots/IMG_0033.PNG<br>
https://github.com/SCToolsfactory/SCRemoteServer/blob/master/screenshots/IMG_0034.PNG<br>
https://github.com/SCToolsfactory/SCRemoteServer/blob/master/screenshots/IMG_0035.PNG<br>
https://github.com/SCToolsfactory/SCRemoteServer/blob/master/screenshots/IMG_0036.PNG<br>
https://github.com/SCToolsfactory/SCRemoteServer/blob/master/screenshots/IMG_0037.PNG<br>
<br>
For more information about how to use it - see doc folder<br>
https://github.com/SCToolsfactory/SCRemoteServer/blob/master/doc/SCRemoteServer.pdf<br>
<br>
You may map the Virtual Joystick like any real one into SC by using e.g. SCJMapper-V2<br>
<br>
NOTE: THIS _ IS _ VERY _ EARLY _ WORK _ IN _ PROGRESS _ IT _ MAY _ JUST _ BREAK _ AT _ ANY _ TIME ;-)<br>
<br>


