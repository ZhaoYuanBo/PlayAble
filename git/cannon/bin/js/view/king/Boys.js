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
2019-05-13 andy
* 上下传输
*/
var Boys = /** @class */ (function (_super) {
    __extends(Boys, _super);
    function Boys(arrFarm) {
        var _this = _super.call(this) || this;
        _this.arrFarm = arrFarm;
        _this.x = 0;
        _this.y = 600;
        _this.arrBoy = [];
        _this.imgGold = new Laya.Image();
        _this.imgGold.x = 40;
        _this.imgGold.y = 22;
        _this.imgGold.scaleX = _this.imgGold.scaleY = 0.6;
        _this.imgGold.skin = "game/img_gold.png";
        _this.addChild(_this.imgGold);
        _this.txtGold = new Laya.Label();
        _this.txtGold.x = 75;
        _this.txtGold.y = 22;
        _this.txtGold.fontSize = 30;
        _this.txtGold.color = "#ffffff";
        _this.txtGold.bold = true;
        _this.txtGold.text = "0";
        _this.addChild(_this.txtGold);
        LayerManager.ins.addChild(_this, LayerName.scene_map);
        _this.init();
        return _this;
    }
    Boys.prototype.init = function () {
        this.createKing();
    };
    //创建生物
    Boys.prototype.createKing = function () {
        var boy = new Boy(this);
        boy.init();
        this.arrBoy.push(boy);
    };
    /**
     * 检测农田是否有产出，有产出派出一个boy去收集
     */
    Boys.prototype.autoCheck = function (autoMust) {
        if (autoMust === void 0) { autoMust = false; }
        if (!this.farmerAdmin && !autoMust) {
            return;
        }
        for (var _i = 0, _a = this.arrFarm; _i < _a.length; _i++) {
            var farm = _a[_i];
            if (farm.moneyCount > 0) {
                this.arrBoy[0].setFarm(farm);
            }
        }
    };
    /**
     *
     */
    Boys.prototype.update = function () {
        for (var _i = 0, _a = this.arrBoy; _i < _a.length; _i++) {
            var boy = _a[_i];
            boy.update();
        }
        this.autoCheck();
    };
    /**
     * 计算妈妈可以拿走的金币
     * @param loadCount
     */
    Boys.prototype.getGold = function (loadCount) {
        if (loadCount === void 0) { loadCount = 0; }
        var ret = 0;
        var goldCount = GameModel.ins.boy_gold;
        if (loadCount < goldCount) {
            ret = loadCount;
        }
        else {
            ret = goldCount;
        }
        GameModel.ins.boy_gold -= ret;
        this.txtGold.text = GameModel.ins.boy_gold + "";
        return ret;
    };
    /**
     *
     * @param count
     */
    Boys.prototype.addGold = function (count) {
        GameModel.ins.boy_gold += count;
        this.txtGold.text = GameModel.ins.boy_gold + "";
    };
    return Boys;
}(Laya.Sprite));
