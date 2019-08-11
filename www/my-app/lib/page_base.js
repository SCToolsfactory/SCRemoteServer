"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var page_base = {
  myPages_Init: function myPages_Init() {
    this.myPages_InitDom();
    this.myPages_InitCust();
    this.myPages_InitMacros();
    this.myPages_InitPages();
    this.pages = [null, this.page_1_obj, this.page_2_obj, this.page_3_obj, this.page_4_obj, this.page_5_obj];
  },
  myPages_InitDom: function myPages_InitDom() {},
  myPages_InitCust: function myPages_InitCust() {},
  myPages_InitPages: function myPages_InitPages() {},
  myPages_InitMacros: function myPages_InitMacros() {},
  pages: [],
  page_1_obj: null,
  page_2_obj: null,
  page_3_obj: null,
  page_4_obj: null,
  page_5_obj: null,
  CmdModePress: "p",
  CmdModeRelease: "r",
  CmdModeTap: "t",
  CmdModeShortTap: "s",
  _x_globalData: null,
  _x_states: [],
  _x_macros: []
};

var InternalState = function () {
  function InternalState(name, value) {
    _classCallCheck(this, InternalState);

    this.name = name;
    this.value = value;
  }

  _createClass(InternalState, [{
    key: "Value",
    get: function get() {
      return this.value;
    },
    set: function set(value) {
      this.value = value;
    }
  }], [{
    key: "GetState",
    value: function GetState(name) {
      for (var i = 0; i < InternalState.States.length; i++) {
        if (InternalState.States[i].name === name) {
          return InternalState.States[i];
        }
      }

      var x = new InternalState(name, null);
      InternalState.States.push(x);
      return x;
    }
  }, {
    key: "States",
    get: function get() {
      return page_base._x_states;
    }
  }]);

  return InternalState;
}();

var Macro = function () {
  function Macro(name, cmdItems) {
    _classCallCheck(this, Macro);

    this.name = name;
    this.cItems = cmdItems;
  }

  _createClass(Macro, [{
    key: "macroName",
    get: function get() {
      return this.name;
    }
  }, {
    key: "cmdList",
    get: function get() {
      return this.cItems;
    }
  }], [{
    key: "GetMacro",
    value: function GetMacro(name) {
      for (var i = 0; i < Macro.Macros.length; i++) {
        if (Macro.Macros[i].name === name) {
          return Macro.Macros[i];
        }
      }

      return null;
    }
  }, {
    key: "Exists",
    value: function Exists(name) {
      return this.GetMacro(name) === null ? false : true;
    }
  }, {
    key: "AddMacro",
    value: function AddMacro(macro) {
      if (Macro.Exists(macro.name)) {
        return;
      }

      Macro.Macros.push(macro);
    }
  }, {
    key: "Macros",
    get: function get() {
      return page_base._x_macros;
    }
  }]);

  return Macro;
}();

var Cmd = function () {
  function Cmd(type, codeVal, kMod, togStateInit, jsIndex) {
    _classCallCheck(this, Cmd);

    this.type = type;
    this.codeValInit = codeVal;
    this.kMod = kMod;
    this.js = jsIndex;
    this.name = "undef";
    this.mustUpdate = false;
    this.state = null;

    if (this.type === Item.TypeKey) {
      this.name = "_K_" + codeVal;
      this.mustUpdate = false;
    } else if (this.type === Item.TypeButton) {
      this.name = jsIndex.toString() + "_B_" + codeVal;
      this.mustUpdate = false;
    } else {
      this.name = jsIndex.toString() + "_" + this.type;
      this.mustUpdate = true;
    }

    if (this.type === Item.TypeXaxis || this.type === Item.TypeYaxis || this.type === Item.TypeZaxis || this.type === Item.TypeRXaxis || this.type === Item.TypeRYaxis || this.type === Item.TypeRZaxis || this.type === Item.TypeSL1 || this.type === Item.TypeSL2) {
      this.state = InternalState.GetState(this.name);
      this.state.Value = codeVal;
    } else if (this.type === Item.TypeKey || this.type === Item.TypeButton) {
      this.state = InternalState.GetState(this.name);
      this.state.Value = togStateInit > 0 ? true : false;
    } else {
      this.state = new InternalState(this.name, codeVal);
    }
  }

  _createClass(Cmd, [{
    key: "UpdateValue",
    value: function UpdateValue() {
      if (this.mustUpdate) {
        this.codeVal = this.codeValInit;
      }
    }
  }, {
    key: "GetCommand",
    value: function GetCommand(cmdMode, interactionMode) {
      var cmd = {
        "cMode": page_base.CmdModeTap,
        "str": ""
      };

      if (this.type === Item.TypeKey) {
        cmd.str = '{"K":{"Modifier":"' + this.kMod + '"';
        cmd.str += ',"VKcode":' + this.btKeyValue.toString();
        cmd.str += ',"Mode":"' + cmdMode + '"';

        if (interactionMode === Item.ModePR) {
          cmd.cMode = page_base.CmdModePress;
        } else if (interactionMode === Item.ModeTap) {
          cmd.cMode = page_base.CmdModeShortTap;
          cmd.str += ',"Delay":"' + Cust.CmdModeShortTapDuration_ms + '"';
        }

        cmd.str += '}}';
      } else if (this.type === Item.TypeButton) {
        cmd.str = '{"B":{"Modifier":"' + this.kMod + '"';
        cmd.str += ',"Index":' + this.btKeyValue.toString();
        cmd.str += ',"Mode":"' + cmdMode + '"';

        if (interactionMode === Item.ModePR) {
          cmd.cMode = page_base.CmdModePress;
        } else if (interactionMode === Item.ModeTap) {
          cmd.cMode = page_base.CmdModeShortTap;
          cmd.str += ',"Delay":"' + Cust.CmdModeShortTapDuration_ms + '"';
        }

        cmd.str += '}}';
      } else if (this.type === Item.TypeXaxis) {
          cmd.str = '{"A":{"Direction":"X"';
          cmd.str += ',"Value":' + this.codeVal.toString();
          cmd.str += '}}';
        } else if (this.type === Item.TypeYaxis) {
          cmd.str = '{"A":{"Direction":"Y"';
          cmd.str += ',"Value":' + this.codeVal.toString();
          cmd.str += '}}';
        } else if (this.type === Item.TypeZaxis) {
          cmd.str = '{"A":{"Direction":"Z"';
          cmd.str += ',"Value":' + this.codeVal.toString();
          cmd.str += '}}';
        } else if (this.type === Item.TypeRXaxis) {
            cmd.str = '{"R":{"Direction":"X"';
            cmd.str += ',"Value":' + this.codeVal.toString();
            cmd.str += '}}';
          } else if (this.type === Item.TypeRYaxis) {
            cmd.str = '{"R":{"Direction":"Y"';
            cmd.str += ',"Value":' + this.codeVal.toString();
            cmd.str += '}}';
          } else if (this.type === Item.TypeRZaxis) {
            cmd.str = '{"R":{"Direction":"Z"';
            cmd.str += ',"Value":' + this.codeVal.toString();
            cmd.str += '}}';
          } else if (this.type === Item.TypeSL1) {
              cmd.str = '{"S":{"Index":1';
              cmd.str += ',"Value":' + this.codeVal.toString();
              cmd.str += '}}';
            } else if (this.type === Item.TypeSL2) {
              cmd.str = '{"S":{"Index":2';
              cmd.str += ',"Value":' + this.codeVal.toString();
              cmd.str += '}}';
            }

      return cmd;
    }
  }, {
    key: "macroName",
    get: function get() {
      return this.codeValInit;
    }
  }, {
    key: "btKeyValue",
    get: function get() {
      return this.codeValInit;
    }
  }, {
    key: "codeVal",
    get: function get() {
      return this.state.Value;
    },
    set: function set(value) {
      this.state.Value = value;
    }
  }, {
    key: "togState",
    get: function get() {
      return this.state.Value;
    },
    set: function set(value) {
      this.state.Value = value;
    }
  }]);

  return Cmd;
}();

var Target = function () {
  function Target(name, x, y, dw, h, mode, cmdItem) {
    _classCallCheck(this, Target);

    this.name = name;
    this.x = x;
    this.y = y;
    this.dw = dw;
    this.h = h;
    this.mode = mode;
    this.cItem = cmdItem;
    this.shape = null;
    this.shapeVis = null;
    this.pressed = false;
    this.alogHorizontal = true;

    if (dw < 10) {
      document.getElementById("debug").innerHTML = "ERROR: argument DW is <10 - target too small - in TargetID: " + name;
    }

    if (h > 0 && h < 10) {
      document.getElementById("debug").innerHTML = "ERROR: argument H is used but <10 - target too small - in TargetID: " + name;
    }

    if (mode == undefined || mode == null) {
      document.getElementById("debug").innerHTML = "ERROR: Item Mode is not defined - in TargetID: " + name;
    }

    if (cmdItem == undefined || cmdItem == null) {
      document.getElementById("debug").innerHTML = "ERROR: Cmd Item is not defined - in TargetID: " + name;
    }

    if (cmdItem.type === Item.TypeMacro) {
      if (mode !== Item.ModeTap) document.getElementById("debug").innerHTML = "ERROR: TypeMacro  supported with Item.ModeTap only - in TargetID: " + name;
      if (Macro.Exists(cmdItem.macroName) === false) document.getElementById("debug").innerHTML = "ERROR: TypeMacro  macro with name: " + cmdItem.macroName + " is not defined - in TargetID: " + name;
    }
  }

  _createClass(Target, [{
    key: "GetCmd",
    value: function GetCmd(cmdIndex) {
      if (this.cItem.type === Item.TypeMacro) {
        var mac = Macro.GetMacro(this.cItem.macroName);

        if (mac != null) {
          if (cmdIndex >= 0 && cmdIndex < mac.cmdList.length) {
            return mac.cmdList[cmdIndex];
          }
        }

        return null;
      } else {
        if (cmdIndex == 0) {
          return this.cItem;
        }
      }

      return null;
    }
  }, {
    key: "GetShape",
    value: function GetShape() {
      if (this.shape === null) {
        var shape = new createjs.Shape();

        if (this.mode === Item.ModeTog) {
          if (this.h === 0) {
            shape.graphics.beginFill(Cust.B_TogCol).drawCircle(this.x, this.y, this.dw / 2);
          } else {
            shape.graphics.beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = this.defaultCmd.togState ? Cust.B_TogOnAlpha : Cust.B_TogOffAlpha;
        } else if (this.mode === Item.ModeBiTogUD || this.mode === Item.ModeBiTogLR) {
          if (this.h === 0) {
            shape.graphics.beginFill("black").drawCircle(this.x, this.y, this.dw / 2);
          } else {
            shape.graphics.beginFill("black").drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = 0.01;
        } else if (this.mode === Item.ModeAnalog || this.mode === Item.ModeSlider) {
          if (this.h === 0 || this.dw === 0) {
            shape.graphics.beginFill("red").drawRect(this.x, this.y, 100, 100);
            shape.alpha = 1.0;
          } else {
            this.alogHorizontal = this.dw > this.h;
            shape.graphics.beginFill("black").drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = 0.01;
        } else {
          if (this.h === 0) {
            shape.graphics.beginFill(Cust.B_UpDownCol).drawCircle(this.x, this.y, this.dw / 2);
          } else {
            shape.graphics.beginFill(Cust.B_UpDownCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = Cust.B_UpAlpha;
        }

        shape.name = this.name;
        this.shape = shape;
      }

      return this.shape;
    }
  }, {
    key: "GetShapeVis",
    value: function GetShapeVis() {
      if (this.shapeVis === null) {
        var shapeVis = new createjs.Shape();

        if (this.mode === Item.ModeBiTogUD || this.mode === Item.ModeBiTogLR) {
          this.shapeVis = shapeVis;
          this.SetCurrentBiTog();
          return shapeVis;
        } else if (this.mode === Item.ModeAnalog) {
          if (this.alogHorizontal) {
            var ext = this.defaultCmd.codeVal * this.dw / Cust.A_Scale;
            shapeVis.graphics.beginFill(Cust.A_AnalogCol).drawRect(this.x - this.dw / 2 + ext, this.y - this.h / 2, this.dw - ext, this.h);
          } else {
            var ext = this.defaultCmd.codeVal * this.h / Cust.A_Scale;
            ext = this.h - ext;
            shapeVis.graphics.beginFill(Cust.A_AnalogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, ext);
          }

          shapeVis.alpha = Cust.A_AnalogAlpha;
          this.shapeVis = shapeVis;
          return shapeVis;
        } else if (this.mode === Item.ModeSlider) {
          if (this.alogHorizontal) {
            var ext = this.defaultCmd.codeVal * this.dw / Cust.A_Scale;
            shapeVis.graphics.beginFill(Cust.A_SliderCol).drawRect(this.x - this.dw / 2 + ext + Cust.A_SliderHandleWidth_px, this.y - this.h / 2, this.dw - ext - Cust.A_SliderHandleWidth_px, this.h).drawRect(this.x - this.dw / 2, this.y - this.h / 2, ext - Cust.A_SliderHandleWidth_px, this.h);
          } else {
            var ext = this.defaultCmd.codeVal * this.h / Cust.A_Scale;
            ext = this.h - ext;
            shapeVis.graphics.beginFill(Cust.A_SliderCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, ext - Cust.A_SliderHandleWidth_px).drawRect(this.x - this.dw / 2, this.y - this.h / 2 + ext + Cust.A_SliderHandleWidth_px, this.dw, this.h - ext - Cust.A_SliderHandleWidth_px);
          }

          shapeVis.alpha = Cust.A_SliderAlpha;
          this.shapeVis = shapeVis;
          return shapeVis;
        } else {
          return null;
        }
      }

      return this.shapeVis;
    }
  }, {
    key: "SetCurrentBiTog",
    value: function SetCurrentBiTog() {
      if (this.shapeVis === null) return;

      if (this.mode === Item.ModeBiTogUD) {
        if (this.defaultCmd.togState === true) {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, -Math.PI, 0).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h / 2);
          }
        } else {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, 0, Math.PI).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y, this.dw, this.h / 2);
          }
        }

        this.shapeVis.alpha = Cust.B_TogOffAlpha;
      } else if (this.mode === Item.ModeBiTogLR) {
        if (this.defaultCmd.togState === true) {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, -Math.PI / 2, +Math.PI / 2, true).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw / 2, this.h);
          }
        } else {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, -Math.PI / 2, +Math.PI / 2, false).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x, this.y - this.h / 2, this.dw / 2, this.h);
          }
        }

        this.shapeVis.alpha = Cust.B_TogOffAlpha;
      }
    }
  }, {
    key: "SetCurrentALogExtent",
    value: function SetCurrentALogExtent(stageX, stageY) {
      if (this.shapeVis === null) return;

      if (this.alogHorizontal) {
        var localX = stageX - this.x + this.dw / 2;
        this.defaultCmd.codeVal = localX * Cust.A_Scale / this.dw;
        this.defaultCmd.codeVal = this.defaultCmd.codeVal < 0 ? 0 : this.defaultCmd.codeVal;
        this.defaultCmd.codeVal = this.defaultCmd.codeVal > Cust.A_Scale ? Cust.A_Scale : this.defaultCmd.codeVal;
        this.defaultCmd.codeVal = Math.round(this.defaultCmd.codeVal);
        localX = this.defaultCmd.codeVal * this.dw / Cust.A_Scale;

        if (this.mode === Item.ModeAnalog) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol).drawRect(this.x - this.dw / 2 + localX, this.y - this.h / 2, this.dw - localX, this.h);
        } else if (this.mode === Item.ModeSlider) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol).drawRect(this.x - this.dw / 2 + localX + Cust.A_SliderHandleWidth_px, this.y - this.h / 2, this.dw - localX - Cust.A_SliderHandleWidth_px, this.h).drawRect(this.x - this.dw / 2, this.y - this.h / 2, localX - Cust.A_SliderHandleWidth_px, this.h);
        }
      } else {
        var localY = stageY - this.y + this.h / 2;
        this.defaultCmd.codeVal = localY * Cust.A_Scale / this.h;
        this.defaultCmd.codeVal = this.defaultCmd.codeVal < 0 ? 0 : this.defaultCmd.codeVal;
        this.defaultCmd.codeVal = this.defaultCmd.codeVal > Cust.A_Scale ? Cust.A_Scale : this.defaultCmd.codeVal;
        this.defaultCmd.codeVal = Cust.A_Scale - this.defaultCmd.codeVal;
        this.defaultCmd.codeVal = Math.round(this.defaultCmd.codeVal);
        localY = this.h - this.defaultCmd.codeVal * this.h / Cust.A_Scale;

        if (this.mode === Item.ModeAnalog) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, localY);
        } else if (this.mode === Item.ModeSlider) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, localY - Cust.A_SliderHandleWidth_px).drawRect(this.x - this.dw / 2, this.y - this.h / 2 + localY + Cust.A_SliderHandleWidth_px, this.dw, this.h - localY - Cust.A_SliderHandleWidth_px);
        }
      }

      this.shapeVis.alpha = this.mode === Item.ModeSlider ? Cust.A_SliderAlpha : Cust.A_AnalogAlpha;
    }
  }, {
    key: "SetValueALogExtent",
    value: function SetValueALogExtent() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this.shapeVis === null) return;
      var localVal = value < 0 ? 0 : value;
      localVal = localVal > Cust.A_Scale ? Cust.A_Scale : localVal;

      if (this.alogHorizontal) {
        var localX = localVal * this.dw / Cust.A_Scale;

        if (this.mode === Item.ModeAnalog) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol).drawRect(this.x - this.dw / 2 + localX, this.y - this.h / 2, this.dw - localX, this.h);
        } else if (this.mode === Item.ModeSlider) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol).drawRect(this.x - this.dw / 2 + localX + Cust.A_SliderHandleWidth_px, this.y - this.h / 2, this.dw - localX - Cust.A_SliderHandleWidth_px, this.h).drawRect(this.x - this.dw / 2, this.y - this.h / 2, localX - Cust.A_SliderHandleWidth_px, this.h);
        }
      } else {
        var localY = this.h - localVal * this.h / Cust.A_Scale;

        if (this.mode === Item.ModeAnalog) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_AnalogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, localY);
        } else if (this.mode === Item.ModeSlider) {
          this.shapeVis.graphics.clear().beginFill(Cust.A_SliderCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, localY - Cust.A_SliderHandleWidth_px).drawRect(this.x - this.dw / 2, this.y - this.h / 2 + localY + Cust.A_SliderHandleWidth_px, this.dw, this.h - localY - Cust.A_SliderHandleWidth_px);
        }
      }

      this.shapeVis.alpha = this.mode === Item.ModeSlider ? Cust.A_SliderAlpha : Cust.A_AnalogAlpha;
    }
  }, {
    key: "Update",
    value: function Update() {
      if (this.mode === Item.ModeTog) {
        if (this.shapeVis === null) return;
        this.shapeVis.alpha = this.defaultCmd.togState() ? Cust.D_TogOnAlpha : Cust.D_TogOffAlpha;
        this.shapeVis.alpha = this.defaultCmd.togState() ? Cust.D_TogOnAlpha : Cust.D_TogOffAlpha;
      } else if (this.mode === Item.ModeBiTogUD) {
        if (this.shapeVis === null) return;
        this.SetCurrentBiTog();
      } else if (this.mode === Item.ModeBiTogLR) {
        if (this.shapeVis === null) return;
        this.SetCurrentBiTog();
      } else if (this.mode === Item.ModeAnalog) {
        if (this.shapeVis === null) return;
        this.SetValueALogExtent(this.defaultCmd.codeVal);
      } else if (this.mode === Item.ModeSlider) {
        if (this.shapeVis === null) return;
        this.SetValueALogExtent(this.defaultCmd.codeVal);
      }
    }
  }, {
    key: "ExecCmdList",
    value: function ExecCmdList(cmdIndex) {
      var cmd = this.GetCmd(cmdIndex++);

      while (cmd != null) {
        cmd.UpdateValue();
        var cmdString = cmd.GetCommand(page_base.CmdModeTap);
        this.Dispatch(cmdString.str, Dom.PORT + cmd.js);
        cmd = this.GetCmd(cmdIndex++);
      }
    }
  }, {
    key: "Dispose",
    value: function Dispose() {
      if (this.shapeVis != null) {
        this.shapeVis = null;
      }

      if (this.shape != null) {
        this.shape.removeAllEventListeners();
        this.shape = null;
      }
    }
  }, {
    key: "Dispatch",
    value: function Dispatch(cmdStr, port) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("debug").innerHTML = this.responseText;
        }
      };

      xmlhttp.open("GET", '/calludp/ip/' + Dom.IP + '/port/' + port.toString() + '/msg/' + cmdStr, true);
      xmlhttp.send();
    }
  }, {
    key: "Target_HandleEvent",
    value: function Target_HandleEvent(evt) {
      var cmd = "";

      if (evt.type == "mousedown") {
        this.pressed = true;

        if (this.mode === Item.ModePR) {
          this.shape.alpha = Cust.B_DownAlpha;
          cmd = this.defaultCmd.GetCommand(page_base.CmdModePress);
          this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
        } else if (this.mode === Item.ModeVal) {
          this.shape.alpha = Cust.B_DownAlpha;
          this.defaultCmd.UpdateValue();
          cmd = this.defaultCmd.GetCommand(page_base.CmdModePress);
          this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
        } else if (this.mode === Item.ModeTap) {
          this.shape.alpha = Cust.B_DownAlpha;
          this.ExecCmdList(0);
        } else if (this.mode === Item.ModeAnalog || this.mode === Item.ModeSlider) {
          this.SetCurrentALogExtent(evt.stageX, evt.stageY);
          cmd = this.defaultCmd.GetCommand(page_base.CmdModePress);
          this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
        } else if (this.mode === Item.ModeBiTogUD || this.mode === Item.ModeBiTogLR) {
          this.defaultCmd.togState = !this.defaultCmd.togState;
          this.SetCurrentBiTog();
          cmd = this.defaultCmd.GetCommand(page_base.CmdModeTap);
          this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
          this.ExecCmdList();
        } else {
          this.defaultCmd.togState = !this.defaultCmd.togState;
          this.shape.alpha = this.defaultCmd.togState ? Cust.B_TogOnAlpha : Cust.B_TogOffAlpha;
          cmd = this.defaultCmd.GetCommand(page_base.CmdModeTap);
          this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
          this.ExecCmdList();
        }
      } else if (evt.type == "pressmove") {
          if (this.mode === Item.ModeAnalog || this.mode === Item.ModeSlider) {
            this.SetCurrentALogExtent(evt.stageX, evt.stageY);
            cmd = this.defaultCmd.GetCommand(page_base.CmdModePress);
            this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
          }
        } else if (evt.type == "pressup" || this.pressed && evt.type == "mouseout") {
          this.pressed = false;

          if (this.mode === Item.ModePR || this.mode === Item.ModeVal) {
            this.shape.alpha = Cust.B_UpAlpha;
          } else if (this.mode === Item.ModeTap) {
            this.shape.alpha = Cust.B_UpAlpha;
            return;
          }

          cmd = this.defaultCmd.GetCommand(page_base.CmdModeRelease);
          if (cmd.cMode === page_base.CmdModeTap) return;
          this.Dispatch(cmd.str, Dom.PORT + this.defaultCmd.js);
        }
    }
  }, {
    key: "defaultCmd",
    get: function get() {
      return this.GetCmd(0);
    }
  }]);

  return Target;
}();

var Display = function () {
  function Display(name, x, y, dw, h, mode, align, bline, font, color, section, item) {
    _classCallCheck(this, Display);

    this.name = name;
    this.x = x;
    this.y = y;
    this.dw = dw;
    this.h = h;
    this.mode = mode;
    this.align = align;
    this.bline = bline;
    this.font = font;
    this.color = color;
    this.togStateInit = color > 0 ? true : false;
    this.section = section;
    this.item = item;
    this.text = null;
    this.shapeVis = null;
    this.alogHorizontal = true;

    if (dw < 5) {
      document.getElementById("debug").innerHTML = "ERROR: argument DW is <5 - target too small - in DisplayID: " + name;
    }

    if (h > 0 && h < 5) {
      document.getElementById("debug").innerHTML = "ERROR: argument H is used but <5 - target too small - in DisplayID: " + name;
    }

    if (mode == undefined || mode == null) {
      document.getElementById("debug").innerHTML = "ERROR: Item Mode is not defined - in DisplayID: " + name;
    }
  }

  _createClass(Display, [{
    key: "GetDispShape",
    value: function GetDispShape() {
      if (this.shapeVis === null) {
        var shape = new createjs.Shape();

        if (this.mode === Disp.ModeTog) {
          if (this.h === 0) {
            shape.graphics.beginFill(Cust.D_TogCol).drawCircle(this.x, this.y, this.dw / 2);
          } else {
            shape.graphics.beginFill(Cust.D_TogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = this.togStateInit === true ? Cust.D_TogOnAlpha : Cust.D_TogOffAlpha;
        } else if (this.mode === Disp.ModeBiTogUD || this.mode === Disp.ModeBiTogLR) {
          this.shapeVis = shape;
          this.SetCurrentBiTog();
        } else if (this.mode === Disp.ModeSig) {
          if (this.h === 0) {
            shape.graphics.beginFill(this.color).drawCircle(this.x, this.y, this.dw / 2);
          } else {
            shape.graphics.beginFill(this.color).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = Cust.D_SigOffAlpha;
        } else if (this.mode === Disp.ModeAnalog || this.mode === Disp.ModeSlider) {
          if (this.h === 0 || this.dw === 0) {
            shape.graphics.beginFill("red").drawRect(this.x, this.y, 100, 100);
            shape.alpha = 1.0;
          } else {
            this.alogHorizontal = this.dw > this.h;
            shape.graphics.beginFill(this.mode === Disp.ModeSlider ? Cust.D_SliderCol : Cust.D_AnalogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h);
          }

          shape.alpha = Cust.D_SliderAlpha;
        } else {
          shape = null;
        }

        if (shape !== null) {
          shape.name = this.name;
          this.shapeVis = shape;
        }
      }

      return this.shapeVis;
    }
  }, {
    key: "SetCurrentBiTog",
    value: function SetCurrentBiTog() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.shapeVis === null) return;

      if (this.mode === Disp.ModeBiTogUD) {
        if (value === true) {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, -Math.PI, 0).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, this.h / 2);
          }
        } else {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, 0, Math.PI).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y, this.dw, this.h / 2);
          }

          this.shapeVis.alpha = Cust.D_TogOffAlpha;
        }
      } else if (this.mode === Disp.ModeBiTogLR) {
        if (value === true) {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, -Math.PI / 2, +Math.PI / 2, true).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw / 2, this.h);
          }
        } else {
          if (this.h === 0) {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).arc(this.x, this.y, this.dw / 2, -Math.PI / 2, +Math.PI / 2, false).closePath();
          } else {
            this.shapeVis.graphics.clear().beginFill(Cust.B_TogCol).drawRect(this.x, this.y - this.h / 2, this.dw / 2, this.h);
          }
        }

        this.shapeVis.alpha = Cust.D_TogOffAlpha;
      }
    }
  }, {
    key: "SetCurrentALogExtent",
    value: function SetCurrentALogExtent() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this.shapeVis === null) return;
      var localVal = value < 0 ? 0 : value;
      localVal = localVal > Cust.D_Scale ? Cust.D_Scale : localVal;

      if (this.alogHorizontal) {
        var localX = localVal * this.dw / Cust.D_Scale;

        if (this.mode === Disp.ModeAnalog) {
          this.shapeVis.graphics.clear().beginFill(Cust.D_AnalogCol).drawRect(this.x - this.dw / 2 + localX, this.y - this.h / 2, this.dw - localX, this.h);
        } else if (this.mode === Disp.ModeSlider) {
          this.shapeVis.graphics.clear().beginFill(Cust.D_SliderCol).drawRect(this.x - this.dw / 2 + localX + Cust.D_SliderHandleWidth_px, this.y - this.h / 2, this.dw - localX - Cust.D_SliderHandleWidth_px, this.h).drawRect(this.x - this.dw / 2, this.y - this.h / 2, localX - Cust.D_SliderHandleWidth_px, this.h);
        }
      } else {
        var localY = this.h - localVal * this.h / Cust.D_Scale;

        if (this.mode === Disp.ModeAnalog) {
          this.shapeVis.graphics.clear().beginFill(Cust.D_AnalogCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, localY);
        } else if (this.mode === Disp.ModeSlider) {
          this.shapeVis.graphics.clear().beginFill(Cust.D_SliderCol).drawRect(this.x - this.dw / 2, this.y - this.h / 2, this.dw, localY - Cust.D_SliderHandleWidth_px).drawRect(this.x - this.dw / 2, this.y - this.h / 2 + localY + Cust.D_SliderHandleWidth_px, this.dw, this.h - localY - Cust.D_SliderHandleWidth_px);
        }
      }

      this.shapeVis.alpha = this.mode === Disp.ModeSlider ? Cust.D_SliderAlpha : Cust.D_AnalogAlpha;
    }
  }, {
    key: "GetText",
    value: function GetText() {
      if (this.text === null) {
        if (this.mode === Disp.ModeTxt) {
          var text = new createjs.Text();
          text.x = this.x;
          text.y = this.y;
          text.setBounds(0, 0, this.dw, this.h);
          text.text = "";
          text.font = this.font;
          text.color = this.color;
          text.maxWidth = this.dw;
          text.textAlign = this.align;
          text.textBaseline = this.bline;
          text.name = this.name;
          this.text = text;
        }
      }

      return this.text;
    }
  }, {
    key: "Dispose",
    value: function Dispose() {
      if (this.shapeVis != null) {
        this.shapeVis = null;
      }

      if (this.text != null) {
        this.text = null;
      }
    }
  }, {
    key: "Update",
    value: function Update() {
      if (this.mode === Disp.ModeTxt) {
        if (this.text === null) return;
        this.text.text = page_base._x_globalData[this.section][this.item];
      } else if (this.mode === Disp.ModeTog) {
        if (this.shapeVis === null) return;
        this.shapeVis.alpha = page_base._x_globalData[this.section][this.item] === this.togStateInit ? Cust.D_TogOffAlpha : Cust.D_TogOnAlpha;
      } else if (this.mode === Disp.ModeSig) {
        if (this.shapeVis === null) return;
        this.shapeVis.alpha = page_base._x_globalData[this.section][this.item] === true ? Cust.D_SigOnAlpha : Cust.D_SigOffAlpha;
      } else if (this.mode === Disp.ModeBiTogUD) {
        if (this.shapeVis === null) return;
        this.SetCurrentBiTog(page_base._x_globalData[this.section][this.item]);
      } else if (this.mode === Disp.ModeBiTogLR) {
        if (this.shapeVis === null) return;
        this.SetCurrentBiTog(page_base._x_globalData[this.section][this.item]);
      } else if (this.mode === Disp.ModeAnalog) {
        if (this.shapeVis === null) return;
        this.SetCurrentALogExtent(page_base._x_globalData[this.section][this.item]);
      } else if (this.mode === Disp.ModeSlider) {
        if (this.shapeVis === null) return;
        this.SetCurrentALogExtent(page_base._x_globalData[this.section][this.item]);
      }
    }
  }]);

  return Display;
}();

var Page_proto_obj = function () {
  function Page_proto_obj(pageName, backgroundImageUri, tItems, dItems) {
    _classCallCheck(this, Page_proto_obj);

    this.PageName = pageName;
    this.BackgroundImageUri = backgroundImageUri;
    this.BackgroundImg = null;
    this.Stage = null;
    this.Items = tItems;
    this.DataItems = dItems;
  }

  _createClass(Page_proto_obj, [{
    key: "Init",
    value: function Init(canvas) {
      var self = this;
      this.Stage = new createjs.Stage(canvas);
      this.Stage.enableMouseOver();

      if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(this.Stage, true, false);
      }

      this.BackgroundImg = new Image();

      this.BackgroundImg.onload = function () {
        var bitmap = new createjs.Bitmap(self.BackgroundImg);
        self.Stage.addChildAt(bitmap, 0);
        self.Stage.update();
      };

      this.BackgroundImg.src = this.BackgroundImageUri;
      this.Init_closure();
      this.Stage.update();
    }
  }, {
    key: "Init_closure",
    value: function Init_closure() {
      for (var i = 0; i < this.Items.length; ++i) {
        var shape = this.GetShape(i);
        this.Stage.addChild(shape);
        shape.on("mousedown", this.Items_HandleEvent, null, false, this);
        shape.on("pressup", this.Items_HandleEvent, null, false, this);
        shape.on("mouseout", this.Items_HandleEvent, null, false, this);
        var shapeVis = this.GetShapeVis(i);

        if (shapeVis !== null) {
          shape.on("pressmove", this.Items_HandleEvent, null, false, this);
          this.Stage.addChild(shapeVis);
        }
      }

      for (var i = 0; i < this.DataItems.length; ++i) {
        var text = this.GetText(i);

        if (text !== null) {
          this.Stage.addChild(text);
        }

        var shapeVis = this.GetDispShapeVis(i);

        if (shapeVis !== null) {
          this.Stage.addChild(shapeVis);
        }
      }

      if (Dom.DATAFILE !== '') {
        createjs.Ticker.framerate = Cust.DisplayPerSec > 10 ? 10 : Cust.DisplayPerSec;
        createjs.Ticker.on("tick", this.HandleDataUpdate, null, false, this);
      }
    }
  }, {
    key: "Dispose",
    value: function Dispose() {
      createjs.Touch.disable(this.Stage);
      this.Stage.removeAllEventListeners();
      this.Stage.removeAllChildren();

      for (var i = 0; i < this.Items.length; ++i) {
        this.Items[i].Dispose();
      }

      for (var i = 0; i < this.DataItems.length; ++i) {
        this.DataItems[i].Dispose();
      }

      this.Stage = null;
      this.BackgroundImg = null;
    }
  }, {
    key: "GetItemByName",
    value: function GetItemByName(itemName) {
      for (var i = 0; i < this.Items.length; ++i) {
        if (this.Items[i].name === itemName) {
          return this.Items[i];
        }
      }

      return null;
    }
  }, {
    key: "GetCommand",
    value: function GetCommand(itemIndex, mode) {
      if (itemIndex >= 0 && itemIndex < this.Items.length) {
        var cmd = this.Items[itemIndex].GetCommand(mode);
        return cmd;
      }

      return "";
    }
  }, {
    key: "GetCommandByName",
    value: function GetCommandByName(itemName, mode) {
      for (var i = 0; i < this.Items.length; ++i) {
        if (this.Items[i].name === itemName) {
          return this.GetCommand(i, mode);
        }
      }

      return "";
    }
  }, {
    key: "GetShape",
    value: function GetShape(itemIndex) {
      if (itemIndex >= 0 && itemIndex < this.Items.length) {
        return this.Items[itemIndex].GetShape();
      }

      return null;
    }
  }, {
    key: "GetShapeVis",
    value: function GetShapeVis(itemIndex) {
      if (itemIndex >= 0 && itemIndex < this.Items.length) {
        return this.Items[itemIndex].GetShapeVis();
      }

      return null;
    }
  }, {
    key: "GetText",
    value: function GetText(itemIndex) {
      if (itemIndex >= 0 && itemIndex < this.DataItems.length) {
        return this.DataItems[itemIndex].GetText();
      }

      return null;
    }
  }, {
    key: "GetDispShapeVis",
    value: function GetDispShapeVis(itemIndex) {
      if (itemIndex >= 0 && itemIndex < this.DataItems.length) {
        return this.DataItems[itemIndex].GetDispShape();
      }

      return null;
    }
  }, {
    key: "GetShapeByName",
    value: function GetShapeByName(itemName) {
      for (var i = 0; i < this.Items.length; ++i) {
        if (this.Items[i].name === itemName) {
          return this.GetShape(i);
        }
      }

      return null;
    }
  }, {
    key: "UpdateAllTargetItems",
    value: function UpdateAllTargetItems(evt, self) {
      if (evt.type == "pressup") {
        for (var i = 0; i < self.Items.length; ++i) {
          self.Items[i].Update(evt);
        }
      }

      if (self.Stage) self.Stage.update();
    }
  }, {
    key: "Items_HandleEvent",
    value: function Items_HandleEvent(evt, self) {
      for (var i = 0; i < self.Items.length; ++i) {
        if (evt.target.name === self.Items[i].name) {
          self.Items[i].Target_HandleEvent(evt);
          self.UpdateAllTargetItems(evt, self);
        }
      }
    }
  }, {
    key: "UpdateAllDisplayItems",
    value: function UpdateAllDisplayItems(evt, self) {
      for (var i = 0; i < self.DataItems.length; ++i) {
        self.DataItems[i].Update(evt);
      }

      if (self.Stage) self.Stage.update();
    }
  }, {
    key: "HandleDataUpdate",
    value: function HandleDataUpdate(evt, self) {
      if (!evt.paused) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            page_base._x_globalData = JSON.parse(this.responseText);
            self.UpdateAllDisplayItems(evt, self);
          }
        };

        xmlhttp.open("GET", '/filequery/file/' + Dom.DATAFILE, true);
        xmlhttp.send();
      }
    }
  }]);

  return Page_proto_obj;
}();