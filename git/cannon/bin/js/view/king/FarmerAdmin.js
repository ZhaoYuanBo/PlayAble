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
* 农民管理员
*/
var FarmerAdmin = /** @class */ (function (_super) {
    __extends(FarmerAdmin, _super);
    function FarmerAdmin() {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        return _this;
    }
    FarmerAdmin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setActionType(ActionType.Wait);
        var arrAction = [new Action(ActionType.Wait, 3), new Action(ActionType.Left, 6), new Action(ActionType.Right, 6), new Action(ActionType.ATTACK, 3)];
        var skinData = new SkinData("king", "FarmerAdmin", arrAction);
        this.setSkin(skinData);
        this.farm = new Cfg_Farm();
        this.farm.minX = 200;
        this.farm.maxX = 620;
        this.farm.targetY = 1050;
        this.speed = 2;
        this.interval = 100;
        this.width = 105, this.height = 114;
        this.x = this.farm.minX + (this.farm.maxX - this.farm.minX) >> 1;
        this.y = this.farm.targetY;
    };
    /**
     *
     */
    FarmerAdmin.prototype.update = function () {
        var _this = this;
        if (this.curAticonType == ActionType.Wait) {
        }
        else if (this.curAticonType == ActionType.Left) {
            if (this.x - this.speed > this.farm.minX) {
                this.pos(this.x - this.speed, this.y);
            }
            else {
                this.setActionType(ActionType.Right);
            }
        }
        else if (this.curAticonType == ActionType.Right) {
            if (this.x + this.speed + this.width < this.farm.maxX) {
                this.pos(this.x + this.speed, this.y);
            }
            else {
                this.setActionType(ActionType.ATTACK);
            }
        }
        else if (this.curAticonType == ActionType.Up) {
        }
        else if (this.curAticonType == ActionType.Down) {
        }
        else if (this.curAticonType == ActionType.ATTACK) {
            Laya.timer.once(2000, this, function () {
                _this.setActionType(ActionType.Left);
            });
        }
        else {
            console.log("没有方向");
        }
        //this.checkPosition();
    };
    FarmerAdmin.prototype.dead = function () {
        this.removeSelf();
    };
    FarmerAdmin.prototype.checkPosition = function () {
        if (Laya.timer.currTimer - this.lastTime >= 10000) {
            this.lastTime = Laya.timer.currTimer;
            var randIndex = MathUtil.randomRange(1, 2);
            this.setActionType(randIndex);
        }
    };
    return FarmerAdmin;
}(BaseKing));
