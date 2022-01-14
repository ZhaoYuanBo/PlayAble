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
2019-05-10 andy
* 农田
*/
var Farm = /** @class */ (function (_super) {
    __extends(Farm, _super);
    function Farm(cfgFarm) {
        var _this = _super.call(this) || this;
        /**水果ID */
        _this.fruitId = 1;
        /**篮子里边水果的价值 */
        _this.moneyCount = 0;
        _this.cfgFarm = cfgFarm;
        _this.x = _this.cfgFarm.targetX;
        _this.y = _this.cfgFarm.targetY;
        _this.arrFarmer = [];
        _this.imgGrass = new Laya.Image();
        _this.imgGrass.y = 120;
        _this.imgGrass.skin = "game/img_grass.png";
        _this.addChild(_this.imgGrass);
        _this.imgTree1 = new Laya.Image();
        _this.imgTree1.anchorX = 0.5;
        _this.imgTree1.anchorY = 1;
        _this.imgTree1.x = 430;
        _this.imgTree1.y = 80;
        _this.imgTree1.skin = "game/img_tree_" + _this.fruitId + ".png";
        _this.addChild(_this.imgTree1);
        _this.imgTree2 = new Laya.Image();
        _this.imgTree2.anchorX = 0.5;
        _this.imgTree2.anchorY = 1;
        _this.imgTree2.x = 500;
        ;
        _this.imgTree2.y = 80;
        _this.imgTree2.skin = "game/img_tree_" + _this.fruitId + ".png";
        _this.addChild(_this.imgTree2);
        _this.imgBasket = new Laya.Image();
        _this.imgBasket.anchorY = 1;
        _this.imgBasket.x = 15;
        _this.imgBasket.y = 80;
        _this.imgBasket.skin = "game/img_basket.png";
        _this.addChild(_this.imgBasket);
        _this.imgBasketFruit = new Laya.Image();
        _this.imgBasketFruit.x = 4.5;
        _this.imgBasketFruit.y = -20;
        _this.imgBasketFruit.skin = "game/img_basket_" + _this.fruitId + ".png";
        _this.imgBasket.addChild(_this.imgBasketFruit);
        _this.imgBasketFruit.visible = false;
        _this.imgGold = new Laya.Image();
        _this.imgGold.x = 20;
        _this.imgGold.y = -15;
        _this.imgGold.scaleX = _this.imgGold.scaleY = 0.6;
        _this.imgGold.skin = "game/img_gold.png";
        _this.addChild(_this.imgGold);
        _this.imgBasketFruit.visible = false;
        _this.imgLeader = new Laya.Image();
        _this.imgLeader.x = 105;
        _this.imgLeader.y = -15;
        _this.imgLeader.scaleX = _this.imgLeader.scaleY = 0.6;
        _this.imgLeader.skin = "game/img_manager.png";
        _this.addChild(_this.imgLeader);
        LayerManager.ins.addChild(_this, LayerName.scene_map);
        _this.init();
        return _this;
    }
    Farm.prototype.init = function () {
        this.createKing();
        var tt = null;
        tt = new TweenTarget("farm_" + this.cfgFarm.id + "_tree1", this.imgTree1, TweenManager.ins.creatProp(TweenPropType.PING_PANG, [10]), 10);
        TweenManager.ins.regTween(tt);
        tt = new TweenTarget("farm_" + this.cfgFarm.id + "_tree2", this.imgTree2, TweenManager.ins.creatProp(TweenPropType.PING_PANG, [10]), 10);
        TweenManager.ins.regTween(tt);
    };
    /**
     * 设置水果ID
     * @param v
     */
    Farm.prototype.setFruit = function (v) {
        this.fruitId = v;
    };
    //创建生物
    Farm.prototype.createKing = function () {
        var farmer = new Farmer();
        farmer.init();
        farmer.setFarm(this);
        this.arrFarmer.push(farmer);
    };
    //创建领导
    Farm.prototype.createLeader = function () {
        this.leader = new Leader();
        this.leader.init();
        this.leader.setFarm(this);
        this.imgLeader.visible = false;
    };
    /**
     * 领导加速技能
     * @param rate 不要大于2
     */
    Farm.prototype.setLeaderSpeed = function (rate) {
        if (rate === void 0) { rate = 1; }
        for (var _i = 0, _a = this.arrFarmer; _i < _a.length; _i++) {
            var farmer = _a[_i];
            farmer.speed = this.cfgFarm.moveSpeed * rate;
            farmer.loadSpeed = this.cfgFarm.loadSpeed * (1 - (rate - 1));
            farmer.interval = this.cfgFarm.frameTime * (1 - (rate - 1));
        }
    };
    /**
     * 攻击果树
     * @param doing
     */
    Farm.prototype.attackTree = function (doing) {
        if (doing) {
            TweenManager.ins.play(true, "farm_" + this.cfgFarm.id + "_tree1");
            TweenManager.ins.play(true, "farm_" + this.cfgFarm.id + "_tree2");
        }
        else {
            TweenManager.ins.stop("farm_" + this.cfgFarm.id + "_tree1", false);
            TweenManager.ins.stop("farm_" + this.cfgFarm.id + "_tree2", false);
        }
    };
    /**
     * 放置水果到篮子
     * @param doing
     */
    Farm.prototype.showBasketFruit = function (doing) {
        if (doing) {
            this.imgBasketFruit.visible = true;
            this.moneyCount += 100;
        }
        else {
            this.imgBasketFruit.visible = false;
        }
    };
    /**
     * 收集篮子水果
     * @param doing
     */
    Farm.prototype.getBasketFruit = function (doing, loadCount) {
        if (loadCount === void 0) { loadCount = 0; }
        if (doing) {
            this.imgBasket.rotation = -35;
            return 0;
        }
        else {
            this.imgBasket.rotation = 0;
            //计算可以获得金币的数量
            var ret = 0;
            if (loadCount < this.moneyCount) {
                ret = loadCount;
            }
            else {
                ret = this.moneyCount;
            }
            this.moneyCount -= ret;
            this.imgBasketFruit.visible = this.moneyCount > 0;
            return ret;
        }
    };
    /**
     * 篮子是否有水果
     */
    Farm.prototype.isBasketEmpty = function () {
        return !this.imgBasketFruit.visible;
    };
    /**
     *
     */
    Farm.prototype.update = function () {
        for (var _i = 0, _a = this.arrFarmer; _i < _a.length; _i++) {
            var farmer = _a[_i];
            farmer.update();
        }
    };
    return Farm;
}(Laya.Sprite));
