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
* 序列帧界面
2020-01-08 andy
*/
var FrameWin = /** @class */ (function (_super) {
    __extends(FrameWin, _super);
    function FrameWin() {
        var _this = _super.call(this, FrameUI) || this;
        _this.isBgWhite = true;
        _this.menuInex = 0;
        return _this;
    }
    FrameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        this.dicFrame = new Dictionary();
        this.ui.menu.labels = "默认,战斗,发光,金币";
        this.arrData = [[], [], [], [], []];
        var arr = FrameManager.ins.getCfgs();
        var type = 0;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var cfg = arr_1[_i];
            if (cfg.count == 0)
                continue;
            var sk = cfg.skin.substring(0, cfg.skin.indexOf("/"));
            type = Number(sk.replace("frame", ""));
            this.arrData[type].push(cfg);
        }
    };
    FrameWin.prototype.open = function () {
        var _this = this;
        _super.prototype.open.call(this);
        this.ui.menu.selectHandler = Laya.Handler.create(this, this.selectMenu, null, false);
        this.ui.list.renderHandler = Laya.Handler.create(this, this.renderHandler, null, false);
        this.ui.list.selectHandler = Laya.Handler.create(this, this.selectHandler, null, false);
        this.ui.iptFrameRate.on(Laya.Event.BLUR, this, function () {
            _this.frame.setInterval(Number(_this.ui.iptFrameRate.text));
        });
        this.ui.iptFrameScale.on(Laya.Event.BLUR, this, function () {
            _this.frame.scale(Number(_this.ui.iptFrameScale.text), Number(_this.ui.iptFrameScale.text));
        });
        //默认是false
        this.ui.list.selectEnable = true;
        this.selectMenu(0);
    };
    FrameWin.prototype.close = function () {
        if (this.frame) {
            this.frame.stopFrame();
        }
        _super.prototype.close.call(this);
    };
    FrameWin.prototype.viewClick = function (sp) {
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
    FrameWin.prototype.selectMenu = function (ne) {
        this.menuInex = Number(ne);
        this.ui.list.array = this.arrData[this.menuInex];
        //this.ui.list.selectedIndex=0;
    };
    FrameWin.prototype.renderHandler = function (item, index) {
        var data = this.arrData[this.menuInex][index];
        item.name = "item_" + index;
        var btn = item.getChildByName("btnEffect");
        btn.label = data.desc;
    };
    FrameWin.prototype.selectHandler = function (index) {
        if (this.frame) {
            this.frame.stopFrame();
        }
        var data = this.arrData[this.menuInex][index];
        this.frame = this.dicFrame.get(data.id);
        if (!this.frame) {
            this.frame = new BaseFrame(data);
            this.frame.x = Define.DeviceW >> 1;
            this.frame.y = 700;
            this.dicFrame.add(data.id, this.frame);
        }
        else {
        }
        this.ui.iptFrameRate.text = data.rate + "";
        this.ui.iptFrameScale.text = "1";
        this.frame.setInterval(data.rate);
        this.frame.scale(1, 1);
        this.frame.playFrame(true);
        // TipManager.ins.showWord("选择成功！",0,0);
    };
    return FrameWin;
}(BaseWindow));
