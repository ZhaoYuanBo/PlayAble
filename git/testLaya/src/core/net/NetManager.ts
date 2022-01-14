namespace game.net{
    /*
    * 2019-04-09 andy
    网络通讯管理
    */
    export class NetManager{
        private _socketDataEvent:Dictionary<Array<Laya.Handler>>;

        private socket:Socket;
        private static _ins:NetManager;
        public static get ins():NetManager{
            if(!this._ins)
                new NetManager();
            return this._ins;
        }
        constructor(){
            if(NetManager._ins != null)
                throw new Error("NetManager is single!");
            NetManager._ins = this;
            this._socketDataEvent=new Dictionary<Array<Laya.Handler>>();
        }

        
        /**初始化 */
        public init(): void {
            console.log("serverIP",Define.serverIP,"serverPort",Define.serverPort);
            this.socket = io.connect(Define.serverIP+":"+Define.serverPort);

            // 当接收到消息并且不是本机时生成聊天气泡
            this.socket.on(SocketIoEvent.message, this.onMessageReveived);
            
            //连接成功
            this.socket.on(SocketIoEvent.connect, this.onSocketOpen);
            
            //连接断开
            this.socket.on(SocketIoEvent.disconnect, this.onSocketClose);

            //错误
            this.socket.on(SocketIoEvent.error, this.onConnectError);
            
        }

        private onSocketOpen(e:any=null):void
        {
            console.log("与服务器连接成功");
            EventManager.ins.event(SocketIoEvent.connect,e);
        }
        
        private onSocketClose(e:any=null):void
        {
            console.log("与服务器连接断开");
            EventManager.ins.event(SocketIoEvent.disconnect,e);
        }
        
        private onMessageReveived(message:any=null):void
        {
            console.log("收到服务端message");

            if(message as String)
            {
                console.log(message);
            }else if (message as ArrayBuffer)
            {
                console.log(new Laya.Byte(message).readUTFBytes());
            }
            //this.socket.input.clear();
             EventManager.ins.event(SocketIoEvent.message,message);
        }
        
        private onConnectError(e:any=null):void
        {
            console.log("error");
            EventManager.ins.event(SocketIoEvent.error,e);
        }
        /**
         * 发送message
         * @param data 
         * @param fn 
         */
        public send(data:any,fn:Function):void{
            if(!this.socket){
                console.error("NetManager 未初始化！");
                return;
            }
            this.socket.send(data,fn);
        }
        /**
         * 发送emit
         * @param eventName 
         * @param args 
         */
        public emit(eventName:any,...args:any[]):void{
            if(!this.socket){
                console.error("NetManager 未初始化！");
                return;
            }
            this.socket.emit(eventName,args);
        }
        /**
         * 添加网络事件观察者
         * @param eventName 
         * @param _callback 
         */
        public registerNetEvent(eventName:string, _callback:Laya.Handler):void
        {
            if (this._socketDataEvent.hasKey(eventName))
            {
                this._socketDataEvent.get(eventName).push(_callback);
            }
            else
            {
                this._socketDataEvent.add(eventName, [_callback]);
            }
            this.socket.on(eventName,_callback.method.bind(_callback.caller));
        }
        /**
         * 删除网络事件观察者
         * @param eventName 
         * @param _callback 
         */
        public unregisterNetEvent(eventName:string, _callback:Laya.Handler):void
        {
            if (this._socketDataEvent.hasKey(eventName))
            {
                let arr:Array<Laya.Handler>=this._socketDataEvent.get(eventName);
                if (arr.indexOf(_callback)>=0)
                {
                    arr.splice(arr.indexOf(_callback));
                }
            }
        }

        public update():void{
            while (this._socketDataEvent.length > 0)
            {
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
    /**
     * socke.io系统事件
     */
    export class SocketIoEvent{
        /**连接成功 */
        public static connect:string="connect";
        /**连接失败 */
        public static connect_error:string="connect_error";
        /**连接超时 */
        public static connect_timeout:string="connect_timeout";
        /**重新连接成功 */
        public static reconnect:string="reconnect";
        /**失去连接 */
        public static disconnect:string="disconnect";
        /**发生错误 */
        public static error:string="error";
        /** */
        public static message:string="message";

    }


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


}