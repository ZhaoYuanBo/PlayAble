import { CustomDefine } from "./../custom/CustomDefine";
import { DataConfig } from "./../custom/config/DataConfig";

/*
* 2019-03-08 andy
加载控制
*/
export class LoadingCtrl{
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

	public preloadDataConfig(complete:Laya.Handler):void{
		// HttpManager.ins.get(Define.configUrl,this,(e:any)=>{	
		// 	ServerConfig.ins.init(JSON.parse(e.data));
		// 	complete.run();
		// });

		// Laya.loader.load(CustomDefine.dataConfigUrl,Laya.Handler.create(this,()=>{
		// 	let data:any=Laya.loader.getRes(CustomDefine.dataConfigUrl);
		// 	DataConfig.ins.init(data);
		// 	complete.run();
		// }),null,Laya.Loader.JSON);

		DataConfig.ins.init(null);
			complete.run();
	}

}