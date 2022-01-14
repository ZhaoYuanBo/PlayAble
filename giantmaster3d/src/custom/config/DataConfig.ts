import { Cfg_Item, Cfg_Level, Cfg_Pass, Cfg_HitItem} from "./Struct";

/*
* 2019-03-15 andy
游戏配置数据
*/
export class DataConfig{
    /**道具配置表 */
    public arrItem:Array<Array<Cfg_Item>>;
    /**等级配置表 */
    public arrLevel:Array<Cfg_Level>;
    /**关卡配置表 */
    public arrPass:Array<Cfg_Pass>;
    /**关卡射击目标表 */
    public arrHitItem:Array<Cfg_HitItem>;

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
        // this.arrItem=[];
        // let table:any = http.Items;

        // let Items:Array<Cfg_Item>=table.Cfg_Item;
        // for(let Item of Items){
        //     if(!this.arrItem[Item.itemType]){
        //         this.arrItem[Item.itemType]=new Array<Cfg_Item>();
        //     }
        //     this.arrItem[Item.itemType].push(Item);
        // }

        // this.arrLevel=[];
        // let levels:Array<Cfg_Level>=table.Cfg_Level;
        // for(let cfg of levels){
        //     cfg.speed = cfg.speed/1000;
        //     cfg.arrPass= cfg.randPass.split(',');
        //     this.arrLevel[cfg.lvl]=cfg;
        // }

        // this.arrPass=[];
        // let pass:Array<Cfg_Pass>=table.Cfg_Pass;
        // for(let Item of pass){
        //     if(!this.arrPass[Item.lvl]){
        //         this.arrPass[Item.lvl]=new Array<Cfg_Pass>();
        //     }
        //     this.arrPass[Item.lvl].push(Item);
        // }

        //等级
        this.arrLevel=[];
        let cfgLevel:Cfg_Level=new Cfg_Level();
        cfgLevel.id=1;
        cfgLevel.lvl=1;
        cfgLevel.bulletCount=5;
        cfgLevel.hitItemCount=40;
        this.arrLevel[cfgLevel.id]=cfgLevel;

        cfgLevel=new Cfg_Level();
        cfgLevel.id=2;
        cfgLevel.lvl=2;
        cfgLevel.bulletCount=20;
        cfgLevel.hitItemCount=10;
        this.arrLevel[cfgLevel.id]=cfgLevel;

        cfgLevel=new Cfg_Level();
        cfgLevel.id=3;
        cfgLevel.lvl=3;
        cfgLevel.bulletCount=30;
        cfgLevel.hitItemCount=10;
        this.arrLevel[cfgLevel.id]=cfgLevel;

        //射击目标
        this.arrHitItem=[];
        let cfgHitItem:Cfg_HitItem=new Cfg_HitItem();
        cfgHitItem.id=1;
        cfgHitItem.type=1;
        cfgHitItem.radis=2;
        cfgHitItem.height=4;
        cfgHitItem.mass=2;
        cfgHitItem.restitution=0;
        cfgHitItem.friction=10;
        this.arrHitItem[cfgHitItem.id]=cfgHitItem;

        cfgHitItem=new Cfg_HitItem();
        cfgHitItem.id=2;
        cfgHitItem.type=2;
        cfgHitItem.long=4;
        cfgHitItem.width=4;
        cfgHitItem.height=4;
        cfgHitItem.mass=2;
        cfgHitItem.restitution=0;
        cfgHitItem.friction=10;
        this.arrHitItem[cfgHitItem.id]=cfgHitItem;

        cfgHitItem=new Cfg_HitItem();
        cfgHitItem.id=3;
        cfgHitItem.type=2;
        cfgHitItem.long=4;
        cfgHitItem.width=4;
        cfgHitItem.height=4;
        cfgHitItem.mass=4;
        cfgHitItem.restitution=0;
        cfgHitItem.friction=10;
        this.arrHitItem[cfgHitItem.id]=cfgHitItem;

        //射击阵型
        let pass:Cfg_Pass=new Cfg_Pass();
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

    /**获得关卡 */
    public getPasss(lvl:number):Cfg_Pass{
        return this.arrPass[lvl];
    }


    /**获得射击目标 */
    public getHitItem(lvl:number):Cfg_HitItem{
        return this.arrHitItem[lvl];
    }
}
