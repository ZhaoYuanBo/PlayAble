namespace game.effect{
    /*
    * 喷出星星特效
    2020-08-11 andy
    */
    export class OutStarEft extends BaseEffect{
        private data:OutStarData;
        //星星数组
        private arrStar:Array<Laya.Image>=null;

        constructor(isScene:boolean){
            super(isScene);
            this.arrStar=[];
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
            this.data = effectData as OutStarData;

            for(let i=0;i<this.data.count;i++){
                let img:Laya.Image = new Laya.Image(this.data.imgSkin);
                this.arrStar.push(img);
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
            
            let radis:number=0;
            let showCount:number = this.data.count;
            for(let i=0;i<showCount;i++){
                let img:Laya.Image = this.arrStar[i];
                img.visible=true;
                img.scaleX = img.scaleY = this.data.minScale;
                let radian:number = MathUtil.angleToRadian((360/showCount)*i);
                img.x = Math.cos(radian)*this.data.minRadis;
                img.y = Math.sin(radian)*this.data.minRadis;

                let toX:number=0;
                let toY:number=0;
                if(this.data.isRandRadis){
                    let randRadis:number = MathUtil.randomRange(this.data.minRadis,this.data.maxRadis);
                    toX = Math.cos(radian)*randRadis;
                    toY = Math.cos(radian)*randRadis;
                }else{
                    toX = Math.cos(radian)*this.data.maxRadis;
                    toY = Math.sin(radian)*this.data.maxRadis;
                }
                
                Laya.Tween.to(img,{x:toX,y:toY,alpha:0,rotation:this.data.rotation,scaleX:this.data.maxScale,scaleY:this.data.maxScale},this.data.flyTime,Laya.Ease.backIn,Laya.Handler.create(this,()=>{
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
    * 喷出星星数据
    2020-08-11 andy
    */
    export class OutStarData extends BaseEffectData{
        /**金币皮肤*/
        public imgSkin:string="";
        /**产生数量 默认8个*/
        public count:number=8;
        /**产生最小半径*/
        public minRadis:number=0;
        /**产生最大半径 默认100*/
        public maxRadis:number=100;
        /**是否随机半径*/
        public isRandRadis:boolean=false;
        /**旋转度数*/
        public rotation:number=0;
        /**飞行时间 默认500毫秒*/
        public flyTime:number=500;
        /**最小缩放 范围1*/
        public minScale:number=1;
        /**最大缩放 范围1*/
        public maxScale:number=1;
        
        
        constructor(imgSkin:string,count:number){
            super();
            this.imgSkin = imgSkin;
            this.count = count;
        }
    }
}