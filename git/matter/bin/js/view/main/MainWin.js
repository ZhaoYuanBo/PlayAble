var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
        this.ui.imgBg.skin = Define.CDN + "/atlas/not/bg_main.jpg";
    };
    MainWin.prototype.open = function () {
        MatterManager.ins.init();
        this.viewClick(this.ui.btnBird);
    };
    MainWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnBird":
                UIManager.ins.openWindow(CustomWindow.bird);
                break;
            case "btnSeesaw":
                UIManager.ins.openWindow(CustomWindow.seesaw);
                break;
            case "btnStart":
                UIManager.ins.closeWindow(CustomWindow.main);
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
