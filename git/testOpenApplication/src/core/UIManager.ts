/*
* 2019-03-05 andy
窗体管理器
*/
class UIManager{
    public curView:Laya.View;
    public dicView:Laya.Dictionary;

    private static _ins:UIManager;
    public static get ins():UIManager{
		if(!this._ins)
			UIManager._ins=new UIManager();
		return this._ins;
	}
    constructor(){
        if(UIManager._ins != null)
			throw new Error("UIManager is single!");
        this.dicView=new Laya.Dictionary();
    }

    public showView(key:string,cls:any):void{
		if(this.curView){
			this.curView.removeSelf();
		}
		var view:Laya.View = this.dicView.get(key);
		if(!view){
			view = new cls();
			this.dicView.set(key,view);
		}
		Laya.stage.addChild(view);
		this.curView = view;
	}

	public getView(key:string):Laya.View{
		return this.dicView.get(key);
	}

}

