/*
2019-05-08 andy
* 农民
*/
class Farmer extends BaseKing{
    //农田信息
    private farm:Farm;
    /**篮子水果标识 */
    private imgFruit:Laya.Image;

    //采摘时间
    public loadSpeed:number=2000;
    //采摘进度条
    private loadBar:Laya.ProgressBar;
    private lastTime:number=0;
     

    constructor(){
        super();
        //加载条
        this.loadBar=new Laya.ProgressBar("game/loading_yellow.png");
        this.loadBar.y=-20;
        this.addChild(this.loadBar);
        this.loadBar.visible=false;

        this.imgFruit=new Laya.Image();
        this.imgFruit.x=30;this.imgFruit.y=30;this.imgFruit.scaleX=this.imgFruit.scaleY=0.6;
        this.imgFruit.skin="game/img_farmer_fruit_1.png";
        this.addChild(this.imgFruit);
        this.imgFruit.visible=false;
    }
    public init():void{
        super.init();
        this.setActionType(ActionType.Wait);

        let arrAction:Array<Action>=[new Action(ActionType.Wait,5),new Action(ActionType.Left,5),new Action(ActionType.Right,5),new Action(ActionType.ATTACK,5)];
        let skinData:SkinData=new SkinData("king","farmer",arrAction);
        this.setSkin(skinData,false);

        
        this.width=105,this.height=114;

        this.mouseEnabled=true;
        this.on(Laya.Event.CLICK,this,this.clickFarmer);
    }
    private clickFarmer(e:Event):void{
        if(!this.farm.leader && this.curAticonType==ActionType.Wait){
            this.setActionType(ActionType.Right);
            if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_1){
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    }
    /**
     * 设置所属农场
     * @param farm 
     */
    public setFarm(farm:Farm):void{
        this.farm=farm;
        this.x=this.farm.cfgFarm.minX;
        this.y=-20;
        this.speed=this.farm.cfgFarm.moveSpeed;
        this.loadSpeed=this.farm.cfgFarm.loadSpeed;
        this.interval=this.farm.cfgFarm.frameTime;
        this.farm.addChild(this);
    }

    /**
     * 
     */
    public update():void{
        if(this.curAticonType == ActionType.Wait){
            //待机
            if(this.farm.leader){
                this.setActionType(ActionType.Right);
            }
        }else if(this.curAticonType == ActionType.Left){
            if(this.x-this.speed>this.farm.cfgFarm.minX){
                this.pos(this.x-this.speed,this.y);
            }else{
                //到达左边篮子,放下水果
                if(this.farm.leader){
                    this.setActionType(ActionType.Right);
                }else{
                    //this.setActionType(ActionType.Wait);
                    if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_2){
                        EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                    }
                    this.setActionType(ActionType.Wait);
                }
                this.imgFruit.visible=false;
                this.farm.showBasketFruit(true);
            }
        }else  if(this.curAticonType == ActionType.Right){
            if(this.x+this.speed+this.width<this.farm.cfgFarm.maxX){
                this.pos(this.x+this.speed,this.y);
            }else{
                //到达右边树下，开始采摘
                this.lastTime= Laya.timer.currTimer;
                this.setActionType(ActionType.ATTACK);
                this.farm.attackTree(true);
            }
        }else  if(this.curAticonType == ActionType.Up){
            
        }else  if(this.curAticonType == ActionType.Down){
            
        }else  if(this.curAticonType == ActionType.ATTACK){
            this.loadBar.value= (Laya.timer.currTimer-this.lastTime)/this.loadSpeed;
            if(!this.loadBar.visible){
                this.loadBar.visible=true;
            }
            if(this.loadBar.value>=1){
                this.farm.attackTree(false);
                this.loadBar.visible=false;
                this.imgFruit.visible=true;
                this.setActionType(ActionType.Left);
            }
            
        }else{
            console.log("没有方向");
        }
        
    }

    public dead():void{
        this.removeSelf();
        
    }

    
}