var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var game;
    (function (game) {
        var GameUI = /** @class */ (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                return _super.call(this) || this;
            }
            GameUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameUI.uiView);
            };
            GameUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "imgBg", "name": "imgBg" } }, { "type": "Button", "props": { "y": 17, "x": 19, "var": "btnBack", "stateNum": 1, "skin": "game/btn_fh.png", "name": "btnBack" } }, { "type": "Label", "props": { "y": 37, "x": 167, "width": 134, "var": "txtScoe", "text": "0", "name": "txtScoe", "height": 40, "fontSize": 40, "color": "#ffffff", "align": "left" } }, { "type": "Image", "props": { "y": 577, "width": 100, "var": "imgEfct", "name": "imgEfct", "height": 50, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }] };
            return GameUI;
        }(View));
        game.GameUI = GameUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameOverUI = /** @class */ (function (_super) {
            __extends(GameOverUI, _super);
            function GameOverUI() {
                return _super.call(this) || this;
            }
            GameOverUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameOverUI.uiView);
            };
            GameOverUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 434, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 438, "x": 628, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 437, "text": "游戏结束", "fontSize": 24, "color": "#ffffff", "centerX": 0 } }, { "type": "Button", "props": { "y": 665, "x": 158, "width": 177, "var": "btnAgin", "skin": "common/button.png", "name": "btnAgin", "labelSize": 40, "label": "再来一次", "height": 77 } }, { "type": "Button", "props": { "y": 661, "x": 388, "width": 177, "var": "btnMain", "skin": "common/button.png", "name": "btnMain", "labelSize": 40, "label": "返回主页", "height": 77 } }, { "type": "Label", "props": { "y": 531, "x": 207, "text": "本次得分", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 531, "x": 369, "width": 100, "var": "txtScore", "text": "0", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 576, "x": 207, "text": "最高得分", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 576, "x": 369, "width": 100, "var": "txtScoreMax", "text": "0", "fontSize": 24, "font": "SimSun", "color": "#000000" } }] };
            return GameOverUI;
        }(View));
        game.GameOverUI = GameOverUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        LoadingUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }, { "type": "Image", "props": { "y": 306, "width": 190, "var": "imgLogo", "name": "imgLogo", "height": 190, "centerX": 0 } }, { "type": "Text", "props": { "y": 1153, "x": 0, "wordWrap": true, "width": 736, "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", "leading": 15, "height": 93, "fontSize": 28, "font": "SimSun", "color": "#000000", "bold": false, "align": "left" } }, { "type": "ProgressBar", "props": { "y": 1004, "x": 74, "width": 500, "var": "bar", "height": 30 } }, { "type": "Label", "props": { "y": 520, "width": 341, "text": "乐帆游戏 快乐远行", "height": 54, "fontSize": 40, "font": "SimSun", "color": "#000000", "centerX": 0 } }] };
        return LoadingUI;
    }(View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var BagUI = /** @class */ (function (_super) {
            __extends(BagUI, _super);
            function BagUI() {
                return _super.call(this) || this;
            }
            BagUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.BagUI.uiView);
            };
            BagUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 434, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 439, "x": 576, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 437, "x": 340, "text": "背包", "fontSize": 24 } }] };
            return BagUI;
        }(View));
        main.BagUI = BagUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainUI = /** @class */ (function (_super) {
            __extends(MainUI, _super);
            function MainUI() {
                return _super.call(this) || this;
            }
            MainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainUI.uiView);
            };
            MainUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }, { "type": "Button", "props": { "y": 961, "x": 45, "width": 177, "var": "btnBag", "skin": "common/button.png", "name": "btnBag", "labelSize": 40, "label": "背包", "height": 77 } }, { "type": "Button", "props": { "y": 852, "x": 255, "width": 177, "var": "btnStart", "skin": "common/button.png", "name": "btnStart", "labelSize": 40, "label": "开始游戏", "height": 77 } }, { "type": "Button", "props": { "y": 963, "x": 257, "width": 177, "var": "btnShare", "skin": "common/button.png", "name": "btnShare", "labelSize": 40, "label": "分享", "height": 77 } }, { "type": "Button", "props": { "y": 961, "x": 482, "width": 177, "var": "btnRank", "skin": "common/button.png", "name": "btnRank", "labelSize": 40, "label": "排行榜", "height": 77 } }] };
            return MainUI;
        }(View));
        main.MainUI = MainUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var RankUI = /** @class */ (function (_super) {
            __extends(RankUI, _super);
            function RankUI() {
                return _super.call(this) || this;
            }
            RankUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.RankUI.uiView);
            };
            RankUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 234, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 700, "centerX": 0 } }, { "type": "Button", "props": { "y": 238, "x": 625, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 238, "x": 334, "text": "排行榜", "fontSize": 24, "color": "#000000" } }] };
            return RankUI;
        }(View));
        main.RankUI = RankUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
