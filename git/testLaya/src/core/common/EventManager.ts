namespace game.common{
    /*
    * 2019-03-01 andy
    事件分发器
    */
    export class EventManager extends Laya.EventDispatcher{

        private static _ins:EventManager;
        public static get ins():EventManager{
            if(!this._ins)
                EventManager._ins=new EventManager();
            return this._ins;
        }
        constructor(){
            super();
            if(EventManager._ins != null)
                throw new Error("EventManager is single!");
        }
        public init():void{

        }

        event(type:string,data?:any):boolean{super.on
            return super.event(type,new NoticeEvent(type,data));
        }

    }

    export class NoticeEvent{
        public data:any;
        public type:string;
        constructor(type:string,data?:any){
            this.type = type;
            this.data = data;
        }
        /**平台初始化完成 */
        public static PLATFORM_INIT_OVER:string = "PLATFORM_INIT_OVER";
        /**平台登录成功 */
        public static PLATFORM_LOGIN_SUCCESS:string = "PLATFORM_LOGIN_SUCCESS";
        /**平台登录失败 */
        public static PLATFORM_LOGIN_FAIL:string = "GAME_RES_LOAD_FINISH";
        /**资源加载完成 */
        public static GAME_RES_LOAD_FINISH:string = "GAME_RES_LOAD_FINISH";
        /**http请求进度 */
        public static HTTP_PROGRESS:string = "HTTP_PROGRESS";
        /**触摸事件 state 1.按下 2.弹起*/
        public static TOUCH:string = "TOUCH";
        /**触摸方向事件 */
        public static TOUCH_DIRECTOR:string = "TOUCH_DIRECTOR";
        /**摇杆方向事件 */
        public static ROCKER_DIRECTOR:string = "ROCKER_DIRECTOR";
        /**龙骨动画模板加载完成事件 */
        public static BONE_TEMP_LOAD_FINISH:string = "BONE_TEMP_LOAD_FINISH";
        /**获得焦点事件 */
        public static SYS_FOCUS:string = "SYS_FOCUS";
        /**失去焦点事件 */
        public static SYS_BLUR:string = "SYS_BLUR";
        /**竖屏事件 */
        public static SYS_SCREEN_VERTICAL:string = "SYS_SCREEN_VERTICAL";
        /**横屏事件 */
        public static SYS_SCREEN_HORIZONTAL:string = "SYS_SCREEN_HORIZONTAL";
        /**竖屏事件,引擎已经执行完毕 */
        public static SYS_SCREEN_VERTICAL_ONSIZE:string = "SYS_SCREEN_VERTICAL_ONSIZE";
        /**横屏事件,引擎已经执行完毕 */
        public static SYS_SCREEN_HORIZONTAL_ONSIZE:string = "SYS_SCREEN_HORIZONTAL_ONSIZE";


        /**游戏分数变化事件 */
        public static GAME_SCORE_UPDATE:string = "GAME_SCORE_UPDATE";
        /**游戏金币变化事件 */
        public static GAME_GOLD_UPDATE:string = "GAME_GOLD_UPDATE";
        /**游戏等级变化事件 */
        public static GAME_LEVEL_UPDATE:string = "GAME_LEVEL_UPDATE";
        /**游戏结束事件 */
        public static GAME_OVER:string = "GAME_OVER";
        /**游戏再来一次事件 */
        public static GAME_AGIN:string = "GAME_AGIN";
        /**游戏下一关事件 */
        public static GAME_NEXT:string = "GAME_NEXT";
        /**游戏警告事件 */
        public static GAME_WARNING:string = "GAME_WARNING";
        /**空投结束事件 */
        public static EFT_AIR_DROP_OVER:string = "EFT_AIR_DROP_OVER";

        /**图片转文字 */
        public static AI_IMAGE_TO_WORD:string = "AI_IMAGE_TO_WORD";
        //子域
        /**尺寸发生变化 */
        public static ZY_RESIZE:string = "ZY_RESIZE";
        /**登录成功 */
        public static ZY_LOGIN:string = "ZY_LOGIN";
        /**显示排行 */
        public static ZY_RANK:string = "ZY_RANK";
        /**上报分数 */
        public static ZY_SCORE:string = "ZY_SCORE";
    } 
}