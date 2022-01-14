/*
* 2019-03-04 andy
本地数据
*/
class LocalData{
    public playVideoCount:Array<any>;

    private static _ins:LocalData;
    public static get ins():LocalData{
		if(!this._ins)
			LocalData._ins=new LocalData();
		return this._ins;
	}
    constructor(){
        if(LocalData._ins != null)
			throw new Error("LocalData is single!");
        this.init();
    }
    /**初始化本地数据 */
    public init():void{
        //
        this.playVideoCount= this.getData(LocalKey.PLAY_VIDEO_COUNT);
    }
    /**设置本地数据 */
    public setData(key:string,data:any):void{
        Laya.LocalStorage.setItem(key,data);
    }
    /**获得本地数据 */
    public getData(key:string):any{
        let data:string= Laya.LocalStorage.getItem(key);
        return data?JSON.parse(data):null;
    }

    /**设置视频播放次数 */
    public setPlayVideoCount(adName:string):void{
        if(!this.playVideoCount){
            this.playVideoCount=[];
        }
        if(this.playVideoCount.hasOwnProperty(adName)){
            this.playVideoCount[adName]+=1;
        }else{
            this.playVideoCount[adName]=1;
        }
        this.setData(LocalKey.PLAY_VIDEO_COUNT,JSON.stringify(this.playVideoCount));
    }
    /**获得视频播放次数 */
    public getPlayVideoCount(adName:string):number{
        if(!this.playVideoCount){
            this.playVideoCount=[];
            return 0;
        }
        if(this.playVideoCount.hasOwnProperty(adName)){
            return this.playVideoCount[adName];
        }else{
            return 0;
        }
    }


}
