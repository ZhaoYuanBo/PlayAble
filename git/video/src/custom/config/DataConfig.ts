/*
* 2019-03-15 andy
游戏配置数据
*/
class DataConfig{
    /**道具配置表 */
    public arrItem:Array<Array<Cfg_Item>>;
    /**引导配置表 */
    public arrGuide:Array<Cfg_Guide>;
    /**游戏配置表 */
    public dicGame:Dictionary<string>;

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

        this.arrGuide=[];
        let guides:Array<Cfg_Guide>=table.Cfg_Guide;
        for(let cfg of guides){
            cfg.time =cfg.time/10;
            this.arrGuide[cfg.Id]=cfg;
        }


        this.dicGame=new Dictionary<string>();
        let games:Array<Cfg_Game>=table.Cfg_Game;
        for(let cfg of games){
            this.dicGame[cfg.key]=cfg.value;
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

    /**获得引导 */
    public getGuide(id:number):Cfg_Guide{
        return this.arrGuide[id];
    }

}
