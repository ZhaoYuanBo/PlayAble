var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var RankUI = (function (_super) {
        __extends(RankUI, _super);
        function RankUI() {
            return _super.call(this) || this;
        }
        RankUI.prototype.createChildren = function () {
            View.regComponent("ui.RankItemUI", ui.RankItemUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.RankUI.uiView);
        };
        return RankUI;
    }(View));
    RankUI.uiView = { "type": "View", "props": { "width": 600, "height": 700 }, "child": [{ "type": "List", "props": { "y": 0, "x": 0, "width": 600, "var": "list", "height": 700 }, "child": [{ "type": "RankItem", "props": { "y": 0, "x": 0, "name": "render", "runtime": "ui.RankItemUI" } }] }] };
    ui.RankUI = RankUI;
})(ui || (ui = {}));
(function (ui) {
    var RankItemUI = (function (_super) {
        __extends(RankItemUI, _super);
        function RankItemUI() {
            return _super.call(this) || this;
        }
        RankItemUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.RankItemUI.uiView);
        };
        return RankItemUI;
    }(View));
    RankItemUI.uiView = { "type": "View", "props": { "width": 600, "height": 80 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "var": "imgBg", "skin": "game/imgRankBg.png", "height": 80 } }, { "type": "Image", "props": { "y": 14, "x": 73, "width": 50, "var": "imgHead", "height": 50 } }, { "type": "Label", "props": { "y": 18, "x": 174, "var": "txtName", "text": "苹果很甜", "fontSize": 40, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 18, "x": 418, "var": "txtScore", "text": "10000", "fontSize": 40, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 18, "x": 10, "width": 43, "var": "txtRank", "text": "10", "height": 40, "fontSize": 40, "color": "#ffffff" } }] };
    ui.RankItemUI = RankItemUI;
})(ui || (ui = {}));
