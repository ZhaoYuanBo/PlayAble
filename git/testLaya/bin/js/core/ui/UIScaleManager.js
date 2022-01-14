var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        *2019-06-19 andy
            屏幕缩放 UI适配
        */
        var UIScaleManager = /** @class */ (function () {
            function UIScaleManager() {
                if (UIScaleManager._ins != null)
                    throw new Error("UIScaleManager is single!");
            }
            Object.defineProperty(UIScaleManager, "ins", {
                get: function () {
                    if (!this._ins)
                        UIScaleManager._ins = new UIScaleManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * UI屏幕缩放适配初始化
             */
            UIScaleManager.prototype.init = function () {
                this.dicWindow = new Dictionary();
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SYS_SCREEN_HORIZONTAL_ONSIZE);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SYS_SCREEN_VERTICAL_ONSIZE);
                this.autoScale();
            };
            /**
             * 注册横竖屏时事件
             * @param name 窗体名字
             * @param scaleH 缩放UI横屏回调
             * @param scaleV 缩放UI竖屏回调
             */
            UIScaleManager.prototype.regUI = function (name, scaleH, scaleV) {
                if (!this.dicWindow) {
                    console.error("UIScaleManager.ts 未进行初始化！");
                    return;
                }
                var arrFunc = this.dicWindow.get(name);
                if (!arrFunc) {
                    arrFunc = new Array();
                    this.dicWindow.add(name, arrFunc);
                }
                arrFunc[0] = scaleH;
                arrFunc[1] = scaleV;
            };
            /**
             * 可以手动调用
             */
            UIScaleManager.prototype.autoScale = function () {
                if (game.Define.isVertitalState) {
                    this.SYS_SCREEN_VERTICAL_ONSIZE();
                }
                else {
                    this.SYS_SCREEN_HORIZONTAL_ONSIZE();
                }
            };
            UIScaleManager.prototype.SYS_SCREEN_HORIZONTAL_ONSIZE = function () {
                for (var _i = 0, _a = this.dicWindow.valueOf(); _i < _a.length; _i++) {
                    var arrFunc = _a[_i];
                    if (arrFunc) {
                        if (arrFunc[0]) {
                            arrFunc[0]();
                        }
                    }
                }
            };
            UIScaleManager.prototype.SYS_SCREEN_VERTICAL_ONSIZE = function () {
                for (var _i = 0, _a = this.dicWindow.valueOf(); _i < _a.length; _i++) {
                    var arrFunc = _a[_i];
                    if (arrFunc) {
                        if (arrFunc[1]) {
                            arrFunc[1]();
                        }
                    }
                }
            };
            return UIScaleManager;
        }());
        ui.UIScaleManager = UIScaleManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
