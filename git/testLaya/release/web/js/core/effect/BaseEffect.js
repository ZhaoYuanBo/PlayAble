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
        var BaseUI = game.display.BaseUI;
        /*
        * 特效基类
        2019-07-17 andy
        */
        var BaseEffect = /** @class */ (function (_super) {
            __extends(BaseEffect, _super);
            function BaseEffect(isScene) {
                var _this = _super.call(this) || this;
                /**是否正在播放特效 */
                _this.isPlaying = false;
                return _this;
            }
            /**执行一次 */
            BaseEffect.prototype.init = function () {
            };
            /**窗体打开 */
            BaseEffect.prototype.open = function () {
                _super.prototype.open.call(this);
            };
            /**窗体关闭 */
            BaseEffect.prototype.close = function () {
                _super.prototype.close.call(this);
                this.isPlaying = false;
                Laya.Tween.clearAll(this);
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            BaseEffect.prototype.setData = function (effectData) {
                this.effectData = effectData;
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            BaseEffect.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                if (this.isPlaying) {
                    return;
                }
                if (!this.parent) {
                    if (parent instanceof Laya.Sprite) {
                        parent.addChild(this);
                    }
                    else {
                        effect.EffectManager.ins.addEffect(this, parent ? parent : LayerName.ui_effect);
                    }
                }
                this.isPlaying = true;
            };
            /**停止特效 */
            BaseEffect.prototype.stop = function () {
                this.removeSelf();
            };
            BaseEffect.prototype.lineMove = function (line, from, to, time1, time2, delayTime) {
                var _this = this;
                if (delayTime === void 0) { delayTime = 0; }
                line.x = from;
                Laya.Tween.to(line, { x: to }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(line, { x: from }, time2, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearAll(line);
                    }));
                }), delayTime);
            };
            return BaseEffect;
        }(BaseUI));
        effect.BaseEffect = BaseEffect;
        /*
        * 特效基类数据
        2020-01-03 andy
        */
        var BaseEffectData = /** @class */ (function () {
            function BaseEffectData() {
            }
            return BaseEffectData;
        }());
        effect.BaseEffectData = BaseEffectData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
