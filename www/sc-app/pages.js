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
 *    target: currently only circles are supported 
 *            where x, y are the center coords and d is the diameter
 *    type:   Keystroke / vJoy Button action
 *              ItemTypeKey, ItemTypeButton  
 *            Axis, RotAxis and Slider actions:
 *              ItemTypeXaxis, ItemTypeYaxis, ItemTypeZaxis,
 *              ItemTypeRXaxis, ItemTypeRYaxis, ItemTypeRZaxis,
 *              ItemTypeSL1, ItemTypeSL2
 *    code:   any VK_ name for Keys (see command.js) 
 *            the button index 1.. max for vJoy Buttons
 *            a 0 .. 1000 value for axis, rotaxis and sliders
 *    mod:    ItemModNone, ItemModLCtrl, ItemModRCtrl, ItemModLAlt, ItemModRAlt  - Key modifier
 *            for buttons targets use ItemModNone
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
    new Target("my1", 200, 100, 90, ItemTypeKey, VK_F2, ItemModRCtrl), // RightCtrl + F2
    new Target("my2", 200, 300, 90, ItemTypeButton, 3, ItemModNone),   // vJoy Button 3
    new Target("my3", 500, 300, 90, ItemTypeKey, VK_Y, ItemModNone),   // as per kbd layout setting will raise Z in DxGames on QWERTZ keyboards
    new Target("my4", 700, 300, 90, ItemTypeKey, VK_Z, ItemModNone),   // as per kbd layout setting will raise Y on DxGames QWERTZ keyboards
    // analog X axis simulation with 5 ticks from 0..max
    new Target("ax0", 1100, 100, 90, ItemTypeXaxis, 1000, ItemModNone),
    new Target("ax1", 1100, 200, 90, ItemTypeXaxis,  750, ItemModNone),
    new Target("ax2", 1100, 300, 90, ItemTypeXaxis,  500, ItemModNone),
    new Target("ax3", 1100, 400, 90, ItemTypeXaxis,  250, ItemModNone),
    new Target("ax4", 1100, 500, 90, ItemTypeXaxis,    0, ItemModNone),
  ]
);

// PAGE 2 Construction
const page_2_obj = new Page_Base_obj(
  "Power",
  'images/page_2.png',
  [
    // TODO create the real targets of this page...
    new Target("my1", 200, 100, 90, ItemTypeXaxis, 777, ItemModNone), // X axis set to 777 (of 1000)
    new Target("my2", 200, 300, 90, ItemTypeXaxis,   0, ItemModNone), // X axis set to 0 (=Min)
    new Target("my3", 500, 300, 90, ItemTypeKey, VK_F6, ItemModRAlt),
    new Target("my4", 700, 500, 90, ItemTypeKey, VK_F5, ItemModNone),
  ]
);


// PAGE 3 Construction
const page_3_obj = new Page_Base_obj(
  "Exploring",
  'images/page_3.png',
  [
    // TODO create the real targets of this page...
    new Target("my1", 200, 100, 90, ItemTypeKey, VK_F2, ItemModNone),
    new Target("my2", 200, 300, 90, ItemTypeKey, VK_F3, ItemModLCtrl),
    new Target("my3", 500, 300, 90, ItemTypeKey, VK_F6, ItemModRAlt),
    new Target("my4", 700, 500, 90, ItemTypeKey, VK_F5, ItemModNone),
  ]
);


// PAGE 4 Construction
const page_4_obj = new Page_Base_obj(
  "Planetside",
  'images/page_4.png',
  [
    // TODO create the real targets of this page...
    new Target("my1", 200, 100, 90, ItemTypeKey, VK_F2, ItemModNone),
    new Target("my2", 200, 300, 90, ItemTypeKey, VK_F3, ItemModLCtrl),
    new Target("my3", 500, 300, 90, ItemTypeKey, VK_F6, ItemModRAlt),
    new Target("my4", 700, 500, 90, ItemTypeKey, VK_F5, ItemModNone),
  ]
);


// PAGE 5 Construction
const page_5_obj = new Page_Base_obj(
  "Emergency",
  'images/page_5.png',
  [
    new Target("eject",   100, 200, 90, ItemTypeKey, VK_L, ItemModLAlt),
    new Target("respawn", 300, 200, 90, ItemTypeKey, VK_X, ItemModNone),
    new Target("togW",    200, 500, 90, ItemTypeKey, VK_7, ItemModNone),
    new Target("togS",    400, 500, 90, ItemTypeKey, VK_6, ItemModNone),
    new Target("togP",    600, 500, 90, ItemTypeKey, VK_4, ItemModNone),
    new Target("minP",    800, 500, 90, ItemTypeKey, VK_NUMPAD4, ItemModLAlt),
    new Target("maxP",    800, 300, 90, ItemTypeKey, VK_NUMPAD5, ItemModLAlt),
    new Target("lckD",   1200, 500, 90, ItemTypeKey, 0, ItemModNone), // defaultProfile not assigned
    new Target("slfD",   1200, 200, 90, ItemTypeKey, VK_BACKSPACE, ItemModLAlt),
  ]
);

