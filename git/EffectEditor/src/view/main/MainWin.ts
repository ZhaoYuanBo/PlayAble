
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
        super.open();
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnFrame":
                UIManager.ins.openWindow(CustomWindow.frame);
            break;
            case "btnEffect":
                UIManager.ins.openWindow(CustomWindow.effect);
            break;
            case "btnSpine":
                UIManager.ins.openWindow(CustomWindow.spine);
            break;
            case "btnMonster":
                UIManager.ins.openWindow(CustomWindow.monster);
            break;
            case "btnSkill":
                UIManager.ins.openWindow(CustomWindow.skill);
            break;
            default:
            break;
        }
        
    }
}