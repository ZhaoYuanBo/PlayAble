/*
* 2019-03-15 andy
游戏配置数据
*/
class DataConfig{
    /**道具配置表 */
    public arrItem:Array<Array<Cfg_Item>>;
    /**等级配置表 */
    public arrLevel:Array<Cfg_Level>;
    // /**怪物配置表 */
    // public arrMonster:Array<Cfg_Monster>;
    

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
            this.arrLevel[cfg.lvl]=cfg;
        }

        // this.arrMonster=[];
        // let monsters:Array<Cfg_Monster>=table.Cfg_Monster;
        // for(let cfg of monsters){
        //     this.arrMonster[cfg.id]=cfg;
        // }

        FrameManager.ins.init(table.Cfg_Frame);
        KingManager.ins.initData(table.Cfg_Action);
        SkillManager.ins.initData(table.Cfg_Skill);
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

    /**获得等级 */
    public getLevel(lvl:number):Cfg_Level{
        return this.arrLevel[lvl];
    }
    // /**获得怪物 */
    // public getMonster(id:number):Cfg_Monster{
    //     return this.arrMonster[id];
    // }
    
}
