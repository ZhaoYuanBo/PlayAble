namespace game.effect{
    /*
    * 引导点击特效
    2019-07-19 andy
    */
    export class GuideClickEft extends BaseEffect{
        //特效数据
        private data:GuideClickData;
        //圆形水纹
        private imgWater:Laya.Image=null;
        //手指
        private imgHand:Laya.Image=null;

        constructor(isScene:boolean){
            super(isScene);
            this.imgWater=new Laya.Image();
            this.imgWater.anchorX=this.imgWater.anchorY=0.5;
            
            this.addChild(this.imgWater);

            this.imgHand=new Laya.Image();
            
            this.addChild(this.imgHand);
        }
        /**执行一次 */
        protected init():void{
            
        }

        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:BaseEffectData):void{
            super.setData(effectData);
            this.data = effectData as GuideClickData;

            this.imgWater.alpha=this.data.waterAlphaStart;
            this.imgWater.graphics.clear();
            this.imgWater.graphics.drawCircle(0,0,this.data.waterRadis,this.data.waterColor);

            this.imgHand.skin=this.data.handSkin;
            if(this.data.handCenter!=0){
                this.imgHand.anchorX=this.imgHand.anchorY=0.5;
            }

        }
        /**窗体关闭 */
        public close():void{
            super.close();
            Laya.Tween.clearAll(this.imgWater);
            Laya.Tween.clearAll(this.imgHand);
        }

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            super.play(parent);
            let halfX:number = Define.DeviceW>>1;
            this.big(this.imgWater,this.imgHand);
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
                sp.scaleX=1;sp.scaleY=1;sp.alpha=this.data.waterAlphaStart;
                Laya.Tween.to(sp,{scaleX:this.data.waterRadisRate,scaleY:this.data.waterRadisRate,alpha:this.data.waterAlphaEnd},300,null,Laya.Handler.create(this,()=>{
                    Laya.Tween.clearTween(sp);
                }))
            })

        }
        /**停止特效 */
        public stop():void{
            super.stop();
        }
    }

    /*
    * Boss来袭数据
    2020-01-10 andy
    */
    export class GuideClickData extends BaseEffectData{
        /**手型皮肤*/
        public handSkin:string="";
        /**手型是否剧中 默认0 不居中*/
        public handCenter:number=0;

        /**水纹半径 */
        public waterRadis:number=50;
        /**水纹半径放大比例*/
        public waterRadisRate:number=2;
        /**水纹透明度开始值，默认1*/
        public waterAlphaStart:number=1;
        /**水纹透明度结束值，默认0*/
        public waterAlphaEnd:number=0;
        /**水纹颜色*/
        public waterColor:string="#ffffff";

        constructor(handSkin:string){
            super();
            this.handSkin = handSkin;
        }
    }
}