/*
* name;
*/
var CustomDefine = /** @class */ (function () {
    function CustomDefine() {
    }
    /**配置数据HTTP地址 */
    CustomDefine.dataConfigUrl = "res/config/cfg_data.json";
    //自定义声音------------------
    /**主界面声音 */
    CustomDefine.SOUND_MAIN = "/sound/main.mp3";
    /**游戏内声音 */
    CustomDefine.SOUND_GAME = "/sound/game.mp3";
    /**按钮声音 */
    CustomDefine.SOUND_BTN = "/sound/btn.mp3";
    /**消灭星星声音 */
    CustomDefine.SOUND_HIT = "/sound/hit.mp3";
    /**消灭星星声音 */
    CustomDefine.SOUND_HIT_SUCCESS = "/sound/hit_success.mp3";
    /**消灭星星声音 */
    CustomDefine.SOUND_HIT_FAIL = "/sound/hit_fail.mp3";
    /**信息声音1 */
    CustomDefine.SOUND_INFO = "/sound/info1.mp3";
    //自定义事件------------------
    /**事件：更新位置 */
    CustomDefine.EVENT_UPDATE_POSITION = "UPDATE_POSITION";
    /**事件：更新分数 */
    CustomDefine.EVENT_UPDATE_SCORE = "UPDATE_SCORE";
    /**事件：游戏下一关 */
    CustomDefine.EVENT_GAME_NEXT = "EVENT_GAME_NEXT";
    /**事件：游戏结束 */
    CustomDefine.EVENT_GAME_OVER = "GAME_OVER";
    /**事件：再来一具 */
    CustomDefine.EVENT_START_GAME_AGIN = "START_GAME_AGIN";
    return CustomDefine;
}());
var LocalKey = /** @class */ (function () {
    function LocalKey() {
    }
    /**当前金币 */
    LocalKey.GOLD = "GOLD";
    /**当前等级 */
    LocalKey.LEVEL = "LEVEL";
    /**当前分数 */
    LocalKey.SCORE = "SCORE";
    /**最高分数 */
    LocalKey.SCORE_MAX = "SCORE_MAX";
    /**上一次缓存日期 20190101 */
    LocalKey.LAST_DAY = "LAST_DAY";
    /**播放视频广告次数 */
    LocalKey.PLAY_VIDEO_COUNT = "PLAY_VIDEO_COUNT";
    /**当前使用的小刀ID */
    LocalKey.KNIFE_ID = "KNIFE_ID";
    return LocalKey;
}());
var Book = /** @class */ (function () {
    function Book() {
        /**课文ID */
        this.id = -1;
        /**是否是拼音 */
        this.isPinYin = true;
        /**课文类型 */
        this.type = 0;
    }
    return Book;
}());
var Word = /** @class */ (function () {
    function Word() {
        /**汉字ID */
        this.id = -1;
        /**汉字类型 */
        this.type = 0;
    }
    return Word;
}());
