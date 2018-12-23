"use strict";

// V 1.0
// Key definitions for the CSvJoyServer Key handler
// Taken from the Windows include files

    /*
    * Virtual Keys, Standard Set
    */
const VK_LBUTTON = 0x01;
const VK_RBUTTON = 0x02;
const VK_CANCEL = 0x03;
const VK_MBUTTON = 0x04;    /* NOT contiguous with L & RBUTTON */

const VK_XBUTTON1 = 0x05;    /* NOT contiguous with L & RBUTTON */
const VK_XBUTTON2 = 0x06;    /* NOT contiguous with L & RBUTTON */

    /*
    * 0x07 : reserved
    */

const VK_BACK = 0x08;
const VK_TAB = 0x09;

    /*
    * 0x0A - 0x0B : reserved
    */

const VK_CLEAR = 0x0C;
const VK_RETURN = 0x0D;

    /*
    * 0x0E - 0x0F : unassigned
    */

const VK_SHIFT = 0x10;
const VK_CONTROL = 0x11;
const VK_MENU = 0x12;
const VK_PAUSE = 0x13;
const VK_CAPITAL = 0x14;

    /*
    * 0x16 : unassigned
    */

    /*
    * 0x1A : unassigned
    */

const VK_ESCAPE = 0x1B;

const VK_CONVERT = 0x1C;
const VK_NONCONVERT = 0x1D;
const VK_ACCEPT = 0x1E;
const VK_MODECHANGE = 0x1F;

const VK_SPACE = 0x20;
const VK_PRIOR = 0x21;
const VK_NEXT = 0x22;
const VK_END = 0x23;
const VK_HOME = 0x24;
const VK_LEFT = 0x25;  // Arrows
const VK_UP = 0x26;  // Arrows
const VK_RIGHT = 0x27;  // Arrows
const VK_DOWN = 0x28;  // Arrows
const VK_SELECT = 0x29;
const VK_PR= 0x2A;
const VK_EXECUTE = 0x2B;
const VK_SNAPSHOT = 0x2C;
const VK_INSERT = 0x2D;
const VK_DELETE = 0x2E;
const VK_HELP = 0x2F;

    /*
    * VK_0 - VK_9 are the same as ASCII '0' - '9' (0x30 - 0x39)
    * 0x3A - 0x40 : unassigned
    * VK_A - VK_Z are the same as ASCII 'A' - 'Z' (0x41 - 0x5A)
    */
const VK_0 =  0x30;
const VK_1 =  0x31;
const VK_2 =  0x32;
const VK_3 =  0x33;
const VK_4 =  0x34;
const VK_5 =  0x35;
const VK_6 =  0x36;
const VK_7 =  0x37;
const VK_8 =  0x38;
const VK_9 =  0x39;

const VK_A =  0x41;
const VK_B =  0x42;
const VK_C =  0x43;
const VK_D =  0x44;
const VK_E =  0x45;
const VK_F =  0x46;
const VK_G =  0x47;
const VK_H =  0x48;
const VK_I =  0x49;
const VK_J =  0x4a;
const VK_K =  0x4b;
const VK_L =  0x4c;
const VK_M =  0x4d;
const VK_N =  0x4e;
const VK_O =  0x4f;
const VK_P =  0x50;
const VK_Q =  0x51;
const VK_R =  0x52;
const VK_S =  0x53;
const VK_T =  0x54;
const VK_U =  0x55;
const VK_V =  0x56;
const VK_W =  0x57;
const VK_X =  0x58;
const VK_Y =  0x59;
const VK_Z =  0x5a;


const VK_LWIN = 0x5B;  // Left Win Key
const VK_RWIN = 0x5C;  // RIght Win Key
const VK_APPS = 0x5D;

    /*
    * 0x5E : reserved
    */

const VK_SLEEP = 0x5F;

const VK_NUMPAD0 = 0x60;
const VK_NUMPAD1 = 0x61;
const VK_NUMPAD2 = 0x62;
const VK_NUMPAD3 = 0x63;
const VK_NUMPAD4 = 0x64;
const VK_NUMPAD5 = 0x65;
const VK_NUMPAD6 = 0x66;
const VK_NUMPAD7 = 0x67;
const VK_NUMPAD8 = 0x68;
const VK_NUMPAD9 = 0x69;
const VK_MULTIPLY = 0x6A;
const VK_ADD = 0x6B;
const VK_SEPARATOR = 0x6C;
const VK_SUBTRACT = 0x6D;
const VK_DECIMAL = 0x6E;
const VK_DIVIDE = 0x6F;
const VK_F1 = 0x70;
const VK_F2 = 0x71;
const VK_F3 = 0x72;
const VK_F4 = 0x73;
const VK_F5 = 0x74;
const VK_F6 = 0x75;
const VK_F7 = 0x76;
const VK_F8 = 0x77;
const VK_F9 = 0x78;
const VK_F10 = 0x79;
const VK_F11 = 0x7A;
const VK_F12 = 0x7B;
const VK_F13 = 0x7C;
const VK_F14 = 0x7D;
const VK_F15 = 0x7E;
    /*
    not defined in DirectInput - hence left out here
    const VK_F16            0x7F
    const VK_F17            0x80
    const VK_F18            0x81
    const VK_F19            0x82
    const VK_F20            0x83
    const VK_F21            0x84
    const VK_F22            0x85
    const VK_F23            0x86
    const VK_F24            0x87
    */

const VK_NUMLOCK = 0x90;
const VK_SCROLL = 0x91;  // SCROLL LOCK

    /*
    * 0x97 - 0x9F : unassigned
    */

    /*
    * VK_L* & VK_R* - left and right Alt, Ctrl and Shift virtual keys.
    * Used only as parameters to GetAsyncKeyState() and GetKeyState().
    * No other API or message will distinguish left and right keys in this way.
    */
const VK_LSHIFT = 0xA0;
const VK_RSHIFT = 0xA1;
const VK_LCONTROL = 0xA2;
const VK_RCONTROL = 0xA3;
const VK_LMENU = 0xA4;
const VK_RMENU = 0xA5;

    /*
    * 0xB8 - 0xB9 : reserved
    */

const VK_OEM_1 = 0xBA;   // ';:' for US
const VK_OEM_PLUS = 0xBB;   // '+' any country
const VK_OEM_COMMA = 0xBC;   // ',' any country
const VK_OEM_MINUS = 0xBD;   // '-' any country
const VK_OEM_PERIOD = 0xBE;   // '.' any country
const VK_OEM_2 = 0xBF;   // '/?' for US
const VK_OEM_3 = 0xC0;   // '`~' for US

    /*
    * 0xC1 - 0xC2 : reserved
    */


const VK_OEM_4 = 0xDB;  //  '[{' for US
const VK_OEM_5 = 0xDC;  //  '\|' for US
const VK_OEM_6 = 0xDD;  //  ']}' for US
const VK_OEM_7 = 0xDE;  //  ''"' for US
const VK_OEM_8 = 0xDF;

    /*
    * 0xE0 : reserved
    */
const VK_PROCESSKEY = 0xE5;

    /*
    * 0xE8 : unassigned
    */

    /*
    * 0xFF : reserved
    */

    // Added to converge more with DirectInput naming and additions

    // US ISO Kbd 1st row after Key 0
const VK_BACKSPACE = VK_BACK;  // added
const VK_EQUALS = VK_OEM_6; // added
const VK_MINUS = VK_OEM_4; // added

    // US ISO Kbd 2nd row after Key P
const VK_LBRACKET = VK_OEM_1; // added
const VK_RBRACKET = VK_OEM_3; // added

    // US ISO Kbd 3rd row after Key L
const VK_SEMICOLON = VK_OEM_7; // added
const VK_APOSTROPHE = VK_OEM_5; // added
const VK_BACKSLASH = VK_OEM_8; // added

    // US ISO Kbd 4th row after Key M
const VK_SLASH = VK_OEM_MINUS; // added
const VK_PERIOD = VK_OEM_PERIOD; // added
const VK_COMMA = VK_OEM_COMMA; // added


    // NumPad aside from numbers
const VK_NUMPADSLASH = VK_DIVIDE;  // added 
const VK_NUMPADSTAR = VK_MULTIPLY; // added 
const VK_NUMPADMINUS = VK_SUBTRACT;  // added 
const VK_NUMPADPLUS = VK_ADD; // added 
const VK_NUMPADENTER = VK_RETURN + 1; // added - needs special treatment in the DLL...
const VK_NUMPADPERIOD = VK_DECIMAL;  // added 

const VK_ALT = VK_MENU;   //  added generic ALT key == MENU
const VK_CAPSLOCK = VK_CAPITAL;  // added
const VK_PGUP = VK_PRIOR;  //  added
const VK_PGDN = VK_NEXT;  //  added
const VK_LEFTARROW = VK_LEFT;  // Arrows
const VK_UPARROW = VK_UP;  // Arrows
const VK_RIGHTARROW = VK_RIGHT;  // Arrows
const VK_DOWNARROW = VK_DOWN;  // Arrows
const VK_PRINTSCREEN = VK_SNAPSHOT; // added
const VK_LALT = VK_LMENU; // added
const VK_RALT = VK_RMENU; // added

    // NUMLOCK -> PAUSE
