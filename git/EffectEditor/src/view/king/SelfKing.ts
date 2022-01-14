/*
* 2019-12-03 andy
主角
*/
class SelfKing extends King{
    /**等级经验配置 */
    public cfg_level:Cfg_Level;

    private tempEnemy:King;
    private radian:number=0;
    constructor(){
        super();
    }
    public init():void{
        super.init();
        this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
        this.hpBar = GameCtrl.ins.barHp;
        //技能列表

        //动作别来
        
        let arrAction:Array<Action>=KingManager.ins.getActionBySkin("role");
        let skinData:SkinData=new SkinData("king","role",arrAction);
        this.setSkin(skinData,false);
        LayerManager.ins.addChild(this,LayerName.scene_king);
        this.setActionDirect(ActionDirect.Right);
        this.setActionType(ActionType.Wait,true);
        // this.regNextAction(ActionType.SKILL1,ActionType.Wait);
        
        //攻击特效
        // this.eftAtk=new BaseFrame("hit",5);
        // this.eftAtk.setInterval(50);      
        // //this.eftAtk.scaleX=3;this.eftAtk.scaleY=3;
        // this.eftAtk.y=-150;
 
        // //暴击特效
        // this.eftAtkCri=new BaseFrame("hit2",6);
        // this.eftAtkCri.setInterval(70);      
        // //this.eftAtk.scaleX=3;this.eftAtk.scaleY=3;
        // this.eftAtkCri.y=-220;

        EventManager.ins.on(NoticeEvent.ROCKER_DIRECTOR, this,this.ROCKER_DIRECTOR);
    }
    public setData(level:Cfg_Level):void{
        this.cfg_level = level;
        this.hp = this.cfg_level.hp;
        this.hpMax = this.cfg_level.hp;
        this.atkBasic = this.cfg_level.atk;
        this.cri = this.cfg_level.cri;
        this.moveSpeed = this.cfg_level.moveSpeed;
        this.atkDistance = this.cfg_level.atkDistance;
    }
    /**
     * 
     */
    public update():void{
        super.update()

        
    }

    private ROCKER_DIRECTOR(e:NoticeEvent):void{
        let angle:number = e.data.angle;
        let radian:number =e.data.radian;
        //console.log("angle",angle,Math.cos(radian),Math.sin(radian));

        this.radian=radian;
    }

    public onDead():void{
        super.onDead();
        
    }

    public attacked(king:King):void{
        if(!GameCtrl.ins.isGame){
            return;
        }
        super.attacked(king);
        
    }

    public get halfX():number{ 
        return (this.width>>1);
    }
    public get centerLeftX():number{
        return this.x-100;
    }
    public get centerRightX():number{
        return this.x+100;
    }
}