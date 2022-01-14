var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * MTG 国内平台 https://www.mintegral.com
        2019-05-16 andy
        */
        class MTGPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.mtg;
                game.Define.langId = platform.LangType.Zh;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                Laya.Browser.window.gameStart = () => { platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart); };
            }
            initGameSkin() {
            }
            login() {
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameReady);
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("MTG 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.MTGPlatform = MTGPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=MTGPlatform.js.map