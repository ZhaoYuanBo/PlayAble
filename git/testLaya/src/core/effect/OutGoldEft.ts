namespace game.effect{
    /*
    * 满屏金币掉落特效
    2019-12-19 andy
    */
    export class OutGoldEft extends BaseEffect{
        private data:OutGoldData;
        //圆形水纹
        private arrGold:Array<Laya.Image>=null;

        constructor(isScene:boolean){
            super(isScene);
            this.arrGold=[];
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
            this.data = effectData as OutGoldData;

            for(let i=0;i<this.data.count;i++){
                let img:Laya.Image = new Laya.Image(this.data.imgSkin);
                this.arrGold.push(img);
                img.anchorX = img.anchorY = 0.5;
                this.addChild(img);
            } 
        }
        /**窗体关闭 */
        public close():void{
            super.close();
            Laya.Tween.clearAll(this);
            Laya.Tween.clearAll(this);
        }

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            super.play(parent);
            let halfX:number = Define.DeviceW>>1;
            
            for(let i=0;i<this.data.count;i++){
                let img:Laya.Image = this.arrGold[i];
                img.visible=true;
                img.scaleX = img.scaleY = MathUtil.randomRange(this.data.minScale,this.data.maxScale)/100;
                img.x = MathUtil.randomRange(this.data.minX,this.data.maxX);
                img.y = MathUtil.randomRange(this.data.minY,this.data.maxY);

                let toX:number = img.x+(Math.random()<0.5?1:-1)*this.data.dropOffx;
                Laya.Tween.to(img,{x:toX,y:this.data.dropY},this.data.dropTime,Laya.Ease.backIn,Laya.Handler.create(this,()=>{
                    img.visible=false;
                },[img]),i*5);
            }
        }
        
        /**停止特效 */
        public stop():void{
            super.stop();
        }
    }

    /*
    * 喷金币数据
    2020-01-10 andy
    */
    export class OutGoldData extends BaseEffectData{
        /**金币皮肤*/
        public imgSkin:string="";
        /**产生数量*/
        public count:number=0;
        /**产生最小X*/
        public minX:number=0;
        /**产生最大X*/
        public maxX:number=0;
        /**产生最小Y*/
        public minY:number=0;
        /**产生最大Y*/
        public maxY:number=0;
        /**掉下X偏移*/
        public dropOffx:number=0;
        /**掉下Y*/
        public dropY:number=0;
        /**掉下时间 默认500毫秒*/
        public dropTime:number=500;
        /**最小缩放 范围1-100*/
        public minScale:number=50;
        /**最大缩放 范围1-100*/
        public maxScale:number=100;
        
        constructor(imgSkin:string,count:number){
            super();
            this.imgSkin = imgSkin;
            this.count = count;
            this.maxX = Define.DeviceW;
            this.maxY = Define.DeviceH>>1;
            this.dropY = Define.DeviceH;
        }
    }
}