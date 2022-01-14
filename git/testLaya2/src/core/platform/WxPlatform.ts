namespace game.platform{
    import EventManager=game.common.EventManager;
    import NoticeEvent=game.common.NoticeEvent;
    import OpenManager=game.common.OpenManager;
    /*
    * 2019-03-06 andy 
    微信平台
    */
    export class WxPlatform extends LocalPlatform{
        public wx:any;
        constructor(){
            super();
            Global.platformId = PlatformID.Wx;
            Define.langId= LangType.Zh;
            Define.isLocal=false;
            Define.serverHttp="http://192.168.2.104:3000/";//
            //Define.CDN = "https://cdn.h5haowan.top/paoku3d/res"+Define.gameVersion+"/";

            this.wx = Laya.Browser.window.wx;
        }

        init(data:any):void{
            super.init(data);
            //初始化微信相关
            this.initSysInfo();
            let th=this;
            this.wx.onShow((res)=>{
                this.onShowCallBack(res);
                
            });
            this.wx.onHide(()=>{
                this.onHideCallBack();
            });
            //显示转发按钮
            this.wx.showShareMenu({
                withShareTicket: true,
                success: (e)=> {
                    //e.showShareMenuCallBack();
                    console.log("wx.showShareMenu成功");
                },
                fail: (e)=> {
                    console.log("wx.showShareMenu失敗");
                }
            });
            //是否授权
            this.wx.getSetting({
                success(res) {
                    var authSetting = res.authSetting;
                    if (authSetting['scope.userInfo'] === true) {
                    // 用户已授权，可以直接调用相关 API
                        console.log("用户已授权");
                        th.getWxUserInfo();
                    } else if (authSetting['scope.userInfo'] === false){
                    // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                        console.log("用户已拒绝授权");
                        th.wx.showModal({
                            title: '提示',
                            content: '继续游戏需要获得你的授权',
                            success(res) {
                                if (res.confirm) {
                                    th.wx.openSetting({
                                        success(res) {
                                            th.getWxUserInfo();
                                        }
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }else{

                                }
                            }
                        }) 
                    } else {
                    // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                        console.log("未询问过用户授权");
                        th.wx.authorize({
                            scope: 'scope.userInfo',
                            success() {
                                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                                th.getWxUserInfo();
                            },
                            fail(){
                                th.getWxUserInfo();
                            }
                        })
                    }
                }
            })
            // Laya.MiniAdpter.remove(Define.cdn+"atlas/game.bin");
            this.initSkinGame();
        }
        
        getWxUserInfo():void{
            let th=this;
            //2018-12-19 andy 点击主界面右上角分享
            this.wx.onShareAppMessage(()=>{
                var data = this.getRandomShareFunc?this.getRandomShareFunc.run():{title:"分享测试",imageUrl:""};
                var query:string = "openid="+Global.openId+"&uid="+Global.UID ;
                console.log("wx.onShareAppMessage openId="+Global.openId+" uid="+Global.UID);
                return {
                    title: data.title,
                    imageUrl: data.imageUrl,
                    query: query,
                    success:(res)=>{
                        Global.shareTicket= res.shareTickets;
                        console.log("wx.onShareAppMessage success!shareTicket="+Global.openId);
                    }
                }
            });
            this.wx.getUserInfo({
                success(res){
                    th.userInfo = res.userInfo;
                    EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                },
                fail(){
                    //测试版本和开发版本取不到此信息
                    EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                }
            });
            
            
        }
        /**换皮游戏时，需要设置 */
        public initSkinGame():void{
            //2018-12-29 andy 获得gameId
            // if(Define.gameId==104){
            //     Define.isGame1=true;
            //     Define.gameIndex=1;
            //     Define.gameVersion="139";
            //     Define.gameHttpRoute="parkours";
            //     Define.appId="wx659ae0df220d382f";
            // }else if(Define.gameId==198){
            //     Define.isGame2=true;
            //     Define.gameIndex=2;
            //     Define.gameVersion="100";
            //     Define.gameHttpRoute="parkoura";
            //     Define.appId="wxde742b6565f3a16a";
            // }else{

            // }
            console.log("当前 GameID:"+Define.gameId+" AppID:"+Define.appId);
        }


        public login():void{
            let ths=this;
            this.wx.login({
                timeout: 10000,
                success: function(e) {
                    console.log("微信登录成功！ "+e.errMsg+"！code="+e.code);
                    Global.code = e.code;
                    //HttpManager.ins.login(e.code,ths.userInfo.nickName,ths.userInfo.avatarUrl,"");
                    Global.platform.loginSuccess();
                },
                fail: function(e) {
                    console.log(e.errMsg+"！");
                }
            });
        }

        public loginSuccess():void{
            // Global.roleData.code =  Global.code;
            // Global.UserInfo  = this.userInfo;
            // Global.roleData.nickname = this.userInfo.nickName;
            // Global.roleData.avatarUrl = this.userInfo.avatarUrl;
            //登录上传玩家数据
            // HttpManager.ins.profile();
            // HttpManager.ins.shareNum();
            // HttpManager.ins.initTask();

            // HttpManager.ins.rankList(RankType.Score);
            // HttpManager.ins.rankList(RankType.First);

            //HttpManager.ins.getShareList();
            var fromid:string;
            var query:any = Global.query;
            if(query){
                if(query.hasOwnProperty("openid")){
                    if(query.hasOwnProperty("gold")){
                        fromid = query.openid;
                    }
                }
                if(query.hasOwnProperty("signGold")){
                    //Global.roleData.signGold = query.signGold;
                }
            }
            OpenManager.ins.setLogin();
            // //激活分享链接
            // if(query && query.hasOwnProperty("uid")){
            //     HttpManager.ins.activeShare(query.uid);
            // }
            
            //进入游戏
            EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS); 
        }

        public initItem():void{
            
        }
        public saveItem(ID:number,count:number,type:number):void{
            //HttpManager.ins.updateItem(ID,count,type);
        }

        public share(func:Function,queryKey?:string):void{
            this.shareAppSuccess = func;
            var data = this.getRandomShareFunc?this.getRandomShareFunc.run():{title:"分享一个好玩的游戏",imageUrl:"res/atlas/not/share.jpg"};
  
            var query:string = "openid="+Global.openId+"&uid="+Global.UID;
            if(queryKey != null){
                query += "&"+queryKey;
            }
            this.wx.updateShareMenu({
                //withShareTicket:true,
                success: (e)=>{
                    this.wx.shareAppMessage({
                        title: data.title,
                        imageUrl: data.imageUrl,
                        query: query,
                        success(res){
                            //console.log("shareAppMessage成功！res="+res);
                        }
                    });
                    console.log("分享标题："+data.title+" 分享内容图片："+data.imageUrl+" query="+query);
                },
                // fail: function(e) {
                //     console.log("updateShareMenu失败！"+JSON.stringify(e));
                // }
            });
        }
        public createBannerAd(adName:any):void{
            if(this.bannerAd){
                this.bannerAd.destroy();
            }
            let ad:any= this.getAdDataFunc?this.getAdDataFunc.runWith(adName):null;
            if(!ad){
                console.log("未找到图片广告配置："+ad.adName);
                return;
            }
            this.bannerAd = this.wx.createBannerAd({
                adUnitId: ad.adUnitId,
                style: {
                    left: ad.left,
                    top: ad.top,
                    width: ad.width,
                    height: ad.height
                }
            });
            
            this.bannerAd.onError(err => {
                console.log(err)
            });
            this.bannerAd.onLoad(() => {
                console.log('banner 广告加载成功')
            });
            this.bannerAd.onResize(res=> {
                let width = res.width, height = res.height;
                this.bannerAd.style.top = window.innerHeight - height;
                //this.bannerAd.style.width = 400;
            });

            this.showBannerAd(true);
        }
        public showBannerAd(isShow:boolean){
            if(!this.bannerAd){
                return;
            }
        if(isShow){
                this.bannerAd.show();
        }else{
            this.bannerAd.hide();
        }
        }
        public destroyBannerAd(){
            if(this.bannerAd){
                this.bannerAd.offError();
                this.bannerAd.offLoad();
                this.bannerAd.offResize();
                this.bannerAd.destroy();
                this.bannerAd=null;
            }
        }

    public createVideoAd(adName:string,callBack:Laya.Handler):void{
        let ad:any= this.getAdVideoDataFunc?this.getAdVideoDataFunc.runWith(adName):null;;
            if(!ad){
                console.log("未找到视频广告配置："+adName);
                return;
            }
            if(ad.playCount>=ad.maxPlayCount){
                console.log("视频播放超过上限："+adName);
                return;
            }
        if(this.isCanPlayVideoFunc && !this.isCanPlayVideoFunc.runWith(adName)){
            return;
        }

            // if(this.videoAd){
            //     this.videoAd.destroy();
            // }
        this.videoAd=this.wx.createRewardedVideoAd({
            adUnitId: ad.adUnitId
            })
            // this.videoAd.onError(err => {
            //     console.log(err);
            // })
            // this.videoAd.onLoad(() => {
            //     console.log('视频广告加载成功');
            // })
            this.videoAd.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    callBack && callBack.run();
                } else {
                    // 播放中途退出，不下发游戏奖励
                    this.wx.showModal({
                        title: "提示",
                        content: "视频未播放完"
                    });
                }
            })

            this.wx.showLoading({
                title: "视频加载中",
                mask: true
            });

            this.videoAd.load()
            .then(() => {
                this.wx.hideLoading();
                return this.videoAd.show();
            }).catch(err=>{
                console.log(err);
                this.wx.hideLoading();
                this.wx.showModal({
                    title: "提示",
                    content: "视频加载失败, 请稍后再试"
                });
            })
    }

        public shake(isShort:boolean,delay:number):void{
            console.log("调用微信手机震动");
            if(isShort){
                this.wx.vibrateShort(delay);
            }else{
                this.wx.vibrateLong(delay);
            }
        }
        public saveImageToPhotosAlbum(filePath:string):void{
            var file:any ;//= Laya.MiniAdpter.getFileInfo(Laya.URL.basePath+filePath);
            var md5 = file.md5;
            var jdPath = "";//Laya.MiniFileMgr.getFileNativePath(file.md5);
            this.wx.saveImageToPhotosAlbum({
                filePath:jdPath,
                success: function(res) {
                    console.log("保存图片成功");
                },
                fail: function(e) {
                    console.log("保存图片失败！"+JSON.stringify(e));
                }
            })
        }
        public getLocalImage(type:number):void{
            var that=this; 
            this.wx.chooseImage({ 
                count:1, 
                sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
                sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
                success:res=>{ 
                    // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来 
                    //app.startOperating("保存中") 
                    var filePath=res.tempFilePaths[0]; 
                    var session_key=this.wx.getStorageSync('session_key'); 
                    //获取base64
                    var base64 = this.wx.getFileSystemManager().readFileSync(filePath, "base64");
                    
                    let data={};
                    data["image"]=base64;
                    let url:string="";
                    let access_token:string="24.3fa0c0561fbfacf7b51cdca51328247e.2592000.1554966363.282335-15738709";
                    if(type==0){
                        url="https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token="+access_token;
                        data["id_card_side"]="front";
                    }else if(type==1){
                        url="https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token="+access_token;
                    }

                    this.wx.request({
                        url: url, //仅为示例，并非真实的接口地址
                        data: data,
                        method:'post',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: function(res) {
                            console.log(res.data);
                            EventManager.ins.event(NoticeEvent.AI_IMAGE_TO_WORD,res.data);
                        }
                    })
                }, 
                fail:function(error){ 
                    console.error("调用本地相册文件时出错");console.warn(error) 
                }, 
                complete:function(){ } 
            })
        }

        public setUserCloudStorage(key:string,value:number):void{
            console.log("开始保存数据到云端！");
            var KVDataList:any[] = [{
                        key:key,
                        value:String(value)
                    }];
            this.wx.setUserCloudStorage({
                KVDataList:KVDataList,
                success:function(){
                    console.log("保存数据到云端！");
                },
                fail:function(){
                }
            });       
        }

        /** 主域调用*/
        public postMsg(cmd:string,data?:any):void{
            var openDataContext = this.wx.getOpenDataContext();
            openDataContext.postMessage({cmd:cmd,data:data});
        }



        

        
        protected onShowCallBack(res:any):void{
            super.onShowCallBack(res);

            Global.query = res.query;
            Global.shareTicket = res.shareTicket;
            console.log("wx onShow! query="+JSON.stringify(Global.query)+",shareTicket="+Global.shareTicket);

            //2018-12-19 andy 分享对象，完成分享任务
            // if(Global.query != null){
            //     let uid:string=Global.query["uid"];
            //     if(uid!=null && uid!=""){
            //         HttpManager.ins.activeShare(uid);
            //     }
            // }

            if(Global.shareTicket != null && Global.shareTicket != ""){
                OpenManager.ins.setShareTicket();
                console.log("微信转发已经提交服务器");
            }

            if(this.shareAppSuccess != null){
                this.shareAppSuccess();
                this.shareAppSuccess = null;
            }
        }
        protected onHideCallBack():void{
            super.onHideCallBack();
        }



        initSysInfo():void{
            var res = this.wx.getSystemInfoSync();
            Global.BRAND = res.brand;
            Global.MODEL = res.model;
            Global.SYSTEM = res.system;
            //环境 手机型号 手机系统
            console.log("brand:"+Global.BRAND+",model:"+Global.MODEL+",system:"+Global.SYSTEM);
            if(this.wx.getUpdateManager instanceof Function){
                /**
                    小程序没有重启的概念
                    当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
                    在 iOS 上，当微信客户端在一定时间间隔内（目前是 5 秒）连续收到两次及以上系统内存告警时，会主动进行小程序的销毁，并提示用户 「该小程序可能导致微信响应变慢被终止」。
                    建议小程序在必要时使用 wx.onMemoryWarning 监听内存告警事件，进行必要的内存清理。
                    */
                //全局唯一的版本更新管理器，用于管理小程序更新
                var t = this.wx.getUpdateManager();
                t.onCheckForUpdate(function(t) {
                    //微信在小程序冷启动时自动检查更新，微信自动下载，不需由开发者主动触发
                    console.log("小游戏是否有新版本："+t.hasUpdate);
                }), t.onUpdateReady(function() {
                    //新版本下载完成，强制小程序重启并使用新版本
                    t.applyUpdate();
                }), t.onUpdateFailed(function() {
                    //新版本下载失败（可能是网络原因等）
                });
            }
        }
        showModal(title:string,content:string,isCancel?:boolean){
            this.wx.showModal({
                title: title,
                content: content,
                showCancel:isCancel
            })
        }
        removeUserCloudStorage(key:string):void{
            this.wx.removeUserCloudStorage({
                KVDataList:[key],
                success:function(){
                    console.log("托管数据"+key+"删除成功");
                },
                fail:function(){
                    console.log("托管数据"+key+"删除失败");
                }
            });
        }
        
    }

    enum WeChatCall{
        FAIL,
        SUCCESS,
        NO_MINI
    }
}