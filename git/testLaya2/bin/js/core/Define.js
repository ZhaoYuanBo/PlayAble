var game;
(function (game) {
    var LangType = game.platform.LangType;
    var ScreenFillType = game.scene.ScreenFillType;
    /*
    * 2019-02-28 andy
    全局游戏常量定义
    */
    class Define {
        constructor() {
        }
    }
    /**是否测试模式 */
    Define.isDebug = true;
    Define.DeviceW = 720;
    Define.DeviceH = 1280;
    /**游戏资源根目录 */
    Define.CDN = "res";
    /**服务端HTTP */
    Define.serverHttp = "http://127.0.0.1";
    /**服务端websocket地址 */
    Define.serverIP = "http://127.0.0.1";
    /**服务端websocket端口 */
    Define.serverPort = "3000";
    /**网关HTTP地址 */
    Define.serverConfigUrl = "res/config/serverConfig.json"; //"http://127.0.0.1:8090/webgame/config.html";//
    /**游戏ID */
    Define.gameId = 1;
    /**游戏版本号 */
    Define.gameVersion = "100";
    /**语言类型 */
    Define.langId = LangType.Zh;
    /**是否单机游戏 */
    Define.isLocal = true;
    /**是否竖屏游戏 */
    Define.isVertitalGame = true;
    /**是否竖屏状态 */
    Define.isVertitalState = true;
    /**横竖屏转换时，是否等比缩放,默认是false，若为true需要自己处理逻辑 */
    Define.isSameScale = false;
    /**横竖屏转换时，背景图是否等比缩放,默认是true，若为false一般背景图不会上下左右移动，固定背景 */
    Define.isSameBackgroundScale = true;
    /**竖屏游戏-横屏时填充模式 或者 横屏游戏-竖屏时填充模式*/
    Define.screenFillType = ScreenFillType.default;
    /**微信APPID */
    Define.appId = "wx659ae0df220d382f";
    /**点击按钮时的声音 */
    Define.SOUND_BTN = "";
    /**点击按钮时的声音 */
    Define.SOUND_MAIN = null;
    /**游戏下载地址 */
    Define.DOWNLOAD_URL = "";
    /**游戏背景颜色 */
    Define.BACKGROUND_COLOR = "";
    game.Define = Define;
    /**广告配置 */
    class AdConfig {
        constructor() { }
    }
    game.AdConfig = AdConfig;
})(game || (game = {}));
//# sourceMappingURL=Define.js.map