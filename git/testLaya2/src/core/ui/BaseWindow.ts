namespace game.ui{
    import SoundManager=game.common.SoundManager;
    /*
    * 窗体基类
    */
    export class BaseWindow extends BaseUI{
        public uiType:UIType=null;
        public view:Laya.Scene=null;
        private isInit:boolean=false;

        constructor(viewCls:any){
            super();
            this.view=new viewCls();
            this.view.on(Laya.Event.ADDED,this,this.onAdd);
        }
        /**执行一次 */
        protected init():void{
            
        }
        private onAdd(event:Laya.Event):void{
            if(!this.isInit){
                this.isInit=true;
                this.init();
            }
            this.view.on(Laya.Event.CLICK,this,this.mouseClick);
            this.view.on(Laya.Event.REMOVED,this,this.onRmove);
            UIScaleManager.ins.regUI(this.uiType.name,()=>{this.scaleH();},()=>{this.scaleV();});
            this.open();
        }
        private onRmove(event:Laya.Event){
            this.view.off(Laya.Event.CLICK,this,this.mouseClick);
            this.view.off(Laya.Event.REMOVED,this,this.onRmove);
            UIScaleManager.ins.regUI(this.uiType.name,null,null);
            this.close();
        }
        
        /**窗体是否打开 */
        public isOpen():boolean{
            return this.view!=null && this.view.parent!=null;
        }
        /**窗体打开 */
        public open():void{
            
        }
        /**横屏时布局设置 */
        public scaleH():void{

        }
        /**竖屏时布局设置 */
        public scaleV():void{
            
        }
          
        private mouseClick(event:MouseEvent):void{
            let btn:any= event.target;
            if(btn instanceof Laya.Sprite){
                //按钮增加点击效果，view,list除外
                if(btn.name=="" || btn instanceof BaseWindow || btn instanceof Laya.Box || btn instanceof Laya.ProgressBar 
                || btn instanceof Laya.ScrollBar ||btn instanceof Laya.Slider || btn instanceof Laya.ComboBox){
                    
                }else{
                    if(btn instanceof Laya.Button){
                        Laya.Tween.from(btn,{scaleX:0.8,scaleY:0.8},80);
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
        
        /**窗体关闭 */
        public close():void{
            //console.log("窗体已关闭");
        }
    }
}