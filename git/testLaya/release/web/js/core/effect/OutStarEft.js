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
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 喷出星星特效
        2020-08-11 andy
        */
        var OutStarEft = /** @class */ (function (_super) {
            __extends(OutStarEft, _super);
            function OutStarEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //星星数组
                _this.arrStar = null;
                _this.arrStar = [];
                return _this;
            }
            /**执行一次 */
            OutStarEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            OutStarEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                for (var i = 0; i < this.data.count; i++) {
                    var img = new Laya.Image(this.data.imgSkin);
                    this.arrStar.push(img);
                    img.anchorX = img.anchorY = 0.5;
                    this.addChild(img);
                }
            };
            /**窗体关闭 */
            OutStarEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this);
                Laya.Tween.clearAll(this);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            OutStarEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                var radis = 0;
                var showCount = this.data.count;
                var _loop_1 = function (i) {
                    var img = this_1.arrStar[i];
                    img.visible = true;
                    img.scaleX = img.scaleY = this_1.data.minScale;
                    var radian = MathUtil.angleToRadian((360 / showCount) * i);
                    img.x = Math.cos(radian) * this_1.data.minRadis;
                    img.y = Math.sin(radian) * this_1.data.minRadis;
                    var toX = 0;
                    var toY = 0;
                    if (this_1.data.isRandRadis) {
                        var randRadis = MathUtil.randomRange(this_1.data.minRadis, this_1.data.maxRadis);
                        toX = Math.cos(radian) * randRadis;
                        toY = Math.cos(radian) * randRadis;
                    }
                    else {
                        toX = Math.cos(radian) * this_1.data.maxRadis;
                        toY = Math.sin(radian) * this_1.data.maxRadis;
                    }
                    Laya.Tween.to(img, { x: toX, y: toY, alpha: 0, rotation: this_1.data.rotation, scaleX: this_1.data.maxScale, scaleY: this_1.data.maxScale }, this_1.data.flyTime, Laya.Ease.backIn, Laya.Handler.create(this_1, function () {
                        img.visible = false;
                    }, [img]), i * 5);
                };
                var this_1 = this;
                for (var i = 0; i < showCount; i++) {
                    _loop_1(i);
                }
            };
            /**停止特效 */
            OutStarEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return OutStarEft;
        }(effect.BaseEffect));
        effect.OutStarEft = OutStarEft;
        /*
        * 喷出星星数据
        2020-08-11 andy
        */
        var OutStarData = /** @class */ (function (_super) {
            __extends(OutStarData, _super);
            function OutStarData(imgSkin, count) {
                var _this = _super.call(this) || this;
                /**金币皮肤*/
                _this.imgSkin = "";
                /**产生数量 默认8个*/
                _this.count = 8;
                /**产生最小半径*/
                _this.minRadis = 0;
                /**产生最大半径 默认100*/
                _this.maxRadis = 100;
                /**是否随机半径*/
                _this.isRandRadis = false;
                /**旋转度数*/
                _this.rotation = 0;
                /**飞行时间 默认500毫秒*/
                _this.flyTime = 500;
                /**最小缩放 范围1*/
                _this.minScale = 1;
                /**最大缩放 范围1*/
                _this.maxScale = 1;
                _this.imgSkin = imgSkin;
                _this.count = count;
                return _this;
            }
            return OutStarData;
        }(effect.BaseEffectData));
        effect.OutStarData = OutStarData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
