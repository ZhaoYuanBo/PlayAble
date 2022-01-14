/*
* 2019-03-08 andy
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

}