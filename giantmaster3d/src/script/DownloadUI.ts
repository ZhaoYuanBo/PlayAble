import { GameCtrl } from "./GameCtrl";
import { ui } from "../ui/layaMaxUI";

/**
 */
export default class DownloadUI extends BaseWindow {
    private loadIndex:number=0;
    private progressHandler:Laya.Handler;

    private arrLoad:Array<Function>;
    public ui:ui.DownLoadUI;
    constructor(){
        super(ui.DownLoadUI);
    }

    protected init():void{
        this.ui= this.view as ui.DownLoadUI;
        this.ui.bgMask.alpha=0.6;
        GameCtrl.ins.initDownloadLang(this.ui);
    } 
    public open():void{
        if(GameCtrl.ins.isFail){
            this.ui.btnRetry.visible=true;
            this.ui.btnDownload.centerX=110;
            this.ui.imgStar1.visible=this.ui.imgStar2.visible=this.ui.imgStar3.visible=false;
        }else{
            this.ui.btnRetry.visible=false;
            this.ui.btnDownload.centerX=0;
            this.ui.imgStar1.visible=this.ui.imgStar2.visible=this.ui.imgStar3.visible=true;
            
            Laya.Tween.to(this.ui.imgStar1,{scaleX:2,scaleY:2},50,null,Laya.Handler.create(this,()=>{
                Laya.Tween.to(this.ui.imgStar1,{scaleX:1,scaleY:1},80,null,null);
            }),0);
            Laya.Tween.to(this.ui.imgStar2,{scaleX:2,scaleY:2},50,null,Laya.Handler.create(this,()=>{
                Laya.Tween.to(this.ui.imgStar2,{scaleX:1,scaleY:1},80,null,null);
            }),150);
            Laya.Tween.to(this.ui.imgStar3,{scaleX:2,scaleY:2},50,null,Laya.Handler.create(this,()=>{
                Laya.Tween.to(this.ui.imgStar3,{scaleX:1,scaleY:1},80,null,null);
            }),300);

            //SoundManager.ins.playSound(CustomBase64.sound_info);
        }

        Laya.timer.loop(100,this,()=>{
            this.ui.imgGuang.rotation+=1;
        });

        Laya.Tween.to(this.ui.imgBg,{scaleX:2,scaleY:2},50,null,Laya.Handler.create(this,()=>{ 

        }));
    }
    public close():void{
        Laya.timer.clearAll(this);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnRetry":
                UIManager.ins.closeWindow(this.uiType);
                GameCtrl.ins.isGameOver=false;
            break;
            case "btnDownload":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
                //UIManager.ins.closeWindow(this.uiType);
            break;
            default:
            break;
        }
        
    }

    
    
    
    
}