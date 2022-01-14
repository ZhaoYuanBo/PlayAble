/*
* name;
*/
class CustomDefine{
    constructor(){

    }
    /**配置数据HTTP地址 */
    static dataConfigUrl:string="res/config/cfg_data.json";

    //自定义声音------------------
    /**主界面声音 */
    static SOUND_MAIN:string="/sound/main.mp3";
    /**游戏内声音 */
    static SOUND_GAME:string="/sound/game.mp3";

    /**按钮声音 */
    static SOUND_BTN:string="/sound/btn.mp3";
    /**消灭星星声音 */
    static SOUND_HIT:string="/sound/hit.mp3";
    /**消灭星星声音 */
    static SOUND_HIT_SUCCESS:string="/sound/hit_success.mp3";
    /**消灭星星声音 */
    static SOUND_HIT_FAIL:string="/sound/hit_fail.mp3";
    /**信息声音1 */
    static SOUND_INFO:string="/sound/info1.mp3";

    //自定义事件------------------
    /**事件：更新位置 */
    public static EVENT_UPDATE_POSITION:string = "UPDATE_POSITION";
    /**事件：更新分数 */
    public static EVENT_UPDATE_SCORE:string = "UPDATE_SCORE";
    /**事件：游戏下一关 */
    public static EVENT_GAME_NEXT:string = "EVENT_GAME_NEXT";
    /**事件：游戏结束 */
    public static EVENT_GAME_OVER:string = "GAME_OVER";
    /**事件：再来一具 */
    public static EVENT_START_GAME_AGIN:string = "START_GAME_AGIN";
    /**事件：引导 */
    public static EVENT_GUIDE:string = "EVENT_GUIDE";

    //下载链接地址
    public static downloadUrl:string="https://play.google.com/store/apps/details?id=com.machsystem.gawii";


    //自定义动画------------------
    /**引导 */
    public static animGuide:string="guide";
    /**引导描述文字*/
    public static animGuideDesc:string="guideDesc";
    /**引导点击 */
    public static animGuideClick:string="guideClick";
    /**苹果树 */
    public static animTree:string="animTree";
    /**苹果树 */
    public static animTree2:string="animTree2";
}

class LocalKey{
    /**当前金币 */
    public static GOLD:string = "GOLD";
    /**当前等级 */
    public static LEVEL:string = "LEVEL";
    /**当前分数 */
    public static SCORE:string = "SCORE";
    /**最高分数 */
    public static SCORE_MAX:string = "SCORE_MAX";
    /**上一次缓存日期 20190101 */
    public static LAST_DAY:string = "LAST_DAY";
    /**播放视频广告次数 */
    public static PLAY_VIDEO_COUNT:string = "PLAY_VIDEO_COUNT";

    /**当前使用的小刀ID */
    public static KNIFE_ID:string = "KNIFE_ID";
} 

enum GUIDE_STEP{
    GUIDE_0,
    /**点击farmer */
    GUIDE_1,
     /**触发boy */
    GUIDE_2,
    /**点击boy */
    GUIDE_3,
     /**触发mother */
    GUIDE_4, 
    /**点击mother */
    GUIDE_5,
    /**触发leader */
    GUIDE_6,
    /**点击leader */
    GUIDE_7,
    /**触发开垦 */
    GUIDE_8,
    /**点击开垦 */
    GUIDE_9,
    /**游戏结束，下载安装 */
    GUIDE_10
}