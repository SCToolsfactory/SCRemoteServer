"use strict";

/*
 * Define the interaction targets for each of the pages (page_n) 5 are currently supported by the HTML layout
 *
 * Parameters are:  pageName, backgroundImage, items 
 *
 * pageName: a name for this page
 * backgroundImage: the URL for the image 
 * items: an array of Target objects to manage the interaction
 *
 *    name:   uniqueID of the object (make sure it is unique within the page)
 *    target: currently only circles are supported 
 *            where x, y are the center coords and d is the diameter
 *    type:   ItemTypeKey, ItemTypeButton  (keyboard simulation / vJoy Button action)
 *    code:   any VK_ name for Keys (see command.js) 
 *            the button index 1.. max for vJoy Buttons
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
    new Target("my1", 200, 100, 90, ItemTypeKey, VK_F2, ItemModNone),
    new Target("my2", 200, 300, 90, ItemTypeKey, VK_F3, ItemModLCtrl),
    new Target("my3", 500, 300, 90, ItemTypeKey, VK_Y, ItemModNone),
    new Target("my4", 700, 500, 90, ItemTypeKey, VK_Z, ItemModNone),
  ]
);

// PAGE 2 Construction
const page_2_obj = new Page_Base_obj(
  "Power",
  'images/page_2.png',
  [
    // TODO create the real targets of this page...
    new Target("my1", 200, 100, 90, ItemTypeKey, VK_F2, ItemModNone),
    new Target("my2", 200, 300, 90, ItemTypeKey, VK_F3, ItemModLCtrl),
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

