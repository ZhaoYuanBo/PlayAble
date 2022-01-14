var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 2019-02-27 andy
            界面管理
        */
        var UIManager = /** @class */ (function () {
            function UIManager() {
                if (UIManager._ins != null)
                    throw new Error("UIManager is single!");
            }
            Object.defineProperty(UIManager, "ins", {
                get: function () {
                    if (!this._ins)
                        UIManager._ins = new UIManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            UIManager.prototype.init = function () {
                //窗体顶层
                this.topView = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                this.topMask = new Laya.Sprite();
                this.topView.addChild(this.topMask);
                //初始化界面
                this.dicWindow = new Dictionary();
                //
                ui.UIScaleManager.ins.init();
            };
            UIManager.prototype.getWindow = function (uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (!win) {
                    var cls = uiType.path;
                    win = new cls();
                    win.uiType = uiType;
                    this.dicWindow.add(uiType.name, win);
                }
                return win;
            };
            UIManager.prototype.openWindow = function (uiType) {
                var win = this.getWindow(uiType);
                if (win.isOpen()) {
                    //console.log("窗体已经打开");
                }
                else {
                    LayerManager.ins.addChild(win, LayerName.ui_window);
                    if (uiType.name == "gameDownload") {
                        if (game.Global.platformId == PlatformID.Vg) {
                            if (parent) {
                                parent.postMessage('complete', '*');
                                console.log("vungle 调用 parent.postMessage('complete','*')");
                            }
                        }
                    }
                }
                return win;
            };
            UIManager.prototype.closeWindow = function (uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (win) {
                    win.removeSelf();
                }
            };
            /**
             * 将窗体显示对象,增加到窗体最顶层
             * @param sp 显示对象
             */
            UIManager.prototype.addTop = function (sp) {
                this.topView.addChild(sp);
            };
            /**
             * 绘制一个镂空的巨型区域，用于高亮引导
             * @param size {x:0,y:0,w:1,h:1} null清除
             * @param alpha 透明度
             */
            UIManager.prototype.drawTopMask = function (size, alpha) {
                if (alpha === void 0) { alpha = 0.5; }
                var topMask = this.topMask;
                if (!size) {
                    topMask.graphics.clear();
                    return;
                }
                var x = size.x;
                var y = size.y;
                var w = size.w;
                var h = size.h;
                topMask.graphics.drawRect(0, 0, game.Define.DeviceW, y, "#000000");
                topMask.graphics.drawRect(0, y, x, h, "#000000");
                topMask.graphics.drawRect(x + w, y, game.Define.DeviceW - (x + w), h, "#000000");
                topMask.graphics.drawRect(0, y + h, game.Define.DeviceW, game.Define.DeviceH - (y + h), "#000000");
                topMask.alpha = alpha;
            };
            /**
             * 将声音按钮,增加到窗体最顶层
             * @param btnSound 按钮
             */
            UIManager.prototype.addTopBtnSound = function (btnSound) {
                if (!btnSound) {
                    return;
                }
                LayerManager.ins.addChild(btnSound, LayerName.top);
                btnSound.on(Laya.Event.CLICK, this, function () {
                    if (btnSound.gray) {
                        btnSound.gray = false;
                        SoundManager.ins.setOn(true);
                    }
                    else {
                        btnSound.gray = true;
                        SoundManager.ins.setOn(false);
                    }
                });
            };
            return UIManager;
        }());
        ui.UIManager = UIManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
