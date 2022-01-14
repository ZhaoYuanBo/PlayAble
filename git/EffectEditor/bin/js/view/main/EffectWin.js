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
* 动效界面
2020-01-09 andy
*/
var EffectWin = /** @class */ (function (_super) {
    __extends(EffectWin, _super);
    function EffectWin() {
        var _this = _super.call(this, EffectUI) || this;
        _this.isBgWhite = true;
        return _this;
    }
    EffectWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        this.dicFrame = new Dictionary();
    };
    EffectWin.prototype.open = function () {
        _super.prototype.open.call(this);
        this.ui.menu.selectHandler = Laya.Handler.create(this, this.selectMenu, null, false);
        this.ui.list.renderHandler = Laya.Handler.create(this, this.renderHandler, null, false);
        this.ui.list.selectHandler = Laya.Handler.create(this, this.selectHandler, null, false);
        //默认是false
        this.ui.list.selectEnable = true;
        this.selectMenu(0);
        this.ui.menu.labels = "金币,爆炸";
    };
    EffectWin.prototype.close = function () {
        if (this.effect) {
            this.effect.stop();
        }
        _super.prototype.close.call(this);
    };
    EffectWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnClose":
                UIManager.ins.closeWindow(CustomWindow.effect);
                break;
            case "btnBgColor":
                this.isBgWhite = !this.isBgWhite;
                this.ui.spBgColor.graphics.drawRect(0, 0, Define.DeviceW, Define.DeviceH, this.isBgWhite ? "#ffffff" : "#000000");
                break;
            default:
                break;
        }
    };
    EffectWin.prototype.selectMenu = function (ne) {
        var index = Number(ne);
        this.arrData = [];
        this.arrData.push(new Cfg_Effect("BOSS来袭", EffectName.boss_warning));
        this.arrData.push(new Cfg_Effect("空投", EffectName.air_drop));
        this.arrData.push(new Cfg_Effect("满屏金币", EffectName.out_gold));
        this.arrData.push(new Cfg_Effect("喷泉", EffectName.Fountain));
        this.arrData.push(new Cfg_Effect("水纹点击", EffectName.guide_click));
        this.arrData.push(new Cfg_Effect("图片切换", EffectName.change_img));
        this.ui.list.array = this.arrData;
    };
    EffectWin.prototype.renderHandler = function (item, index) {
        var data = this.arrData[index];
        item.name = "item_" + index;
        var btn = item.getChildByName("btnEffect");
        btn.label = data.itemName;
    };
    EffectWin.prototype.selectHandler = function (index) {
        if (this.effect) {
            this.effect.stop();
        }
        var data = this.arrData[index];
        this.effect = this.dicFrame.get(data.itemType);
        if (!this.effect) {
            this.effect = this.getEffect(data.itemType);
            this.dicFrame.add(data.id, this.effect);
        }
        else {
        }
        this.effect.play();
        // TipManager.ins.showWord("选择成功！",0,0);
    };
    EffectWin.prototype.getEffect = function (ename) {
        var ret;
        var data;
        var initX = 0;
        var initY = 0;
        if (ename == EffectName.boss_warning) {
            data = new BossWarningData("effect/img_boss.png", "effect/img_line1.png", "effect/img_line2.png", "BOSS\nComing!");
            data.wordY = 80;
            data.wordW = 260;
            data.wordH = 50;
            data.wordSize = 50;
            data.wordColor = "#ffff00";
            data.wordStroke = 4;
            data.wordStrokeColor = "#c5671e";
            SoundManager.ins.playSound(CustomBase64.sound_warning);
            initY = 900;
        }
        else if (ename == EffectName.air_drop) {
            data = new AirDropData("effect/img_drop_plane.png", "effect/img_drop_parachute.png", "effect/img_drop_shadow.png", "effect/img_drop_box.png");
            data.planeRotate = -30;
            SoundManager.ins.playSound(CustomBase64.sound_plane);
        }
        else if (ename == EffectName.out_gold) {
            data = new OutGoldData("effect/img_gold.png", 100);
            data.dropTime = 500;
            SoundManager.ins.playSound(CustomBase64.sound_reward);
        }
        else if (ename == EffectName.Fountain) {
            data = new FountainData("effect/img_gold.png");
            data.minX = 150;
            data.maxX = 550;
            data.minY = -300;
            data.maxY = -400;
            data.oneSendTime = 20;
            data.oneShowTime = 800;
            SoundManager.ins.playSound(CustomBase64.sound_reward);
            initX = Define.DeviceW >> 1;
            initY = 900;
        }
        else if (ename == EffectName.guide_click) {
            data = new GuideClickData("effect/img_guide.png");
            data.waterRadis = 50;
            data.waterRadisRate = 3;
            data.waterAlphaStart = 0.7;
            SoundManager.ins.playSound(CustomBase64.sound_btn);
            initX = Define.DeviceW >> 1;
            initY = 900;
        }
        else if (ename == EffectName.change_img) {
            data = new ChangeImageData();
            data.changeTime = 1500;
            data.arrString = ["effect/img_head1.png", "effect/img_head2.png", "effect/img_head3.png"];
            initX = Define.DeviceW >> 1;
            initY = 900;
        }
        else {
        }
        ret = EffectManager.ins.getEffect(ename, data, false);
        ret.x = initX;
        ret.y = initY;
        return ret;
    };
    return EffectWin;
}(BaseWindow));
/*
* 道具
*/
var Cfg_Effect = /** @class */ (function () {
    function Cfg_Effect(itemName, itemType) {
        this.itemName = itemName;
        this.itemType = itemType;
    }
    return Cfg_Effect;
}());
