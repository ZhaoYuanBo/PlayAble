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
* 怪物界面
2020-01-09 andy
*/
var MonsterWin = /** @class */ (function (_super) {
    __extends(MonsterWin, _super);
    function MonsterWin() {
        var _this = _super.call(this, MonsterUI) || this;
        _this.isBgWhite = true;
        return _this;
    }
    MonsterWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        this.dicMonster = new Dictionary();
        this.arrAngle = [0, 270, 315, 0, 45, 90, 135, 180, 215];
    };
    MonsterWin.prototype.open = function () {
        _super.prototype.open.call(this);
        this.ui.menu.selectHandler = Laya.Handler.create(this, this.selectMenu, null, false);
        this.ui.list.renderHandler = Laya.Handler.create(this, this.renderHandler, null, false);
        this.ui.list.selectHandler = Laya.Handler.create(this, this.selectHandler, null, false);
        //默认是false
        this.ui.list.selectEnable = true;
        this.ui.menu.labels = "普通,BOSS";
        this.selectMenu(0);
    };
    MonsterWin.prototype.close = function () {
        if (this.king) {
            this.king.onDeadDisappear();
        }
        _super.prototype.close.call(this);
    };
    MonsterWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        var actionDirect = Number(spName.replace("btnDirect", ""));
        if (actionDirect > 0) {
            this.changeActionDirect(actionDirect);
            return;
        }
        var actionType = Number(spName.replace("btnType", ""));
        if (actionType >= 0) {
            this.changeActionType(actionType);
            return;
        }
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
    MonsterWin.prototype.selectMenu = function (ne) {
        var index = Number(ne);
        this.arrData = DataConfig.ins.getMonsters();
        this.ui.list.array = this.arrData;
    };
    MonsterWin.prototype.renderHandler = function (item, index) {
        var data = this.arrData[index];
        item.name = "item_" + index;
        var btn = item.getChildByName("btnEffect");
        btn.label = data.name;
    };
    MonsterWin.prototype.selectHandler = function (index) {
        if (this.king) {
            this.king.removeSelf();
        }
        var data = this.arrData[index];
        this.king = this.dicMonster.get(data.id);
        if (!this.king) {
            this.king = new EnemyKing();
            this.king.setData(data);
            this.king.initPosition(new Laya.Point(Define.DeviceW >> 1, 900));
            this.dicMonster.add(data.id, this.king);
        }
        else {
        }
        this.ui.addChild(this.king);
        // TipManager.ins.showWord("选择成功！",0,0);
    };
    MonsterWin.prototype.changeActionDirect = function (ad) {
        if (!this.king) {
            TipManager.ins.showWord("请先选择一个怪物！");
            return;
        }
        if (Define.gameType == GameType.over_look) {
            this.king.spBody.rotation = this.arrAngle[ad];
        }
        else {
        }
    };
    MonsterWin.prototype.changeActionType = function (at) {
        if (!this.king) {
            TipManager.ins.showWord("请先选择一个怪物！");
            return;
        }
        this.king.setActionType(at);
    };
    return MonsterWin;
}(BaseWindow));
