var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RankWin = (function (_super) {
    __extends(RankWin, _super);
    function RankWin() {
        var _this = _super.call(this) || this;
        _this.list.renderHandler = Laya.Handler.create(_this, _this.renderItem, null, false);
        _this.onAdd();
        return _this;
    }
    RankWin.prototype.onAdd = function () {
        this.off(Laya.Event.ADDED, this, this.onAdd);
        this.on(Laya.Event.REMOVED, this, this.onRemove);
        EventManager.ins.on(EventKey.GET_RANK, this, this.GET_RANK);
    };
    RankWin.prototype.onRemove = function () {
        this.off(Laya.Event.REMOVED, this, this.onRemove);
        this.on(Laya.Event.ADDED, this, this.onAdd);
        EventManager.ins.off(EventKey.GET_RANK, this, this.GET_RANK);
    };
    RankWin.prototype.GET_RANK = function (ek) {
        this.list.dataSource = GameModel.ins.arrUserData;
    };
    RankWin.prototype.renderItem = function (cell, index) {
        var data = cell.dataSource;
        var item = cell;
        item.txtRank.text = (1 + index) + "";
        item.txtName.text = data.nickname.substr(0, 6);
        item.txtScore.text = data.KVDataList[0].value;
        item.imgHead.skin = data.avatarUrl;
        // if(Global.isGame1){
        // 	item.imgBg.width=663;
        // }else if(Global.isGame2){
        // 	item.imgBg.width=551;
        // }else if(Global.isGame3){
        // 	item.imgBg.width=579;
        // 	item.txtNum.color= "#ffff00";
        // 	item.txtName.color= "#ffffff";
        // 	item.txtScore.color= "#ffffff";
        // }else{
        // 	item.imgBg.width=663;
        // }
    };
    return RankWin;
}(ui.RankUI));
