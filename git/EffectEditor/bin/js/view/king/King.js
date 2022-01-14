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
* 2019-12-03 andy
*/
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King() {
        return _super.call(this) || this;
        //this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
    }
    King.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    /**
     *
     */
    King.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    King.prototype.move = function () {
        _super.prototype.move.call(this);
    };
    /**
     * 攻击
     * @param king 被攻击者
     */
    King.prototype.attack = function (king, skill) {
        if (king === void 0) { king = null; }
        if (skill === void 0) { skill = ActionType.Wait; }
        _super.prototype.attack.call(this, king, skill);
    };
    /**随机播放技能 */
    King.prototype.playSkill = function (skill) {
        if (skill === void 0) { skill = ActionType.Wait; }
        _super.prototype.playSkill.call(this, skill);
    };
    return King;
}(BaseKing));
