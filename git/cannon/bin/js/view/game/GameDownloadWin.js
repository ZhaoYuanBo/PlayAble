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
2019-04-24 andy
* 游戏下载界面
*/
var GameDownloadWin = /** @class */ (function (_super) {
    __extends(GameDownloadWin, _super);
    function GameDownloadWin() {
        return _super.call(this, GameDownloadUI) || this;
    }
    GameDownloadWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        OpenManager.ins.postMsg(NoticeEvent.ZY_SCORE, UserSelfModel.ins.scoreMax);
    };
    GameDownloadWin.prototype.open = function () {
        // BASE64Manager.ins.autoCheck(this.ui.imgBg);
        // BASE64Manager.ins.autoCheck(this.ui.imgGuang);
        // BASE64Manager.ins.autoCheck(this.ui.btnDownload);
        var _this = this;
        Laya.timer.loop(100, this, function () {
            _this.ui.imgGuang.rotation += 1;
        });
    };
    GameDownloadWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
                break;
            case "btnDownload":
                HttpManager.ins.link(CustomDefine.downloadUrl);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
                //UIManager.ins.closeWindow(this.uiType);
                break;
            default:
                break;
        }
    };
    GameDownloadWin.prototype.close = function () {
    };
    return GameDownloadWin;
}(BaseWindow));
