namespace game.effect{
    /*
    * 特效基类
    2019-07-17 andy
    */
    export class BaseEffect extends Laya.Sprite{
        /**显示对象列表 */
        public arrSprite:Array<Sprite>;
        /**特效数字参数列表 */
        public arrNumber:Array<number>;
        /**特效字符参数列表 */
        public arrString:Array<string>;
        /**是否正在播放特效 */
        public isPlaying:boolean=false;
        /**指定父类容器 可以不指定*/
        public parentContainer:Laya.Sprite=null;

        /**是否添加到场景 */
        private isScene:boolean=false;
        private isInit:boolean=false;

        constructor(isScene:boolean){
            super();
            this.isScene=isScene;
            this.on(Laya.Event.ADDED,this,this.onAdd);
        }
        /**执行一次 */
        protected init():void{
            
        }
        private onAdd(event:Laya.Event):void{
            if(!this.isInit){
                this.init();
                this.isInit=true;
            }
            this.on(Laya.Event.REMOVED,this,this.onRmove);
            this.open();
            // UIScaleManager.ins.regUI(this.uiType.name,()=>{this.scaleH();},()=>{this.scaleV();});
        }
        private onRmove(event:Laya.Event){
            this.off(Laya.Event.REMOVED,this,this.onRmove);
            // UIScaleManager.ins.regUI(this.uiType.name,null,null);
            this.close();
        }
        /**窗体是否打开 */
        public isOpen():boolean{
            return this!=null && this.parent!=null;
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
        /**窗体关闭 */
        public close():void{
            this.isPlaying=false;
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
        }

        /**
         * 设置数据
         * @param arrSprite 
         * @param arrNumber 
         * @param arrString 
         */
        public setData(arrSprite:Array<Sprite>,arrNumber:Array<number>=null,arrString:Array<string>=null):void{
            this.arrSprite=arrSprite;
            this.arrNumber=arrNumber;
            this.arrString=arrString;
        }
        /**播放特效 */
        public play():void{
            if(this.isPlaying){
                return;
            }
            if(!this.parent){
                if(this.parentContainer){
                    this.parentContainer.addChild(this);
                }else{
                    EffectManager.ins.addEffect(this,this.isScene);
                }
                
            }
            this.isPlaying=true;
        }
        /**停止特效 */
        public stop():void{
            this.removeSelf();
        }


        protected lineMove(line:Laya.Image,from:number,to:number,time1:number,time2:number,delayTime:number=0):void{
            line.x=from;
            Laya.Tween.to(line,{x:to},time1,null,Laya.Handler.create(this,()=>{
                Laya.Tween.to(line,{x:from},time2,null,Laya.Handler.create(this,()=>{
                    Laya.Tween.clearAll(line);
                }));
            }),delayTime);
        }
    }
}