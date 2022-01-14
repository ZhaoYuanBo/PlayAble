/*
*
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
        //2019-06-03 MTG不要加载进度条
        if(PlatformManager.mtgPlatform){
            this.ui.visible=false;
        }
        
        //this.ui.imgLogo.visible=false;

        this.progressHandler=Laya.Handler.create(this,this.HTTP_PROGRESS);      
        EventManager.ins.on(NoticeEvent.HTTP_PROGRESS,this,this.HTTP_PROGRESS);
        //this.arrLoad=[this.loadServerConfig,this.loadDataConfig,this.loadRes,this.loadSound];     
        this.arrLoad=[this.loadRes,this.loadDataConfig];   
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
        //console.log("loadIndex="+this.loadIndex);
        if(this.loadIndex>= this.arrLoad.length){
            //加载结束
            EventManager.ins.event(NoticeEvent.GAME_RES_LOAD_FINISH);
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
        if(Base64Manager.isUseBase64){
            let arrAtlas:Array<Base64Type>=[
                CustomBase64.atlas_game,
                CustomBase64.atlas_king,
                CustomBase64.atlas_frame,
                CustomBase64.json_cfg_data
            ]
            Base64Manager.ins.loadAtlas(arrAtlas,Laya.Handler.create(this,this.loadNext),this.progressHandler);
        }else{
            let arr=[{
                url:Define.CDN+"/atlas/game.atlas",
                type:Laya.Loader.ATLAS
            },{
                url:Define.CDN+"/atlas/frame.atlas",
                type:Laya.Loader.ATLAS
            },{
                url:Define.CDN+"/atlas/king.atlas",
                type:Laya.Loader.ATLAS
            }];
            ResManager.ins.preload(arr,Laya.Handler.create(this,this.loadNext),this.progressHandler);
        }
        
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