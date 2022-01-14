
/*
2019-04-24 andy
* 游戏下载界面
*/
class GameDownloadWin extends BaseWindow{
    public ui:GameDownloadUI;
    constructor(){
        super(GameDownloadUI);
    }

    protected init():void{
        super.init();
        this.ui=this.view as GameDownloadUI;

        OpenManager.ins.postMsg(NoticeEvent.ZY_SCORE,UserSelfModel.ins.scoreMax);
    }

    public open():void{
        // BASE64Manager.ins.autoCheck(this.ui.imgBg);
        // BASE64Manager.ins.autoCheck(this.ui.imgGuang);
        // BASE64Manager.ins.autoCheck(this.ui.btnDownload);

        Laya.timer.loop(100,this,()=>{
            this.ui.imgGuang.rotation+=1;
        })
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
            break;
            case "btnDownload":
                HttpManager.ins.link(CustomDefine.downloadUrl);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
                //UIManager.ins.closeWindow(this.uiType);
            break;
            default:
            break;
        }
        
    }

    
    
    
    public close():void{
        
    }
}