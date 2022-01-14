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
* 技能界面
2020-01-09 andy
*/
var SkillWin = /** @class */ (function (_super) {
    __extends(SkillWin, _super);
    function SkillWin() {
        var _this = _super.call(this, SkillUI) || this;
        _this.isBgWhite = true;
        return _this;
    }
    SkillWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        this.dicSkill = new Dictionary();
        this.self = new SelfKing();
        this.self.x = Define.DeviceW >> 1;
        this.self.y = 1000;
        this.enemy = new EnemyKing();
        this.enemy.x = Define.DeviceW >> 1;
        this.enemy.y = 600;
        this.ui.addChild(this.enemy);
        this.self.atkTarget = this.enemy;
        this.self.spBody.rotation = 270;
        var level = DataConfig.ins.getLevel(1);
        this.self.init();
        this.self.setData(level);
        this.ui.addChild(this.self);
    };
    SkillWin.prototype.open = function () {
        _super.prototype.open.call(this);
        this.ui.menu.selectHandler = Laya.Handler.create(this, this.selectMenu, null, false);
        this.ui.list.renderHandler = Laya.Handler.create(this, this.renderHandler, null, false);
        this.ui.list.selectHandler = Laya.Handler.create(this, this.selectHandler, null, false);
        //默认是false
        this.ui.list.selectEnable = true;
        this.selectMenu(0);
        this.ui.menu.labels = "子弹,挥刀";
    };
    SkillWin.prototype.close = function () {
        if (this.skill) {
            this.skill.stop();
        }
        _super.prototype.close.call(this);
    };
    SkillWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnClose":
                UIManager.ins.closeWindow(CustomWindow.frame);
                break;
            case "btnBgColor":
                this.isBgWhite = !this.isBgWhite;
                this.ui.spBgColor.graphics.drawRect(0, 0, Define.DeviceW, Define.DeviceH, this.isBgWhite ? "#ffffff" : "#000000");
                break;
            default:
                break;
        }
    };
    SkillWin.prototype.selectMenu = function (ne) {
        var index = Number(ne);
        this.arrData = SkillManager.ins.getCfgs();
        this.ui.list.array = this.arrData;
    };
    SkillWin.prototype.renderHandler = function (item, index) {
        var data = this.arrData[index];
        item.name = "item_" + index;
        var btn = item.getChildByName("btnEffect");
        btn.label = data.skillName;
    };
    SkillWin.prototype.selectHandler = function (index) {
        if (this.skill) {
            this.skill.stop();
        }
        var data = this.arrData[index];
        this.skill = this.dicSkill.get(data.skillId);
        if (!this.skill) {
            var skillData = new SkillData(data, this.self, this.self.atkTarget);
            this.skill = SkillManager.ins.getSkill(skillData);
            this.dicSkill.add(data.skillId, this.skill);
        }
        else {
        }
        this.skill.play();
        this.ui.addChild(this.skill.atkingEft);
        // TipManager.ins.showWord("选择成功！",0,0);
    };
    return SkillWin;
}(BaseWindow));
