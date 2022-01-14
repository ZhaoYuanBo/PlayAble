var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-01 andy
        事件分发器
        */
        var EventManager = /** @class */ (function (_super) {
            __extends(EventManager, _super);
            function EventManager() {
                var _this = _super.call(this) || this;
                if (EventManager._ins != null)
                    throw new Error("EventManager is single!");
                return _this;
            }
            Object.defineProperty(EventManager, "ins", {
                get: function () {
                    if (!this._ins)
                        EventManager._ins = new EventManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            EventManager.prototype.init = function () {
            };
            EventManager.prototype.event = function (type, data) {
                _super.prototype.on;
                return _super.prototype.event.call(this, type, new NoticeEvent(type, data));
            };
            return EventManager;
        }(Laya.EventDispatcher));
        common.EventManager = EventManager;
        var NoticeEvent = /** @class */ (function () {
            function NoticeEvent(type, data) {
                this.type = type;
                this.data = data;
            }
            /**平台初始化完成 */
            NoticeEvent.PLATFORM_INIT_OVER = "PLATFORM_INIT_OVER";
            /**平台登录成功 */
            NoticeEvent.PLATFORM_LOGIN_SUCCESS = "PLATFORM_LOGIN_SUCCESS";
            /**平台登录失败 */
            NoticeEvent.PLATFORM_LOGIN_FAIL = "GAME_RES_LOAD_FINISH";
            /**资源加载完成 */
            NoticeEvent.GAME_RES_LOAD_FINISH = "GAME_RES_LOAD_FINISH";
            /**http请求进度 */
            NoticeEvent.HTTP_PROGRESS = "HTTP_PROGRESS";
            /**触摸事件 state 1.按下 2.弹起*/
            NoticeEvent.TOUCH = "TOUCH";
            /**触摸方向事件 */
            NoticeEvent.TOUCH_DIRECTOR = "TOUCH_DIRECTOR";
            /**摇杆方向事件 */
            NoticeEvent.ROCKER_DIRECTOR = "ROCKER_DIRECTOR";
            /**龙骨动画模板加载完成事件 */
            NoticeEvent.BONE_TEMP_LOAD_FINISH = "BONE_TEMP_LOAD_FINISH";
            /**获得焦点事件 */
            NoticeEvent.SYS_FOCUS = "SYS_FOCUS";
            /**失去焦点事件 */
            NoticeEvent.SYS_BLUR = "SYS_BLUR";
            /**竖屏事件 */
            NoticeEvent.SYS_SCREEN_VERTICAL = "SYS_SCREEN_VERTICAL";
            /**横屏事件 */
            NoticeEvent.SYS_SCREEN_HORIZONTAL = "SYS_SCREEN_HORIZONTAL";
            /**竖屏事件,引擎已经执行完毕 */
            NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE = "SYS_SCREEN_VERTICAL_ONSIZE";
            /**横屏事件,引擎已经执行完毕 */
            NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE = "SYS_SCREEN_HORIZONTAL_ONSIZE";
            /**游戏分数变化事件 */
            NoticeEvent.GAME_SCORE_UPDATE = "GAME_SCORE_UPDATE";
            /**游戏金币变化事件 */
            NoticeEvent.GAME_GOLD_UPDATE = "GAME_GOLD_UPDATE";
            /**游戏等级变化事件 */
            NoticeEvent.GAME_LEVEL_UPDATE = "GAME_LEVEL_UPDATE";
            /**游戏结束事件 */
            NoticeEvent.GAME_OVER = "GAME_OVER";
            /**游戏再来一次事件 */
            NoticeEvent.GAME_AGIN = "GAME_AGIN";
            /**游戏下一关事件 */
            NoticeEvent.GAME_NEXT = "GAME_NEXT";
            /**游戏警告事件 */
            NoticeEvent.GAME_WARNING = "GAME_WARNING";
            /**空投结束事件 */
            NoticeEvent.EFT_AIR_DROP_OVER = "EFT_AIR_DROP_OVER";
            /**图片转文字 */
            NoticeEvent.AI_IMAGE_TO_WORD = "AI_IMAGE_TO_WORD";
            //子域
            /**尺寸发生变化 */
            NoticeEvent.ZY_RESIZE = "ZY_RESIZE";
            /**登录成功 */
            NoticeEvent.ZY_LOGIN = "ZY_LOGIN";
            /**显示排行 */
            NoticeEvent.ZY_RANK = "ZY_RANK";
            /**上报分数 */
            NoticeEvent.ZY_SCORE = "ZY_SCORE";
            return NoticeEvent;
        }());
        common.NoticeEvent = NoticeEvent;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
