var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        资源管理器
        */
        var ResManager = /** @class */ (function () {
            function ResManager() {
                if (ResManager._ins != null)
                    throw new Error("ResManager is single!");
            }
            Object.defineProperty(ResManager, "ins", {
                get: function () {
                    if (!this._ins)
                        ResManager._ins = new ResManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            ResManager.prototype.preload = function (arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            };
            ResManager.prototype.init = function (arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            };
            return ResManager;
        }());
        common.ResManager = ResManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
