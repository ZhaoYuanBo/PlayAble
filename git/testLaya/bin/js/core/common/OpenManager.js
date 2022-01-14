var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-05 andy
        微信开放数据管理
        */
        var OpenManager = /** @class */ (function () {
            function OpenManager() {
                if (OpenManager._ins != null)
                    throw new Error("OpenManager is single!");
                OpenManager._ins = this;
                this.isDrawOpenView = false;
                this.wx = Laya.Browser.window.wx;
                this.init();
            }
            Object.defineProperty(OpenManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new OpenManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            OpenManager.prototype.init = function () {
                this.resizeStage();
            };
            //----------------------主域调用-----------------
            OpenManager.prototype.postMsg = function (cmd, data) {
                if (this.wx) {
                    var openDataContext = this.wx.getOpenDataContext();
                    openDataContext.postMessage({ cmd: cmd, data: data });
                }
            };
            OpenManager.prototype.resizeStage = function () {
                if (Laya.Browser.window.sharedCanvas) {
                    var scw = 663;
                    var sch = 726;
                    Laya.Browser.window.sharedCanvas.width = scw;
                    Laya.Browser.window.sharedCanvas.height = sch;
                    this.postMsg(common.NoticeEvent.ZY_RESIZE, { width: scw, height: sch, matrix: Laya.stage._canvasTransform });
                    this.initOpenView();
                }
            };
            OpenManager.prototype.setLogin = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Login,{openId:Global.roleData.openid,gameId:DEFINE.gameId,isGame1:DEFINE.isGame1,isGame2:DEFINE.isGame2,isGame3:DEFINE.isGame3,cdn:DEFINE.cdn});
            };
            OpenManager.prototype.setShareTicket = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_ShareTicket,DEFINE.shareTicket);
            };
            OpenManager.prototype.updateScore = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Score,{score:Math.floor(Global.roleData.runDistance)});
            };
            OpenManager.prototype.showRankView = function (type) {
                this.postMsg(common.NoticeEvent.ZY_RANK, null);
            };
            OpenManager.prototype.showOverView = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Over,{score:Math.floor(Global.roleData.runDistance)});
            };
            OpenManager.prototype.showBeOverView = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_BeOver,null);
            };
            OpenManager.prototype.noticeUILoaded = function (data) {
                //Global.platform.postMsg(NoticeEvent.Zy_UILoaded,data);
            };
            /**
             * name
             */
            OpenManager.prototype.initOpenView = function () {
                if (Laya.Browser.window.sharedCanvas) {
                    this.openSp = new Laya.Sprite();
                    this.openSp.on(Laya.Event.REMOVED, this, this.onRemoveOpenSp);
                    this.openSp.pos(0, 0);
                    // Laya.timer.loop(5000,this,this.drawOpenView);
                    // this.drawOpenView();
                }
            };
            OpenManager.prototype.onRemoveOpenSp = function () {
                this.isDrawOpenView = false;
            };
            OpenManager.prototype.changeOpenParent = function (parent, x, y) {
                if (!Laya.Browser.window.sharedCanvas) {
                    return;
                }
                this.isDrawOpenView = false;
                this.openSp.removeSelf();
                this.openSp.pos(x, y);
                if (parent) {
                    Laya.timer.once(1500, this, this.delayAddOpenSp, [parent]);
                }
            };
            OpenManager.prototype.updateOpenView = function () {
                Laya.timer.once(2000, this, this.drawOpenView);
            };
            OpenManager.prototype.delayAddOpenSp = function (parent) {
                parent.addChild(this.openSp);
                this.isDrawOpenView = true;
                this.drawOpenView();
                this.updateOpenView();
            };
            OpenManager.prototype.drawOpenView = function () {
                if (this.isDrawOpenView) {
                    this.openSp.graphics.clear();
                    if (this.openTex)
                        this.openTex.destroy();
                    this.openTex = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                    // this.openTex.bitmap.alwaysChange = true;//小程序使用，非常费，这个参数可以根据自己的需求适当调整，如果内容不变可以不用设置成true
                    this.openSp.graphics.drawTexture(this.openTex, 0, 0, this.openTex.width, this.openTex.height);
                    // this.openTex.bitmap.reloadCanvasData();
                }
            };
            return OpenManager;
        }());
        common.OpenManager = OpenManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
