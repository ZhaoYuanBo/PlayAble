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
* 子弹;
*/
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y) {
        var _this = _super.call(this) || this;
        /**速度 */
        _this.speed = 10;
        /**半径 */
        _this.bulletR = 6;
        /**旋转角度 */
        _this.b_Cov = 0;
        /**超出屏幕以外 */
        _this.isFarAway = false;
        /**命中敌方 */
        _this.isHit = false;
        /**发射扣 */
        _this.firePoint = null;
        _this.x = x;
        _this.y = y;
        _this.firePoint = new Laya.Point(_this.x, _this.y);
        return _this;
    }
    Bullet.prototype.bulletInit = function (target, type) {
        if (type === void 0) { type = 1; }
        this.target = target;
        this.bulletImg = new Laya.Image();
        if (type == fBoxType.mine) {
            this.bulletImg.skin = "game/people.png";
        }
        else if (type == fBoxType.other) {
            this.bulletImg.skin = "game/bullet2.png";
        }
        this.bulletImg.anchorX = 0.5;
        this.bulletImg.anchorY = 0.5;
        this.bulletImg.scaleX = this.bulletImg.scaleY = 1;
        this.addChild(this.bulletImg);
    };
    Bullet.prototype.update = function () {
        if (this.visible)
            this.OnLoop();
    };
    /**目标点与本身的偏差*/
    Bullet.prototype.GetCov = function (x, y) {
        if (Math.abs(x) + Math.abs(y) <= 0.01) {
            return 0;
        }
        var roi = Math.atan2(x, y) * 180 / Math.PI;
        return roi;
    };
    /**寻路移动循环 */
    Bullet.prototype.OnLoop = function () {
        var point = this.getFrameTransition((this.target.x + this.target.boxImg.width / 2) - this.x, (this.target.y + this.target.boxImg.height / 2) - this.y, this.speed);
        this.x += point.x;
        this.y += point.y;
        this.bulletImg.rotation = 90 - this.GetCov(this.target.x + this.target.boxImg.width / 2 - this.x, this.target.y + this.target.boxImg.height / 2 - this.y);
        var dis = MathUtil.getDistance(new Laya.Point(this.x, this.y), new Laya.Point(this.target.x + this.target.boxImg.width / 2, this.target.y + this.target.boxImg.height / 2));
        if (dis <= 50) {
            // this.target.wound(num);
            this.visible = false;
            this.isHit = true;
            this.target.would(1);
        }
    };
    /**
     * 返回每一帧的偏差值
     * @param deltaX
     * @param deltaY
     * @param speed
     */
    Bullet.prototype.getFrameTransition = function (deltaX, deltaY, speed) {
        var x;
        var y;
        var num = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        x = (speed / num) * deltaX;
        y = (speed / num) * deltaY;
        return new Laya.Point(x, y);
    };
    Bullet.prototype.disappear = function () {
        this.removeSelf();
        this.destroy();
    };
    return Bullet;
}(Laya.Sprite));
//# sourceMappingURL=Bullet.js.map