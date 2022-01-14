var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-03-07 andy
        HTTP请求管理
        */
        var HttpManager = /** @class */ (function () {
            function HttpManager() {
                if (HttpManager._ins != null)
                    throw new Error("HttpManager is single!");
                this.xhr = new Laya.HttpRequest;
                this.xhr.http.timeout = 50000;
                this.xhr.on(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
            }
            Object.defineProperty(HttpManager, "ins", {
                get: function () {
                    if (!this._ins)
                        HttpManager._ins = new HttpManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 跳转到网页
             * @param url 跳转地址
             */
            HttpManager.prototype.link = function (url) {
                console.log("link-url:", url);
                switch (game.Global.platformId) {
                    case PlatformID.Wx:
                    case PlatformID.None:
                        Laya.Browser.window.location.href = url;
                        break;
                    case PlatformID.Al:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            TipManager.ins.showWord("Applovin does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Is:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.openStoreUrl");
                            PlatformManager.ins.actionCallBack(PlatformAction.DownLoad);
                            PlatformManager.mraid.openStoreUrl(url);
                        }
                        else {
                            TipManager.ins.showWord("IronSource does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Ut:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            TipManager.ins.showWord("Unity does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Gg:
                        if (Laya.Browser.window.ExitApi) {
                            Laya.Browser.window.ExitApi.exit();
                        }
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Fb:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            Laya.Browser.window.FbPlayableAd.onCTAClick();
                        }
                        else {
                            TipManager.ins.showWord("facebook does not support FbPlayableAd!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Vg:
                        if (parent) {
                            console.log("调用 parent.postMessage('download','*')");
                            parent.postMessage('download', '*');
                        }
                        else {
                            TipManager.ins.showWord("vungle does not support parent.postMessage!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Ac:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            TipManager.ins.showWord("adcolony does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Tj:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.click");
                            PlatformManager.mraid.click();
                        }
                        else {
                            TipManager.ins.showWord("tapjoy does not support window.TJ_API!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.mtg:
                        PlatformManager.ins.actionCallBack(PlatformAction.GameEnd);
                        PlatformManager.ins.actionCallBack(PlatformAction.DownLoad);
                        break;
                    case PlatformID.Tt:
                        if (Laya.Browser.window.openAppStore) {
                            console.log("调用 window.openAppStore");
                            Laya.Browser.window.openAppStore();
                        }
                        else {
                            TipManager.ins.showWord("tiktok does not support window.openAppStore!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Qq:
                        if (Laya.Browser.window._gdtUnSdk) {
                            console.log("调用 window._gdtUnSdk");
                            Laya.Browser.window._gdtUnSdk.playAble.onClick();
                        }
                        else {
                            TipManager.ins.showWord("qq does not support window._gdtUnSdk!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Bd:
                        if (Laya.Browser.window.playableSDK) {
                            console.log("调用 window.playableSDK.openAppStore()");
                            Laya.Browser.window.playableSDK.openAppStore();
                        }
                        else {
                            TipManager.ins.showWord("ByteDance does not support window.playableSDK!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    default:
                        break;
                }
            };
            /**
             * HTTP GET 访问
             * @param url
             * @param caller
             * @param callback
             */
            HttpManager.prototype.get = function (url, caller, callback) {
                this.caller = caller;
                this.callback = callback;
                this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
                this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
                this.xhr.send(url, null, 'get', 'text');
                return this;
            };
            /**
             * HTTP POST 访问
             * @param url
             * @param data
             * @param contentType
             * @param caller
             * @param callback
             */
            HttpManager.prototype.post = function (url, data, contentType, caller, callback) {
                this.caller = caller;
                this.callback = callback;
                this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
                this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
                if (contentType == null) {
                    this.xhr.send(url, data, 'post', 'text');
                }
                else {
                    this.xhr.send(url, data, 'post', 'text', ["content-type", contentType]);
                }
                return this;
            };
            HttpManager.prototype.onHttpRequestProgress = function (e) {
                console.log("onHttpRequestProgress" + e);
                EventManager.ins.event(NoticeEvent.HTTP_PROGRESS, e);
            };
            HttpManager.prototype.onHttpRequestError = function (e) {
                console.log("onHttpRequestError");
                this.callback.apply(this.caller, [{ state: 500, msg: e }]);
            };
            HttpManager.prototype.onHttpRequestComplete = function (e) {
                //console.log("onHttpRequestComplete");
                this.callback.apply(this.caller, [{ state: 200, data: this.xhr.data }]);
            };
            return HttpManager;
        }());
        net.HttpManager = HttpManager;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
