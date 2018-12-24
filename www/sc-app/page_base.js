"use strict";
// V 1.1
// Base for the Page handling
// !!!! Everything changed here affects all pages 
//

// Base consts for the Target

// Key and Button activation (Key expects Values of KV_.., Buttons 1..max)
const ItemTypeKey = "key", ItemTypeButton = "btn";

// Axis and RotAxis and Slider activation (accepts values from 0..1000, where 500 is the midpoint)
const ItemTypeXaxis = "axX", ItemTypeYaxis = "axY", ItemTypeZaxis = "axZ";
const ItemTypeRXaxis = "axRX", ItemTypeRYaxis = "axRY", ItemTypeRZaxis = "axRZ";
const ItemTypeSL1 = "sl1",ItemTypeSL2 = "sl2";

// Item modes
const ItemModeTogOn = "ton", ItemModeTogOff = "toff", ItemModePR = "pr", ItemModeVal = "val";
// Keystroke modifiers 
const ItemKModNone = "n", ItemKModLCtrl = "lc", ItemKModRCtrl = "rc", ItemKModLAlt = "la", ItemKModRAlt = "ra";

// Debug support
//  Find the DEBUG only comment and comment the complete line to remove


// *********************************************************************
// Target  Object

// internal use by Page_Base
const B_UpAlpha = 0.05,  B_DownAlpha = 0.3; // transparency when released and when pressed (white shape)
const B_TogOnAlpha = 0.01,  B_TogOffAlpha = 0.7; // transparency when On and when Off (black shape)
const CmdModePress = "p", CmdModeRelease = "r", CmdModeTap = "t";

// An object that defines a hit target
class Target {
  constructor(name, x, y, dw, h, type, mode, code, kMod) {
    // properties
    this.name = name; // Unique ID
    this.x = x; // Hit Target Center X
    this.y = y; // Hit Target Center X
    this.dw = dw; // Hit Target Diameter or width
    this.h = h; // Hit Target height if 0 => circle and dw is d(iameter)
    this.type = type; // ItemType..
    this.mode = mode; // ItemMode..
    this.code = code; // a number
    this.kMod = kMod; // ItemKMod
    // internal var
    this.togState = false; // current toggle state true=>on, false=>off
    if ( mode === ItemModeTogOn ) {
      this.togState = true; // init as on
    }
    this.shape = null;
    this.pressed = false;
  }

  // build and return a string like  '{"K":{""Modifier":"rc", VKcode":113, "Mode":"p"}}';
  // IN: the command mode string (CmdModeXY)
  // RETURNS: a command string
  GetCommand( mode ) {
    var cmd = {"cMode":CmdModeTap, "str":""}; // default type is Tap i.e. one action on click or press

    if (this.type === ItemTypeKey) {
      if ( this.mode === ItemModePR ) {
        cmd.cMode = CmdModePress; // has press and release action
      } 
      cmd.str = '{"K":{"Modifier":"' + this.kMod + '"';
      cmd.str += ',"VKcode":' + this.code.toString();
      cmd.str += ',"Mode":"' + mode + '"';
      cmd.str += '}}';
    }
    else if (this.type === ItemTypeButton) {
      if ( this.mode === ItemModePR ) {
        cmd.cMode = CmdModePress; // has press and release action
      } 
      cmd.str = '{"B":{"Modifier":"' + this.kMod + '"'; // modifier is not yet in the command but will be ignored..
      cmd.str += ',"Index":' + this.code.toString();
      cmd.str += ',"Mode":"' + mode + '"';
      cmd.str += '}}';
    }
    // Axis 
    else if (this.type === ItemTypeXaxis) {
      cmd.str = '{"A":{"Direction":"X"';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    else if (this.type === ItemTypeYaxis) {
      cmd.str = '{"A":{"Direction":"Y"';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    else if (this.type === ItemTypeZaxis) {
      cmd.str = '{"A":{"Direction":"Z"';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    // Rot Axis 
    else if (this.type === ItemTypeRXaxis) {
      cmd.str = '{"R":{"Direction":"X"';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    else if (this.type === ItemTypeRYaxis) {
      cmd.str = '{"R":{"Direction":"Y"';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    else if (this.type === ItemTypeRZaxis) {
      cmd.str = '{"R":{"Direction":"Z"';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    // Sliders 
    else if (this.type === ItemTypeSL1) {
      cmd.str = '{"S":{"Index":1';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    else if (this.type === ItemTypeSL2) {
      cmd.str = '{"S":{"Index":2';
      cmd.str += ',"Value":' + this.code.toString();
      cmd.str += '}}';
    }
    return cmd;
  }

  // creates the shape if needed and returns it
  // RETURNS: a createjs.Shape or null
  GetShape() {
    if (this.shape === null) {
      var shape = new createjs.Shape();
      if ( ( this.mode === ItemModeTogOn ) || ( this.mode === ItemModeTogOff ) ) {
        if ( this.h === 0 ) {
          shape.graphics.beginFill("black").drawCircle(this.x, this.y, this.dw / 2);
        }
        else {
          shape.graphics.beginFill("black").drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = this.togState ? B_TogOnAlpha : B_TogOffAlpha;
      } else {
        if ( this.h === 0 ) {
          shape.graphics.beginFill("white").drawCircle(this.x, this.y, this.dw / 2);
        }
        else {
          shape.graphics.beginFill("white").drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = B_UpAlpha;
      }
      shape.name = this.name;
      this.shape = shape;
    }
    return this.shape;
  }

  // Disposes all items from the page
  Dispose() {
    if (this.shape != null) {
      this.shape.removeAllEventListeners();
      this.shape = null;
    }
  }

  // exec the command, depends on event type
  // IN: a createjs Event
  Target_HandleEvent(evt) {
    if (evt.type == "mousedown") {
      // button/key down, toggle click, axis set value
      var cmd = "";
      this.pressed = true; // track mouse Down
      if ( ( this.mode === ItemModePR ) || ( this.mode === ItemModeVal ) ) {
        // GUI change for non toggles
        this.shape.alpha = B_DownAlpha;
        var cmd = this.GetCommand( CmdModePress );
      } 
      else {
        // GUI change for toggles
        this.togState = !this.togState; // Toggle state
        this.shape.alpha = this.togState ? B_TogOnAlpha : B_TogOffAlpha;
        var cmd = this.GetCommand( CmdModeTap );
      }
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("debug").innerHTML = this.responseText; // DEBUG ONLY
        }
      };
      xmlhttp.open("GET", 'calludp.php?msg=' + cmd.str + '&ip=' + IP + '&p=' + PORT.toString(), true);
      xmlhttp.send();
    }

    if ((evt.type == "pressup") || (this.pressed && (evt.type == "mouseout"))) {
      this.pressed = false; // track mouse Up/Out
      if ( ( this.mode === ItemModePR ) || ( this.mode === ItemModeVal ) ) {
        // GUI change for non toggles
        this.shape.alpha = B_UpAlpha;
      }
      var cmd = this.GetCommand( CmdModeRelease );
      if ( cmd.cMode === CmdModeTap ) return; // tap types don't have a release action 

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("debug").innerHTML = this.responseText; // DEBUG ONLY
        }
      };
      xmlhttp.open("GET", 'calludp.php?msg=' + cmd.str + '&ip=' + IP + '&p=' + PORT.toString(), true);
      xmlhttp.send();
    }
  }
}// class



// *********************************************************************
// Page_Base_obj  Object
// An object that defines and handles the Page_Base  
class Page_Base_obj {
  constructor(pageName, backgroundImageUri, items) {
    this.PageName = pageName;
    this.BackgroundImageUri = backgroundImageUri;
    this.BackgroundImg = null;
    this.Stage = null;
    this.Items = items;
  }

  // Basic initialization of this page
  Init(canvas) {
    var self = this; // maintain this context for the callback
    this.Stage = new createjs.Stage(canvas);
    // to get onMouseOver & onMouseOut events, we need to enable them on the stage:
    this.Stage.enableMouseOver();
    createjs.Touch.enable(this.Stage, true); // touch device support... - must disable when stage is no longer used
    this.BackgroundImg = new Image();
    this.BackgroundImg.onload = function () {
      // called when loading image has completed (use self to access page object elements)
      var bitmap = new createjs.Bitmap(self.BackgroundImg);
      self.Stage.addChildAt(bitmap, 0); // alloc as background image
      self.Stage.update();
    };
    this.BackgroundImg.src = this.BackgroundImageUri;
    this.Init_closure(); // do everything after the background is loaded
    // GUI update
    this.Stage.update();
  }

  // load shapes onto the background
  Init_closure() {
    for (var i = 0; i < this.Items.length; ++i) {
      var shape = this.GetShape(i);
      this.Stage.addChild(shape);
      // add a handler for all the events we're interested in:
      shape.on("mousedown", this.Items_HandleEvent, null, false, this);
      shape.on("pressup", this.Items_HandleEvent, null, false, this);
      shape.on("mouseout", this.Items_HandleEvent, null, false, this);
      //shape.on("click", this.Items_HandleEvent, null, false, this );
      //shape.on("dblclick", this.Items_HandleEvent, null, false, this );
    }
  }

  // Disposes all runtime allocated items from the page
  Dispose() {
    createjs.Touch.disable(this.Stage); // according to documentation..
    this.Stage.removeAllEventListeners();
    this.Stage.removeAllChildren();
    for (var i = 0; i < this.Items.length; ++i) {
      this.Items[i].Dispose(); // remove shapes..
    }
    this.Stage = null;
    this.BackgroundImg = null;
  }

  // Get an item by name
  // IN: itemName - a string
  // RETURNS: an Item or null
  GetItemByName(itemName) {
    for (var i = 0; i < this.Items.length; ++i) {
      if (this.Items[i].name === itemName) {
        return this.Items[i];
      }
    }
    return null;
  }

  // build and return a string like  '{"K":{""Modifier":"rc", VKcode":113, "Mode":"p"}}';
  // IN: itemIndex 0... n
  // IN: the command mode string (CmdModeXY)
  // RETURNS: a command string
  GetCommand(itemIndex, mode) {
    if ((itemIndex >= 0) && (itemIndex < this.Items.length)) {
      var cmd = this.Items[itemIndex].GetCommand(mode);
      return cmd;
    }
    return "";
  }

  // build and return a string like  '{"K":{""Modifier":"rc", VKcode":113, "Mode":"p"}}';
  // IN: itemName - a string
  // IN: the command mode string (CmdModeXY)
  // RETURNS: a command string
  GetCommandByName(itemName, mode) {
    for (var i = 0; i < this.Items.length; ++i) {
      if (this.Items[i].name === itemName) {
        return this.GetCommand(i, mode);
      }
    }
    return "";
  }

  // creates the shape if needed and returns it
  // IN: itemIndex 0... n
  // RETURNS: a createjs.Shape or null
  GetShape(itemIndex) {
    if ((itemIndex >= 0) && (itemIndex < this.Items.length)) {
      return this.Items[itemIndex].GetShape();
    }
    return null;
  }

  // creates the shape if needed and returns it
  // IN: itemName - a string
  // RETURNS: a createjs.Shape or null
  GetShapeByName(itemName) {
    for (var i = 0; i < this.Items.length; ++i) {
      if (this.Items[i].name === itemName) {
        return this.GetShape(i);
      }
    }
    return null;
  }

  // iterates the items and exec the command if required
  // this is called out of context ( another This issue..., parameter self carries the page context )
  // IN: a createjs Event
  // IN: the page context
  Items_HandleEvent(evt, self) {
    for (var i = 0; i < self.Items.length; ++i) {
      // check all items for the Event raising one
      if (evt.target.name === self.Items[i].name) {
        self.Items[i].Target_HandleEvent(evt);
        // GUI update for changed target shape
        self.Stage.update();
      }
    } //for all
  }
}// class











