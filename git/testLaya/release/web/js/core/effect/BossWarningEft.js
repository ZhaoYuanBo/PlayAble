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
        * Boss来袭出场特效
        2019-07-17 andy
        */
        var BossWarningEft = /** @class */ (function (_super) {
            __extends(BossWarningEft, _super);
            function BossWarningEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //交叉线1
                _this.imgLine1 = null;
                //交叉线2
                _this.imgLine2 = null;
                //交叉线3
                _this.imgLine3 = null;
                //交叉线4
                _this.imgLine4 = null;
                //交叉线5
                _this.imgLine5 = null;
                //Boss头像
                _this.imgBoss = null;
                //文字
                _this.lblWord = null;
                _this.imgLine1 = new Laya.Image();
                _this.addChild(_this.imgLine1);
                _this.imgLine2 = new Laya.Image();
                _this.addChild(_this.imgLine2);
                _this.imgLine3 = new Laya.Image();
                _this.addChild(_this.imgLine3);
                _this.imgLine4 = new Laya.Image();
                _this.addChild(_this.imgLine4);
                _this.imgLine5 = new Laya.Image();
                _this.addChild(_this.imgLine5);
                _this.imgBoss = new Laya.Image();
                _this.imgBoss.anchorX = 0.5;
                _this.addChild(_this.imgBoss);
                _this.lblWord = new Laya.Label();
                _this.lblWord.anchorX = 0.5;
                _this.lblWord.wordWrap = true;
                //this.lblWord.align = "center";  
                _this.addChild(_this.lblWord);
                return _this;
            }
            /**执行一次 */
            BossWarningEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            BossWarningEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                this.imgLine1.skin = this.data.line1Skin;
                this.imgLine2.skin = this.data.line2Skin;
                this.imgLine3.skin = this.data.line1Skin;
                this.imgLine4.skin = this.data.line2Skin;
                this.imgLine5.skin = this.data.line1Skin;
                this.imgLine1.y = -this.imgLine1.height - this.imgLine2.height - (this.imgLine3.height >> 1);
                this.imgLine2.y = this.imgLine1.y + this.imgLine1.height + this.data.linePadding;
                this.imgLine3.y = this.imgLine2.y + this.imgLine2.height + this.data.linePadding;
                this.imgLine4.y = this.imgLine3.y + this.imgLine3.height + this.data.linePadding;
                this.imgLine5.y = this.imgLine4.y + this.imgLine4.height + this.data.linePadding;
                this.imgBoss.skin = this.data.bossSkin;
                this.imgBoss.y = this.data.bossY;
                this.lblWord.text = this.data.word;
                this.lblWord.y = this.data.wordY;
                this.lblWord.width = this.data.wordW > 0 ? this.data.wordW : this.lblWord.displayWidth;
                this.lblWord.height = this.data.wordH > 0 ? this.data.wordH : this.lblWord.displayHeight;
                this.lblWord.fontSize = this.data.wordSize;
                this.lblWord.color = this.data.wordColor;
                this.lblWord.stroke = this.data.wordStroke;
                this.lblWord.strokeColor = this.data.wordStrokeColor;
            };
            /**窗体打开 */
            BossWarningEft.prototype.open = function () {
            };
            /**窗体关闭 */
            BossWarningEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.imgLine1);
                Laya.Tween.clearAll(this.imgLine2);
                Laya.Tween.clearAll(this.imgLine3);
                Laya.Tween.clearAll(this.imgLine4);
                Laya.Tween.clearAll(this.imgLine5);
                Laya.Tween.clearAll(this.imgBoss);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            BossWarningEft.prototype.play = function (parent) {
                var _this = this;
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                this.imgBoss.x = game.Define.DeviceH;
                Laya.Tween.to(this.imgBoss, { x: halfX }, 700, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(_this.imgBoss, { x: -_this.imgBoss.width }, 200, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearAll(_this.imgBoss);
                        _this.stop();
                    }), 800);
                }));
                if (this.lblWord.text != "") {
                    this.lblWord.x = game.Define.DeviceH;
                    Laya.Tween.to(this.lblWord, { x: halfX }, 700, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(_this.lblWord, { x: -_this.lblWord.width }, 200, null, Laya.Handler.create(_this, function () {
                            Laya.Tween.clearAll(_this.lblWord);
                        }), 800);
                    }));
                }
                var time1 = 600, time2 = 600;
                this.lineMove(this.imgLine1, game.Define.DeviceH, -this.imgLine1.width, time1, time2, 100);
                this.lineMove(this.imgLine2, -this.imgLine2.width, game.Define.DeviceH, time1, time2, 200);
                this.lineMove(this.imgLine3, game.Define.DeviceH, -this.imgLine3.width, time1, time2, 300);
                this.lineMove(this.imgLine4, -this.imgLine4.width, game.Define.DeviceH, time1, time2, 400);
                this.lineMove(this.imgLine5, game.Define.DeviceH, -this.imgLine5.width, time1, time2, 500);
            };
            /**停止特效 */
            BossWarningEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return BossWarningEft;
        }(effect.BaseEffect));
        effect.BossWarningEft = BossWarningEft;
        /*
        * Boss来袭数据
        2020-01-10 andy
        */
        var BossWarningData = /** @class */ (function (_super) {
            __extends(BossWarningData, _super);
            function BossWarningData(bossSkin, line1Skin, line2Skin, word) {
                var _this = _super.call(this) || this;
                /**交叉线皮肤 垂直间距 默认20*/
                _this.linePadding = 20;
                /**Boss皮肤 Y坐标*/
                _this.bossY = 0;
                /**文字 Y坐标*/
                _this.wordY = 0;
                /**文字 宽*/
                _this.wordW = 0;
                /**文字 高*/
                _this.wordH = 0;
                /**文字 大小 默认30*/
                _this.wordSize = 30;
                /**文字 颜色 默认#ffffff*/
                _this.wordColor = "#ffffff";
                /**文字 描边 默认0*/
                _this.wordStroke = 0;
                /**文字 描边颜色 默认#ffffff*/
                _this.wordStrokeColor = "#ffffff";
                _this.bossSkin = bossSkin;
                _this.line1Skin = line1Skin;
                _this.line2Skin = line2Skin;
                _this.word = word;
                return _this;
            }
            return BossWarningData;
        }(effect.BaseEffectData));
        effect.BossWarningData = BossWarningData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
