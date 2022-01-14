/*
* name;
*/
class Game{
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
    /**
     * 要预先初始化的东西
     */
    public preInit():void{
        Define.screenFillType = ScreenFillType.nice2;
        
        // //判断当前渲染模式是WebGL还是Canvas
        if( Laya.Render.isWebGL ){
            Define.BACKGROUND_COLOR="none";//背景透明
        }else{
            Define.BACKGROUND_COLOR=null;//背景透明
        }
    }
    public init():void{
        //游戏设置
        //Define.SOUND_MAIN="/sound/main.mp3";
        //Define.SOUND_GAME="/sound/game.mp3";

        // let userInfo= res.userInfo;
        // UserSelfModel.ins.nickName= userInfo.nickName;
        // UserSelfModel.ins.headImg= userInfo.avatarUrl;
        // UserSelfModel.ins.sex = userInfo.gender; // 性别 0：未知、1：男、2：女
        // UserSelfModel.ins.province = userInfo.province;
        // UserSelfModel.ins.city = userInfo.city;
        // UserSelfModel.ins.country = userInfo.country;

        UserSelfModel.ins.init();
        //SoundManager.ins.playMusic(CustomBase64.sound_game);
        //UIManager.ins.openWindow(CustomWindow.main);
        UIManager.ins.openWindow(CustomWindow.game);
        UIManager.ins.closeWindow(CustomWindow.loading);
    }
    /**
     * 预加载loading资源
     */
    public preLoad():void{
        if(Base64Manager.isUseBase64){
            let arrAtlas:Array<Base64Type>=[
                CustomBase64.atlas_loading,
                CustomBase64.json_cfg_data
            ]
            Base64Manager.ins.loadAtlas(arrAtlas,Laya.Handler.create(this,this.preLoadFinish),null);
        }else{
            let arr=[{
                url:Define.CDN+"/atlas/loading.atlas",
                type:Laya.Loader.ATLAS
            },{
                url:Define.CDN+"/config/cfg_data.json",
                type:Laya.Loader.JSON
            }];
            ResManager.ins.preload(arr,Laya.Handler.create(this,this.preLoadFinish),null);
        } 
    }
    private preLoadFinish():void{
        //初始化配置数据
        let data:any=Laya.loader.getRes(CustomBase64.json_cfg_data.id);
		DataConfig.ins.init(data);

        if(Laya.Browser.onIOS){
            Define.DOWNLOAD_URL=DataConfig.ins.dicGame["iosUrl"];
        }else{
            Define.DOWNLOAD_URL=DataConfig.ins.dicGame["androidUrl"];;
        }
        UIManager.ins.openWindow(CustomWindow.loading);
    }

}