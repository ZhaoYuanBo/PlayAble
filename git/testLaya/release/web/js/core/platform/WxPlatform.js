var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        var OpenManager = game.common.OpenManager;
        /*
        * 2019-03-06 andy
        微信平台
        */
        var WxPlatform = /** @class */ (function (_super) {
            __extends(WxPlatform, _super);
            function WxPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Wx;
                game.Define.langId = platform.LangType.Zh;
                game.Define.isLocal = false;
                game.Define.serverHttp = "http://192.168.2.104:3000/"; //
                //Define.CDN = "https://cdn.h5haowan.top/paoku3d/res"+Define.gameVersion+"/";
                _this.wx = Laya.Browser.window.wx;
                _this.wxFileMgr = _this.wx.getFileSystemManager();
                return _this;
            }
            WxPlatform.prototype.init = function (data) {
                var _this = this;
                _super.prototype.init.call(this, data);
                //初始化微信相关
                this.initSysInfo();
                var th = this;
                this.wx.onShow(function (res) {
                    _this.onShowCallBack(res);
                });
                this.wx.onHide(function () {
                    _this.onHideCallBack();
                });
                //显示转发按钮
                this.wx.showShareMenu({
                    withShareTicket: true,
                    success: function (e) {
                        //e.showShareMenuCallBack();
                        console.log("wx.showShareMenu成功");
                    },
                    fail: function (e) {
                        console.log("wx.showShareMenu失敗");
                    }
                });
                //是否授权
                this.wx.getSetting({
                    success: function (res) {
                        var authSetting = res.authSetting;
                        if (authSetting['scope.userInfo'] === true) {
                            // 用户已授权，可以直接调用相关 API
                            console.log("用户已授权");
                            th.getWxUserInfo();
                        }
                        else if (authSetting['scope.userInfo'] === false) {
                            // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                            console.log("用户已拒绝授权");
                            th.wx.showModal({
                                title: '提示',
                                content: '继续游戏需要获得你的授权',
                                success: function (res) {
                                    if (res.confirm) {
                                        th.wx.openSetting({
                                            success: function (res) {
                                                th.getWxUserInfo();
                                            }
                                        });
                                    }
                                    else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                    else {
                                    }
                                }
                            });
                        }
                        else {
                            // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                            console.log("未询问过用户授权");
                            th.wx.authorize({
                                scope: 'scope.userInfo',
                                success: function () {
                                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                                    th.getWxUserInfo();
                                },
                                fail: function () {
                                    th.getWxUserInfo();
                                }
                            });
                        }
                    }
                });
                // Laya.MiniAdpter.remove(Define.cdn+"atlas/game.bin");
                this.initSkinGame();
            };
            WxPlatform.prototype.getWxUserInfo = function () {
                var _this = this;
                var th = this;
                //2018-12-19 andy 点击主界面右上角分享
                this.wx.onShareAppMessage(function () {
                    var data = _this.getRandomShareFunc ? _this.getRandomShareFunc.run() : { title: "分享测试", imageUrl: "" };
                    var query = "openid=" + game.Global.openId + "&uid=" + game.Global.UID;
                    console.log("wx.onShareAppMessage openId=" + game.Global.openId + " uid=" + game.Global.UID);
                    return {
                        title: data.title,
                        imageUrl: data.imageUrl,
                        query: query,
                        success: function (res) {
                            game.Global.shareTicket = res.shareTickets;
                            console.log("wx.onShareAppMessage success!shareTicket=" + game.Global.openId);
                        }
                    };
                });
                this.wx.getUserInfo({
                    success: function (res) {
                        th.userInfo = res.userInfo;
                        EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                    },
                    fail: function () {
                        //测试版本和开发版本取不到此信息
                        EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                    }
                });
            };
            /**换皮游戏时，需要设置 */
            WxPlatform.prototype.initSkinGame = function () {
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
                console.log("当前 GameID:" + game.Define.gameId + " AppID:" + game.Define.appId);
            };
            WxPlatform.prototype.login = function () {
                var ths = this;
                this.wx.login({
                    timeout: 10000,
                    success: function (e) {
                        console.log("微信登录成功！ " + e.errMsg + "！code=" + e.code);
                        game.Global.code = e.code;
                        //HttpManager.ins.login(e.code,ths.userInfo.nickName,ths.userInfo.avatarUrl,"");
                        game.Global.platform.loginSuccess();
                    },
                    fail: function (e) {
                        console.log(e.errMsg + "！");
                    }
                });
            };
            WxPlatform.prototype.loginSuccess = function () {
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
                var fromid;
                var query = game.Global.query;
                if (query) {
                    if (query.hasOwnProperty("openid")) {
                        if (query.hasOwnProperty("gold")) {
                            fromid = query.openid;
                        }
                    }
                    if (query.hasOwnProperty("signGold")) {
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
            };
            WxPlatform.prototype.initItem = function () {
            };
            WxPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            WxPlatform.prototype.share = function (func, queryKey) {
                var _this = this;
                this.shareAppSuccess = func;
                var data = this.getRandomShareFunc ? this.getRandomShareFunc.run() : { title: "分享一个好玩的游戏", imageUrl: "res/atlas/not/share.jpg" };
                var query = "openid=" + game.Global.openId + "&uid=" + game.Global.UID;
                if (queryKey != null) {
                    query += "&" + queryKey;
                }
                this.wx.updateShareMenu({
                    //withShareTicket:true,
                    success: function (e) {
                        _this.wx.shareAppMessage({
                            title: data.title,
                            imageUrl: data.imageUrl,
                            query: query,
                            success: function (res) {
                                //console.log("shareAppMessage成功！res="+res);
                            }
                        });
                        console.log("分享标题：" + data.title + " 分享内容图片：" + data.imageUrl + " query=" + query);
                    },
                    // fail: function(e) {
                    //     console.log("updateShareMenu失败！"+JSON.stringify(e));
                    // }
                });
            };
            WxPlatform.prototype.createBannerAd = function (adName) {
                var _this = this;
                if (this.bannerAd) {
                    this.bannerAd.destroy();
                }
                var ad = this.getAdDataFunc ? this.getAdDataFunc.runWith(adName) : null;
                if (!ad) {
                    console.log("未找到图片广告配置：" + ad.adName);
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
                this.bannerAd.onError(function (err) {
                    console.log(err);
                });
                this.bannerAd.onLoad(function () {
                    console.log('banner 广告加载成功');
                });
                this.bannerAd.onResize(function (res) {
                    var width = res.width, height = res.height;
                    _this.bannerAd.style.top = window.innerHeight - height;
                    //this.bannerAd.style.width = 400;
                });
                this.showBannerAd(true);
            };
            WxPlatform.prototype.showBannerAd = function (isShow) {
                if (!this.bannerAd) {
                    return;
                }
                if (isShow) {
                    this.bannerAd.show();
                }
                else {
                    this.bannerAd.hide();
                }
            };
            WxPlatform.prototype.destroyBannerAd = function () {
                if (this.bannerAd) {
                    this.bannerAd.offError();
                    this.bannerAd.offLoad();
                    this.bannerAd.offResize();
                    this.bannerAd.destroy();
                    this.bannerAd = null;
                }
            };
            WxPlatform.prototype.createVideoAd = function (adName, callBack) {
                var _this = this;
                var ad = this.getAdVideoDataFunc ? this.getAdVideoDataFunc.runWith(adName) : null;
                ;
                if (!ad) {
                    console.log("未找到视频广告配置：" + adName);
                    return;
                }
                if (ad.playCount >= ad.maxPlayCount) {
                    console.log("视频播放超过上限：" + adName);
                    return;
                }
                if (this.isCanPlayVideoFunc && !this.isCanPlayVideoFunc.runWith(adName)) {
                    return;
                }
                // if(this.videoAd){
                //     this.videoAd.destroy();
                // }
                this.videoAd = this.wx.createRewardedVideoAd({
                    adUnitId: ad.adUnitId
                });
                // this.videoAd.onError(err => {
                //     console.log(err);
                // })
                // this.videoAd.onLoad(() => {
                //     console.log('视频广告加载成功');
                // })
                this.videoAd.onClose(function (res) {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        callBack && callBack.run();
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        _this.wx.showModal({
                            title: "提示",
                            content: "视频未播放完"
                        });
                    }
                });
                this.wx.showLoading({
                    title: "视频加载中",
                    mask: true
                });
                this.videoAd.load()
                    .then(function () {
                    _this.wx.hideLoading();
                    return _this.videoAd.show();
                }).catch(function (err) {
                    console.log(err);
                    _this.wx.hideLoading();
                    _this.wx.showModal({
                        title: "提示",
                        content: "视频加载失败, 请稍后再试"
                    });
                });
            };
            WxPlatform.prototype.shake = function (isShort, delay) {
                console.log("调用微信手机震动");
                if (isShort) {
                    this.wx.vibrateShort(delay);
                }
                else {
                    this.wx.vibrateLong(delay);
                }
            };
            WxPlatform.prototype.saveImageToPhotosAlbum = function (filePath) {
                var file = Laya.MiniAdpter.getFileInfo(Laya.URL.basePath + filePath);
                var md5 = file.md5;
                var jdPath = ""; //Laya.MiniFileMgr.getFileNativePath(file.md5);
                this.wx.saveImageToPhotosAlbum({
                    filePath: jdPath,
                    success: function (res) {
                        console.log("保存图片成功");
                    },
                    fail: function (e) {
                        console.log("保存图片失败！" + JSON.stringify(e));
                    }
                });
            };
            WxPlatform.prototype.getLocalImage = function (type) {
                var _this = this;
                var that = this;
                this.wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: function (res) {
                        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来 
                        //app.startOperating("保存中") 
                        var filePath = res.tempFilePaths[0];
                        var session_key = _this.wx.getStorageSync('session_key');
                        //获取base64
                        var base64 = _this.wx.getFileSystemManager().readFileSync(filePath, "base64");
                        var data = {};
                        data["image"] = base64;
                        var url = "";
                        var access_token = "24.3fa0c0561fbfacf7b51cdca51328247e.2592000.1554966363.282335-15738709";
                        if (type == 0) {
                            url = "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=" + access_token;
                            data["id_card_side"] = "front";
                        }
                        else if (type == 1) {
                            url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + access_token;
                        }
                        _this.wx.request({
                            url: url,
                            data: data,
                            method: 'post',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            success: function (res) {
                                console.log(res.data);
                                EventManager.ins.event(NoticeEvent.AI_IMAGE_TO_WORD, res.data);
                            }
                        });
                    },
                    fail: function (error) {
                        console.error("调用本地相册文件时出错");
                        console.warn(error);
                    },
                    complete: function () { }
                });
            };
            WxPlatform.prototype.setUserCloudStorage = function (key, value) {
                console.log("开始保存数据到云端！");
                var KVDataList = [{
                        key: key,
                        value: String(value)
                    }];
                this.wx.setUserCloudStorage({
                    KVDataList: KVDataList,
                    success: function () {
                        console.log("保存数据到云端！");
                    },
                    fail: function () {
                    }
                });
            };
            /** 主域调用*/
            WxPlatform.prototype.postMsg = function (cmd, data) {
                var openDataContext = this.wx.getOpenDataContext();
                openDataContext.postMessage({ cmd: cmd, data: data });
            };
            WxPlatform.prototype.onShowCallBack = function (res) {
                _super.prototype.onShowCallBack.call(this, res);
                game.Global.query = res.query;
                game.Global.shareTicket = res.shareTicket;
                console.log("wx onShow! query=" + JSON.stringify(game.Global.query) + ",shareTicket=" + game.Global.shareTicket);
                //2018-12-19 andy 分享对象，完成分享任务
                // if(Global.query != null){
                //     let uid:string=Global.query["uid"];
                //     if(uid!=null && uid!=""){
                //         HttpManager.ins.activeShare(uid);
                //     }
                // }
                if (game.Global.shareTicket != null && game.Global.shareTicket != "") {
                    OpenManager.ins.setShareTicket();
                    console.log("微信转发已经提交服务器");
                }
                if (this.shareAppSuccess != null) {
                    this.shareAppSuccess();
                    this.shareAppSuccess = null;
                }
            };
            WxPlatform.prototype.onHideCallBack = function () {
                _super.prototype.onHideCallBack.call(this);
            };
            WxPlatform.prototype.initSysInfo = function () {
                var res = this.wx.getSystemInfoSync();
                game.Global.BRAND = res.brand;
                game.Global.MODEL = res.model;
                game.Global.SYSTEM = res.system;
                //环境 手机型号 手机系统
                console.log("brand:" + game.Global.BRAND + ",model:" + game.Global.MODEL + ",system:" + game.Global.SYSTEM);
                if (this.wx.getUpdateManager instanceof Function) {
                    /**
                        小程序没有重启的概念
                        当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
                        在 iOS 上，当微信客户端在一定时间间隔内（目前是 5 秒）连续收到两次及以上系统内存告警时，会主动进行小程序的销毁，并提示用户 「该小程序可能导致微信响应变慢被终止」。
                        建议小程序在必要时使用 wx.onMemoryWarning 监听内存告警事件，进行必要的内存清理。
                        */
                    //全局唯一的版本更新管理器，用于管理小程序更新
                    var t = this.wx.getUpdateManager();
                    t.onCheckForUpdate(function (t) {
                        //微信在小程序冷启动时自动检查更新，微信自动下载，不需由开发者主动触发
                        console.log("小游戏是否有新版本：" + t.hasUpdate);
                    }), t.onUpdateReady(function () {
                        //新版本下载完成，强制小程序重启并使用新版本
                        t.applyUpdate();
                    }), t.onUpdateFailed(function () {
                        //新版本下载失败（可能是网络原因等）
                    });
                }
            };
            WxPlatform.prototype.showModal = function (title, content, isCancel) {
                this.wx.showModal({
                    title: title,
                    content: content,
                    showCancel: isCancel
                });
            };
            WxPlatform.prototype.removeUserCloudStorage = function (key) {
                this.wx.removeUserCloudStorage({
                    KVDataList: [key],
                    success: function () {
                        console.log("托管数据" + key + "删除成功");
                    },
                    fail: function () {
                        console.log("托管数据" + key + "删除失败");
                    }
                });
            };
            return WxPlatform;
        }(platform.LocalPlatform));
        platform.WxPlatform = WxPlatform;
        var WeChatCall;
        (function (WeChatCall) {
            WeChatCall[WeChatCall["FAIL"] = 0] = "FAIL";
            WeChatCall[WeChatCall["SUCCESS"] = 1] = "SUCCESS";
            WeChatCall[WeChatCall["NO_MINI"] = 2] = "NO_MINI";
        })(WeChatCall || (WeChatCall = {}));
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
