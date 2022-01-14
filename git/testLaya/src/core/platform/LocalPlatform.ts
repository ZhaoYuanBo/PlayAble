namespace game.platform{
    import EventManager=game.common.EventManager;
    import NoticeEvent=game.common.NoticeEvent;
    /*
    * name;
    */
    export class LocalPlatform implements IPlatform{
        /**平台用户信息 */
        public userInfo:any;
        public getRandomShareFunc:Laya.Handler;
        public getAdDataFunc:Laya.Handler;
        public getAdVideoDataFunc:Laya.Handler;
        public isCanPlayVideoFunc:Laya.Handler;
        public window:any;
        public fileSysMgr:any;
        /**图片广告对象 */
        public bannerAd:any;
        /**视频广告对象 */
        public videoAd:any;
        /**分享成功后的回调函数 */
        public shareAppSuccess:Function;

        constructor(){
            this.window=PlatformManager.window;

            Global.platformId = PlatformID.None;
            Define.langId= LangType.En;
            Define.serverHttp="http://192.168.2.104:3000/";
            Define.isLocal=true;

            //2018-12-13 在进入游戏前，需要提前准备的东西
            EventManager.ins.init();
        }

        public init(data:any):void{  
            if(data){
                this.getRandomShareFunc = data.getRandomShare;
                this.isCanPlayVideoFunc = data.sCanPlayVideo;
                this.getAdDataFunc = data.getAdData;
                this.getAdVideoDataFunc = data.getAdVideoData;
                console.log("平台初始化："+data.getRandomShare);
            } 
            
            if(Global.platformId == PlatformID.None){
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            //2020-02-21 andy 游戏结束
            EventManager.ins.on(NoticeEvent.GAME_OVER,this,()=>{
                PlatformManager.ins.actionCallBack(PlatformAction.GameEnd);
            });
            
        }

        public initSkinGame():void{
            // if(Define.isDebug){
            //     Define.cdn = "../res/";
            // }else{
            //     Define.cdn = "res/";
            // }
        }
    
        public login():void{
            this.loginSuccess();
        }

        public loginSuccess():void{
            EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
        }
        public getUserInfo():any{
            return this.userInfo;
        }
        

        public initItem():void{
            console.log("需要平台实现此功能");
        }
        public saveItem(ID:number,count:number,type:number):void{
            console.log("需要平台实现此功能");
        }
        public scoreUp(rank:number,score:number):void{
            console.log("需要平台实现此功能");
        }

        
        public share(func:Function,queryKey?:string):void{
            console.log("需要平台实现此功能");
        }
        public createBannerAd(posKey:string){
            console.log("需要平台实现此功能");
        }
        public showBannerAd(isShow:boolean){
        console.log("需要平台实现此功能");
        }
        public destroyBannerAd(){
            console.log("需要平台实现此功能");
        }   
        public createVideoAd(posKey:string,success:Laya.Handler){
            console.log("创建广告："+posKey)
        }

        public addMoreGameBtn(parent:Laya.Sprite){
            console.log("需要平台实现此功能 微信独有");
        }
        public createBrandSprite(parent:Laya.Sprite,x:number,y:number){
            console.log("需要平台实现此功能 微信独有");
        }

        public postMsg(postName:string,obj:any):void{
            console.log("需要平台实现此功能 微信独有");
        }
        
        
        public shake(isShort:boolean,delay:number):void{
            console.log("需要平台实现此功能");
        }
        public saveImageToPhotosAlbum(url:string):void{
            console.log("保存图片接口没有实现");
        }
        public setUserCloudStorage(key:any,value:any):void{
            console.log("云端保存数据接口没有实现");
        }
        public getLocalImage(type:number):void{
            console.log("需要平台实现此功能");
        }


        /**获得焦点时，前台运行 */
        protected onShowCallBack(res:any):void{
            console.log("小游戏获得焦点，进入前台运行");
            //SoundManager.ins.setOn(true);

        }  
        /**失去焦点时，后台运行 */  
        protected onHideCallBack():void{
            console.log("小游戏失去焦点，进入后台运行");
            //SoundManager.ins.setOn(false);
            Laya.SoundManager.stopMusic();
        }
    }
}