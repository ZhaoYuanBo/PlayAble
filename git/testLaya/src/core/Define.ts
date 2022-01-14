namespace game{
    import LangType=game.platform.LangType;
    import ScreenFillType=game.scene.ScreenFillType;
    /**
     * 游戏类型
     */
    export enum GameType{
        /**默认 */
        default,
        /**俯视角度 */
        over_look,
        /**横板游戏 比如：拳皇格斗*/
        h_game,
        /**竖版游戏 比如：打飞机*/
        v_game,
        /**RPG游戏*/
        rpg
    }
    /*
    * 2019-02-28 andy 
    全局游戏常量定义
    */
    export class Define{
        constructor(){

        }
        /**是否测试模式 */
        public static isDebug:boolean=true;
        public static DeviceW:number=720;
        public static DeviceH:number=1280;
        /**游戏资源根目录 */
        public static CDN:string="res";
        /**服务端HTTP */
        public static serverHttp:string="http://127.0.0.1";
        /**服务端websocket地址 */
        public static serverIP:string="http://127.0.0.1";
        /**服务端websocket端口 */
        public static serverPort:string="3000";
        /**网关HTTP地址 */
        public static serverConfigUrl:string="res/config/serverConfig.json";//"http://127.0.0.1:8090/webgame/config.html";//
        
        /**游戏ID */
        public static gameId:number=1;
        /**游戏版本号 */
        public static gameVersion:string="100";
        /**语言类型 */
        public static langId:LangType=LangType.Zh;
        /**是否单机游戏 */
        public static isLocal:boolean=true;
        /**场景布局类型 0.不改变 1.自动竖屏 2.自动横屏 默认0*/
        public static screenMode:number=0;
        /**是否竖屏游戏 */
        public static isVertitalGame:boolean=true;
        /**是否竖屏状态 */
        public static isVertitalState:boolean=true;
        /**横竖屏转换时，是否等比缩放,默认是false，若为true需要自己处理逻辑 */
        public static isSameScale:boolean=false;
        /**横竖屏转换时，背景图是否全屏,默认为true,会缩放 */
        public static isSameBackgroundScale:boolean=true;
        /**竖屏游戏-横屏时填充模式 或者 横屏游戏-竖屏时填充模式*/
        public static screenFillType:ScreenFillType=ScreenFillType.default;
        /**游戏类型 比如：俯视 横板 竖版 */
		public static gameType:GameType=GameType.default;

        /**微信APPID */
        public static appId:string="wx659ae0df220d382f";
        
        /**点击按钮时的声音 */
        public static SOUND_BTN:string="";
        /**游戏的背景声音 */
        public static SOUND_MAIN:Base64Type=null;
        
        /**游戏下载地址 */
        public static DOWNLOAD_URL:string="";
        /**游戏背景颜色 */
        public static BACKGROUND_COLOR:string="";
    }

    /**广告配置 */
    export class AdConfig{
        constructor(){}
        public adUnitId:string;
        public maxPlayCount:number;
    }

    

}

