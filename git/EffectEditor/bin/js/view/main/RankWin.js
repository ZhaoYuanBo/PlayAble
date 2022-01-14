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
* 2019-03-05 andy
排行榜界面
*/
var RankWin = /** @class */ (function (_super) {
    __extends(RankWin, _super);
    function RankWin() {
        return _super.call(this, FrameUI) || this;
    }
    RankWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
    };
    RankWin.prototype.open = function () {
        OpenManager.ins.showRankView();
        OpenManager.ins.changeOpenParent(this.ui, 60, 270);
    };
    RankWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "":
                break;
            default:
                break;
        }
    };
    return RankWin;
}(BaseWindow));
