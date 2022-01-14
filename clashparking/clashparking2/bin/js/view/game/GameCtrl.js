/*
* 2019-03-01 andy
游戏控制
*/
var GameCtrl = /** @class */ (function () {
    function GameCtrl() {
        this.score = 1240;
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
    };
    GameCtrl.prototype.startGame = function () {
        this.init();
        UIManager.ins.openWindow(CustomWindow.game);
    };
    GameCtrl.prototype.addScore = function (num) {
        this.score += num;
        game.common.EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE, this.score);
    };
    /**再来一次 */
    GameCtrl.prototype.startGameAgin = function () {
        GameModel.ins.resetGame();
        EventManager.ins.event(CustomDefine.EVENT_START_GAME_AGIN, {});
    };
    GameCtrl.prototype.initGameLang = function (ui) {
        if (!ui) {
            return;
        }
        if (Define.langId == LangType.Zh) {
        }
        else {
        }
    };
    GameCtrl.prototype.initDownloadLang = function (ui) {
        if (!ui) {
            return;
        }
        if (Define.langId == LangType.Zh) {
            ui.btnDownload.skin = "game/btn_continue_zh.png";
        }
        else {
        }
    };
    /**
     * 创建发光路径
     * @param eff 图片
     * @param color 颜色
     */
    GameCtrl.prototype.setApplatFilter = function (eff, color) {
        if (color === void 0) { color = "fffefd"; }
        //创建一个发光滤镜
        var glowFilter = new Laya.GlowFilter(color, 60, 0, 0);
        eff.filters = [glowFilter];
    };
    /**
     * 图片是否变黑
     * @param img 图片
     * @param ischange 是否变黑 0默认 1变了
     */
    GameCtrl.prototype.setImgColor = function (img, ischange) {
        if (ischange === void 0) { ischange = 0; }
        //颜色滤镜矩阵,灰色
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, //A
        ];
        var GrayFilter = new Laya.ColorFilter(colorMatrix);
        if (ischange == 0) {
            img.filters = undefined;
        }
        else if (ischange == 1) {
            img.filters = [GrayFilter];
        }
        else {
        }
    };
    /**
     * 获取两个点连线的夹角,默认点一的方向朝右
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    GameCtrl.prototype.getRotationWithTwoPoint = function (x1, y1, x2, y2) {
        var tempX = x2 - x1;
        var tempY = y2 - y1;
        var temp = tempY / tempX;
        if (tempX < 0) {
            return Math.floor(Math.atan(temp) * 180 / Math.PI + 180);
        }
        else {
            return Math.floor(Math.atan(temp) * 180 / Math.PI);
        }
    };
    /**调用手机震动 */
    GameCtrl.prototype.vibration = function () {
        if (navigator.vibrate) {
            // 支持
            console.log("支持设备震动！");
        }
        else {
            // 不支持
            console.log("不支持设备震动！");
            return;
        }
        //震5秒
        //navigator.vibrate(5000);
        //震5秒，停0.3秒，在震4秒
        navigator.vibrate(1000);
    };
    GameCtrl.boomBottle = null;
    GameCtrl.isStart = false;
    return GameCtrl;
}());
//# sourceMappingURL=GameCtrl.js.map