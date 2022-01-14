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
* 游戏界面
*/
var GameWin = /** @class */ (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super.call(this, GameUI) || this;
        _this.Matter = Browser.window.Matter;
        _this.LayaRender = Browser.window.LayaRender;
        return _this;
    }
    GameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //SceneManager.ins.setBackground(Define.CDN+"/atlas/not/bg_game.jpg");    
    };
    GameWin.prototype.open = function () {
        //MatterManager.ins.init();
        Laya.stage.on("resize", this, this.onResize);
    };
    GameWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnAlien":
                break;
            default:
                break;
        }
    };
    GameWin.prototype.close = function () {
    };
    GameWin.prototype.onResize = function () {
        // 设置鼠标的坐标缩放
        // Laya.stage.clientScaleX代表舞台缩放
        // Laya.stage._canvasTransform代表画布缩放
        Matter.Mouse.setScale(this.mouseConstraint.mouse, { x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d) });
    };
    return GameWin;
}(BaseWindow));
