var game;
(function (game) {
    var util;
    (function (util) {
        /*
        *2019-03-11 andy
        公用工具方法
        */
        var PubUtil = /** @class */ (function () {
            function PubUtil() {
            }
            /**
             * 2019-03-11 得到今天的年月日
            */
            PubUtil.GetTodayDateStr = function () {
                var date = new Date();
                return date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            };
            return PubUtil;
        }());
        util.PubUtil = PubUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * name;
        */
        var MathUtil = /** @class */ (function () {
            function MathUtil() {
            }
            /**
             * 随机产生一个范围的值
             * @param min 最小值
             * @param max 最大值
             */
            MathUtil.randomRange = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            /**
             * 判断两个矩形是否有重叠区域
             * @param rect1 矩形1
             * @param rect2 矩形2
             */
            MathUtil.isOverlap = function (rect1, rect2) {
                var startX1 = rect1.x, startY1 = rect1.y, endX1 = startX1 + rect1.width, endY1 = startY1 + rect1.height;
                var startX2 = rect2.x, startY2 = rect2.y, endX2 = startX2 + rect2.width, endY2 = startY2 + rect2.height;
                return !(endY2 < startY1 || endY1 < startY2 || startX1 > endX2 || startX2 > endX1);
            };
            ;
            /**
             * 角度转成弧度
             * @param angle 角度
             */
            MathUtil.angleToRadian = function (angle) {
                return angle * Math.PI / 180;
            };
            /**
             * 弧度转成角度
             * @param radian 弧度
             */
            MathUtil.radianToAngle = function (radian) {
                return radian * 180 / Math.PI;
            };
            /**
             * 把一般角度转换成0-360度
             * @param angle 角度
             */
            MathUtil.changeAngle360 = function (angle) {
                if (angle % 360 < 0) {
                    angle += 360;
                }
                return angle;
            };
            /**
             * 创建贝塞尔曲线
             * @param anchorpoints 点
             * @param pointsAmount
             */
            MathUtil.CreateBezierPoints = function (anchorpoints, pointsAmount) {
                var points = [];
                for (var i = 0; i < pointsAmount; i++) {
                    var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                    points.push(point);
                }
                return points;
            };
            MathUtil.MultiPointBezier = function (points, t) {
                var len = points.length;
                var x = 0, y = 0;
                for (var i = 0; i < len; i++) {
                    var point = points[i];
                    x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                    y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                }
                return { x: x, y: y };
            };
            MathUtil.erxiangshi = function (start, end) {
                var cs = 1, bcs = 1;
                while (end > 0) {
                    cs *= start;
                    bcs *= end;
                    start--;
                    end--;
                }
                return (cs / bcs);
            };
            return MathUtil;
        }());
        util.MathUtil = MathUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

/**
* name
*/
var game;
(function (game) {
    var util;
    (function (util) {
        var Dictionary = /** @class */ (function () {
            function Dictionary() {
                this._container = new Object();
                this._length = 0;
            }
            Object.defineProperty(Dictionary.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "length", {
                get: function () {
                    return this._length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 添加元素
             * @param key
             * @param value
             *
             */
            Dictionary.prototype.add = function (key, value) {
                //如果是新添加才增加length
                if (!this.hasKey(key))
                    this._length++;
                this._container[key] = value;
                return value;
            };
            Dictionary.prototype.forEach = function (func) {
                var boo;
                for (var i in this._container) {
                    boo = func(this._container[i]);
                    if (!boo) {
                        return;
                    }
                }
            };
            Dictionary.prototype.forIn = function (func) {
                for (var i in this._container) {
                    func(i);
                }
            };
            Dictionary.prototype.valueOf = function () {
                var values = [];
                for (var i in this._container) {
                    values.push(this._container[i]);
                }
                return values;
            };
            /**
             * 根据键值获取对象
             * @param key
             * @return
             *
             */
            Dictionary.prototype.get = function (key) {
                return this._container[key];
            };
            /**
             * 重新设置
             * @param key
             * @param value
             *
             */
            Dictionary.prototype.reset = function (key, value) {
                if (this.hasKey(key)) {
                    this._container[key] = value;
                }
                else {
                    console.log("ObjDictionary: warning you reset a not exist key");
                }
            };
            /**
             * 是否包含键
             * @param key
             * @return
             *
             */
            Dictionary.prototype.hasKey = function (key) {
                return this._container.hasOwnProperty(key);
            };
            /**
             * 移除键
             * @param key
             *
             */
            Dictionary.prototype.remove = function (key) {
                if (this._container.hasOwnProperty(key)) {
                    var value = this._container[key];
                    this._container[key] = null;
                    delete this._container[key];
                    this._length--;
                    return value;
                }
                return null;
            };
            /**
             *清除操作
             *
             */
            Dictionary.prototype.clear = function () {
                this._length = 0;
                this._container = null;
                this._container = new Object();
            };
            return Dictionary;
        }());
        util.Dictionary = Dictionary;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * name;
        */
        var UIType = /** @class */ (function () {
            function UIType(v, v2) {
                this.name = v;
                this.path = v2;
            }
            return UIType;
        }());
        ui.UIType = UIType;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 2019-02-27 andy
            界面管理
        */
        var UIManager = /** @class */ (function () {
            function UIManager() {
                if (UIManager._ins != null)
                    throw new Error("UIManager is single!");
                //this.progressHandler = Laya.Handler.create(this,this.setLoadingProgress,null,false);
            }
            Object.defineProperty(UIManager, "ins", {
                get: function () {
                    if (!this._ins)
                        UIManager._ins = new UIManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            UIManager.prototype.init = function () {
                game.Global.uiRoot = new Laya.Sprite();
                Laya.stage.addChild(game.Global.uiRoot);
                // //初始化层级
                this.dicLayer = new laya.utils.Dictionary();
                this.dicLayer.set(LayerName.scene, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.main, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.window, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.top, game.Global.uiRoot.addChild(new Laya.Sprite()));
                //初始化界面
                this.dicWindow = new laya.utils.Dictionary();
            };
            UIManager.prototype.getWindow = function (uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (!win) {
                    var cls = uiType.path;
                    win = new cls();
                    win.uiType = uiType;
                    this.dicWindow.set(uiType.name, win);
                }
                return win;
            };
            UIManager.prototype.openWindow = function (uiType) {
                var win = this.getWindow(uiType);
                if (win.isOpen()) {
                    //console.log("窗体已经打开");
                }
                else {
                    LayerManager.ins.addChild(win.view, LayerName.window);
                }
                return win;
            };
            UIManager.prototype.closeWindow = function (uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (win) {
                    win.view.removeSelf();
                }
            };
            /**
             * 增加序列帧动画
             * @param frame
             */
            UIManager.prototype.addFrameAnimation = function (frame, layer) {
                if (layer === void 0) { layer = LayerName.main; }
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(frame, layer);
                // }
                return frame;
            };
            /**
             * 删除序列帧动画
             * @param frame
             */
            UIManager.prototype.removeFrameAnimation = function (frame) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                frame.removeSelf();
                // }
            };
            return UIManager;
        }());
        ui.UIManager = UIManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        2019-02-27 andy
        * UI基类
        */
        var BaseUI = /** @class */ (function () {
            function BaseUI() {
            }
            BaseUI.prototype.open = function () {
            };
            BaseUI.prototype.close = function () {
            };
            BaseUI.prototype.detory = function () {
            };
            return BaseUI;
        }());
        ui.BaseUI = BaseUI;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-04-09 andy
        网络通讯管理
        */
        var NetManager = /** @class */ (function () {
            function NetManager() {
                if (NetManager._ins != null)
                    throw new Error("NetManager is single!");
                NetManager._ins = this;
                this._socketDataEvent = new Dictionary();
            }
            Object.defineProperty(NetManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new NetManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            /**初始化 */
            NetManager.prototype.init = function () {
                console.log("serverIP", game.Define.serverIP, "serverPort", game.Define.serverPort);
                this.socket = io.connect(game.Define.serverIP + ":" + game.Define.serverPort);
                // 当接收到消息并且不是本机时生成聊天气泡
                this.socket.on(SocketIoEvent.message, this.onMessageReveived);
                //连接成功
                this.socket.on(SocketIoEvent.connect, this.onSocketOpen);
                //连接断开
                this.socket.on(SocketIoEvent.disconnect, this.onSocketClose);
                //错误
                this.socket.on(SocketIoEvent.error, this.onConnectError);
            };
            NetManager.prototype.onSocketOpen = function (e) {
                if (e === void 0) { e = null; }
                console.log("与服务器连接成功");
                EventManager.ins.event(SocketIoEvent.connect, e);
            };
            NetManager.prototype.onSocketClose = function (e) {
                if (e === void 0) { e = null; }
                console.log("与服务器连接断开");
                EventManager.ins.event(SocketIoEvent.disconnect, e);
            };
            NetManager.prototype.onMessageReveived = function (message) {
                if (message === void 0) { message = null; }
                console.log("收到服务端message");
                if (message) {
                    console.log(message);
                }
                else if (message) {
                    console.log(new Laya.Byte(message).readUTFBytes());
                }
                //this.socket.input.clear();
                EventManager.ins.event(SocketIoEvent.message, message);
            };
            NetManager.prototype.onConnectError = function (e) {
                if (e === void 0) { e = null; }
                console.log("error");
                EventManager.ins.event(SocketIoEvent.error, e);
            };
            /**
             * 发送message
             * @param data
             * @param fn
             */
            NetManager.prototype.send = function (data, fn) {
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                this.socket.send(data, fn);
            };
            /**
             * 发送emit
             * @param eventName
             * @param args
             */
            NetManager.prototype.emit = function (eventName) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                this.socket.emit(eventName, args);
            };
            /**
             * 添加网络事件观察者
             * @param eventName
             * @param _callback
             */
            NetManager.prototype.registerNetEvent = function (eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    this._socketDataEvent.get(eventName).push(_callback);
                }
                else {
                    this._socketDataEvent.add(eventName, [_callback]);
                }
                this.socket.on(eventName, _callback.method.bind(_callback.caller));
            };
            /**
             * 删除网络事件观察者
             * @param eventName
             * @param _callback
             */
            NetManager.prototype.unregisterNetEvent = function (eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    var arr = this._socketDataEvent.get(eventName);
                    if (arr.indexOf(_callback) >= 0) {
                        arr.splice(arr.indexOf(_callback));
                    }
                }
            };
            NetManager.prototype.update = function () {
                while (this._socketDataEvent.length > 0) {
                    // 添加每帧处理封包数量上限【感觉应该根据帧频处理比较合理】
                    // if (this._socketDataEvent.length > 200)
                    // {     //大于200 加速处理
                    //     timesPerFrame = 360 / Define.frameRate;
                    // }
                    // else
                    // {
                    //     timesPerFrame = 180 / Define.frameRate;
                    // }
                    // if (processTimes <= timesPerFrame)
                    // {   //每秒处理180个包，帧率不一样每帧处理数量不同
                    //     processTimes++;
                    // }
                    // else
                    // {
                    //     processTimes = 0;
                    //     break;
                    // }
                    // lock (this._socketDataEvent)
                    // {
                    // this._socketDataEvent tmpNetMessageData = this._socketDataEvent.Dequeue();
                    // if (_socketDataEvent.ContainsKey(tmpNetMessageData.pid))
                    // {
                    //     _socketDataEvent[tmpNetMessageData.pid](tmpNetMessageData.data);
                    // }
                    // }
                }
            };
            return NetManager;
        }());
        net.NetManager = NetManager;
        /**
         * socke.io系统事件
         */
        var SocketIoEvent = /** @class */ (function () {
            function SocketIoEvent() {
            }
            /**连接成功 */
            SocketIoEvent.connect = "connect";
            /**连接失败 */
            SocketIoEvent.connect_error = "connect_error";
            /**连接超时 */
            SocketIoEvent.connect_timeout = "connect_timeout";
            /**重新连接成功 */
            SocketIoEvent.reconnect = "reconnect";
            /**失去连接 */
            SocketIoEvent.disconnect = "disconnect";
            /**发生错误 */
            SocketIoEvent.error = "error";
            /** */
            SocketIoEvent.message = "message";
            return SocketIoEvent;
        }());
        net.SocketIoEvent = SocketIoEvent;
        /**
         * // 发送给当前客户端
      socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    
      // 发送给所有客户端，除了发送者
      socket.broadcast.emit('broadcast', 'hello friends!');
    
      // 发送给同在 'game' 房间的所有客户端，除了发送者
      socket.to('game').emit('nice game', "let's play a game");
    
      // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
      socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");
    
      // 发送给同在 'game' 房间的所有客户端，包括发送者
      io.in('game').emit('big-announcement', 'the game will start soon');
    
      // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
      io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');
    
      // 发送给指定 socketid 的客户端（私密消息）
      socket.to(<socketid>).emit('hey', 'I just met you');
    
      // 包含回执的消息
      socket.emit('question', 'do you think so?', function (answer) {});
    
      // 不压缩，直接发送
      socket.compress(false).emit('uncompressed', "that's rough");
    
      // 如果客户端还不能接收消息，那么消息可能丢失
      socket.volatile.emit('maybe', 'do you really need it?');
    
      // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
      io.local.emit('hi', 'my lovely babies');
         */
    })(net = game.net || (game.net = {}));
})(game || (game = {}));

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
                enumerable: true,
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
                        }
                        break;
                    case PlatformID.Is:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.openStoreUrl");
                            PlatformManager.mraid.openStoreUrl(url);
                        }
                        else {
                            TipManager.ins.showWord("IronSource does not support mraid!");
                        }
                        break;
                    case PlatformID.mtg:
                        PlatformManager.ins.actionCallBack(PlatformAction.DownLoad);
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

var game;
(function (game) {
    var king;
    (function (king_1) {
        /*
        * 2019-04-07 andy
            人物管理
        */
        var KingManager = /** @class */ (function () {
            function KingManager() {
                if (KingManager._ins != null)
                    throw new Error("KingManager is single!");
            }
            Object.defineProperty(KingManager, "ins", {
                get: function () {
                    if (!this._ins)
                        KingManager._ins = new KingManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            KingManager.prototype.init = function () {
                //初始化界面
                this.dicWindow = new laya.utils.Dictionary();
            };
            // public getWindow(uiType:UIType):any{
            //     var win:BaseWindow = this.dicWindow.get(uiType.name);
            //     if(!win){
            //         var cls = uiType.path;
            //         win = new cls();
            //         win.uiType=uiType;
            //         this.dicWindow.set(uiType.name,win);
            //     }
            //     return win;
            // }
            KingManager.prototype.addKing = function (king) {
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(king, LayerName.scene_king);
                // }
                return king;
            };
            KingManager.prototype.removeKing = function (king) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                king.removeSelf();
                // }
            };
            return KingManager;
        }());
        king_1.KingManager = KingManager;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));

var game;
(function (game) {
    var king;
    (function (king) {
        var Templet = Laya.Templet;
        /*
        * 2019-04-07 andy
            骨骼动画管理
        */
        var BoneManager = /** @class */ (function () {
            function BoneManager() {
                this.boneIndex = 10000;
                if (BoneManager._ins != null)
                    throw new Error("BoneManager is single!");
            }
            Object.defineProperty(BoneManager, "ins", {
                get: function () {
                    if (!this._ins)
                        BoneManager._ins = new BoneManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            BoneManager.prototype.init = function () {
                //初始化
                this.dicTemp = new Dictionary();
                //初始化
                this.dicBonePool = new Dictionary();
                this.dicBone = new Dictionary();
            };
            BoneManager.prototype.addBone = function (boneType) {
                var temp = null;
                if (this.dicTemp.hasKey(boneType.name)) {
                    temp = this.dicTemp.get(boneType.name);
                }
                else {
                    temp = new Templet();
                    this.dicTemp.add(boneType.name, temp);
                }
                var objId = 0;
                if (temp.isParserComplete) {
                    var bone = this.parseComplete({ temp: temp, boneName: boneType.name, boneType: boneType.cacheType, objId: 0 });
                    objId = bone.objId;
                }
                else {
                    objId = this.boneIndex++;
                    temp.on(Laya.Event.COMPLETE, this, this.parseComplete, [{ temp: temp, boneName: boneType.name, boneType: boneType.cacheType, objId: objId }]);
                    temp.on(Laya.Event.ERROR, this, this.onError, [boneType.cacheType]);
                    temp.loadAni(boneType.path);
                }
                return objId;
            };
            BoneManager.prototype.onError = function (err) {
                console.log("error", err);
            };
            BoneManager.prototype.parseComplete = function (data) {
                var temp = data.temp;
                var boneName = data.boneName;
                var boneType = data.boneType;
                var objId = data.objId;
                var bone;
                if (this.dicBonePool.hasKey(boneName)) {
                    var arrSk = this.dicBonePool.get(boneName);
                    if (arrSk && arrSk.length > 0) {
                        bone = arrSk.shift();
                        objId = bone.objId;
                        console.log("从缓存池取出：" + boneName + " 取出后还剩：" + arrSk.length);
                    }
                }
                else {
                    //创建模式为1，可以启用换装
                    var sk = temp.buildArmature(boneType);
                    bone = new king.BaseBone(objId, boneName, sk);
                }
                this.dicBone.add(objId, bone);
                LayerManager.ins.addChild(bone, LayerName.scene_king);
                return bone;
            };
            /**
             * 根据唯一标识ID获得骨骼对象
             * @param objId 唯一标识ID
             */
            BoneManager.prototype.getBone = function (objId) {
                if (this.dicBone.hasKey(objId)) {
                    return this.dicBone.get(objId);
                }
                return null;
            };
            BoneManager.prototype.removeBone = function (bone) {
                if (!bone) {
                    return;
                }
                if (bone.parent) {
                    bone.removeSelf();
                }
                if (this.dicBone.hasKey(bone.objId)) {
                    this.dicBone.remove(bone.objId);
                    console.log("当前活动：名字：" + bone.kingType + " 个数：" + this.dicBone.length);
                }
                //放回缓存池
                var arrSk = null;
                if (this.dicBonePool.hasKey(bone.kingType)) {
                    arrSk = this.dicBonePool.get(bone.kingType);
                }
                else {
                    arrSk = new Array();
                    this.dicBonePool.add(bone.kingType, arrSk);
                }
                if (arrSk) {
                    arrSk.push(bone);
                    console.log("放入缓存池：名字：" + bone.kingType + " 个数：" + arrSk.length);
                }
            };
            /**
             * 移除所有骨骼动画
             */
            BoneManager.prototype.removeBoneAll = function () {
                for (var _i = 0, _a = this.dicBone.valueOf(); _i < _a.length; _i++) {
                    var bone = _a[_i];
                    this.removeBone(bone);
                }
            };
            return BoneManager;
        }());
        king.BoneManager = BoneManager;
        /*
        * 骨骼类型
        */
        var BoneType = /** @class */ (function () {
            function BoneType(v, v2, v3) {
                /**模板创建示例类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装*/
                this.cacheType = 0;
                this.name = v;
                this.path = v2;
                this.cacheType = v3;
            }
            return BoneType;
        }());
        king.BoneType = BoneType;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));

var game;
(function (game) {
    /*
    * 2019-02-28 andy
    全局游戏常量定义
    */
    var Define = /** @class */ (function () {
        function Define() {
        }
        /**是否测试模式 */
        Define.isDebug = true;
        Define.DeviceW = 720;
        Define.DeviceH = 1280;
        /**游戏资源根目录 */
        Define.CDN = "res";
        /**服务端HTTP */
        Define.serverHttp = "http://127.0.0.1";
        /**服务端websocket地址 */
        Define.serverIP = "http://127.0.0.1";
        /**服务端websocket端口 */
        Define.serverPort = "3000";
        /**网关HTTP地址 */
        Define.serverConfigUrl = "res/config/serverConfig.json"; //"http://127.0.0.1:8090/webgame/config.html";//
        /**游戏ID */
        Define.gameId = 1;
        /**游戏版本号 */
        Define.gameVersion = "100";
        /**语言类型 */
        Define.langId = "res";
        /**是否单机游戏 */
        Define.isLocal = true;
        /**微信APPID */
        Define.appId = "wx659ae0df220d382f";
        /**点击按钮时的声音 */
        Define.SOUND_BTN = "";
        /**点击按钮时的声音 */
        Define.SOUND_MAIN = "";
        /**点击按钮时的声音 */
        Define.SOUND_GAME = "";
        /**游戏下载地址 */
        Define.DOWNLOAD_URL = "";
        return Define;
    }());
    game.Define = Define;
    /**广告配置 */
    var AdConfig = /** @class */ (function () {
        function AdConfig() {
        }
        return AdConfig;
    }());
    game.AdConfig = AdConfig;
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        *2019-04-28 andy
        Tween管理类
        */
        var TweenManager = /** @class */ (function () {
            function TweenManager() {
                if (TweenManager._ins != null)
                    throw new Error("TweenManager is single!");
                this.dicTween = new Dictionary();
            }
            Object.defineProperty(TweenManager, "ins", {
                get: function () {
                    if (!this._ins)
                        TweenManager._ins = new TweenManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 注册twwen
             * @param tt
             */
            TweenManager.prototype.regTween = function (tt) {
                this.dicTween.add(tt.id, tt);
            };
            /**
             * 播放动画
             * @param loop
             * @param name
             */
            TweenManager.prototype.play = function (loop, name) {
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.play(loop);
                }
            };
            /**
             * 停止动画
             * @param name
             * @param isHide 是否隐藏,默认为true
             */
            TweenManager.prototype.stop = function (name, isHide) {
                if (isHide === void 0) { isHide = true; }
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop(isHide);
                }
            };
            /**
             * 停止所有动画
             */
            TweenManager.prototype.clearAll = function () {
                for (var _i = 0, _a = this.dicTween.valueOf(); _i < _a.length; _i++) {
                    var tt = _a[_i];
                    if (tt) {
                        tt.stop();
                        Laya.timer.clearAll(tt);
                    }
                }
            };
            /**
             * 创建属性集合
             * @param tpt 属性集合类型
             * @param param 参数 1.PING_PANG 旋转角度 2.GUIDE_SLID_1 时间,X1,X2
             */
            TweenManager.prototype.creatProp = function (tpt, param) {
                if (param === void 0) { param = null; }
                var ret = [];
                switch (tpt) {
                    case TweenPropType.PING_PANG:
                        if (!param || param.length == 0) {
                            param = [30];
                        }
                        ret = [new TweenProp(200, -1, -1, 1, param[0]), new TweenProp(150, -1, -1, 1, -param[0]), new TweenProp(150, -1, -1, 1, param[0]), new TweenProp(100, -1, -1, 1, -(param[0] >> 1)), new TweenProp(100, -1, -1, 1, (param[0] >> 2)), new TweenProp(80, -1, -1, 1, 0)];
                        break;
                    case TweenPropType.PING_PANG_1:
                        if (!param || param.length == 0) {
                            param = [game.Define.DeviceH >> 1, 50];
                        }
                        ret = [new TweenProp(200, -1, param[0]), new TweenProp(150, -1, param[0] - param[1]), new TweenProp(150, -1, param[0] + param[1]), new TweenProp(100, -1, param[0] - (param[1] >> 1)), new TweenProp(100, -1, param[0] + (param[1] >> 2)), new TweenProp(80, -1, param[0])];
                        break;
                    case TweenPropType.PING_PANG_2:
                        if (!param || param.length == 0) {
                            param = [game.Define.DeviceH >> 1, 50];
                        }
                        ret = [new TweenProp(200, -1, param[0]), new TweenProp(150, -1, param[0] - param[1]), new TweenProp(150, -1, param[0] + param[1]), new TweenProp(100, -1, param[0] - (param[1] >> 1)), new TweenProp(100, -1, param[0] + (param[1] >> 2)), new TweenProp(80, -1, param[0])];
                        break;
                    case TweenPropType.GUIDE_SLID_1:
                        if (!param || param.length < 3) {
                            console.error("缓动横向滑动参数错误：必须是3个参数！");
                        }
                        else {
                            ret = [new TweenProp(param[0], param[1], -1, 1), new TweenProp(0, param[2], -1, 1), new TweenProp(0, -1, -1, 0)];
                        }
                        break;
                    case TweenPropType.GUIDE_SLID_2:
                        if (!param || param.length < 3) {
                            console.error("缓动竖向滑动参数错误：必须是3个参数！");
                        }
                        else {
                            ret = [new TweenProp(param[0], -1, param[1], 1), new TweenProp(0, -1, param[2], 1), new TweenProp(0, -1, -1, 0)];
                        }
                        break;
                    case TweenPropType.GUIDE_CLICK:
                        if (!param || param.length == 0) {
                            param = [100];
                        }
                        ret = [new TweenProp(100, -1, param[0] + 20), new TweenProp(100, -1, param[0] + 10), new TweenProp(100, -1, param[0] + 20), new TweenProp(100, -1, param[0] + 20), new TweenProp(80, -1, param[0])];
                        break;
                    default:
                        break;
                }
                return ret;
            };
            /**
             * 重置动画属性
             * @param name 缓动名字，唯一标识
             * @param tpt  属性类型
             * @param param  参数
             * @param delayTime 延时时间
             */
            TweenManager.prototype.resetProp = function (name, tpt, param, delayTime) {
                if (param === void 0) { param = null; }
                if (delayTime === void 0) { delayTime = -1; }
                var tt = this.dicTween.get(name);
                if (tt) {
                    var arrProp = this.creatProp(tpt, param);
                    tt.resetProp(arrProp, delayTime);
                }
            };
            return TweenManager;
        }());
        common.TweenManager = TweenManager;
        var TweenTarget = /** @class */ (function () {
            function TweenTarget(id, target, arrProp, delayTime) {
                this.id = "";
                this.delayTime = 0;
                this.propIndex = 0;
                this.isPlay = true;
                this.isLoop = false;
                this.id = id;
                this.target = target;
                this.arrProp = arrProp;
                this.delayTime = delayTime;
            }
            /**
             * 播放动画
             * @param isLoop 默认为true
             */
            TweenTarget.prototype.play = function (isLoop) {
                if (isLoop === void 0) { isLoop = true; }
                this.target.visible = true;
                Laya.Tween.clearAll(this.target);
                this.isLoop = isLoop;
                this.isPlay = true;
                this.propIndex = 0;
                this.playNext();
            };
            TweenTarget.prototype.playNext = function () {
                var _this = this;
                if (!this.isPlay) {
                    return;
                }
                var propFrom = this.arrProp[this.propIndex++];
                var propTo = null;
                if (this.propIndex < this.arrProp.length) {
                    propTo = this.arrProp[this.propIndex];
                    propTo.x = propTo.x == -1 ? this.target.x : propTo.x;
                    propTo.y = propTo.y == -1 ? this.target.y : propTo.y;
                }
                else {
                    if (this.isLoop) {
                        Laya.timer.once(this.delayTime, this, function () {
                            _this.propIndex = 0;
                            _this.playNext();
                        });
                    }
                    return;
                }
                this.target.x = propFrom.x == -1 ? this.target.x : propFrom.x;
                this.target.y = propFrom.y == -1 ? this.target.y : propFrom.y;
                this.target.alpha = propFrom.alpha;
                this.target.rotation = propFrom.rotation;
                Laya.Tween.to(this.target, propTo, propFrom.duration, null, Laya.Handler.create(this, function () {
                    _this.playNext();
                }));
            };
            /**
             * 停止动画
             * @param isHide 默认为true
             */
            TweenTarget.prototype.stop = function (isHide) {
                if (isHide === void 0) { isHide = true; }
                if (isHide) {
                    this.target.visible = false;
                }
                this.isPlay = false;
                Laya.Tween.clearAll(this.target);
            };
            /**
             * 重置缓动属性
             * @param arrProp
             * @param delayTime
             */
            TweenTarget.prototype.resetProp = function (arrProp, delayTime) {
                if (delayTime === void 0) { delayTime = -1; }
                if (arrProp) {
                    this.arrProp = arrProp;
                }
                if (delayTime >= 0) {
                    this.delayTime = delayTime;
                }
            };
            return TweenTarget;
        }());
        common.TweenTarget = TweenTarget;
        /*
        * 2019-04-29 andy
        Tween缓动属性
        */
        var TweenProp = /** @class */ (function () {
            function TweenProp(duration, x, y, alpha, rotation) {
                if (x === void 0) { x = -1; }
                if (y === void 0) { y = -1; }
                if (alpha === void 0) { alpha = 1; }
                if (rotation === void 0) { rotation = 0; }
                /**持续时间 */
                this.duration = 0;
                this.duration = duration;
                this.x = x;
                this.y = y;
                this.alpha = alpha;
                this.rotation = rotation;
            }
            return TweenProp;
        }());
        common.TweenProp = TweenProp;
        /*
        * 2019-05-07 andy
        Tween缓动属性集合类型
        */
        var TweenPropType;
        (function (TweenPropType) {
            /**不倒翁晃动 */
            TweenPropType[TweenPropType["PING_PANG"] = 0] = "PING_PANG";
            /**乒乓球上下晃动 */
            TweenPropType[TweenPropType["PING_PANG_1"] = 1] = "PING_PANG_1";
            /**乒乓球左右晃动 */
            TweenPropType[TweenPropType["PING_PANG_2"] = 2] = "PING_PANG_2";
            /**横向滑动 */
            TweenPropType[TweenPropType["GUIDE_SLID_1"] = 3] = "GUIDE_SLID_1";
            /**竖向滑动 */
            TweenPropType[TweenPropType["GUIDE_SLID_2"] = 4] = "GUIDE_SLID_2";
            /**点击效果 */
            TweenPropType[TweenPropType["GUIDE_CLICK"] = 5] = "GUIDE_CLICK";
        })(TweenPropType = common.TweenPropType || (common.TweenPropType = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        2019-04-01 andy
        * 触摸管理器
        监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:SwipeDirection,startP:Laya.Point,endP:Laya.Point}
        */
        var TouchManager = /** @class */ (function () {
            function TouchManager() {
                /**触摸开关 */
                this._isCanTouch = true;
                this._isTouch = false;
                this._isPushEvent = false;
                this._isRelesePushEvent = false;
                this.RELESE_PUSH_TIME = .4;
                if (TouchManager._ins != null)
                    throw new Error("TouchManager is single!");
                TouchManager._ins = this;
                this.moveAnagle = [[0, 50], [50, 130], [130, 229], [230, 320], [320, 360]];
                this.AngleToDirectionMap = [SwipeDirection.Right, SwipeDirection.Down, SwipeDirection.Left, SwipeDirection.Up, SwipeDirection.Right];
                this._startPoint = new Laya.Point();
                this._curPoint = new Laya.Point();
            }
            Object.defineProperty(TouchManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new TouchManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            TouchManager.prototype.init = function () {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            };
            /**
             * 设置触摸是否有效
             * @param v
             */
            TouchManager.prototype.setTouch = function (v) {
                this._isCanTouch = v;
            };
            TouchManager.prototype.onMouseDown = function (t) {
                if (!this._isCanTouch) {
                    return;
                }
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._moveCount = 0, this._isTouch = true, this._startPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
            };
            TouchManager.prototype.onMouseMove = function (t) {
                if (this._isTouch && (this._curPoint.x = Laya.stage.mouseX, this._curPoint.y = Laya.stage.mouseY,
                    !this._isPushEvent)) {
                    var e = this._startPoint.distance(this._curPoint.x, this._curPoint.y), i = 18;
                    if (this._moveCount > 0 && (i = 20), e >= i) {
                        var n = new Laya.Vector2(this._curPoint.x - this._startPoint.x, this._curPoint.y - this._startPoint.y), r = this.GetSwipeDirection(n, 1);
                        common.EventManager.ins.event(common.NoticeEvent.TOUCH_DIRECTOR, { dir: r, startP: this._startPoint, endP: this._curPoint });
                        this._isPushEvent = true, this.StartRelesePushEvent(), this._moveCount++;
                    }
                    this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
                }
            };
            TouchManager.prototype.onMouseUp = function (t) {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._isTouch = false, this.EndRelesePushEvent();
            };
            TouchManager.prototype.GetSwipeDirection = function (t, i) {
                var n = MathUtil.changeAngle360(MathUtil.radianToAngle(Math.atan2(t.y, t.x)));
                for (var r = 0; r < this.AngleToDirectionMap.length; ++r) {
                    var startAngle = this.moveAnagle[r][0], endAngle = this.moveAnagle[r][1];
                    if (n >= startAngle && n <= endAngle)
                        return this.AngleToDirectionMap[r];
                }
                return SwipeDirection.Non;
            };
            TouchManager.prototype.UpdateRelesePushEvent = function () {
                //this._isRelesePushEvent && (this._relesePushTime += Global.timeDelta, this._relesePushTime >= this.RELESE_PUSH_TIME && this.EndRelesePushEvent());
            };
            TouchManager.prototype.StartRelesePushEvent = function () {
                this._relesePushTime = 0, this._isRelesePushEvent = true;
            };
            TouchManager.prototype.EndRelesePushEvent = function () {
                this._isRelesePushEvent = false, this._isPushEvent = false, this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
            };
            return TouchManager;
        }());
        common.TouchManager = TouchManager;
        /*
        * 滑动方向;
        */
        var SwipeDirection;
        (function (SwipeDirection) {
            SwipeDirection[SwipeDirection["Non"] = 0] = "Non";
            SwipeDirection[SwipeDirection["Left"] = 1] = "Left";
            SwipeDirection[SwipeDirection["Right"] = 2] = "Right";
            SwipeDirection[SwipeDirection["Up"] = 3] = "Up";
            SwipeDirection[SwipeDirection["Down"] = 4] = "Down";
        })(SwipeDirection = common.SwipeDirection || (common.SwipeDirection = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-03 andy
        提示信息管理
        */
        var TipManager = /** @class */ (function () {
            function TipManager() {
                if (TipManager._ins != null)
                    throw new Error("TipManager is single!");
            }
            Object.defineProperty(TipManager, "ins", {
                get: function () {
                    if (!this._ins)
                        TipManager._ins = new TipManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 图片提示
             * @param url 图片展示
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
             */
            TipManager.prototype.showImg = function (url, x, y, offH) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (offH === void 0) { offH = -50; }
                var imgEfct = new Laya.Image();
                imgEfct.skin = url;
                imgEfct.x = ((game.Define.DeviceW - imgEfct.width) / 2);
                imgEfct.x = x == 0 ? ((game.Define.DeviceW - imgEfct.width) / 2) : x;
                imgEfct.y = y == 0 ? ((game.Define.DeviceH - imgEfct.height) / 2) : y;
                common.LayerManager.ins.addChild(imgEfct, common.LayerName.top);
                Laya.Tween.to(imgEfct, { y: imgEfct.y + offH }, 500, null, Laya.Handler.create(this, function () {
                    imgEfct.removeSelf();
                    imgEfct = null;
                }));
            };
            /**
             * 文字提示
             * @param url 图片展示
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH Y轴浮动距离，默认为-50
             * @param fontSize 字体大小，默认为40
             * @param fontColor 字体颜色，默认为黑色
             */
            TipManager.prototype.showWord = function (msg, x, y, offH, fontSize, fontColor) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (offH === void 0) { offH = -50; }
                if (fontSize === void 0) { fontSize = 40; }
                if (fontColor === void 0) { fontColor = "#000000"; }
                var lbl = new Laya.Label();
                lbl.color = fontColor;
                lbl.fontSize = fontSize;
                lbl.text = msg;
                lbl.x = x == 0 ? ((game.Define.DeviceW - lbl.width) / 2) : x;
                lbl.y = y == 0 ? ((game.Define.DeviceH - lbl.height) / 2) : y;
                common.LayerManager.ins.addChild(lbl, common.LayerName.top);
                Laya.Tween.to(lbl, { y: lbl.y + offH }, 700, null, Laya.Handler.create(this, function () {
                    lbl.removeSelf();
                    lbl = null;
                }));
            };
            return TipManager;
        }());
        common.TipManager = TipManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        声音管理器
        */
        var SoundManager = /** @class */ (function () {
            function SoundManager() {
                /**声音是否播放 */
                this.isOn = true;
                /**是否震动 */
                this.isShake = true;
                if (SoundManager._ins != null)
                    throw new Error("SoundManager is single!");
            }
            Object.defineProperty(SoundManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SoundManager._ins = new SoundManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            /**预加载声音 */
            SoundManager.prototype.preload = function (arr, callBack, progress) {
                Laya.loader.load(arr, callBack, progress);
            };
            SoundManager.prototype.init = function (callBack) {
                var arr = [{
                        url: game.Define.CDN + game.Define.SOUND_GAME,
                        type: Laya.Loader.SOUND
                    }];
                Laya.loader.load(arr, callBack, null);
            };
            /**设置声音 */
            SoundManager.prototype.setOn = function (v) {
                this.isOn = v;
                laya.media.SoundManager.muted = !v;
                //let volueme= v?1:0;
                //laya.media.SoundManager.setMusicVolume(volueme);
            };
            /**播放背景声音 */
            SoundManager.prototype.playMusic = function (bt) {
                if (!bt) {
                    console.log("播放背景声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (BASE64Manager.isUseBase64) {
                        laya.media.SoundManager.playMusic(bt.base64Img);
                    }
                    else {
                        laya.media.SoundManager.playMusic(bt.id);
                    }
                }
            };
            /**播放声音 */
            SoundManager.prototype.playSound = function (bt) {
                if (!bt) {
                    console.log("播放声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (BASE64Manager.isUseBase64) {
                        laya.media.SoundManager.playSound(bt.base64Img);
                    }
                    else {
                        laya.media.SoundManager.playSound(bt.id);
                    }
                }
            };
            /**终止声音 */
            SoundManager.prototype.stopSound = function (soundName) {
                laya.media.SoundManager.stopSound(game.Define.CDN + soundName);
            };
            return SoundManager;
        }());
        common.SoundManager = SoundManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-04-16 andy
            场景管理
        */
        var SceneManager = /** @class */ (function () {
            function SceneManager() {
                this.lastScreenMode = -1;
                this.lastClientWidth = -1;
                if (SceneManager._ins != null)
                    throw new Error("SceneManager is single!");
                this.imgDefault = new Laya.Image();
                common.LayerManager.ins.addChild(this.imgDefault, common.LayerName.scene_map);
            }
            Object.defineProperty(SceneManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SceneManager._ins = new SceneManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            SceneManager.prototype.init = function () {
                this.arrMap = [];
                KingManager.ins.init();
                BoneManager.ins.init();
                Laya.stage.on(Laya.Event.FOCUS, this, this.onFocus);
                Laya.stage.on(Laya.Event.BLUR, this, this.onBlur);
                Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
                this.initStage();
            };
            //场景初始化
            SceneManager.prototype.initStage = function () {
                var _this = this;
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SCREEN_HORIZONTAL_ONSIZE);
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_HORIZONTAL, this, this.SCREEN_HORIZONTAL);
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_VERTICAL, this, this.SCREEN_VERTICAL);
                //stage横竖屏
                Laya.stage.screenMode = Stage.SCREEN_NONE; //默认
                //Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;//横屏
                //Laya.stage.screenMode = Stage.SCREEN_VERTICAL;//竖屏
                //stage缩放适配
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;//stage等于屏幕宽高，不会有滚动条
                //Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;//stage等于设计宽高，可能会有滚动条
                //Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;//铺满全屏
                //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;//最小缩放比显示完整，两边可能会有空白
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//固定宽度 
                //手机和平板之前切换处理
                Laya.timer.frameLoop(1, this, function () {
                    if (_this.lastClientWidth != Laya.Browser.clientWidth) {
                        if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                            console.log("横屏", _this.lastClientWidth);
                            if (Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || _this.lastClientWidth == -1) {
                                common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_HORIZONTAL);
                                Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                            }
                        }
                        else {
                            console.log("竖屏", _this.lastClientWidth);
                            if (Laya.stage.scaleMode != Laya.Stage.SCALE_EXACTFIT || _this.lastClientWidth == -1) {
                                Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
                                common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_VERTICAL);
                            }
                        }
                        _this.lastClientWidth = Laya.Browser.clientWidth;
                        //console.log("this.lastClientWidth",this.lastClientWidth,Laya.Browser.clientHeight);
                        //console.log("Render.canvas.width",Render.canvas.width,Render.canvas.height);
                    }
                });
            };
            SceneManager.prototype.onResize = function () {
                if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                    //console.log("onResize 横屏");
                    common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE);
                }
                else {
                    //console.log("onResize 竖屏");
                    common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE);
                }
                //MatterManager.ins.onResize();
                //Laya.stage.mouseX获取的是在state的坐标 所有你要Laya.stage.clientScaleX *Laya.stage.mouseX或者用Laya.MouseManager.instance.mouseX
            };
            SceneManager.prototype.onFocus = function (e) {
                console.log("获得焦点");
                common.EventManager.ins.event(common.NoticeEvent.SYS_FOCUS, e);
            };
            SceneManager.prototype.onBlur = function (e) {
                console.log("失去焦点");
                common.EventManager.ins.event(common.NoticeEvent.SYS_BLUR, e);
            };
            //-------横竖屏自定义事件-------
            //横屏
            SceneManager.prototype.SCREEN_HORIZONTAL = function () {
                var div = document.getElementById("h_div");
                if (div) {
                    div.style.display = "";
                }
            };
            //竖屏
            SceneManager.prototype.SCREEN_VERTICAL = function () {
                var div = document.getElementById("h_div");
                if (div) {
                    div.style.display = "none";
                }
            };
            //横屏
            SceneManager.prototype.SCREEN_HORIZONTAL_ONSIZE = function () {
                if (Laya.stage.clientScaleX == 1)
                    return;
                var div = document.getElementById("h_div");
                if (!div) {
                    document.body.style.backgroundColor = BodyDiv.H_BODY_BACKGROUND_COLOR;
                    div = document.createElement("div");
                    div.id = "h_div";
                    div.style = "position:absolute;left:0px;bottom:100px;width:0px;height:100px;background-color:#ffffff;";
                    document.body.appendChild(div);
                    if (BodyDiv.H_BASE64_LOGO != "") {
                        var imgLogo = document.createElement("img");
                        imgLogo.src = BodyDiv.H_BASE64_LOGO;
                        div.appendChild(imgLogo);
                    }
                    if (BodyDiv.H_BASE64_DOWNLOAD != "") {
                        var imgDownload = document.createElement("img");
                        imgDownload.id = "btnDownLoad";
                        imgDownload.src = BodyDiv.H_BASE64_DOWNLOAD;
                        //imgDownload.width=imgDownload.width*Laya.stage.clientScaleX;
                        //imgDownload.height=imgDownload.height*Laya.stage.clientScaleX;
                        Laya.timer.once(50, this, function () {
                            imgDownload.style = "margin-left:" + (Laya.Browser.clientWidth - imgDownload.width) + "px;";
                        });
                        imgDownload.onclick = function () { HttpManager.ins.link(game.Define.DOWNLOAD_URL); };
                        div.appendChild(imgDownload);
                    }
                }
                else {
                    if (div) {
                        div.style.display = "";
                        var btnDownLoad = document.getElementById("btnDownLoad");
                        if (btnDownLoad) {
                            btnDownLoad.style = "margin-left:" + (Laya.Browser.clientWidth - btnDownLoad.width) + "px;";
                        }
                    }
                }
            };
            /**
             * 设置地图背景
             * @param url 图片路径
             * @param x
             * @param y
             * @param w
             * @param h
             */
            SceneManager.prototype.setBackground = function (url, x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                if (x > 0 || y > 0 || w > 0 || h > 0) {
                    var map = new Laya.Image();
                    map.x = x;
                    map.y = y;
                    map.width = w;
                    map.height = h;
                    BASE64Manager.ins.autoCheck(map, url);
                    common.LayerManager.ins.addChild(map, common.LayerName.scene_map);
                    this.arrMap.push(map);
                }
                else {
                    BASE64Manager.ins.autoCheck(this.imgDefault, url);
                }
            };
            /**
             * 删除场景所有地图
             */
            SceneManager.prototype.clearMapAll = function () {
                for (var _i = 0, _a = this.arrMap; _i < _a.length; _i++) {
                    var map = _a[_i];
                    map.removeSelf();
                }
            };
            return SceneManager;
        }());
        common.SceneManager = SceneManager;
        /**
         * 横屏时左右两边留有空白，填充数据
         */
        var BodyDiv = /** @class */ (function () {
            function BodyDiv() {
            }
            /**横屏时Logo图片Base64数据，不填写则不处理 */
            BodyDiv.H_BASE64_LOGO = "";
            /**横屏时下载按钮Base64数据，不填写则不处理 */
            BodyDiv.H_BASE64_DOWNLOAD = "";
            /**横屏时背景色 */
            BodyDiv.H_BODY_BACKGROUND_COLOR = "#ffffff";
            return BodyDiv;
        }());
        common.BodyDiv = BodyDiv;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        资源管理器
        */
        var ResManager = /** @class */ (function () {
            function ResManager() {
                if (ResManager._ins != null)
                    throw new Error("ResManager is single!");
            }
            Object.defineProperty(ResManager, "ins", {
                get: function () {
                    if (!this._ins)
                        ResManager._ins = new ResManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            ResManager.prototype.preload = function (arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            };
            ResManager.prototype.init = function (arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            };
            return ResManager;
        }());
        common.ResManager = ResManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-05 andy
        微信开放数据管理
        */
        var OpenManager = /** @class */ (function () {
            function OpenManager() {
                if (OpenManager._ins != null)
                    throw new Error("OpenManager is single!");
                OpenManager._ins = this;
                this.isDrawOpenView = false;
                this.wx = Laya.Browser.window.wx;
                this.init();
            }
            Object.defineProperty(OpenManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new OpenManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            OpenManager.prototype.init = function () {
                this.resizeStage();
            };
            //----------------------主域调用-----------------
            OpenManager.prototype.postMsg = function (cmd, data) {
                if (this.wx) {
                    var openDataContext = this.wx.getOpenDataContext();
                    openDataContext.postMessage({ cmd: cmd, data: data });
                }
            };
            OpenManager.prototype.resizeStage = function () {
                if (Laya.Browser.window.sharedCanvas) {
                    var scw = 663;
                    var sch = 726;
                    Laya.Browser.window.sharedCanvas.width = scw;
                    Laya.Browser.window.sharedCanvas.height = sch;
                    this.postMsg(common.NoticeEvent.ZY_RESIZE, { width: scw, height: sch, matrix: Laya.stage._canvasTransform });
                    this.initOpenView();
                }
            };
            OpenManager.prototype.setLogin = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Login,{openId:Global.roleData.openid,gameId:DEFINE.gameId,isGame1:DEFINE.isGame1,isGame2:DEFINE.isGame2,isGame3:DEFINE.isGame3,cdn:DEFINE.cdn});
            };
            OpenManager.prototype.setShareTicket = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_ShareTicket,DEFINE.shareTicket);
            };
            OpenManager.prototype.updateScore = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Score,{score:Math.floor(Global.roleData.runDistance)});
            };
            OpenManager.prototype.showRankView = function (type) {
                this.postMsg(common.NoticeEvent.ZY_RANK, null);
            };
            OpenManager.prototype.showOverView = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Over,{score:Math.floor(Global.roleData.runDistance)});
            };
            OpenManager.prototype.showBeOverView = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_BeOver,null);
            };
            OpenManager.prototype.noticeUILoaded = function (data) {
                //Global.platform.postMsg(NoticeEvent.Zy_UILoaded,data);
            };
            /**
             * name
             */
            OpenManager.prototype.initOpenView = function () {
                if (Laya.Browser.window.sharedCanvas) {
                    this.openSp = new Laya.Sprite();
                    this.openSp.on(Laya.Event.REMOVED, this, this.onRemoveOpenSp);
                    this.openSp.pos(0, 0);
                    // Laya.timer.loop(5000,this,this.drawOpenView);
                    // this.drawOpenView();
                }
            };
            OpenManager.prototype.onRemoveOpenSp = function () {
                this.isDrawOpenView = false;
            };
            OpenManager.prototype.changeOpenParent = function (parent, x, y) {
                if (!Laya.Browser.window.sharedCanvas) {
                    return;
                }
                this.isDrawOpenView = false;
                this.openSp.removeSelf();
                this.openSp.pos(x, y);
                if (parent) {
                    Laya.timer.once(1500, this, this.delayAddOpenSp, [parent]);
                }
            };
            OpenManager.prototype.updateOpenView = function () {
                Laya.timer.once(2000, this, this.drawOpenView);
            };
            OpenManager.prototype.delayAddOpenSp = function (parent) {
                parent.addChild(this.openSp);
                this.isDrawOpenView = true;
                this.drawOpenView();
                this.updateOpenView();
            };
            OpenManager.prototype.drawOpenView = function () {
                if (this.isDrawOpenView) {
                    this.openSp.graphics.clear();
                    if (this.openTex)
                        this.openTex.destroy();
                    this.openTex = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                    // this.openTex.bitmap.alwaysChange = true;//小程序使用，非常费，这个参数可以根据自己的需求适当调整，如果内容不变可以不用设置成true
                    this.openSp.graphics.drawTexture(this.openTex, 0, 0, this.openTex.width, this.openTex.height);
                    // this.openTex.bitmap.reloadCanvasData();
                }
            };
            return OpenManager;
        }());
        common.OpenManager = OpenManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        *2019-05-05 andy
        Matter 2D物理引擎管理类
        */
        var MatterManager = /** @class */ (function () {
            function MatterManager() {
                this.Matter = Laya.Browser.window.Matter;
                this.LayaRender = Laya.Browser.window.LayaRender;
                if (MatterManager._ins != null)
                    throw new Error("MatterManager is single!");
            }
            Object.defineProperty(MatterManager, "ins", {
                get: function () {
                    if (!this._ins)
                        MatterManager._ins = new MatterManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MatterManager.prototype, "mouseConstraint", {
                /**
                 * 获得Matter.MouseConstraint
                 */
                get: function () {
                    return this._mouseConstraint;
                },
                enumerable: true,
                configurable: true
            });
            MatterManager.prototype.init = function () {
                // 初始化物理引擎 enableSleeping: true睡眠模式
                this.engine = Matter.Engine.create({ enableSleeping: true });
                Matter.Engine.run(this.engine);
                //采用Laya渲染
                this.gameWorld = new Sprite();
                Laya.stage.addChild(this.gameWorld);
                this.render = this.LayaRender.create({ engine: this.engine, container: this.gameWorld.stage, width: game.Define.DeviceW, height: game.Define.DeviceH, options: { background: 'res/physics/img/background.png', wireframes: false } });
                this.LayaRender.run(this.render);
                //鼠标控制
                this.initMouse();
            };
            MatterManager.prototype.initMouse = function () {
                this._mouseConstraint = Matter.MouseConstraint.create(this.engine, { constraint: { id: 0, render: this.render } });
                this.addWord(this._mouseConstraint);
                this.render.mouse = this._mouseConstraint.mouse;
                // if (!this.mouseConstraint) {
                //     if (this.engine && this.engine.render && this.engine.render.canvas) {
                //         this.mouseConstraint = Matter.MouseConstraint.create(this.engine.render.canvas);
                //     } else if (options && options.element) {
                //         mouse = Mouse.create(options.element);
                //     } else {
                //         mouse = Mouse.create();
                //         Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
                //     }
                // }
            };
            /**
             * 添加到世界
             * @param arr
             */
            MatterManager.prototype.addWord = function (body) {
                if (!this.engine) {
                    console.error("Matter engine 未初始化！");
                    return;
                }
                Matter.World.add(this.engine.world, body);
            };
            /**
             * 引擎注册事件
             * @param eventName
             * @param callBack
             */
            MatterManager.prototype.regEvent = function (eventName, callBack) {
                Matter.Events.on(this.engine, eventName, callBack);
            };
            /**
             * 场景尺寸发生改变
             */
            MatterManager.prototype.onResize = function () {
                if (!this.engine) {
                    return;
                }
                // 设置鼠标的坐标缩放
                // Laya.stage.clientScaleX代表舞台缩放
                // Laya.stage._canvasTransform代表画布缩放
                Matter.Mouse.setScale(this._mouseConstraint.mouse, { x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d) });
            };
            return MatterManager;
        }());
        common.MatterManager = MatterManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-04-07 andy
            层级管理
        */
        var LayerManager = /** @class */ (function () {
            function LayerManager() {
                if (LayerManager._ins != null)
                    throw new Error("LayerManager is single!");
            }
            Object.defineProperty(LayerManager, "ins", {
                get: function () {
                    if (!this._ins)
                        LayerManager._ins = new LayerManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            LayerManager.prototype.init = function () {
                game.Global.uiRoot = new Laya.Sprite();
                Laya.stage.addChild(game.Global.uiRoot);
                // //初始化层级
                this.dicLayer = new laya.utils.Dictionary();
                this.dicLayer.set(LayerName.scene, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.main, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.window, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.top, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.scene_map, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.set(LayerName.scene_king, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
            };
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.addChild = function (child, layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot.addChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).addChild(child);
                }
            };
            /**
             * 删除显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.removeChild = function (child, layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot.removeChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).removeChild(child);
                }
            };
            /**
             * 删除某层的全部对象
             * @param layerNum
             */
            LayerManager.prototype.removeLayerAllChild = function (layerNum) {
                if (layerNum == LayerName.root) {
                    game.Global.uiRoot.removeChildren(4);
                }
                else {
                    this.dicLayer.get(layerNum).removeChildren();
                }
            };
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.getLayer = function (layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot;
                }
                else {
                    return this.dicLayer.get(layerNum);
                }
            };
            return LayerManager;
        }());
        common.LayerManager = LayerManager;
        var LayerName;
        (function (LayerName) {
            LayerName[LayerName["root"] = 0] = "root";
            LayerName[LayerName["scene"] = 1] = "scene";
            LayerName[LayerName["scene_map"] = 2] = "scene_map";
            LayerName[LayerName["scene_king"] = 3] = "scene_king";
            LayerName[LayerName["main"] = 4] = "main";
            LayerName[LayerName["window"] = 5] = "window";
            LayerName[LayerName["top"] = 6] = "top";
        })(LayerName = common.LayerName || (common.LayerName = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var base64;
    (function (base64) {
        /*
        * 2019-04-28 andy
        BASE64图集管理器
        */
        var Base64Manager = /** @class */ (function () {
            function Base64Manager() {
                this.atlasDir = "atlas/";
                this.loadIndex = 0;
                if (Base64Manager._ins != null)
                    throw new Error("Base64Manager is single!");
                this.arrLoadAtlas = [];
            }
            Object.defineProperty(Base64Manager, "ins", {
                get: function () {
                    if (!this._ins)
                        Base64Manager._ins = new Base64Manager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            Base64Manager.prototype.init = function () {
            };
            /**
             * 加载BASE64图集
             * @param arrAtlas 图集数组
             * @param callBack
             * @param progress
             */
            Base64Manager.prototype.loadAtlas = function (arrAtlas, callBack, progress) {
                if (!arrAtlas || arrAtlas.length == 0) {
                    if (callBack) {
                        callBack.run();
                    }
                    return;
                }
                console.log("开始加载BASE64图集....共计：" + arrAtlas.length);
                this.arrLoadAtlas = arrAtlas;
                this.callBack = callBack;
                this.progress = progress;
                this.loadIndex = 0;
                this.parseAtlasNext();
            };
            Base64Manager.prototype.parseAtlasNext = function () {
                if (this.progress) {
                    this.progress.runWith({ data: this.loadIndex / this.arrLoadAtlas.length });
                }
                if (this.loadIndex >= this.arrLoadAtlas.length) {
                    if (this.callBack) {
                        this.callBack.run();
                    }
                    return;
                }
                this.parseAtlas(this.arrLoadAtlas[this.loadIndex]);
                this.loadIndex++;
            };
            /**
             * 解析BASE64图集
             * @param base64Type
             */
            Base64Manager.prototype.parseAtlas = function (base64Type) {
                var _this = this;
                //base64解密获得json字符串
                var jsonStr = window.atob(base64Type.base64Json);
                //console.log("jsonStr",jsonStr);
                //将json字符串转成json对象
                var json = JSON.parse(jsonStr);
                //"meta":{"image":"frame.png,frame1.png","prefix":"frame/"}
                var atlasName = json.meta.prefix;
                //console.log("atlasName:",atlasName);
                //切图
                var imgBig = new Laya.Image();
                imgBig.skin = base64Type.base64Img;
                imgBig.loadImage(base64Type.base64Img, 0, 0, 0, 0, Laya.Handler.create(this, function () {
                    //"wait_4.png":{"frame":{"h":400,"idx":0,"w":300,"x":602,"y":1604},"sourceSize":{"h":400,"w":300},"spriteSourceSize":{"x":0,"y":0}}
                    var frame = null;
                    for (var key in json.frames) {
                        frame = json.frames[key].frame;
                        //console.log("key",key,"value",JSON.stringify(json.frames[key]));
                        var texture = Laya.Texture.create(imgBig.source, frame.x, frame.y, frame.w, frame.h);
                        //缓存到LAYA资源管理
                        Laya.Loader.cacheRes(atlasName + key, texture);
                    }
                    _this.parseAtlasNext();
                }));
            };
            /**
             * 自动检测图片
             * @param img
             * @param skinName 图集图片，传入此值，img.skin不需要赋值
             * @param base64Type 不是图集的图片，需要传入此值
             */
            Base64Manager.prototype.autoCheck = function (img, base64Type) {
                if (!img) {
                    console.error("参数为空");
                    return;
                }
                // if(img instanceof Laya.Image || img instanceof Laya.ProgressBar || img instanceof Laya.Button){
                //     //console.log("img",img);
                // }else{
                //     console.error("不是有效的Laya.Image 或者 Laya.ScrollBar 或者 Laya.Button");
                //     return;
                // }
                if (BASE64Manager.isUseBase64) {
                    if (base64Type) {
                        img.skin = base64Type.base64Img;
                    }
                    else {
                    }
                }
                else {
                    if (base64Type) {
                        img.skin = game.Define.CDN + "/" + this.atlasDir + base64Type.id;
                    }
                    else {
                    }
                }
            };
            /**是否使用BASE64图片 */
            Base64Manager.isUseBase64 = false;
            return Base64Manager;
        }());
        base64.Base64Manager = Base64Manager;
        /*
        * 2019-04-28 andy
        BASE64 图片类型
        */
        var Base64Type = /** @class */ (function () {
            function Base64Type(id, base64Img, base64Json) {
                if (base64Json === void 0) { base64Json = ""; }
                this.id = id;
                this.base64Img = base64Img;
                this.base64Json = base64Json;
            }
            return Base64Type;
        }());
        base64.Base64Type = Base64Type;
    })(base64 = game.base64 || (game.base64 = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-01 andy
        事件分发器
        */
        var EventManager = /** @class */ (function (_super) {
            __extends(EventManager, _super);
            function EventManager() {
                var _this = _super.call(this) || this;
                if (EventManager._ins != null)
                    throw new Error("EventManager is single!");
                return _this;
            }
            Object.defineProperty(EventManager, "ins", {
                get: function () {
                    if (!this._ins)
                        EventManager._ins = new EventManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            EventManager.prototype.init = function () {
            };
            EventManager.prototype.event = function (type, data) {
                _super.prototype.on;
                return _super.prototype.event.call(this, type, new NoticeEvent(type, data));
            };
            return EventManager;
        }(Laya.EventDispatcher));
        common.EventManager = EventManager;
        var NoticeEvent = /** @class */ (function () {
            function NoticeEvent(type, data) {
                this.type = type;
                this.data = data;
            }
            /**平台初始化完成 */
            NoticeEvent.PLATFORM_INIT_OVER = "PLATFORM_INIT_OVER";
            /**平台登录成功 */
            NoticeEvent.PLATFORM_LOGIN_SUCCESS = "PLATFORM_LOGIN_SUCCESS";
            /**平台登录失败 */
            NoticeEvent.PLATFORM_LOGIN_FAIL = "PLATFORM_LOGIN_FAIL";
            /**http请求进度 */
            NoticeEvent.HTTP_PROGRESS = "HTTP_PROGRESS";
            /**触摸方向事件 */
            NoticeEvent.TOUCH_DIRECTOR = "TOUCH_DIRECTOR";
            /**获得焦点事件 */
            NoticeEvent.SYS_FOCUS = "SYS_FOCUS";
            /**失去焦点事件 */
            NoticeEvent.SYS_BLUR = "SYS_BLUR";
            /**竖屏事件 */
            NoticeEvent.SYS_SCREEN_VERTICAL = "SYS_SCREEN_VERTICAL";
            /**横屏事件 */
            NoticeEvent.SYS_SCREEN_HORIZONTAL = "SYS_SCREEN_HORIZONTAL";
            /**竖屏事件,引擎已经执行完毕 */
            NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE = "SYS_SCREEN_VERTICAL_ONSIZE";
            /**横屏事件,引擎已经执行完毕 */
            NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE = "SYS_SCREEN_HORIZONTAL_ONSIZE";
            /**图片转文字 */
            NoticeEvent.AI_IMAGE_TO_WORD = "AI_IMAGE_TO_WORD";
            //子域
            /**尺寸发生变化 */
            NoticeEvent.ZY_RESIZE = "ZY_RESIZE";
            /**登录成功 */
            NoticeEvent.ZY_LOGIN = "ZY_LOGIN";
            /**显示排行 */
            NoticeEvent.ZY_RANK = "ZY_RANK";
            /**上报分数 */
            NoticeEvent.ZY_SCORE = "ZY_SCORE";
            return NoticeEvent;
        }());
        common.NoticeEvent = NoticeEvent;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 2019-04-21 andy
         * 骨骼基类
         */
        var BaseBone = /** @class */ (function (_super) {
            __extends(BaseBone, _super);
            function BaseBone(objId, type, sk) {
                var _this = _super.call(this) || this;
                /**唯一标识ID */
                _this._objId = 0;
                /**随机序列ID */
                _this._randIndex = 0;
                /**角色类型  */
                _this.kingType = "boy";
                /**当前运动速度 */
                _this.speed = 1;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                _this.kingType = type;
                _this._objId = objId;
                _this._sk = sk;
                _this.on(Laya.Event.ADDED, _this, _this.onAdd);
                return _this;
            }
            BaseBone.prototype.onAdd = function (e) {
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.init();
            };
            /**
             * 需在子类设置
             */
            BaseBone.prototype.init = function () {
                this.isLoad = true;
                this.addChild(this._sk);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                //this.on(Laya.Event.STOPPED, this, this.completeHandler);
                this.x = 400;
                this.y = 650;
                this.scale(0.3, 0.3);
                this._sk.play(0, true);
            };
            Object.defineProperty(BaseBone.prototype, "objId", {
                /**
                 * 唯一标识ID
                 */
                get: function () {
                    return this._objId;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 按顺序播放动作类型
             */
            BaseBone.prototype.playRand = function () {
                if (this.isLoad) {
                    if (this._randIndex >= this._sk.getAnimNum()) {
                        this._randIndex = 0;
                    }
                    this._sk.play(this._randIndex++, true);
                }
            };
            /**
             * 设置动作类型
             * @param at 动作类型
             */
            BaseBone.prototype.setActionType = function (at) {
                this.curAticonType = at;
                if (this.isLoad) {
                    if (at < this._sk.getAnimNum()) {
                        this._sk.play(at, true);
                    }
                }
            };
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            BaseBone.prototype.setActionState = function (as) {
                this.curAticonState = as;
            };
            /**
             * update
             */
            BaseBone.prototype.update = function () {
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseBone.prototype.onLabel = function (ev) {
                console.log("complte " + ev);
            };
            BaseBone.prototype.onRemoved = function (e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.isLoad = false;
            };
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * aniName  动作的名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            BaseBone.prototype.aniUrls = function (aniName, length) {
                var urls = [];
                for (var i = 0; i < length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(this.kingType + "/" + this.kingType + "_" + aniName + "_" + i + ".png");
                }
                return urls;
            };
            return BaseBone;
        }(Laya.Sprite));
        king.BaseBone = BaseBone;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 人物基类
         */
        var BaseKing = /** @class */ (function (_super) {
            __extends(BaseKing, _super);
            function BaseKing() {
                var _this = _super.call(this) || this;
                /**当前运动速度 */
                _this.speed = 1;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                return _this;
            }
            /**
             * 需在子类设置
             */
            BaseKing.prototype.init = function () {
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
            };
            /**
             * 设置皮肤
             * @param skinData 皮肤数据
             * @param isAdd    是否显示,默认是true
             */
            BaseKing.prototype.setSkin = function (skinData, isAdd) {
                if (isAdd === void 0) { isAdd = true; }
                if (skinData) {
                    this.skinData = skinData;
                }
                else {
                    console.log("this.skinData is null!");
                }
                //Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
                if (this.skinData.arrAction && this.skinData.arrAction.length > 0) {
                    //创建零散动画【适合小游戏】
                    var action = void 0;
                    for (var i = 0; i < this.skinData.arrAction.length; i++) {
                        action = this.skinData.arrAction[i];
                        Laya.Animation.createFrames(this.aniUrls(action.actionType.toString(), action.frameCount), this.skinData.kingType + "_" + action.actionType);
                    }
                }
                else {
                    //创建动画模板
                    for (var i = 0; i < this.skinData.cutRow; i++) {
                        Laya.Animation.createFrames(this.aniUrls(i.toString(), this.skinData.cutCol), this.skinData.kingType + "_" + i);
                    }
                }
                this.isLoad = true;
                this.setActionType(this.curAticonType);
                if (isAdd) {
                    king.KingManager.ins.addKing(this);
                }
                //}));
            };
            /**
             * 设置动作类型
             * @param at 动作类型
             */
            BaseKing.prototype.setActionType = function (at) {
                this.curAticonType = at;
                if (this.isLoad) {
                    if (at != undefined && at >= 0) {
                        this.play(0, true, this.skinData.kingType + "_" + at);
                    }
                }
            };
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            BaseKing.prototype.setActionState = function (as) {
                this.curAticonState = as;
            };
            /**
             * update
             */
            BaseKing.prototype.update = function () {
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseKing.prototype.onLabel = function (ev) {
                console.log("complte " + ev);
            };
            BaseKing.prototype.onRemoved = function (e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.isLoad = false;
            };
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * actionName  动作的名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            BaseKing.prototype.aniUrls = function (actionName, length) {
                var urls = [];
                for (var i = 0; i < length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(this.skinData.atlasName + "/" + this.skinData.kingType + "_" + actionName + "_" + i + ".png");
                }
                return urls;
            };
            return BaseKing;
        }(Laya.Animation));
        king.BaseKing = BaseKing;
        /**
         * 动作数据
         */
        var Action = /** @class */ (function () {
            /**
             *
             * @param actionType 动作类型
             * @param frameCount 动作帧数
             */
            function Action(actionType, frameCount) {
                this.actionType = actionType;
                this.frameCount = frameCount;
            }
            return Action;
        }());
        king.Action = Action;
        /**
         * 皮肤数据
         */
        var SkinData = /** @class */ (function () {
            function SkinData(atlasName, kingType, arrAction, cutRow, cutCol) {
                if (cutRow === void 0) { cutRow = 0; }
                if (cutCol === void 0) { cutCol = 0; }
                /**图集名字 */
                this.atlasName = "";
                /**角色类型 */
                this.kingType = "";
                /**图集动画行数 */
                this.cutRow = 1;
                /**图集动画列数 */
                this.cutCol = 1;
                this.atlasName = atlasName;
                this.kingType = kingType;
                this.cutRow = cutRow;
                this.cutCol = cutCol;
                this.arrAction = arrAction;
            }
            return SkinData;
        }());
        king.SkinData = SkinData;
        /*
        * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
        */
        var ActionType;
        (function (ActionType) {
            /**0 待机 */
            ActionType[ActionType["Wait"] = 0] = "Wait";
            /**1 左移 */
            ActionType[ActionType["Left"] = 1] = "Left";
            /**2 右移 */
            ActionType[ActionType["Right"] = 2] = "Right";
            /**3 上移 */
            ActionType[ActionType["Up"] = 3] = "Up";
            /**4 下移 */
            ActionType[ActionType["Down"] = 4] = "Down";
            /**5 左上移 */
            ActionType[ActionType["Left_up"] = 5] = "Left_up";
            /**6 左下移 */
            ActionType[ActionType["Left_down"] = 6] = "Left_down";
            /**7 右上移 */
            ActionType[ActionType["Right_up"] = 7] = "Right_up";
            /**8 右下移 */
            ActionType[ActionType["Right_down"] = 8] = "Right_down";
            /**9 跳跃 */
            ActionType[ActionType["JUMP"] = 9] = "JUMP";
            /**10 攻击 */
            ActionType[ActionType["ATTACK"] = 10] = "ATTACK";
            /**11 被攻击 */
            ActionType[ActionType["ATTACKED"] = 11] = "ATTACKED";
            /**12 死亡 */
            ActionType[ActionType["DEAD"] = 12] = "DEAD";
        })(ActionType = king.ActionType || (king.ActionType = {}));
        /*
       * 动作状态;
       */
        var ActionState;
        (function (ActionState) {
            ActionState[ActionState["NONE"] = 0] = "NONE";
            ActionState[ActionState["MOVE"] = 1] = "MOVE";
            ActionState[ActionState["ATTACK"] = 2] = "ATTACK";
            ActionState[ActionState["JUMP"] = 3] = "JUMP";
        })(ActionState = king.ActionState || (king.ActionState = {}));
    })(king = game.king || (game.king = {}));
})(game || (game = {}));

var game;
(function (game) {
    var platform;
    (function (platform_1) {
        /*
        * 2019-03-06 andy
        平台管理
        */
        var PlatformManager = /** @class */ (function () {
            function PlatformManager() {
                if (PlatformManager._ins != null)
                    throw new Error("PlatformManager is single!");
                PlatformManager._ins = this;
            }
            Object.defineProperty(PlatformManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new PlatformManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            /**先初始化平台 */
            PlatformManager.prototype.init = function (data) {
                //初始化平台
                var platform;
                PlatformManager.mraid = Laya.Browser.window.mraid;
                if (Laya.Browser.window.wx) {
                    platform = PlatformManager.wxPlatform = new platform_1.WxPlatform();
                }
                else if (Laya.Browser.window.FBInstant) {
                    platform = PlatformManager.fbPlatform = new platform_1.FaceBookPlatform();
                }
                else if (Laya.Browser.window.applovin) {
                    platform = PlatformManager.alPlatform = new platform_1.ApplovinPlatform();
                }
                else if (Laya.Browser.window.ironsource) {
                    platform = PlatformManager.isPlatform = new platform_1.IronSourcePlatform();
                }
                else if (Laya.Browser.window.mtg) {
                    platform = PlatformManager.mtgPlatform = new platform_1.MTGPlatform();
                }
                else {
                    console.log("默认平台，请注意检查平台是否设置 window.applovin 或 window.ironsource");
                    platform = new platform_1.LocalPlatform();
                }
                game.Global.platform = platform;
                game.Global.platform.init(data);
            };
            Object.defineProperty(PlatformManager.prototype, "HttpConfig", {
                /**获取游戏配置 */
                get: function () {
                    return {}; //PlatformAPI.getConfig();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlatformManager, "wx", {
                get: function () {
                    return Laya.Browser.window.wx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlatformManager, "window", {
                get: function () {
                    return Laya.Browser.window;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlatformManager, "fileSysMgr", {
                get: function () {
                    if (!this.wx)
                        return null;
                    return this.wx.getFileSystemManager();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 平台动作，暂时只有MTG调用
             * @param pa PlatformAction
             * @param para 参数
             */
            PlatformManager.prototype.actionCallBack = function (pa, para) {
                if (para === void 0) { para = null; }
                if (game.Global.platformId == PlatformID.mtg) {
                    switch (pa) {
                        case PlatformAction.DownLoad:
                            if (Laya.Browser.window.install) {
                                console.log("调用 window.install");
                                Laya.Browser.window.install();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.install!");
                            }
                            break;
                        case PlatformAction.GameStart:
                            console.log("MTG 主动调用gameStart！");
                            break;
                        case PlatformAction.GameReady:
                            if (Laya.Browser.window.gameReady) {
                                console.log("调用 window.gameReady");
                                Laya.Browser.window.gameReady();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.gameReady!");
                            }
                            break;
                        case PlatformAction.GameEnd:
                            if (Laya.Browser.window.gameEnd) {
                                console.log("调用 window.gameEnd");
                                Laya.Browser.window.gameEnd();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.gameEnd!");
                            }
                            break;
                        case PlatformAction.GameClose:
                            console.log("MTG 主动调用gameClose！");
                            break;
                    }
                }
            };
            return PlatformManager;
        }());
        platform_1.PlatformManager = PlatformManager;
        var PlatformID;
        (function (PlatformID) {
            PlatformID[PlatformID["None"] = 0] = "None";
            /**微信 */
            PlatformID[PlatformID["Wx"] = 1] = "Wx";
            /**FaceBook */
            PlatformID[PlatformID["Fb"] = 2] = "Fb";
            /**APPLovin */
            PlatformID[PlatformID["Al"] = 3] = "Al";
            /**IronSource */
            PlatformID[PlatformID["Is"] = 4] = "Is";
            /**MTG */
            PlatformID[PlatformID["mtg"] = 5] = "mtg";
        })(PlatformID = platform_1.PlatformID || (platform_1.PlatformID = {}));
        var PlatformAction;
        (function (PlatformAction) {
            PlatformAction[PlatformAction["None"] = 0] = "None";
            /**下载 主动*/
            PlatformAction[PlatformAction["DownLoad"] = 1] = "DownLoad";
            /**GameEnd 主动必须*/
            PlatformAction[PlatformAction["GameEnd"] = 2] = "GameEnd";
            /**GameReady 主动*/
            PlatformAction[PlatformAction["GameReady"] = 3] = "GameReady";
            /**GameStart 被动调用*/
            PlatformAction[PlatformAction["GameStart"] = 4] = "GameStart";
            /**GameClose 被动调用*/
            PlatformAction[PlatformAction["GameClose"] = 5] = "GameClose";
        })(PlatformAction = platform_1.PlatformAction || (platform_1.PlatformAction = {}));
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        /*
        * name;
        */
        var LocalPlatform = /** @class */ (function () {
            function LocalPlatform() {
                this.window = platform.PlatformManager.window;
                this.fileSysMgr = platform.PlatformManager.fileSysMgr;
                game.Global.platformId = platform.PlatformID.None;
                game.Define.langId = "zh";
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                game.Define.isLocal = true;
                //2018-12-13 在进入游戏前，需要提前准备的东西
                EventManager.ins.init();
            }
            LocalPlatform.prototype.init = function (data) {
                if (data) {
                    this.getRandomShareFunc = data.getRandomShare;
                    this.isCanPlayVideoFunc = data.sCanPlayVideo;
                    this.getAdDataFunc = data.getAdData;
                    this.getAdVideoDataFunc = data.getAdVideoData;
                    console.log("平台初始化：" + data.getRandomShare);
                }
                if (game.Global.platformId == platform.PlatformID.None) {
                    EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                }
            };
            LocalPlatform.prototype.initSkinGame = function () {
                // if(Define.isDebug){
                //     Define.cdn = "../res/";
                // }else{
                //     Define.cdn = "res/";
                // }
            };
            LocalPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            LocalPlatform.prototype.loginSuccess = function () {
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            LocalPlatform.prototype.getUserInfo = function () {
                return this.userInfo;
            };
            LocalPlatform.prototype.initItem = function () {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.saveItem = function (ID, count, type) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.scoreUp = function (rank, score) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.share = function (func, queryKey) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.createBannerAd = function (posKey) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.showBannerAd = function (isShow) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.destroyBannerAd = function () {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.createVideoAd = function (posKey, success) {
                console.log("创建广告：" + posKey);
            };
            LocalPlatform.prototype.addMoreGameBtn = function (parent) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.createBrandSprite = function (parent, x, y) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.postMsg = function (postName, obj) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.shake = function (isShort, delay) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.saveImageToPhotosAlbum = function (url) {
                console.log("保存图片接口没有实现");
            };
            LocalPlatform.prototype.setUserCloudStorage = function (key, value) {
                console.log("云端保存数据接口没有实现");
            };
            LocalPlatform.prototype.getLocalImage = function (type) {
                console.log("需要平台实现此功能");
            };
            /**获得焦点时，前台运行 */
            LocalPlatform.prototype.onShowCallBack = function (res) {
                console.log("小游戏获得焦点，进入前台运行");
                //SoundManager.ins.setOn(true);
            };
            /**失去焦点时，后台运行 */
            LocalPlatform.prototype.onHideCallBack = function () {
                console.log("小游戏失去焦点，进入后台运行");
                //SoundManager.ins.setOn(false);
                Laya.SoundManager.stopMusic();
            };
            return LocalPlatform;
        }());
        platform.LocalPlatform = LocalPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Applovin
        2019-05-01 andy
        */
        var ApplovinPlatform = /** @class */ (function (_super) {
            __extends(ApplovinPlatform, _super);
            function ApplovinPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Al;
                game.Define.langId = "en"; //PlatformAPI.getLocaleType();
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            ApplovinPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            ApplovinPlatform.prototype.initGameSkin = function () {
            };
            ApplovinPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            ApplovinPlatform.prototype.loginSuccess = function () {
                console.log("Applovin 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            ApplovinPlatform.prototype.getSwitchState = function () {
                return true;
            };
            ApplovinPlatform.prototype.initItem = function () {
            };
            ApplovinPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            ApplovinPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            ApplovinPlatform.prototype.firstUp = function () {
            };
            return ApplovinPlatform;
        }(platform.LocalPlatform));
        platform.ApplovinPlatform = ApplovinPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * facebook
        2018-12-08 andy
        */
        var FaceBookPlatform = /** @class */ (function (_super) {
            __extends(FaceBookPlatform, _super);
            function FaceBookPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Fb;
                game.Define.langId = "en"; //PlatformAPI.getLocaleType();
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            FaceBookPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
            };
            FaceBookPlatform.prototype.initGameSkin = function () {
            };
            FaceBookPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            FaceBookPlatform.prototype.loginSuccess = function () {
                console.log("FaceBook 登录成功！");
            };
            /**
             * 获取过审状态
             */
            FaceBookPlatform.prototype.getSwitchState = function () {
                return true;
            };
            FaceBookPlatform.prototype.initItem = function () {
            };
            FaceBookPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            FaceBookPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            FaceBookPlatform.prototype.firstUp = function () {
            };
            return FaceBookPlatform;
        }(platform.LocalPlatform));
        platform.FaceBookPlatform = FaceBookPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * IronSource 以色列投放广告平台
        2019-05-01 andy
        */
        var IronSourcePlatform = /** @class */ (function (_super) {
            __extends(IronSourcePlatform, _super);
            function IronSourcePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Is;
                game.Define.langId = "en"; //PlatformAPI.getLocaleType();
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            IronSourcePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            IronSourcePlatform.prototype.initGameSkin = function () {
            };
            IronSourcePlatform.prototype.login = function () {
                this.loginSuccess();
            };
            IronSourcePlatform.prototype.loginSuccess = function () {
                console.log("IronSource 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            IronSourcePlatform.prototype.getSwitchState = function () {
                return true;
            };
            IronSourcePlatform.prototype.initItem = function () {
            };
            IronSourcePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            IronSourcePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            IronSourcePlatform.prototype.firstUp = function () {
            };
            return IronSourcePlatform;
        }(platform.LocalPlatform));
        platform.IronSourcePlatform = IronSourcePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * MTG 国内平台 https://www.mintegral.com
        2019-05-16 andy
        */
        var MTGPlatform = /** @class */ (function (_super) {
            __extends(MTGPlatform, _super);
            function MTGPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.mtg;
                game.Define.langId = "en"; //PlatformAPI.getLocaleType();
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            MTGPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                Laya.Browser.window.gameStart = function () { platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart); };
            };
            MTGPlatform.prototype.initGameSkin = function () {
            };
            MTGPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            MTGPlatform.prototype.loginSuccess = function () {
                console.log("MTG 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            MTGPlatform.prototype.getSwitchState = function () {
                return true;
            };
            MTGPlatform.prototype.initItem = function () {
            };
            MTGPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            MTGPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            MTGPlatform.prototype.firstUp = function () {
            };
            return MTGPlatform;
        }(platform.LocalPlatform));
        platform.MTGPlatform = MTGPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
                game.Define.langId = "zh";
                game.Define.isLocal = false;
                game.Define.serverHttp = "http://192.168.2.104:3000/"; //
                //Define.CDN = "https://cdn.h5haowan.top/paoku3d/res"+Define.gameVersion+"/";
                _this.wx = Laya.Browser.window.wx;
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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var ui;
    (function (ui) {
        /**
         * 序列帧动画
         */
        var BaseFrame = /** @class */ (function (_super) {
            __extends(BaseFrame, _super);
            /**
             *
             * @param frameName
             * @param frameCount
             * @param isLoop
             * @param isAutoPlay
             * @param layer
             * @param atlasName
             * @param callBack
             */
            function BaseFrame(frameName, frameCount, isLoop, isAutoPlay, layer, atlasName, callBack) {
                if (isLoop === void 0) { isLoop = true; }
                if (isAutoPlay === void 0) { isAutoPlay = true; }
                if (layer === void 0) { layer = null; }
                if (atlasName === void 0) { atlasName = "frame"; }
                if (callBack === void 0) { callBack = null; }
                var _this = _super.call(this) || this;
                /**帧动画名字 */
                _this.frameName = "";
                /**序列动画帧数 */
                _this.frameCount = 1;
                /**是否循环播放 */
                _this.isLoop = false;
                /**是否加载后在动播放 */
                _this.isAutoPlay = false;
                /**是否加载后在动添加到场景 */
                _this.isAutoAdd = false;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                _this.frameName = frameName;
                _this.frameCount = frameCount;
                _this.isLoop = isLoop;
                _this.isAutoPlay = isAutoPlay;
                _this.layer = layer;
                _this.atlasName = atlasName;
                _this.callBack = callBack;
                _this.init();
                return _this;
            }
            /**
             * 需在子类设置
             */
            BaseFrame.prototype.init = function () {
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                this.on(Laya.Event.STOPPED, this, this.onStop);
            };
            /**
             * 加载动画图集
             */
            BaseFrame.prototype.setAtlas = function () {
                // if(BASE64Manager.isUseBase64){
                // 	this.loadFinish();
                // }else{
                // Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
                this.loadFinish();
                // }));
                // }        	
            };
            BaseFrame.prototype.loadFinish = function () {
                this.isLoad = true;
                //创建动画模板
                var arr = [];
                for (var i = 1; i <= this.frameCount; i++) {
                    arr.push(this.atlasName + "/" + this.frameName + "_" + i + ".png");
                }
                Laya.Animation.createFrames(arr, this.frameName);
                if (this.isAutoPlay) {
                    this.playFrame();
                }
                if (this.layer) {
                    ui.UIManager.ins.addFrameAnimation(this, this.layer);
                }
            };
            /**
             * 播放序列帧动画
             */
            BaseFrame.prototype.playFrame = function () {
                if (this.isLoad) {
                    this.play(0, this.isLoop, this.frameName);
                }
            };
            /**
             * 停止序列帧动画
             */
            BaseFrame.prototype.stopFrame = function () {
                this.stop();
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseFrame.prototype.onLabel = function (ev) {
                console.log("complte " + ev);
            };
            /**
             * 动画播放完回调函数
             * @param ev
             */
            BaseFrame.prototype.onStop = function (ev) {
                console.log("stoped " + ev);
                if (this.callBack) {
                    this.callBack.run();
                }
            };
            BaseFrame.prototype.onRemoved = function (e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                Laya.timer.clearAll(this);
                this.isLoad = false;
            };
            return BaseFrame;
        }(Laya.Animation));
        ui.BaseFrame = BaseFrame;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 窗体基类
        */
        var BaseWindow = /** @class */ (function (_super) {
            __extends(BaseWindow, _super);
            function BaseWindow(viewCls) {
                var _this = _super.call(this) || this;
                _this.uiType = null;
                _this.view = null;
                _this.view = new viewCls();
                _this.view.on(Laya.Event.ADDED, _this, _this.onAdd);
                _this.init();
                return _this;
            }
            /**执行一次 */
            BaseWindow.prototype.init = function () {
            };
            BaseWindow.prototype.onAdd = function (event) {
                this.view.on(Laya.Event.CLICK, this, this.mouseClick);
                this.view.on(Laya.Event.REMOVED, this, this.onClose);
                this.open();
            };
            BaseWindow.prototype.onClose = function (event) {
                this.view.off(Laya.Event.CLICK, this, this.mouseClick);
                this.close();
            };
            /**窗体是否打开 */
            BaseWindow.prototype.isOpen = function () {
                return this.view != null && this.view.parent != null;
            };
            /**窗体打开 */
            BaseWindow.prototype.open = function () {
            };
            BaseWindow.prototype.mouseClick = function (event) {
                var btn = event.target;
                if (btn instanceof Laya.Sprite) {
                    //按钮增加点击效果，view,list除外
                    if (btn.name == "" || btn instanceof BaseWindow || btn instanceof laya.ui.Box || btn instanceof laya.ui.ProgressBar
                        || btn instanceof laya.ui.ScrollBar || btn instanceof laya.ui.Slider || btn instanceof laya.ui.ComboBox) {
                    }
                    else {
                        laya.utils.Tween.from(btn, { scaleX: 0.8, scaleY: 0.8 }, 80);
                        //SoundManager.ins.playSound(Define.SOUND_BTN);
                        this.viewClick(btn);
                    }
                }
            };
            /**窗体点击事件 */
            BaseWindow.prototype.viewClick = function (sp) {
                var spName = sp.name;
                //console.log("点击按钮："+spName);
                switch (spName) {
                    case "btnClose":
                        ui.UIManager.ins.closeWindow(this.uiType);
                        break;
                    default:
                        break;
                }
            };
            /**窗体关闭 */
            BaseWindow.prototype.close = function () {
                //console.log("窗体已关闭");
            };
            return BaseWindow;
        }(ui.BaseUI));
        ui.BaseWindow = BaseWindow;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var game;
    (function (game) {
        var GameUI = /** @class */ (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                return _super.call(this) || this;
            }
            GameUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameUI.uiView);
            };
            GameUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "imgBg", "name": "imgBg" } }, { "type": "Button", "props": { "y": 17, "x": 19, "var": "btnBack", "stateNum": 1, "skin": "game/btn_fh.png", "name": "btnBack" } }, { "type": "Label", "props": { "y": 37, "x": 167, "width": 134, "var": "txtScoe", "text": "0", "name": "txtScoe", "height": 40, "fontSize": 40, "color": "#ffffff", "align": "left" } }, { "type": "Image", "props": { "y": 577, "width": 100, "var": "imgEfct", "name": "imgEfct", "height": 50, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }] };
            return GameUI;
        }(View));
        game.GameUI = GameUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameOverUI = /** @class */ (function (_super) {
            __extends(GameOverUI, _super);
            function GameOverUI() {
                return _super.call(this) || this;
            }
            GameOverUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameOverUI.uiView);
            };
            GameOverUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 434, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 438, "x": 628, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 437, "text": "游戏结束", "fontSize": 24, "color": "#ffffff", "centerX": 0 } }, { "type": "Button", "props": { "y": 665, "x": 158, "width": 177, "var": "btnAgin", "skin": "common/button.png", "name": "btnAgin", "labelSize": 40, "label": "再来一次", "height": 77 } }, { "type": "Button", "props": { "y": 661, "x": 388, "width": 177, "var": "btnMain", "skin": "common/button.png", "name": "btnMain", "labelSize": 40, "label": "返回主页", "height": 77 } }, { "type": "Label", "props": { "y": 531, "x": 207, "text": "本次得分", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 531, "x": 369, "width": 100, "var": "txtScore", "text": "0", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 576, "x": 207, "text": "最高得分", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 576, "x": 369, "width": 100, "var": "txtScoreMax", "text": "0", "fontSize": 24, "font": "SimSun", "color": "#000000" } }] };
            return GameOverUI;
        }(View));
        game.GameOverUI = GameOverUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        LoadingUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }, { "type": "Image", "props": { "y": 306, "width": 190, "var": "imgLogo", "name": "imgLogo", "height": 190, "centerX": 0 } }, { "type": "Text", "props": { "y": 1153, "x": 0, "wordWrap": true, "width": 736, "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", "leading": 15, "height": 93, "fontSize": 28, "font": "SimSun", "color": "#000000", "bold": false, "align": "left" } }, { "type": "ProgressBar", "props": { "y": 1004, "x": 74, "width": 500, "var": "bar", "height": 30 } }, { "type": "Label", "props": { "y": 520, "width": 341, "text": "乐帆游戏 快乐远行", "height": 54, "fontSize": 40, "font": "SimSun", "color": "#000000", "centerX": 0 } }] };
        return LoadingUI;
    }(View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var BagUI = /** @class */ (function (_super) {
            __extends(BagUI, _super);
            function BagUI() {
                return _super.call(this) || this;
            }
            BagUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.BagUI.uiView);
            };
            BagUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 434, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 439, "x": 576, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 437, "x": 340, "text": "背包", "fontSize": 24 } }] };
            return BagUI;
        }(View));
        main.BagUI = BagUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainUI = /** @class */ (function (_super) {
            __extends(MainUI, _super);
            function MainUI() {
                return _super.call(this) || this;
            }
            MainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainUI.uiView);
            };
            MainUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }, { "type": "Button", "props": { "y": 961, "x": 45, "width": 177, "var": "btnBag", "skin": "common/button.png", "name": "btnBag", "labelSize": 40, "label": "背包", "height": 77 } }, { "type": "Button", "props": { "y": 852, "x": 255, "width": 177, "var": "btnStart", "skin": "common/button.png", "name": "btnStart", "labelSize": 40, "label": "开始游戏", "height": 77 } }, { "type": "Button", "props": { "y": 963, "x": 257, "width": 177, "var": "btnShare", "skin": "common/button.png", "name": "btnShare", "labelSize": 40, "label": "分享", "height": 77 } }, { "type": "Button", "props": { "y": 961, "x": 482, "width": 177, "var": "btnRank", "skin": "common/button.png", "name": "btnRank", "labelSize": 40, "label": "排行榜", "height": 77 } }] };
            return MainUI;
        }(View));
        main.MainUI = MainUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var RankUI = /** @class */ (function (_super) {
            __extends(RankUI, _super);
            function RankUI() {
                return _super.call(this) || this;
            }
            RankUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.RankUI.uiView);
            };
            RankUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 234, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 700, "centerX": 0 } }, { "type": "Button", "props": { "y": 238, "x": 625, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 238, "x": 334, "text": "排行榜", "fontSize": 24, "color": "#000000" } }] };
            return RankUI;
        }(View));
        main.RankUI = RankUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));

var game;
(function (game) {
    var PlatformID = game.platform.PlatformID;
    /*
    * 2019-02-27 andy
    全局基类
    */
    var Global = /** @class */ (function () {
        function Global() {
        }
        /**平台ID */
        Global.platformId = PlatformID.None;
        return Global;
    }());
    game.Global = Global;
})(game || (game = {}));

console.log("game.core version: 2019-04-10 1.0.0");
//全局定义
var Define = game.Define;
var Global = game.Global;
//界面
var UIManager = game.ui.UIManager;
var BaseUI = game.ui.BaseUI;
var BaseWindow = game.ui.BaseWindow;
var UIType = game.ui.UIType;
var BaseFrame = game.ui.BaseFrame;
//工具
var MathUtil = game.util.MathUtil;
var PubUtil = game.util.PubUtil;
var Dictionary = game.util.Dictionary;
//通用
var EventManager = game.common.EventManager;
var NoticeEvent = game.common.NoticeEvent;
var ResManager = game.common.ResManager;
var SoundManager = game.common.SoundManager;
var TipManager = game.common.TipManager;
var OpenManager = game.common.OpenManager;
var LayerManager = game.common.LayerManager;
var LayerName = game.common.LayerName;
var SceneManager = game.common.SceneManager;
var BodyDiv = game.common.BodyDiv;
var TouchManager = game.common.TouchManager;
var SwipeDirection = game.common.SwipeDirection;
var TweenManager = game.common.TweenManager;
var TweenTarget = game.common.TweenTarget;
var TweenProp = game.common.TweenProp;
var TweenPropType = game.common.TweenPropType;
var MatterManager = game.common.MatterManager;
//精灵
var BaseKing = game.king.BaseKing;
var SkinData = game.king.SkinData;
var Action = game.king.Action;
var KingManager = game.king.KingManager;
var ActionType = game.king.ActionType;
var ActionState = game.king.ActionState;
var BaseBone = game.king.BaseBone;
var BoneManager = game.king.BoneManager;
var BoneType = game.king.BoneType;
//平台
var PlatformManager = game.platform.PlatformManager;
var PlatformID = game.platform.PlatformID;
var PlatformAction = game.platform.PlatformAction;
var LocalPlatform = game.platform.LocalPlatform;
var WxPlatform = game.platform.WxPlatform;
var FaceBookPlatform = game.platform.FaceBookPlatform;
var ApplovinPlatform = game.platform.ApplovinPlatform;
var IronSourcePlatform = game.platform.IronSourcePlatform;
var MTGPlatform = game.platform.MTGPlatform;
var NetManager = game.net.NetManager;
var SocketIoEvent = game.net.SocketIoEvent;
var HttpManager = game.net.HttpManager;
//BASE64
var BASE64Manager = game.base64.Base64Manager;
var Base64Type = game.base64.Base64Type;
//Laya核心类
var Stage = Laya.Stage;
var Render = Laya.Render;
var Sprite = Laya.Sprite;
var EventData = Laya.EventData;
var Skeleton = Laya.Skeleton;
var Templet = Laya.Templet;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var Stat = Laya.Stat;
var Tween = Laya.Tween;
var WebGL = Laya.WebGL;
