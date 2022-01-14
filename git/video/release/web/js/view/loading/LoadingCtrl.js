/*
* 2019-03-08 andy
加载控制
*/
var LoadingCtrl = /** @class */ (function () {
    function LoadingCtrl() {
        if (LoadingCtrl._ins != null)
            throw new Error("LoadingCtrl is single!");
    }
    Object.defineProperty(LoadingCtrl, "ins", {
        get: function () {
            if (!this._ins)
                LoadingCtrl._ins = new LoadingCtrl();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    LoadingCtrl.prototype.init = function () {
    };
    return LoadingCtrl;
}());
