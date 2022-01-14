namespace game.platform{
    /*
    * 2019-03-06 andy
    平台管理
    */
    export class PlatformManager{
        /** 微信平台 */
        public static wxPlatform:WxPlatform;
        /** FaceBook平台 */
        public static fbPlatform:FaceBookPlatform;
        /** Applovin平台 */
        public static alPlatform:ApplovinPlatform;
        /** IronSource平台 */
        public static isPlatform:IronSourcePlatform;
        /** Unity平台 */
        public static utPlatform:UnityPlatform;
        /** Google平台 */
        public static ggPlatform:GooglePlatform;
        /** MTG平台 */
        public static mtgPlatform:MTGPlatform;
        /** Vungle平台 */
        public static vgPlatform:VunglePlatform;
        /** AdColony平台 */
        public static acPlatform:AdColonyPlatform;
        /** Tapjoy平台 */
        public static tjPlatform:TapjoyPlatform;
        /** Tiktok平台 */
        public static ttPlatform:TiktokPlatform;
        /** QQ平台 */
        public static qqPlatform:QQPlatform;
        /** ByteDance平台 */
        public static bdPlatform:ByteDancePlatform;
        /** 广告投放平台标准接口 */
        public static mraid:any;

        private static _ins:PlatformManager;
        public static get ins():PlatformManager{
            if(!this._ins)
                new PlatformManager();
            return this._ins;
        }
        constructor(){
            if(PlatformManager._ins != null)
                throw new Error("PlatformManager is single!");
            PlatformManager._ins = this;
        }

        
        /**先初始化平台 */
        public init(data:any): void {
            //初始化平台
            var platform:IPlatform;
            let isLocal:boolean=false;
            
            PlatformManager.mraid=Laya.Browser.window.mraid;
        
            if(Laya.Browser.window.wx){
                platform = PlatformManager.wxPlatform=new WxPlatform();
            }else if(Laya.Browser.window.facebook){
                PlatformManager.mraid=Laya.Browser.window.FbPlayableAd;
                platform = PlatformManager.fbPlatform=new FaceBookPlatform();
            }else if(Laya.Browser.window.applovin){
                platform = PlatformManager.alPlatform=new ApplovinPlatform();
            }else if(Laya.Browser.window.ironsource){
                //2019-09-16 andy ironsource对自己的dapi支持较好
                PlatformManager.mraid=Laya.Browser.window.dapi;
                platform = PlatformManager.isPlatform=new IronSourcePlatform();
            }else if(Laya.Browser.window.unity){
                platform = PlatformManager.utPlatform=new UnityPlatform();
            }else if(Laya.Browser.window.google){
                platform = PlatformManager.ggPlatform=new GooglePlatform();
            }else if(Laya.Browser.window.mtg){
                platform = PlatformManager.mtgPlatform=new MTGPlatform();
            }else if(Laya.Browser.window.vungle){
                platform = PlatformManager.vgPlatform=new VunglePlatform();
            }else if(Laya.Browser.window.adcolony){
                platform = PlatformManager.acPlatform=new AdColonyPlatform();
            }else if(Laya.Browser.window.tapjoy){
                PlatformManager.mraid=Laya.Browser.window.TJ_API;
                platform = PlatformManager.tjPlatform=new TapjoyPlatform();
            }else if(Laya.Browser.window.tiktok){
                platform = PlatformManager.ttPlatform=new TiktokPlatform();
            }else if(Laya.Browser.window.qq){
                platform = PlatformManager.qqPlatform=new QQPlatform();
            }else if(Laya.Browser.window.bytedance){
                platform = PlatformManager.bdPlatform=new ByteDancePlatform();
            }else {
                console.log("默认平台，请注意检查平台是否设置 window.applovin 或 window.ironsource");
                platform = new LocalPlatform();
                isLocal=true;
            }
            //2019-09-27 打包渠道的自动设置为使用base64
            if(!isLocal){
                Base64Manager.isUseBase64=true;
            }
            console.log("BASE64Manager.isUseBase64",Base64Manager.isUseBase64);

            Global.platform = platform;
            Global.platform.init(data);
        }

        /**获取游戏配置 */
        get HttpConfig():any{
            return {};//PlatformAPI.getConfig();
        }


        public static get window():any{
            return Laya.Browser.window;
        }
        
        /**
         * 平台动作，暂时只有MTG调用
         * @param pa PlatformAction
         * @param para 参数
         */
        public actionCallBack(action:PlatformAction,para:any=null):void{
            if(Global.platformId==PlatformID.mtg){
                switch(action){
                    case PlatformAction.DownLoad:
                        if(Laya.Browser.window.install){
                            console.log("调用 window.install");
                            Laya.Browser.window.install();
                        }else{
                            TipManager.ins.showWord("MTG does not support window.install!")
                        }
                    break;
                    case PlatformAction.GameStart:
                        console.log("MTG 主动调用gameStart！");
                    break;
                    case PlatformAction.GameReady:
                        if(Laya.Browser.window.gameReady){
                            console.log("调用 window.gameReady");
                            Laya.Browser.window.gameReady();
                        }else{
                            TipManager.ins.showWord("MTG does not support window.gameReady!")
                        }
                    break;
                    case PlatformAction.GameEnd:
                        if(Laya.Browser.window.gameEnd){
                            console.log("调用 window.gameEnd");
                            Laya.Browser.window.gameEnd();
                        }else{
                            TipManager.ins.showWord("MTG does not support window.gameEnd!")
                        }
                    break;
                    case PlatformAction.GameClose:
                        console.log("MTG 主动调用gameClose！");
                    break;
                }
            }else if(Global.platformId==PlatformID.Is){
                let NUC:any= Laya.Browser.window.NUC;
                if(!NUC){
                    console.log("当前为IronSource渠道，NUC不存在，无法上报用户行为追踪！");
                    return;
                }
                switch(action){
                    case PlatformAction.DownLoad:
                        if(NUC.trigger && NUC.trigger.convert){
                            console.log("调用 NUC.trigger.convert");
                            NUC.trigger.convert();
                        }else{
                            TipManager.ins.showWord("IronSourc does not support NUC.trigger.convert!")
                        }
                    break;
                    case PlatformAction.GameStart:
                        if(NUC.trigger && NUC.trigger.startLevel){
                            console.log("调用 NUC.trigger.startLevel");
                            NUC.trigger.startLevel();
                        }else{
                            TipManager.ins.showWord("IronSource does not support NUC.trigger.startLevel!")
                        }
                    break;
                    case PlatformAction.GameReady:
                        if(Laya.Browser.window.gameReady){
                            console.log("调用 window.gameReady");
                            Laya.Browser.window.gameReady();
                        }else{
                            TipManager.ins.showWord("IronSource does not support window.gameReady!")
                        }
                    break;
                    case PlatformAction.GameEnd:
                        if(NUC.trigger && NUC.trigger.endGame){
                            console.log("调用 NUC.trigger.endGame");
                            NUC.trigger.endGame('win');
                        }else{
                            TipManager.ins.showWord("IronSource does not support NUC.trigger.endGame!")
                        }
                    break;
                    case PlatformAction.GameCustom:
                        if(NUC.event && NUC.event.send){
                            console.log("调用 NUC.event.send");
                            NUC.event.send("mouseclick",para);
                        }else{
                            TipManager.ins.showWord("IronSource does not support NUC.event.send!")
                        }
                    break;
                }
            }else if(Global.platformId==PlatformID.Vg){            
                switch(action){
                    case PlatformAction.DownLoad:
                    break;
                    case PlatformAction.GameStart:
                    break;
                    case PlatformAction.GameReady:
                    break;
                    case PlatformAction.GameEnd:
                        if(parent){
                            console.log("调用 parent.postMessage('complete','*')");
                            parent.postMessage('complete','*');
                        }else{
                            TipManager.ins.showWord("Vungle does not support parent.postMessage!")
                        }
                    break;
                    case PlatformAction.GameCustom:
                    break;
                }
            }else if(Global.platformId==PlatformID.Tj){            
                switch(action){
                    case PlatformAction.DownLoad:
                    break;
                    case PlatformAction.GameStart:
                        if(PlatformManager.mraid && PlatformManager.mraid.setPlayableAPI){
                            PlatformManager.mraid.setPlayableAPI({skipAd: function() { /* go to the end card */ }});
                            console.log("调用 window.TJ_API.setPlayableAPI");
                        }else{
                            TipManager.ins.showWord("Tapjoy does not support window.TJ_API.setPlayableAPI!")
                        }
                    break;
                    case PlatformAction.GameReady:
                    break;
                    case PlatformAction.GameEnd:
                        if(PlatformManager.mraid && PlatformManager.mraid.objectiveComplete){
                            PlatformManager.mraid.objectiveComplete();
                            console.log("调用 window.TJ_API.objectiveComplete");
                        }else{
                            TipManager.ins.showWord("Tapjoy does not support window.TJ_API.objectiveComplete!")
                        }
                        if(PlatformManager.mraid && PlatformManager.mraid.gameplayFinished){
                            PlatformManager.mraid.gameplayFinished();
                            console.log("调用 window.TJ_API.gameplayFinished");
                        }else{
                            TipManager.ins.showWord("Tapjoy does not support window.TJ_API.gameplayFinished!")
                        }
                    break;
                    case PlatformAction.GameCustom:
                    break;
                }
            }else{
                //console.log("当前为本地测试 无用户行为追踪！");
            } 
        }
    
    }
    export enum PlatformID{
        None,
        /**微信 */
        Wx,
        /**FaceBook */
        Fb,
        /**APPLovin */
        Al,
        /**IronSource */
        Is,
        /**Unity */
        Ut,
        /**Google ads */
        Gg,
        /**Vungle */
        Vg,
        /**AdColony */
        Ac,
        /**Tapjoy */
        Tj,
        /**MTG */
        mtg,
        /**Tiktok */
        Tt,
        /**QQ */
        Qq,
        /**ByteDance */
        Bd
    }
    export enum LangType{
        /**中文 */
        Zh,
        /**英文 */
        En
    }
    export enum PlatformAction{
        None,
        /**下载 主动*/
        DownLoad,
        /**GameEnd 主动必须*/
        GameEnd,
        /**GameReady 主动*/
        GameReady,
        /**GameStart 被动调用*/
        GameStart,
        /**GameClose 被动调用*/
        GameClose,
        /**GameCustom 自定义点击行为*/
        GameCustom
    }

    export interface IPlatform{
        /**初始化 */
        init(data:any);
        /**初始化换皮游戏*/
        initSkinGame();
        /**登录平台 */
        login();
        /**登录成功 */
        loginSuccess():void;
        /**得到平台用户信息*/
        getUserInfo():any;

        /**初始化道具 */
        initItem():void;
        /**保存道具 */
        saveItem(ID:number,count:number,type:number);
        /**上报分数 */
        scoreUp(rank:number,score:number):void
        /**把数据保存到云端 */
        setUserCloudStorage(key:any,value:any):void;
        
        /**分享*/
        share(func:Function,queryKey?:string):void; 
        /**创建图片广告 */
        createBannerAd(adName:string):void;
        /**显示图片广告 */
        showBannerAd(isShow:boolean):void;
        /**销毁图片广告 */
        destroyBannerAd():void;
        /**视频广告 */
        createVideoAd(adName:string,callBack:Laya.Handler):void;
        /**更多游戏按钮 */
        addMoreGameBtn(view:laya.ui.View|any):void;
        /**多引擎的创建标识方法 */
        createBrandSprite(view:laya.ui.View|any,x:number,y:number):void;

        /**获取设备本地图片 */
        getLocalImage(type:number):void;
        /**保存图片 */
        saveImageToPhotosAlbum(url:string):void;
        /**使用设备振动 短震动15ms，长震动400ms*/
        shake(isShort:boolean,delay:number):void;   
        /**向子域发送消息 */
        postMsg(postName:string,obj:any):void;
    }
}