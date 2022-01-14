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
2019-05-08 andy
* 农民
*/
var Farmer = /** @class */ (function (_super) {
    __extends(Farmer, _super);
    function Farmer() {
        var _this = _super.call(this) || this;
        //采摘时间
        _this.loadSpeed = 2000;
        _this.lastTime = 0;
        //加载条
        _this.loadBar = new Laya.ProgressBar("game/loading_yellow.png");
        _this.loadBar.y = -20;
        _this.addChild(_this.loadBar);
        _this.loadBar.visible = false;
        _this.imgFruit = new Laya.Image();
        _this.imgFruit.x = 30;
        _this.imgFruit.y = 30;
        _this.imgFruit.scaleX = _this.imgFruit.scaleY = 0.6;
        _this.imgFruit.skin = "game/img_farmer_fruit_1.png";
        _this.addChild(_this.imgFruit);
        _this.imgFruit.visible = false;
        return _this;
    }
    Farmer.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setActionType(ActionType.Wait);
        var arrAction = [new Action(ActionType.Wait, 5), new Action(ActionType.Left, 5), new Action(ActionType.Right, 5), new Action(ActionType.ATTACK, 5)];
        var skinData = new SkinData("king", "farmer", arrAction);
        this.setSkin(skinData, false);
        this.width = 105, this.height = 114;
        this.mouseEnabled = true;
        this.on(Laya.Event.CLICK, this, this.clickFarmer);
    };
    Farmer.prototype.clickFarmer = function (e) {
        if (!this.farm.leader && this.curAticonType == ActionType.Wait) {
            this.setActionType(ActionType.Right);
            if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_1) {
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    };
    /**
     * 设置所属农场
     * @param farm
     */
    Farmer.prototype.setFarm = function (farm) {
        this.farm = farm;
        this.x = this.farm.cfgFarm.minX;
        this.y = -20;
        this.speed = this.farm.cfgFarm.moveSpeed;
        this.loadSpeed = this.farm.cfgFarm.loadSpeed;
        this.interval = this.farm.cfgFarm.frameTime;
        this.farm.addChild(this);
    };
    /**
     *
     */
    Farmer.prototype.update = function () {
        if (this.curAticonType == ActionType.Wait) {
            //待机
            if (this.farm.leader) {
                this.setActionType(ActionType.Right);
            }
        }
        else if (this.curAticonType == ActionType.Left) {
            if (this.x - this.speed > this.farm.cfgFarm.minX) {
                this.pos(this.x - this.speed, this.y);
            }
            else {
                //到达左边篮子,放下水果
                if (this.farm.leader) {
                    this.setActionType(ActionType.Right);
                }
                else {
                    //this.setActionType(ActionType.Wait);
                    if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_2) {
                        EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                    }
                    this.setActionType(ActionType.Wait);
                }
                this.imgFruit.visible = false;
                this.farm.showBasketFruit(true);
            }
        }
        else if (this.curAticonType == ActionType.Right) {
            if (this.x + this.speed + this.width < this.farm.cfgFarm.maxX) {
                this.pos(this.x + this.speed, this.y);
            }
            else {
                //到达右边树下，开始采摘
                this.lastTime = Laya.timer.currTimer;
                this.setActionType(ActionType.ATTACK);
                this.farm.attackTree(true);
            }
        }
        else if (this.curAticonType == ActionType.Up) {
        }
        else if (this.curAticonType == ActionType.Down) {
        }
        else if (this.curAticonType == ActionType.ATTACK) {
            this.loadBar.value = (Laya.timer.currTimer - this.lastTime) / this.loadSpeed;
            if (!this.loadBar.visible) {
                this.loadBar.visible = true;
            }
            if (this.loadBar.value >= 1) {
                this.farm.attackTree(false);
                this.loadBar.visible = false;
                this.imgFruit.visible = true;
                this.setActionType(ActionType.Left);
            }
        }
        else {
            console.log("没有方向");
        }
    };
    Farmer.prototype.dead = function () {
        this.removeSelf();
    };
    return Farmer;
}(BaseKing));
