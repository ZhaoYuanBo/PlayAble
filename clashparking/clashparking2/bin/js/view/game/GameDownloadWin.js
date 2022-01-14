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
2019-04-24 andy
* 游戏下载界面
*/
var GameDownloadWin = /** @class */ (function (_super) {
    __extends(GameDownloadWin, _super);
    function GameDownloadWin() {
        var _this = _super.call(this, GameDownloadUI) || this;
        _this.isGuid1 = false;
        return _this;
    }
    GameDownloadWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        GameCtrl.ins.initDownloadLang(this.ui);
        // OpenManager.ins.postMsg(NoticeEvent.ZY_SCORE, UserSelfModel.ins.scoreMax);
        // this.ui.db.alpha = 1;
    };
    /**通过不同选择打开不同的界面 */
    GameDownloadWin.prototype.openByIndex = function (index) {
    };
    GameDownloadWin.prototype.open = function () {
        var _this = this;
        _super.prototype.open.call(this);
        // SoundManager.ins.playSound(CustomBase64.sound_jiatelin);
        // Laya.timer.loop(1000, this.ui.imgGuide, () => {
        //     Laya.Tween.to(this.ui.imgGuide, { scaleX: 0.2, scaleY: 0.2 }, 300, null, Laya.Handler.create(this, (evt) => {
        //         Laya.Tween.to(this.ui.imgGuide, { scaleX: 1, scaleY: 1 }, 600, null, Laya.Handler.create(this, (evt) => {
        //             this.ui.imgGuide.x = Define.DeviceW >> 1;
        //             Laya.Tween.clearAll(evt);
        //         }))
        //     }));
        // });
        var tt = new TweenTarget(CustomDefine.animGuide, this.ui.btnDownload, TweenManager.ins.creatProp(TweenPropType.SMALL_BIG, [0.9, 1.1, 360, 746]), 100);
        tt.play();
        Laya.Tween.from(this.ui.ui_logo, { y: -444 }, 400, null, Laya.Handler.create(this.ui.ui_logo, function () {
            Laya.Tween.to(_this.ui.ui_logo, { scaleX: 1.5, scaleY: 1.5 }, 150);
        }));
        // this.ui.stage.on(Laya.Event.MOUSE_DOWN, this, () => {
        //     HttpManager.ins.link(Define.DOWNLOAD_URL);
        // });
        Laya.timer.loop(300, this, this.CreateStar);
    };
    GameDownloadWin.prototype.CreateStar = function () {
        var imgStar = new Laya.Image("game/star.png");
        imgStar.anchorX = 0.5;
        imgStar.anchorY = 0.5;
        this.ui.spr.addChild(imgStar);
        imgStar.pos(360, 1480);
        var randomPosX = MathUtil.randomRange(-300, 1020);
        Laya.Tween.to(imgStar, { x: randomPosX, y: -200, alpha: 0, rotation: 600 }, 1500, null, Laya.Handler.create(this, function () {
            imgStar.alpha = 0;
        }));
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
            case "btnDownload1":
                // this.reflishGame();
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            case "btnChoose1":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            case "btnChoose2":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            default:
                break;
        }
    };
    /**
    * 展示页面的抖动效果
    * @param times 时间
    * @param delay 延迟时间
    * @param fun 触发事件
    */
    GameDownloadWin.prototype.playAnimaByTimes = function (times, delay, fun) {
        var _this = this;
        if (delay === void 0) { delay = 1000; }
        fun();
        Laya.Tween.to(this, {}, delay, null, Laya.Handler.create(this, function () {
            times--;
            if (times <= 0) {
                return;
            }
            _this.playAnimaByTimes(times, delay, fun);
        }));
    };
    GameDownloadWin.prototype.reflishGame = function () {
        UIManager.ins.closeWindow(CustomWindow.gameDownload);
        var wnd = UIManager.ins.getWindow(CustomWindow.game);
        wnd.close();
        wnd.open();
        Laya.timer.clearAll(this);
    };
    GameDownloadWin.prototype.close = function () {
    };
    return GameDownloadWin;
}(BaseWindow));
//# sourceMappingURL=GameDownloadWin.js.map