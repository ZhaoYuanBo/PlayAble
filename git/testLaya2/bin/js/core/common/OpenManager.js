var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-05 andy
        微信开放数据管理
        */
        class OpenManager {
            constructor() {
                if (OpenManager._ins != null)
                    throw new Error("OpenManager is single!");
                OpenManager._ins = this;
                this.isDrawOpenView = false;
                this.wx = Laya.Browser.window.wx;
                this.init();
            }
            static get ins() {
                if (!this._ins)
                    new OpenManager();
                return this._ins;
            }
            init() {
                this.resizeStage();
            }
            //----------------------主域调用-----------------
            postMsg(cmd, data) {
                if (this.wx) {
                    var openDataContext = this.wx.getOpenDataContext();
                    openDataContext.postMessage({ cmd: cmd, data: data });
                }
            }
            resizeStage() {
                if (Laya.Browser.window.sharedCanvas) {
                    var scw = 663;
                    var sch = 726;
                    Laya.Browser.window.sharedCanvas.width = scw;
                    Laya.Browser.window.sharedCanvas.height = sch;
                    //this.postMsg(NoticeEvent.ZY_RESIZE,{width:scw,height:sch,matrix:Laya.stage._canvasTransform});
                    this.initOpenView();
                }
            }
            setLogin() {
                //Global.platform.postMsg(NoticeEvent.Zy_Login,{openId:Global.roleData.openid,gameId:DEFINE.gameId,isGame1:DEFINE.isGame1,isGame2:DEFINE.isGame2,isGame3:DEFINE.isGame3,cdn:DEFINE.cdn});
            }
            setShareTicket() {
                //Global.platform.postMsg(NoticeEvent.Zy_ShareTicket,DEFINE.shareTicket);
            }
            updateScore() {
                //Global.platform.postMsg(NoticeEvent.Zy_Score,{score:Math.floor(Global.roleData.runDistance)});
            }
            showRankView(type) {
                this.postMsg(common.NoticeEvent.ZY_RANK, null);
            }
            showOverView() {
                //Global.platform.postMsg(NoticeEvent.Zy_Over,{score:Math.floor(Global.roleData.runDistance)});
            }
            showBeOverView() {
                //Global.platform.postMsg(NoticeEvent.Zy_BeOver,null);
            }
            noticeUILoaded(data) {
                //Global.platform.postMsg(NoticeEvent.Zy_UILoaded,data);
            }
            /**
             * name
             */
            initOpenView() {
                if (Laya.Browser.window.sharedCanvas) {
                    this.openSp = new Laya.Sprite();
                    this.openSp.on(Laya.Event.REMOVED, this, this.onRemoveOpenSp);
                    this.openSp.pos(0, 0);
                    // Laya.timer.loop(5000,this,this.drawOpenView);
                    // this.drawOpenView();
                }
            }
            onRemoveOpenSp() {
                this.isDrawOpenView = false;
            }
            changeOpenParent(parent, x, y) {
                if (!Laya.Browser.window.sharedCanvas) {
                    return;
                }
                this.isDrawOpenView = false;
                this.openSp.removeSelf();
                this.openSp.pos(x, y);
                if (parent) {
                    Laya.timer.once(1500, this, this.delayAddOpenSp, [parent]);
                }
            }
            updateOpenView() {
                Laya.timer.once(2000, this, this.drawOpenView);
            }
            delayAddOpenSp(parent) {
                parent.addChild(this.openSp);
                this.isDrawOpenView = true;
                this.drawOpenView();
                this.updateOpenView();
            }
            drawOpenView() {
                if (this.isDrawOpenView) {
                    this.openSp.graphics.clear();
                    if (this.openTex)
                        this.openTex.destroy();
                    this.openTex = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                    // this.openTex.bitmap.alwaysChange = true;//小程序使用，非常费，这个参数可以根据自己的需求适当调整，如果内容不变可以不用设置成true
                    this.openSp.graphics.drawTexture(this.openTex, 0, 0, this.openTex.width, this.openTex.height);
                    // this.openTex.bitmap.reloadCanvasData();
                }
            }
        }
        common.OpenManager = OpenManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=OpenManager.js.map