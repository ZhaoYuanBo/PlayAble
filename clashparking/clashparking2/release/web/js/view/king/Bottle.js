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
* 瓶子;
*/
var Bottle = /** @class */ (function (_super) {
    __extends(Bottle, _super);
    function Bottle() {
        var _this = _super.call(this) || this;
        _this.speed = 2;
        _this.hp = 100;
        _this.isBoom = false;
        _this.bottleCfg = null;
        _this.id = 0;
        _this.bottleImg = new Laya.Image();
        _this.bottleImg.anchorX = 0.5;
        _this.bottleImg.anchorY = 0.5;
        _this.addChild(_this.bottleImg);
        return _this;
    }
    Bottle.prototype.init = function (id) {
        this.width = 150, this.height = 120;
        var randId = MathUtil.randomRange(101, 103);
        this.bottleImg.skin = "king/" + randId + ".png";
        /**碎瓶子特效 */
        // switch (randId) {
        //     case 101:
        //         this.broken = BoneManager.ins.addBone(CustomBase64.bone_broken, false, false);
        //         break;
        //     case 102:
        //         this.broken = BoneManager.ins.addBone(CustomBase64.bone_broken2, false, false);
        //         break;
        //     case 103:
        //         this.broken = BoneManager.ins.addBone(CustomBase64.bone_broken3, false, false);
        //         break;
        //     case undefined:
        //         break;
        // }
        LayerManager.ins.addChild(this, LayerName.scene_map);
        /**绘制血条*/
        this.hpDb = new Laya.Image();
        this.hpDb.skin = "game/hp1.png";
        this.hpImg = new Laya.Image();
        this.hpImg.skin = "game/hp2.png";
        this.hpImg.width = 100, this.hpImg.height = 10;
        this.hpImg.x = -50, this.hpImg.y = this.y - 200;
        this.hpDb.x = this.hpImg.x, this.hpDb.y = this.hpImg.y, this.hpDb.width = 100, this.hpDb.height = 10;
        this.addChild(this.hpDb);
        this.hpImg.anchorX = 0;
        this.addChild(this.hpImg);
        this.hpDb.visible = false;
        this.hpImg.visible = false;
    };
    /**命中 */
    Bottle.prototype.beHit = function (num, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var dh = new Laya.Image();
        dh.skin = "game/gunPoint.png";
        // dh.graphics.drawCircle(this.bottleImg.x+x,this.bottleImg.y-y,15,"#db6f57");
        dh.anchorX = dh.anchorY = 0.5;
        dh.x = this.bottleImg.x + x;
        dh.y = this.bottleImg.y + y + 60;
        this.addChild(dh);
        this.hp -= num;
        this.hpImg.width -= num;
        this.hpDb.visible = true;
        this.hpImg.visible = true;
        TipManager.ins.showWord(num.toString(), this.x, this.y, 80, 50, "#d5d892");
        if (this.hp <= 0) {
            // SoundManager.ins.playSound(CustomBase64.sound_glass);
            // SoundManager.ins.vibration(50);
            this.broken.x = this.x;
            this.broken.y = this.y;
            this.broken.play();
            this.isBoom = true;
            this.visible = false;
        }
    };
    Bottle.prototype.update = function () {
        var gWnd = UIManager.ins.getWindow(CustomWindow.game);
        if (this.isBoom)
            return;
        this.x += this.speed;
    };
    Bottle.prototype.boomEffect = function () {
    };
    return Bottle;
}(Laya.Sprite));
//# sourceMappingURL=Bottle.js.map