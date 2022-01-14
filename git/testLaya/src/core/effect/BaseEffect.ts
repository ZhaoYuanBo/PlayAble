namespace game.effect{
    import BaseUI=game.display.BaseUI;
    /*
    * 特效基类
    2019-07-17 andy
    */
    export class BaseEffect extends BaseUI{
        /**特效数据 */
        public effectData:BaseEffectData;
        /**显示对象列表 */
        public arrSprite:Array<Sprite>;
        /**特效数字参数列表 */
        public arrNumber:Array<number>;
        /**特效字符参数列表 */
        public arrString:Array<string>;
        /**是否正在播放特效 */
        public isPlaying:boolean=false;

        constructor(isScene:boolean){
            super();
        }
        /**执行一次 */
        protected init():void{
            
        }

        /**窗体打开 */
        public open():void{
            super.open();
        }
   
        /**窗体关闭 */
        public close():void{
            super.close();
            this.isPlaying=false;
            Laya.Tween.clearAll(this);
        }

        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void{
            this.effectData=effectData;
        }
        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            if(this.isPlaying){
                return;
            }
            if(!this.parent){             
                if(parent instanceof Laya.Sprite){
					parent.addChild(this);
				}else{
                    EffectManager.ins.addEffect(this,parent?parent:LayerName.ui_effect);
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

    /*
    * 特效基类数据
    2020-01-03 andy
    */
    export class BaseEffectData{
        /**显示对象列表 */
        public arrSprite:Array<Sprite>;
        /**特效数字参数列表 */
        public arrNumber:Array<number>;
        /**特效字符参数列表 */
        public arrString:Array<string>;
        constructor(){}
    }
}