var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
        //this.ui.imgBg.skin=Define.CDN+"/atlas/not/bg_main.jpg";
    };
    MainWin.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    MainWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnFrame":
                UIManager.ins.openWindow(CustomWindow.frame);
                break;
            case "btnEffect":
                UIManager.ins.openWindow(CustomWindow.effect);
                break;
            case "btnSpine":
                UIManager.ins.openWindow(CustomWindow.spine);
                break;
            case "btnMonster":
                UIManager.ins.openWindow(CustomWindow.monster);
                break;
            case "btnSkill":
                UIManager.ins.openWindow(CustomWindow.skill);
                break;
            default:
                break;
        }
    };
    return MainWin;
}(BaseWindow));
