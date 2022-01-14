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
* 鱼类
*/
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        var _this = _super.call(this) || this;
        _this.isCatch = false;
        _this.isDead = false;
        _this.speed = 2;
        _this.lastTime = 0;
        _this.fishPay = 0;
        _this.fishImg = new Laya.Image();
        _this.fishIdText = new Laya.Text();
        _this.fishImg.anchorY = 0.5;
        _this.fishImg.anchorX = 0.3;
        _this.addChild(_this.fishImg);
        return _this;
        // this.addChild(this.fishIdText);
    }
    Fish.prototype.init = function (id) {
        this.isDead = false;
        this.width = 150, this.height = 120;
        this.fishIdText.fontSize = 80;
        this.fishImg.skin = "king/" + this.kingType + ".png";
        this.speed = MathUtil.randomRange(1, 3);
        this.fishIdText.text = this.kingType;
        if (id > 100 && id < 105) {
            this.fishPay = (id - 100) * 500;
        }
        else {
            this.fishPay = 10;
        }
        LayerManager.ins.addChild(this, LayerName.scene_map);
    };
    Fish.prototype.setSkin = function (kt) {
        this.kingType = kt;
        this.fishImg.skin = "king/" + this.kingType + ".png";
    };
    Fish.prototype.setActionType = function (v) {
        this.curAticonType = v;
    };
    /**
     *
     */
    Fish.prototype.update = function () {
        if (this.isDead) {
            return;
        }
        if (this.isCatch) {
            if (Laya.timer.currTimer - this.lastTime >= 100) {
                this.lastTime = Laya.timer.currTimer;
                var randR = MathUtil.randomRange(0, 180);
                this.fishImg.rotation = randR;
            }
            return;
        }
        // this.checkPosition();
    };
    /**
     * 被抓到了
     */
    Fish.prototype.catch = function () {
        SoundManager.ins.vibration(50);
        this.isCatch = true;
        this.fishImg.skewY = 10;
        var randCount = MathUtil.randomRange(0, 1);
        var globalPos = this.fishImg.localToGlobal(new Laya.Point(0, this.fishImg.height >> 1));
        TipManager.ins.showWord("+$" + this.fishPay, globalPos.x, globalPos.y + 120, 150, 70, "#fee238");
    };
    /**
     * 死亡
     */
    Fish.prototype.dead = function () {
        this.isCatch = false;
        this.isDead = true;
        this.deadEffect();
    };
    Fish.prototype.deadEffect = function () {
        var _this = this;
        this.x = 300;
        this.y = 600;
        this.fishImg.rotation = 90;
        var randX = MathUtil.randomRange(0, 50);
        var randY = MathUtil.randomRange(200, 350);
        Laya.Tween.to(this, { x: this.x + randX, y: this.y - randY, alpha: 0.5 }, 400, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
            _this.removeSelf();
            var randCount = MathUtil.randomRange(0, 1);
            // TipManager.ins.showWord(randCount==0?"+5":"+10",0,350,-120,60,"#ffffff");
            GameModel.ins.addScore(_this.fishPay);
        }));
        this.visible = true;
    };
    return Fish;
}(Laya.Sprite));
//# sourceMappingURL=Fish.js.map