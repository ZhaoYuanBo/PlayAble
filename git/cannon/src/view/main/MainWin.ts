
/*
* 主界面
*/
class MainWin extends BaseWindow{
    public ui:MainUI;
    constructor(){
        super(MainUI);
    }

    init():void{
        super.init();
        this.ui=this.view as MainUI;
        //this.ui.imgBg.skin=Define.CDN+"/atlas/not/bg_main.jpg";
    }
    open():void{
        UIManager.ins.closeWindow(CustomWindow.main);
        UIManager.ins.openWindow(CustomWindow.game);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnShare":
                Global.platform.share(()=>{
                    console.log("share callback");
                });
            break;
            case "btnRank":
                UIManager.ins.openWindow(CustomWindow.rank);
            break;
            case "btnStart":
                //UIManager.ins.closeWindow(CustomWindow.main);
                GameCtrl.ins.startGame();
            break;
            case "btnKnife":
                UIManager.ins.openWindow(CustomWindow.bag);
            break;
            default:
            break;
        }
        
    }
}