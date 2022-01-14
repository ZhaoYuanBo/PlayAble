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
        * MTG 国内平台 https://www.mintegral.com
        2019-05-16 andy
        */
        var MTGPlatform = /** @class */ (function (_super) {
            __extends(MTGPlatform, _super);
            function MTGPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.mtg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            MTGPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                Laya.Browser.window.gameStart = function () { platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart); };
            };
            MTGPlatform.prototype.initGameSkin = function () {
            };
            MTGPlatform.prototype.login = function () {
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameReady);
                this.loginSuccess();
            };
            MTGPlatform.prototype.loginSuccess = function () {
                console.log("MTG 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            MTGPlatform.prototype.getSwitchState = function () {
                return true;
            };
            MTGPlatform.prototype.initItem = function () {
            };
            MTGPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            MTGPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            MTGPlatform.prototype.firstUp = function () {
            };
            return MTGPlatform;
        }(platform.LocalPlatform));
        platform.MTGPlatform = MTGPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
