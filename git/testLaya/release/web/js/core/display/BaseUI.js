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
        /*
        2019-02-27 andy
        * UI基类 窗体
        */
        var BaseUI = /** @class */ (function (_super) {
            __extends(BaseUI, _super);
            function BaseUI() {
                var _this = _super.call(this) || this;
                _this.dicInitPosition = new Dictionary();
                return _this;
            }
            BaseUI.prototype.onAdd = function () {
                _super.prototype.onAdd.call(this);
                this.open();
            };
            BaseUI.prototype.onRemove = function () {
                _super.prototype.onRemove.call(this);
                this.close();
            };
            BaseUI.prototype.open = function () {
            };
            BaseUI.prototype.close = function () {
            };
            BaseUI.prototype.detory = function () {
            };
            /**UI是否显示 */
            BaseUI.prototype.isOpen = function () {
                return this != null && this.parent != null;
            };
            /**横屏时布局设置 */
            BaseUI.prototype.scaleH = function () {
            };
            /**竖屏时布局设置 */
            BaseUI.prototype.scaleV = function () {
            };
            /**
             * 记录初始坐标
             */
            BaseUI.prototype.recordInitPosition = function (ui) {
                if (ui instanceof Laya.View) {
                    this.recordViewPosition(ui);
                }
                else {
                    this.dicInitPosition.add(ui.name, new Laya.Point(ui.x, ui.y));
                }
            };
            BaseUI.prototype.recordViewPosition = function (sp) {
                for (var _i = 0, _a = sp._childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.name != "") {
                        this.dicInitPosition.add(child.name, new Laya.Point(child.x, child.y));
                    }
                    if (child instanceof Laya.Sprite) {
                        this.recordViewPosition(child);
                    }
                }
            };
            /**
             * 得到显示对象初始位置
             * @param name 显示对象
             */
            BaseUI.prototype.getInitPosition = function (name) {
                var point = this.dicInitPosition.get(name);
                if (!point) {
                    point = new Laya.Point();
                    //this.dicInitPosition.add(name,point);
                }
                return point;
            };
            /**
             * 得到两个显示对象的初始位置偏差X
             * @param sp1 显示对象1
             * @param sp2 显示对象2
             */
            BaseUI.prototype.getInitPositionOffX = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return 0;
                }
                var p1 = this.getInitPosition(sp1.name);
                var p2 = this.getInitPosition(sp2.name);
                return p2.x - p1.x;
            };
            /**
             * 得到两个显示对象的初始位置偏差Y
             * @param sp1 显示对象1
             * @param sp2 显示对象2
             */
            BaseUI.prototype.getInitPositionOffY = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return 0;
                }
                var p1 = this.getInitPosition(sp1.name);
                var p2 = this.getInitPosition(sp2.name);
                return p2.y - p1.y;
            };
            /**
             * 还原初始位置
             * @param sp 显示对象
             */
            BaseUI.prototype.resetInitPosition = function (sp) {
                var point = this.dicInitPosition.get(sp.name);
                if (point) {
                    sp.x = point.x;
                    sp.y = point.y;
                }
            };
            /**
             * 根据两个初始的位置偏差X,设置现在的位置X
             * @param sp1 参考对象1
             * @param sp2 得到对象2
             */
            BaseUI.prototype.setPositionByOffX = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return;
                }
                var offX = this.getInitPositionOffX(sp1, sp2);
                sp2.x = sp1.x + offX;
            };
            /**
             * 根据两个初始的位置偏差Y,设置现在的位置Y
             * @param sp1 参考对象1
             * @param sp2 得到对象2
             */
            BaseUI.prototype.setPositionByOffY = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return;
                }
                var offY = this.getInitPositionOffY(sp1, sp2);
                sp2.y = sp1.y + offY;
            };
            return BaseUI;
        }(display.BaseDisplay));
        display.BaseUI = BaseUI;
    })(display = game.display || (game.display = {}));
})(game || (game = {}));
