
/*
2019-04-24 andy
* 游戏下载界面
*/
class GameDownloadWin extends BaseWindow{
    private curIndex:number=1;
    public ui:GameDownloadUI;
    constructor(){
        super(GameDownloadUI);
    }

    protected init():void{
        super.init();
        this.ui=this.view as GameDownloadUI;
        GameCtrl.ins.initDownloadLang(this.ui);

        Base64Manager.ins.checkImg(this.ui.imgBg,CustomBase64.bg_download);

        Laya.stage.on(Laya.Event.CLICK,this,()=>{});
        this.ui.btnDownload.y= Number(DataConfig.ins.dicGame["endDownloadY"]);

        this.ui.mouseThrough=true;
    }

    public open():void{
        super.open();
        let tt:TweenTarget=new TweenTarget(CustomDefine.animGuide,this.ui.btnDownload,TweenManager.ins.creatProp(TweenPropType.SMALL_BIG,[0.9,1.1,600,800]),0);
        TweenManager.ins.regTween(tt);
        TweenManager.ins.play(true,CustomDefine.animGuide);

        //是否有轮播图,根据图片自动添加，至少提供2张
        let imgCount:number=5;
        let arrString:Array<string>=[];
        for(let i:number=1;i<=imgCount;i++){
            let path:string="game/img_end_"+i+".png";
            if(Laya.loader.getRes(path)){
                 arrString.push(path);
            }
        }
        if(arrString.length>1){
            var eftData:ChangeImageData = new ChangeImageData();
            eftData.changeTime = 1500;
            eftData.arrString = arrString;
            let eft:ChangeImageEft = EffectManager.ins.getEffect(EffectName.change_img,eftData,false) as ChangeImageEft;
            eft.play();
        }
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
            break;
            case "btnDownload":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
            break;
            default:
            break;
        }   
    }
    public close():void{
        
    }
}