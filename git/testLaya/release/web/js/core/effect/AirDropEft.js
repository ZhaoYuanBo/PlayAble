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
        * 空投掉落特效
        2020-01-03 andy
        */
        var AirDropEft = /** @class */ (function (_super) {
            __extends(AirDropEft, _super);
            function AirDropEft(isScene) {
                return _super.call(this, isScene) || this;
            }
            /**执行一次 */
            AirDropEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param data BaseEffectData
             */
            AirDropEft.prototype.setData = function (data) {
                _super.prototype.setData.call(this, data);
                this.data = data;
                if (this.data.shadowSkin) {
                    this.imgShadow = new Laya.Image(this.data.shadowSkin);
                    this.imgShadow.anchorX = this.imgShadow.anchorY = 0.5;
                    this.imgShadow.visible = false;
                    this.addChild(this.imgShadow);
                }
                if (this.data.parachuteSkin) {
                    this.imgParachute = new Laya.Image(this.data.parachuteSkin);
                    this.imgParachute.anchorX = this.imgParachute.anchorY = 0.5;
                    this.imgParachute.visible = false;
                    this.addChild(this.imgParachute);
                }
                if (this.data.planSkin) {
                    this.imgPlane = new Laya.Image(this.data.planSkin);
                    this.imgPlane.anchorX = this.imgPlane.anchorY = 0.5;
                    this.imgPlane.rotation = this.data.planeRotate;
                    this.imgPlane.visible = false;
                    this.addChild(this.imgPlane);
                }
                if (this.data.dropBoxSkin) {
                    this.imgDropBox = new Laya.Image(this.data.dropBoxSkin);
                    this.imgDropBox.anchorX = this.imgDropBox.anchorY = 0.5;
                    this.imgDropBox.visible = false;
                    this.addChild(this.imgDropBox);
                }
            };
            /**窗体关闭 */
            AirDropEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.imgPlane);
                Laya.Tween.clearAll(this.imgParachute);
                Laya.Tween.clearAll(this.imgShadow);
                Laya.Tween.clearAll(this.imgDropBox);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            AirDropEft.prototype.play = function (parent) {
                var _this = this;
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                if (this.imgPlane) {
                    this.imgPlane.x = this.data.planeStartPoint.x;
                    this.imgPlane.y = this.data.planeStartPoint.y;
                    this.imgPlane.visible = true;
                    Laya.Tween.to(this.imgPlane, { x: this.data.planeEndPoint.x, y: this.data.planeEndPoint.y }, this.data.planeFlyTime, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                        _this.imgPlane.visible = false;
                    }));
                }
                if (this.imgDropBox) {
                    this.imgDropBox.visible = false;
                }
                Laya.timer.once(this.data.parachuteDelayTime, this, function () {
                    _this.imgParachute.x = _this.data.parachuteStartPoint.x;
                    _this.imgParachute.y = _this.data.parachuteStartPoint.y;
                    _this.imgParachute.scaleX = _this.imgParachute.scaleY = _this.data.parachuteStartScale;
                    _this.imgParachute.visible = true;
                    Laya.Tween.to(_this.imgParachute, { x: _this.data.parachuteEndPoint.x, y: _this.data.parachuteEndPoint.y, scaleX: _this.data.parachuteEndScale, scaleY: _this.data.parachuteEndScale }, _this.data.parachuteFlyTime, Laya.Ease.linearIn, Laya.Handler.create(_this, function () {
                        _this.imgParachute.visible = false;
                        EventManager.ins.event(NoticeEvent.EFT_AIR_DROP_OVER);
                        //显示宝箱
                        if (_this.imgDropBox) {
                            _this.imgDropBox.x = _this.data.parachuteEndPoint.x;
                            _this.imgDropBox.y = _this.data.parachuteEndPoint.y;
                            _this.imgDropBox.visible = true;
                        }
                    }));
                    _this.imgShadow.x = _this.data.shadowStartPoint.x;
                    _this.imgShadow.y = _this.data.shadowStartPoint.y;
                    _this.imgShadow.scaleX = _this.imgShadow.scaleY = _this.data.shadowStartScale;
                    _this.imgShadow.visible = true;
                    Laya.Tween.to(_this.imgShadow, { x: _this.data.parachuteEndPoint.x, y: _this.data.parachuteEndPoint.y, scaleX: _this.data.shadowEndScale, scaleY: _this.data.shadowEndScale }, _this.data.parachuteFlyTime, Laya.Ease.linearIn, Laya.Handler.create(_this, function () {
                        _this.imgShadow.visible = false;
                    }));
                });
            };
            /**停止特效 */
            AirDropEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return AirDropEft;
        }(effect.BaseEffect));
        effect.AirDropEft = AirDropEft;
        /*
        * 空投数据
        2020-01-03 andy
        */
        var AirDropData = /** @class */ (function (_super) {
            __extends(AirDropData, _super);
            /**
             *
             * @param planSkin      飞机皮肤
             * @param parachuteSkin  降落伞皮肤
             * @param shadowSkin     降落伞皮肤
             * @param dropBoxSkin    掉落宝箱皮肤
             */
            function AirDropData(planSkin, parachuteSkin, shadowSkin, dropBoxSkin) {
                var _this = _super.call(this) || this;
                /**飞机飞行时间 默认1000毫秒*/
                _this.planeFlyTime = 1000;
                /**飞机旋转角度 默认0*/
                _this.planeRotate = 0;
                /**降落伞空投延时时间 默认500毫秒*/
                _this.parachuteDelayTime = 500;
                /**降落伞飞行时间 默认1000毫秒*/
                _this.parachuteFlyTime = 1000;
                /**降落伞起始缩放 默认1*/
                _this.parachuteStartScale = 1;
                /**降落伞目标缩放 默认1*/
                _this.parachuteEndScale = 1;
                /**降落伞影子起始缩放 默认1*/
                _this.shadowStartScale = 1;
                /**降落伞影子目标缩放 默认1*/
                _this.shadowEndScale = 1;
                _this.planSkin = planSkin;
                _this.parachuteSkin = parachuteSkin;
                _this.shadowSkin = shadowSkin;
                _this.dropBoxSkin = dropBoxSkin;
                _this.planeStartPoint = new Laya.Point(0, game.Define.DeviceH);
                _this.planeEndPoint = new Laya.Point(game.Define.DeviceW, 0);
                _this.parachuteStartPoint = new Laya.Point(game.Define.DeviceW >> 1, 0);
                _this.parachuteEndPoint = new Laya.Point(game.Define.DeviceW >> 1, game.Define.DeviceH >> 1);
                _this.shadowStartPoint = new Laya.Point(game.Define.DeviceW >> 1, game.Define.DeviceH);
                return _this;
            }
            return AirDropData;
        }(effect.BaseEffectData));
        effect.AirDropData = AirDropData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
