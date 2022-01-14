/*
2019-05-13 andy
* 上下传输
*/
class Boys extends Laya.Sprite{
    /**农田 */
    public arrFarm:Array<Farm>;
    /**boys */
    public arrBoy:Array<Boy>;
    //管理员
    private farmerAdmin:Leader;
    /**篮子水果金币标识 */
    private imgGold:Laya.Image;
    /**篮子水果金币数量 */
    private txtGold:Laya.Label;
    
    constructor(arrFarm:Array<Farm>){
        super();
        this.arrFarm=arrFarm;
        this.x=0;
        this.y=600;
        this.arrBoy=[];

        this.imgGold=new Laya.Image();
        this.imgGold.x=40;this.imgGold.y=22;this.imgGold.scaleX=this.imgGold.scaleY=0.6;
        this.imgGold.skin="game/img_gold.png";
        this.addChild(this.imgGold);

        this.txtGold=new Laya.Label();
        this.txtGold.x=75;this.txtGold.y=22;
        this.txtGold.fontSize=30;
        this.txtGold.color="#ffffff";
        this.txtGold.bold=true;
        this.txtGold.text="0";
        this.addChild(this.txtGold);

        LayerManager.ins.addChild(this,LayerName.scene_map);
        this.init();
    }
    public init():void{
        this.createKing();
        
    }

    //创建生物
    private createKing():void{
        let boy:Boy=new Boy(this);
        boy.init();
        this.arrBoy.push(boy);
    }
    /**
     * 检测农田是否有产出，有产出派出一个boy去收集
     */
    public autoCheck(autoMust:boolean=false):void{
        if(!this.farmerAdmin && !autoMust){
            return;
        }
        for(let farm of this.arrFarm){
            if(farm.moneyCount>0){
                this.arrBoy[0].setFarm(farm);
            }
        }
    }
    
    /**
     * 
     */
    public update():void{
        for(let boy of this.arrBoy){
            boy.update();
        }

        this.autoCheck();
    }

    /**
     * 计算妈妈可以拿走的金币
     * @param loadCount 
     */
    public getGold(loadCount:number=0):number{
        let ret:number=0;
        let goldCount:number=GameModel.ins.boy_gold;
        if(loadCount<goldCount){
            ret=loadCount;
        }else{
            ret=goldCount;
        }
        GameModel.ins.boy_gold-=ret;
        this.txtGold.text= GameModel.ins.boy_gold+"";
        return ret;
    } 
    /**
     * 
     * @param count 
     */
    public addGold(count:number):void{
        GameModel.ins.boy_gold+=count;
        this.txtGold.text= GameModel.ins.boy_gold+"";
        
    }
    
}