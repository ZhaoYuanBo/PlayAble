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
        * Tapjoy
        2020-02-21 andy
        */
        var TapjoyPlatform = /** @class */ (function (_super) {
            __extends(TapjoyPlatform, _super);
            function TapjoyPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Tj;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            TapjoyPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart);
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            TapjoyPlatform.prototype.initGameSkin = function () {
            };
            TapjoyPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            TapjoyPlatform.prototype.loginSuccess = function () {
                console.log("Tapjoy 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            TapjoyPlatform.prototype.getSwitchState = function () {
                return true;
            };
            TapjoyPlatform.prototype.initItem = function () {
            };
            TapjoyPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            TapjoyPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
            };
            return TapjoyPlatform;
        }(platform.LocalPlatform));
        platform.TapjoyPlatform = TapjoyPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
