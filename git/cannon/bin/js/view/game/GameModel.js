/*
* 2019-03-01 andy
游戏数据
*/
var GameModel = /** @class */ (function () {
    function GameModel() {
        /***引导步骤 */
        this.guideStep = 0;
        this.score = 0;
        /***boy 金币数量 */
        this.boy_gold = 0;
        if (GameModel._ins != null)
            throw new Error("GameModel is single!");
    }
    Object.defineProperty(GameModel, "ins", {
        get: function () {
            if (!this._ins)
                GameModel._ins = new GameModel();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    GameModel.prototype.init = function () {
    };
    /** */
    GameModel.prototype.randStar = function () {
    };
    /**增加分数 */
    GameModel.prototype.addScore = function (count) {
        this.score += count;
        EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE, { addScore: 0, efct: 0 });
    };
    /**检查是否还有可以消灭的星星，没有则结束 */
    GameModel.prototype.checkOver = function () {
        console.log("game next");
        EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT, {});
    };
    /**游戏下一关 */
    GameModel.prototype.gameNext = function () {
    };
    /**游戏结束 */
    GameModel.prototype.gameOver = function () {
        var scoreMax = UserSelfModel.ins.scoreMax;
        if (this.score > scoreMax) {
            UserSelfModel.ins.scoreMax = this.score;
            LocalData.ins.setData(LocalKey.SCORE_MAX, this.score);
        }
        this.resetGame();
    };
    GameModel.prototype.resetGame = function () {
    };
    return GameModel;
}());
var StarModel = /** @class */ (function () {
    function StarModel() {
        /**星星ID */
        this.id = 0;
        /**星星初始化格子X */
        this.initX = 0;
        /**星星初始化格子Y */
        this.initY = 0;
        /**星星类型颜色 */
        this.type = 0;
        /**星星是否消灭 */
        this.isKill = false;
        /**星星当前格子X */
        this.nowX = 0;
        /**星星当前格子Y */
        this.nowY = 0;
        /**星星当初始化角度 */
        this.initAngle = 0;
        /**星星当前角度 */
        this.nowAngle = 0;
        /**星星半径范围 */
        this.radius = 0;
        /**星星目标角度 */
        this.targetAngle = 0;
        /**星星旋转角度 */
        this.speed = 0;
        /**星星是否自转 */
        this.rotateSelf = false;
        /**双向开关 */
        this.unit = 1;
    }
    return StarModel;
}());
