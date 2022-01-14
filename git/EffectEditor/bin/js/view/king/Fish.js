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
* 鱼类
*/
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        var _this = _super.call(this) || this;
        _this.isCatch = false;
        _this.isDead = false;
        _this.speed = 1;
        _this.lastTime = 0;
        _this.offY = 30;
        _this.initY = 0;
        _this.fishImg = new Laya.Image();
        _this.fishImg.anchorY = 0.5;
        _this.fishImg.anchorX = 0.5;
        _this.addChild(_this.fishImg);
        return _this;
    }
    Fish.prototype.init = function () {
        this.isDead = false;
        this.width = 150, this.height = 100;
        this.fishImg.skin = "king/" + this.kingType + ".png";
        this.initY = this.y;
        this.speed = 1 * (MathUtil.randomRange(0, 1) == 0 ? 1 : -1);
        if (this.kingType == "king1") {
            //this.fishImg.scaleX=this.fishImg.scaleY=0.7;
            this.width = 100, this.height = 80;
            //this.speed = MathUtil.randomRange(20,25)/10;
        }
        else {
        }
        LayerManager.ins.addChild(this, LayerName.scene_map);
    };
    Fish.prototype.setActionType = function (v) {
        this.curAticonType = v;
        if (this.curAticonType == ActionType.Left) {
            this.fishImg.skewY = 0;
        }
        else {
            this.fishImg.skewY = 180;
        }
    };
    /**
     *
     */
    Fish.prototype.update = function () {
        if (this.isDead) {
            return;
        }
        if (this.isCatch) {
            // if(Laya.timer.currTimer-this.lastTime>=100){
            //     this.lastTime=Laya.timer.currTimer;
            //     let randR:number=MathUtil.randomRange(0,180);
            //     this.fishImg.rotation=randR;
            // }
            return;
        }
        // if(this.curAticonType == ActionType.Left){
        //     if(this.x-this.speed>0){
        //         this.pos(this.x-this.speed,this.y);
        //     }else{
        //         this.setActionType(ActionType.Right);  
        //     }
        // }else  if(this.curAticonType == ActionType.Right){
        //     if(this.x+this.speed+this.width<Define.DeviceW){
        //         this.pos(this.x+this.speed,this.y);
        //     }else{
        //         this.setActionType(ActionType.Left);
        //     }
        // }else{
        //     console.log("没有方向");
        // }
        this.pos(this.x, this.y + this.speed);
        if (this.y <= this.initY - this.offY || this.y >= this.initY + this.offY) {
            this.speed = -this.speed;
        }
        else {
            //console.log("没有方向");
        }
        //this.checkPosition();
    };
    /**
     * 被抓到了
     */
    Fish.prototype.catch = function () {
        this.isCatch = true;
        this.fishImg.skewY = 0;
        this.initY = this.y;
        var randCount = MathUtil.randomRange(0, 1);
        var globalPos = this.fishImg.localToGlobal(new Laya.Point(0, this.fishImg.height >> 1));
        TipManager.ins.showWord(randCount == 0 ? "+$500" : "+$1000", globalPos.x, globalPos.y + 120, 150, 70, "#fee238");
    };
    /**
     * 死亡
     */
    Fish.prototype.dead = function () {
        LayerManager.ins.addChild(this, LayerName.scene_king);
        this.isCatch = false;
        this.isDead = true;
        this.deadEffect();
    };
    Fish.prototype.deadEffect = function () {
        var _this = this;
        this.x = 300;
        this.y = 600;
        this.fishImg.rotation = 90;
        var randX = MathUtil.randomRange(0, 50);
        var randY = MathUtil.randomRange(200, 350);
        Laya.Tween.to(this, { x: this.x + randX, y: this.y - randY, alpha: 0.5 }, 400, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
            //this.removeSelf();
            _this.visible = false;
            _this.alpha = 1;
            _this.fishImg.rotation = 0;
            _this.y = _this.initY;
            LayerManager.ins.addChild(_this, LayerName.scene_map);
            var randCount = MathUtil.randomRange(0, 1);
            //TipManager.ins.showWord(randCount==0?"+5":"+10",0,350,-120,60,"#fee238");
            GameModel.ins.addScore(randCount == 0 ? 500 : 1000);
            //SoundManager.ins.playSound(CustomBase64.sound_reward);
        }));
        this.visible = true;
    };
    return Fish;
}(Laya.Sprite));
