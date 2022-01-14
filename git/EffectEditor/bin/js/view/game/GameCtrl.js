/*
* 2019-03-01 andy
游戏控制
*/
var GameCtrl = /** @class */ (function () {
    function GameCtrl() {
        this.taskStep = 0;
        /**怪物数量 */
        this.enemyCount = 0;
        /**怪物最大数量 */
        this.enemyCountMax = 0;
        /**产生生物的时间间隔 */
        this.enemyCreateTime = 15;
        this.timeCount = 0;
        /**是否游戏中 */
        this.isGame = false;
        /**是否开火 */
        this.isFire = false;
        /**是否警告 */
        this.isWarning = false;
        if (GameCtrl._ins != null)
            throw new Error("GameCtrl is single!");
    }
    Object.defineProperty(GameCtrl, "ins", {
        get: function () {
            if (!this._ins)
                GameCtrl._ins = new GameCtrl();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    GameCtrl.prototype.init = function () {
        GameModel.ins.init();
        Laya.timer.loop(100, this, this.update);
        this.shakeFrame = FrameManager.ins.getFrameBySkin("frame/shake");
    };
    GameCtrl.prototype.update = function () {
    };
    return GameCtrl;
}());
