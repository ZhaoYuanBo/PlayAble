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
        * 图片切换特效
        2019-09-24 andy
        */
        var ChangeImageEft = /** @class */ (function (_super) {
            __extends(ChangeImageEft, _super);
            function ChangeImageEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                /**图片列表*/
                _this.arrImg = null;
                /**图片数量*/
                _this.imgCount = 0;
                //
                _this.curIndex = 0;
                //
                _this.curImg = null;
                return _this;
            }
            /**执行一次 */
            ChangeImageEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            ChangeImageEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                var img = null;
                this.arrImg = [];
                //显示图片
                for (var _i = 0, _a = this.data.arrString; _i < _a.length; _i++) {
                    var skin = _a[_i];
                    img = new Laya.Image();
                    img.anchorX = img.anchorY = 0.5;
                    img.skin = skin;
                    this.addChild(img);
                    this.arrImg.push(img);
                }
                this.imgCount = this.data.arrString.length;
                //显示坐标
                this.x = game.Define.DeviceW >> 1;
                this.y = game.Define.DeviceH >> 1;
                if (this.data.changeTime <= 0)
                    this.data.changeTime = 1000;
            };
            /**窗体关闭 */
            ChangeImageEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.curImg);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            ChangeImageEft.prototype.play = function (parent) {
                var _this = this;
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                if (!this.isPlaying) {
                    return;
                }
                Laya.timer.loop(this.data.changeTime, this, function () {
                    _this.curIndex++;
                    if (_this.curIndex >= _this.imgCount) {
                        _this.curIndex = 0;
                    }
                    var img;
                    for (var i = 0; i < _this.imgCount; i++) {
                        img = _this.arrImg[i];
                        img.visible = i == _this.curIndex;
                        if (img.visible) {
                            _this.curImg = img;
                        }
                    }
                    _this.curImg.scaleX = _this.curImg.scaleY = 0.2;
                    Laya.Tween.to(_this.curImg, { scaleX: 1.2, scaleY: 1.2 }, 200, Laya.Ease.linearInOut, Laya.Handler.create(_this, function () {
                        Laya.Tween.to(_this.curImg, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.linearInOut, Laya.Handler.create(_this, function () {
                        }));
                    }));
                });
            };
            /**停止特效 */
            ChangeImageEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return ChangeImageEft;
        }(effect.BaseEffect));
        effect.ChangeImageEft = ChangeImageEft;
        /*
        * 喷泉数据
        2020-01-10 andy
        */
        var ChangeImageData = /** @class */ (function (_super) {
            __extends(ChangeImageData, _super);
            function ChangeImageData() {
                var _this = _super.call(this) || this;
                /**切换时间 单位毫秒,默认1000*/
                _this.changeTime = 1000;
                return _this;
            }
            return ChangeImageData;
        }(effect.BaseEffectData));
        effect.ChangeImageData = ChangeImageData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
