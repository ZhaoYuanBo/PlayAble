var game;
(function (game) {
    var ui;
    (function (ui_1) {
        /*
        2019-02-27 andy
        * UI基类
        */
        var BaseUI = /** @class */ (function () {
            function BaseUI() {
                this.dicInitPosition = new Dictionary();
            }
            BaseUI.prototype.open = function () {
            };
            BaseUI.prototype.close = function () {
            };
            BaseUI.prototype.detory = function () {
            };
            /**
             * 记录初始坐标
             */
            BaseUI.prototype.recordInitPosition = function (ui) {
                if (ui instanceof Laya.View) {
                    for (var _i = 0, _a = ui._childs; _i < _a.length; _i++) {
                        var child = _a[_i];
                        this.dicInitPosition.add(child.name, new Laya.Point(child.x, child.y));
                    }
                }
                else {
                    this.dicInitPosition.add(ui.name, new Laya.Point(ui.x, ui.y));
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
        }());
        ui_1.BaseUI = BaseUI;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
