"use strict";
// V 1.0
// Base for the Page handling
// !!!! Everything changed here affects all pages 
//

// Base consts for the Target
const ItemTypeKey = "key", ItemTypeButton = "btn";
const ItemModNone = "n", ItemModLCtrl = "lc", ItemModRCtrl = "rc", ItemModLAlt = "la", ItemModRAlt = "ra";


// An object that defines a hit target
function Target(name, x, y, d, type, code, mod)
{
  // properties
  this.name = name;   // Unique ID
  this.x = x;         // Hit Target Center X
  this.y = y;         // Hit Target Center X
  this.d = d;         // Hit Target Diameter
  this.type = type;   // ItemType..
  this.code = code;   // a number
  this.mod = mod;     // ItemMod
  
  // internal var
  this.shape = null;
  this.pressed = false;
}

// An object that defines and handles the Page_Base  
function Page_Base_obj (pageName, backgroundImageUri, items)
{
  this.PageName = pageName;
  this.BackgroundImageUri = backgroundImageUri;
  this.BackgroundImg = null;
  this.Stage = null;
  
  this.Items = items;
  
}

// internal use by Page_Base
const B_UPalpha = 0.1,  B_DOWNalpha = 0.4; // transparency when released and when pressed
const ItemModePress = "p", ItemModeRelease = "r", ItemModeTap = "t";


// Basic initialization of this page
Page_Base_obj.prototype.Init = function(canvas)
{
  var self = this;
  this.Stage = new createjs.Stage(canvas);
  // to get onMouseOver & onMouseOut events, we need to enable them on the stage:
  this.Stage.enableMouseOver();
  createjs.Touch.enable(this.Stage, true); // touch device support... - must disable when stage is no longer used

  this.BackgroundImg = new Image();
  this.BackgroundImg.onload = function() {
      var bitmap = new createjs.Bitmap(self.BackgroundImg);
      self.Stage.addChildAt(bitmap, 0); // back
      self.Stage.update();
  }
  this.BackgroundImg.src = this.BackgroundImageUri;

  this.Init_closure(); // do everything after the background is loaded
  
  this.Stage.update();
}

// load shapes onto the background
Page_Base_obj.prototype.Init_closure = function() 
{
  for (var i = 0; i < this.Items.length; ++i) {
    var shape = this.GetShape( i );
    this.Stage.addChild( shape );
    // add a handler for all the events we're interested in:
    shape.on("mousedown", this.Items_HandleEvent, null, false, this );
    shape.on("pressup", this.Items_HandleEvent, null, false, this );
    shape.on("mouseout", this.Items_HandleEvent, null, false, this );
    //shape.on("click", this.Items_HandleEvent);
    //shape.on("dblclick", this.Items_HandleEvent);
  }
}


// handles the delayed image loading from the server
Page_Base_obj.prototype.Dispose = function() {
  createjs.Touch.disable(this.Stage);
  this.Stage.removeAllEventListeners();
  this.Stage.removeAllChildren();
  for (var i = 0; i < this.Items.length; ++i) {
    if ( this.Items[i].shape != null ) {
      this.Items[i].shape.removeAllEventListeners();
      this.Items[i].shape = null;
    }
  }
  this.Stage = null;
  this.BackgroundImg = null;
}

////////////

// Get an item by name
// IN: itemName - a string
// RETURNS: an Item or null
Page_Base_obj.prototype.GetItemByName = function(itemName)
{
  for (var i = 0; i < this.Items.length; ++i) {
    if ( this.Items[i].name === itemName ) {
      return this.Items[i];
    }
  }
  return null;
}

// build and return a string like  '{"K":{""Modifier":"rc", VKcode":113, "Mode":"p"}}';
// IN: itemIndex 0... n
// IN: the command mode string (ItemModeXY)
// RETURNS: a command string
Page_Base_obj.prototype.GetCommand = function(itemIndex, mode) 
{
  if ( (itemIndex>=0) && (itemIndex<this.Items.length) ) {
    var cmd = "";
    if ( this.Items[itemIndex].type === ItemTypeKey ) {
      cmd = '{"K":{"Modifier":"' + this.Items[itemIndex].mod + '"';
      cmd +=',"VKcode":' + this.Items[itemIndex].code.toString();
      cmd += ',"Mode":"' + mode + '"';
      cmd += '}}';
    }
    else if ( this.Items[itemIndex].type === ItemTypeButton ) {
      cmd = '{"B":{"Modifier":"' + this.Items[itemIndex].mod + '"'; // modifier is not yet in the command but will be ignored..
      cmd +=',"Index":' + this.Items[itemIndex].code.toString();
      cmd += ',"Mode":"' + mode + '"';
      cmd += '}}';
    }
    return cmd;
  }
  return "";
}

// build and return a string like  '{"K":{""Modifier":"rc", VKcode":113, "Mode":"p"}}';
// IN: itemName - a string
// IN: the command mode string (ItemModeXY)
// RETURNS: a command string
Page_Base_obj.prototype.GetCommandByName = function (itemName, mode) 
{
  for (var i = 0; i < this.Items.length; ++i) {
    if ( this.Items[i].name === itemName ) {
      return this.GetCommand( i, mode );
    }
  }
  return "";
}

// creates the shape if needed and returns it
// IN: itemIndex 0... n
// RETURNS: a createjs.Shape or null
Page_Base_obj.prototype.GetShape = function(itemIndex)
{
  if ( (itemIndex>=0) && (itemIndex<this.Items.length) ) {
      if ( this.Items[itemIndex].shape === null ) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("white").drawCircle(0, 0, this.Items[itemIndex].d/2);
        circle.x = this.Items[itemIndex].x;
        circle.y = this.Items[itemIndex].y;
        circle.alpha = B_UPalpha;
        circle.name = this.Items[itemIndex].name;
        this.Items[itemIndex].shape = circle;
      }
      return this.Items[itemIndex].shape;
  }
  return null;
}

// creates the shape if needed and returns it
// IN: itemName - a string
// RETURNS: a createjs.Shape or null
Page_Base_obj.prototype.GetShapeByName = function(itemName)
{
  for (var i = 0; i < this.Items.length; ++i) {
    if ( this.Items[i].name === itemName ) {
      return this.GetShape( i );
    }
  }
  return null;
}

// iterates the items and exec the command if required
// this is called out of context ( another This issue..., parameter self carries the object context )
// IN: a createjs Event
Page_Base_obj.prototype.Items_HandleEvent = function(evt, self) 
{
  for (var i = 0; i < self.Items.length; ++i) {
    // check all items for the Event raising one
    if ( evt.target.name === self.Items[i].name ) {
      if ( evt.type == "mousedown" ) {
        self.Items[i].shape.alpha = B_DOWNalpha;
        self.Items[i].pressed = true;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText; // DEBUG ONLY
          }
        };
        xmlhttp.open("GET", 'calludp.php?msg=' + self.GetCommand(i, ItemModePress)
                                               + '&ip=' + IP
                                               + '&p=' + PORT.toString(), true);
        xmlhttp.send();
      }
      
      if ( ( evt.type == "pressup" ) || ( self.Items[i].pressed && ( evt.type == "mouseout" ) ) ) {
        self.Items[i].shape.alpha = B_UPalpha;
        self.Items[i].pressed = false;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText; // DEBUG ONLY
          }
        };
        xmlhttp.open("GET", "calludp.php?msg=" + self.GetCommand(i, ItemModeRelease)
                                               + '&ip=' + IP
                                               + '&p=' + PORT.toString(), true);
        xmlhttp.send();
      }
      // GUI update
      self.Stage.update();
    }  
  }//for all
}

