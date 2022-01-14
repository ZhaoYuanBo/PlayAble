var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
        _this.fishImg = new Laya.Image();
        _this.fishImg.anchorY = 0.5;
        _this.addChild(_this.fishImg);
        return _this;
    }
    Fish.prototype.init = function () {
        this.isDead = false;
        this.width = 150, this.height = 100;
        this.fishImg.skin = "king/" + this.kingType + ".png";
        LayerManager.ins.addChild(this, LayerName.scene_map);
    };
    Fish.prototype.setActionType = function (v) {
        this.curAticonType = v;
        if (this.curAticonType == ActionType.Left) {
            this.fishImg.skewY = 0;
        }
        else {
            this.fishImg.skewY = 180;
        }
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
        if (this.curAticonType == ActionType.Left) {
            if (this.x - this.speed > 0) {
                this.pos(this.x - this.speed, this.y);
            }
            else {
                this.setActionType(ActionType.Right);
            }
        }
        else if (this.curAticonType == ActionType.Right) {
            if (this.x + this.speed + this.width < Define.DeviceW) {
                this.pos(this.x + this.speed, this.y);
            }
            else {
                this.setActionType(ActionType.Left);
            }
        }
        else {
            console.log("没有方向");
        }
        //this.checkPosition();
    };
    /**
     * 被抓到了
     */
    Fish.prototype.catch = function () {
        this.isCatch = true;
        this.fishImg.skewY = 0;
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
            TipManager.ins.showWord(randCount == 0 ? "+5" : "+10", 350, -120, 60, "#ffffff");
        }));
        this.visible = true;
    };
    return Fish;
}(Laya.Sprite));
