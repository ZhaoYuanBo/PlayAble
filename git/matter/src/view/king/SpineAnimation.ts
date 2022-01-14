
    class SpineAnimation{
    private mAniPath:string;
    private mStartX:number = 400;
    private mStartY:number = 500;
    private mFactory:Templet;
    private mActionIndex:number = 0;
    private mCurrIndex:number = 0;
    private mSk:Skeleton;
    private mCurrSkinIndex:number = 0;
    private mFactory2:Templet;
    private mLabelSprite:Sprite;
    public startFun():void
    {
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
    }
    
    private onError():void
    {
        console.log("error");
    }
    
    private parseComplete():void {
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
        console.log("动画个数：",this.mSk.getAnimNum());
    }
    
    private completeHandler():void
    {
        this.play();
    }
    
    private play():void
    {
        this.mCurrIndex++;
        if (this.mCurrIndex >= this.mSk.getAnimNum())
        {
            this.mCurrIndex = 0;
        }
        this.mSk.play(this.mCurrIndex,false);
        
    }
    
    private onEvent(e):void
    {console.log("ON LABEL");
        var tEventData:EventData = e as EventData;
        
        Laya.stage.addChild(this.mLabelSprite);
        this.mLabelSprite.x = this.mStartX;
        this.mLabelSprite.y = this.mStartY;
        this.mLabelSprite.graphics.clear();
        this.mLabelSprite.graphics.fillText(tEventData.name, 0, 0, "20px Arial", "#ff0000", "center");
        Tween.to(this.mLabelSprite, { y:this.mStartY - 200 }, 1000, null,Handler.create(this,this.playEnd))
    }
    
    private playEnd():void
    {
        this.mLabelSprite.removeSelf();
    }
}