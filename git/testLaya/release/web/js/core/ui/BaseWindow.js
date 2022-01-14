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
    var ui;
    (function (ui) {
        var BaseUI = game.display.BaseUI;
        /*
        * 窗体基类
        */
        var BaseWindow = /** @class */ (function (_super) {
            __extends(BaseWindow, _super);
            function BaseWindow(viewCls) {
                var _this = _super.call(this) || this;
                /** 窗体类型 */
                _this.uiType = null;
                /** Laya生成的UI */
                _this.view = null;
                _this.view = new viewCls();
                _this.root = LayerManager.ins.getLayer(LayerName.root);
                _this.addChild(_this.view);
                return _this;
            }
            /**执行一次 */
            BaseWindow.prototype.init = function () {
            };
            /**
             * 窗体打开
             * @param delayTime 延长打开时间
             */
            BaseWindow.prototype.open = function (delayTime) {
                var _this = this;
                if (delayTime === void 0) { delayTime = 0; }
                this.view.on(Laya.Event.CLICK, this, this.mouseClick);
                ui.UIScaleManager.ins.regUI(this.uiType.name, function () { _this.scaleH(); }, function () { _this.scaleV(); });
                //2020-09-16 修正进入游戏时，背景图一闪留白情况
                if (delayTime > 0) {
                    var sp_1 = new Sprite();
                    sp_1.graphics.drawRect(0, 0, game.Define.DeviceW, game.Define.DeviceH, "#ffffff");
                    Laya.stage.addChild(sp_1);
                    Laya.timer.once(delayTime, this, function () { sp_1.removeSelf(); });
                }
            };
            /**窗体关闭 */
            BaseWindow.prototype.close = function () {
                //console.log("窗体已关闭");
                this.view.off(Laya.Event.CLICK, this, this.mouseClick);
                ui.UIScaleManager.ins.regUI(this.uiType.name, null, null);
            };
            /**
             * UI点击事件
             * @param event
             */
            BaseWindow.prototype.mouseClick = function (event) {
                event.stopPropagation();
                var btn = event.target;
                if (btn instanceof Laya.Sprite) {
                    //按钮增加点击效果，view,list除外
                    if (btn.name == "" || btn instanceof BaseWindow || btn instanceof laya.ui.Box || btn instanceof laya.ui.ProgressBar
                        || btn instanceof laya.ui.ScrollBar || btn instanceof laya.ui.Slider || btn instanceof laya.ui.ComboBox) {
                    }
                    else {
                        if (btn instanceof laya.ui.Button) {
                            laya.utils.Tween.from(btn, { scaleX: 0.8, scaleY: 0.8 }, 80);
                        }
                        //SoundManager.ins.playSound(Define.SOUND_BTN);
                        this.viewClick(btn);
                    }
                }
            };
            /**窗体点击事件 */
            BaseWindow.prototype.viewClick = function (sp) {
                var spName = sp.name;
                //console.log("点击按钮："+spName);
                switch (spName) {
                    case "btnClose":
                        ui.UIManager.ins.closeWindow(this.uiType);
                        break;
                    default:
                        break;
                }
            };
            return BaseWindow;
        }(BaseUI));
        ui.BaseWindow = BaseWindow;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
