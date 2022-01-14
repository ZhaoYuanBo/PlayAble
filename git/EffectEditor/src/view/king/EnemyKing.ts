/*
* 2019-12-05 andy
敌人
*/
class EnemyKing extends King{
    public cfgMonster:Cfg_Monster;

    constructor(){
        super();
    }
    public init():void{
        super.init();
        this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
        this.setInterval(100);
        //攻击特效
        // this.eftAtked=new BaseFrame("blood",6);
        // this.eftAtked.setInterval(50);      
        // //this.eftAtk.scaleX=3;this.eftAtk.scaleY=3;
        // this.eftAtked.pivot(128,128);
        // this.eftAtked.y=0;

        this.eftDead=FrameManager.ins.getFrameBySkin("frame1/dead1");
        this.eftDead.y=0;

        //头顶血条
        this.hpBar.skin="game/img_hp_enemy.png";
        this.hpBar.value=1;
        this.spHead.y=-50;
        //普通攻击列表
        this.arrAtkId.push(ActionType.ATTACK);
        
    }
    public setData(data:Cfg_Monster):void{
        this.cfgMonster = data;
        this.hp = this.cfgMonster.hp;
        this.hpMax = this.cfgMonster.hp;
        this.atkBasic = this.cfgMonster.atk;
        this.moveSpeed = this.cfgMonster.moveSpeed;

        //动作别来
        let arrAction:Array<Action>=KingManager.ins.getActionBySkin(this.cfgMonster.skin);
        let skinData:SkinData=new SkinData("king",this.cfgMonster.skin,arrAction);
        this.setSkin(skinData,false);
        //this.regNextAction(ActionType.SKILL1,arrAction[0]);
    }
    public initPosition(point:Laya.Point,delay:number=0):void{
        this.x = point.x;this.y=point.y;
        this.setActionDirect(ActionDirect.Right);
        this.setActionType(ActionType.WALK);
    }
    /**
     * 
     */
    public update():void{
        super.update();
        if(this.curActionState == ActionState.DEAD){
            //console.log("处于死亡状态："+this.name);
            return;
        }
        if(!this.atkTarget){
            return;
        }
        
      
        if(this.curActionState == ActionState.MOVE){
            this.move();
        }else if(this.curActionState == ActionState.ATTACK){
            //console.log("敌人处于攻击状态");
            if(Math.abs(this.x-this.atkTarget.x)>this.atkDistance+this.moveSpeed){
                this.setActionType(ActionType.WALK);
            }
        }else if(this.curActionState == ActionState.ATTACKED){
            
        }else if(this.curActionState == ActionState.NONE){
            //console.log("敌人处于攻击状态");
            this.startPoint.setTo(this.x,this.y);
            this.endPoint.setTo(this.atkTarget.x,this.atkTarget.y);
            let distance:number = MathUtil.getDistance(this.startPoint,this.endPoint);
            if(distance >this.atkDistance){
                this.setActionState(ActionState.MOVE);
            }
        }else{

        } 
       
    }

    public onDead():void{
        super.onDead();
      
    }

    public attack():boolean{
        return super.attack(GameCtrl.ins.self);
    }

    public attacked(king:King):void{
        super.attacked(king);
        
        let hurt:number = king&&king.isAtkCri?100:30;
        this.hp-=hurt;
        if(this.hp<=0){
            if(king&&king.isAtkCri){
                this.setActionType(ActionType.DEADCRIT,false);
            }else{
                this.setActionType(ActionType.DEAD,false);
            }
        }
    }
}