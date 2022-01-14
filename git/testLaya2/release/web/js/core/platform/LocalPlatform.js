var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        /*
        * name;
        */
        class LocalPlatform {
            constructor() {
                this.window = platform.PlatformManager.window;
                this.fileSysMgr = platform.PlatformManager.fileSysMgr;
                game.Global.platformId = platform.PlatformID.None;
                game.Define.langId = platform.LangType.En;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                game.Define.isLocal = true;
                //2018-12-13 在进入游戏前，需要提前准备的东西
                EventManager.ins.init();
            }
            init(data) {
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
            }
            initSkinGame() {
                // if(Define.isDebug){
                //     Define.cdn = "../res/";
                // }else{
                //     Define.cdn = "res/";
                // }
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            getUserInfo() {
                return this.userInfo;
            }
            initItem() {
                console.log("需要平台实现此功能");
            }
            saveItem(ID, count, type) {
                console.log("需要平台实现此功能");
            }
            scoreUp(rank, score) {
                console.log("需要平台实现此功能");
            }
            share(func, queryKey) {
                console.log("需要平台实现此功能");
            }
            createBannerAd(posKey) {
                console.log("需要平台实现此功能");
            }
            showBannerAd(isShow) {
                console.log("需要平台实现此功能");
            }
            destroyBannerAd() {
                console.log("需要平台实现此功能");
            }
            createVideoAd(posKey, success) {
                console.log("创建广告：" + posKey);
            }
            addMoreGameBtn(parent) {
                console.log("需要平台实现此功能 微信独有");
            }
            createBrandSprite(parent, x, y) {
                console.log("需要平台实现此功能 微信独有");
            }
            postMsg(postName, obj) {
                console.log("需要平台实现此功能 微信独有");
            }
            shake(isShort, delay) {
                console.log("需要平台实现此功能");
            }
            saveImageToPhotosAlbum(url) {
                console.log("保存图片接口没有实现");
            }
            setUserCloudStorage(key, value) {
                console.log("云端保存数据接口没有实现");
            }
            getLocalImage(type) {
                console.log("需要平台实现此功能");
            }
            /**获得焦点时，前台运行 */
            onShowCallBack(res) {
                console.log("小游戏获得焦点，进入前台运行");
                //SoundManager.ins.setOn(true);
            }
            /**失去焦点时，后台运行 */
            onHideCallBack() {
                console.log("小游戏失去焦点，进入后台运行");
                //SoundManager.ins.setOn(false);
                Laya.SoundManager.stopMusic();
            }
        }
        platform.LocalPlatform = LocalPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=LocalPlatform.js.map