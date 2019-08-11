
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

"use strict";

// BEGIN DOMAIN (IP, PORT, DATAFILE only!!)
// overwrite the provided one whith our own definitons - Only Dom.XY shall be overwritten here
page_base.myPages_InitDom = function() 
{
  // the vJoy Command Server IP
  Dom.IP = '192.168.1.69';
  // the vJoy Command Server First Port number (UDP protocol)
  Dom.PORT = 34123;
  // data file to capture content from, located in and loaded from webRoot/data (empty name disables polling)
  Dom.DATAFILE = 'sc-app.json';
}// InitDom
// END DOMAIN 


/*
 * Define the interaction targets for each of the pages (page_n) 5 are currently supported by the HTML layout
 *
 * Parameters are:  pageName, backgroundImage, tItems , dItems 
 *
 * pageName: a name for this page
 * backgroundImage: the URL for the image 
 * 
 * tItems: an array of Target objects to manage the interaction
 *
 *    name:   uniqueID of the object (make sure it is unique within the page)
 *              Using the same name across the pages will maintain ONE state for this target
 *              i.e. the named Toggle, Slider, Analog will have only one state value for all pages
 *    target: x, y, dw, h
 *            circles and rectangles are supported 
 *            where x, y are the center coords of the shape
  *             circle    set h=0  and dw=diameter
 *              rectangle set h=height and dw=width            
 *    type:   Keystroke / vJoy Button action
 *              Item.TypeKey, Item.TypeButton  
 *            Axis, RotAxis and Slider actions:
 *              Item.TypeXaxis, Item.TypeYaxis, Item.TypeZaxis,
 *              Item.TypeRXaxis, Item.TypeRYaxis, Item.TypeRZaxis,
 *              Item.TypeSL1, Item.TypeSL2
 *    mode:   Press/Release, Toggle, Analog, Slider or Value mode
 *              Item.ModeTogOn    Toggle with ON (light up) at startup
 *              Item.ModeTogOff   Toggle with OFF (darkened) at startup
 *              Item.ModeBiTog    Toggle type (default OFF shows the upper part)
 *              Item.ModeBiTogLR  Toggle type (default OFF shows the left part)
 *              Item.ModePR       Press Release
 *              Item.ModeTap      A short tap
 *              Item.ModeVal      Value mode for Axis, Rot and Sliders
 *              Item.ModeAnalog   Analog mode for Axis, Rot and Sliders
 *              Item.ModeSlider   Slider mode for Axis, Rot and Sliders (orientation is derived from the larger extent)
 *    code:   any VK. name for Keys (see command.js) 
 *            the button index 1.. max for vJoy Buttons
 *            a 0 .. 1000 value for axis, rotaxis and sliders
 *    kMod:   Optional (default=Item.KModNone)
 *              Item.KModNone, Item.KModLCtrl, Item.KModRCtrl, Item.KModLAlt, Item.KModRAlt, Item.KModLShift, Item.KModRShift  - Key modifier
 *              for buttons targets use Item.KModNone
 *    jsIndex: Optional (default=0)
 *              Joystick index - selects the UDP channel for the SCvJoyServer (used UDP port = PORT + jsIndex)
 * 
 * dItems: an array of Data Display objects
 *
 *    name:   uniqueID of the object (make sure it is unique within the page)    
 *    target: x, y, dw, h
 *            circles and rectangles are supported 
 *            where x, y are the center coords of the shape
 *              circle    set h=0  and dw=diameter
 *              rectangle set h=height and dw=width            
 *    mode:   Data Display mode
 *              Disp.ModeTxt      Text type (text is shown either string or value)
 *                               Note: For Text the x,y define the location, where the alignment is then around x,y i.e.
 *                                     CenterAlign centers the text around x,y.
 *              Disp.ModeTog      Toggle type (boolean data only - default OFF dark, Use Color field to init with 1 (starting toggled)
 *              Disp.ModeBiTogUD    Toggle type (boolean data only - default OFF shows the upper part)
 *              Disp.ModeBiTogLR  Toggle type (boolean data only - default OFF shows the left part)
 *              Disp.ModeSig      Signal type (boolean data only - the background is covered by the shape with color if true)
 *              Disp.ModeAnalog   Analog type 0..100.0 (value data only - a bar of value size is show - the rest is masked out)
 *              Disp.ModeSlider   Slider type 0..100.0 (value data only - a slider handle is shown at the value position)
 *    align:  Horizontal Text alignment
 *              LeftAlign, CenterAlign, RightAlign
 *    bline:  Vertical Text baseline (uses the character box of the font to align)
 *              Bottom, Middle, Top
 *    font:   A CSS style font specification for Text items (see page_base for some prefabricated values)
 *    color:  A CSS style color specification for Text and Signal items (see page_base for some prefabricated values)
 *    section: The data source section 
 *    item:    The data source item within the section  (section.item)
 */

 
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
    "Test Page 1",
    'images/page_1.png',
    [
      // Hit / Touch Targets
      new Target("my1", 100, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F2, Item.KModRCtrl, 0, 0)), // RightCtrl + F2
      new Target("my2", 100, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 3, Item.KModNone, 0, 0)),   // vJoy Button 3
      new Target("my3", 200, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.Y, Item.KModNone, 0, 0)),   // as per kbd layout setting will raise Z in DxGames on QWERTZ keyboards
      new Target("my4", 300, 100, 90, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.Z, Item.KModNone, 0, 0)),   // as per kbd layout setting will raise Y on DxGames QWERTZ keyboards
      // toggles 
      new Target("tg1", 100, 500, 90, 0, Item.ModeTog,   new Cmd(Item.TypeKey, VK.V, Item.KModNone, 1, 0)), // toggles with the V key - KeyDown/up when pressed - def ON
      new Target("tg2", 200, 500, 90, 0, Item.ModeTog,   new Cmd(Item.TypeButton, 4, Item.KModNone, 1, 0)), // toggles with the button4 - Down/up when pressed - def ON
      new Target("tg3", 300, 500, 90, 0, Item.ModeTog,  new Cmd(Item.TypeKey, VK.W, Item.KModNone, 0, 0)), // toggles with the W key - KeyDown/up when pressed - def OFF
      new Target("tg4", 400, 500, 90, 0, Item.ModeTog,  new Cmd(Item.TypeButton, 5, Item.KModNone, 0, 0)), // toggles with the button5 - Down/up when pressed - def OFF
      // bi-color toggles 
      new Target("tg5", 400, 350, 85, 0, Item.ModeBiTogUD,  new Cmd(Item.TypeButton, 6, Item.KModNone, 0, 0)), // toggles with the button6
      new Target("tg6", 250, 250, 95, 95, Item.ModeBiTogUD,  new Cmd(Item.TypeButton, 7, Item.KModNone, 0, 0)), // toggles with the button7
      new Target("tg7", 400, 250, 100, 0, Item.ModeBiTogUD,  new Cmd(Item.TypeButton, 8, Item.KModNone, 0, 0)), // toggles with the button8
      new Target("tg8", 250, 350, 100, 70, Item.ModeBiTogLR,  new Cmd(Item.TypeButton, 9, Item.KModNone, 0, 0)), // toggles with the button9
      // analog X axis simulation with 5 ticks from 0..max
      new Target("ax0", 1250, 100, 90, 0, Item.ModeVal, new Cmd(Item.TypeXaxis, 1000, Item.KModNone, 0, 0)), // send 1000 as value
      new Target("ax1", 1250, 200, 90, 0, Item.ModeVal,  new Cmd(Item.TypeXaxis, 750, Item.KModNone, 0, 0)), // send  750 as value
      new Target("ax2", 1250, 300, 90, 0, Item.ModeVal,  new Cmd(Item.TypeXaxis, 500, Item.KModNone, 0, 0)), // send  500 as value
      new Target("ax3", 1250, 400, 90, 0, Item.ModeVal,  new Cmd(Item.TypeXaxis, 250, Item.KModNone, 0, 0)), // send  250 as value
      new Target("ax4", 1250, 500, 90, 0, Item.ModeVal,  new Cmd( Item.TypeXaxis,  0, Item.KModNone, 0, 0)), // send    0 as value
      // Analog and Slider type target
      new Target("al1", 1150, 300, 100, 500, Item.ModeAnalog, new Cmd(Item.TypeXaxis,  500, Item.KModNone, 0, 0)), // analog control, init 500 (middle scale)
      new Target("sl1",  850, 650, 500, 94, Item.ModeSlider,  new Cmd( Item.TypeYaxis, 250, Item.KModNone, 0, 0)), // slider control, init 250 (1/4 scale)

      // Issue a command for the Joystick with index 1 if the SCvJoyServer has more than one UDP channels (Joysticks) opened
      // new Target("my99", 100, 700, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 17, Item.KModNone, 0, 1)), // parameter jsIndex=1
    ],
    // Data Display Items
    [
      // Text
      new Display("dItm1",  700, 400, 190,  90, Disp.ModeTxt, Disp.CenterAlign, Disp.Middle, Cust.Font16, Cust.D_Yellow, "section1", "item1"),
      new Display("dItm2",  650, 300, 100,  50, Disp.ModeTxt, Disp.CenterAlign, Disp.Middle, Cust.Font16m, Cust.D_Red, "section1", "item2"),
      new Display("dItm3",  800, 300, 100,  50, Disp.ModeTxt, Disp.CenterAlign, Disp.Middle, Cust.Font24m, Cust.D_Blue, "section2", "item44"),
      // Toggles
      new Display("dItm11",  100, 600, 50,   0, Disp.ModeTog, Gen.Dummy, Gen.Dummy, Gen.Dummy, 1, "section3", "tog1"), // circle
      new Display("dItm12",  300, 600, 50,   0, Disp.ModeTog, Gen.Dummy, Gen.Dummy, Gen.Dummy, 0, "section3", "tog1"), // circle
      // Bi color Toggles
      new Display("dItm21",  100, 700, 85,   0, Disp.ModeBiTogLR, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "tog1"),
      new Display("dItm22",  300, 700, 95,  95, Disp.ModeBiTogUD, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "tog2"),
      // Signal - uses the given color as shape color (shown when true)
      new Display("dItm14", 1000, 200, 70,   0, Disp.ModeSig, Gen.Dummy, Gen.Dummy, Gen.Dummy, Cust.D_Green, "section3", "sig1"), // circle
      // Analogs (Bars)
      new Display("dItm15",  500, 350, 40, 300, Disp.ModeAnalog, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "alog1"),
      new Display("dItm16",  547, 350, 20, 300, Disp.ModeAnalog, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "alog2"),
      // Slider
      new Display("dItm17",  750, 100, 500, 50, Disp.ModeSlider, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "sli1"),
    ]
  );

  // PAGE 2 Construction
  this.page_2_obj = new Page_proto_obj(
    "Power",
    'images/page_2.png',
    [
      new Target("maxP",  100, 150, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModRCtrl, 0, 0)),
      new Target("incP",  100, 350, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD4, Item.KModRCtrl, 0, 0)),
      new Target("decP",  100, 450, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD1, Item.KModRCtrl, 0, 0)),
      new Target("minP",  100, 650, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD0, Item.KModRCtrl, 0, 0)),

      new Target("fW",    350, 200, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D1, Item.KModRCtrl, 0, 0)),
      new Target("fP",    650, 200, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D2, Item.KModRCtrl, 0, 0)),
      new Target("fS",    500, 500, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D3, Item.KModRCtrl, 0, 0)),
      new Target("fR",    350, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D4, Item.KModRCtrl, 0, 0)),

      new Target("shRS",  800, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD5, Item.KModNone, 0, 0)),
      new Target("shTp", 1000, 150, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD9, Item.KModNone, 0, 0)),
      new Target("shFr", 1000, 250, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD8, Item.KModNone, 0, 0)),
      new Target("shLe",  800, 400, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD4, Item.KModNone, 0, 0)),
      new Target("shRi", 1200, 400, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD6, Item.KModNone, 0, 0)),
      new Target("shBk", 1000, 550, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD2, Item.KModNone, 0, 0)),
      new Target("shBt", 1000, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModNone, 0, 0)),
    ],
    // Data Display Items
    [] // no display items on this page
  );


  // PAGE 3 Construction
  this.page_3_obj = new Page_proto_obj(
    "Exploring",
    'images/page_3.png',
    [
      new Target("mog", 100, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F1, Item.KModNone, 0, 0)),
      new Target("qds", 100, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.B, Item.KModNone, 0, 0)),
      new Target("qde", 100, 500,120, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.B, Item.KModLCtrl, 0, 0)),

      new Target("hli", 400, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.T, Item.KModLAlt, 0, 0)),
      new Target("lbe", 400, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.Y, Item.KModLAlt, 0, 0)),

      new Target("togSc", 700, 100, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.S, Item.KModLCtrl, 0, 0)),
      new Target("togMi", 900, 100, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.M, Item.KModNone, 0, 0)),
      new Target("decSA", 700, 300, 90, 0, Item.ModePR,    new Cmd(Item.TypeButton, 36, Item.KModNone, 0, 0)),
      new Target("incSA", 900, 300, 90, 0, Item.ModePR,   new Cmd(Item.TypeButton, 34, Item.KModNone, 0, 0)),
      new Target("ping", 800, 500, 120, 0, Item.ModePR,   new Cmd( Item.TypeButton, 35, Item.KModNone, 0, 0)),

      new Target("cstab", 1100, 100, 80, 75, Item.ModeTog,    new Cmd( Item.TypeKey, VK.S, Item.KModLAlt, 0, 0)),
      new Target("gforc", 1200, 100, 80, 75, Item.ModeTog,    new Cmd( Item.TypeKey, VK.G, Item.KModLAlt, 0, 0)),
      new Target("esp",   1200, 300, 80, 75, Item.ModeTog,    new Cmd( Item.TypeKey, VK.E, Item.KModLAlt, 0, 0)),
      new Target("bcid",  1100, 300, 80, 75, Item.ModeTog,new Cmd(Item.TypeKey, VK.PERIOD, Item.KModNone, 0, 0)),
      new Target("rrang", 1100, 500, 90, 0, Item.ModePR,      new Cmd(Item.TypeKey, VK.COMMA, Item.KModNone, 0, 0)),
    ],
    // Data Display Items
    [] // no display items on this page
  );


  // PAGE 4 Construction
  this.page_4_obj = new Page_proto_obj(
    "Planetside",
    'images/page_4.png',
    [
      new Target("togLS",  200, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.N, Item.KModNone, 1, 0)),
      new Target("Aland",  200, 300, 90,  0, Item.ModePR, new Cmd(Item.TypeKey, VK.N, Item.KModLCtrl, 0, 0)), // delayed press - may be map to other key
      new Target("togCL",  200, 500, 70,  0, Item.ModeTog,new Cmd( Item.TypeKey, VK.F11, Item.KModNone, 0, 0)),

      new Target("hli",    400, 100, 80, 75, Item.ModeTog,new Cmd( Item.TypeKey, VK.T, Item.KModLAlt, 0, 0)),
      new Target("rrang",  500, 500, 90,  0, Item.ModePR,new Cmd( Item.TypeKey, VK.COMMA, Item.KModNone, 0, 0)),

      new Target("clsD",   800, 100, 90, 0, Item.ModePR,new Cmd( Item.TypeKey, VK.F8, Item.KModNone, 0, 0)),
      new Target("lckD",   800, 200, 90, 0, Item.ModePR,new Cmd( Item.TypeKey, VK.F8, Item.KModRCtrl, 0, 0)),
      new Target("ulckD", 1100, 200, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F7, Item.KModRCtrl, 0, 0)),

      new Target("fRdy", 800, 400, 120, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F5, Item.KModNone, 0, 0)),
    ],
    // Data Display Items
    [] // no display items on this page
  );


  // PAGE 5 Construction
  this.page_5_obj = new Page_proto_obj(
    "Emergency",
    'images/page_5.png',
    [
      new Target("clsD",    100, 450, 80, 0, Item.ModeTap,new Cmd( Item.TypeKey, VK.F8, Item.KModNone, 0, 0)),
      new Target("lckD",    100, 550, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F8, Item.KModRCtrl, 0, 0)),
      new Target("fRdy",    400, 500, 150, 0, Item.ModeTap,new Cmd( Item.TypeKey, VK.F5, Item.KModNone, 0, 0)),

      new Target("togW",    100, 100, 95, 80, Item.ModeTog,new Cmd( Item.TypeKey, VK.D1, Item.KModRAlt, 0, 0)), // Red= OFF i.e. inverse logic Off=> ON
      new Target("togS",    300, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D2, Item.KModRAlt, 0, 0)), // Red= OFF i.e. inverse logic Off=> ON
      new Target("togE",    500, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D3, Item.KModRAlt, 0, 0)), // Red= OFF i.e. inverse logic Off=> ON

      new Target("togP",    900, 100,  85, 0, Item.ModeTap,new Cmd( Item.TypeKey, VK.D4, Item.KModRAlt, 0, 0)),
      new Target("minP",   1000, 450,  80, 0, Item.ModePR,new Cmd( Item.TypeKey, VK.NUMPAD0, Item.KModRCtrl, 0, 0)),
      new Target("maxP",    800, 350,  80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModRCtrl, 0, 0)),

      new Target("slfD",   1250, 100, 130, 85, Item.ModePR,new Cmd( Item.TypeKey, VK.BACKSPACE, Item.KModRAlt, 0, 0)),
      new Target("eject",  1250, 350,  70, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.L, Item.KModRAlt, 0, 0)),
      new Target("respawn", 1250, 550, 70, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.X, Item.KModNone, 0, 0)),
    ],
    // Data Display Items
    [] // no display items on this page
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

}
// END MACRO DEFINITION


