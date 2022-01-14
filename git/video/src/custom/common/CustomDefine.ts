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

    public static animGuide:string="guide";
    public static animGuideDesc:string="guideDesc";
    public static animTree:string="animTree";
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
    /**点击1 */
    GUIDE_1,
     /**触发 */
    GUIDE_2,
    /**点击 */
    GUIDE_3,
    /**点击下载 */
    GUIDE_4,
    /**结束 */
    GUIDE_5
}