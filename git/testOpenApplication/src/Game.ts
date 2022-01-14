/*
* name;
*/
class Game{
    private wx:any;

    private static _ins:Game;
    public static get ins():Game{
		if(!this._ins)
			Game._ins=new Game();
		return this._ins;
	}
    constructor(){
		if(Game._ins != null)
			throw new Error("Game is single!");
	}

    public init():void{
        this.wx= Laya.Browser.window.wx;
        EventManager.ins.on(EventKey.ZY_RESIZE,this,this.ZY_RESIZE);
        EventManager.ins.on(EventKey.ZY_LOGIN,this,this.ZY_LOGIN);
        EventManager.ins.on(EventKey.ZY_SCORE,this,this.ZY_SCORE);
        EventManager.ins.on(EventKey.ZY_RANK,this,this.ZY_RANK);
        this.onMsg();
        this.getUserCloudStorage();
    }
    /**接受主域发送的消息 */
    private onMsg():void{
        this.wx.onMessage((msg)=>{
            if(msg == undefined || msg.cmd == undefined){
                //2018-12-20 andy 包含.json和.ani的不打印
                let log:string=JSON.stringify(msg);
                if(log && log.indexOf(".json")!=-1 && log.indexOf(".ani")!=-1 && log.indexOf(".png")!=-1 )
                console.log("消息传递格式错误 ......"+log);
                return;
            }
            console.log("收到主域发送过来的数据"+JSON.stringify(msg));
            EventManager.ins.event(msg.cmd,msg.data);
        });
    }
     /**获得自己云端数据 */
    public getUserCloudStorage(){
        this.wx.getUserCloudStorage({
            keyList:CloudKey.keyList,
            success: function(res) {
                console.log("getUserCloudStorage success data:"+JSON.stringify(res));
                GameModel.ins.setUser(res.KVDataList.length>0?res.KVDataList:null);
            },
            fail: function() {
                console.log("getUserCloudStorage fail");
            }
        });
    }
    /**上报云端数据 */
    public setUserCloudStorage(score:number,t:Laya.Handler){
        this.wx.setUserCloudStorage({
            KVDataList:[{key:CloudKey.score,value:String(score)}],
            success: function(res) {
                console.log("setUserCloudStorage success");
                t.runWith([]);
            },
            fail: function() {
                console.log("setUserCloudStorage fail");
            }
        });
    }
    /**获得云端数据 */
    public getFriendCloudStorage(){
        this.wx.getFriendCloudStorage({
            keyList:CloudKey.keyList,
            success: function(res) {
                var list:IUserGameData[] = res.data;
                GameModel.ins.setList(list);
                console.log("getFriendCloud success ="+JSON.stringify(res.data));
            },
            fail: function() {
                console.log("getFriendCloud fail");
            }
        });
    }
    
    
    private ZY_RESIZE(e:EventKey):void{
        if(Laya.Browser.window.sharedCanvas){
            Laya.Browser.window.sharedCanvas.width = e.data.width, 
            Laya.Browser.window.sharedCanvas.height = e.data.height;
            var tempMatrix = e.data.matrix;
            var matrix = new Laya.Matrix();
            matrix.a = tempMatrix.a;
            matrix.b = tempMatrix.b;
            matrix.c = tempMatrix.c;
            matrix.d = tempMatrix.d;
            Laya.stage._canvasTransform = matrix;//重新设置矩阵
        }
    }
    private ZY_LOGIN(ne:EventKey):void{
        
    }
    private ZY_SCORE(ne:EventKey):void{
        let score:number= ne.data;
        if(score>GameModel.ins.score){
            console.log("最新分数:"+score);
            this.setUserCloudStorage(score,Laya.Handler.create(this,this.getFriendCloudStorage));
        }
        
    }
    private ZY_RANK(ne:EventKey):void{
        UIManager.ins.showView(EventKey.ZY_RANK,RankWin);
        this.getFriendCloudStorage();
    }
}