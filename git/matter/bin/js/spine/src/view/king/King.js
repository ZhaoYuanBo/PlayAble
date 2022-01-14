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
* name;
*/
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King() {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        return _this;
    }
    King.prototype.init = function () {
        _super.prototype.init.call(this);
        this.kingType = "boy";
        this.cutRow = 4;
        this.cutCol = 4;
        var cfgLevel = DataConfig.ins.getLevel(UserSelfModel.ins.lvl);
        this.speed = cfgLevel.speed;
        this.interval = cfgLevel.speedTime;
        this.width = 70, this.height = 125;
        this.x = MathUtil.randomRange(0, Define.DeviceW);
        this.y = MathUtil.randomRange(0, Define.DeviceH);
        this.arrActionType = [ActionType.Down, ActionType.Left, ActionType.Right, ActionType.Up];
    };
    /**
     *
     */
    King.prototype.update = function () {
        if (this.curAticonType == ActionType.Left) {
            if (this.x - this.speed > 0) {
                this.pos(this.x - this.speed, this.y);
            }
            else {
                this.setActionType(ActionType.Right);
            }
        }
        else if (this.curAticonType == ActionType.Right) {
            if (this.x + this.speed + this.width < Define.DeviceW) {
                this.pos(this.x + this.speed, this.y);
            }
            else {
                this.setActionType(ActionType.Left);
            }
        }
        else if (this.curAticonType == ActionType.Up) {
            if (this.y - this.speed > 0) {
                this.pos(this.x, this.y - this.speed);
            }
            else {
                this.setActionType(ActionType.Down);
            }
        }
        else if (this.curAticonType == ActionType.Down) {
            if (this.y + this.speed + this.height < Define.DeviceH) {
                this.pos(this.x, this.y + this.speed);
            }
            else {
                this.setActionType(ActionType.Up);
            }
        }
        else {
            console.log("没有方向");
        }
        this.checkPosition();
    };
    King.prototype.dead = function () {
        this.removeSelf();
    };
    King.prototype.checkPosition = function () {
        if (Laya.timer.currTimer - this.lastTime >= 10000) {
            this.lastTime = Laya.timer.currTimer;
            var randIndex = MathUtil.randomRange(0, 3);
            this.setActionType(this.arrActionType[randIndex]);
        }
    };
    return King;
}(BaseKing));
