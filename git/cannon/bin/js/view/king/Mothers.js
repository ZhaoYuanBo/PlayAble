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
* 左右传输
*/
var Mothers = /** @class */ (function (_super) {
    __extends(Mothers, _super);
    function Mothers(boys) {
        var _this = _super.call(this) || this;
        /**篮子里边水果的价值 */
        _this.moneyCount = 0;
        _this.boys = boys;
        _this.x = 200;
        _this.y = 700;
        _this.arrMother = [];
        LayerManager.ins.addChild(_this, LayerName.scene_map);
        _this.init();
        return _this;
    }
    Mothers.prototype.init = function () {
        this.createKing();
    };
    //创建生物
    Mothers.prototype.createKing = function () {
        var mother = new Mother(this);
        mother.init();
        this.arrMother.push(mother);
    };
    /**
     * 检测农田是否有产出，有产出派出一个boy去收集
     */
    Mothers.prototype.autoCheck = function () {
        if (GameModel.ins.boy_gold > 0) {
            //this.arrMother[0].setActionType(ActionType.Left);
        }
    };
    /**
     *
     */
    Mothers.prototype.update = function () {
        for (var _i = 0, _a = this.arrMother; _i < _a.length; _i++) {
            var boy = _a[_i];
            boy.update();
        }
        this.autoCheck();
    };
    /**
     * 得到可以装载的数量
     * @param loadCount 妈妈装载限额
     */
    Mothers.prototype.getLoadGold = function (loadCount) {
        return this.boys.getGold(loadCount);
    };
    return Mothers;
}(Laya.Sprite));
