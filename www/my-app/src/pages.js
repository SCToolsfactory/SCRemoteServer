// This content is machine generated and should only be edited with precaution !!!! 

// Note: any content outside of the init function is discarded and 
//       will not be maintained while editing this page in RemGUIDesigner
//       IP, PORT, DATAFILE is managed by the editor however

"use strict";

// Note: any content within the following function body will be carried on
//       and maintained as is while editing this page in RemGUIDesigner

// BEGIN DOMAIN (IP, PORT, DATAFILE only!!)
// overwrite the provided one whith our own definitons - Only Dom.XY shall be overwritten here
page_base.myPages_InitDom = function() 
{
  // the vJoy Command Server IP
  Dom.IP = '192.168.1.69';
  // the vJoy Command Server First Port number (UDP protocol)
  Dom.PORT = 34123;
  // data file to capture content from, located in and loaded from webRoot/data (empty name disables polling)
  Dom.DATAFILE = '';
}// InitDom
// END DOMAIN 

// BEGIN CUSTOMIZATION
// overwrite the provided one whith our own definitons - Only Cust.XY shall be overwritten here
page_base.myPages_InitCust = function() 
{
/*
     This section can be fully or partially uncommented and used to overwrite the page_base.js defaults
      used for the interaction with the pages

  // Mode: Item.ModeTap - defines the length of a tap action
  Cust.CmdModeShortTapDuration_ms = 100;  // The duration of a short tap in milliseconds

  // colors and transparency (0=invisible; 1= opaque) to indicate interaction
  // Note: invisible = 0 does not provide a touch target so let it at least 0.01 to enable interaction

  // Touch Targets - color is the touch indication color of the area when pressed or tapped
  Cust.B_UpDownCol = "white";  // Button Down color
  Cust.B_UpAlpha = 0.05;       // Don't set this to invisible else a touch is no longer detected
  Cust.B_DownAlpha = 0.3;      // transparency when pressed (white shape highlights the click/touch)

  // Toggle Targets - color is the hiding the area color and alpha the transparency of the two states 
  Cust.B_TogCol = "black";     // Toggle cover mask color
  Cust.B_TogOnAlpha = 0.01;    // Don't set this to invisible else a touch is no longer detected
  Cust.B_TogOffAlpha = 0.7;    // transparency when Off (black shape covers the page drawing)

  // Analog Targets - color of the unset area i.e. the one above the set point
  Cust.A_AnalogCol = "black";  // cover mask color
  Cust.A_AnalogAlpha = 0.9;    // transparency for the unused part of analog controls (black shape)
  // Slider Targets - color of the unset area i.e. the one outside the set point
  Cust.A_SliderCol = "black";  // sliding cover mask color
  Cust.A_SliderAlpha = 0.9;    // transparency for the unused part of analog controls (black shape)
  // Target Handle width (height) of the Slider behavior
  Cust.A_SliderHandleWidth_px = 10; // width or height of the illuminated part of the slider in pixel

  // **** Data Display Mods (Alpha may be invisible here i.e. == 0)
  Cust.DisplayPerSec = 1;  // Max 10 but 2..4 should do it - how many times the data is polled to look for updates per second

  // Display Toggle 
  Cust.D_TogCol = "black";    // mask color
  Cust.D_TogOnAlpha = 0.01;
  Cust.D_TogOffAlpha = 0.7;   // transparency when On and when Off (black shape)
  // Display Signal
  Cust.D_SigOnAlpha = 1.0;
  Cust.D_SigOffAlpha = 0.0;   // transparency when On and when Off (color shape)
  // Display Analog
  Cust.D_AnalogCol = "black"; // cover mask color
  Cust.D_AnalogAlpha = 0.9;   // transparency for the unused part of analog controls (black shape)
  // Display Slider
  Cust.D_SliderCol = "black"; // cover mask color
  Cust.D_SliderAlpha = 0.9;   // transparency for the unused part of analog controls (black shape)
  // Display Handle width (height) of the Slider behavior
  Cust.D_SliderHandleWidth_px = 10; // width or height of the illuminated part of the slider in pixel

*/

  // Active Mods for this Demo
  Cust.D_AnalogAlpha = 0.95;   // transparency for the unused part of analog display (black shape covers the page drawing)
  Cust.D_SliderAlpha = 0.7;    // transparency for the unused part of slider display controls (black shape covers the page drawing)
  Cust.D_SliderHandleWidth_px = 5; // width or height of the illuminated part of the slider in pixel

  Cust.DisplayPerSec = 0.5;  // slow down for Demo - 2sec update pace
}//InitCust
// END customization of properties


// BEGIN PAGE CONSTRUCTION
// overwrite the provided one whith our own definitons
page_base.myPages_InitPages = function() 
{
  // PAGE 1 Construction
  this.page_1_obj = new Page_proto_obj(
    'Flight',
    'images/page_1.png',
    // Target Items
    [
      new Target("FPWr", 99, 148, 76, 0, Item.ModeTap, new Cmd(Item.TypeMacro, "m_CfgFPwr", Gen.Dummy, 0, 0)),
      new Target("Cruise", 99, 249, 76, 0, Item.ModeTap, new Cmd(Item.TypeMacro, "m_CfgCruise", Gen.Dummy, 0, 0)),
      new Target("Hover", 97, 348, 76, 0, Item.ModeTap, new Cmd(Item.TypeMacro, "m_CfgHover", Gen.Dummy, 0, 0)),
      new Target("Fight", 99, 499, 76, 0, Item.ModeTap, new Cmd(Item.TypeMacro, "m_CfgFight", Gen.Dummy, 0, 0)),
      new Target("Gear", 597, 148, 87, 0, Item.ModeBiTogUD, new Cmd(Item.TypeButton, 2, Item.KModNone, 1, 0)),
      new Target("AutoLand", 750, 148, 86, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0)),
      new Target("Sp_SCM", 397, 470, 76, 0, Item.ModeVal, new Cmd(Item.TypeRXaxis, 500, Item.KModNone, 0, 0)),
      new Target("Sp_Off", 397, 599, 76, 0, Item.ModeVal, new Cmd(Item.TypeRXaxis, 0, Item.KModNone, 0, 0)),
      new Target("Ac_100", 697, 353, 76, 0, Item.ModeVal, new Cmd(Item.TypeRYaxis, 1000, Item.KModNone, 0, 0)),
      new Target("Ac_50", 697, 470, 76, 0, Item.ModeVal, new Cmd(Item.TypeRYaxis, 500, Item.KModNone, 0, 0)),
      new Target("Ac_Off", 697, 598, 76, 0, Item.ModeVal, new Cmd(Item.TypeRYaxis, 0, Item.KModNone, 0, 0)),
      new Target("St_Down", 1245, 650, 82, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0)),
      new Target("St_Fore", 1050, 401, 76, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0)),
      new Target("St_Back", 1051, 598, 76, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0)),
      new Target("St_Left", 950, 499, 76, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0)),
      new Target("St_Right", 1151, 499, 76, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0)),
      new Target("EngTog", 1149, 148, 85, 85, Item.ModeBiTogUD, new Cmd(Item.TypeButton, 3, Item.KModNone, 0, 0)),
      new Target("S_Speed", 496, 473, 61, 253, Item.ModeAnalog, new Cmd(Item.TypeRXaxis, 500, Gen.Dummy, 0, 0)),
      new Target("S_Acc", 598, 473, 61, 253, Item.ModeAnalog, new Cmd(Item.TypeRYaxis, 500, Gen.Dummy, 0, 0)),
      new Target("St_Up", 1248, 347, 82, 0, Item.ModeTap, new Cmd(Item.TypeButton, 1, Item.KModNone, 0, 0))
    ],
    // Data Display Items
    [
    ]    
  );

  // PAGE 2 Construction
  this.page_2_obj = new Page_proto_obj(
    'Power',
    'images/page_2.png',
    // Target Items
    [
      new Target("maxP", 100, 150, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModRCtrl, 0, 0)),
      new Target("incP", 100, 350, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD4, Item.KModRCtrl, 0, 0)),
      new Target("decP", 100, 450, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD1, Item.KModRCtrl, 0, 0)),
      new Target("minP", 100, 650, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD0, Item.KModRCtrl, 0, 0)),
      new Target("fW", 350, 200, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D1, Item.KModRCtrl, 0, 0)),
      new Target("fP", 650, 200, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D2, Item.KModRCtrl, 0, 0)),
      new Target("fS", 500, 500, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D3, Item.KModRCtrl, 0, 0)),
      new Target("fR", 350, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D4, Item.KModRCtrl, 0, 0)),
      new Target("shRS", 800, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD5, Item.KModNone, 0, 0)),
      new Target("shTp", 1000, 150, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD9, Item.KModNone, 0, 0)),
      new Target("shFr", 1000, 250, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD8, Item.KModNone, 0, 0)),
      new Target("shLe", 800, 400, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD4, Item.KModNone, 0, 0)),
      new Target("shRi", 1200, 400, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD6, Item.KModNone, 0, 0)),
      new Target("shBk", 1000, 550, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD2, Item.KModNone, 0, 0)),
      new Target("shBt", 1000, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModNone, 0, 0))
    ],
    // Data Display Items
    [
    ]
  );

  // PAGE 3 Construction
  this.page_3_obj = new Page_proto_obj(
    'Exploring',
    'images/page_3.png',
    // Target Items
    [
      new Target("mog", 100, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F1, Item.KModNone, 0, 0)),
      new Target("qds", 100, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.B, Item.KModNone, 0, 0)),
      new Target("qde", 100, 500, 120, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.B, Item.KModLCtrl, 0, 0)),
      new Target("hli", 400, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.T, Item.KModLAlt, 0, 0)),
      new Target("lbe", 400, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.Y, Item.KModLAlt, 0, 0)),
      new Target("togSc", 700, 100, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.S, Item.KModLCtrl, 0, 0)),
      new Target("togMi", 900, 100, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.M, Item.KModNone, 0, 0)),
      new Target("decSA", 700, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 36, Item.KModNone, 0, 0)),
      new Target("incSA", 900, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 34, Item.KModNone, 0, 0)),
      new Target("ping", 800, 500, 120, 0, Item.ModePR, new Cmd(Item.TypeButton, 35, Item.KModNone, 0, 0)),
      new Target("cstab", 1100, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.S, Item.KModLAlt, 0, 0)),
      new Target("gforc", 1200, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.G, Item.KModLAlt, 0, 0)),
      new Target("esp", 1200, 300, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.E, Item.KModLAlt, 0, 0)),
      new Target("bcid", 1100, 300, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.PERIOD, Item.KModNone, 0, 0)),
      new Target("rrang", 1100, 500, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.COMMA, Item.KModNone, 0, 0))
    ],
    // Data Display Items
    [
    ]
  );

  // PAGE 4 Construction
  this.page_4_obj = new Page_proto_obj(
    'Planetside',
    'images/page_4.png',
    // Target Items
    [
      new Target("togLS", 200, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.N, Item.KModNone, 1, 0)),
      new Target("Aland", 200, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.N, Item.KModLCtrl, 0, 0)),
      new Target("togCL", 200, 500, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.F11, Item.KModNone, 0, 0)),
      new Target("hli", 400, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.T, Item.KModLAlt, 0, 0)),
      new Target("rrang", 500, 500, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.COMMA, Item.KModNone, 0, 0)),
      new Target("clsD", 800, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F8, Item.KModNone, 0, 0)),
      new Target("lckD", 800, 200, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F8, Item.KModRCtrl, 0, 0)),
      new Target("ulckD", 1100, 200, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F7, Item.KModRCtrl, 0, 0)),
      new Target("fRdy", 800, 400, 120, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F5, Item.KModNone, 0, 0))
    ],
    // Data Display Items
    [
    ]
  );

  // PAGE 5 Construction
  this.page_5_obj = new Page_proto_obj(
    'Emergency',
    'images/page_5.png',
    // Target Items
    [
      new Target("clsD", 100, 450, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F8, Item.KModNone, 0, 0)),
      new Target("lckD", 100, 550, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F8, Item.KModRCtrl, 0, 0)),
      new Target("fRdy", 400, 500, 150, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F5, Item.KModNone, 0, 0)),
      new Target("togW", 100, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D1, Item.KModRAlt, 0, 0)),
      new Target("togS", 300, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D2, Item.KModRAlt, 0, 0)),
      new Target("togE", 500, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D3, Item.KModRAlt, 0, 0)),
      new Target("togP", 900, 100, 85, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D4, Item.KModRAlt, 0, 0)),
      new Target("minP", 1000, 450, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD0, Item.KModRCtrl, 0, 0)),
      new Target("maxP", 800, 350, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModRCtrl, 0, 0)),
      new Target("slfD", 1250, 100, 130, 85, Item.ModePR, new Cmd(Item.TypeKey, VK.BACKSPACE, Item.KModRAlt, 0, 0)),
      new Target("eject", 1250, 350, 70, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.L, Item.KModRAlt, 0, 0)),
      new Target("respawn", 1250, 550, 70, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.X, Item.KModNone, 0, 0))
    ],
    // Data Display Items
    [
    ]
  );
}// InitPages
// END PAGE CONSTRUCTION


// BEGIN MACRO DEFINITION
// overwrite the (empty) Init function whith our own definitons
// Macros can be used as Activation Type in pages for Item.ModeTap only
page_base.myPages_InitMacros = function() 
{  
  var mac =  null;

  // macros to choose Speed AND Accel Presets in page 1
  // For Sliders, Axes we may use the Custom Const  Cust.A_Scale  which lets us choose relative to whatever the Scale is set
  // Using JoyStick No 0 here, to use another one set js in Cmd = N (js is the last argument)
  mac = new Macro("m_CfgFPwr", [ // set Speed to 100 and Accel to 100%
    new Cmd(Item.TypeRXaxis, Cust.A_Scale, Gen.Dummy, 0, 0),  // Speed Sel 100%
    new Cmd(Item.TypeRYaxis, Cust.A_Scale, Gen.Dummy, 0, 0)   // Accel Sel 100%
  ]);
  Macro.AddMacro(mac); // save it 

  mac = new Macro("m_CfgCruise", [ // set Speed to SCM and Accel to 50%
    new Cmd(Item.TypeRXaxis, Cust.A_Scale/2, Gen.Dummy, 0, 0),  // Speed Sel SCM = 50%
    new Cmd(Item.TypeRYaxis, Cust.A_Scale/2, Gen.Dummy, 0, 0)   // Accel Sel 50%
  ]);
  Macro.AddMacro(mac); // save it 

  mac = new Macro("m_CfgHover", [ // set Speed to 0% and Accel to 100%
    new Cmd(Item.TypeRXaxis, 0, Gen.Dummy, 0, 0),  // Speed Sel 0%
    new Cmd(Item.TypeRYaxis, Cust.A_Scale, Gen.Dummy, 0, 0)   // Accel Sel 100%
  ]);
  Macro.AddMacro(mac); // save it 

  mac = new Macro("m_CfgFight", [ // set Speed to SCM and Accel to 100%
    new Cmd(Item.TypeRXaxis, Cust.A_Scale/2, Gen.Dummy, 0, 0),  // Speed Sel SCM = 50%
    new Cmd(Item.TypeRYaxis, Cust.A_Scale, Gen.Dummy, 0, 0)   // Accel Sel 100%
    // may be other stuff needed here
  ]);
  Macro.AddMacro(mac); // save it 
}
// END MACRO DEFINITION

