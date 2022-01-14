var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 拖动层;
*/
var MyTouchRect = /** @class */ (function () {
    function MyTouchRect(x, y, w, h) {
        this.m_nPosX = 0;
        this.m_nPosY = 0;
        this.m_nWidth = 0;
        this.m_nHeight = 0;
        this.m_nPosX = x;
        this.m_nPosY = y;
        this.m_nWidth = w;
        this.m_nHeight = h;
    }
    MyTouchRect.prototype.CheckTouch = function (x, y) {
        if (x < this.m_nPosX || x > this.m_nPosX + this.m_nWidth)
            return false;
        if (y < this.m_nPosY || y > this.m_nPosY + this.m_nHeight)
            return false;
        return true;
    };
    return MyTouchRect;
}());
var GunObj = /** @class */ (function (_super) {
    __extends(GunObj, _super);
    function GunObj(pos) {
        var _this = _super.call(this) || this;
        _this.pTouchRect = null;
        _this.id = 0;
        _this.mPos = 0;
        _this.isTmp = false;
        _this.mPos = pos;
        _this.gunImg = new Laya.Image();
        _this.lv = new Laya.Text();
        _this.width = _this.height = 180;
        _this.gunImg.scale(1.3, 1.3);
        _this.gunImg.rotation = 45;
        _this.gunImg.x = 35;
        _this.gunImg.y = -30;
        _this.lv.color = "#00000";
        _this.lv.bold = true;
        _this.lv.fontSize = 30;
        _this.lv.y = _this.height - 45;
        _this.lv.x = 10;
        //db
        _this.gunDb = new Laya.Image();
        _this.gunDb.skin = "game/Db_lv.png";
        _this.gunDb.x = -10;
        _this.gunDb.y = _this.height - 45;
        _this.addChild(_this.gunDb);
        _this.addChild(_this.gunImg);
        _this.addChild(_this.lv);
        return _this;
    }
    GunObj.prototype.init = function (id) {
        var _this = this;
        this.id = id;
        this.lv.text = (id - 100).toString();
        this.pBase = ConfigData.ins.gunCfg[id];
        this.gunImg.skin = this.pBase.skin;
        Laya.timer.clearAll(this);
        Laya.timer.loop(2000, this, function () {
            if (_this.isTmp) {
                return;
            }
            var txt = new Laya.Text();
            txt.pivotX = 0.5;
            txt.color = "#f8e072";
            txt.fontSize = 30;
            txt.x = _this.gunImg.width >> 1;
            txt.y = 0;
            txt.text = "+" + _this.pBase.upGod;
            // this.addChild(txt);
            Laya.Tween.to(txt, { y: txt.y - 80, alpha: 0.1 }, 1000, null, Laya.Handler.create(txt, function () {
                txt.text = "";
                GameCtrl.ins.addScore(_this.pBase.upGod);
            }));
        });
    };
    GunObj.prototype.update = function () {
    };
    return GunObj;
}(Laya.Sprite));
//# sourceMappingURL=MyTouchRect.js.map