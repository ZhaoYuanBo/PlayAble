/*
* name;
*/
var CustomDefine = /** @class */ (function () {
    function CustomDefine() {
    }
    /**配置数据HTTP地址 */
    CustomDefine.dataConfigUrl = Define.CDN + "/config/cfg_data.json";
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
    /**事件：警告红蓝灯 */
    CustomDefine.EVENT_LIGHT = "EVENT_LIGHT";
    //自定义动画------------------
    CustomDefine.animGuide = "guide";
    CustomDefine.animGuideDesc = "guideDesc";
    CustomDefine.animShake = "animShake";
    CustomDefine.animHeadShake = "animHeadShake";
    CustomDefine.animDanger = "animDanger";
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
    /**当前使用的武器ID */
    LocalKey.GUN_ID = "GUN_ID";
    return LocalKey;
}());
