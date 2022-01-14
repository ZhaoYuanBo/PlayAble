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
* 左右运输
*/
var Mother = /** @class */ (function (_super) {
    __extends(Mother, _super);
    function Mother(mothers) {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        /**单次采摘时间 */
        _this.loadSpeed = 2000;
        /**单次采摘数量 */
        _this.loadCount = 100;
        //最上边
        _this.minX = 0;
        //目标农田X
        _this.targetX = 0;
        _this.mothers = mothers;
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
        _this.imgFruit.x = 67;
        _this.imgFruit.y = 45;
        _this.imgFruit.scaleX = _this.imgFruit.scaleY = 0.6;
        _this.imgFruit.skin = "game/img_mother_fruit_1.png";
        _this.addChild(_this.imgFruit);
        _this.imgFruit.visible = false;
        _this.mothers.addChild(_this);
        return _this;
    }
    Mother.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setActionType(ActionType.Wait);
        var arrAction = [new Action(ActionType.Wait, 5), new Action(ActionType.Left, 5), new Action(ActionType.Right, 5)];
        var skinData = new SkinData("king", "mother", arrAction);
        this.setSkin(skinData, false);
        this.speed = 2;
        this.interval = 100;
        this.width = 105, this.height = 114;
        this.targetX = 400;
        this.x = this.targetX - 50;
        this.minX = (this.width >> 1) + 50;
        this.pivotX = this.minX;
        this.mouseEnabled = true;
        this.on(Laya.Event.CLICK, this, this.clickBoy);
    };
    Mother.prototype.clickBoy = function (e) {
        if (!this.farmerAdmin && this.curAticonType == ActionType.Wait) {
            if (GameModel.ins.boy_gold > 0) {
                this.setActionType(ActionType.Left);
            }
            if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_5) {
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            }
        }
    };
    /**
     *
     */
    Mother.prototype.update = function () {
        if (this.curAticonType == ActionType.Wait) {
            //待机
        }
        else if (this.curAticonType == ActionType.Left) {
            if (this.x - this.speed > this.minX) {
                this.pos(this.x - this.speed, this.y);
            }
            else {
                //到达左边,如果没有东西，不用装载
                if (GameModel.ins.boy_gold <= 0) {
                    if (this.farmerAdmin) {
                        this.setActionType(ActionType.Right);
                    }
                    return;
                }
                //开始装载
                if (!this.loadBar.visible) {
                    this.lastTime = Laya.timer.currTimer;
                    this.loadBar.visible = true;
                }
                this.loadBar.value = (Laya.timer.currTimer - this.lastTime) / this.loadSpeed;
                if (this.loadBar.value >= 1) {
                    var getCount = this.mothers.getLoadGold(this.loadCount);
                    this.loadBar.visible = false;
                    this.imgFruit.visible = getCount > 0;
                    this.txtGold.text = getCount + "";
                    this.setActionType(ActionType.Right);
                }
            }
        }
        else if (this.curAticonType == ActionType.Right) {
            if (this.x + this.speed < this.targetX) {
                this.pos(this.x + this.speed, this.y);
            }
            else {
                //到达右边，如果车上没有东西，不用卸载
                if (this.txtGold.text == "0") {
                    if (this.farmerAdmin) {
                        this.setActionType(ActionType.Left);
                    }
                    return;
                }
                //到达右边，开始卸载
                if (!this.loadBar.visible) {
                    this.lastTime = Laya.timer.currTimer;
                    this.loadBar.visible = true;
                }
                this.loadBar.value = (Laya.timer.currTimer - this.lastTime) / this.loadSpeed;
                if (this.loadBar.value >= 1) {
                    this.loadBar.visible = false;
                    this.imgFruit.visible = false;
                    var globalPos = this.localToGlobal(new Laya.Point(0, 0));
                    TipManager.ins.showWord("+" + this.txtGold.text, globalPos.x, globalPos.y - 10, -60, 36, "#fbd92c");
                    GameModel.ins.addScore(Number(this.txtGold.text));
                    this.txtGold.text = "0";
                    if (GameModel.ins.guideStep == GUIDE_STEP.GUIDE_6) {
                        EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                    }
                    if (GameModel.ins.boy_gold > 0) {
                        this.setActionType(ActionType.Left);
                    }
                    else {
                        this.setActionType(ActionType.Wait);
                    }
                }
            }
        }
        else if (this.curAticonType == ActionType.Up) {
        }
        else if (this.curAticonType == ActionType.Down) {
        }
        else {
            console.log("没有方向");
        }
    };
    Mother.prototype.dead = function () {
        this.removeSelf();
    };
    return Mother;
}(BaseKing));
