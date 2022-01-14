/*
*2019-03-07 andy 
加载界面
*/
class LoadingWin extends BaseWindow{
    private loadIndex:number=0;
    private progressHandler:Laya.Handler;

    private arrLoad:Array<Function>;
    public ui:LoadingUI;
    constructor(){
        super(LoadingUI);
    }

    init():void{
        super.init();
        this.ui=this.view as LoadingUI;
        this.ui.imgLogo.skin= Define.CDN+"/atlas/not/logo.jpg";
        this.ui.bar.skin= Define.CDN+"/atlas/not/loading.png";

        this.progressHandler=Laya.Handler.create(this,this.HTTP_PROGRESS);
        
        EventManager.ins.on(NoticeEvent.HTTP_PROGRESS,this,this.HTTP_PROGRESS);


        this.arrLoad=[this.loadServerConfig,this.loadDataConfig,this.loadRes,this.loadSound];
        
        
    }
    open():void{
        this.loadIndex=0;
        this.loadNext();
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "":
               
            break; 
            default:
            break;
        }
        
    }
    public loadNext():void{
        console.log("loadIndex="+this.loadIndex);
        if(this.loadIndex>= this.arrLoad.length){
            //加载结束
            Global.platform.login();
        }else{
            let func=this.arrLoad[this.loadIndex++];
            if(func){
                func.call(this);
            }
        }
    }

    private loadServerConfig():void{
        LoadingCtrl.ins.preload(Laya.Handler.create(this,this.loadNext));
    }
    private loadDataConfig():void{
        LoadingCtrl.ins.preloadDataConfig(Laya.Handler.create(this,this.loadNext));
    }
    private loadRes():void{
        let arr=[{
            url:Define.CDN+"/atlas/common.atlas",
            type:Laya.Loader.ATLAS
        },{
            url:Define.CDN+"/atlas/game.atlas",
            type:Laya.Loader.ATLAS
        },{
            url:Define.CDN+"/atlas/knife.atlas",
            type:Laya.Loader.ATLAS
        },{
            url:Define.CDN+"/atlas/watermelon.atlas",
            type:Laya.Loader.ATLAS
        }];
        ResManager.ins.preload(arr,Laya.Handler.create(this,this.loadNext),this.progressHandler);
    }
    private loadSound():void{
        let arr=[{
            url:Define.CDN+CustomDefine.SOUND_MAIN,
            type:Laya.Loader.SOUND
        }];
        SoundManager.ins.preload(arr,Laya.Handler.create(this,this.loadNext),this.progressHandler)
    }


    private HTTP_PROGRESS(e:any):void{
        let curProgress:number=Number(e.data);
        let progressValue:number=(this.loadIndex+curProgress)/this.arrLoad.length;
        this.ui.bar.value = progressValue;
    }
}