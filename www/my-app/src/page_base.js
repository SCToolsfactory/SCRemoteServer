//
// V 2.0
// Base Code for the Page handling
// !!!! Everything changed here affects all pages 
// Mods are available but use the myPages_InitCust() function for this
// --> In general there is nothing to change in this file for standard usage
//
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

// 20181229 - V 1.2 added analog control, shortTap and L/RShift modifier
// 20190105 - V 1.3 make shor tab with configurable duration
//                  add Analog Slider (visualize a handle only)
// 20190109 - V 1.4 add data content upload and display
// 20190111 - V 1.5 add display toggles, signals, analog (bars) and sliders
// 20190117 - V 1.6 add 'BiColor' toggles for activation and display
// 20190119 - V 1.7 add global state to support value sharing accross pages (same target name)
// 20190119 - V 1.8 add multiple SCvJoyServer support (adds joystick index to PORT const)
// 20190727 - V 2.0 refacture, add Macro Type

// Debug support
//  Find the @@@DEBUG comment below in XMLHttpRequest and comment the complete line to remove the text output to the HTML page

"use strict";

// The main Object that handles the page systems
var page_base = {

  // Init Call to create the pages and everything around
  myPages_Init : function() {
    this.myPages_InitDom();
    this.myPages_InitCust();
    this.myPages_InitMacros();
    this.myPages_InitPages();
    // Mandadory when pages have been created, this is only a helper to access pages via array 1..n (element 0 is not used)
    this.pages = [null, this.page_1_obj, this.page_2_obj, this.page_3_obj, this.page_4_obj, this.page_5_obj];
  },

  // Init function dummies - to be overwritten in pages.js
  // built in a way to allow for the GUI tool to handle it properly
  myPages_InitDom : function() {},    // Domain items
  myPages_InitCust : function() {},   // Customization
  myPages_InitPages : function() {},  // Targets and Displays
  myPages_InitMacros : function() {}, // Macros


  // INTERNAL
  // stores the array for indexed access to the page objects
  pages : [],
  // page dummies - to be overwritten in pages.js
  page_1_obj : null,
  page_2_obj : null,
  page_3_obj : null,
  page_4_obj : null,
  page_5_obj : null,

  // consts that are used to create JSON commands - better don't change them...
  CmdModePress : "p",
  CmdModeRelease : "r",
  CmdModeTap : "t",
  CmdModeShortTap : "s",

  // store for the display data - will be loaded through Tick event
  _x_globalData : null,

  //  store for all internal state values - in page_base to hide it from global
  _x_states : [],  // fake static class variable -- access should only be by "InternalState.States"
  //  store for all internal macros - in page_base to hide it from global
  _x_macros : [],  // fake static class variable -- access should only be by "Macro.Macros"

};


// *********************************************************************
// InternalState  Object

// Stores the internal state of toggle and analog/slider activation items
// used when the same item (name) is used accross the site
// stores either a state (bool) or value (int)
class InternalState {
  constructor(name, value) {
    this.name = name;   // the value reference name
    this.value = value; // current toggle state true=>on, false=>off  -default OFF OR the current value
  }

  // Value property
  get Value() { return this.value;}
  set Value(value) {this.value = value;}

  // mimic a static variable of the class that stores all states...
  static get States(){ return page_base._x_states; }

  // returns either an existing state object or a new one if not yet managed
  static GetState(name){
    // scan existing ones
    for (var i=0; i<InternalState.States.length; i++){
      if ( InternalState.States[i].name===name){
        return InternalState.States[i]; // exists, return it
      }
    }
    // not found, create and manage a new one
    var x = new InternalState(name, null);
    InternalState.States.push(x);
    return x;
  }
}//class


// *********************************************************************
// Macro  Object

// An object that defines a Cmd array to exec when activated
// IN: name :         ID string (must be unique)
// IN: cmdItems :     an array of Cmd objects
class Macro {
  constructor(name, cmdItems){
    this.name = name;
    this.cItems = cmdItems;
  }

  // mimic a static variable of the class that stores all states...
  static get Macros(){ return page_base._x_macros; }

  // returns either an existing macro object or null
  static GetMacro(name){
    // scan existing ones
    for (var i=0; i<Macro.Macros.length; i++){
      if ( Macro.Macros[i].name===name){
        return Macro.Macros[i]; // exists, return it
      }
    }
    // not found
    return null;
  }

  // returns true if a macro with name exists
  static Exists(name){
    return (this.GetMacro(name) === null) ? false : true;
  }

  // Add a macro to the list of known macros
  static AddMacro(macro){
    if ( Macro.Exists(macro.name)) {
      return; // ERROR exit - macro with name exists
    }

    // add to the list
    Macro.Macros.push(macro);
  }

  // Object Methods
  get macroName() { return this.name; }
  get cmdList() { return this.cItems; }

}// class


// *********************************************************************
// Cmd  Object
// IN: type :         Activation Type
// IN: codeVal :      int
// IN: kbMod :        Keystroke modifiers
// IN: jsIndex:       Joystick index
class Cmd {
  constructor(type, codeVal, kMod, togStateInit, jsIndex) {
    this.type = type;   // ItemType..
    this.codeValInit = codeVal; // save for later use
    this.kMod = kMod;   // ItemKMod
    this.js = jsIndex;  // Joystick Index - selects the UDP port by adding the index to the PORT variable

    // internal vars
    this.name = "undef";
    this.mustUpdate = false; // determines if codeVal updates are required for command lists
    this.state = null; // default state obj
        
    // cTor code
    // create an ID
    if ( this.type===Item.TypeKey ) {
      this.name = "_K_" + codeVal;
      this.mustUpdate = false;
    }
    else if ( this.type===Item.TypeButton ) {
      this.name = jsIndex.toString() + "_B_" + codeVal;
      this.mustUpdate = false;
    }
    else {
      this.name = jsIndex.toString() + "_" + this.type;
      this.mustUpdate = true;
    }
    // init state
    if (this.type===Item.TypeXaxis || this.type===Item.TypeYaxis || this.type===Item.TypeZaxis 
     || this.type===Item.TypeRXaxis || this.type===Item.TypeRYaxis || this.type===Item.TypeRZaxis 
     || this.type===Item.TypeSL1 || this.type===Item.TypeSL2 ) {
        // maintain a managed value state for analog types of activation
        this.state = InternalState.GetState(this.name); // state storage
        this.state.Value = codeVal; // Init
    }
    else if (this.type===Item.TypeKey || this.type===Item.TypeButton ) {
        // maintain a managed toggle state for this activation
        this.state = InternalState.GetState(this.name); // state storage
        this.state.Value = (togStateInit>0) ? true : false; // Init
    } 
    else {
      // all others - maintain an independent state for values
      this.state = new InternalState(this.name, codeVal); // a number either code, index or value
    }
  }

  // the initial code/value
  get macroName() { return this.codeValInit;} // the macro name is store at init
  get btKeyValue() { return this.codeValInit;} // the macro name is store at init
  // the current code/value
  get codeVal() { return this.state.Value;}
  set codeVal(value) { this.state.Value = value; }
  // the current toggleState
  get togState() { return this.state.Value; }
  set togState(value) { this.state.Value = value; }
  
  // background updates in command lists
  UpdateValue() {
    if ( this.mustUpdate ) {
      this.codeVal = this.codeValInit;
    }
  }
  
  // build and return a string like  '{"K":{""Modifier":"rc", VKcode":113, "Mode":"p"}}';
  // IN: the command mode string (CmdModeXY)
  // IN: the interaction mode (ItemModeXY)
  // RETURNS: a command string
  GetCommand( cmdMode, interactionMode ) {
    var cmd = {"cMode":page_base.CmdModeTap, "str":""}; // default type is Tap i.e. one action on click or press

    if (this.type === Item.TypeKey) {
      cmd.str = '{"K":{"Modifier":"' + this.kMod + '"';
      cmd.str += ',"VKcode":' + this.btKeyValue.toString();
      cmd.str += ',"Mode":"' + cmdMode + '"';
      if ( interactionMode === Item.ModePR ) {
        cmd.cMode = page_base.CmdModePress; // has press or release action
      } 
      else if ( interactionMode === Item.ModeTap ) {
        cmd.cMode = page_base.CmdModeShortTap; // has short tap action
        cmd.str += ',"Delay":"' + Cust.CmdModeShortTapDuration_ms + '"';
      } 
      cmd.str += '}}';
    }
    else if (this.type === Item.TypeButton) {
      cmd.str = '{"B":{"Modifier":"' + this.kMod + '"'; // modifier is not yet in the command but will be ignored..
      cmd.str += ',"Index":' + this.btKeyValue.toString();
      cmd.str += ',"Mode":"' + cmdMode + '"';
      if ( interactionMode === Item.ModePR ) {
        cmd.cMode = page_base.CmdModePress; // has press or release action
      } 
      else if ( interactionMode === Item.ModeTap ) {
        cmd.cMode = page_base.CmdModeShortTap; // has short tap action
        cmd.str += ',"Delay":"' + Cust.CmdModeShortTapDuration_ms + '"';
      } 
      cmd.str += '}}';
    }
    // Axis 
    else if (this.type === Item.TypeXaxis) {
      cmd.str = '{"A":{"Direction":"X"';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    else if (this.type === Item.TypeYaxis) {
      cmd.str = '{"A":{"Direction":"Y"';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    else if (this.type === Item.TypeZaxis) {
      cmd.str = '{"A":{"Direction":"Z"';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    // Rot Axis 
    else if (this.type === Item.TypeRXaxis) {
      cmd.str = '{"R":{"Direction":"X"';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    else if (this.type === Item.TypeRYaxis) {
      cmd.str = '{"R":{"Direction":"Y"';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    else if (this.type === Item.TypeRZaxis) {
      cmd.str = '{"R":{"Direction":"Z"';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    // Sliders 
    else if (this.type === Item.TypeSL1) {
      cmd.str = '{"S":{"Index":1';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    else if (this.type === Item.TypeSL2) {
      cmd.str = '{"S":{"Index":2';
      cmd.str += ',"Value":' + this.codeVal.toString();
      cmd.str += '}}';
    }
    return cmd;
  }
  
}//class


// *********************************************************************
// Target  Object

// An object that defines a hit target
// IN: name :         string (must be unique within a page)
// IN: x, y, dw, h :  int
// IN: mode :         Item modes
// IN: command :      a Cmd object
class Target {
  constructor(name, x, y, dw, h, mode, cmdItem) {
    // properties
    this.name = name;       // Unique ID
    this.x = x;             // Hit Target Center X
    this.y = y;             // Hit Target Center X
    this.dw = dw;           // Hit Target Diameter or width
    this.h = h;             // Hit Target height if 0 => circle and dw is d(iameter)
    this.mode = mode;       // ItemMode..
    this.cItem = cmdItem;   // The commands to exec, an array
    // internal vars
    this.shape = null;      // the event capture item
    this.shapeVis = null;   // an additional shape for visualization only
    
    this.pressed = false;    // current pressed value for toggle types
    this.alogHorizontal = true;  // analog direction horizontal or vertical

    // SANITY CHECKS
    if ( dw <10  ) {
      document.getElementById("debug").innerHTML = "ERROR: argument DW is <10 - target too small - in TargetID: " + name;
    }
    if ( (h > 0) && (h < 10)  ) {
      document.getElementById("debug").innerHTML = "ERROR: argument H is used but <10 - target too small - in TargetID: " + name;
    }
    if ( (mode==undefined) || (mode==null)  ) {
      document.getElementById("debug").innerHTML = "ERROR: Item Mode is not defined - in TargetID: " + name;
    }
    if ( (cmdItem==undefined) || (cmdItem==null)  ) {
      document.getElementById("debug").innerHTML = "ERROR: Cmd Item is not defined - in TargetID: " + name;
    }
    if ( cmdItem.type === Item.TypeMacro ){
        if (mode !== Item.ModeTap ) // macro can only be used with ModeTap !!
        document.getElementById("debug").innerHTML = "ERROR: TypeMacro  supported with Item.ModeTap only - in TargetID: " + name;
      if ( Macro.Exists(cmdItem.macroName) === false ) 
        document.getElementById("debug").innerHTML = "ERROR: TypeMacro  macro with name: " + cmdItem.macroName + " is not defined - in TargetID: " + name;
    }
    // others ??
  }

  // returns a command by index (0..)
  // returns null for invalid cmdIndex
  GetCmd(cmdIndex) {
    // Check for macros
    if ( this.cItem.type===Item.TypeMacro ){
      // get it from the macro list - the name was delivered with codeVal 
      var mac = Macro.GetMacro(this.cItem.macroName);
      if ( mac != null ) {
        // here we have a  Macro object
        if ((cmdIndex >= 0) && (cmdIndex < mac.cmdList.length)) {
          return mac.cmdList[cmdIndex]; // SUCCESS
        }
      }
      return null;// ERROR exit - no Cmd found
    }    
    else {
      // non macro - there is only one command avail which we return if asked for cmdIndex == 0
      if (cmdIndex == 0) {
        return this.cItem; // SUCCESS
      }
    }
    return null;
  }
  
  // returns the default command
  // returns null if there is none ?? (why...)
  get defaultCmd() { 
    return this.GetCmd(0); 
  }

  // creates the click capture shape if needed and returns it
  // RETURNS: a createjs.Shape or null
  GetShape() {
    if (this.shape === null) {
      var shape = new createjs.Shape();
      if ( this.mode === Item.ModeTog ) {
        // Toggle items
        if ( this.h === 0 ) {
          shape.graphics.beginFill(Cust.B_TogCol)
              .drawCircle(this.x, this.y, this.dw / 2);
        }
        else {
          shape.graphics.beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = this.defaultCmd.togState ? Cust.B_TogOnAlpha : Cust.B_TogOffAlpha;
      } 

      else if ( ( this.mode === Item.ModeBiTogUD ) || ( this.mode === Item.ModeBiTogLR ) ) {
        // Bi Toggle items - needs ShapeVis as well - here we create the click capture with a fixed black, barely visible mask
        if ( this.h === 0 ) {
          shape.graphics.beginFill("black")
              .drawCircle(this.x, this.y, this.dw / 2);
        }
        else {
          shape.graphics.beginFill("black")
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = 0.01; // almost invisible mouse catcher - invisible is not tracked by the library
      } 

      else if ( ( this.mode === Item.ModeAnalog ) || ( this.mode === Item.ModeSlider ) ) {
        // Analog and Slider controls - needs ShapeVis as well - here we create the click capture
        if ( ( this.h === 0 ) || ( this.dw === 0 ) ) {
          // cannot create an element where w or h are zero - create an error one
          shape.graphics.beginFill("red") // ERROR MARKER
              .drawRect(this.x, this.y, 100, 100);
          shape.alpha = 1.0;
        }
        else {
          this.alogHorizontal = (this.dw > this.h); // direction depends on larger extent
            shape.graphics.beginFill("black") // click capture, fixed color - should be barely visible..
                .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = 0.01; // almost invisible mouse catcher - invisible is not tracked by the library
      }

      else {
        // everything else
        if ( this.h === 0 ) {
          // Circle
          shape.graphics.beginFill(Cust.B_UpDownCol)
              .drawCircle( this.x, this.y, this.dw / 2 );
        }
        else {
          // Rectangle
          shape.graphics.beginFill(Cust.B_UpDownCol)
              .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, this.h );
        }
        shape.alpha = Cust.B_UpAlpha;
      }

      shape.name = this.name;
      this.shape = shape;
    }
    return this.shape;
  }

  // creates an additional visual shape for Analog/Slider, BiToggle controls
  // RETURNS: a createjs.Shape or null
  GetShapeVis() {
    if (this.shapeVis === null) {

      var shapeVis = new createjs.Shape();
      if ( ( this.mode === Item.ModeBiTogUD ) || ( this.mode === Item.ModeBiTogLR ) ) {
        this.shapeVis = shapeVis;
        this.SetCurrentBiTog(); // use toggle state method to set it
        return shapeVis;
      }

      else if ( ( this.mode === Item.ModeAnalog ) ) {
        // unhide from 0.. Setpoint
        if ( this.alogHorizontal ) {
          var ext = this.defaultCmd.codeVal * this.dw / Cust.A_Scale;
          shapeVis.graphics.beginFill(Cust.A_AnalogCol)
              .drawRect( this.x-this.dw/2+ext, this.y-this.h/2, this.dw - ext, this.h ); // right cover
        }
        else {
          var ext = this.defaultCmd.codeVal * this.h / Cust.A_Scale;
          ext = this.h - ext; // bottom up value increase
          shapeVis.graphics.beginFill(Cust.A_AnalogCol)
              .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, ext ); // upper cover
        }
        shapeVis.alpha = Cust.A_AnalogAlpha;

        this.shapeVis = shapeVis;
        return shapeVis;
      }

      else if ( ( this.mode === Item.ModeSlider ) ) {
        // unhide the Handle 
        if ( this.alogHorizontal ) {
          var ext = this.defaultCmd.codeVal * this.dw / Cust.A_Scale;
          shapeVis.graphics.beginFill(Cust.A_SliderCol)
              .drawRect( this.x-this.dw/2+ext+Cust.A_SliderHandleWidth_px, this.y-this.h/2, this.dw - ext-Cust.A_SliderHandleWidth_px, this.h ) // right cover
              .drawRect( this.x-this.dw/2, this.y-this.h/2, ext-Cust.A_SliderHandleWidth_px, this.h ); // left cover
        }
        else {
          var ext = this.defaultCmd.codeVal * this.h / Cust.A_Scale;
          ext = this.h - ext; // bottom up value increase
          shapeVis.graphics
              .beginFill(Cust.A_SliderCol)
              .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, ext-Cust.A_SliderHandleWidth_px )  // upper cover
              .drawRect( this.x-this.dw/2, this.y-this.h/2+ext+Cust.A_SliderHandleWidth_px, this.dw, this.h - ext-Cust.A_SliderHandleWidth_px ); // lower cover
        }
        shapeVis.alpha = Cust.A_SliderAlpha;

        this.shapeVis = shapeVis;
        return shapeVis;
      }

      else {
        return null;
      }
    }
    return this.shapeVis;
  }

  // Set actual values for visualization
  
  // sets the current bi-color toggle masking shape
  SetCurrentBiTog ( ) {
    if (this.shapeVis === null) return;
    if ( ( this.mode === Item.ModeBiTogUD ) ) {
      if ( this.defaultCmd.togState===true ){
        if ( this.h === 0 ) { // ON - circle cover upper
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, -Math.PI, 0 ).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h/2);
        }
      }
      else {
        if ( this.h === 0 ) { // OFF - circle cover lower
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, 0, Math.PI).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y, this.dw, this.h/2);
        }
      }
      this.shapeVis.alpha = Cust.B_TogOffAlpha;
    }

    else if ( ( this.mode === Item.ModeBiTogLR ) ) {
      if ( this.defaultCmd.togState===true ){
        if ( this.h === 0 ) { // ON - circle cover left
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, -Math.PI/2, +Math.PI/2, true ).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw/2, this.h);
        }
      }
      else {
        if ( this.h === 0 ) { // OFF - circle cover right
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, -Math.PI/2, +Math.PI/2, false).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x, this.y-this.h/2, this.dw/2, this.h);
        }
      }
      this.shapeVis.alpha = Cust.B_TogOffAlpha;
      }
    }
  

  // For Analog and Slider controls
  //  get the new codeValue from the x,y mouse coords and updates the this.shapeVis
  SetCurrentALogExtent( stageX, stageY ) {
    // the slider scale is 0..1000, the extent is either h or dw
    if ( this.shapeVis === null ) return; // no shape to handle
    
    if ( this.alogHorizontal ) {
      var localX = stageX - this.x + this.dw/2;  // get local extent
      this.defaultCmd.codeVal = localX  * Cust.A_Scale / this.dw;   // change coord to analog value range
      this.defaultCmd.codeVal = (this.defaultCmd.codeVal < 0 ) ? 0 : this.defaultCmd.codeVal;        // Math.Min(..)
      this.defaultCmd.codeVal = (this.defaultCmd.codeVal > Cust.A_Scale ) ? Cust.A_Scale : this.defaultCmd.codeVal;  // Math.Max(..)
      this.defaultCmd.codeVal = Math.round(this.defaultCmd.codeVal);
      localX = this.defaultCmd.codeVal * this.dw / Cust.A_Scale; // recalc GUI coord to never over/under shoot
      // draw cover around the setpoint
      if ( this.mode === Item.ModeAnalog ) {
        // unhide from 0.. Setpoint
        this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol)
            .drawRect( this.x-this.dw/2+localX, this.y-this.h/2, this.dw-localX, this.h );
      }
      else if ( this.mode === Item.ModeSlider ) {
        // unhide the Handle 
        this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol)
            .drawRect( this.x-this.dw/2+localX+Cust.A_SliderHandleWidth_px, this.y-this.h/2, this.dw-localX-Cust.A_SliderHandleWidth_px, this.h )
            .drawRect( this.x-this.dw/2, this.y-this.h/2, localX-Cust.A_SliderHandleWidth_px, this.h );
      }
    }

    else { // vertical
      var localY = stageY - this.y + this.h/2;  // get local extent
      this.defaultCmd.codeVal = localY * Cust.A_Scale / this.h ;   // change coord to analog value range
      this.defaultCmd.codeVal = (this.defaultCmd.codeVal < 0 ) ? 0 : this.defaultCmd.codeVal;        // Math.Min(..)
      this.defaultCmd.codeVal = (this.defaultCmd.codeVal > Cust.A_Scale ) ? Cust.A_Scale : this.defaultCmd.codeVal;  // Math.Max(..)
      this.defaultCmd.codeVal = Cust.A_Scale - this.defaultCmd.codeVal;       // bottom up value increase
      this.defaultCmd.codeVal = Math.round(this.defaultCmd.codeVal);
      localY = this.h - (this.defaultCmd.codeVal * this.h / Cust.A_Scale); // recalc GUI coord to never over/under shoot
      // draw cover around the setpoint
      if ( this.mode === Item.ModeAnalog ) {
        // unhide from 0.. Setpoint
        this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol)
            .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, localY ); // bottom up drawing
        }
      else if ( this.mode === Item.ModeSlider ) {
        // unhide the Handle 
        this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol)
            .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, localY-Cust.A_SliderHandleWidth_px ) // bottom up drawing
            .drawRect( this.x-this.dw/2, this.y-this.h/2+localY+Cust.A_SliderHandleWidth_px, this.dw, this.h - localY-Cust.A_SliderHandleWidth_px ); // lower cover
          }
    }
    this.shapeVis.alpha =  (this.mode===Item.ModeSlider) ? Cust.A_SliderAlpha : Cust.A_AnalogAlpha;
  }

  // For Analog and Slider display
  // IN: the new value 0..100
  SetValueALogExtent( value = 0 ) {
    // the slider scale is 0..1000, the extent is either h or dw
    if ( this.shapeVis === null ) return; // no shape to handle

    // cut to range
    var localVal = (value < 0 ) ? 0 : value;        // Math.Min(..)
    localVal = (localVal > Cust.A_Scale ) ? Cust.A_Scale : localVal;  // Math.Max(..)

    if ( this.alogHorizontal ) {
      var localX = localVal * this.dw / Cust.A_Scale; // recalc GUI coord to never over/under shoot
      // draw cover around the setpoint
      if ( this.mode === Item.ModeAnalog ) {
        // unhide from 0.. Setpoint
        this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol)
            .drawRect( this.x-this.dw/2+localX, this.y-this.h/2, this.dw-localX, this.h );
      }
      else if ( this.mode === Item.ModeSlider ) {
        // unhide the Handle 
        this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol)
            .drawRect( this.x-this.dw/2+localX+Cust.A_SliderHandleWidth_px, this.y-this.h/2, this.dw-localX-Cust.A_SliderHandleWidth_px, this.h )
            .drawRect( this.x-this.dw/2, this.y-this.h/2, localX-Cust.A_SliderHandleWidth_px, this.h );
      }
    }

    else {
      var localY = this.h - (localVal * this.h / Cust.A_Scale); // recalc GUI coord to never over/under shoot
      // draw cover around the setpoint
      if ( this.mode === Item.ModeAnalog ) {
        // unhide from 0.. Setpoint
        this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol)
            .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, localY ); // bottom up drawing
        }
      else if ( this.mode === Item.ModeSlider ) {
        // unhide the Handle 
        this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol)
            .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, localY-Cust.A_SliderHandleWidth_px ) // bottom up drawing
            .drawRect( this.x-this.dw/2, this.y-this.h/2+localY+Cust.A_SliderHandleWidth_px, this.dw, this.h - localY-Cust.A_SliderHandleWidth_px ); // lower cover
          }
    }
    this.shapeVis.alpha =  (this.mode===Item.ModeSlider) ? Cust.A_SliderAlpha : Cust.A_AnalogAlpha ;
  }

  // Udpate this element from global data space
  Update() {
    if ( this.mode === Item.ModeTog ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.shapeVis.alpha = this.defaultCmd.togState() ? Cust.D_TogOnAlpha : Cust.D_TogOffAlpha;
      this.shapeVis.alpha = this.defaultCmd.togState() ? Cust.D_TogOnAlpha : Cust.D_TogOffAlpha;
    }
    else if ( this.mode === Item.ModeBiTogUD ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetCurrentBiTog();
    }
    else if ( this.mode === Item.ModeBiTogLR ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetCurrentBiTog();
    }
    else if ( this.mode === Item.ModeAnalog ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetValueALogExtent( this.defaultCmd.codeVal );
    }
    else if ( this.mode === Item.ModeSlider ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetValueALogExtent( this.defaultCmd.codeVal );
    }
  }

  // executes commands cmdIndex .. n (if defined)
  ExecCmdList( cmdIndex ) {
    var cmd = this.GetCmd(cmdIndex++);
    while (cmd!=null){
      cmd.UpdateValue(); // reset the codeVal to use
      var cmdString = cmd.GetCommand( page_base.CmdModeTap );
      this.Dispatch( cmdString.str, Dom.PORT+cmd.js );
      // next
      cmd = this.GetCmd(cmdIndex++);
    }
  }
  
  // Disposes all items from the page
  Dispose() {
    if (this.shapeVis != null) {
      this.shapeVis = null;
    }
    if (this.shape != null) {
      this.shape.removeAllEventListeners();
      this.shape = null;
    }
  }

  Dispatch( cmdStr, port ) {
      // The Event dispatch
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("debug").innerHTML = this.responseText; // @@@DEBUG ONLY
        }
      };
//      xmlhttp.open("GET", 'script/calludp.php?msg=' + cmdStr + '&ip=' + Dom.IP + '&p=' + port.toString(), true);
      xmlhttp.open("GET", '/calludp/ip/'+Dom.IP+'/port/'+port.toString()+'/msg/'+ cmdStr , true);
      xmlhttp.send();
  }
  
  // exec the command, depends on event type
  // IN: a createjs Event
  Target_HandleEvent(evt) {
    var cmd = "";
    if (evt.type == "mousedown") {
      // button/key down, toggle click, axis set value
      this.pressed = true; // track mouse Down
      if ( this.mode === Item.ModePR ) {
        // GUI change for non toggle key, buttons and value Axis,Sliders
        this.shape.alpha = Cust.B_DownAlpha;
        cmd = this.defaultCmd.GetCommand( page_base.CmdModePress );
        this.Dispatch( cmd.str, Dom.PORT+this.defaultCmd.js );
        //this.ExecCmdList();
      } 
      else if ( this.mode === Item.ModeVal ) {
        // GUI change for non toggle key, buttons and value Axis,Sliders
        this.shape.alpha = Cust.B_DownAlpha;
        this.defaultCmd.UpdateValue();
        cmd = this.defaultCmd.GetCommand( page_base.CmdModePress );
        this.Dispatch( cmd.str, Dom.PORT+this.defaultCmd.js );
        //this.ExecCmdList();
      }
      else if ( this.mode === Item.ModeTap ) {
        // GUI change for non toggle shortTap
        this.shape.alpha = Cust.B_DownAlpha;
        this.ExecCmdList(0);
      } 
      else if ( ( this.mode === Item.ModeAnalog ) || ( this.mode === Item.ModeSlider )){
        // GUI change for analog control
        this.SetCurrentALogExtent( evt.stageX, evt.stageY );
        cmd = this.defaultCmd.GetCommand( page_base.CmdModePress );
        this.Dispatch( cmd.str, Dom.PORT+this.defaultCmd.js );
      } 
      else if ( ( this.mode === Item.ModeBiTogUD ) || ( this.mode === Item.ModeBiTogLR ) ) {
        // GUI change for bi-color toggle
        this.defaultCmd.togState = !this.defaultCmd.togState; // Toggle state update
        this.SetCurrentBiTog();
        cmd = this.defaultCmd.GetCommand( page_base.CmdModeTap );
        this.Dispatch( cmd.str, Dom.PORT+this.defaultCmd.js );
        this.ExecCmdList();
      }
      else {
        // GUI change for toggle key and buttons
        this.defaultCmd.togState = !this.defaultCmd.togState; // Toggle state update
        this.shape.alpha = this.defaultCmd.togState ? Cust.B_TogOnAlpha : Cust.B_TogOffAlpha;
        cmd = this.defaultCmd.GetCommand( page_base.CmdModeTap );
        this.Dispatch( cmd.str, Dom.PORT+this.defaultCmd.js );
        this.ExecCmdList();
      }
    }//end mousedown

    else if ( evt.type == "pressmove") {
      // analog/slider controls only
      if ( ( this.mode === Item.ModeAnalog ) || ( this.mode === Item.ModeSlider )){
        // GUI change for analog control while moving 
        this.SetCurrentALogExtent( evt.stageX, evt.stageY );
        cmd = this.defaultCmd.GetCommand( page_base.CmdModePress );
        // The Event dispatch
        this.Dispatch(cmd.str, Dom.PORT+this.defaultCmd.js)
      } 
    }

    else if ((evt.type == "pressup") || (this.pressed && (evt.type == "mouseout"))) {
      this.pressed = false; // track mouse Up/Out
      if ( ( this.mode === Item.ModePR ) || ( this.mode === Item.ModeVal ) ) {
        // GUI change for non toggle key, buttons and value Axis,Sliders
        this.shape.alpha = Cust.B_UpAlpha;
      }
      else if ( this.mode === Item.ModeTap ) {
        // GUI change for non toggle shortTap
        this.shape.alpha = Cust.B_UpAlpha;
        return; // short tap types don't have a release action 
      } 
      // this will find out if it was a PR or toggle key, button
      cmd = this.defaultCmd.GetCommand( page_base.CmdModeRelease );
      if ( cmd.cMode === page_base.CmdModeTap ) return; // tap (toggle and axis, sliders) types don't have a release action 
      // The Event dispatch
      this.Dispatch(cmd.str, Dom.PORT+this.defaultCmd.js)
    }
  }
}// class


// *********************************************************************
// Data Display  Object
// An object that shows a value

// An object that defines a data display
// IN: name :         string (must be unique within a page)
// IN: x, y, dw, h :  int
// IN: mode :         Display mode
// IN: align :        Alignment
// IN: bline :        Baseline (text output)
// IN: font :         Text font (text output)
// IN: color :        Color (text output, signal, toggleInit)
// IN: section :      Data source section
// IN: item :         Data source item - section.item
class Display {
  constructor(name, x, y, dw, h, mode, align, bline, font, color, section, item ) {
    // properties
    this.name = name; // Unique ID
    this.x = x;   // Display Center X
    this.y = y;   // Display Center X
    this.dw = dw; // Display Diameter or Width
    this.h = h;   // Display height if 0 => circle and dw is d(iameter)
    this.mode = mode;
    this.align = align; 
    this.bline = bline; 
    this.font = font; 
    this.color = color; 
    this.togStateInit = (color>0) ? true : false; // 'misuse' color for toggle Init
    // data location
    this.section = section; 
    this.item = item; 
    // internal vars
    this.text = null;     // the display item text
    this.shapeVis = null; // an additional shape for visualization only
    this.alogHorizontal = true;  // analog direction horizontal or vertical

    // SANITY CHECKS
    if ( dw <5  ) {
      document.getElementById("debug").innerHTML = "ERROR: argument DW is <5 - target too small - in DisplayID: " + name;
    }
    if ( (h > 0) && (h < 5)  ) {
      document.getElementById("debug").innerHTML = "ERROR: argument H is used but <5 - target too small - in DisplayID: " + name;
    }
    if ( (mode==undefined) || (mode==null)  ) {
      document.getElementById("debug").innerHTML = "ERROR: Item Mode is not defined - in DisplayID: " + name;
    }

  }

  // creates the Shape if needed and returns it
  // RETURNS: a createjs.Shape or null
  GetDispShape() {
    // create the base shape 
    if (this.shapeVis === null) {

      var shape = new createjs.Shape();
      if ( this.mode === Disp.ModeTog ) {
        // Toggle items
        if ( this.h === 0 ) {
          shape.graphics.beginFill(Cust.D_TogCol)
              .drawCircle(this.x, this.y, this.dw / 2);
        }
        else {
          shape.graphics.beginFill(Cust.D_TogCol)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = (this.togStateInit===true) ? Cust.D_TogOnAlpha : Cust.D_TogOffAlpha;
      } 
      else if ( ( this.mode === Disp.ModeBiTogUD ) || ( this.mode === Disp.ModeBiTogLR ) ) {
        this.shapeVis = shape;
        this.SetCurrentBiTog(); // use toggle state method
      }

      else if ( this.mode === Disp.ModeSig ) {
        // Signal items
        if ( this.h === 0 ) {
          shape.graphics.beginFill(this.color)
              .drawCircle(this.x, this.y, this.dw / 2);
        }
        else {
          shape.graphics.beginFill(this.color)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = Cust.D_SigOffAlpha; // default off
      } 

      else if ( ( this.mode === Disp.ModeAnalog ) || ( this.mode === Disp.ModeSlider ) ) {
        // Analog and Slider display
        if ( ( this.h === 0 ) || ( this.dw === 0 ) ) {
          // cannot create an element where w or h are zero - create an error one
          shape.graphics.beginFill("red") // ERROR MARKER
              .drawRect(this.x, this.y, 100, 100);
          shape.alpha = 1.0;
        }
        else {
          this.alogHorizontal = (this.dw > this.h); // direction depends on larger extent
            shape.graphics.beginFill( (this.mode===Disp.ModeSlider) ? Cust.D_SliderCol : Cust.D_AnalogCol )
                .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h);
        }
        shape.alpha = Cust.D_SliderAlpha;
      }

      else {
        // everything else get no shape
        shape = null;
      }

      if ( shape !== null ) {
        shape.name = this.name;
        this.shapeVis = shape;
        }
    }
    return this.shapeVis;
  }

  // sets the current bi-color toggle maksing shape
  SetCurrentBiTog ( value = false ) {
    if (this.shapeVis === null) return;
    if ( ( this.mode === Disp.ModeBiTogUD ) ) {
      if ( value===true ){
        if ( this.h === 0 ) { // ON - circle cover upper
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, -Math.PI, 0 ).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw, this.h/2);
        }
      }
      else {
        if ( this.h === 0 ) { // OFF - circle cover lower
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, 0, Math.PI).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y, this.dw, this.h/2);
        }
        this.shapeVis.alpha = Cust.D_TogOffAlpha;
      }
    }

    else if ( ( this.mode === Disp.ModeBiTogLR ) ) {
      if ( value===true ){
        if ( this.h === 0 ) { // ON - circle cover left
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, -Math.PI/2, +Math.PI/2, true ).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x-this.dw/2, this.y-this.h/2, this.dw/2, this.h);
        }
      }
      else {
        if ( this.h === 0 ) { // OFF - circle cover right
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .arc( this.x, this.y, this.dw/2, -Math.PI/2, +Math.PI/2, false).closePath(); 
        }
        else {
          this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol)
              .drawRect(this.x, this.y-this.h/2, this.dw/2, this.h);
        }
      }
      this.shapeVis.alpha = Cust.D_TogOffAlpha;
    }
  }
  
  // For Analog and Slider display
  //  get the new codeValue from the x,y mouse coords and updates the this.shapeVis
  // IN: the new value 0..100
  SetCurrentALogExtent( value = 0 ) {
    // the slider scale is 0..1000, the extent is either h or dw
    if ( this.shapeVis === null ) return; // no shape to handle

    // cut to range
    var localVal = (value < 0 ) ? 0 : value;        // Math.Min(..)
    localVal = (localVal > Cust.D_Scale ) ? Cust.D_Scale : localVal;  // Math.Max(..)

    if ( this.alogHorizontal ) {
      var localX = localVal * this.dw / Cust.D_Scale; // recalc GUI coord to never over/under shoot
      // draw cover around the setpoint
      if ( this.mode === Disp.ModeAnalog ) {
        // unhide from 0.. Setpoint
        this.shapeVis.graphics.clear().beginFill(Cust.D_AnalogCol)
            .drawRect( this.x-this.dw/2+localX, this.y-this.h/2, this.dw-localX, this.h );
      }
      else if ( this.mode === Disp.ModeSlider ) {
        // unhide the Handle 
        this.shapeVis.graphics.clear().beginFill(Cust.D_SliderCol)
            .drawRect( this.x-this.dw/2+localX+Cust.D_SliderHandleWidth_px, this.y-this.h/2, this.dw-localX-Cust.D_SliderHandleWidth_px, this.h )
            .drawRect( this.x-this.dw/2, this.y-this.h/2, localX-Cust.D_SliderHandleWidth_px, this.h );
      }
    }

    else {
      var localY = this.h - (localVal * this.h / Cust.D_Scale); // recalc GUI coord to never over/under shoot
      // draw cover around the setpoint
      if ( this.mode === Disp.ModeAnalog ) {
        // unhide from 0.. Setpoint
        this.shapeVis.graphics.clear().beginFill(Cust.D_AnalogCol)
            .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, localY ); // bottom up drawing
        }
      else if ( this.mode === Disp.ModeSlider ) {
        // unhide the Handle 
        this.shapeVis.graphics.clear().beginFill(Cust.D_SliderCol)
            .drawRect( this.x-this.dw/2, this.y-this.h/2, this.dw, localY-Cust.D_SliderHandleWidth_px ) // bottom up drawing
            .drawRect( this.x-this.dw/2, this.y-this.h/2+localY+Cust.D_SliderHandleWidth_px, this.dw, this.h - localY-Cust.D_SliderHandleWidth_px ); // lower cover
          }
    }
    this.shapeVis.alpha =  (this.mode===Disp.ModeSlider) ? Cust.D_SliderAlpha : Cust.D_AnalogAlpha ;
  }

  // creates the Text if needed and returns it
  // RETURNS: a createjs.Text or null
  GetText() {
    if (this.text === null) {
      if ( this.mode === Disp.ModeTxt ) {
        var text = new createjs.Text();
        text.x = this.x;
        text.y = this.y;
        text.setBounds(0, 0, this.dw, this.h);
        text.text = "";
        text.font = this.font;
        text.color = this.color;
        text.maxWidth = this.dw;
        text.textAlign = this.align;     // Any of "start", "end", "left", "right", and "center". 
        text.textBaseline = this.bline;  //  Any of "top", "hanging", "middle", "alphabetic", "ideographic", or "bottom". 
  
        text.name = this.name; // tag the item
        this.text = text; // store it
      }
    }
    return this.text;
  }

  // Disposes all items from the page
  Dispose() {
    if (this.shapeVis != null) {
      this.shapeVis = null;
    }
    if (this.text != null) {
      this.text = null;
    }
  }

  // Udpate this element from global data space
  Update() {
    if ( this.mode === Disp.ModeTxt ){
      if ( this.text === null) return; // safeguard..
      this.text.text = (page_base._x_globalData[this.section])[this.item];
    }
    else if ( this.mode === Disp.ModeTog ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.shapeVis.alpha = ((page_base._x_globalData[this.section])[this.item]===this.togStateInit) ? Cust.D_TogOffAlpha : Cust.D_TogOnAlpha;
    }
    else if ( this.mode === Disp.ModeSig ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.shapeVis.alpha = ((page_base._x_globalData[this.section])[this.item]===true) ? Cust.D_SigOnAlpha : Cust.D_SigOffAlpha;
    }
    else if ( this.mode === Disp.ModeBiTogUD ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetCurrentBiTog( (page_base._x_globalData[this.section])[this.item] );
    }
    else if ( this.mode === Disp.ModeBiTogLR ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetCurrentBiTog( (page_base._x_globalData[this.section])[this.item] );
    }
    else if ( this.mode === Disp.ModeAnalog ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetCurrentALogExtent( (page_base._x_globalData[this.section])[this.item] );
    }
    else if ( this.mode === Disp.ModeSlider ) {
      if ( this.shapeVis === null) return; // safeguard..
      this.SetCurrentALogExtent( (page_base._x_globalData[this.section])[this.item] );
    }
  }

}// Display


// *********************************************************************
// page_proto_obj  Object
// An object that defines and handles the Items and Displays  
class Page_proto_obj {
  constructor(pageName, backgroundImageUri, tItems, dItems) {
    this.PageName = pageName;
    this.BackgroundImageUri = backgroundImageUri;
    this.BackgroundImg = null;
    this.Stage = null;
    this.Items = tItems;
    this.DataItems = dItems;
  }

  // Basic initialization of this page
  Init(canvas) {
    var self = this; // maintain this context for the callback
    this.Stage = new createjs.Stage(canvas);
    // to get onMouseOver & onMouseOut events, we need to enable them on the stage:
    this.Stage.enableMouseOver();
    if ( createjs.Touch.isSupported() ){
      createjs.Touch.enable(this.Stage, true, false); // touch device support... - must disable when stage is no longer used
      // single touch only, else press down / up may interlace each other such as D1, D2, U1, U2 which does not the intended action
    }
    this.BackgroundImg = new Image();
    this.BackgroundImg.onload = function () {
      // called when loading image has completed (use self to access page object elements)
      var bitmap = new createjs.Bitmap(self.BackgroundImg);
      self.Stage.addChildAt(bitmap, 0); // alloc as background image
      self.Stage.update(); // show changes
    };
    this.BackgroundImg.src = this.BackgroundImageUri;
    this.Init_closure(); // do everything after the background is loaded
    // GUI update
    this.Stage.update(); // show changes
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

      // Analog, Sliders BiToggles have an additional visual shape
      var shapeVis = this.GetShapeVis(i);
      if ( shapeVis !== null) {
        shape.on("pressmove", this.Items_HandleEvent, null, false, this); // for analog controls
        this.Stage.addChild(shapeVis);
      }
    }

    // data display items
    for (var i = 0; i < this.DataItems.length; ++i) {
      var text = this.GetText(i);
      if ( text !== null) {
        this.Stage.addChild(text);
      }
      // shapes for toggles, signals, analogs and sliders
      var shapeVis = this.GetDispShapeVis(i);
      if ( shapeVis !== null) {
        this.Stage.addChild(shapeVis);
      }
    }
    
    // setup the display refresh when a datafile is provided
    if ( Dom.DATAFILE !== '' ) {
      createjs.Ticker.framerate = (Cust.DisplayPerSec>10) ? 10 : Cust.DisplayPerSec; // Init Update FPS but avoid overdrive
      createjs.Ticker.on("tick", this.HandleDataUpdate, null, false, this);
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
    for (var i = 0; i < this.DataItems.length; ++i) {
      this.DataItems[i].Dispose(); // remove texts..
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

  // creates the visual shape if needed and returns it
  // IN: itemIndex 0... n
  // RETURNS: a createjs.Shape or null
  GetShapeVis(itemIndex) {
    if ((itemIndex >= 0) && (itemIndex < this.Items.length)) {
      return this.Items[itemIndex].GetShapeVis();
    }
    return null;
  }

  // creates the text if needed and returns it
  // IN: itemIndex 0... n
  // RETURNS: a createjs.Text or null
  GetText(itemIndex) {
    if ((itemIndex >= 0) && (itemIndex < this.DataItems.length)) {
      return this.DataItems[itemIndex].GetText();
    }
    return null;
  }

  // creates the visual shape if needed and returns it
  // IN: itemIndex 0... n
  // RETURNS: a createjs.Shape or null
  GetDispShapeVis(itemIndex) {
    if ((itemIndex >= 0) && (itemIndex < this.DataItems.length)) {
      return this.DataItems[itemIndex].GetDispShape();
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

  // Updates all Target items from current (if a mouse down was delivered)
  // iterates through the list of Target Items
  UpdateAllTargetItems(evt, self){
    if (evt.type == "pressup") {
      for (var i = 0; i < self.Items.length; ++i) {
        self.Items[i].Update(evt);
      } //for all
    }
    if ( self.Stage ) self.Stage.update(); // show changes
  }

  // Event Handler for clicks and touches
  // iterates the items and exec the command if required, if a command was found - Update Target items in case of linked targets
  // this is called out of context ( another This issue..., parameter self carries the page context )
  // IN: a createjs Event
  // IN: the page context
  Items_HandleEvent(evt, self) {
    for (var i = 0; i < self.Items.length; ++i) {
      // check all items for the Event raising one
      if (evt.target.name === self.Items[i].name) {
        self.Items[i].Target_HandleEvent(evt);
        // GUI update for changed target shape
        self.UpdateAllTargetItems(evt, self); // does State.update
      }
    } //for all
  }

  // Updates all Display items from data
  // iterates through the list of Display Items
  UpdateAllDisplayItems(evt, self){
    for (var i = 0; i < self.DataItems.length; ++i) {
      self.DataItems[i].Update(evt);
    } //for all
    if ( self.Stage ) self.Stage.update(); // show changes
  }

  // Event handler for Tick 
  // initiates a data update from file - then calls UpdateAllDisplayItems()
  HandleDataUpdate(evt, self) {
      // Actions carried out each tick (aka frame)
      if (!evt.paused) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            page_base._x_globalData = JSON.parse(this.responseText); 
            self.UpdateAllDisplayItems(evt, self);
          }
        };
        xmlhttp.open("GET", '/filequery/file/' + Dom.DATAFILE ,true);
        xmlhttp.send();
      }
  }

}// class










