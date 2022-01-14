var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 窗体基类
        */
        class BaseWindow extends ui.BaseUI {
            constructor(viewCls) {
                super();
                this.uiType = null;
                this.view = null;
                this.isInit = false;
                this.view = new viewCls();
                this.view.on(Laya.Event.ADDED, this, this.onAdd);
            }
            /**执行一次 */
            init() {
            }
            onAdd(event) {
                if (!this.isInit) {
                    this.isInit = true;
                    this.init();
                }
                this.view.on(Laya.Event.CLICK, this, this.mouseClick);
                this.view.on(Laya.Event.REMOVED, this, this.onRmove);
                ui.UIScaleManager.ins.regUI(this.uiType.name, () => { this.scaleH(); }, () => { this.scaleV(); });
                this.open();
            }
            onRmove(event) {
                this.view.off(Laya.Event.CLICK, this, this.mouseClick);
                this.view.off(Laya.Event.REMOVED, this, this.onRmove);
                ui.UIScaleManager.ins.regUI(this.uiType.name, null, null);
                this.close();
            }
            /**窗体是否打开 */
            isOpen() {
                return this.view != null && this.view.parent != null;
            }
            /**窗体打开 */
            open() {
            }
            /**横屏时布局设置 */
            scaleH() {
            }
            /**竖屏时布局设置 */
            scaleV() {
            }
            mouseClick(event) {
                let btn = event.target;
                if (btn instanceof Laya.Sprite) {
                    //按钮增加点击效果，view,list除外
                    if (btn.name == "" || btn instanceof BaseWindow || btn instanceof Laya.Box || btn instanceof Laya.ProgressBar
                        || btn instanceof Laya.ScrollBar || btn instanceof Laya.Slider || btn instanceof Laya.ComboBox) {
                    }
                    else {
                        if (btn instanceof Laya.Button) {
                            Laya.Tween.from(btn, { scaleX: 0.8, scaleY: 0.8 }, 80);
                        }
                        //SoundManager.ins.playSound(Define.SOUND_BTN);
                        this.viewClick(btn);
                    }
                }
            }
            /**窗体点击事件 */
            viewClick(sp) {
                let spName = sp.name;
                //console.log("点击按钮："+spName);
                switch (spName) {
                    case "btnClose":
                        ui.UIManager.ins.closeWindow(this.uiType);
                        break;
                    default:
                        break;
                }
            }
            /**窗体关闭 */
            close() {
                //console.log("窗体已关闭");
            }
        }
        ui.BaseWindow = BaseWindow;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseWindow.js.map