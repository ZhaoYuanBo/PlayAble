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
* 主界面
*/
var BagWin = /** @class */ (function (_super) {
    __extends(BagWin, _super);
    function BagWin() {
        return _super.call(this, BagUI) || this;
    }
    BagWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
    };
    BagWin.prototype.open = function () {
        this.ui.menu.selectHandler = Laya.Handler.create(this, this.selectMenu, null, false);
        this.ui.list.renderHandler = Laya.Handler.create(this, this.renderHandler, null, false);
        this.ui.list.selectHandler = Laya.Handler.create(this, this.selectHandler, null, false);
        //默认是false
        this.ui.list.selectEnable = true;
        this.selectMenu(0);
    };
    BagWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "":
                break;
            default:
                break;
        }
    };
    BagWin.prototype.selectMenu = function (ne) {
        var index = Number(ne);
        this.arrData = DataConfig.ins.getKinfes(index + 1);
        this.ui.list.array = this.arrData;
    };
    BagWin.prototype.renderHandler = function (item, index) {
        var data = this.arrData[index];
        item.name = "item_" + index;
        item.imgItem.skin = "knife/knife" + data.id + ".png";
    };
    BagWin.prototype.selectHandler = function (index) {
        var data = this.arrData[index];
        UserSelfModel.ins.setKnife(data.id);
        TipManager.ins.showWord("选择成功！", 0, 0);
    };
    return BagWin;
}(BaseWindow));
