namespace game.effect{
    /*
    * 引导点击特效
    2019-07-19 andy
    */
    export class GuideClickEft extends BaseEffect{
        //圆形
        private imgCirle:Laya.Image=null;
        //手指
        private imgHand:Laya.Image=null;

        constructor(isScene:boolean){
            super(isScene);
            this.imgCirle=new Laya.Image();
            this.imgCirle.anchorX=this.imgCirle.anchorY=0.5;
            this.imgCirle.alpha=0.5;
            this.imgCirle.graphics.drawCircle(0,0,60,"#ffffff");
            this.addChild(this.imgCirle);

            this.imgHand=new Laya.Image();
            this.imgHand.anchorX=this.imgHand.anchorY=0.5;
            this.addChild(this.imgHand);
        }
        /**执行一次 */
        protected init():void{
            
        }

        /**
         * 设置数据
         * @param arrSprite 
         * @param arrNumber 
         * @param arrString 
         */
        public setData(arrSprite:Array<Sprite>,arrNumber:Array<number>=null,arrString:Array<string>=null):void{
            super.setData(arrSprite,arrNumber,arrString);

            this.imgHand.skin=arrString[0];
            this.imgHand.x=20;
            this.imgHand.y=20;
        }
        /**窗体关闭 */
        public close():void{
            super.close();
            Laya.Tween.clearAll(this.imgCirle);
            Laya.Tween.clearAll(this.imgHand);
        }

        /**播放特效 */
        public play():void{
            super.play();
            let halfX:number = Define.DeviceW>>1;
            this.big(this.imgCirle,this.imgHand);
        }
        private big(sp:Laya.Sprite,hand:Laya.Sprite):void{
            if(!this.isPlaying){
                return;
            }
            Laya.Tween.to(hand,{scaleX:0.5,scaleY:0.5},350,null,Laya.Handler.create(this,()=>{
                Laya.Tween.clearTween(hand);
                Laya.Tween.to(hand,{scaleX:1,scaleY:1},350,null,Laya.Handler.create(this,()=>{
                    Laya.Tween.clearTween(hand);
                    this.big(sp,hand);
                }))
            }))
            
            Laya.timer.once(200,this,()=>{
                sp.scaleX=1;sp.scaleY=1;sp.alpha=0.5;
                Laya.Tween.to(sp,{scaleX:2.5,scaleY:2.5,alpha:0},300,null,Laya.Handler.create(this,()=>{
                    Laya.Tween.clearTween(sp);
                }))
            })

        }
        /**停止特效 */
        public stop():void{
            super.stop();
        }
    }
}