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
* 上下运输
*/
var Boy = /** @class */ (function (_super) {
    __extends(Boy, _super);
    function Boy(boys) {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        /**单次采摘时间 */
        _this.loadSpeed = 2000;
        /**单次采摘数量 */
        _this.loadCount = 100;
        //最上边
        _this.minY = 800;
        _this.boys = boys;
        _this.loadBar = new Laya.ProgressBar("game/loading_yellow.png");
        _this.loadBar.x = 30;
        _this.loadBar.y = -40;
        _this.addChild(_this.loadBar);
        _this.loadBar.visible = false;
        _this.imgGold = new Laya.Image();
        _this.imgGold.x = 20;
        _this.imgGold.y = -15;
        _this.imgGold.scaleX = _this.imgGold.scaleY = 0.6;
        _this.imgGold.skin = "game/img_gold.png";
        _this.addChild(_this.imgGold);
        _this.txtGold = new Laya.Label();
        _this.txtGold.x = 55;
        _this.txtGold.y = -15;
        _this.txtGold.fontSize = 30;
        _this.txtGold.color = "#ffffff";
        _this.txtGold.bold = true;
        _this.txtGold.text = "0";
        _this.addChild(_this.txtGold);
        _this.imgFruit = new Laya.Image();
        _this.imgFruit.x = 15;
        _this.imgFruit.y = 70;
        _this.imgFruit.scaleX = _this.imgFruit.scaleY = 0.8;
        _this.imgFruit.skin = "game/img_boy_fruit_1.png";
        _this.addChild(_this.imgFruit);
        _this.imgFruit.visible = false;
        _this.x = 10;
        return _this;
    }
    Boy.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setActionType(ActionType.Wait);
        var arrAction = [new Action(ActionType.Wait, 3), new Action(ActionType.Up, 5), new Action(ActionType.Down, 5)];
        var skinData = new SkinData("king", "boy", arrAction);
        this.setSkin(skinData, true);
        this.speed = 2;
        this.interval = 100;
        this.width = 145, this.height = 200;
        this.y = 800;
        this.minY = this.y;
        this.mouseEnabled = true;
        this.on(Laya.Event.CLICK, this, this.clickBoy);
    };
    Boy.prototype.clickBoy = function (e) {
        if (!this.farmerAdmin && this.curAticonType == ActionType.Wait) {
            this.boys.autoCheck(true);
            if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_3) {
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    };
    Boy.prototype.setFarm = function (farm) {
        this.farm = farm;
    };
    /**
     *
     */
    Boy.prototype.update = function () {
        if (this.curAticonType == ActionType.Wait) {
            //待机
            if (this.farm) {
                this.setActionType(ActionType.Down);
            }
        }
        else if (this.curAticonType == ActionType.Left) {
        }
        else if (this.curAticonType == ActionType.Right) {
        }
        else if (this.curAticonType == ActionType.Up) {
            if (this.y - this.speed > this.minY) {
                this.pos(this.x, this.y - this.speed);
            }
            else {
                //到达上边，开始卸载水果
                if (this.txtGold.text == "0") {
                    this.setActionType(ActionType.Down);
                    return;
                }
                if (!this.loadBar.visible) {
                    this.lastTime = Laya.timer.currTimer;
                    this.loadBar.visible = true;
                }
                this.loadBar.value = (Laya.timer.currTimer - this.lastTime) / this.loadSpeed;
                if (this.loadBar.value >= 1) {
                    this.boys.addGold(Number(this.txtGold.text));
                    this.loadBar.visible = false;
                    this.imgFruit.visible = false;
                    this.txtGold.text = "0";
                    if (!this.farm) {
                        this.setActionType(ActionType.Wait);
                    }
                    if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_4) {
                        EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                    }
                }
            }
        }
        else if (this.curAticonType == ActionType.Down) {
            if (!this.farm) {
                return;
            }
            if (this.y + this.speed + this.height < this.farm.cfgFarm.targetY + 120) {
                this.pos(this.x, this.y + this.speed);
            }
            else {
                //到达下边篮子，开始收集
                if (this.farm.isBasketEmpty()) {
                    this.setActionType(ActionType.Up);
                    return;
                }
                this.farm.getBasketFruit(true);
                if (!this.loadBar.visible) {
                    this.lastTime = Laya.timer.currTimer;
                    this.loadBar.visible = true;
                }
                this.loadBar.value = (Laya.timer.currTimer - this.lastTime) / this.loadSpeed;
                if (this.loadBar.value >= 1) {
                    var getCount = this.farm.getBasketFruit(false, this.loadCount);
                    this.loadBar.visible = false;
                    this.txtGold.text = getCount + "";
                    this.imgFruit.visible = true;
                    this.setActionType(ActionType.Up);
                    this.farm = null;
                }
            }
        }
        else {
            console.log("没有方向");
        }
    };
    Boy.prototype.dead = function () {
        this.removeSelf();
    };
    return Boy;
}(BaseKing));
