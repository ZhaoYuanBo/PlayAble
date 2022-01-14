namespace game.ui{
    import SoundManager=game.common.SoundManager;
    import BaseUI=game.display.BaseUI;
    /*
    * 窗体基类
    */
    export class BaseWindow extends BaseUI{
        /** 窗体类型 */
        public uiType:UIType=null;
        /** Laya生成的UI */
        public view:laya.ui.View=null;
        /** 显示根节点 */
        public root:Laya.Sprite;

        constructor(viewCls:any){
            super();
            this.view=new viewCls();
            this.root = LayerManager.ins.getLayer(LayerName.root);
            this.addChild(this.view);
        }
        /**执行一次 */
        protected init():void{
            
        }
        /**
         * 窗体打开
         * @param delayTime 延长打开时间
         */
        public open(delayTime:number=0):void{
            this.view.on(Laya.Event.CLICK,this,this.mouseClick);
            UIScaleManager.ins.regUI(this.uiType.name,()=>{this.scaleH();},()=>{this.scaleV();});
            //2020-09-16 修正进入游戏时，背景图一闪留白情况
            if(delayTime>0){
                let sp:Sprite=new Sprite();
                sp.graphics.drawRect(0,0,Define.DeviceW,Define.DeviceH,"#ffffff");
                Laya.stage.addChild(sp);
                Laya.timer.once(delayTime,this,()=>{sp.removeSelf();})
            }
            
        }
         /**窗体关闭 */
        public close():void{
            //console.log("窗体已关闭");
            this.view.off(Laya.Event.CLICK,this,this.mouseClick);
            UIScaleManager.ins.regUI(this.uiType.name,null,null);
        }
        
        /**
         * UI点击事件
         * @param event 
         */  
        public mouseClick(event:MouseEvent):void{
            event.stopPropagation();
            let btn:any= event.target;
            if(btn instanceof Laya.Sprite){
                //按钮增加点击效果，view,list除外
                if(btn.name=="" || btn instanceof BaseWindow || btn instanceof laya.ui.Box || btn instanceof laya.ui.ProgressBar 
                || btn instanceof laya.ui.ScrollBar ||btn instanceof laya.ui.Slider || btn instanceof laya.ui.ComboBox){
                    
                }else{
                    if(btn instanceof laya.ui.Button){
                        laya.utils.Tween.from(btn,{scaleX:0.8,scaleY:0.8},80);
                    }

                    //SoundManager.ins.playSound(Define.SOUND_BTN);
                    this.viewClick(btn);
                }
            }     
        }
        /**窗体点击事件 */
        public viewClick(sp:Laya.Sprite):void{
            let spName:string=sp.name;
            //console.log("点击按钮："+spName);
            switch(spName){
                case "btnClose":
                    UIManager.ins.closeWindow(this.uiType);
                break;
                default:
                break;
            }
        }
    }
}