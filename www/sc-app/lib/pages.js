"use strict";

page_base.myPages_InitDom = function () {
  Dom.IP = '192.168.1.69';
  Dom.PORT = 34123;
  Dom.DATAFILE = 'sc-app.json';
};

page_base.myPages_InitCust = function () {
  Cust.D_AnalogAlpha = 0.95;
  Cust.D_SliderAlpha = 0.7;
  Cust.D_SliderHandleWidth_px = 5;
  Cust.DisplayPerSec = 0.5;
};

page_base.myPages_InitPages = function () {
  this.page_1_obj = new Page_proto_obj("Test Page 1", 'images/page_1.png', [new Target("my1", 100, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F2, Item.KModRCtrl, 0, 0)), new Target("my2", 100, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 3, Item.KModNone, 0, 0)), new Target("my3", 200, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.Y, Item.KModNone, 0, 0)), new Target("my4", 300, 100, 90, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.Z, Item.KModNone, 0, 0)), new Target("tg1", 100, 500, 90, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.V, Item.KModNone, 1, 0)), new Target("tg2", 200, 500, 90, 0, Item.ModeTog, new Cmd(Item.TypeButton, 4, Item.KModNone, 1, 0)), new Target("tg3", 300, 500, 90, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.W, Item.KModNone, 0, 0)), new Target("tg4", 400, 500, 90, 0, Item.ModeTog, new Cmd(Item.TypeButton, 5, Item.KModNone, 0, 0)), new Target("tg5", 400, 350, 85, 0, Item.ModeBiTogUD, new Cmd(Item.TypeButton, 6, Item.KModNone, 0, 0)), new Target("tg6", 250, 250, 95, 95, Item.ModeBiTogUD, new Cmd(Item.TypeButton, 7, Item.KModNone, 0, 0)), new Target("tg7", 400, 250, 100, 0, Item.ModeBiTogUD, new Cmd(Item.TypeButton, 8, Item.KModNone, 0, 0)), new Target("tg8", 250, 350, 100, 70, Item.ModeBiTogLR, new Cmd(Item.TypeButton, 9, Item.KModNone, 0, 0)), new Target("ax0", 1250, 100, 90, 0, Item.ModeVal, new Cmd(Item.TypeXaxis, 1000, Item.KModNone, 0, 0)), new Target("ax1", 1250, 200, 90, 0, Item.ModeVal, new Cmd(Item.TypeXaxis, 750, Item.KModNone, 0, 0)), new Target("ax2", 1250, 300, 90, 0, Item.ModeVal, new Cmd(Item.TypeXaxis, 500, Item.KModNone, 0, 0)), new Target("ax3", 1250, 400, 90, 0, Item.ModeVal, new Cmd(Item.TypeXaxis, 250, Item.KModNone, 0, 0)), new Target("ax4", 1250, 500, 90, 0, Item.ModeVal, new Cmd(Item.TypeXaxis, 0, Item.KModNone, 0, 0)), new Target("al1", 1150, 300, 100, 500, Item.ModeAnalog, new Cmd(Item.TypeXaxis, 500, Item.KModNone, 0, 0)), new Target("sl1", 850, 650, 500, 94, Item.ModeSlider, new Cmd(Item.TypeYaxis, 250, Item.KModNone, 0, 0))], [new Display("dItm1", 700, 400, 190, 90, Disp.ModeTxt, Disp.CenterAlign, Disp.Middle, Cust.Font16, Cust.D_Yellow, "section1", "item1"), new Display("dItm2", 650, 300, 100, 50, Disp.ModeTxt, Disp.CenterAlign, Disp.Middle, Cust.Font16m, Cust.D_Red, "section1", "item2"), new Display("dItm3", 800, 300, 100, 50, Disp.ModeTxt, Disp.CenterAlign, Disp.Middle, Cust.Font24m, Cust.D_Blue, "section2", "item44"), new Display("dItm11", 100, 600, 50, 0, Disp.ModeTog, Gen.Dummy, Gen.Dummy, Gen.Dummy, 1, "section3", "tog1"), new Display("dItm12", 300, 600, 50, 0, Disp.ModeTog, Gen.Dummy, Gen.Dummy, Gen.Dummy, 0, "section3", "tog1"), new Display("dItm21", 100, 700, 85, 0, Disp.ModeBiTogLR, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "tog1"), new Display("dItm22", 300, 700, 95, 95, Disp.ModeBiTogUD, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "tog2"), new Display("dItm14", 1000, 200, 70, 0, Disp.ModeSig, Gen.Dummy, Gen.Dummy, Gen.Dummy, Cust.D_Green, "section3", "sig1"), new Display("dItm15", 500, 350, 40, 300, Disp.ModeAnalog, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "alog1"), new Display("dItm16", 547, 350, 20, 300, Disp.ModeAnalog, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "alog2"), new Display("dItm17", 750, 100, 500, 50, Disp.ModeSlider, Gen.Dummy, Gen.Dummy, Gen.Dummy, Gen.Dummy, "section3", "sli1")]);
  this.page_2_obj = new Page_proto_obj("Power", 'images/page_2.png', [new Target("maxP", 100, 150, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModRCtrl, 0, 0)), new Target("incP", 100, 350, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD4, Item.KModRCtrl, 0, 0)), new Target("decP", 100, 450, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD1, Item.KModRCtrl, 0, 0)), new Target("minP", 100, 650, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD0, Item.KModRCtrl, 0, 0)), new Target("fW", 350, 200, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D1, Item.KModRCtrl, 0, 0)), new Target("fP", 650, 200, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D2, Item.KModRCtrl, 0, 0)), new Target("fS", 500, 500, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D3, Item.KModRCtrl, 0, 0)), new Target("fR", 350, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D4, Item.KModRCtrl, 0, 0)), new Target("shRS", 800, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD5, Item.KModNone, 0, 0)), new Target("shTp", 1000, 150, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD9, Item.KModNone, 0, 0)), new Target("shFr", 1000, 250, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD8, Item.KModNone, 0, 0)), new Target("shLe", 800, 400, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD4, Item.KModNone, 0, 0)), new Target("shRi", 1200, 400, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD6, Item.KModNone, 0, 0)), new Target("shBk", 1000, 550, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD2, Item.KModNone, 0, 0)), new Target("shBt", 1000, 650, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModNone, 0, 0))], []);
  this.page_3_obj = new Page_proto_obj("Exploring", 'images/page_3.png', [new Target("mog", 100, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F1, Item.KModNone, 0, 0)), new Target("qds", 100, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.B, Item.KModNone, 0, 0)), new Target("qde", 100, 500, 120, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.B, Item.KModLCtrl, 0, 0)), new Target("hli", 400, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.T, Item.KModLAlt, 0, 0)), new Target("lbe", 400, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.Y, Item.KModLAlt, 0, 0)), new Target("togSc", 700, 100, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.S, Item.KModLCtrl, 0, 0)), new Target("togMi", 900, 100, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.M, Item.KModNone, 0, 0)), new Target("decSA", 700, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 36, Item.KModNone, 0, 0)), new Target("incSA", 900, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeButton, 34, Item.KModNone, 0, 0)), new Target("ping", 800, 500, 120, 0, Item.ModePR, new Cmd(Item.TypeButton, 35, Item.KModNone, 0, 0)), new Target("cstab", 1100, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.S, Item.KModLAlt, 0, 0)), new Target("gforc", 1200, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.G, Item.KModLAlt, 0, 0)), new Target("esp", 1200, 300, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.E, Item.KModLAlt, 0, 0)), new Target("bcid", 1100, 300, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.PERIOD, Item.KModNone, 0, 0)), new Target("rrang", 1100, 500, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.COMMA, Item.KModNone, 0, 0))], []);
  this.page_4_obj = new Page_proto_obj("Planetside", 'images/page_4.png', [new Target("togLS", 200, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.N, Item.KModNone, 1, 0)), new Target("Aland", 200, 300, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.N, Item.KModLCtrl, 0, 0)), new Target("togCL", 200, 500, 70, 0, Item.ModeTog, new Cmd(Item.TypeKey, VK.F11, Item.KModNone, 0, 0)), new Target("hli", 400, 100, 80, 75, Item.ModeTog, new Cmd(Item.TypeKey, VK.T, Item.KModLAlt, 0, 0)), new Target("rrang", 500, 500, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.COMMA, Item.KModNone, 0, 0)), new Target("clsD", 800, 100, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F8, Item.KModNone, 0, 0)), new Target("lckD", 800, 200, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F8, Item.KModRCtrl, 0, 0)), new Target("ulckD", 1100, 200, 90, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F7, Item.KModRCtrl, 0, 0)), new Target("fRdy", 800, 400, 120, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.F5, Item.KModNone, 0, 0))], []);
  this.page_5_obj = new Page_proto_obj("Emergency", 'images/page_5.png', [new Target("clsD", 100, 450, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F8, Item.KModNone, 0, 0)), new Target("lckD", 100, 550, 80, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F8, Item.KModRCtrl, 0, 0)), new Target("fRdy", 400, 500, 150, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.F5, Item.KModNone, 0, 0)), new Target("togW", 100, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D1, Item.KModRAlt, 0, 0)), new Target("togS", 300, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D2, Item.KModRAlt, 0, 0)), new Target("togE", 500, 100, 95, 80, Item.ModeTog, new Cmd(Item.TypeKey, VK.D3, Item.KModRAlt, 0, 0)), new Target("togP", 900, 100, 85, 0, Item.ModeTap, new Cmd(Item.TypeKey, VK.D4, Item.KModRAlt, 0, 0)), new Target("minP", 1000, 450, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD0, Item.KModRCtrl, 0, 0)), new Target("maxP", 800, 350, 80, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.NUMPAD7, Item.KModRCtrl, 0, 0)), new Target("slfD", 1250, 100, 130, 85, Item.ModePR, new Cmd(Item.TypeKey, VK.BACKSPACE, Item.KModRAlt, 0, 0)), new Target("eject", 1250, 350, 70, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.L, Item.KModRAlt, 0, 0)), new Target("respawn", 1250, 550, 70, 0, Item.ModePR, new Cmd(Item.TypeKey, VK.X, Item.KModNone, 0, 0))], []);
};

page_base.myPages_InitMacros = function () {
  var mac = null;
  mac = new Macro("m_CfgFPwr", [new Cmd(Item.TypeRXaxis, Cust.A_Scale, Gen.Dummy, 0, 0), new Cmd(Item.TypeRYaxis, Cust.A_Scale, Gen.Dummy, 0, 0)]);
  Macro.AddMacro(mac);
};