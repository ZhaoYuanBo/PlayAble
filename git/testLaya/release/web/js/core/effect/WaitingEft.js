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
        * 等待特效
        2020-05-21 andy
        */
        var WaitingEft = /** @class */ (function (_super) {
            __extends(WaitingEft, _super);
            function WaitingEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //旋转图片
                _this.arrImg = null;
                //缩放计时器
                _this.zoomTimer = 0;
                //图片数量
                _this.count = 0;
                _this.radis = 0;
                _this.angle = 0;
                _this.arrImg = [];
                return _this;
            }
            /**执行一次 */
            WaitingEft.prototype.init = function () {
                Laya.timer.loop(1, this, this.update);
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            WaitingEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                this.count = this.data.arrNumber.length >> 1;
                var radis = 0;
                var angle = 0;
                var arr;
                for (var i = 0; i < this.count; i++) {
                    radis = this.data.arrNumber[i * 2];
                    angle = this.data.arrNumber[i * 2 + 1];
                    var img = new Laya.Image(this.data.skin + (i % this.data.skinCount + 1) + ".png");
                    this.arrImg.push(img);
                    img.anchorX = img.anchorY = 0.5;
                    arr = this.getPosByAngle(radis, angle);
                    img.x = arr[0];
                    img.y = arr[1];
                    this.addChild(img);
                }
            };
            /**窗体关闭 */
            WaitingEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this);
                Laya.Tween.clearAll(this);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            WaitingEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
            };
            /**停止特效 */
            WaitingEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            WaitingEft.prototype.update = function () {
                var _this = this;
                if (this.isPlaying) {
                    if (this.isZoom) {
                    }
                    else {
                        this.zoomTimer++;
                        if (this.zoomTimer >= this.data.zoomTime) {
                            this.isZoom = true;
                            this.zoomTimer = 0;
                        }
                        var arr_1;
                        for (var i = 0; i < this.count; i++) {
                            arr_1 = this.addRotation(i, this.data.rotationSpeed);
                            var img = this.arrImg[i];
                            img.x = arr_1[0];
                            img.y = arr_1[1];
                            if (this.isZoom) {
                                Laya.Tween.to(img, { x: 0, y: 0, scaleX: 0.5, scaleY: 0.5 }, this.data.zoomSpeed, null, Laya.Handler.create(this, function (img) {
                                    var index = _this.arrImg.indexOf(img);
                                    arr_1 = _this.addRotation(index, 90);
                                    Laya.Tween.to(img, { x: arr_1[0], y: arr_1[1], scaleX: 1, scaleY: 1 }, _this.data.zoomSpeed, null, Laya.Handler.create(_this, function (index) {
                                        if (index + 1 == _this.count) {
                                            _this.isZoom = false;
                                        }
                                    }, [index]));
                                }, [img]), i * 5);
                            }
                        }
                    }
                }
            };
            WaitingEft.prototype.addRotation = function (index, rotation) {
                var radis = this.data.arrNumber[index * 2];
                var angle = this.data.arrNumber[index * 2 + 1];
                angle += rotation;
                this.data.arrNumber[index * 2 + 1] = angle;
                return this.getPosByAngle(radis, angle);
            };
            WaitingEft.prototype.getPosByAngle = function (radis, angle) {
                //计算弧度
                var radian = MathUtil.angleToRadian(angle);
                var x = Math.cos(radian) * radis;
                var y = Math.sin(radian) * radis;
                return [x, y];
            };
            return WaitingEft;
        }(effect.BaseEffect));
        effect.WaitingEft = WaitingEft;
        /*
        * 等待加载数据
        2020-05-21 andy
        */
        var WaitingData = /** @class */ (function (_super) {
            __extends(WaitingData, _super);
            function WaitingData(skin, skinCount, rotationSpeed, zoomSpeed, zoomTime) {
                if (skinCount === void 0) { skinCount = 1; }
                if (rotationSpeed === void 0) { rotationSpeed = 1; }
                if (zoomSpeed === void 0) { zoomSpeed = 200; }
                if (zoomTime === void 0) { zoomTime = 1000; }
                var _this = _super.call(this) || this;
                /** 皮肤 */
                _this.skin = "";
                /** 皮肤数量 */
                _this.skinCount = 0;
                /**旋转速度 */
                _this.rotationSpeed = 0;
                /**缩放速度,单位毫秒，默认200 */
                _this.zoomSpeed = 0;
                /**缩放周期,单位毫秒，默认1000 */
                _this.zoomTime = 0;
                _this.skin = skin;
                _this.skinCount = skinCount;
                _this.rotationSpeed = rotationSpeed;
                _this.zoomSpeed = zoomSpeed;
                _this.zoomTime = zoomTime;
                return _this;
            }
            return WaitingData;
        }(effect.BaseEffectData));
        effect.WaitingData = WaitingData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
