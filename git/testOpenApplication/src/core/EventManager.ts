/*
* 2019-03-01 andy
事件分发器
*/
class EventManager extends Laya.EventDispatcher{

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

    event(type:string,data?:any):boolean{
        return super.event(type,new EventKey(type,data));
    }

}
/**事件 */
class EventKey{
    public data:any;
    public type:string;
    constructor(type:string,data?:any){
        this.type = type;
        this.data = data;
    }

    /**尺寸发生变化 */
    public static ZY_RESIZE:string = "ZY_RESIZE";
    /**登录成功 */
    public static ZY_LOGIN:string = "ZY_LOGIN";
    /**显示排行 */
    public static ZY_RANK:string = "ZY_RANK";
    /**上报分数 */
    public static ZY_SCORE:string = "ZY_SCORE";



    /** 从云端获得排行数据 */
    public static GET_RANK:string = "GET_RANK";
} 