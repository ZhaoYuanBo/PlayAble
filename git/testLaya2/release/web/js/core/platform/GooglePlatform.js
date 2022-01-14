var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Google
        2019-06-24 andy
        */
        class GooglePlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Gg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("Google 登录成功！");
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
        platform.GooglePlatform = GooglePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=GooglePlatform.js.map