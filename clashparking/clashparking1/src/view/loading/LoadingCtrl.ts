/*
* 
加载控制
*/
class LoadingCtrl{
    private static _ins:LoadingCtrl;
    public static get ins():LoadingCtrl{
		if(!this._ins)
			LoadingCtrl._ins=new LoadingCtrl();
		return this._ins;
	}
	constructor(){
		if(LoadingCtrl._ins != null)
			throw new Error("LoadingCtrl is single!");
	}

	public init():void{
		
	}
	public preload(complete:Laya.Handler):void{
		// HttpManager.ins.get(Define.configUrl,this,(e:any)=>{	
		// 	ServerConfig.ins.init(JSON.parse(e.data));
		// 	complete.run();
		// });

		Laya.loader.load(Define.serverConfigUrl,Laya.Handler.create(this,()=>{
			let data:any=Laya.loader.getRes(Define.serverConfigUrl);
			ServerConfig.ins.init(data);
			complete.run();
		}),null,Laya.Loader.JSON);
	}

	public preloadDataConfig(complete:Laya.Handler):void{
		// HttpManager.ins.get(Define.configUrl,this,(e:any)=>{	
		// 	ServerConfig.ins.init(JSON.parse(e.data));
		// 	complete.run();
		// });

		Laya.loader.load(CustomDefine.dataConfigUrl,Laya.Handler.create(this,()=>{
			let data:any=Laya.loader.getRes(CustomDefine.dataConfigUrl);
			DataConfig.ins.init(data);
			complete.run();
		}),null,Laya.Loader.JSON);
	}

}