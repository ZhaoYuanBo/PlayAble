var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        /*
        * name;
        */
        var LocalPlatform = /** @class */ (function () {
            function LocalPlatform() {
                this.window = platform.PlatformManager.window;
                game.Global.platformId = platform.PlatformID.None;
                game.Define.langId = platform.LangType.En;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                game.Define.isLocal = true;
                //2018-12-13 在进入游戏前，需要提前准备的东西
                EventManager.ins.init();
            }
            LocalPlatform.prototype.init = function (data) {
                if (data) {
                    this.getRandomShareFunc = data.getRandomShare;
                    this.isCanPlayVideoFunc = data.sCanPlayVideo;
                    this.getAdDataFunc = data.getAdData;
                    this.getAdVideoDataFunc = data.getAdVideoData;
                    console.log("平台初始化：" + data.getRandomShare);
                }
                if (game.Global.platformId == platform.PlatformID.None) {
                    EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                }
                //2020-02-21 andy 游戏结束
                EventManager.ins.on(NoticeEvent.GAME_OVER, this, function () {
                    platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameEnd);
                });
            };
            LocalPlatform.prototype.initSkinGame = function () {
                // if(Define.isDebug){
                //     Define.cdn = "../res/";
                // }else{
                //     Define.cdn = "res/";
                // }
            };
            LocalPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            LocalPlatform.prototype.loginSuccess = function () {
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            LocalPlatform.prototype.getUserInfo = function () {
                return this.userInfo;
            };
            LocalPlatform.prototype.initItem = function () {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.saveItem = function (ID, count, type) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.scoreUp = function (rank, score) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.share = function (func, queryKey) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.createBannerAd = function (posKey) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.showBannerAd = function (isShow) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.destroyBannerAd = function () {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.createVideoAd = function (posKey, success) {
                console.log("创建广告：" + posKey);
            };
            LocalPlatform.prototype.addMoreGameBtn = function (parent) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.createBrandSprite = function (parent, x, y) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.postMsg = function (postName, obj) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.shake = function (isShort, delay) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.saveImageToPhotosAlbum = function (url) {
                console.log("保存图片接口没有实现");
            };
            LocalPlatform.prototype.setUserCloudStorage = function (key, value) {
                console.log("云端保存数据接口没有实现");
            };
            LocalPlatform.prototype.getLocalImage = function (type) {
                console.log("需要平台实现此功能");
            };
            /**获得焦点时，前台运行 */
            LocalPlatform.prototype.onShowCallBack = function (res) {
                console.log("小游戏获得焦点，进入前台运行");
                //SoundManager.ins.setOn(true);
            };
            /**失去焦点时，后台运行 */
            LocalPlatform.prototype.onHideCallBack = function () {
                console.log("小游戏失去焦点，进入后台运行");
                //SoundManager.ins.setOn(false);
                Laya.SoundManager.stopMusic();
            };
            return LocalPlatform;
        }());
        platform.LocalPlatform = LocalPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
