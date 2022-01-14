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
        GameCtrl.ins.initDownloadLang(this.ui);
    };
    GameDownloadWin.prototype.open = function () {
        _super.prototype.open.call(this);
        Base64Manager.ins.checkImg(this.ui.imgBg, CustomBase64.bg_download);
        // Laya.timer.loop(100,this,()=>{
        //     this.ui.imgGuang.rotation+=1;
        // })
        var tt = new TweenTarget(CustomDefine.animGuideDesc, this.ui.btnDownload, TweenManager.ins.creatProp(TweenPropType.SMALL_BIG, [0.9, 1.1, 1000, 1000]), 0);
        TweenManager.ins.regTween(tt);
        TweenManager.ins.play(true, CustomDefine.animGuideDesc);
        if (GameCtrl.ins.self.hp == 0) {
            this.ui.txtReady.text = "You are dead! Continue to challenge?";
        }
        else {
            this.ui.txtReady.text = "Good job. Keep fighting, right?";
        }
    };
    GameDownloadWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
                break;
            case "btnDownload":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
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
