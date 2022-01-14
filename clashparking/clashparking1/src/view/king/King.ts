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
        // this.speed=cfgLevel.speed;
        this.interval=cfgLevel.speedTime;
        this.width=70,this.height=125;
        this.x=MathUtil.randomRange(0,Define.DeviceW);
        this.y=MathUtil.randomRange(0,Define.DeviceH);
    }
    /**
     * 
     */
    public update():void{
       
        // this.checkPosition();
    }

    public dead():void{
        // this.removeSelf();  
    }

    private checkPosition():void{
        // if(Laya.timer.currTimer-this.lastTime>=10000){
        //     this.lastTime=Laya.timer.currTimer;
        //     let randIndex:number=MathUtil.randomRange(0,3);
        //     this.setActionType(randIndex);
        // }
        
    }
}