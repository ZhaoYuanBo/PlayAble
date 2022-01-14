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
        * Applovin
        2019-05-01 andy
        */
        var ApplovinPlatform = /** @class */ (function (_super) {
            __extends(ApplovinPlatform, _super);
            function ApplovinPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Al;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            ApplovinPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            ApplovinPlatform.prototype.initGameSkin = function () {
            };
            ApplovinPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            ApplovinPlatform.prototype.loginSuccess = function () {
                console.log("Applovin 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            ApplovinPlatform.prototype.getSwitchState = function () {
                return true;
            };
            ApplovinPlatform.prototype.initItem = function () {
            };
            ApplovinPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            ApplovinPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            ApplovinPlatform.prototype.firstUp = function () {
            };
            return ApplovinPlatform;
        }(platform.LocalPlatform));
        platform.ApplovinPlatform = ApplovinPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
