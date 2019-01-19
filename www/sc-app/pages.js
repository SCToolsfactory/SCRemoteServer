"use strict";

// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer


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
 *              ItemTypeKey, ItemTypeButton  
 *            Axis, RotAxis and Slider actions:
 *              ItemTypeXaxis, ItemTypeYaxis, ItemTypeZaxis,
 *              ItemTypeRXaxis, ItemTypeRYaxis, ItemTypeRZaxis,
 *              ItemTypeSL1, ItemTypeSL2
 *    mode:   Press/Release, Toggle, Analog, Slider or Value mode
 *              ItemModeTogOn    Toggle with ON (light up) at startup
 *              ItemModeTogOff   Toggle with OFF (darkened) at startup
 *              ItemModeBiTog    Toggle type (default OFF shows the upper part)
 *              ItemModeBiTogLR  Toggle type (default OFF shows the left part)
 *              ItemModePR       Press Release
 *              ItemModeTap      A short tap
 *              ItemModeVal      Value mode for Axis, Rot and Sliders
 *              ItemModeAnalog   Analog mode for Axis, Rot and Sliders
 *              ItemModeSlider   Slider mode for Axis, Rot and Sliders (orientation is derived from the larger extent)
 *    code:   any VK_ name for Keys (see command.js) 
 *            the button index 1.. max for vJoy Buttons
 *            a 0 .. 1000 value for axis, rotaxis and sliders
 *    kMod:    ItemKModNone, ItemKModLCtrl, ItemKModRCtrl, ItemKModLAlt, ItemKModRAlt, ItemKModLShift, ItemKModRShift  - Key modifier
 *            for buttons targets use ItemKModNone
 * 
 * 
 * dItems: an array of Data Display objects
 *
 *    name:   uniqueID of the object (make sure it is unique within the page)    
 *    target: x, y, dw, h
 *            currently only circles and rectangles are supported 
 *            where x, y are the center coords of the shape
 *              circle    set h=0  and dw=diameter
 *              rectangle set h=height and dw=width            
 *    mode:   Data Display mode
 *              DispModeTxt      Text type (text is shown either string or value)
 *                               Note: For Text the x,y define the location, where the alignment is then around x,y i.e.
 *                               CenterAlign centers the text around x,y.
 *              DispModeTogOn    Toggle type (boolean data only - default ON unmasked, false shows the background)
 *              DispModeTogOff   Toggle type (boolean data only - default OFF masked, true shows the background)
 *              DispModeBiTog    Toggle type (boolean data only - default OFF shows the upper part)
 *              DispModeBiTogLR  Toggle type (boolean data only - default OFF shows the left part)
 *              DispModeSig      Signal type (boolean data only - the background is covered by the shape with color if true)
 *              DispModeAnalog   Analog type 0..100.0 (value data only - a bar of value size is show - the rest is masked out)
 *              DispModeSlider   Slider type 0..100.0 (value data only - a slider handle is shown at the value position)
 *    align:  Horizontal Text alignment
 *              LeftAlign, CenterAlign, RightAlign
 *    bline:  Vertical Text baseline (uses the character box of the font to align)
 *              Bottom, Middle, Top
 *    font:   A CSS style font specification for Text items (see page_base for some prefabricated values)
 *    color:  A CSS style color specification for Text and Signal items (see page_base for some prefabricated values)
 *    section: The data source section 
 *    item:    The data source item within the section  (section.item)
 */

 
// the vJoy Command Server IP
const IP = '192.168.1.69';
// the vJoy Command Server PORT (UDP protocol)
const PORT = 34123;

// data file to capture content from, located in and loaded from webRoot/data
const DATAFILE = "sc-app.json";

// Some 'consts' to be overwritten here - called at the very beginning
// also other user init should be done here
function  myPages_Init() 
{
  /*
   CUSTOMIZATION OPTIONS HERE
     This section can be fully or partially uncommented and used to overwrite the page_base.js defaults
      used for the interaction with the pages

  // Mode: ItemModeTap - defines the length of a tap action
  CmdModeShortTapDuration_ms = 100;  // The duration of a short tap in milliseconds

  // colors and transparency (0=invisible; 1= opaque) to indicate interaction
  // Note: invisible = 0 does not provide a touch target so let it at least 0.01 to enable interaction

  // Touch Targets - color is the touch indication color of the area when pressed or tapped
  B_UpDownCol = "white";  // Button Down color
  B_UpAlpha = 0.05;       // Don't set this to invisible else a touch is no longer detected
  B_DownAlpha = 0.3;      // transparency when pressed (white shape highlights the click/touch)

  // Toggle Targets - color is the hiding the area color and alpha the transparency of the two states 
  B_TogCol = "black";     // Toggle cover mask color
  B_TogOnAlpha = 0.01;    // Don't set this to invisible else a touch is no longer detected
  B_TogOffAlpha = 0.7;    // transparency when Off (black shape covers the page drawing)

  // Analog Targets - color of the unset area i.e. the one above the set point
  A_AnalogCol = "black";  // cover mask color
  A_AnalogAlpha = 0.9;    // transparency for the unused part of analog controls (black shape)
  // Slider Targets - color of the unset area i.e. the one outside the set point
  A_SliderCol = "black";  // sliding cover mask color
  A_SliderAlpha = 0.9;    // transparency for the unused part of analog controls (black shape)
  // Target Handle width (height) of the Slider behavior
  A_SliderHandleWidth_px = 10; // width or height of the illuminated part of the slider in pixel

  // **** Data Display Mods (Alpha may be invisible here i.e. == 0)
  DisplayPerSec = 1;  // Max 10 but 2..4 should do it - how many times the data is polled to look for updates per second

  // Display Toggle 
  D_TogCol = "black";    // mask color
  D_TogOnAlpha = 0.01;
  D_TogOffAlpha = 0.7;   // transparency when On and when Off (black shape)
  // Display Signal
  D_SigOnAlpha = 1.0;
  D_SigOffAlpha = 0.0;   // transparency when On and when Off (color shape)
  // Display Analog
  D_AnalogCol = "black"; // cover mask color
  D_AnalogAlpha = 0.9;   // transparency for the unused part of analog controls (black shape)
  // Display Slider
  D_SliderCol = "black"; // cover mask color
  D_SliderAlpha = 0.9;   // transparency for the unused part of analog controls (black shape)
  // Display Handle width (height) of the Slider behavior
  D_SliderHandleWidth_px = 10; // width or height of the illuminated part of the slider in pixel

  */

  // Active Mods for this Demo
  D_AnalogAlpha = 0.95;   // transparency for the unused part of analog display (black shape covers the page drawing)
  D_SliderAlpha = 0.7;    // transparency for the unused part of slider display controls (black shape covers the page drawing)
  D_SliderHandleWidth_px = 5; // width or height of the illuminated part of the slider in pixel

  DisplayPerSec = 0.5;  // slow down for Demo - 2sec update pace
}


// PAGE 1 Construction
const page_1_obj = new Page_Base_obj(
  "Test Page 1",
  'images/page_1.png',
  [
    // Hit / Touch Targets
    new Target("my1", 100, 100, 90, 0, ItemTypeKey, ItemModePR, VK_F2, ItemKModRCtrl), // RightCtrl + F2
    new Target("my2", 100, 300, 90, 0, ItemTypeButton, ItemModePR, 3, ItemKModNone),   // vJoy Button 3
    new Target("my3", 200, 100, 90, 0, ItemTypeKey, ItemModePR, VK_Y, ItemKModNone),   // as per kbd layout setting will raise Z in DxGames on QWERTZ keyboards
    new Target("my4", 300, 100, 90, 0, ItemTypeKey, ItemModeTap, VK_Z, ItemKModNone),   // as per kbd layout setting will raise Y on DxGames QWERTZ keyboards
    // toggles 
    new Target("tg1", 100, 500, 90, 0, ItemTypeKey, ItemModeTogOn,   VK_V, ItemKModNone), // toggles with the V key - KeyDown/up when pressed - def ON
    new Target("tg2", 200, 500, 90, 0, ItemTypeButton, ItemModeTogOn,   4, ItemKModNone), // toggles with the button4 - Down/up when pressed - def ON
    new Target("tg3", 300, 500, 90, 0, ItemTypeKey, ItemModeTogOff,  VK_W, ItemKModNone), // toggles with the W key - KeyDown/up when pressed - def OFF
    new Target("tg4", 400, 500, 90, 0, ItemTypeButton, ItemModeTogOff,  5, ItemKModNone), // toggles with the button5 - Down/up when pressed - def OFF
    // bi-color toggles 
    new Target("tg5", 400, 350, 85, 0, ItemTypeButton, ItemModeBiTog,  6, ItemKModNone), // toggles with the button6
    new Target("tg6", 250, 250, 95, 95, ItemTypeButton, ItemModeBiTog,  7, ItemKModNone), // toggles with the button7
    new Target("tg7", 400, 250, 100, 0, ItemTypeButton, ItemModeBiTog,  8, ItemKModNone), // toggles with the button8
    new Target("tg8", 250, 350, 100, 70, ItemTypeButton, ItemModeBiTogLR,  9, ItemKModNone), // toggles with the button9
    // analog X axis simulation with 5 ticks from 0..max
    new Target("ax0", 1250, 100, 90, 0, ItemTypeXaxis, ItemModeVal, 1000, ItemKModNone), // send 1000 as value
    new Target("ax1", 1250, 200, 90, 0, ItemTypeXaxis, ItemModeVal,  750, ItemKModNone), // send  750 as value
    new Target("ax2", 1250, 300, 90, 0, ItemTypeXaxis, ItemModeVal,  500, ItemKModNone), // send  500 as value
    new Target("ax3", 1250, 400, 90, 0, ItemTypeXaxis, ItemModeVal,  250, ItemKModNone), // send  250 as value
    new Target("ax4", 1250, 500, 90, 0, ItemTypeXaxis, ItemModeVal,    0, ItemKModNone), // send    0 as value
    // Analog and Slider type target
    new Target("al1", 1150, 300, 100, 500, ItemTypeXaxis, ItemModeAnalog,   500, ItemKModNone), // analog control, init 500 (middle scale)
    new Target("sl1",  850, 650, 500, 94, ItemTypeYaxis, ItemModeSlider,   250, ItemKModNone), // slider control, init 250 (1/4 scale)
  ],
  // Data Display Items
  [
    // Text
    new Display("dItm1",  700, 400, 190,  90, DispModeTxt, CenterAlign, Middle, Font16, D_Yellow, "section1", "item1"),
    new Display("dItm2",  650, 300, 100,  50, DispModeTxt, CenterAlign, Middle, Font16m, D_Red, "section1", "item2"),
    new Display("dItm3",  800, 300, 100,  50, DispModeTxt, CenterAlign, Middle, Font24m, D_Blue, "section2", "item44"),
    // Toggles
    new Display("dItm11",  100, 600, 50,   0, DispModeTogOn, Dummy, Dummy, Dummy, Dummy, "section3", "tog1"), // circle
    new Display("dItm12",  300, 600, 50,   0, DispModeTogOff, Dummy, Dummy, Dummy, Dummy, "section3", "tog1"), // circle
    // Bi color Toggles
    new Display("dItm21",  100, 700, 85,   0, DispModeBiTogLR, Dummy, Dummy, Dummy, Dummy, "section3", "tog1"),
    new Display("dItm22",  300, 700, 95,  95, DispModeBiTog, Dummy, Dummy, Dummy, Dummy, "section3", "tog2"),
    // Signal - uses the given color as shape color (shown when true)
    new Display("dItm14", 1000, 200, 70,   0, DispModeSig, Dummy, Dummy, Dummy, D_Green, "section3", "sig1"), // circle
    // Analogs (Bars)
    new Display("dItm15",  500, 350, 40, 300, DispModeAnalog, Dummy, Dummy, Dummy, Dummy, "section3", "alog1"),
    new Display("dItm16",  547, 350, 20, 300, DispModeAnalog, Dummy, Dummy, Dummy, Dummy, "section3", "alog2"),
    // Slider
    new Display("dItm17",  750, 100, 500, 50, DispModeSlider, Dummy, Dummy, Dummy, Dummy, "section3", "sli1"),
  ]
);

// PAGE 2 Construction
const page_2_obj = new Page_Base_obj(
  "Power",
  'images/page_2.png',
  [
    new Target("maxP",  100, 150, 80, 0, ItemTypeKey, ItemModePR, VK_NUMPAD7, ItemKModRCtrl),
    new Target("incP",  100, 350, 80, 0, ItemTypeKey, ItemModePR, VK_NUMPAD4, ItemKModRCtrl),
    new Target("decP",  100, 450, 80, 0, ItemTypeKey, ItemModePR, VK_NUMPAD1, ItemKModRCtrl),
    new Target("minP",  100, 650, 80, 0, ItemTypeKey, ItemModePR, VK_NUMPAD0, ItemKModRCtrl),

    new Target("fW",    350, 200, 80, 0, ItemTypeKey, ItemModeTap, VK_1, ItemKModRCtrl),
    new Target("fP",    650, 200, 80, 0, ItemTypeKey, ItemModeTap, VK_2, ItemKModRCtrl),
    new Target("fS",    500, 500, 80, 0, ItemTypeKey, ItemModeTap, VK_3, ItemKModRCtrl),
    new Target("fR",    350, 650, 80, 0, ItemTypeKey, ItemModeTap, VK_4, ItemKModRCtrl),

    new Target("shRS",  800, 650, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD5, ItemKModNone),
    new Target("shTp", 1000, 150, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD9, ItemKModNone),
    new Target("shFr", 1000, 250, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD8, ItemKModNone),
    new Target("shLe",  800, 400, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD4, ItemKModNone),
    new Target("shRi", 1200, 400, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD6, ItemKModNone),
    new Target("shBk", 1000, 550, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD2, ItemKModNone),
    new Target("shBt", 1000, 650, 80, 0, ItemTypeKey, ItemModeTap, VK_NUMPAD7, ItemKModNone),
  ],
  // Data Display Items
  [] // no display items on this page
);


// PAGE 3 Construction
const page_3_obj = new Page_Base_obj(
  "Exploring",
  'images/page_3.png',
  [
    new Target("mog", 100, 100, 90, 0, ItemTypeKey, ItemModePR, VK_F1, ItemKModNone),
    new Target("qds", 100, 300, 90, 0, ItemTypeKey, ItemModePR, VK_B, ItemKModNone),
    new Target("qde", 100, 500,120, 0, ItemTypeKey, ItemModePR, VK_B, ItemKModLCtrl), 

    new Target("hli", 400, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_T, ItemKModLAlt),
    new Target("lbe", 400, 300, 90, 0, ItemTypeKey, ItemModePR, VK_Y, ItemKModLAlt),

    new Target("togSc", 700, 100, 70, 0, ItemTypeKey, ItemModeTogOff, VK_S, ItemKModLCtrl),
    new Target("togMi", 900, 100, 70, 0, ItemTypeKey, ItemModeTogOff, VK_M, ItemKModNone),
    new Target("decSA", 700, 300, 90, 0, ItemTypeButton, ItemModePR,    36, ItemKModNone),
    new Target("incSA", 900, 300, 90, 0, ItemTypeButton, ItemModePR,    34, ItemKModNone),
    new Target("ping", 800, 500, 120, 0, ItemTypeButton, ItemModePR,    35, ItemKModNone),

    new Target("cstab", 1100, 100, 80, 75, ItemTypeKey, ItemModeTogOff,     VK_S, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("gforc", 1200, 100, 80, 75, ItemTypeKey, ItemModeTogOff,     VK_G, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("esp",   1200, 300, 80, 75, ItemTypeKey, ItemModeTogOff,     VK_E, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("bcid",  1100, 300, 80, 75, ItemTypeKey, ItemModeTogOff,VK_PERIOD, ItemKModNone), // Red= OFF i.e. inverse logic Off=> ON
    new Target("rrang", 1100, 500, 90, 0, ItemTypeKey, ItemModePR,      VK_COMMA, ItemKModNone),
  ],
  // Data Display Items
  [] // no display items on this page
);


// PAGE 4 Construction
const page_4_obj = new Page_Base_obj(
  "Planetside",
  'images/page_4.png',
  [
    new Target("togLS",  200, 100, 80, 75, ItemTypeKey, ItemModeTogOn, VK_N, ItemKModNone),
    new Target("Aland",  200, 300, 90,  0, ItemTypeKey, ItemModePR, VK_N, ItemKModLCtrl), // delayed press - may be map to other key
    new Target("togCL",  200, 500, 70,  0, ItemTypeKey, ItemModeTogOff, VK_F11, ItemKModNone),

    new Target("hli",    400, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_T, ItemKModLAlt),
    new Target("rrang",  500, 500, 90,  0, ItemTypeKey, ItemModePR, VK_COMMA, ItemKModNone),

    new Target("clsD",   800, 100, 90, 0, ItemTypeKey, ItemModePR, VK_F8, ItemKModNone),
    new Target("lckD",   800, 200, 90, 0, ItemTypeKey, ItemModePR, VK_F8, ItemKModRCtrl),
    new Target("ulckD", 1100, 200, 90, 0, ItemTypeKey, ItemModePR, VK_F7, ItemKModRCtrl),

    new Target("fRdy", 800, 400, 120, 0, ItemTypeKey, ItemModePR, VK_F5, ItemKModNone),
  ],
  // Data Display Items
  [] // no display items on this page
);


// PAGE 5 Construction
const page_5_obj = new Page_Base_obj(
  "Emergency",
  'images/page_5.png',
  [
    new Target("clsD",    100, 450, 80, 0, ItemTypeKey, ItemModeTap, VK_F8, ItemKModNone),
    new Target("lckD",    100, 550, 80, 0, ItemTypeKey, ItemModeTap, VK_F8, ItemKModRCtrl),
    new Target("fRdy",    400, 500, 150, 0, ItemTypeKey, ItemModeTap, VK_F5, ItemKModNone),

    new Target("togW",    100, 100, 95, 80, ItemTypeKey, ItemModeTogOff, VK_1, ItemKModRAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("togS",    300, 100, 95, 80, ItemTypeKey, ItemModeTogOff, VK_2, ItemKModRAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("togE",    500, 100, 95, 80, ItemTypeKey, ItemModeTogOff, VK_3, ItemKModRAlt), // Red= OFF i.e. inverse logic Off=> ON

    new Target("togP",    900, 100,  85, 0, ItemTypeKey, ItemModeTap, VK_4, ItemKModRAlt),
    new Target("minP",   1000, 450,  80, 0, ItemTypeKey, ItemModePR, VK_NUMPAD0, ItemKModRCtrl),
    new Target("maxP",    800, 350,  80, 0, ItemTypeKey, ItemModePR, VK_NUMPAD7, ItemKModRCtrl),

    new Target("slfD",   1250, 100, 130, 85, ItemTypeKey, ItemModePR, VK_BACKSPACE, ItemKModRAlt),
    new Target("eject",  1250, 350,  70, 0, ItemTypeKey, ItemModePR, VK_L, ItemKModRAlt),
    new Target("respawn", 1250, 550, 70, 0, ItemTypeKey, ItemModePR, VK_X, ItemKModNone),
  ],
  // Data Display Items
  [] // no display items on this page
);

