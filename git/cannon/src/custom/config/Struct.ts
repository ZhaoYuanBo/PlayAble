/*
* 道具
*/
class Cfg_Item{
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
class Cfg_Level{
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
}
/*
* 关卡表
*/
class Cfg_Pass{
    constructor(){

    }
    public id:number;
    public lvl:number;
    /**初始角度 */
    public initAngle:number;
    /**半径 */
    public radius:number;
    /**旋转角度 */
    public rotateAngle:number;
    /**是否自身旋转 */
    public rotateSelf:boolean;
}
/*
* 小刀表
*/
class Cfg_Knife{
    constructor(){

    }
    public id:number;
    /**类型 */
    public type:number;
    /**开放类型 */
    public openType:number;
    /**开放参数 */
    public openParam:number;
}

/*
* 农田表
*/
class Cfg_Farm{
    constructor(){

    }
    public id:number;
    public lvl:number;
    /**农田活动范围X */
    public minX:number;
    /**农田活动范围X */
    public maxX:number;
    /**农田X */
    public targetX:number;
    /**农田Y */
    public targetY:number;
    /**农民移动速度 单位像素*/
    public moveSpeed:number;
    /**农民采摘速度 单位毫秒*/
    public loadSpeed:number;
    /**动画播放间隔时间 单位毫秒*/
    public frameTime:number;
}