<?php
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

// UDP Caller for the SCvJoy Server
//  does some sanity checks 
//  query with something like: url?msg={"B":{"Index":3,"Mode":"t"}}&ip=192.168.1.11&p=325145

    // check if it is a valid JSON expression
    function isJson($string) {
      json_decode($string);
      return (json_last_error() == JSON_ERROR_NONE);
    }

    //  Start
    $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);

    $msg = "";
    // just some defaults
    $IP = '192.168.1.69';
    $PORT = 34123;
    
    // get Json message
    $msg = $_GET["msg"];
    
    // get IP and PORT from query - check if not fudget..
    $IP = $_GET["ip"];
    $PORT = $_GET["p"];

    $trusted = true;
    
    // SANITY CHECKS
    // for trusted sources i.e. intranet only, you may exclude all sanity checks
    if (filter_var($IP, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) === false) {
      if (filter_var($IP, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) === false) {
        $trusted = false;
        $IP = "";
        echo("Error: parameter ip is not a valid IPv4 or IPv6 address");
      }
    } 
    if (filter_var($PORT, FILTER_VALIDATE_INT) === false) {
      $trusted = false;
      $PORT = 0;
      echo("Error: parameter p is not an integer");
    }
    if ( ! isJson($msg) ) {
      $trusted = false;
      $msg = "";
      echo("Error: parameter msg is not a valid json expression");
    }
    // END SANITY CHECKS
    
    if ( $trusted === true ) {
      // DEBUG ONLY, sends the command back to the caller
      echo $msg . '   IP:' . $IP . '   Port:' . $PORT;
      // END DEBUG ONLY

      // UDP call
      socket_sendto($sock, $msg, strlen($msg), 0, $IP, $PORT);
      socket_close($sock);
    }

?>
