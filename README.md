SCremoteServer V 0.1<br>
====================<br>
<br>
SC Remote Interaction Web Server <br>
<br>
A small Web Site that utilizes the SCvJoyServer to issue keystrokes and vJoy commands.<br>
(SC) refers to StarCitzen which is the primary intent of this project, but it may <br>
be used for other purposes as well.<br>
<br>
Uses the UDP protocol to supply commands issued from the remote Web Browser<br>
which may run on a tablet or similar interactive device appart from the game PC<br>
It issues a Key/Button _down_ as long as pressing or clicking and holding the mouse on the target.<br>
<br>
The server does not store or indicate states of toggles.<br>
I found that the game still looses keystrokes once in a while and then the<br>
toggle persistence is not helpful but even confuses the user...<br>
<br>
Uses: easelJS library - see license file
<br>
Note: <br>
You have to install the SCvJoyServer which is available here:<br>
https://github.com/SCToolsfactory/SCJoyServer
<br>
You have to install the vJoy (V 2.1) driver to make use of Joystick Buttons.<br>
The driver is not available here but you may use this link.<br>
http://vjoystick.sourceforge.net/site/index.php/download-a-install/download    <br>
<br>
This project serves as example on how to use the SCvJoyServer.<br>
There are 5 different Tabs which provide context based access to functions.<br>
<br>
<br>
I found using the UwAmp Zip package, an all inclusive WebServer, the fastest and least intrusive way<br>
to run a web server supporting PHP on a Win desktop PC<br>
https://www.uwamp.com<br>
<br>
You may map the Virtual Joystick like any real one into SC by using e.g. SCJMapper-V2<br>
<br>
NOTE: THIS _ IS _ VERY _ EARLY _ WORK _ IN _ PROGRESS _ IT _ MAY _ JUST _ BREAK _ AT _ ANY _ TIME ;-)<br>
<br>


