var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-01 andy
        事件分发器
        */
        class EventManager extends Laya.EventDispatcher {
            constructor() {
                super();
                if (EventManager._ins != null)
                    throw new Error("EventManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    EventManager._ins = new EventManager();
                return this._ins;
            }
            init() {
            }
            event(type, data) {
                super.on;
                return super.event(type, new NoticeEvent(type, data));
            }
        }
        common.EventManager = EventManager;
        class NoticeEvent {
            constructor(type, data) {
                this.type = type;
                this.data = data;
            }
        }
        /**平台初始化完成 */
        NoticeEvent.PLATFORM_INIT_OVER = "PLATFORM_INIT_OVER";
        /**平台登录成功 */
        NoticeEvent.PLATFORM_LOGIN_SUCCESS = "PLATFORM_LOGIN_SUCCESS";
        /**平台登录失败 */
        NoticeEvent.PLATFORM_LOGIN_FAIL = "PLATFORM_LOGIN_FAIL";
        /**资源加载完成 */
        NoticeEvent.GAME_RES_LOAD_FINISH = "GAME_RES_LOAD_FINISH";
        /**http请求进度 */
        NoticeEvent.HTTP_PROGRESS = "HTTP_PROGRESS";
        /**触摸方向事件 */
        NoticeEvent.TOUCH_DIRECTOR = "TOUCH_DIRECTOR";
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
        common.NoticeEvent = NoticeEvent;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=EventManager.js.map