var EventData = Laya.EventData;
var Skeleton = Laya.Skeleton;
var Templet = Laya.Templet;
var Sprite = Laya.Sprite;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var Stat = Laya.Stat;
var Tween = Laya.Tween;
var WebGL = Laya.WebGL;
var SpineAnimation = /** @class */ (function () {
    function SpineAnimation() {
        this.mStartX = 400;
        this.mStartY = 500;
        this.mActionIndex = 0;
        this.mCurrIndex = 0;
        this.mCurrSkinIndex = 0;
    }
    SpineAnimation.prototype.startFun = function () {
        // this.mAniPath = Define.CDN+"/spine/kaixiangzi.sk";//开箱子
        // this.mAniPath = Define.CDN+"/spine/alien.sk";//小怪物
        // this.mAniPath = Define.CDN+"/spine/dragon.sk";
        // this.mAniPath = Define.CDN+"/spine/armorgirl.sk";
        // this.mAniPath = Define.CDN+"/spine/stretchyman.sk";
        // this.mAniPath = Define.CDN+"/spine/greengirl.sk";
        // this.mAniPath = Define.CDN+"/spine/orangegirl.sk";
        // this.mAniPath = Define.CDN+"/spine/spineboy.sk";
        // this.mAniPath = Define.CDN+"/spine/raptor.sk";//霸王龙
        // this.mAniPath = Define.CDN+"/spine/tank.sk";
        // this.mAniPath = Define.CDN+"/spine/transforms.sk";//有问题
        // this.mAniPath = Define.CDN+"/spine/vine.sk";//蔓藤伸展动画
        // this.mAniPath = Define.CDN+"/spine/spineboy.sk";
        // this.mFactory = new Templet();
        // this.mFactory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        // this.mFactory.on(Laya.Event.ERROR, this, this.onError);
        // this.mFactory.loadAni(this.mAniPath);
        // this.mLabelSprite=new Sprite();
        BoneManager.ins.addBone(CustomKing.alien);
    };
    SpineAnimation.prototype.onError = function () {
        console.log("error");
    };
    SpineAnimation.prototype.parseComplete = function () {
        //创建模式为1，可以启用换装
        this.mSk = this.mFactory.buildArmature(1);
        this.mSk.x = this.mStartX;
        this.mSk.y = this.mStartY;
        this.mSk.scale(0.4, 0.4);
        Laya.stage.addChild(this.mSk);
        this.mSk.on(Laya.Event.LABEL, this, this.onEvent);
        this.mSk.on(Laya.Event.STOPPED, this, this.completeHandler);
        this.mSk.showSkinByIndex(1);
        this.play();
        console.log("动画个数：", this.mSk.getAnimNum());
    };
    SpineAnimation.prototype.completeHandler = function () {
        this.play();
    };
    SpineAnimation.prototype.play = function () {
        this.mCurrIndex++;
        if (this.mCurrIndex >= this.mSk.getAnimNum()) {
            this.mCurrIndex = 0;
        }
        this.mSk.play(this.mCurrIndex, false);
    };
    SpineAnimation.prototype.onEvent = function (e) {
        console.log("ON LABEL");
        var tEventData = e;
        Laya.stage.addChild(this.mLabelSprite);
        this.mLabelSprite.x = this.mStartX;
        this.mLabelSprite.y = this.mStartY;
        this.mLabelSprite.graphics.clear();
        this.mLabelSprite.graphics.fillText(tEventData.name, 0, 0, "20px Arial", "#ff0000", "center");
        Tween.to(this.mLabelSprite, { y: this.mStartY - 200 }, 1000, null, Handler.create(this, this.playEnd));
    };
    SpineAnimation.prototype.playEnd = function () {
        this.mLabelSprite.removeSelf();
    };
    return SpineAnimation;
}());
