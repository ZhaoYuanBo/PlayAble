var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        资源管理器
        */
        class ResManager {
            constructor() {
                if (ResManager._ins != null)
                    throw new Error("ResManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    ResManager._ins = new ResManager();
                return this._ins;
            }
            preload(arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            }
            init(arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            }
        }
        common.ResManager = ResManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=ResManager.js.map