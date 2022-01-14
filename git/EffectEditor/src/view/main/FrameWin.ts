/*
* 序列帧界面
2020-01-08 andy
*/
class FrameWin extends BaseWindow{
    private arrData:Array<Array<Cfg_Frame>>;
    private frame:BaseFrame;
    private dicFrame:Dictionary<BaseFrame>;
    private isBgWhite:boolean=true;

    private menuInex:number=0;
    public ui:FrameUI;
    constructor(){
        super(FrameUI);
    }

    init():void{
        super.init();
        this.ui=this.view as FrameUI;
        this.dicFrame=new Dictionary<BaseFrame>();

        this.ui.menu.labels="默认,战斗,发光,金币";
        this.arrData=[[],[],[],[],[]];
        
        let arr:Array<Cfg_Frame> =FrameManager.ins.getCfgs();
        let type:number=0;
        for(let cfg of arr){
            if(cfg.count==0)continue;
            let sk:string  = cfg.skin.substring(0,cfg.skin.indexOf("/"));
            type = Number(sk.replace("frame",""));
            this.arrData[type].push(cfg);
        }
    }
    open():void{
        super.open();
        this.ui.menu.selectHandler=Laya.Handler.create(this,this.selectMenu,null,false);
        this.ui.list.renderHandler = Laya.Handler.create(this,this.renderHandler,null,false);
        this.ui.list.selectHandler = Laya.Handler.create(this,this.selectHandler,null,false);

        this.ui.iptFrameRate.on(Laya.Event.BLUR,this,()=>{
            this.frame.setInterval(Number(this.ui.iptFrameRate.text));
        })
        this.ui.iptFrameScale.on(Laya.Event.BLUR,this,()=>{
            this.frame.scale(Number(this.ui.iptFrameScale.text),Number(this.ui.iptFrameScale.text));
        })

        //默认是false
        this.ui.list.selectEnable=true;
        this.selectMenu(0);
    }
    public close():void{
        if(this.frame){
            this.frame.stopFrame();
        }
        super.close();
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
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
        this.menuInex = Number(ne);
        this.ui.list.array= this.arrData[this.menuInex ];
        //this.ui.list.selectedIndex=0;
    }


    renderHandler(item:FrameUI,index:number):void{
        var data:Cfg_Frame = this.arrData[this.menuInex][index];
        item.name= "item_"+index;
        let btn:Laya.Button = item.getChildByName("btnEffect") as Laya.Button;
        btn.label=data.desc;
    }
    selectHandler(index:number):void{
        if(this.frame){
            this.frame.stopFrame();
        }
        var data:Cfg_Frame = this.arrData[this.menuInex][index];
        
        this.frame = this.dicFrame.get(data.id);
        if(!this.frame){
            this.frame = new BaseFrame(data);
            this.frame.x = Define.DeviceW>>1;
            this.frame.y = 700;
            this.dicFrame.add(data.id,this.frame);
        }else{
            
        }
        this.ui.iptFrameRate.text = data.rate+"";
        this.ui.iptFrameScale.text = "1";
        this.frame.setInterval(data.rate);
        this.frame.scale(1,1);
        this.frame.playFrame(true);
        // TipManager.ins.showWord("选择成功！",0,0);
    }
}