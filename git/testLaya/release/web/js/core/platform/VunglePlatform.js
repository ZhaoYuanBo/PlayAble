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
        * Vungle
        2019-10-23 andy
        */
        var VunglePlatform = /** @class */ (function (_super) {
            __extends(VunglePlatform, _super);
            function VunglePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Vg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            VunglePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            VunglePlatform.prototype.initGameSkin = function () {
            };
            VunglePlatform.prototype.login = function () {
                this.loginSuccess();
            };
            VunglePlatform.prototype.loginSuccess = function () {
                console.log("Vungle 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            VunglePlatform.prototype.getSwitchState = function () {
                return true;
            };
            VunglePlatform.prototype.initItem = function () {
            };
            VunglePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            VunglePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            VunglePlatform.prototype.firstUp = function () {
            };
            return VunglePlatform;
        }(platform.LocalPlatform));
        platform.VunglePlatform = VunglePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
