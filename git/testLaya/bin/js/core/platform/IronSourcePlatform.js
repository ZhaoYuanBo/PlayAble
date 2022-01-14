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
        * IronSource 以色列投放广告平台
        2019-05-01 andy
        */
        var IronSourcePlatform = /** @class */ (function (_super) {
            __extends(IronSourcePlatform, _super);
            function IronSourcePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Is;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            IronSourcePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            IronSourcePlatform.prototype.initGameSkin = function () {
            };
            IronSourcePlatform.prototype.login = function () {
                this.loginSuccess();
            };
            IronSourcePlatform.prototype.loginSuccess = function () {
                console.log("IronSource 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            IronSourcePlatform.prototype.getSwitchState = function () {
                return true;
            };
            IronSourcePlatform.prototype.initItem = function () {
            };
            IronSourcePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            IronSourcePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            IronSourcePlatform.prototype.firstUp = function () {
            };
            return IronSourcePlatform;
        }(platform.LocalPlatform));
        platform.IronSourcePlatform = IronSourcePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
