/*
2019-05-10 andy
* 上下运输
*/
class Boy extends BaseKing{
    //农田信息
    private boys:Boys;
    //农田信息
    private farm:Farm;
    //管理员
    private farmerAdmin:Leader;
    //采摘进度条
    private loadBar:Laya.ProgressBar;
    /**篮子水果金币标识 */
    private imgGold:Laya.Image;
    /**篮子水果金币数量 */
    private txtGold:Laya.Label;
    /**篮子水果标识 */
    private imgFruit:Laya.Image;

    private lastTime:number=0;
    /**单次采摘时间 */
    public loadSpeed:number=2000;
    /**单次采摘数量 */
    public loadCount:number=100;
    //最上边
    private minY:number=800;

    constructor(boys:Boys){
        super();
        this.boys=boys;

        this.loadBar=new Laya.ProgressBar("game/loading_yellow.png");
        this.loadBar.x=30;this.loadBar.y=-40;
        this.addChild(this.loadBar);
        this.loadBar.visible=false;

        this.imgGold=new Laya.Image();
        this.imgGold.x=20;this.imgGold.y=-15;this.imgGold.scaleX=this.imgGold.scaleY=0.6;
        this.imgGold.skin="game/img_gold.png";
        this.addChild(this.imgGold);

        this.txtGold=new Laya.Label();
        this.txtGold.x=55;this.txtGold.y=-15;
        this.txtGold.fontSize=30;
        this.txtGold.color="#ffffff";
        this.txtGold.bold=true;
        this.txtGold.text="0";
        this.addChild(this.txtGold);

        
        this.imgFruit=new Laya.Image();
        this.imgFruit.x=15;this.imgFruit.y=70;this.imgFruit.scaleX=this.imgFruit.scaleY=0.8;
        this.imgFruit.skin="game/img_boy_fruit_1.png";
        this.addChild(this.imgFruit);
        this.imgFruit.visible=false;

        this.x=10;
    }
    public init():void{
        super.init();
        this.setActionType(ActionType.Wait);

        let arrAction:Array<Action>=[new Action(ActionType.Wait,3),new Action(ActionType.Up,5),new Action(ActionType.Down,5)];
        let skinData:SkinData=new SkinData("king","boy",arrAction);
        this.setSkin(skinData,true);

        this.speed=2;
        this.interval=100;
        this.width=145,this.height=200;
        
        this.y=800;
        this.minY=this.y;

        this.mouseEnabled=true;
        this.on(Laya.Event.CLICK,this,this.clickBoy);
    }
    private clickBoy(e:Event):void{
        if(!this.farmerAdmin && this.curAticonType==ActionType.Wait){
            this.boys.autoCheck(true);
            if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_3){
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    }
    public setFarm(farm:Farm):void{
        this.farm=farm;
    }
    /**
     * 
     */
    public update():void{
        if(this.curAticonType == ActionType.Wait){
            //待机
            if(this.farm){
                this.setActionType(ActionType.Down);
            }
        }else if(this.curAticonType == ActionType.Left){
            
        }else  if(this.curAticonType == ActionType.Right){
            
        }else  if(this.curAticonType == ActionType.Up){
            if(this.y-this.speed>this.minY){
                this.pos(this.x,this.y-this.speed);
            }else{
                //到达上边，开始卸载水果
                if(this.txtGold.text=="0"){
                    this.setActionType(ActionType.Down);
                    return;
                }
                if(!this.loadBar.visible){
                    this.lastTime= Laya.timer.currTimer;
                    this.loadBar.visible=true;
                }
                this.loadBar.value= (Laya.timer.currTimer-this.lastTime)/this.loadSpeed;
                if(this.loadBar.value>=1){
                    this.boys.addGold(Number(this.txtGold.text));
                    this.loadBar.visible=false;
                    this.imgFruit.visible=false;
                    this.txtGold.text="0";
                    if(!this.farm){
                        this.setActionType(ActionType.Wait);
                    }

                    if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_4){
                        EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                    }
                }
            }
        }else  if(this.curAticonType == ActionType.Down){
            if(!this.farm){
                return;
            }
            if(this.y+this.speed+this.height<this.farm.cfgFarm.targetY+120){
                this.pos(this.x,this.y+this.speed);
            }else{
                //到达下边篮子，开始收集
                if(this.farm.isBasketEmpty()){
                    this.setActionType(ActionType.Up);
                    return;
                }
                this.farm.getBasketFruit(true);
                if(!this.loadBar.visible){
                    this.lastTime= Laya.timer.currTimer;
                    this.loadBar.visible=true;
                }
                this.loadBar.value= (Laya.timer.currTimer-this.lastTime)/this.loadSpeed;
                if(this.loadBar.value>=1){
                    let getCount:number=this.farm.getBasketFruit(false,this.loadCount);
                    this.loadBar.visible=false;
                    this.txtGold.text=getCount+"";
                    this.imgFruit.visible=true;
                    this.setActionType(ActionType.Up);
                    this.farm=null;
                }
            }
        }else{
            console.log("没有方向");
        }  
    }

    public dead():void{
        this.removeSelf();
        
    }

    
}