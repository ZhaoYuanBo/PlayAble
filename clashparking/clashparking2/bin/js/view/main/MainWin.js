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
/*
* 主界面
*/
var MainWin = /** @class */ (function (_super) {
    __extends(MainWin, _super);
    function MainWin() {
        return _super.call(this, MainUI) || this;
    }
    MainWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //this.ui.imgBg.skin=Define.CDN+"/atlas/not/bg_main.jpg";
    };
    MainWin.prototype.open = function () {
        UIManager.ins.closeWindow(CustomWindow.main);
        UIManager.ins.openWindow(CustomWindow.game);
    };
    MainWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnShare":
                Global.platform.share(function () {
                    console.log("share callback");
                });
                break;
            case "btnRank":
                UIManager.ins.openWindow(CustomWindow.rank);
                break;
            case "btnStart":
                //UIManager.ins.closeWindow(CustomWindow.main);
                GameCtrl.ins.startGame();
                break;
            case "btnKnife":
                UIManager.ins.openWindow(CustomWindow.bag);
                break;
            default:
                break;
        }
    };
    return MainWin;
}(BaseWindow));
//# sourceMappingURL=MainWin.js.map