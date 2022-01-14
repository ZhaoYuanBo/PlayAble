var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-04-09 andy
        网络通讯管理
        */
        class NetManager {
            constructor() {
                if (NetManager._ins != null)
                    throw new Error("NetManager is single!");
                NetManager._ins = this;
                this._socketDataEvent = new Dictionary();
            }
            static get ins() {
                if (!this._ins)
                    new NetManager();
                return this._ins;
            }
            /**初始化 */
            init() {
                console.log("serverIP", game.Define.serverIP, "serverPort", game.Define.serverPort);
                this.socket = io.connect(game.Define.serverIP + ":" + game.Define.serverPort);
                // 当接收到消息并且不是本机时生成聊天气泡
                this.socket.on(SocketIoEvent.message, this, this.onMessageReveived);
                //连接成功
                this.socket.on(SocketIoEvent.connect, this, this.onSocketOpen);
                //连接断开
                this.socket.on(SocketIoEvent.disconnect, this, this.onSocketClose);
                //错误
                this.socket.on(SocketIoEvent.error, this, this.onConnectError);
            }
            onSocketOpen(e = null) {
                console.log("与服务器连接成功");
                EventManager.ins.event(SocketIoEvent.connect, e);
            }
            onSocketClose(e = null) {
                console.log("与服务器连接断开");
                EventManager.ins.event(SocketIoEvent.disconnect, e);
            }
            onMessageReveived(message = null) {
                console.log("收到服务端message");
                if (message) {
                    console.log(message);
                }
                else if (message) {
                    console.log(new Laya.Byte(message).readUTFBytes());
                }
                //this.socket.input.clear();
                EventManager.ins.event(SocketIoEvent.message, message);
            }
            onConnectError(e = null) {
                console.log("error");
                EventManager.ins.event(SocketIoEvent.error, e);
            }
            /**
             * 发送message
             * @param data
             * @param fn
             */
            send(data, fn) {
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                this.socket.send(data);
            }
            /**
             * 发送emit
             * @param eventName
             * @param args
             */
            emit(eventName, ...args) {
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                // this.socket.emit(eventName,args);
            }
            /**
             * 添加网络事件观察者
             * @param eventName
             * @param _callback
             */
            registerNetEvent(eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    this._socketDataEvent.get(eventName).push(_callback);
                }
                else {
                    this._socketDataEvent.add(eventName, [_callback]);
                }
                this.socket.on(eventName, this, _callback.method.bind(_callback.caller));
            }
            /**
             * 删除网络事件观察者
             * @param eventName
             * @param _callback
             */
            unregisterNetEvent(eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    let arr = this._socketDataEvent.get(eventName);
                    if (arr.indexOf(_callback) >= 0) {
                        arr.splice(arr.indexOf(_callback));
                    }
                }
            }
            update() {
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
            }
        }
        net.NetManager = NetManager;
        /**
         * socke.io系统事件
         */
        class SocketIoEvent {
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
//# sourceMappingURL=NetManager.js.map