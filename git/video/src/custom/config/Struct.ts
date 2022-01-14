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
* 引导配置表
*/
class Cfg_Guide{
    constructor(){

    }
    public Id:number;
    /**暂停时间 */
    public time:number;
    /**手型坐标X */
    public handX:number;
    /**手型坐标Y  */
    public handY:number;
    /**是否检查点击区域 0.不检查 1.检查 */
    public isCheckRadius:number;
    /**引导文字 */
    public word:string;
    /**文字坐标X */
    public wordX:number;
    /**文字坐标Y  */
    public wordY:number;
}
/*
* 游戏配置表
*/
class Cfg_Game{
    constructor(){

    }
    public Id:number;
    /**key */
    public key:string;
    /**value */
    public value:string;
}

