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
        * 满屏金币掉落特效
        2019-12-19 andy
        */
        var OutGoldEft = /** @class */ (function (_super) {
            __extends(OutGoldEft, _super);
            function OutGoldEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //圆形水纹
                _this.arrGold = null;
                _this.arrGold = [];
                return _this;
            }
            /**执行一次 */
            OutGoldEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            OutGoldEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                for (var i = 0; i < this.data.count; i++) {
                    var img = new Laya.Image(this.data.imgSkin);
                    this.arrGold.push(img);
                    img.anchorX = img.anchorY = 0.5;
                    this.addChild(img);
                }
            };
            /**窗体关闭 */
            OutGoldEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this);
                Laya.Tween.clearAll(this);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            OutGoldEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                var _loop_1 = function (i) {
                    var img = this_1.arrGold[i];
                    img.visible = true;
                    img.scaleX = img.scaleY = MathUtil.randomRange(this_1.data.minScale, this_1.data.maxScale) / 100;
                    img.x = MathUtil.randomRange(this_1.data.minX, this_1.data.maxX);
                    img.y = MathUtil.randomRange(this_1.data.minY, this_1.data.maxY);
                    var toX = img.x + (Math.random() < 0.5 ? 1 : -1) * this_1.data.dropOffx;
                    Laya.Tween.to(img, { x: toX, y: this_1.data.dropY }, this_1.data.dropTime, Laya.Ease.backIn, Laya.Handler.create(this_1, function () {
                        img.visible = false;
                    }, [img]), i * 5);
                };
                var this_1 = this;
                for (var i = 0; i < this.data.count; i++) {
                    _loop_1(i);
                }
            };
            /**停止特效 */
            OutGoldEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return OutGoldEft;
        }(effect.BaseEffect));
        effect.OutGoldEft = OutGoldEft;
        /*
        * 喷金币数据
        2020-01-10 andy
        */
        var OutGoldData = /** @class */ (function (_super) {
            __extends(OutGoldData, _super);
            function OutGoldData(imgSkin, count) {
                var _this = _super.call(this) || this;
                /**金币皮肤*/
                _this.imgSkin = "";
                /**产生数量*/
                _this.count = 0;
                /**产生最小X*/
                _this.minX = 0;
                /**产生最大X*/
                _this.maxX = 0;
                /**产生最小Y*/
                _this.minY = 0;
                /**产生最大Y*/
                _this.maxY = 0;
                /**掉下X偏移*/
                _this.dropOffx = 0;
                /**掉下Y*/
                _this.dropY = 0;
                /**掉下时间 默认500毫秒*/
                _this.dropTime = 500;
                /**最小缩放 范围1-100*/
                _this.minScale = 50;
                /**最大缩放 范围1-100*/
                _this.maxScale = 100;
                _this.imgSkin = imgSkin;
                _this.count = count;
                _this.maxX = game.Define.DeviceW;
                _this.maxY = game.Define.DeviceH >> 1;
                _this.dropY = game.Define.DeviceH;
                return _this;
            }
            return OutGoldData;
        }(effect.BaseEffectData));
        effect.OutGoldData = OutGoldData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
