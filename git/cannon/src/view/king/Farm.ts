/*
2019-05-10 andy
* 农田
*/
class Farm extends Laya.Sprite{
    /**农田配置信息 */
    public cfgFarm:Cfg_Farm;
    /**农民 */
    public arrFarmer:Array<Farmer>;
    /**领导 */
    public leader:Leader;
    /**绿草 */
    private imgGrass:Laya.Image;
    /**苹果树1 */
    private imgTree1:Laya.Image;
    /**苹果树2 */
    private imgTree2:Laya.Image;
    /**篮子 */
    private imgBasket:Laya.Image;
    /**篮子水果 */
    private imgBasketFruit:Laya.Image;
    /**篮子水果金币标识 */
    private imgGold:Laya.Image;
    /**管理员灰色图片 */
    private imgLeader:Laya.Image;

    /**水果ID */
    private fruitId:number=1;
    /**篮子里边水果的价值 */
    public moneyCount:number=0;
    
    constructor(cfgFarm:Cfg_Farm){
        super();
        this.cfgFarm=cfgFarm;
        this.x=this.cfgFarm.targetX;
        this.y=this.cfgFarm.targetY;
        this.arrFarmer=[];

        this.imgGrass=new Laya.Image();
        this.imgGrass.y=120;
        this.imgGrass.skin="game/img_grass.png";
        this.addChild(this.imgGrass);

        this.imgTree1=new Laya.Image();
        this.imgTree1.anchorX=0.5;this.imgTree1.anchorY=1;this.imgTree1.x=430;this.imgTree1.y=80;
        this.imgTree1.skin="game/img_tree_"+this.fruitId+".png";
        this.addChild(this.imgTree1);

        this.imgTree2=new Laya.Image();
        this.imgTree2.anchorX=0.5;this.imgTree2.anchorY=1;this.imgTree2.x=500;;this.imgTree2.y=80;
        this.imgTree2.skin="game/img_tree_"+this.fruitId+".png";
        this.addChild(this.imgTree2);

        this.imgBasket=new Laya.Image();
        this.imgBasket.anchorY=1;this.imgBasket.x=15;this.imgBasket.y=80;
        this.imgBasket.skin="game/img_basket.png";
        this.addChild(this.imgBasket);

        this.imgBasketFruit=new Laya.Image();
        this.imgBasketFruit.x=4.5;this.imgBasketFruit.y=-20;
        this.imgBasketFruit.skin="game/img_basket_"+this.fruitId+".png";
        this.imgBasket.addChild(this.imgBasketFruit);
        this.imgBasketFruit.visible=false;

        this.imgGold=new Laya.Image();
        this.imgGold.x=20;this.imgGold.y=-15;this.imgGold.scaleX=this.imgGold.scaleY=0.6;
        this.imgGold.skin="game/img_gold.png";
        this.addChild(this.imgGold);
        this.imgBasketFruit.visible=false;

        
        this.imgLeader=new Laya.Image();
        this.imgLeader.x=105;this.imgLeader.y=-15;this.imgLeader.scaleX=this.imgLeader.scaleY=0.6;
        this.imgLeader.skin="game/img_manager.png";
        this.addChild(this.imgLeader);

        LayerManager.ins.addChild(this,LayerName.scene_map);
        this.init();
    }
    public init():void{
        this.createKing();
        let tt:TweenTarget=null;
        tt=new TweenTarget("farm_"+this.cfgFarm.id+"_tree1",this.imgTree1,TweenManager.ins.creatProp(TweenPropType.PING_PANG,[10]),10);
        TweenManager.ins.regTween(tt);
        tt=new TweenTarget("farm_"+this.cfgFarm.id+"_tree2",this.imgTree2,TweenManager.ins.creatProp(TweenPropType.PING_PANG,[10]),10);
        TweenManager.ins.regTween(tt);
    }
    /**
     * 设置水果ID
     * @param v 
     */
    public setFruit(v:number):void{
        this.fruitId=v;
    }
    //创建生物
    private createKing():void{
        let farmer:Farmer=new Farmer();
        farmer.init();
        farmer.setFarm(this);
        this.arrFarmer.push(farmer);
    }
    //创建领导
    public createLeader():void{
        this.leader=new Leader();
        this.leader.init();
        this.leader.setFarm(this);

        this.imgLeader.visible=false;
    }
    /**
     * 领导加速技能
     * @param rate 不要大于2
     */
    public setLeaderSpeed(rate:number=1):void{
        for(let farmer of this.arrFarmer){
            farmer.speed=this.cfgFarm.moveSpeed*rate;
            farmer.loadSpeed=this.cfgFarm.loadSpeed*(1-(rate-1));
            farmer.interval=this.cfgFarm.frameTime*(1-(rate-1));
        }
    }
    
    /**
     * 攻击果树
     * @param doing 
     */
    public attackTree(doing:boolean):void{
        if(doing){
            TweenManager.ins.play(true,"farm_"+this.cfgFarm.id+"_tree1");
            TweenManager.ins.play(true,"farm_"+this.cfgFarm.id+"_tree2");
        }else{
            TweenManager.ins.stop("farm_"+this.cfgFarm.id+"_tree1",false);
            TweenManager.ins.stop("farm_"+this.cfgFarm.id+"_tree2",false);
        } 
    }
    /**
     * 放置水果到篮子
     * @param doing 
     */
    public showBasketFruit(doing:boolean):void{
        if(doing){
            this.imgBasketFruit.visible=true;
            this.moneyCount+=100;
        }else{
            this.imgBasketFruit.visible=false;
        } 
    }

    /**
     * 收集篮子水果
     * @param doing 
     */
    public getBasketFruit(doing:boolean,loadCount:number=0):number{
        if(doing){
            this.imgBasket.rotation=-35;
            return 0;
        }else{
            
            this.imgBasket.rotation=0;
            //计算可以获得金币的数量
            let ret:number=0;
            if(loadCount<this.moneyCount){
                ret=loadCount;
            }else{
                ret=this.moneyCount;
            }
            this.moneyCount-=ret;
            this.imgBasketFruit.visible=this.moneyCount>0;
            return ret;
        } 
    }
    /**
     * 篮子是否有水果 
     */
    public isBasketEmpty():boolean{
        return !this.imgBasketFruit.visible;
    }

    /**
     * 
     */
    public update():void{
        for(let farmer of this.arrFarmer){
            farmer.update();
        }
    }
    
}