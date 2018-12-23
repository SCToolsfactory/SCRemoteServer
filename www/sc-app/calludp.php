<?php
// UDP Caller for the SCvJoy Server

    $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);

    $msg = "";
    // just some defaults
    $IP = '192.168.1.69';
    $PORT = 34123;
    
    // query with something like: url?msg={"B":{"Index":3,"Mode":"t"}}&ip=192.168.1.11&p=325145
    // get message
    $msg = $_GET["msg"];
    $len = strlen($msg);
    
    // get IP and PORT from query
    $IP = $_GET["ip"];
    $PORT = $_GET["p"];
    
    // DEBUG ONLY, sends the command back to the caller
    echo $msg . '   IP:' . $IP . '   Port:' . $PORT;
    // END DEBUG ONLY

    // UDP call
    socket_sendto($sock, $msg, $len, 0, $IP, $PORT);
    socket_close($sock);
?>
