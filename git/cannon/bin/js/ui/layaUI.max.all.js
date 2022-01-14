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
            GameUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "imgBg", "name": "imgBg" } }, { "type": "Button", "props": { "y": 120, "var": "btnDownload", "stateNum": 1, "skin": "game/btnDownload.png", "rotation": 0, "name": "btnDownload", "labelFont": "50", "centerX": 0 } }, { "type": "Box", "props": { "width": 720, "name": "gold", "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 191, "width": 265, "skin": "game/loading_yellow.png", "height": 30 } }, { "type": "Image", "props": { "y": 20, "x": 458, "skin": "game/img_gold_super.png" } }, { "type": "Image", "props": { "y": 20, "x": 156, "skin": "game/img_gold.png" } }, { "type": "Label", "props": { "y": 31, "width": 226, "var": "txtGold", "text": "0", "name": "txtGold", "height": 30, "fontSize": 30, "color": "#ffffff", "centerX": -23, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 1084, "x": 375, "width": 88, "var": "imgGuide", "skin": "game/guide.png", "name": "imgGuide", "height": 89 } }] };
            return GameUI;
        }(View));
        game.GameUI = GameUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameDownloadUI = /** @class */ (function (_super) {
            __extends(GameDownloadUI, _super);
            function GameDownloadUI() {
                return _super.call(this) || this;
            }
            GameDownloadUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameDownloadUI.uiView);
            };
            GameDownloadUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 634, "width": 720, "var": "imgGuang", "skin": "game/bg_guang.png", "name": "imgGuang", "height": 768, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 449, "width": 500, "var": "imgBg", "skin": "game/bg_download.png", "name": "imgBg", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 804, "width": 177, "var": "btnDownload", "stateNum": 1, "skin": "game/btn_continue.png", "name": "btnDownload", "labelSize": 40, "height": 77, "centerX": 0 } }] };
            return GameDownloadUI;
        }(View));
        game.GameDownloadUI = GameDownloadUI;
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
        LoadingUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "name": "imgBg", "height": 1280 } }, { "type": "Image", "props": { "y": 301, "width": 500, "var": "imgLogo", "skin": "loading/logo.png", "name": "imgLogo", "height": 250, "centerX": 0 } }, { "type": "Text", "props": { "y": 1153, "x": 26, "wordWrap": true, "width": 682, "visible": false, "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", "leading": 15, "height": 93, "fontSize": 26, "font": "SimSun", "color": "#000000", "bold": false, "align": "left" } }, { "type": "ProgressBar", "props": { "y": 700, "width": 600, "var": "bar", "skin": "loading/loading.png", "name": "bar", "height": 58, "centerX": 0 } }, { "type": "Label", "props": { "y": 603, "width": 341, "text": "loading...", "height": 54, "fontSize": 40, "font": "SimSun", "color": "#000000", "centerX": 0, "bold": true, "align": "center" } }] };
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
                View.regComponent("ui.main.BagItemUI", ui.main.BagItemUI);
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.BagUI.uiView);
            };
            BagUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 83, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 700, "centerX": 0 } }, { "type": "Button", "props": { "y": 87, "x": 631, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 86, "text": "仓库", "fontSize": 24, "color": "#000000", "centerX": 0 } }, { "type": "Tab", "props": { "y": 118, "x": 91, "width": 550, "var": "menu", "space": 5, "skin": "common/tab.png", "name": "menu", "labels": "水果刀,异形刀,大墩刀,旋风刀,屌丝刀,卡通刀", "labelStroke": 0, "labelSize": 26, "labelPadding": "5", "labelFont": "SimSun", "height": 40 } }, { "type": "List", "props": { "y": 161, "x": 85, "width": 549, "var": "list", "spaceY": 10, "spaceX": 10, "repeatX": 5, "name": "list", "height": 549 }, "child": [{ "type": "BagItem", "props": { "name": "render", "runtime": "ui.main.BagItemUI" } }] }] };
            return BagUI;
        }(View));
        main.BagUI = BagUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var BagItemUI = /** @class */ (function (_super) {
            __extends(BagItemUI, _super);
            function BagItemUI() {
                return _super.call(this) || this;
            }
            BagItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.BagItemUI.uiView);
            };
            BagItemUI.uiView = { "type": "View", "props": { "width": 100, "height": 100 }, "child": [{ "type": "Image", "props": { "width": 100, "skin": "game/icon.png", "height": 100 } }, { "type": "Image", "props": { "y": 50, "x": 50, "var": "imgItem", "name": "imgItem", "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 67, "var": "txtCount", "text": "0", "name": "txtCount", "fontSize": 28, "font": "SimSun", "centerX": 0 } }] };
            return BagItemUI;
        }(View));
        main.BagItemUI = BagItemUI;
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
            MainUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }] };
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
