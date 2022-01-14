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
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * bytedance 国内平台 https://bytedance.feishu.cn/docs/doccnTne26fXXc54DGgWeBaq3Ae#
        2020-11-27 andy
        */
        var ByteDancePlatform = /** @class */ (function (_super) {
            __extends(ByteDancePlatform, _super);
            function ByteDancePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Bd;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            ByteDancePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                Laya.Browser.window.gameStart = function () { platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart); };
            };
            ByteDancePlatform.prototype.initGameSkin = function () {
            };
            ByteDancePlatform.prototype.login = function () {
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameReady);
                this.loginSuccess();
            };
            ByteDancePlatform.prototype.loginSuccess = function () {
                console.log("bytedance 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            ByteDancePlatform.prototype.getSwitchState = function () {
                return true;
            };
            ByteDancePlatform.prototype.initItem = function () {
            };
            ByteDancePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            ByteDancePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            ByteDancePlatform.prototype.firstUp = function () {
            };
            return ByteDancePlatform;
        }(platform.LocalPlatform));
        platform.ByteDancePlatform = ByteDancePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
