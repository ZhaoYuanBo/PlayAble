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
* 2019-12-03 andy
主角
*/
var SelfKing = /** @class */ (function (_super) {
    __extends(SelfKing, _super);
    function SelfKing() {
        var _this = _super.call(this) || this;
        _this.radian = 0;
        return _this;
    }
    SelfKing.prototype.init = function () {
        _super.prototype.init.call(this);
        this.spDebug.graphics.drawCircle(0, 0, 10, "#ff0000");
        this.hpBar = GameCtrl.ins.barHp;
        //技能列表
        //动作别来
        var arrAction = KingManager.ins.getActionBySkin("role");
        var skinData = new SkinData("king", "role", arrAction);
        this.setSkin(skinData, false);
        LayerManager.ins.addChild(this, LayerName.scene_king);
        this.setActionDirect(ActionDirect.Right);
        this.setActionType(ActionType.Wait, true);
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
        EventManager.ins.on(NoticeEvent.ROCKER_DIRECTOR, this, this.ROCKER_DIRECTOR);
    };
    SelfKing.prototype.setData = function (level) {
        this.cfg_level = level;
        this.hp = this.cfg_level.hp;
        this.hpMax = this.cfg_level.hp;
        this.atkBasic = this.cfg_level.atk;
        this.cri = this.cfg_level.cri;
        this.moveSpeed = this.cfg_level.moveSpeed;
        this.atkDistance = this.cfg_level.atkDistance;
    };
    /**
     *
     */
    SelfKing.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    SelfKing.prototype.ROCKER_DIRECTOR = function (e) {
        var angle = e.data.angle;
        var radian = e.data.radian;
        //console.log("angle",angle,Math.cos(radian),Math.sin(radian));
        this.radian = radian;
    };
    SelfKing.prototype.onDead = function () {
        _super.prototype.onDead.call(this);
    };
    SelfKing.prototype.attacked = function (king) {
        if (!GameCtrl.ins.isGame) {
            return;
        }
        _super.prototype.attacked.call(this, king);
    };
    Object.defineProperty(SelfKing.prototype, "halfX", {
        get: function () {
            return (this.width >> 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelfKing.prototype, "centerLeftX", {
        get: function () {
            return this.x - 100;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelfKing.prototype, "centerRightX", {
        get: function () {
            return this.x + 100;
        },
        enumerable: false,
        configurable: true
    });
    return SelfKing;
}(King));
