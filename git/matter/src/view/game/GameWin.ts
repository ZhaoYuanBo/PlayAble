
/*
* 游戏界面
*/
class GameWin extends BaseWindow{
    private Matter:any = Browser.window.Matter;
    private LayaRender:any = Browser.window.LayaRender;
    
    private mouseConstraint:any;
    private engine:any;

    public ui:GameUI;
    constructor(){
        super(GameUI);
    }

    protected init():void{
        super.init();       
        this.ui=this.view as GameUI;
        //SceneManager.ins.setBackground(Define.CDN+"/atlas/not/bg_game.jpg");    
    }

    public open():void{
        //MatterManager.ins.init();
        Laya.stage.on("resize", this, this.onResize);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;

        switch(spName){
            case "btnAlien":
                
            break;
            default:
            break;
        }
    }
    
    
    public close():void{

    }
	private onResize():void
	{
		// 设置鼠标的坐标缩放
		// Laya.stage.clientScaleX代表舞台缩放
		// Laya.stage._canvasTransform代表画布缩放
		Matter.Mouse.setScale(this.mouseConstraint.mouse, {x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d)});
	}
}