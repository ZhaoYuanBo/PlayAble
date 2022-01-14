namespace game.effect{
    /*
    * 等待特效
    2020-05-21 andy
    */
    export class WaitingEft extends BaseEffect{
        private data:WaitingData;
        //旋转图片
        private arrImg:Array<Laya.Image>=null;
        //是否缩放
        private isZoom:boolean;
        //缩放计时器
        private zoomTimer:number = 0;
        //图片数量
        private count:number=0;

        private radis:number=0;
        private angle:number = 0;



        constructor(isScene:boolean){
            super(isScene);
            this.arrImg=[];
        }
        /**执行一次 */
        protected init():void{
            Laya.timer.loop(1,this,this.update);
        }
        /**
         * 设置数据
         * @param effectData BaseEffectData
         */
        public setData(effectData:WaitingData):void{
            super.setData(effectData);
            this.data = effectData as WaitingData;

            this.count = this.data.arrNumber.length>>1;
            let radis:number=0;
            let angle:number = 0;
            let arr:Array<number>;
            for(let i=0;i<this.count;i++){
                radis = this.data.arrNumber[i*2];
                angle = this.data.arrNumber[i*2+1];
                let img:Laya.Image = new Laya.Image(this.data.skin+(i%this.data.skinCount+1)+".png");
                this.arrImg.push(img);
                img.anchorX = img.anchorY = 0.5;
                
                arr = this.getPosByAngle(radis,angle);
                img.x = arr[0];
                img.y= arr[1];
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
            
        }

        
        /**停止特效 */
        public stop():void{
            super.stop();
        }

        private update():void{
            if(this.isPlaying){
                if(this.isZoom){

                }else{
                    this.zoomTimer++;
                    if(this.zoomTimer>=this.data.zoomTime){
                        this.isZoom=true;
                        this.zoomTimer=0;
                    }
                    let arr:Array<number>;
                    for(let i=0;i<this.count;i++){
                        arr = this.addRotation(i,this.data.rotationSpeed);
                        let img:Laya.Image = this.arrImg[i];
                        img.x = arr[0];
                        img.y= arr[1];
                        if(this.isZoom){
                            Laya.Tween.to(img,{x:0,y:0,scaleX:0.5,scaleY:0.5},this.data.zoomSpeed,null,Laya.Handler.create(this,(img)=>{
                                let index:number = this.arrImg.indexOf(img);
                                arr = this.addRotation(index,90);
                                Laya.Tween.to(img,{x:arr[0],y:arr[1],scaleX:1,scaleY:1},this.data.zoomSpeed,null,Laya.Handler.create(this,(index)=>{
                                    if(index+1==this.count){
                                        this.isZoom=false;
                                    }
                                },[index]));
                            },[img]),i*5);
                        }
                    } 
                    
                }
                
            }
        }

        private addRotation(index:number,rotation:number):Array<number>{
            let radis:number = this.data.arrNumber[index*2];
            let angle:number = this.data.arrNumber[index*2+1];
            angle+=rotation;
            this.data.arrNumber[index*2+1] = angle;
            return this.getPosByAngle(radis,angle);
        }
        private getPosByAngle(radis:number,angle:number,):Array<number>{
            //计算弧度
            let radian:number = MathUtil.angleToRadian(angle);

            let x:number =  Math.cos(radian)*radis;
            let y:number =  Math.sin(radian)*radis;
            return [x,y];
        }
    }

    /*
    * 等待加载数据
    2020-05-21 andy
    */
    export class WaitingData extends BaseEffectData{
        /** 皮肤 */
        public skin:string="";
        /** 皮肤数量 */
        public skinCount:number=0;
        /**旋转速度 */
        public rotationSpeed:number=0;
        /**缩放速度,单位毫秒，默认200 */
        public zoomSpeed:number=0;
        /**缩放周期,单位毫秒，默认1000 */
        public zoomTime:number=0;
        
        constructor(skin:string,skinCount:number=1,rotationSpeed:number=1,zoomSpeed:number=200,zoomTime:number=1000){
            super();
            this.skin = skin;
            this.skinCount = skinCount;
            this.rotationSpeed = rotationSpeed;
            this.zoomSpeed = zoomSpeed;
            this.zoomTime = zoomTime;
        }
    }
}