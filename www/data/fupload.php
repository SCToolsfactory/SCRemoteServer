<?php
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

// File upload receiver 
//  puts the received file into the current directory
//  does some sanity checks 
//  returns the result to the caller (check for starting "Error:" signature)
//  use POST to send the file 

    // check if it is a valid JSON expression
    function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

  //  Start
    $target_dir = "./";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;

    // SANITY CHECKS
    // for trusted sources i.e. intranet only, you may exclude all sanity checks

    // Allow certain file formats
    $fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    if($fileType != "json" ) {
      echo "Error: only JSON files are allowed.";
      $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
      // read the file and check if it is JSON type
      $testFile = fopen($_FILES["file"]["tmp_name"], "r") or die("Error: Unable to open file!");
      $content = fread($testFile,filesize($_FILES["file"]["tmp_name"]));
      fclose($testFile);    

      if ( ! isJson( $content ) ){
        echo "Error: can only upload valid JSON files.";
        $uploadOk = 0;
      }
    }
    // END SANITY CHECKS

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
      // just overwrite the target (move from temp to target)
      if ( move_uploaded_file($_FILES["file"]["tmp_name"], $target_file) ) {
        echo "The file " . basename( $_FILES["file"]["name"]). " has been uploaded.";
      } 
      else {
        echo "Error: there was an error uploading your file.";
      }
    }
?>