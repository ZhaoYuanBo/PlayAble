/*
* 道具
*/
export class Cfg_Item{
    constructor(){

    }
    public id:number;
    public itemName:string;
    public itemType:number;
    public itemIcon:string;
}
/*
* 等级经验表
*/
export class Cfg_Level{
    constructor(){

    }
    public id:number;
    public lvl:number;
    /**需要经验 */
    public exp:number;
    /**时间 */
    public time:number;
    /**速度 */
    public speed:number;
    /**速度间隔 */
    public speedTime:number;
    /**可随机的关卡*/
    public randPass:string;
    /**可随机的关卡*/
    public randCount:string;

    /**最小个数 */
    public minCount:number;
    /**最大个数 */
    public maxCount:number;
    /**可随机的关卡 */
    public arrPass:Array<string>;
    /**子弹数量 */
    public bulletCount:number;
    /**射击目标数量 */
    public hitItemCount:number;
}
/*
* 关卡表
*/
export class Cfg_Pass{
    constructor(){

    }
    public id:number;
    public lvl:number;
    /**可随机的关卡 */
    public arrPos:Array<Laya.Vector3>;
}

/*
* 射击目标
*/
export class Cfg_HitItem{
    constructor(){

    }
    public id:number;
    /**类型 1.圆柱 2.长方体*/
    public type:number;
    /**射击目标长 */
    public long:number;
    /**射击目标宽*/
    public width:number;
    /**射击目标高 */
    public height:number;
    /**射击目标半径 */
    public radis:number;
    /**射击目标质量 */
    public mass:number;
    /**射击目标弹力 */
    public restitution:number;
    /**射击目标摩檫力 */
    public friction:number;
    
}