var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        *2019-06-19 andy
            屏幕缩放 UI适配
        */
        class UIScaleManager {
            constructor() {
                if (UIScaleManager._ins != null)
                    throw new Error("UIScaleManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    UIScaleManager._ins = new UIScaleManager();
                return this._ins;
            }
            /**
             * UI屏幕缩放适配初始化
             */
            init() {
                this.dicWindow = new Dictionary();
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SYS_SCREEN_HORIZONTAL_ONSIZE);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SYS_SCREEN_VERTICAL_ONSIZE);
                this.autoScale();
            }
            /**
             * 注册横竖屏时事件
             * @param name 窗体名字
             * @param scaleH 缩放UI横屏回调
             * @param scaleV 缩放UI竖屏回调
             */
            regUI(name, scaleH, scaleV) {
                if (!this.dicWindow) {
                    console.error("UIScaleManager.ts 未进行初始化！");
                    return;
                }
                let arrFunc = this.dicWindow.get(name);
                if (!arrFunc) {
                    arrFunc = new Array();
                    this.dicWindow.add(name, arrFunc);
                }
                arrFunc[0] = scaleH;
                arrFunc[1] = scaleV;
            }
            /**
             * 可以手动调用
             */
            autoScale() {
                if (game.Define.isVertitalState) {
                    this.SYS_SCREEN_VERTICAL_ONSIZE();
                }
                else {
                    this.SYS_SCREEN_HORIZONTAL_ONSIZE();
                }
            }
            SYS_SCREEN_HORIZONTAL_ONSIZE() {
                for (let arrFunc of this.dicWindow.valueOf()) {
                    if (arrFunc) {
                        if (arrFunc[0]) {
                            arrFunc[0]();
                        }
                    }
                }
            }
            SYS_SCREEN_VERTICAL_ONSIZE() {
                for (let arrFunc of this.dicWindow.valueOf()) {
                    if (arrFunc) {
                        if (arrFunc[1]) {
                            arrFunc[1]();
                        }
                    }
                }
            }
        }
        ui.UIScaleManager = UIScaleManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=UIScaleManager.js.map