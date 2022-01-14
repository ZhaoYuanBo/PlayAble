/*
2019-05-10 andy
* 管理员
*/
class Leader extends BaseKing{
    //农田信息
    private farm:Farm;
    /**头上图标 */
    private imgTip:Laya.Image;
    /**头上图标 */
    private imgSkill:Laya.Image;

    private lastTime:number=0;
    constructor(){
        super();
        this.imgTip=new Laya.Image();
        this.imgTip.x=15;this.imgTip.y=-50;this.imgTip.scaleX=this.imgTip.scaleY=0.7;
        this.imgTip.skin="game/img_tip.png";
        this.addChild(this.imgTip);

        this.imgSkill=new Laya.Image();
        this.imgSkill.x=5;this.imgSkill.y=5;this.imgSkill.scaleX=this.imgSkill.scaleY=0.7;
        this.imgSkill.skin="game/img_skill_move.png";
        this.imgTip.addChild(this.imgSkill);
    }
    public init():void{
        super.init();
        this.setActionType(ActionType.Wait);

        let arrAction:Array<Action>=[new Action(ActionType.Wait,3)];
        let skinData:SkinData=new SkinData("king","leader",arrAction);
        this.setSkin(skinData);

        this.interval=100;
        this.width=105,this.height=114;this.scale(0.8,0.8);
        this.x=100;
        this.y=-50;

        this.imgTip.mouseEnabled=true;
        this.imgTip.on(Laya.Event.CLICK,this,this.clickFarmer);
    }
    private clickFarmer(e:Event):void{
        if(this.imgTip.visible){
            this.imgTip.visible=false;
            this.farm.setLeaderSpeed(1.5);
            if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_7){
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    }
    /**
     * 
     */
    public update():void{
        if(this.curAticonType == ActionType.Wait){
            
        }else if(this.curAticonType == ActionType.Left){
            
        }else  if(this.curAticonType == ActionType.Right){
            
        }else  if(this.curAticonType == ActionType.Up){
            
        }else  if(this.curAticonType == ActionType.Down){
            
        }else  if(this.curAticonType == ActionType.ATTACK){
           
        }else{
            console.log("没有方向");
        }
        //this.checkPosition();
    }
    /**
     * 设置所属农场
     * @param farm 
     */
    public setFarm(farm:Farm):void{
        this.farm=farm;
        this.farm.addChild(this);
    }

    public dead():void{
        this.removeSelf();
        
    }

    private checkPosition():void{
        if(Laya.timer.currTimer-this.lastTime>=10000){
            this.lastTime=Laya.timer.currTimer;
            let randIndex:number=MathUtil.randomRange(1,2);
            this.setActionType(randIndex);
        }
        
    }
}