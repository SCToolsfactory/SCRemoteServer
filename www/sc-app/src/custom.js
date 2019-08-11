//
// V 2.0
// Customizable prefabs 
// --> In general there is nothing to change in this file for standard usage
// *** Prefabricated items that can be re-defined in the page.js - function myPages_Init()
//
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

"use strict";

// Domain items, can be redefined in pages.js -> page_base.myPages_InitDom
var Dom = {
    // values to be overwritten in myPages_Init() in pages.js
    IP : '192.168.1.42',
    // the vJoy Command Server First Port number (UDP protocol
    PORT : 34123,
    // data file to capture content from, located in and loaded from webRoot/data
    DATAFILE : 'xy.json',
}


// Customization items, can be redefined in pages.js -> page_base.myPages_InitCust
var Cust = {
    // Prefabricated CSS type font specs - see also https://www.w3schools.com/cssref/css_websafe_fonts.asp
    Font16 : "16px times new roman",      // 16 px serif
    Font16s : "16px arial",               // 16 px sans
    Font16m : "16px lucida console",      // 16 px monospace

    Font24 : "24px times new roman", 
    Font24s : "24px arial", 
    Font24m : "24px lucida console",

    Font32 : "32px times new roman",
    Font32s : "32px arial", 
    Font32m : "32px lucida console",

    // Prefabricated Color strings - see also https://www.w3schools.com/colors/colors_names.asp
    D_White : "White",
    D_Black : "Black",
    D_Red : "OrangeRed",
    D_Green : "Lime",
    D_Yellow : "Yellow",
    D_Orange : "Orange",
    D_Blue : "DodgerBlue",

    // Data polling pace n per second
    DisplayPerSec : 1,  // Max 10 - how many times the data is polled to look for updates per second

    // Prefabricated Hit/Touch visualization items internal use by Page_Base

    // Target Button Up Down
    B_UpDownCol : "white",                // mask color
    B_UpAlpha : 0.05,  B_DownAlpha : 0.3, // transparency when released and when pressed (white shape)
    // Target Toggle 
    B_TogCol : "black",                         // mask color
    B_TogOnAlpha : 0.01, B_TogOffAlpha : 0.7,  // transparency when On and when Off (black shape)
    // Target Analog
    A_AnalogCol : "black", // cover mask color
    A_AnalogAlpha : 0.9,         // transparency for the unused part of analog controls (black shape)
    // Target Slider
    A_SliderCol : "black", // cover mask color
    A_SliderAlpha : 0.9,         // transparency for the unused part of analog controls (black shape)
    // Target Handle width (height) of the Slider behavior
    A_SliderHandleWidth_px : 10, // width or height of the illuminated part of the slider in pixel
    // the default duration of a tap
    CmdModeShortTapDuration_ms : 100,

    // Display Toggle 
    D_TogCol : "black",                         // mask color
    D_TogOnAlpha : 0.01,  D_TogOffAlpha : 0.7,  // transparency when On and when Off (black shape)
    // Display Signal
    D_SigOnAlpha : 1.0,  D_SigOffAlpha : 0.0,  // transparency when On and when Off (color shape)
    // Display Analog
    D_AnalogCol : "black", // cover mask color
    D_AnalogAlpha : 0.9,         // transparency for the unused part of analog controls (black shape)
    // Display Slider
    D_SliderCol : "black", // cover mask color
    D_SliderAlpha : 0.9,   // transparency for the unused part of analog controls (black shape)
    // Display Handle width (height) of the Slider behavior
    D_SliderHandleWidth_px : 10, // width or height of the illuminated part of the slider in pixel

    // END OF Prefabricated items

    // BEWARE when changing those.. dependecies are to be considered..
    // Max value of the Analog/Slider scaling (matches the SCvJoyServer convention)
    A_Scale : 1000.0, 
    // Max value of the Display Analog/Slider scaling (matches the JSON upload file convention)
    D_Scale : 100.0,  

}