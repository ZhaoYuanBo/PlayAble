/*
2019-05-10 andy
* 左右运输
*/
class Mother extends BaseKing{
    //农田信息
    private mothers:Mothers;
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
    private minX:number=0;
    //目标农田X
    private targetX:number=0;

    constructor(mothers:Mothers){
        super();
        this.mothers=mothers;

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
        this.imgFruit.x=67;this.imgFruit.y=45;this.imgFruit.scaleX=this.imgFruit.scaleY=0.6;
        this.imgFruit.skin="game/img_mother_fruit_1.png";
        this.addChild(this.imgFruit);
        this.imgFruit.visible=false;

        this.mothers.addChild(this);
    }
    public init():void{
        super.init();
        this.setActionType(ActionType.Wait);

        let arrAction:Array<Action>=[new Action(ActionType.Wait,5),new Action(ActionType.Left,5),new Action(ActionType.Right,5)];
        let skinData:SkinData=new SkinData("king","mother",arrAction);
        this.setSkin(skinData,false);
        
        this.speed=2;
        this.interval=100;
        this.width=105,this.height=114;
        this.targetX=400;
        this.x=this.targetX-50;
        this.minX=(this.width>>1)+50;
        this.pivotX=this.minX;

        this.mouseEnabled=true;
        this.on(Laya.Event.CLICK,this,this.clickBoy);
    }
    private clickBoy(e:Event):void{
        if(!this.farmerAdmin && this.curAticonType==ActionType.Wait){
            if(GameModel.ins.boy_gold>0){
                this.setActionType(ActionType.Left);
            }
            if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_5){
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    }

    /**
     * 
     */
    public update():void{
        if(this.curAticonType == ActionType.Wait){
            //待机
        }else if(this.curAticonType == ActionType.Left){
            if(this.x-this.speed>this.minX){
                this.pos(this.x-this.speed,this.y);
            }else{
                //到达左边,如果没有东西，不用装载
                if(GameModel.ins.boy_gold<=0){
                    if(this.farmerAdmin){
                        this.setActionType(ActionType.Right);
                    }
                    return;
                }
                //开始装载
                if(!this.loadBar.visible){
                    this.lastTime= Laya.timer.currTimer;
                    this.loadBar.visible=true;
                }
                this.loadBar.value= (Laya.timer.currTimer-this.lastTime)/this.loadSpeed;
                if(this.loadBar.value>=1){
                    let getCount:number=this.mothers.getLoadGold(this.loadCount);
                    this.loadBar.visible=false;
                    this.imgFruit.visible=getCount>0;
                    
                    this.txtGold.text=getCount+"";
                    this.setActionType(ActionType.Right);
                }
            }
        }else  if(this.curAticonType == ActionType.Right){
            if(this.x+this.speed<this.targetX){
                this.pos(this.x+this.speed,this.y);
            }else{
                //到达右边，如果车上没有东西，不用卸载
                if(this.txtGold.text=="0"){
                    if(this.farmerAdmin){
                        this.setActionType(ActionType.Left);
                    }
                    return;
                }
                //到达右边，开始卸载
                if(!this.loadBar.visible){
                    this.lastTime= Laya.timer.currTimer;
                    this.loadBar.visible=true;
                }
                this.loadBar.value= (Laya.timer.currTimer-this.lastTime)/this.loadSpeed;
                if(this.loadBar.value>=1){
                    this.loadBar.visible=false;
                    this.imgFruit.visible=false;

                    var globalPos:Laya.Point = this.localToGlobal(new Laya.Point(0,0));
                    TipManager.ins.showWord("+"+this.txtGold.text,globalPos.x,globalPos.y-10,-60,36,"#fbd92c");
                    GameModel.ins.addScore(Number(this.txtGold.text));
                    this.txtGold.text="0";
                    if(GameModel.ins.guideStep==GUIDE_STEP.GUIDE_6){
                        EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                    }
                    if(GameModel.ins.boy_gold>0){
                        this.setActionType(ActionType.Left);
                    }else{
                        this.setActionType(ActionType.Wait);
                    }
                }
            }
        }else  if(this.curAticonType == ActionType.Up){
            
        }else  if(this.curAticonType == ActionType.Down){
            
        }else{
            console.log("没有方向");
        }  
    }

    public dead():void{
        this.removeSelf();
        
    }

    
}