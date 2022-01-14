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
2019-04-24 andy
* 游戏下载界面
*/
var GameDownloadWin = /** @class */ (function (_super) {
    __extends(GameDownloadWin, _super);
    function GameDownloadWin() {
        var _this = _super.call(this, GameDownloadUI) || this;
        _this.curIndex = 1;
        return _this;
    }
    GameDownloadWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        GameCtrl.ins.initDownloadLang(this.ui);
        Base64Manager.ins.checkImg(this.ui.imgBg, CustomBase64.bg_download);
        Laya.stage.on(Laya.Event.CLICK, this, function () { });
        this.ui.btnDownload.y = Number(DataConfig.ins.dicGame["endDownloadY"]);
        this.ui.mouseThrough = true;
    };
    GameDownloadWin.prototype.open = function () {
        _super.prototype.open.call(this);
        var tt = new TweenTarget(CustomDefine.animGuide, this.ui.btnDownload, TweenManager.ins.creatProp(TweenPropType.SMALL_BIG, [0.9, 1.1, 600, 800]), 0);
        TweenManager.ins.regTween(tt);
        TweenManager.ins.play(true, CustomDefine.animGuide);
        //是否有轮播图,根据图片自动添加，至少提供2张
        var imgCount = 5;
        var arrString = [];
        for (var i = 1; i <= imgCount; i++) {
            var path = "game/img_end_" + i + ".png";
            if (Laya.loader.getRes(path)) {
                arrString.push(path);
            }
        }
        if (arrString.length > 1) {
            var eftData = new ChangeImageData();
            eftData.changeTime = 1500;
            eftData.arrString = arrString;
            var eft = EffectManager.ins.getEffect(EffectName.change_img, eftData, false);
            eft.play();
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
                break;
            default:
                break;
        }
    };
    GameDownloadWin.prototype.close = function () {
    };
    return GameDownloadWin;
}(BaseWindow));
