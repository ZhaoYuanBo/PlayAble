var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        var cfgLevel = DataConfig.ins.getLevel(UserSelfModel.ins.lvl);
        // this.speed=cfgLevel.speed;
        this.interval = cfgLevel.speedTime;
        this.width = 70, this.height = 125;
        this.x = MathUtil.randomRange(0, Define.DeviceW);
        this.y = MathUtil.randomRange(0, Define.DeviceH);
    };
    /**
     *
     */
    King.prototype.update = function () {
        // this.checkPosition();
    };
    King.prototype.dead = function () {
        // this.removeSelf();  
    };
    King.prototype.checkPosition = function () {
        // if(Laya.timer.currTimer-this.lastTime>=10000){
        //     this.lastTime=Laya.timer.currTimer;
        //     let randIndex:number=MathUtil.randomRange(0,3);
        //     this.setActionType(randIndex);
        // }
    };
    return King;
}(BaseKing));
//# sourceMappingURL=King.js.map