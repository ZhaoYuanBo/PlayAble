/*
* 2019-03-01 andy
游戏数据
*/
var GameModel = /** @class */ (function () {
    function GameModel() {
        /**星星类型数量 */
        this.MAX_STAR_TYPE = 5;
        /**星星产生数量[行数*列数] */
        this.MAX_STAR_COUNT = 20;
        /**星星数组 */
        this.arrStar = [];
        /**游戏分数 */
        this.score = 0;
        /**星星需要消灭的数组 */
        this.arrStarNeed = [];
        /**星星能被消灭的数组 */
        this.arrStarKill = [];
        /**游戏分数 */
        this.lvlIndex = 0;
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
        this.arrStar = [];
        var star;
        for (var k = 0; k < this.MAX_STAR_COUNT; k++) {
            star = new StarModel();
            star.initX = 0;
            star.initY = 0;
            star.id = k;
            this.arrStar.push(star);
        }
    };
    /**随机产生星星 */
    GameModel.prototype.randStar = function () {
        var star;
        var cfgLevel = DataConfig.ins.getLevel(UserSelfModel.ins.lvl);
        var lvl = Number(cfgLevel.arrPass[this.lvlIndex < cfgLevel.arrPass.length ? this.lvlIndex : 1]);
        var arrConfig = DataConfig.ins.getPasss(lvl);
        var len = arrConfig.length;
        this.arrStarNeed = [];
        for (var i = 0; i < len; i++) {
            var id = i;
            var cfg = arrConfig[i];
            star = this.arrStar[id];
            star.isKill = false;
            star.type = MathUtil.randomRange(1, 5);
            star.initAngle = star.nowAngle = cfg.initAngle;
            star.radius = cfg.radius;
            star.targetAngle = cfg.initAngle + cfg.rotateAngle;
            star.speed = cfgLevel.speed;
            star.rotateSelf = cfg.rotateSelf;
            star.initX = cfg.radius * Math.cos(star.initAngle * Math.PI / 180);
            star.initY = cfg.radius * Math.sin(star.initAngle * Math.PI / 180);
            star.nowX = star.initX;
            star.nowY = star.initY;
            this.arrStarNeed.push(star);
        }
        this.lvlIndex++;
    };
    /**从显示列表删除 */
    GameModel.prototype.removeFromNeed = function (id) {
        var starModel = this.arrStar[id];
        if (starModel) {
            starModel.isKill = true;
            this.arrStarNeed[starModel.nowX][starModel.nowY] = null;
        }
    };
    /**增加分数 */
    GameModel.prototype.addScore = function (count) {
        var killCount = count;
        var arrEfct = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4];
        var arrScore = [0, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        var add = arrScore[killCount];
        this.score += add;
        //是否升级
        var cfgLevel = DataConfig.ins.getLevel(UserSelfModel.ins.lvl);
        if (this.score >= cfgLevel.exp) {
            UserSelfModel.ins.lvl++;
            this.resetGame();
            SoundManager.ins.playSound(CustomDefine.SOUND_INFO);
            EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT, {});
        }
        EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE, { addScore: add, efct: arrEfct[killCount] });
    };
    /**检查是否还有可以消灭的星星，没有则结束 */
    GameModel.prototype.checkOver = function () {
        var star;
        var len = this.arrStarNeed.length;
        var killCount = 0;
        for (var i = 0; i < len; i++) {
            star = this.arrStarNeed[i];
            if (star.isKill) {
                killCount++;
            }
        }
        if (killCount == len) {
            console.log("game next");
            EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT, {});
        }
    };
    /**游戏下一关 */
    GameModel.prototype.gameNext = function () {
        UserSelfModel.ins.setLevel(UserSelfModel.ins.lvl + 1);
        EventManager.ins.event(CustomDefine.EVENT_GAME_NEXT, {});
    };
    /**游戏结束 */
    GameModel.prototype.gameOver = function () {
        var scoreMax = UserSelfModel.ins.scoreMax;
        if (this.score > scoreMax) {
            UserSelfModel.ins.scoreMax = this.score;
            LocalData.ins.setData(LocalKey.SCORE_MAX, this.score);
        }
        this.resetGame();
        EventManager.ins.event(CustomDefine.EVENT_GAME_OVER, {});
    };
    GameModel.prototype.resetGame = function () {
        this.score = 0;
        this.lvlIndex = 0;
        this.arrStarKill = [];
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
