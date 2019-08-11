"use strict";

var VK = {
  get LBUTTON() {
    return 0x01;
  },

  get RBUTTON() {
    return 0x02;
  },

  get CANCEL() {
    return 0x03;
  },

  get MBUTTON() {
    return 0x04;
  },

  get XBUTTON1() {
    return 0x05;
  },

  get XBUTTON2() {
    return 0x06;
  },

  get BACK() {
    return 0x08;
  },

  get TAB() {
    return 0x09;
  },

  get CLEAR() {
    return 0x0C;
  },

  get RETURN() {
    return 0x0D;
  },

  get SHIFT() {
    return 0x10;
  },

  get CONTROL() {
    return 0x11;
  },

  get MENU() {
    return 0x12;
  },

  get PAUSE() {
    return 0x13;
  },

  get CAPITAL() {
    return 0x14;
  },

  get ESCAPE() {
    return 0x1B;
  },

  get CONVERT() {
    return 0x1C;
  },

  get NONCONVERT() {
    return 0x1D;
  },

  get ACCEPT() {
    return 0x1E;
  },

  get MODECHANGE() {
    return 0x1F;
  },

  get SPACE() {
    return 0x20;
  },

  get PRIOR() {
    return 0x21;
  },

  get NEXT() {
    return 0x22;
  },

  get END() {
    return 0x23;
  },

  get HOME() {
    return 0x24;
  },

  get LEFT() {
    return 0x25;
  },

  get UP() {
    return 0x26;
  },

  get RIGHT() {
    return 0x27;
  },

  get DOWN() {
    return 0x28;
  },

  get SELECT() {
    return 0x29;
  },

  get PR() {
    return 0x2A;
  },

  get EXECUTE() {
    return 0x2B;
  },

  get SNAPSHOT() {
    return 0x2C;
  },

  get INSERT() {
    return 0x2D;
  },

  get DELETE() {
    return 0x2E;
  },

  get HELP() {
    return 0x2F;
  },

  get D0() {
    return 0x30;
  },

  get D1() {
    return 0x31;
  },

  get D2() {
    return 0x32;
  },

  get D3() {
    return 0x33;
  },

  get D4() {
    return 0x34;
  },

  get D5() {
    return 0x35;
  },

  get D6() {
    return 0x36;
  },

  get D7() {
    return 0x37;
  },

  get D8() {
    return 0x38;
  },

  get D9() {
    return 0x39;
  },

  get A() {
    return 0x41;
  },

  get B() {
    return 0x42;
  },

  get C() {
    return 0x43;
  },

  get D() {
    return 0x44;
  },

  get E() {
    return 0x45;
  },

  get F() {
    return 0x46;
  },

  get G() {
    return 0x47;
  },

  get H() {
    return 0x48;
  },

  get I() {
    return 0x49;
  },

  get J() {
    return 0x4A;
  },

  get K() {
    return 0x4B;
  },

  get L() {
    return 0x4C;
  },

  get M() {
    return 0x4D;
  },

  get N() {
    return 0x4E;
  },

  get O() {
    return 0x4F;
  },

  get P() {
    return 0x50;
  },

  get Q() {
    return 0x51;
  },

  get R() {
    return 0x52;
  },

  get S() {
    return 0x53;
  },

  get T() {
    return 0x54;
  },

  get U() {
    return 0x55;
  },

  get V() {
    return 0x56;
  },

  get W() {
    return 0x57;
  },

  get X() {
    return 0x58;
  },

  get Y() {
    return 0x59;
  },

  get Z() {
    return 0x5A;
  },

  get LWIN() {
    return 0x5B;
  },

  get RWIN() {
    return 0x5C;
  },

  get APPS() {
    return 0x5D;
  },

  get SLEEP() {
    return 0x5F;
  },

  get NUMPAD0() {
    return 0x60;
  },

  get NUMPAD1() {
    return 0x61;
  },

  get NUMPAD2() {
    return 0x62;
  },

  get NUMPAD3() {
    return 0x63;
  },

  get NUMPAD4() {
    return 0x64;
  },

  get NUMPAD5() {
    return 0x65;
  },

  get NUMPAD6() {
    return 0x66;
  },

  get NUMPAD7() {
    return 0x67;
  },

  get NUMPAD8() {
    return 0x68;
  },

  get NUMPAD9() {
    return 0x69;
  },

  get MULTIPLY() {
    return 0x6A;
  },

  get ADD() {
    return 0x6B;
  },

  get SEPARATOR() {
    return 0x6C;
  },

  get SUBTRACT() {
    return 0x6D;
  },

  get DECIMAL() {
    return 0x6E;
  },

  get DIVIDE() {
    return 0x6F;
  },

  get F1() {
    return 0x70;
  },

  get F2() {
    return 0x71;
  },

  get F3() {
    return 0x72;
  },

  get F4() {
    return 0x73;
  },

  get F5() {
    return 0x74;
  },

  get F6() {
    return 0x75;
  },

  get F7() {
    return 0x76;
  },

  get F8() {
    return 0x77;
  },

  get F9() {
    return 0x78;
  },

  get F10() {
    return 0x79;
  },

  get F11() {
    return 0x7A;
  },

  get F12() {
    return 0x7B;
  },

  get F13() {
    return 0x7C;
  },

  get F14() {
    return 0x7D;
  },

  get F15() {
    return 0x7E;
  },

  get NUMLOCK() {
    return 0x90;
  },

  get SCROLL() {
    return 0x91;
  },

  get LSHIFT() {
    return 0xA0;
  },

  get RSHIFT() {
    return 0xA1;
  },

  get LCONTROL() {
    return 0xA2;
  },

  get RCONTROL() {
    return 0xA3;
  },

  get LMENU() {
    return 0xA4;
  },

  get RMENU() {
    return 0xA5;
  },

  get OEM_1() {
    return 0xBA;
  },

  get OEM_PLUS() {
    return 0xBB;
  },

  get OEMOEM_COMMA_1() {
    return 0xBC;
  },

  get OEM_MINUS() {
    return 0xBD;
  },

  get OEM_PERIOD() {
    return 0xBE;
  },

  get OEM_2() {
    return 0xBF;
  },

  get OEM_3() {
    return 0xC0;
  },

  get OEM_4() {
    return 0xDB;
  },

  get OEM_5() {
    return 0xDC;
  },

  get OEM_6() {
    return 0xDD;
  },

  get OEM_7() {
    return 0xDE;
  },

  get OEM_8() {
    return 0xDF;
  },

  get PROCESSKEY() {
    return 0xE5;
  },

  get BACKSPACE() {
    return this.BACK;
  },

  get EQUALS() {
    return this.OEM_6;
  },

  get MINUS() {
    return this.OEM_4;
  },

  get LBRACKET() {
    return this.OEM_1;
  },

  get RBRACKET() {
    return this.OEM_3;
  },

  get SEMICOLON() {
    return this.OEM_7;
  },

  get APOSTROPHE() {
    return this.OEM_5;
  },

  get BACKSLASH() {
    return this.OEM_8;
  },

  get SLASH() {
    return this.OEM_MINUS;
  },

  get PERIOD() {
    return this.OEM_PERIOD;
  },

  get COMMA() {
    return this.OEM_COMMA;
  },

  get NUMPADSLASH() {
    return this.DIVIDE;
  },

  get NUMPADSTAR() {
    return this.MULTIPLY;
  },

  get NUMPADMINUS() {
    return this.SUBTRACT;
  },

  get NUMPADPLUS() {
    return this.ADD;
  },

  get NUMPADENTER() {
    return this.RETURN + 1;
  },

  get NUMPADPERIOD() {
    return this.DECIMAL;
  },

  get ALT() {
    return this.MENU;
  },

  get CAPSLOCK() {
    return this.CAPITAL;
  },

  get PGUP() {
    return this.PRIOR;
  },

  get PGDN() {
    return this.NEXT;
  },

  get LEFTARROW() {
    return this.LEFT;
  },

  get UPARROW() {
    return this.UP;
  },

  get RIGHTARROW() {
    return this.RIGHT;
  },

  get DOWNARROW() {
    return this.DOWN;
  },

  get PRINTSCREEN() {
    return this.SNAPSHOT;
  },

  get LALT() {
    return this.LMENU;
  },

  get RALT() {
    return this.RMENU;
  }

};