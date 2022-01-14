/*
* 2019-03-01 andy
游戏数据
*/
var GameModel = /** @class */ (function () {
    function GameModel() {
        /**当前等级 */
        this.lvl = 0;
        /**游戏分数 */
        this.score = 0;
        /**游戏金币 */
        this.gold = 0;
        /**引导步骤 */
        this.guideStep = 0;
        /**创建生物数量 */
        this.enemyCount = 45;
        /**创建生物数量 */
        this.enemyDeadCount = 0;
        /**子弹数量 */
        this.bulletCount = 100;
        /**子弹最大数量 */
        this.bulletCountMax = 100;
        this.mapWidth = 1280;
        this.mapHeight = 720;
        if (GameModel._ins != null)
            throw new Error("GameModel is single!");
    }
    Object.defineProperty(GameModel, "ins", {
        get: function () {
            if (!this._ins)
                GameModel._ins = new GameModel();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    GameModel.prototype.init = function () {
    };
    /**增加分数 */
    GameModel.prototype.addScore = function (count) {
        this.score += count;
        EventManager.ins.event(NoticeEvent.GAME_SCORE_UPDATE, { addScore: count });
    };
    /**增加金币 */
    GameModel.prototype.addGlod = function (count) {
        this.gold += count;
        EventManager.ins.event(NoticeEvent.GAME_GOLD_UPDATE, { addGold: count });
        //SoundManager.ins.playSound(CustomBase64.sound_reward);
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
        this.score = 0;
        this.lvl = 0;
    };
    return GameModel;
}());
var ItemModel = /** @class */ (function () {
    function ItemModel(id, name, type) {
        if (id === void 0) { id = 0; }
        if (type === void 0) { type = 0; }
        /**ID */
        this.id = 0;
        /**名字 */
        this.name = "";
        /**类型 */
        this.type = 0;
        /**速度 */
        this.speed = 0;
        /**是否消灭 */
        this.isKill = false;
        /**初始化格子X */
        this.initX = 0;
        /**初始化格子Y */
        this.initY = 0;
        /**当前格子X */
        this.nowX = 0;
        /**当前格子Y */
        this.nowY = 0;
        /**初始化角度 */
        this.initAngle = 0;
        /**当前角度 */
        this.nowAngle = 0;
        /**半径范围 */
        this.radius = 0;
        /**目标角度 */
        this.targetAngle = 0;
        this.id = id;
        this.name = name;
        this.type = type;
    }
    return ItemModel;
}());
