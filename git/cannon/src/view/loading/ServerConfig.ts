/*
* 2019-03-06 andy
服务端配置数据
*/
class ServerConfig{
    public data:any;
    /**审核状态 0.审核 1.通过 */
    public switchState:number=0;
    /**分享内容列表 */
    public arrShare:Array<any>;
    /**图片广告列表 */
    public arrAd:Array<any>;
    /**视频广告列表 */
    public arrAdVideo:Array<any>;

    private static _ins:ServerConfig;
    public static get ins():ServerConfig{
		if(!this._ins)
			ServerConfig._ins=new ServerConfig();
		return this._ins;
	}
    constructor(){
        if(ServerConfig._ins != null)
			throw new Error("ServerConfig is single!");
    }

    public init(http:any):void{
        console.log("serverConfig:"+http);
        Define.serverHttp = http.data.serverHttp;
        Define.serverIP=http.data.serverIP;
        Define.serverPort=http.data.serverPort;

        this.switchState = http.switchState;
        this.arrShare=http.share;
        this.arrAd=http.ad;  
        this.arrAdVideo=http.adVideo;  

        //今天日期
        let today= PubUtil.GetTodayDateStr();
        let lastDay=LocalData.ins.getData(LocalKey.LAST_DAY);
        if(today != lastDay){
            LocalData.ins.setData(LocalKey.LAST_DAY,today);
            //视频次数清零
            let videoCount:any={};
            for(let adName in this.arrAdVideo){
                videoCount[adName]=0;
            }
            LocalData.ins.playVideoCount=videoCount;
            LocalData.ins.setData(LocalKey.PLAY_VIDEO_COUNT,JSON.stringify(videoCount));
        } 
    }
    /**
     * 获取审核状态 0.审核 true 1.通过 false
     */
    public getSwitchState():boolean{
        return this.switchState==0;
    }
    /**
     * 获得分享配置
     * title:"好玩的游戏",imageUrl:""
     */
    public getRandomShareUnit():any{
        let rand:number= MathUtil.randomRange(0,1);
        if(rand<this.arrShare.length){
            return this.arrShare[rand];
        }else{
            return {title:"好玩的游戏",imageUrl:""};
        } 
    }
    /**
     * 获得图片广告
     * @param adName 广告名字
     */
    public getAdUnit(adName:string):any{
        if(this.arrAd.hasOwnProperty(adName)){
            return this.arrAd[adName];
        }else{
            return null;
        }
    }
    /**
     * 获得视频广告
     * @param adName 广告名字
     */
    public getAdVideoUnit(adName:string):any{
        if(this.arrAdVideo.hasOwnProperty(adName)){
            return this.arrAdVideo[adName];
        }else{
            return null;
        }
    }
    
}
