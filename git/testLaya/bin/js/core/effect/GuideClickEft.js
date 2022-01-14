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
        * 引导点击特效
        2019-07-19 andy
        */
        var GuideClickEft = /** @class */ (function (_super) {
            __extends(GuideClickEft, _super);
            function GuideClickEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //圆形水纹
                _this.imgWater = null;
                //手指
                _this.imgHand = null;
                _this.imgWater = new Laya.Image();
                _this.imgWater.anchorX = _this.imgWater.anchorY = 0.5;
                _this.addChild(_this.imgWater);
                _this.imgHand = new Laya.Image();
                _this.addChild(_this.imgHand);
                return _this;
            }
            /**执行一次 */
            GuideClickEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            GuideClickEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                this.imgWater.alpha = this.data.waterAlphaStart;
                this.imgWater.graphics.clear();
                this.imgWater.graphics.drawCircle(0, 0, this.data.waterRadis, this.data.waterColor);
                this.imgHand.skin = this.data.handSkin;
                if (this.data.handCenter != 0) {
                    this.imgHand.anchorX = this.imgHand.anchorY = 0.5;
                }
            };
            /**窗体关闭 */
            GuideClickEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.imgWater);
                Laya.Tween.clearAll(this.imgHand);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            GuideClickEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                this.big(this.imgWater, this.imgHand);
            };
            GuideClickEft.prototype.big = function (sp, hand) {
                var _this = this;
                if (!this.isPlaying) {
                    return;
                }
                Laya.Tween.to(hand, { scaleX: 0.5, scaleY: 0.5 }, 350, null, Laya.Handler.create(this, function () {
                    Laya.Tween.clearTween(hand);
                    Laya.Tween.to(hand, { scaleX: 1, scaleY: 1 }, 350, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearTween(hand);
                        _this.big(sp, hand);
                    }));
                }));
                Laya.timer.once(200, this, function () {
                    sp.scaleX = 1;
                    sp.scaleY = 1;
                    sp.alpha = _this.data.waterAlphaStart;
                    Laya.Tween.to(sp, { scaleX: _this.data.waterRadisRate, scaleY: _this.data.waterRadisRate, alpha: _this.data.waterAlphaEnd }, 300, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearTween(sp);
                    }));
                });
            };
            /**停止特效 */
            GuideClickEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return GuideClickEft;
        }(effect.BaseEffect));
        effect.GuideClickEft = GuideClickEft;
        /*
        * Boss来袭数据
        2020-01-10 andy
        */
        var GuideClickData = /** @class */ (function (_super) {
            __extends(GuideClickData, _super);
            function GuideClickData(handSkin) {
                var _this = _super.call(this) || this;
                /**手型皮肤*/
                _this.handSkin = "";
                /**手型是否剧中 默认0 不居中*/
                _this.handCenter = 0;
                /**水纹半径 */
                _this.waterRadis = 50;
                /**水纹半径放大比例*/
                _this.waterRadisRate = 2;
                /**水纹透明度开始值，默认1*/
                _this.waterAlphaStart = 1;
                /**水纹透明度结束值，默认0*/
                _this.waterAlphaEnd = 0;
                /**水纹颜色*/
                _this.waterColor = "#ffffff";
                _this.handSkin = handSkin;
                return _this;
            }
            return GuideClickData;
        }(effect.BaseEffectData));
        effect.GuideClickData = GuideClickData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
