"use strict";

// V 1.0
// Key definitions for the CSvJoyServer Key handler
// Taken from the Windows include files

  /*
  * Virtual Keys, Standard Set
    Created as Javascript object propertoes to avoid so many globals and expose them readonly
    Do be used as VK.<KEY> e.g. VK.SHIFT
  */
const VK = {
  get LBUTTON() { return 0x01; },
  get RBUTTON() { return 0x02; },
  get CANCEL() { return 0x03; },
  get MBUTTON() { return 0x04; },  /* NOT contiguous with L & RBUTTON */
  get XBUTTON1() { return 0x05; }, /* NOT contiguous with L & RBUTTON */
  get XBUTTON2() { return 0x06; }, /* NOT contiguous with L & RBUTTON */
  /* 0x07 : reserved */
  get BACK() { return 0x08; },
  get TAB() { return 0x09; },
  /* 0x0A - 0x0B : reserved  */
  get CLEAR() { return 0x0C; },
  get RETURN() { return 0x0D; },
  /* 0x0E - 0x0F : unassigned */
  get SHIFT() { return 0x10; },
  get CONTROL() { return 0x11; },
  get MENU() { return 0x12; },
  get PAUSE() { return 0x13; },
  get CAPITAL() { return 0x14; },
  /* 0x16 : unassigned  */
  /* 0x1A : unassigned  */
  get ESCAPE() { return 0x1B; },

  get CONVERT() { return 0x1C; },
  get NONCONVERT() { return 0x1D; },
  get ACCEPT() { return 0x1E; },
  get MODECHANGE() { return 0x1F; },

  get SPACE() { return 0x20; },
  get PRIOR() { return 0x21; },
  get NEXT() { return 0x22; },
  get END() { return 0x23; },
  get HOME() { return 0x24; },
  get LEFT() { return 0x25; },  // Arrows
  get UP() { return 0x26; },    // Arrows
  get RIGHT() { return 0x27; }, // Arrows
  get DOWN() { return 0x28; },  // Arrows
  get SELECT() { return 0x29; },
  get PR() { return 0x2A; },
  get EXECUTE() { return 0x2B; },
  get SNAPSHOT() { return 0x2C; },
  get INSERT() { return 0x2D; },
  get DELETE() { return 0x2E; },
  get HELP() { return 0x2F; },
  /*
  * 0 - 9 are the same as ASCII '0' - '9' (0x30 - 0x39)
  * 0x3A - 0x40 : unassigned
  * A - Z are the same as ASCII 'A' - 'Z' (0x41 - 0x5A)
  */
  get D0() { return 0x30; }, // digits 0..9 on the main Kbd
  get D1() { return 0x31; },
  get D2() { return 0x32; },
  get D3() { return 0x33; },
  get D4() { return 0x34; },
  get D5() { return 0x35; },
  get D6() { return 0x36; },
  get D7() { return 0x37; },
  get D8() { return 0x38; },
  get D9() { return 0x39; },

  get A() { return 0x41; },
  get B() { return 0x42; },
  get C() { return 0x43; },
  get D() { return 0x44; },
  get E() { return 0x45; },
  get F() { return 0x46; },
  get G() { return 0x47; },
  get H() { return 0x48; },
  get I() { return 0x49; },
  get J() { return 0x4A; },
  get K() { return 0x4B; },
  get L() { return 0x4C; },
  get M() { return 0x4D; },
  get N() { return 0x4E; },
  get O() { return 0x4F; },
  get P() { return 0x50; },
  get Q() { return 0x51; },
  get R() { return 0x52; },
  get S() { return 0x53; },
  get T() { return 0x54; },
  get U() { return 0x55; },
  get V() { return 0x56; },
  get W() { return 0x57; },
  get X() { return 0x58; },
  get Y() { return 0x59; },
  get Z() { return 0x5A; },

  get LWIN() { return 0x5B; }, // Left Win Key
  get RWIN() { return 0x5C; }, // RIght Win Key
  get APPS() { return 0x5D; },
  /* 0x5E : reserved  */
  get SLEEP() { return 0x5F; },
  // Numpad on Kbd
  get NUMPAD0() { return 0x60; },
  get NUMPAD1() { return 0x61; },
  get NUMPAD2() { return 0x62; },
  get NUMPAD3() { return 0x63; },
  get NUMPAD4() { return 0x64; },
  get NUMPAD5() { return 0x65; },
  get NUMPAD6() { return 0x66; },
  get NUMPAD7() { return 0x67; },
  get NUMPAD8() { return 0x68; },
  get NUMPAD9() { return 0x69; },
  get MULTIPLY() { return 0x6A; },
  get ADD() { return 0x6B; },
  get SEPARATOR() { return 0x6C; },
  get SUBTRACT() { return 0x6D; },
  get DECIMAL() { return 0x6E; },
  get DIVIDE() { return 0x6F; },

  get F1() { return 0x70; },
  get F2() { return 0x71; },
  get F3() { return 0x72; },
  get F4() { return 0x73; },
  get F5() { return 0x74; },
  get F6() { return 0x75; },
  get F7() { return 0x76; },
  get F8() { return 0x77; },
  get F9() { return 0x78; },
  get F10() { return 0x79; },
  get F11() { return 0x7A; },
  get F12() { return 0x7B; },
  get F13() { return 0x7C; },
  get F14() { return 0x7D; },
  get F15() { return 0x7E; },
  /*
  not defined in DirectInput - hence left out here
  F16            0x7F
  F17            0x80
  F18            0x81
  F19            0x82
  F20            0x83
  F21            0x84
  F22            0x85
  F23            0x86
  F24            0x87
  */
  get NUMLOCK() { return 0x90; },
  get SCROLL() { return 0x91; }, // SCROLL LOCK
  /* 0x97 - 0x9F : unassigned */
  /*
  * this.L* & this.R* - left and right Alt, Ctrl and Shift virtual keys.
  * Used only as parameters to GetAsyncKeyState() and GetKeyState().
  * No other API or message will distinguish left and right keys in this way.
  */
  get LSHIFT() { return 0xA0; },
  get RSHIFT() { return 0xA1; },
  get LCONTROL() { return 0xA2; },
  get RCONTROL() { return 0xA3; },
  get LMENU() { return 0xA4; },
  get RMENU() { return 0xA5; },
  /* 0xB8 - 0xB9 : reserved */
  get OEM_1() { return 0xBA; },           // ',:' for US
  get OEM_PLUS() { return 0xBB; },        // '+' any country
  get OEMOEM_COMMA_1() { return 0xBC; },  // ',' any country
  get OEM_MINUS() { return 0xBD; },       // '-' any country
  get OEM_PERIOD() { return 0xBE; },      // '.' any country
  get OEM_2() { return 0xBF; },           // '/?' for US
  get OEM_3() { return 0xC0; },           // '`~' for US
  /* 0xC1 - 0xC2 : reserved */
  get OEM_4() { return 0xDB; },           //  '[{' for US
  get OEM_5() { return 0xDC; },           //  '\|' for US
  get OEM_6() { return 0xDD; },           //  ']}' for US
  get OEM_7() { return 0xDE; },           //  ''"' for US
  get OEM_8() { return 0xDF; },
  /* 0xE0 : reserved */
  get PROCESSKEY() { return 0xE5; },
  /* 0xE8 : unassigned */
  /* 0xFF : reserved */

  // Added to converge more with DirectInput naming and additions

  // US ISO Kbd 1st row after Key 0
  get BACKSPACE() { return this.BACK; },
  get EQUALS() { return this.OEM_6; },
  get MINUS() { return this.OEM_4; },
  // US ISO Kbd 2nd row after Key P
  get LBRACKET() { return this.OEM_1; },
  get RBRACKET() { return this.OEM_3; },
  // US ISO Kbd 3rd row after Key L
  get SEMICOLON() { return this.OEM_7; },
  get APOSTROPHE() { return this.OEM_5; },
  get BACKSLASH() { return this.OEM_8; },
  // US ISO Kbd 4th row after Key M
  get SLASH() { return this.OEM_MINUS; },
  get PERIOD() { return this.OEM_PERIOD; },
  get COMMA() { return this.OEM_COMMA; },
  // NumPad aside from numbers
  get NUMPADSLASH() { return this.DIVIDE; },
  get NUMPADSTAR() { return this.MULTIPLY; },
  get NUMPADMINUS() { return this.SUBTRACT; },
  get NUMPADPLUS() { return this.ADD; },
  get NUMPADENTER() { return this.RETURN + 1; },// needs special treatment in the DLL...
  get NUMPADPERIOD() { return this.DECIMAL; },

  get ALT() { return this.MENU; },//  added generic ALT key :: MENU
  get CAPSLOCK() { return this.CAPITAL; },
  get PGUP() { return this.PRIOR; },
  get PGDN() { return this.NEXT; },
  get LEFTARROW() { return this.LEFT; },
  get UPARROW() { return this.UP; },
  get RIGHTARROW() { return this.RIGHT; },
  get DOWNARROW() { return this.DOWN; },
  get PRINTSCREEN() { return this.SNAPSHOT; },
  get LALT() { return this.LMENU; },
  get RALT() { return this.RMENU; },
  // NUMLOCK -> PAUSE
}
