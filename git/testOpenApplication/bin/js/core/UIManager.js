/*
* 2019-03-05 andy
窗体管理器
*/
var UIManager = (function () {
    function UIManager() {
        if (UIManager._ins != null)
            throw new Error("UIManager is single!");
        this.dicView = new Laya.Dictionary();
    }
    Object.defineProperty(UIManager, "ins", {
        get: function () {
            if (!this._ins)
                UIManager._ins = new UIManager();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.showView = function (key, cls) {
        if (this.curView) {
            this.curView.removeSelf();
        }
        var view = this.dicView.get(key);
        if (!view) {
            view = new cls();
            this.dicView.set(key, view);
        }
        Laya.stage.addChild(view);
        this.curView = view;
    };
    UIManager.prototype.getView = function (key) {
        return this.dicView.get(key);
    };
    return UIManager;
}());
