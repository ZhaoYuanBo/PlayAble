/*
* 怪物界面
2020-01-09 andy
*/
class MonsterWin extends BaseWindow{
    private arrData:Array<Cfg_Monster>;
    private king:EnemyKing;
    private dicMonster:Dictionary<EnemyKing>;
    private isBgWhite:boolean=true;
    //屏视旋转角度
    private arrAngle:Array<number>;
    public ui:MonsterUI;
    constructor(){
        super(MonsterUI);
    }

    init():void{
        super.init();
        this.ui=this.view as MonsterUI;
        this.dicMonster=new Dictionary<EnemyKing>();
        this.arrAngle=[0,270,315,0,45,90,135,180,215];
    }
    open():void{
        super.open();
        this.ui.menu.selectHandler=Laya.Handler.create(this,this.selectMenu,null,false);
        this.ui.list.renderHandler = Laya.Handler.create(this,this.renderHandler,null,false);
        this.ui.list.selectHandler = Laya.Handler.create(this,this.selectHandler,null,false);

        //默认是false
        this.ui.list.selectEnable=true;
        this.ui.menu.labels="普通,BOSS";
        this.selectMenu(0);

        
    }
    public close():void{
        if(this.king){
            this.king.onDeadDisappear();
        }
        super.close();
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        let actionDirect:number = Number(spName.replace("btnDirect",""))
        if(actionDirect>0){
            this.changeActionDirect(actionDirect);
            return;
        }
        let actionType:number = Number(spName.replace("btnType",""))
        if(actionType>=0){
            this.changeActionType(actionType);
            return;
        }
        switch(spName){
            case "btnClose":
               UIManager.ins.closeWindow(CustomWindow.frame);
            break;
            case "btnBgColor":
                this.isBgWhite = !this.isBgWhite;
                this.ui.spBgColor.graphics.drawRect(0,0,Define.DeviceW,Define.DeviceH,this.isBgWhite?"#ffffff":"#000000");
            break;
            default:
            break;
        }
        
    }

    private selectMenu(ne?:any):void{
        let index:number = Number(ne);
        this.arrData= DataConfig.ins.getMonsters();
        this.ui.list.array= this.arrData;
    }


    renderHandler(item:MonsterItemUI,index:number):void{
        var data:Cfg_Monster = this.arrData[index];
        item.name= "item_"+index;
        let btn:Laya.Button = item.getChildByName("btnEffect") as Laya.Button;
        btn.label=data.name;
    }
    selectHandler(index:number):void{
        if(this.king){
            this.king.removeSelf();
        }
        var data:Cfg_Monster = this.arrData[index];
        this.king = this.dicMonster.get(data.id);
        if(!this.king){
            this.king = new EnemyKing();
            this.king.setData(data);

            this.king.initPosition(new Laya.Point(Define.DeviceW>>1,900));
            this.dicMonster.add(data.id,this.king);
        }else{
            
        }
        this.ui.addChild(this.king);
        // TipManager.ins.showWord("选择成功！",0,0);
    }

    private changeActionDirect(ad:ActionDirect):void{
        if(!this.king){
            TipManager.ins.showWord("请先选择一个怪物！")
            return;
        }
        if(Define.gameType == GameType.over_look){
            this.king.spBody.rotation = this.arrAngle[ad];
        }else{

        }
    }
    private changeActionType(at:ActionType):void{
        if(!this.king){
            TipManager.ins.showWord("请先选择一个怪物！")
            return;
        }
        this.king.setActionType(at);
    }
}