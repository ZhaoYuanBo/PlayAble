
/*
2019-04-24 andy
* 游戏界面
*/
class GameWin extends BaseWindow{
    /**是否下载过 */
    private isDownload:boolean=false;
    /**场景 */
    private scene:Laya.Sprite;
    /**视频对象 */
    private video:any;
    /**是否能播放 */
    private isCanPlay:boolean=false;

    private lastMouseX:number=0;
    private startMouseX:number=0;
    /**视频开始播放时间 */
    private startTime:number=0;
    /**引导步骤 */
    private guideIndex:number=0;
    /**引导步骤 */
    private guideCfg:Cfg_Guide=null;

    private videoRate:number=1;
    /**是否需要视频截图 */
    private isNeedCaptureImage:boolean=false;
    /**有效点击范围 */
    private clickRadius:number=50;

    public ui:GameUI;
    constructor(){
        super(GameUI);
    }

    protected init():void{
        super.init();
       
        this.ui=this.view as GameUI;
        GameCtrl.ins.initGameLang(this.ui);

        this.ui.btnDownload.y= Number(DataConfig.ins.dicGame["startDownloadY"]);
        this.ui.txtStart.font= DataConfig.ins.dicGame["font"];
        this.ui.txtStart.fontSize= Number(DataConfig.ins.dicGame["fontSize"]);
        this.ui.txtStart.color= DataConfig.ins.dicGame["fontColor"];
        this.ui.txtStart.stroke= Number(DataConfig.ins.dicGame["fontStroke"]);
        this.ui.txtStart.strokeColor= DataConfig.ins.dicGame["fontStrokeColor"];
        this.ui.txtStart.bold=true;
        //2019-09-23 andy
        this.clickRadius= Number(DataConfig.ins.dicGame["clickRadius"]);
        if(this.clickRadius==0){
            this.clickRadius = Define.DeviceH;
        }

        this.ui.imgLogo.y= Number(DataConfig.ins.dicGame["startLogoY"]);
        
        this.scene=LayerManager.ins.getLayer(LayerName.scene);  
        //this.ui.mouseThrough=true;  

        //UIManager.ins.openWindow(CustomWindow.gameDownload);
    }

    public open():void{ 
        super.open();
        Laya.timer.frameLoop(1,this,this.update);
        //Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.MOUSE_DOWN);
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.stageClick);
        EventManager.ins.on(NoticeEvent.SYS_FOCUS,this,this.SYS_FOCUS);
        
      

        this.ui.txtStart.alpha=0;
        this.ui.imgGuide.visible=false;
        let tt:TweenTarget=new TweenTarget(CustomDefine.animGuide,this.ui.imgGuide,TweenManager.ins.creatProp(TweenPropType.SMALL_BIG,[0.2,1,300,600]),100);
        TweenManager.ins.regTween(tt);

   
        this.video=GameCtrl.ins.createVideo();
        Base64Manager.ins.checkVideo(GameCtrl.ins.videoSource,CustomBase64.video_test);//
        
        //this.video.addEventListener("loadstart",this.videoLoadStart);
        //当能够开始播放视频时触发
        this.video.addEventListener("canplay",()=>{
            this.videoCanPlay(null);
            console.log("video.videoWidth",this.video.videoWidth,this.video.videoHeight);
        });
        //当预计能够在不停下来进行缓冲的情况下持续播放视频时发生
        //this.video.addEventListener("canplaythrough",()=>{});
        //this.video.addEventListener("timeupdate",this.vdieoTimeupdate);
        this.video.addEventListener("ended",(evt)=>{
            this.videoEnded(evt);
        });
        
        //默认引导
        this.guideCfg = DataConfig.ins.getGuide(this.guideIndex++);
        this.guideNext();
        //UIManager.ins.openWindow(CustomWindow.gameDownload);
    }
    /**横屏时布局设置 */
    public scaleH():void{
        this.videoRate= (Laya.Browser.clientWidth/this.video.videoWidth)/(Laya.Browser.clientHeight/this.video.videoHeight);
        this.video.width= Laya.Browser.clientWidth;
        this.video.height= Laya.Browser.clientHeight;
        console.log("videoWidth",this.video.videoWidth);
        this.video.style.left = "0px";//
        console.log("Laya.Browser.width",Laya.Browser.width,Laya.Browser.height,"clientWidth",Laya.Browser.clientWidth,Laya.Browser.clientHeight);
    }
    /**竖屏时布局设置 */
    public scaleV():void{
        this.video.width= Laya.Browser.clientWidth;
        this.video.height= Laya.Browser.clientHeight;
        this.video.style.left = "0px";
        console.log("Laya.Browser.width",Laya.Browser.width,Laya.Browser.height,"clientWidth",Laya.Browser.clientWidth,Laya.Browser.clientHeight);
    }

    public viewClick(sp:Laya.Sprite):void{
        let spName:string=sp.name;
        super.viewClick(sp);

        switch(spName){
            case "btnDownload":
                this.isDownload=true;
                //2019-05-01 跳到下载页面，并未下载，直接返回，这时还能继续游戏
                Laya.timer.once(2000,this,()=>{
                    this.isDownload=false;
                })
                HttpManager.ins.link(Define.DOWNLOAD_URL);
            break;
            default:
            break;
        }
    }
     //点击场景
    private stageClick(evt:Laya.Event):void{
        if(!this.isOpen){
            return;
        }
        if(this.isDownload){
            //this.isDownload=false;
            return;
        }
        if(!this.guideCfg){
            return;
        }
        if(!this.isCanPlay){
            return;
        }
        if(this.guideCfg.isCheckRadius==1){
            let stageX:number = evt.stageX*Laya.stage.clientScaleX;
            let stageY:number = evt.stageY*Laya.stage.clientScaleY;
            if(stageX<this.guideCfg.handX-this.clickRadius || stageX>this.guideCfg.handX+this.clickRadius ||
                stageY<this.guideCfg.handY-this.clickRadius || stageY>this.guideCfg.handY+this.clickRadius 
            ){
                return;
            }
        }
        
        if(this.video && this.video.paused){
            this.guideCfg = DataConfig.ins.getGuide(this.guideIndex++);
            TweenManager.ins.stop(CustomDefine.animGuide);
            Laya.Tween.to(this.ui.txtStart,{alpha:0},300);
            this.video.play();
            
            if(this.isNeedCaptureImage){
                this.video.width=Laya.Browser.clientWidth;
                this.ui.spBg.visible=false;
            }
            
        }
        this.ui.imgLogo.visible=false;
        this.ui.spBg.visible=false;
    }
    private update():void{
        if(!this.video || this.video.paused || !this.guideCfg){
            return;
        }
       
        if(this.video.currentTime>this.guideCfg.time){
            console.log("当前播放时间: "+this.video.currentTime);
            //2019-10-11 andy 当前时间点不暂停，用于提示文字
            if(this.guideCfg.handX==0 || this.guideCfg.handY==0){
                TipManager.ins.showWord(this.guideCfg.word,this.guideCfg.wordX,this.guideCfg.wordY,-50,this.ui.txtStart.fontSize,this.ui.txtStart.color,this.ui.txtStart.stroke,this.ui.txtStart.strokeColor);
                this.guideCfg = DataConfig.ins.getGuide(this.guideIndex++);
                return;
            }
            this.video.pause();
            if(this.isNeedCaptureImage){
                let base64Img:string=GameCtrl.ins.captureImage();

                this.ui.imgPause.skin=base64Img;
                this.ui.spBg.visible=true;
                this.video.width=0;
            }
            
            this.guideNext();
        }
    }
    private guideNext():void{
        //增加手指
        TweenManager.ins.resetTargetPos(CustomDefine.animGuide,this.guideCfg.handX*this.videoRate,this.guideCfg.handY*this.videoRate);
        TweenManager.ins.play(true,CustomDefine.animGuide);
        //增加文字，如果有配置
        if(this.guideCfg.word!=null && this.guideCfg.word!=""){
            this.ui.txtStart.text=this.guideCfg.word;
            this.ui.txtStart.x= this.guideCfg.wordX;
            this.ui.txtStart.y=this.guideCfg.wordY;
            Laya.Tween.to(this.ui.txtStart,{alpha:1},300);
        }
    }
    /**
     * 视频可以播放
     */
    private videoCanPlay(evt:any):void{
        this.isCanPlay=true;
        console.log("可以播放");
    }
    /**
     * 视频播放监听
     */
    private vdieoTimeupdate(evt:any):void{
        
    }
    /**
     * 视频播放结束
     */
    private videoEnded(evt:any):void{
        this.guideCfg = null;
        this.video.width=0;
        UIManager.ins.openWindow(CustomWindow.gameDownload);
    }


    //鼠标按下场景
    private MOUSE_DOWN(me:Laya.Event):void{
        me.stopPropagation();
        this.lastMouseX = me.stageY;
        // this.startMouseX=me.stageX;
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.MOUSE_MOVE);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.MOUSE_UP);
    }
    //鼠标按下移动场景
    private MOUSE_MOVE(me:Laya.Event):void{
        // let moveX:number = me.stageX-this.lastMouseX;
        // this.lastMouseX = me.stageX;
        this.ui.txtTest.scrollY+=  me.stageY-this.lastMouseX;
    }
    //鼠标弹起场景
    private MOUSE_UP(me:Laya.Event):void{
        me.stopPropagation();
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.MOUSE_MOVE);
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.MOUSE_UP);
        
    }
    private gameOver(event:NoticeEvent):void{
        //Laya.timer.clear(this,this.update);
        this.ui.stage.off(Laya.Event.CLICK,this,this.stageClick);
        this.ui.stage.off(Laya.Event.MOUSE_DOWN,this,this.MOUSE_DOWN);
    }
    private SYS_FOCUS(e:any):void{
        this.isDownload=false;
        console.log("this.isDownload=false;");
    }
    private clear():void{
    
    }
    public close():void{
        Laya.timer.clearAll(this);
        this.ui.off(Laya.Event.CLICK,this,this.stageClick);
  
        this.clear();
    }

    
}