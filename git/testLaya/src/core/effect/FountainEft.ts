namespace game.effect{
    /*
    * 喷泉特效
    2019-07-26 andy
    */
    export class FountainEft extends BaseEffect{
        private data:FountainData;
        //所有图片
        private arrImg:Array<Laya.Image>;

        constructor(isScene:boolean){
            super(isScene);
            this.arrImg=[];
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
            this.data = effectData as FountainData;
            //单个皮肤，多种皮肤，直接使用arrString
            if(this.data.imgSkin){
                this.arrString=[];
                this.arrString.push(this.data.imgSkin);
            }
        }
        
        /**窗体打开 */
        public open():void{
            
        }
        /**窗体关闭 */
        public close():void{
            super.close();
            for(let img of this.arrImg){
                Laya.Tween.clearAll(img);
            }
        }

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            super.play(parent);
            Laya.timer.loop(this.data.oneSendTime,this,this.launch);
        }
        private launch():void{
            let randIndex:number = MathUtil.randomRange(0,this.arrString.length-1);
            let skin:string = this.arrString[randIndex];
            let img:Laya.Image=this.getImg(skin);
            this.addChild(img);
            //设置初始值
            img.x=MathUtil.randomRange(0,this.data.minX>>2);
            img.x= MathUtil.randomRange(0,1)==0?img.x:-img.x;
            img.y=0;
            img.scaleX=img.scaleY=0.8;
            img.alpha=0.6;
            //设置随机值
            let randX:number = MathUtil.randomRange(this.data.minX,this.data.maxX);
            randX= MathUtil.randomRange(0,1)==0?randX:-randX;  
            let randY:number = MathUtil.randomRange(this.data.minY,this.data.maxY);      
            Laya.Tween.to(img,{y:randY,rotation:this.data.needRotation*0.4,scaleX:1,scaleY:1,alpha:1},this.data.oneShowTime*0.3,Laya.Ease.cubicOut,Laya.Handler.create(this,()=>{
                Laya.Tween.to(img,{x:randX>>1,y:randY+50,rotation:this.data.needRotation*0.7},this.data.oneShowTime*0.4,Laya.Ease.cubicIn,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(img,{x:randX,y:0,rotation:this.data.needRotation},this.data.oneShowTime*0.3,Laya.Ease.cubicIn,Laya.Handler.create(this,()=>{
                        Laya.Tween.clearAll(img);
                        img.removeSelf();
                    }));
                }));
            }));
        }

        private getImg(skin:string):Laya.Image{
            let ret:Laya.Image=null;
            for(let img of this.arrImg){
                if(img && !img.parent){
                    ret=img;
                    //console.log("缓存");
                    break;
                }
            }//console.log("arrImg.length",this.arrImg.length);
            if(!ret){
                ret=new Laya.Image();
                ret.anchorX=ret.anchorY=0.5;
                ret.skin= skin;
                this.arrImg.push(ret);
            }
            return ret;
        }

        /**停止特效 */
        public stop():void{
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            super.stop();
            
            
        }
    }

    /*
    * 喷泉数据
    2020-01-10 andy
    */
    export class FountainData extends BaseEffectData{
        /**喷泉皮肤 多种皮肤请使用arrString*/  
        public imgSkin:string;
        /**发射的时间间隔 默认10毫秒*/  
        public oneSendTime:number=10;
        /**飞行的时间间隔 默认200毫秒*/
        public oneShowTime:number=200;
        /**喷出最小X*/
        public minX:number=0;
        /**喷出最大X*/
        public maxX:number=0;
        /**喷出最小Y*/
        public minY:number=0;
        /**喷出最大Y*/
        public maxY:number=0;
        /**旋转度数*/
        public needRotation:number=0;

        constructor(imgSkin:string){
            super();
            this.imgSkin = imgSkin;
            this.maxX = Define.DeviceW;
            this.maxY = Define.DeviceH;
        }
    }
}