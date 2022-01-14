/*
* 2019-03-05 andy
排行榜界面
*/
class RankWin extends BaseWindow{
    public ui:RankUI;
    constructor(){
        super(RankUI);
    }

    init():void{
        super.init();
        this.ui=this.view as RankUI;
        
        
    }
    open():void{
        OpenManager.ins.showRankView();
        OpenManager.ins.changeOpenParent(this.ui,60,270);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "":
               
            break;
            default:
            break;
        }
        
    }
}