
/*
* 游戏结算界面
*/
class GameOverWin extends BaseWindow{
    public ui:GameOverUI;
    constructor(){
        super(GameOverUI);
    }

    protected init():void{
        super.init();
        this.ui=this.view as GameOverUI;

        OpenManager.ins.postMsg(NoticeEvent.ZY_SCORE,UserSelfModel.ins.scoreMax);
    }

    public open():void{
        this.ui.txtScore.text = GameModel.ins.score+"";
        this.ui.txtScoreMax.text = UserSelfModel.ins.scoreMax+"";
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
                GameCtrl.ins.startGameAgin();
            break;
            case "btnMain":
                UIManager.ins.closeWindow(this.uiType);
                UIManager.ins.closeWindow(CustomWindow.game);
            break;
            default:
            break;
        }
        
    }

    
    
    
    public close():void{
        
    }
}