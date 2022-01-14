/*
* 2019-03-15 andy
游戏配置数据
*/
class DataConfig{
    /**道具配置表 */
    public arrItem:Array<Array<Cfg_Item>>;
    /**等级配置表 */
    public arrLevel:Array<Cfg_Level>;
    /**关卡配置表 */
    public arrPass:Array<Array<Cfg_Pass>>;
    /**小刀配置表 */
    public arrKinfe:Array<Array<Cfg_Knife>>;

    private static _ins:DataConfig;
    public static get ins():DataConfig{
		if(!this._ins)
			DataConfig._ins=new DataConfig();
		return this._ins;
	}
    constructor(){
        if(DataConfig._ins != null)
			throw new Error("DataConfig is single!");
    }

    public init(http:any):void{
        console.log("DataConfig:"+http);
        this.arrItem=[];
        let table:any = http.Items;

        // let Items:Array<Cfg_Item>=table.Cfg_Item;
        // for(let Item of Items){
        //     if(!this.arrItem[Item.itemType]){
        //         this.arrItem[Item.itemType]=new Array<Cfg_Item>();
        //     }
        //     this.arrItem[Item.itemType].push(Item);
        // }

        this.arrLevel=[];
        let levels:Array<Cfg_Level>=table.Cfg_Level;
        for(let cfg of levels){
            cfg.speed = cfg.speed/1000;
            cfg.arrPass= cfg.randPass.split(',');
            cfg.minCount=Number(cfg.randCount.split(',')[0]);
            cfg.maxCount=Number(cfg.randCount.split(',')[1]);
            this.arrLevel[cfg.lvl]=cfg;
        }

        this.arrPass=[];
        let pass:Array<Cfg_Pass>=table.Cfg_Pass;
        for(let Item of pass){
            if(!this.arrPass[Item.lvl]){
                this.arrPass[Item.lvl]=new Array<Cfg_Pass>();
            }
            this.arrPass[Item.lvl].push(Item);
        }

        this.arrKinfe=[];
        let knife:Array<Cfg_Knife>=table.Cfg_Knife;
        for(let Item of knife){
            if(!this.arrKinfe[Item.type]){
                this.arrKinfe[Item.type]=new Array<Cfg_Knife>();
            }
            this.arrKinfe[Item.type].push(Item);
        }

    }

    /**获得道具 */
    public getItem(type:number,ItemIndex:number):Cfg_Item{
        if(!this.arrItem){
            this.arrItem=[];
        }
        if(ItemIndex<=this.arrItem[type].length){
            let Item:Cfg_Item=this.arrItem[type][ItemIndex];
            return Item;
        }else{
            return null;
        }
    }
    /**获得道具 */
    public getItems(type:number):Array<Cfg_Item>{
        return this.arrItem[type];
    }

    /**获得关卡 */
    public getLevel(lvl:number):Cfg_Level{
        return this.arrLevel[lvl];
    }

    /**获得关卡 */
    public getPasss(lvl:number):Array<Cfg_Pass>{
        return this.arrPass[lvl];
    }
    /**获得小刀 */
    public getKinfes(type:number):Array<Cfg_Knife>{
        return this.arrKinfe[type];
    }

}
