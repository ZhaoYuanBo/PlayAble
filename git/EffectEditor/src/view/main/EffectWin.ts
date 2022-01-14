/*
* 动效界面
2020-01-09 andy
*/
class EffectWin extends BaseWindow{
    private arrData:Array<Cfg_Effect>;
    private effect:BaseEffect;
    private dicFrame:Dictionary<BaseEffect>;
    private isBgWhite:boolean=true;

    public ui:EffectUI;
    constructor(){
        super(EffectUI);
    }

    init():void{
        super.init();
        this.ui=this.view as EffectUI;
        this.dicFrame=new Dictionary<BaseEffect>();
    }
    open():void{
        super.open();
        this.ui.menu.selectHandler=Laya.Handler.create(this,this.selectMenu,null,false);
        this.ui.list.renderHandler = Laya.Handler.create(this,this.renderHandler,null,false);
        this.ui.list.selectHandler = Laya.Handler.create(this,this.selectHandler,null,false);
        //默认是false
        this.ui.list.selectEnable=true;
        this.selectMenu(0);

        this.ui.menu.labels="金币,爆炸";

    }
    public close():void{
        if(this.effect){
            this.effect.stop();
        }
        super.close();
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;

        switch(spName){
            case "btnClose":
               UIManager.ins.closeWindow(CustomWindow.effect);
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
        this.arrData= [];
        this.arrData.push(new Cfg_Effect("BOSS来袭",EffectName.boss_warning));
        this.arrData.push(new Cfg_Effect("空投",EffectName.air_drop));
        this.arrData.push(new Cfg_Effect("满屏金币",EffectName.out_gold));
        this.arrData.push(new Cfg_Effect("喷泉",EffectName.Fountain));
        this.arrData.push(new Cfg_Effect("水纹点击",EffectName.guide_click));
        this.arrData.push(new Cfg_Effect("图片切换",EffectName.change_img));
        this.ui.list.array= this.arrData;
    }


    renderHandler(item:FrameUI,index:number):void{
        var data:Cfg_Effect = this.arrData[index];
        item.name= "item_"+index;
        let btn:Laya.Button = item.getChildByName("btnEffect") as Laya.Button;
        btn.label=data.itemName;
    }
    selectHandler(index:number):void{
        if(this.effect){
            this.effect.stop();
        }
        var data:Cfg_Effect = this.arrData[index];
        this.effect = this.dicFrame.get(data.itemType);
        if(!this.effect){
            this.effect = this.getEffect(data.itemType);
            this.dicFrame.add(data.id,this.effect);
        }else{
            
        }
        this.effect.play();
        // TipManager.ins.showWord("选择成功！",0,0);
    }

    private getEffect(ename:EffectName):BaseEffect{
        let ret:BaseEffect;
        let data:BaseEffectData;
        let initX:number=0;
        let initY:number=0;
        if(ename == EffectName.boss_warning){
            data = new BossWarningData("effect/img_boss.png","effect/img_line1.png","effect/img_line2.png","BOSS\nComing!");
            (data as BossWarningData).wordY=80;
            (data as BossWarningData).wordW=260;
            (data as BossWarningData).wordH=50;
            (data as BossWarningData).wordSize=50;
            (data as BossWarningData).wordColor="#ffff00";
            (data as BossWarningData).wordStroke=4;
            (data as BossWarningData).wordStrokeColor="#c5671e";
            SoundManager.ins.playSound(CustomBase64.sound_warning);
            initY=900;
        }else if(ename == EffectName.air_drop){
            data = new AirDropData("effect/img_drop_plane.png","effect/img_drop_parachute.png","effect/img_drop_shadow.png","effect/img_drop_box.png");
            (data as AirDropData).planeRotate=-30;
            SoundManager.ins.playSound(CustomBase64.sound_plane);
        }else if(ename == EffectName.out_gold){
            data = new OutGoldData("effect/img_gold.png",100);
            (data as OutGoldData).dropTime=500;
            SoundManager.ins.playSound(CustomBase64.sound_reward);
        }else if(ename == EffectName.Fountain){
            data = new FountainData("effect/img_gold.png");
            (data as FountainData).minX=150;
            (data as FountainData).maxX=550;
            (data as FountainData).minY=-300;
            (data as FountainData).maxY=-400;
            (data as FountainData).oneSendTime=20;
            (data as FountainData).oneShowTime=800;
   
            SoundManager.ins.playSound(CustomBase64.sound_reward);
            initX=Define.DeviceW>>1;initY=900;
        }else if(ename == EffectName.guide_click){
            data = new GuideClickData("effect/img_guide.png");
            (data as GuideClickData).waterRadis=50;
            (data as GuideClickData).waterRadisRate=3;
            (data as GuideClickData).waterAlphaStart=0.7;
   
            SoundManager.ins.playSound(CustomBase64.sound_btn);
            initX=Define.DeviceW>>1;initY=900;
        }else if(ename == EffectName.change_img){
            data = new ChangeImageData();
            (data as ChangeImageData).changeTime=1500;
            (data as ChangeImageData).arrString=["effect/img_head1.png","effect/img_head2.png","effect/img_head3.png"];

            initX=Define.DeviceW>>1;initY=900;
        }else{

        }
        ret = EffectManager.ins.getEffect(ename,data,false);
        ret.x = initX;ret.y = initY;
        return ret;
    }
}

    /*
    * 道具
    */
    class Cfg_Effect{
        constructor(itemName:string,itemType:EffectName){
            this.itemName = itemName;
            this.itemType = itemType;
        }
        public id:number;
        public itemName:string;
        public itemType:EffectName;
    }