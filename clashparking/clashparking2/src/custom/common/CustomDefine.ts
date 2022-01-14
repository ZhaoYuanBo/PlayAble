/*
* name;
*/
class CustomDefine {
    constructor() {

    }
    /**配置数据HTTP地址 */
    static dataConfigUrl: string = "res/config/cfg_data.json";

    //自定义声音------------------
    /**主界面声音 */
    static SOUND_MAIN: string = "/sound/main.mp3";
    /**游戏内声音 */
    static SOUND_GAME: string = "/sound/game.mp3";

    /**按钮声音 */
    static SOUND_BTN: string = "/sound/btn.mp3";
    /**消灭星星声音 */
    static SOUND_HIT: string = "/sound/hit.mp3";
    /**消灭星星声音 */
    static SOUND_HIT_SUCCESS: string = "/sound/hit_success.mp3";
    /**消灭星星声音 */
    static SOUND_HIT_FAIL: string = "/sound/hit_fail.mp3";
    /**信息声音1 */
    static SOUND_INFO: string = "/sound/info1.mp3";

    //自定义事件------------------
    /**事件：更新位置 */
    public static EVENT_UPDATE_POSITION: string = "UPDATE_POSITION";
    /**事件：更新分数 */
    public static EVENT_UPDATE_SCORE: string = "UPDATE_SCORE";
    /**事件：游戏下一关 */
    public static EVENT_GAME_NEXT: string = "EVENT_GAME_NEXT";
    /**事件：游戏结束 */
    public static EVENT_GAME_OVER: string = "GAME_OVER";
    /**事件:再来一局 */
    public static EVENT_START_GAME_AGIN: string = "START_GAME_AGIN";

    /**事件：枪支特效触发 */
    public static EVENT_GUN_EFFECT: string = "GUN_EFFECT";

    public static EVENT_REGISTER_RESET:string = "REGISTER_RESET";

    public static animGuide: string = "guide";
    public static animGuideDesc: string = "guideDesc";
    public static animGuideClick: string = "guideClick";
}

class LocalKey {
    /**当前金币 */
    public static GOLD: string = "GOLD";
    /**当前等级 */
    public static LEVEL: string = "LEVEL";
    /**当前分数 */
    public static SCORE: string = "SCORE";
    /**最高分数 */
    public static SCORE_MAX: string = "SCORE_MAX";
    /**上一次缓存日期 20190101 */
    public static LAST_DAY: string = "LAST_DAY";
    /**播放视频广告次数 */
    public static PLAY_VIDEO_COUNT: string = "PLAY_VIDEO_COUNT";
    /**当前使用的小刀ID */
    public static KNIFE_ID: string = "KNIFE_ID";
}

class Book {
    /**课文ID */
    public id: number = -1;
    /**是否是拼音 */
    public isPinYin: boolean = true;
    /**课文标题 */
    public title: string;
    /**课文所有拼音 */
    public pinyin: string;
    /**课文所有汉字 */
    public hanzi: string;
    /**课文所有拼音 */
    public arrPinyin: Array<string>;
    /**课文所有汉字 */
    public arrHanzi: Array<string>;
    /**课文类型 */
    public type: number = 0;
}
class Word {
    /**汉字ID */
    public id: number = -1;
    /**汉字拼音 */
    public pinyin: string;
    /**汉字 */
    public hanzi: string;
    /**汉字类型 */
    public type: number = 0;
}