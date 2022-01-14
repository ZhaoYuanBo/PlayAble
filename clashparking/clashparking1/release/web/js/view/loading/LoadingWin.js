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
*
加载界面
*/
var LoadingWin = /** @class */ (function (_super) {
    __extends(LoadingWin, _super);
    function LoadingWin() {
        var _this = _super.call(this, LoadingUI) || this;
        _this.loadIndex = 0;
        return _this;
    }
    LoadingWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //2019-06-03 MTG不要加载进度条
        if (PlatformManager.mtgPlatform) {
            this.ui.visible = false;
        }
        //this.ui.imgLogo.visible=false;
        this.progressHandler = Laya.Handler.create(this, this.HTTP_PROGRESS);
        EventManager.ins.on(NoticeEvent.HTTP_PROGRESS, this, this.HTTP_PROGRESS);
        //this.arrLoad=[this.loadServerConfig,this.loadDataConfig,this.loadRes,this.loadSound];     
        this.arrLoad = [this.loadRes, this.loadDataConfig];
    };
    LoadingWin.prototype.open = function () {
        this.loadIndex = 0;
        this.loadNext();
    };
    LoadingWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "":
                break;
            default:
                break;
        }
    };
    LoadingWin.prototype.loadNext = function () {
        //console.log("loadIndex="+this.loadIndex);
        if (this.loadIndex >= this.arrLoad.length) {
            //加载结束
            EventManager.ins.event(NoticeEvent.GAME_RES_LOAD_FINISH);
            Global.platform.login();
        }
        else {
            var func = this.arrLoad[this.loadIndex++];
            if (func) {
                func.call(this);
            }
        }
    };
    LoadingWin.prototype.loadServerConfig = function () {
        LoadingCtrl.ins.preload(Laya.Handler.create(this, this.loadNext));
    };
    LoadingWin.prototype.loadDataConfig = function () {
        LoadingCtrl.ins.preloadDataConfig(Laya.Handler.create(this, this.loadNext));
    };
    LoadingWin.prototype.loadRes = function () {
        if (Base64Manager.isUseBase64) {
            var arrAtlas = [
                CustomBase64.atlas_game,
                CustomBase64.atlas_king,
                CustomBase64.atlas_frame,
                CustomBase64.json_cfg_data
            ];
            Base64Manager.ins.loadAtlas(arrAtlas, Laya.Handler.create(this, this.loadNext), this.progressHandler);
        }
        else {
            var arr = [{
                    url: Define.CDN + "/atlas/game.atlas",
                    type: Laya.Loader.ATLAS
                }, {
                    url: Define.CDN + "/atlas/frame.atlas",
                    type: Laya.Loader.ATLAS
                }, {
                    url: Define.CDN + "/atlas/king.atlas",
                    type: Laya.Loader.ATLAS
                }];
            ResManager.ins.preload(arr, Laya.Handler.create(this, this.loadNext), this.progressHandler);
        }
    };
    LoadingWin.prototype.loadSound = function () {
        var arr = [{
                url: Define.CDN + CustomDefine.SOUND_MAIN,
                type: Laya.Loader.SOUND
            }];
        SoundManager.ins.preload(arr, Laya.Handler.create(this, this.loadNext), this.progressHandler);
    };
    LoadingWin.prototype.HTTP_PROGRESS = function (e) {
        var curProgress = Number(e.data);
        var progressValue = (this.loadIndex + curProgress) / this.arrLoad.length;
        this.ui.bar.value = progressValue;
    };
    return LoadingWin;
}(BaseWindow));
//# sourceMappingURL=LoadingWin.js.map