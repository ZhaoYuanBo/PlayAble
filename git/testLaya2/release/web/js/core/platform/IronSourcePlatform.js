var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * IronSource 以色列投放广告平台
        2019-05-01 andy
        */
        class IronSourcePlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Is;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("IronSource 登录成功！");
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
        platform.IronSourcePlatform = IronSourcePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=IronSourcePlatform.js.map