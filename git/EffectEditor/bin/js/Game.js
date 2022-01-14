/*
* name;
*/
var Game = /** @class */ (function () {
    function Game() {
        if (Game._ins != null)
            throw new Error("Game is single!");
    }
    Object.defineProperty(Game, "ins", {
        get: function () {
            if (!this._ins)
                Game._ins = new Game();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 要预先初始化的东西
     */
    Game.prototype.preInit = function () {
        if (Laya.Browser.onIOS) {
            Define.DOWNLOAD_URL = "";
        }
        else {
            Define.DOWNLOAD_URL = "https://play.google.com/store/apps/details?id=com.minidev.dawncrisis";
        }
        Define.isVertitalGame = true;
        Define.screenMode = 1;
        Define.screenFillType = ScreenFillType.nice1;
        Define.BACKGROUND_COLOR = "#5bc1fc";
        Define.gameType = GameType.default;
    };
    Game.prototype.init = function () {
        //游戏设置
        // let userInfo= res.userInfo;
        // UserSelfModel.ins.nickName= userInfo.nickName;
        // UserSelfModel.ins.headImg= userInfo.avatarUrl;
        // UserSelfModel.ins.sex = userInfo.gender; // 性别 0：未知、1：男、2：女
        // UserSelfModel.ins.province = userInfo.province;
        // UserSelfModel.ins.city = userInfo.city;
        // UserSelfModel.ins.country = userInfo.country;
        UserSelfModel.ins.init();
        SoundManager.ins.playMusic(CustomBase64.sound_game);
        //UIManager.ins.openWindow(CustomWindow.main);
        UIManager.ins.openWindow(CustomWindow.main);
        UIManager.ins.closeWindow(CustomWindow.loading);
    };
    /**
     * 预加载loading资源
     */
    Game.prototype.preLoad = function () {
        if (Base64Manager.isUseBase64) {
            var arrAtlas = [
                CustomBase64.atlas_loading
            ];
            Base64Manager.ins.loadAtlas(arrAtlas, Laya.Handler.create(this, this.preLoadFinish), null);
        }
        else {
            var arr = [{
                    url: Define.CDN + "/atlas/loading.atlas",
                    type: Laya.Loader.ATLAS
                }];
            ResManager.ins.preload(arr, Laya.Handler.create(this, this.preLoadFinish), null);
        }
    };
    Game.prototype.preLoadFinish = function () {
        UIManager.ins.openWindow(CustomWindow.loading);
    };
    return Game;
}());
