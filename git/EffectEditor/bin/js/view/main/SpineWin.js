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
//import Animation=Laya.Animation;
/*
* SPINE动画界面
2020-01-08 andy
*/
var SpineWin = /** @class */ (function (_super) {
    __extends(SpineWin, _super);
    function SpineWin() {
        var _this = _super.call(this, SpineUI) || this;
        _this.isBgWhite = true;
        _this.startx = 20;
        _this.starty = 300;
        _this.curBoneName = "";
        return _this;
    }
    SpineWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //SceneManager.ins.setBackground(Define.CDN+"/atlas/not/bg_game.jpg");
        //this.ui.spBgColor.alpha=0;
    };
    SpineWin.prototype.open = function () {
        _super.prototype.open.call(this);
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,(evt)=>{
        //     this.broken.x= Laya.stage.mouseX;
        //     this.broken.y= Laya.stage.mouseY;
        //     this.broken.play(true);
        // });
    };
    SpineWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        if (this.curBoneName == spName) {
            if (this.curBone) {
                this.curBone.play(true);
            }
            return;
        }
        else {
            this.curBoneName = spName;
        }
        // BoneManager.ins.removeBoneAll();
        if (this.curBone) {
            this.curBone.stop();
        }
        switch (spName) {
            case "btnClose":
                UIManager.ins.closeWindow(CustomWindow.frame);
                break;
            case "btnBgColor":
                this.isBgWhite = !this.isBgWhite;
                this.ui.spBgColor.graphics.drawRect(0, 0, Define.DeviceW, Define.DeviceH, this.isBgWhite ? "#ffffff" : "#000000");
                break;
            case "btnAlien":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_alien);
                break;
            case "btnDragon":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_dragon);
                break;
            case "btnArmorgirl":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_armorgirl);
                break;
            case "btnGreengirl":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_greengirl);
                break;
            case "btnOrangegirl":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_orangegirl);
                break;
            case "btnSpineboy":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_spineboy);
                break;
            case "btnRaptor":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_raptor);
                break;
            case "btnTank":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_tank);
                break;
            case "btnTransforms":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_transforms);
                break;
            case "btnVine":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_vine);
                break;
            case "btnBroken":
                this.curBone = BoneManager.ins.createBone(CustomBase64.bone_broken);
                break;
            default:
                break;
        }
        if (this.curBone) {
            this.curBone.x = 400;
            this.curBone.y = 1000;
            this.curBone.scaleX = this.curBone.scaleY = 0.5;
            this.curBone.play(true, LayerName.ui_effect);
        }
    };
    SpineWin.prototype.close = function () {
    };
    return SpineWin;
}(BaseWindow));
