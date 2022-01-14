/*
* 2019-03-01 andy
游戏控制
*/
var GameCtrl = /** @class */ (function () {
    function GameCtrl() {
        if (GameCtrl._ins != null)
            throw new Error("GameCtrl is single!");
    }
    Object.defineProperty(GameCtrl, "ins", {
        get: function () {
            if (!this._ins)
                GameCtrl._ins = new GameCtrl();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    GameCtrl.prototype.init = function () {
        GameModel.ins.init();
    };
    GameCtrl.prototype.startGame = function () {
        this.init();
        UIManager.ins.openWindow(CustomWindow.game);
    };
    /**再来一次 */
    GameCtrl.prototype.startGameAgin = function () {
        GameModel.ins.resetGame();
        EventManager.ins.event(CustomDefine.EVENT_START_GAME_AGIN, {});
    };
    return GameCtrl;
}());
