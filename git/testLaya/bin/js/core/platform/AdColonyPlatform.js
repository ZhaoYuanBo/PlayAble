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
        * AdColony
        2019-11-11 andy
        */
        var AdColonyPlatform = /** @class */ (function (_super) {
            __extends(AdColonyPlatform, _super);
            function AdColonyPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Ac;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            AdColonyPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SoundManager.ins.setOn(false);
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            AdColonyPlatform.prototype.initGameSkin = function () {
            };
            AdColonyPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            AdColonyPlatform.prototype.loginSuccess = function () {
                console.log("AdColony 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            AdColonyPlatform.prototype.getSwitchState = function () {
                return true;
            };
            AdColonyPlatform.prototype.initItem = function () {
            };
            AdColonyPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            AdColonyPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            AdColonyPlatform.prototype.firstUp = function () {
            };
            return AdColonyPlatform;
        }(platform.LocalPlatform));
        platform.AdColonyPlatform = AdColonyPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
