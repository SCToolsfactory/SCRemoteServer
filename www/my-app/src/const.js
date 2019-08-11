//
// V 2.0
// Item and Disp Consts
// --> In general there is nothing to change in this file for standard usage
//
// (c) 2019 Martin Burri
// MIT License - no warranties whatsoever...
// https://github.com/SCToolsfactory/SCRemoteServer

"use strict";

// All Gen.XY consts for page control
const Gen = {
    get Dummy() { return null; }, // safe argument for not used parameters
}

// All Item.XY consts for page control
const Item = {
    //* Item modes - visual representation and behavior of the Target
    get ModeTog() { return "tog"; },        // Types: Key, Button
    get ModeBiTogUD() { return "bitud"; },  // Types: Key, Button
    get ModeBiTogLR() { return "bitlr"; },  // Types: Key, Button
    get ModePR() { return "prel"; },        // Types: Key, Button
    get ModeTap() { return "tap"; },        // Types: Key, Button, Macro
    get ModeVal() { return "val"; },        // Types: (R)XYZAxis, SLn
    get ModeAnalog() { return "alog"; },    // Types: (R)XYZAxis, SLn
    get ModeSlider() { return "alogS"; },   // Types: (R)XYZAxis, SLn

    //* Activation Types
    // Key, Button activation (Key expects Values of KV_.., Buttons 1..max)
    get TypeKey() { return "key"; },        // Modes: Tog, BiTog, PR, Tap
    get TypeButton() { return "btn"; },     // Modes: Tog, BiTog, PR, Tap
    // Axis and RotAxis and Slider activation (accepts values from 0..1000, where 500 is the midpoint)
    get TypeXaxis() { return "axX"; },      // Modes: Val, Analog, Slider
    get TypeYaxis() { return "axY"; },      // Modes: Val, Analog, Slider
    get TypeZaxis() { return "axZ"; },      // Modes: Val, Analog, Slider
    get TypeRXaxis() { return "axRX"; },    // Modes: Val, Analog, Slider
    get TypeRYaxis() { return "axRY"; },    // Modes: Val, Analog, Slider
    get TypeRZaxis() { return "axRZ"; },    // Modes: Val, Analog, Slider
    get TypeSL1() { return "sl1"; },        // Modes: Val, Analog, Slider
    get TypeSL2() { return "sl2"; },        // Modes: Val, Analog, Slider
    // Type Macro - available only with ModeTap, expects a name as Value
    get TypeMacro() { return "mac"; },      // Modes: Tap

    //* Keystroke modifiers (TypeKey)
    get KModNone() { return "no"; },
    get KModLCtrl() { return "lc"; },
    get KModRCtrl() { return "rc"; },
    get KModLAlt() { return "la"; },
    get KModRAlt() { return "ra"; },
    get KModLShift() { return "ls"; },
    get KModRShift() { return "rs"; },
}

// *** Base consts for the Data Display
// All Disp.XY consts for page control
const Disp = {
    //* Display modes
    get ModeTxt() { return "txt"; },
    get ModeSig() { return "sig"; },
    get ModeTog() { return "tog"; },
    get ModeBiTogUD() { return "bitud"; },
    get ModeBiTogLR() { return "bitlr"; },
    get ModeAnalog() { return "alog"; },
    get ModeSlider() { return "alogS"; },
    //* Display  Alignment
    get LeftAlign() { return "left"; },
    get CenterAlign() { return "center"; },
    get RightAlign() { return "right"; },
    //* Display Modes (Baseline)
    get Bottom() { return "bottom"; },
    get Middle() { return "middle"; },
    get Top() { return "top"; },
}
