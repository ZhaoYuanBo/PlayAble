/*
* 主界面
*/
class BagWin extends BaseWindow{
    //private arrData:Array<Cfg_Knife>;

    public ui:BagUI;
    constructor(){
        super(BagUI);
    }

    init():void{
        super.init();
        this.ui=this.view as BagUI;
        
    }
    open():void{
        this.ui.menu.selectHandler=Laya.Handler.create(this,this.selectMenu,null,false);
        this.ui.list.renderHandler = Laya.Handler.create(this,this.renderHandler,null,false);
        this.ui.list.selectHandler = Laya.Handler.create(this,this.selectHandler,null,false);
        //默认是false
        this.ui.list.selectEnable=true;
        this.selectMenu(0);
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

    private selectMenu(ne?:any):void{
        // let index:number = Number(ne);
        // this.arrData= DataConfig.ins.getKinfes(index+1);
        // this.ui.list.array= this.arrData;
    }


    renderHandler(item:BagItemUI,index:number):void{
        // var data:Cfg_Knife = this.arrData[index];
        // item.name= "item_"+index;
        // item.imgItem.skin="knife/knife"+data.id+".png";
    }
    selectHandler(index:number):void{
        // var data:Cfg_Knife = this.arrData[index];
        // UserSelfModel.ins.setKnife(data.id);
        // TipManager.ins.showWord("选择成功！",0,0);
    }
}