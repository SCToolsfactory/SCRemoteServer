<?php
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

// Json Data file loader
//   gets a file from ../data directory 
//   filename is sanitized to 7-bit ASCII - take care to use only plain filenames
//   returns the content or an error message
//   query with something like: url?q=filename

    // Start
    $file = "";
    $dataLoc = '../data/';

    // get message
    $file = $_GET["q"];
    // file should be in ../data and pure ASCII filename only
    $basename = filter_var($file, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
    $filename = $dataLoc . $basename;

    // just return the content
    $myfile = fopen($filename, "r") or die("Error: Unable to open file!");
    echo fread($myfile, filesize($filename));
    fclose($myfile);

    // Demo Mode - get one of the data files 0-xy .. 9-xy
    // !!!! Remove this for production !!!!
    $nextFile  = $dataLoc . rand(0, 9) . '-' . $basename;
    copy($nextFile, $filename);
    // END Demo Mode

?>
