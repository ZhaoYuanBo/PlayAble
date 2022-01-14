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
        * 喷泉特效
        2019-07-26 andy
        */
        var FountainEft = /** @class */ (function (_super) {
            __extends(FountainEft, _super);
            function FountainEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                _this.arrImg = [];
                return _this;
            }
            /**执行一次 */
            FountainEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            FountainEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                //单个皮肤，多种皮肤，直接使用arrString
                if (this.data.imgSkin) {
                    this.arrString = [];
                    this.arrString.push(this.data.imgSkin);
                }
            };
            /**窗体打开 */
            FountainEft.prototype.open = function () {
            };
            /**窗体关闭 */
            FountainEft.prototype.close = function () {
                _super.prototype.close.call(this);
                for (var _i = 0, _a = this.arrImg; _i < _a.length; _i++) {
                    var img = _a[_i];
                    Laya.Tween.clearAll(img);
                }
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            FountainEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                Laya.timer.loop(this.data.oneSendTime, this, this.launch);
            };
            FountainEft.prototype.launch = function () {
                var _this = this;
                var randIndex = MathUtil.randomRange(0, this.arrString.length - 1);
                var skin = this.arrString[randIndex];
                var img = this.getImg(skin);
                this.addChild(img);
                //设置初始值
                img.x = MathUtil.randomRange(0, this.data.minX >> 2);
                img.x = MathUtil.randomRange(0, 1) == 0 ? img.x : -img.x;
                img.y = 0;
                img.scaleX = img.scaleY = 0.8;
                img.alpha = 0.6;
                //设置随机值
                var randX = MathUtil.randomRange(this.data.minX, this.data.maxX);
                randX = MathUtil.randomRange(0, 1) == 0 ? randX : -randX;
                var randY = MathUtil.randomRange(this.data.minY, this.data.maxY);
                Laya.Tween.to(img, { y: randY, rotation: this.data.needRotation * 0.4, scaleX: 1, scaleY: 1, alpha: 1 }, this.data.oneShowTime * 0.3, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(img, { x: randX >> 1, y: randY + 50, rotation: _this.data.needRotation * 0.7 }, _this.data.oneShowTime * 0.4, Laya.Ease.cubicIn, Laya.Handler.create(_this, function () {
                        Laya.Tween.to(img, { x: randX, y: 0, rotation: _this.data.needRotation }, _this.data.oneShowTime * 0.3, Laya.Ease.cubicIn, Laya.Handler.create(_this, function () {
                            Laya.Tween.clearAll(img);
                            img.removeSelf();
                        }));
                    }));
                }));
            };
            FountainEft.prototype.getImg = function (skin) {
                var ret = null;
                for (var _i = 0, _a = this.arrImg; _i < _a.length; _i++) {
                    var img = _a[_i];
                    if (img && !img.parent) {
                        ret = img;
                        //console.log("缓存");
                        break;
                    }
                } //console.log("arrImg.length",this.arrImg.length);
                if (!ret) {
                    ret = new Laya.Image();
                    ret.anchorX = ret.anchorY = 0.5;
                    ret.skin = skin;
                    this.arrImg.push(ret);
                }
                return ret;
            };
            /**停止特效 */
            FountainEft.prototype.stop = function () {
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
                _super.prototype.stop.call(this);
            };
            return FountainEft;
        }(effect.BaseEffect));
        effect.FountainEft = FountainEft;
        /*
        * 喷泉数据
        2020-01-10 andy
        */
        var FountainData = /** @class */ (function (_super) {
            __extends(FountainData, _super);
            function FountainData(imgSkin) {
                var _this = _super.call(this) || this;
                /**发射的时间间隔 默认10毫秒*/
                _this.oneSendTime = 10;
                /**飞行的时间间隔 默认200毫秒*/
                _this.oneShowTime = 200;
                /**喷出最小X*/
                _this.minX = 0;
                /**喷出最大X*/
                _this.maxX = 0;
                /**喷出最小Y*/
                _this.minY = 0;
                /**喷出最大Y*/
                _this.maxY = 0;
                /**旋转度数*/
                _this.needRotation = 0;
                _this.imgSkin = imgSkin;
                _this.maxX = game.Define.DeviceW;
                _this.maxY = game.Define.DeviceH;
                return _this;
            }
            return FountainData;
        }(effect.BaseEffectData));
        effect.FountainData = FountainData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
