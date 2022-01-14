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
        * Unity
        2019-06-13 andy
        */
        var UnityPlatform = /** @class */ (function (_super) {
            __extends(UnityPlatform, _super);
            function UnityPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Ut;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            UnityPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            UnityPlatform.prototype.initGameSkin = function () {
            };
            UnityPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            UnityPlatform.prototype.loginSuccess = function () {
                console.log("Unity 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            UnityPlatform.prototype.getSwitchState = function () {
                return true;
            };
            UnityPlatform.prototype.initItem = function () {
            };
            UnityPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            UnityPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            UnityPlatform.prototype.firstUp = function () {
            };
            return UnityPlatform;
        }(platform.LocalPlatform));
        platform.UnityPlatform = UnityPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
