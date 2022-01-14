
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
        this.ui.imgBg.skin=Define.CDN+"/atlas/not/bg_main.jpg";
    }
    open():void{
        MatterManager.ins.init();
        this.viewClick(this.ui.btnBird);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnBird":
                UIManager.ins.openWindow(CustomWindow.bird);
            break;
            case "btnSeesaw":
                UIManager.ins.openWindow(CustomWindow.seesaw);
            break;
            case "btnStart":
                UIManager.ins.closeWindow(CustomWindow.main);
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