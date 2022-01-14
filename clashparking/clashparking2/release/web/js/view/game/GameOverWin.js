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
* 游戏结算界面
*/
var GameOverWin = /** @class */ (function (_super) {
    __extends(GameOverWin, _super);
    function GameOverWin() {
        return _super.call(this, GameOverUI) || this;
    }
    GameOverWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        OpenManager.ins.postMsg(NoticeEvent.ZY_SCORE, UserSelfModel.ins.scoreMax);
    };
    GameOverWin.prototype.open = function () {
        this.ui.txtScore.text = GameModel.ins.score + "";
        this.ui.txtScoreMax.text = UserSelfModel.ins.scoreMax + "";
    };
    GameOverWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
                GameCtrl.ins.startGameAgin();
                break;
            case "btnMain":
                UIManager.ins.closeWindow(this.uiType);
                UIManager.ins.closeWindow(CustomWindow.game);
                break;
            default:
                break;
        }
    };
    GameOverWin.prototype.close = function () {
    };
    return GameOverWin;
}(BaseWindow));
//# sourceMappingURL=GameOverWin.js.map