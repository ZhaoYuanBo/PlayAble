/*
* name;
*/
class King extends BaseKing{
    private lastTime:number=0;
    constructor(){
        super();
    }
    public init():void{
        super.init();

        let cfgLevel:Cfg_Level=DataConfig.ins.getLevel(UserSelfModel.ins.lvl);
        this.speed=cfgLevel.speed;
        this.interval=cfgLevel.speedTime;
        this.width=70,this.height=125;
        this.x=MathUtil.randomRange(0,Define.DeviceW);
        this.y=MathUtil.randomRange(0,Define.DeviceH);
    }
    /**
     * 
     */
    public update():void{
        if(this.curAticonType == ActionType.Left){
            if(this.x-this.speed>0){
                this.pos(this.x-this.speed,this.y);
            }else{
                this.setActionType(ActionType.Right);
            }
        }else  if(this.curAticonType == ActionType.Right){
            if(this.x+this.speed+this.width<Define.DeviceW){
                this.pos(this.x+this.speed,this.y);
            }else{
                this.setActionType(ActionType.Left);
            }
        }else  if(this.curAticonType == ActionType.Up){
            if(this.y-this.speed>0){
                this.pos(this.x,this.y-this.speed);
            }else{
                this.setActionType(ActionType.Down);
            }
        }else  if(this.curAticonType == ActionType.Down){
            if(this.y+this.speed+this.height<Define.DeviceH){
                this.pos(this.x,this.y+this.speed);
            }else{
                this.setActionType(ActionType.Up);
            }
        }else{
            console.log("没有方向");
        }
        this.checkPosition();
    }

    public dead():void{
        this.removeSelf();
        
    }

    private checkPosition():void{
        if(Laya.timer.currTimer-this.lastTime>=10000){
            this.lastTime=Laya.timer.currTimer;
            let randIndex:number=MathUtil.randomRange(0,3);
            this.setActionType(randIndex);
        }
        
    }
}