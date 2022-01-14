var game;
(function (game) {
    var PlatformID = game.platform.PlatformID;
    /*
    * 2019-02-27 andy
    全局基类
    */
    class Global {
        constructor() {
        }
    }
    /**平台ID */
    Global.platformId = PlatformID.None;
    game.Global = Global;
})(game || (game = {}));
//# sourceMappingURL=Global.js.map