var game;
(function (game) {
    var PlatformID = game.platform.PlatformID;
    /*
    * 2019-02-27 andy
    全局基类
    */
    var Global = /** @class */ (function () {
        function Global() {
        }
        /**平台ID */
        Global.platformId = PlatformID.None;
        return Global;
    }());
    game.Global = Global;
})(game || (game = {}));
