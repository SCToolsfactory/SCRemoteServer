"use strict";

/*
 * Define the interaction targets for each of the pages (page_n) 5 are currently supported by the HTML layout
 *
 * Parameters are:  pageName, backgroundImage, items 
 *
 * pageName: a name for this page
 * backgroundImage: the URL for the image 
 * 
 * items: an array of Target objects to manage the interaction
 *
 *    name:   uniqueID of the object (make sure it is unique within the page)    
 *    target: x, y, dw, h
 *              currently only circles and rectangles are supported 
 *              where x, y are the center coords of the shape
 *              circle    set h=0  and dw=diameter
 *              rectangle set h=height and dw=width            
 *    type:   Keystroke / vJoy Button action
 *              ItemTypeKey, ItemTypeButton  
 *            Axis, RotAxis and Slider actions:
 *              ItemTypeXaxis, ItemTypeYaxis, ItemTypeZaxis,
 *              ItemTypeRXaxis, ItemTypeRYaxis, ItemTypeRZaxis,
 *              ItemTypeSL1, ItemTypeSL2
 *    mode:   Press/Release, Toggle or Value mode
 *              ItemModeTogOn    Toggle with ON (light up) at startup
 *              ItemModeTogOff   Toggle with OFF (darkened) at startup
 *              ItemModePR       Press Release
 *              ItemModeTap      A short tap
 *              ItemModeVal      Value mode for Axis, Rot and Sliders
 *              ItemModeAnalog   Analog mode for Axis, Rot and Sliders (orientation is derived from the larger extent)
 *    code:   any VK_ name for Keys (see command.js) 
 *            the button index 1.. max for vJoy Buttons
 *            a 0 .. 1000 value for axis, rotaxis and sliders in Value mode
 *    kMod:    ItemKModNone, ItemKModLCtrl, ItemKModRCtrl, ItemKModLAlt, ItemKModRAlt, ItemKModLShift, ItemKModRShift  - Key modifier
 *            for buttons targets use ItemKModNone
*/
// the vJoy Command Server IP
const IP = '192.168.1.69';
// the vJoy Command Server PORT (UDP protocol)
const PORT = 34123;

// PAGE 1 Construction
const page_1_obj = new Page_Base_obj(
  "Test Page 1",
  'images/page_1.png',
  [
    new Target("my1", 200, 100, 90, 0, ItemTypeKey, ItemModePR, VK_F2, ItemKModRCtrl), // RightCtrl + F2
    new Target("my2", 200, 300, 90, 0, ItemTypeButton, ItemModePR, 3, ItemKModNone),   // vJoy Button 3
    new Target("my3", 500, 200, 90, 0, ItemTypeKey, ItemModePR, VK_Y, ItemKModNone),   // as per kbd layout setting will raise Z in DxGames on QWERTZ keyboards
    new Target("my4", 700, 200, 90, 0, ItemTypeKey, ItemModeTap, VK_Z, ItemKModNone),  // as per kbd layout setting will raise Y on DxGames QWERTZ keyboards
    // toggles 
    new Target("tg1", 200, 500, 90, 0, ItemTypeKey, ItemModeTogOn,   VK_V, ItemKModNone), // toggles with the V key - KeyDown/up when pressed - def ON
    new Target("tg2", 300, 500, 90, 0, ItemTypeButton, ItemModeTogOn,   4, ItemKModNone), // toggles with the button4 - Down/up when pressed - def ON
    new Target("tg3", 400, 500, 90, 0, ItemTypeKey, ItemModeTogOff,  VK_W, ItemKModNone), // toggles with the W key - KeyDown/up when pressed - def OFF
    new Target("tg4", 500, 500, 90, 0, ItemTypeButton, ItemModeTogOff,  5, ItemKModNone), // toggles with the button6 - Down/up when pressed - def OFF
    // analog X axis simulation with 5 ticks from 0..max
    new Target("ax0", 1100, 100, 90, 0, ItemTypeXaxis, ItemModeVal, 1000, ItemKModNone),
    new Target("ax1", 1100, 200, 90, 0, ItemTypeXaxis, ItemModeVal,  750, ItemKModNone),
    new Target("ax2", 1100, 300, 90, 0, ItemTypeXaxis, ItemModeVal,  500, ItemKModNone),
    new Target("ax3", 1100, 400, 90, 0, ItemTypeXaxis, ItemModeVal,  250, ItemKModNone),
    new Target("ax4", 1100, 500, 90, 0, ItemTypeXaxis, ItemModeVal,   0, ItemKModNone),
    // analog sliding type
    new Target("al1", 1000, 300, 100, 500, ItemTypeXaxis, ItemModeAnalog,   500, ItemKModNone), // analog control X
    new Target("al2",  800, 650, 500, 100, ItemTypeYaxis, ItemModeAnalog,   250, ItemKModNone), // analog control Y
  ]
);

// PAGE 2 Construction
const page_2_obj = new Page_Base_obj(
  "Power",
  'images/page_2.png',
  [
    new Target("maxP",  100, 100, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD5, ItemKModLAlt), // double tap..
    new Target("incP",  100, 300, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD5, ItemKModLAlt),
    new Target("decP",  100, 400, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD4, ItemKModLAlt),
    new Target("minP",  100, 600, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD4, ItemKModLAlt), // double tap..

    new Target("fW",    400, 200, 90, 0, ItemTypeKey, ItemModePR, VK_F5, ItemKModNone),
    new Target("fS",    500, 400, 90, 0, ItemTypeKey, ItemModePR, VK_F6, ItemKModNone),
    new Target("fP",    600, 200, 90, 0, ItemTypeKey, ItemModePR, VK_F7, ItemKModNone),
    new Target("fR",    500, 600, 90, 0, ItemTypeKey, ItemModePR, VK_F8, ItemKModNone),

    new Target("shRS",  800, 600, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD5, ItemKModNone),
    new Target("shTp", 1000, 150, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD9, ItemKModNone),
    new Target("shFr", 1000, 250, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD8, ItemKModNone),
    new Target("shLe",  800, 400, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD4, ItemKModNone),
    new Target("shRi", 1200, 400, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD6, ItemKModNone),
    new Target("shBk", 1000, 550, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD2, ItemKModNone),
    new Target("shBt", 1000, 650, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD7, ItemKModNone),
  ]
);


// PAGE 3 Construction
const page_3_obj = new Page_Base_obj(
  "Exploring",
  'images/page_3.png',
  [
    new Target("mog", 100, 100, 90, 0, ItemTypeKey, ItemModePR, VK_F1, ItemKModNone),
    new Target("qds", 100, 300, 90, 0, ItemTypeKey, ItemModePR, VK_B, ItemKModNone),
    new Target("qde", 100, 500,120, 0, ItemTypeKey, ItemModePR, VK_B, ItemKModNone), // delayed press - may be map to another one

    new Target("hli", 400, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_3, ItemKModNone),
    new Target("lbe", 400, 300, 90, 0, ItemTypeKey, ItemModePR, VK_Z, ItemKModLAlt),

    new Target("togSc", 700, 100, 70, 0, ItemTypeKey, ItemModeTogOff, VK_TAB, ItemKModNone),
    new Target("togMi", 900, 100, 70, 0, ItemTypeKey, ItemModeTogOff, VK_SLASH, ItemKModNone),
    new Target("decSA", 700, 300, 90, 0, ItemTypeButton, ItemModePR,         4, ItemKModNone),
    new Target("incSA", 900, 300, 90, 0, ItemTypeButton, ItemModePR,         3, ItemKModNone),
    new Target("ping", 800, 500, 120, 0, ItemTypeButton, ItemModePR,        1, ItemKModNone),

    new Target("cstab", 1100, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_COMMA, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("gforc", 1200, 100, 80, 75, ItemTypeKey, ItemModeTogOff,        0, ItemKModNone), // NOT MAPPED, Red= OFF i.e. inverse logic Off=> ON
    new Target("esp",   1200, 300, 80, 75, ItemTypeKey, ItemModeTogOff,     VK_O, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("bcid",  1100, 300, 80, 75, ItemTypeKey, ItemModeTogOff,VK_PERIOD, ItemKModNone), // Red= OFF i.e. inverse logic Off=> ON
    new Target("rrang", 1100, 500, 90, 0, ItemTypeKey, ItemModePR,     VK_COMMA, ItemKModNone),
  ]
);


// PAGE 4 Construction
const page_4_obj = new Page_Base_obj(
  "Planetside",
  'images/page_4.png',
  [
    new Target("togLS",  200, 100, 80, 75, ItemTypeKey, ItemModeTogOn, VK_N, ItemKModNone),
    new Target("Aland",  200, 300, 90,  0, ItemTypeKey, ItemModePR, VK_N, ItemKModNone), // delayed press - may be map to other key
    new Target("togCL",  200, 500, 70,  0, ItemTypeKey, ItemModeTogOff, VK_F11, ItemKModNone),

    new Target("hli",    400, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_3, ItemKModNone),
    new Target("rrang",  500, 500, 90,  0, ItemTypeKey, ItemModePR,     VK_COMMA, ItemKModNone),

    new Target("clsD",   800, 100, 90, 0, ItemTypeKey, ItemModePR, VK_9, ItemKModNone),
    new Target("lckD",   800, 200, 90, 0, ItemTypeKey, ItemModePR, VK_0, ItemKModNone),
    new Target("ulckD", 1100, 200, 90, 0, ItemTypeKey, ItemModePR, VK_0, ItemKModNone), // same as lock - may be assing to other key

    new Target("fRdy", 800, 400, 120, 0, ItemTypeKey, ItemModePR, VK_8, ItemKModNone),
  ]
);


// PAGE 5 Construction
const page_5_obj = new Page_Base_obj(
  "Emergency",
  'images/page_5.png',
  [
    new Target("respawn", 100, 100, 90, 0, ItemTypeKey, ItemModePR, VK_X, ItemKModNone),
    new Target("lckD",    100, 300, 90, 0, ItemTypeKey, ItemModePR, VK_0, ItemKModNone),
    new Target("minP",    100, 500, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD4, ItemKModLAlt),
    new Target("maxP",    300, 500, 90, 0, ItemTypeKey, ItemModePR, VK_NUMPAD5, ItemKModLAlt),
    new Target("fRdy",    500, 500, 120, 0, ItemTypeKey, ItemModePR, VK_8, ItemKModNone),

    new Target("togW",    300, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_7, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("togS",    500, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_6, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON
    new Target("togP",    700, 100, 80, 75, ItemTypeKey, ItemModeTogOff, VK_4, ItemKModLAlt), // Red= OFF i.e. inverse logic Off=> ON

    new Target("eject",  1000, 100, 90, 0, ItemTypeKey, ItemModePR, VK_L, ItemKModLAlt),
    new Target("slfD",   1200, 600, 90, 0, ItemTypeKey, ItemModePR, VK_BACKSPACE, ItemKModLAlt),
  ]
);

