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
        public static PLATFORM_LOGIN_FAIL:string = "PLATFORM_LOGIN_FAIL";
        /**资源加载完成 */
        public static GAME_RES_LOAD_FINISH:string = "GAME_RES_LOAD_FINISH";
        /**http请求进度 */
        public static HTTP_PROGRESS:string = "HTTP_PROGRESS";
        /**触摸方向事件 */
        public static TOUCH_DIRECTOR:string = "TOUCH_DIRECTOR";
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