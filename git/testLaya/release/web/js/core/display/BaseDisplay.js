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
    var display;
    (function (display) {
        /**
         * 2019-12-18
         * 所有显示基类
         */
        var BaseDisplay = /** @class */ (function (_super) {
            __extends(BaseDisplay, _super);
            function BaseDisplay() {
                var _this = _super.call(this) || this;
                _this._isDisplay = false;
                _this._isInit = false;
                _this.on(Laya.Event.ADDED, _this, _this.ADDED);
                return _this;
            }
            BaseDisplay.prototype.ADDED = function (event) {
                if (!this._isInit) {
                    this._isInit = true;
                    this.init();
                }
                this._isDisplay = true;
                this.off(Laya.Event.ADDED, this, this.ADDED);
                this.on(Laya.Event.REMOVED, this, this.REMOVED);
                this.onAdd();
            };
            BaseDisplay.prototype.REMOVED = function (event) {
                this._isDisplay = false;
                this.on(Laya.Event.ADDED, this, this.ADDED);
                this.off(Laya.Event.REMOVED, this, this.REMOVED);
                // UIScaleManager.ins.regUI(this.uiType.name,null,null);
                this.onRemove();
            };
            /**
             * 创建时调用
             */
            BaseDisplay.prototype.onAdd = function () {
            };
            /**
             * 移除时调用
             */
            BaseDisplay.prototype.onRemove = function () {
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
            };
            /**执行一次 */
            BaseDisplay.prototype.init = function () {
            };
            Object.defineProperty(BaseDisplay.prototype, "isDisplay", {
                /**是否显示 */
                get: function () {
                    return this._isDisplay;
                },
                enumerable: false,
                configurable: true
            });
            return BaseDisplay;
        }(Laya.Sprite));
        display.BaseDisplay = BaseDisplay;
    })(display = game.display || (game.display = {}));
})(game || (game = {}));
