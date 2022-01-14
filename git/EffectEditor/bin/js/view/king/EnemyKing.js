var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 2019-12-05 andy
敌人
*/
var EnemyKing = /** @class */ (function (_super) {
    __extends(EnemyKing, _super);
    function EnemyKing() {
        return _super.call(this) || this;
    }
    EnemyKing.prototype.init = function () {
        _super.prototype.init.call(this);
        this.spDebug.graphics.drawCircle(0, 0, 10, "#ff0000");
        this.setInterval(100);
        //攻击特效
        // this.eftAtked=new BaseFrame("blood",6);
        // this.eftAtked.setInterval(50);      
        // //this.eftAtk.scaleX=3;this.eftAtk.scaleY=3;
        // this.eftAtked.pivot(128,128);
        // this.eftAtked.y=0;
        this.eftDead = FrameManager.ins.getFrameBySkin("frame1/dead1");
        this.eftDead.y = 0;
        //头顶血条
        this.hpBar.skin = "game/img_hp_enemy.png";
        this.hpBar.value = 1;
        this.spHead.y = -50;
        //普通攻击列表
        this.arrAtkId.push(ActionType.ATTACK);
    };
    EnemyKing.prototype.setData = function (data) {
        this.cfgMonster = data;
        this.hp = this.cfgMonster.hp;
        this.hpMax = this.cfgMonster.hp;
        this.atkBasic = this.cfgMonster.atk;
        this.moveSpeed = this.cfgMonster.moveSpeed;
        //动作别来
        var arrAction = KingManager.ins.getActionBySkin(this.cfgMonster.skin);
        var skinData = new SkinData("king", this.cfgMonster.skin, arrAction);
        this.setSkin(skinData, false);
        //this.regNextAction(ActionType.SKILL1,arrAction[0]);
    };
    EnemyKing.prototype.initPosition = function (point, delay) {
        if (delay === void 0) { delay = 0; }
        this.x = point.x;
        this.y = point.y;
        this.setActionDirect(ActionDirect.Right);
        this.setActionType(ActionType.WALK);
    };
    /**
     *
     */
    EnemyKing.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.curActionState == ActionState.DEAD) {
            //console.log("处于死亡状态："+this.name);
            return;
        }
        if (!this.atkTarget) {
            return;
        }
        if (this.curActionState == ActionState.MOVE) {
            this.move();
        }
        else if (this.curActionState == ActionState.ATTACK) {
            //console.log("敌人处于攻击状态");
            if (Math.abs(this.x - this.atkTarget.x) > this.atkDistance + this.moveSpeed) {
                this.setActionType(ActionType.WALK);
            }
        }
        else if (this.curActionState == ActionState.ATTACKED) {
        }
        else if (this.curActionState == ActionState.NONE) {
            //console.log("敌人处于攻击状态");
            this.startPoint.setTo(this.x, this.y);
            this.endPoint.setTo(this.atkTarget.x, this.atkTarget.y);
            var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
            if (distance > this.atkDistance) {
                this.setActionState(ActionState.MOVE);
            }
        }
        else {
        }
    };
    EnemyKing.prototype.onDead = function () {
        _super.prototype.onDead.call(this);
    };
    EnemyKing.prototype.attack = function () {
        return _super.prototype.attack.call(this, GameCtrl.ins.self);
    };
    EnemyKing.prototype.attacked = function (king) {
        _super.prototype.attacked.call(this, king);
        var hurt = king && king.isAtkCri ? 100 : 30;
        this.hp -= hurt;
        if (this.hp <= 0) {
            if (king && king.isAtkCri) {
                this.setActionType(ActionType.DEADCRIT, false);
            }
            else {
                this.setActionType(ActionType.DEAD, false);
            }
        }
    };
    return EnemyKing;
}(King));
