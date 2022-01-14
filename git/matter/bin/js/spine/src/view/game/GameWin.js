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
        _this.startx = 20;
        _this.starty = 300;
        _this.lastObjId = 0;
        _this.lastBtnName = "";
        return _this;
    }
    GameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        SceneManager.ins.setBackground(Define.CDN + "/atlas/not/bg_game.jpg");
    };
    GameWin.prototype.open = function () {
    };
    GameWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        if (this.lastBtnName == spName) {
            var bone = BoneManager.ins.getBone(this.lastObjId);
            if (bone) {
                bone.playRand();
            }
            return;
        }
        else {
            this.lastBtnName = spName;
        }
        BoneManager.ins.removeBoneAll();
        switch (spName) {
            case "btnAlien":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.alien);
                break;
            case "btnDragon":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.dragon);
                break;
            case "btnArmorgirl":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.armorgirl);
                break;
            case "btnGreengirl":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.greengirl);
                break;
            case "btnOrangegirl":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.orangegirl);
                break;
            case "btnSpineboy":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.spineboy);
                break;
            case "btnRaptor":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.raptor);
                break;
            case "btnTank":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.tank);
                break;
            case "btnTank":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.tank);
                break;
            case "btnTransforms":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.transforms);
                break;
            case "btnVine":
                this.lastObjId = BoneManager.ins.addBone(CustomKing.vine);
                break;
            default:
                break;
        }
    };
    GameWin.prototype.close = function () {
    };
    return GameWin;
}(BaseWindow));
