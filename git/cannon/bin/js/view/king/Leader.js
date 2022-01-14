var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
2019-05-10 andy
* 管理员
*/
var Leader = /** @class */ (function (_super) {
    __extends(Leader, _super);
    function Leader() {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        _this.imgTip = new Laya.Image();
        _this.imgTip.x = 15;
        _this.imgTip.y = -50;
        _this.imgTip.scaleX = _this.imgTip.scaleY = 0.7;
        _this.imgTip.skin = "game/img_tip.png";
        _this.addChild(_this.imgTip);
        _this.imgSkill = new Laya.Image();
        _this.imgSkill.x = 5;
        _this.imgSkill.y = 5;
        _this.imgSkill.scaleX = _this.imgSkill.scaleY = 0.7;
        _this.imgSkill.skin = "game/img_skill_move.png";
        _this.imgTip.addChild(_this.imgSkill);
        return _this;
    }
    Leader.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setActionType(ActionType.Wait);
        var arrAction = [new Action(ActionType.Wait, 3)];
        var skinData = new SkinData("king", "leader", arrAction);
        this.setSkin(skinData);
        this.interval = 100;
        this.width = 105, this.height = 114;
        this.scale(0.8, 0.8);
        this.x = 100;
        this.y = -50;
        this.imgTip.mouseEnabled = true;
        this.imgTip.on(Laya.Event.CLICK, this, this.clickFarmer);
    };
    Leader.prototype.clickFarmer = function (e) {
        if (this.imgTip.visible) {
            this.imgTip.visible = false;
            this.farm.setLeaderSpeed(1.5);
            if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_7) {
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    };
    /**
     *
     */
    Leader.prototype.update = function () {
        if (this.curAticonType == ActionType.Wait) {
        }
        else if (this.curAticonType == ActionType.Left) {
        }
        else if (this.curAticonType == ActionType.Right) {
        }
        else if (this.curAticonType == ActionType.Up) {
        }
        else if (this.curAticonType == ActionType.Down) {
        }
        else if (this.curAticonType == ActionType.ATTACK) {
        }
        else {
            console.log("没有方向");
        }
        //this.checkPosition();
    };
    /**
     * 设置所属农场
     * @param farm
     */
    Leader.prototype.setFarm = function (farm) {
        this.farm = farm;
        this.farm.addChild(this);
    };
    Leader.prototype.dead = function () {
        this.removeSelf();
    };
    Leader.prototype.checkPosition = function () {
        if (Laya.timer.currTimer - this.lastTime >= 10000) {
            this.lastTime = Laya.timer.currTimer;
            var randIndex = MathUtil.randomRange(1, 2);
            this.setActionType(randIndex);
        }
    };
    return Leader;
}(BaseKing));
