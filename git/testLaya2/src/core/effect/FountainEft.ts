namespace game.effect{
    /*
    * 喷泉特效
    2019-07-26 andy
    */
    export class FountainEft extends BaseEffect{
        //所有图片
        private arrImg:Array<Laya.Image>;
        //喷出的时间间隔，单位毫秒
        private oneSendTime:number=0;
        //喷出的时间间隔，单位毫秒
        private oneShowTime:number=0;
        //喷出最小X
        private minX:number=0;
        //喷出最大X
        private maxX:number=0;
        //喷出最小Y
        private minY:number=0;
        //喷出最大Y
        private maxY:number=0;
        //旋转度数
        private needRotation:number=0;

        constructor(isScene:boolean){
            super(isScene);
            this.arrImg=[];
        }
        /**执行一次 */
        protected init():void{
            
        }
        /**
         * 设置数据
         * @param arrSprite 
         * @param arrNumber [oneSendTime,minx,max,miny,maxy,oneShowTime,needRotation]
         * @param arrString [skin...]
         */
        public setData(arrSprite:Array<Sprite>,arrNumber:Array<number>=null,arrString:Array<string>=null):void{
            super.setData(arrSprite,arrNumber,arrString);

            if(arrNumber){
                this.oneSendTime = arrNumber.length>0?arrNumber[0]:10;
                this.minX = arrNumber.length>1?arrNumber[1]:0;
                this.maxX = arrNumber.length>2?arrNumber[2]:1;
                this.minY = arrNumber.length>3?arrNumber[3]:0;
                this.maxY = arrNumber.length>4?arrNumber[4]:1;
                this.oneShowTime = arrNumber.length>5?arrNumber[5]:200;
                this.needRotation = arrNumber.length>6?arrNumber[6]:0;
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

        /**播放特效 */
        public play():void{
            super.play();
            let halfX:number = Define.DeviceW>>1;
            
            Laya.timer.loop(this.oneSendTime,this,this.launch);
        }
        private launch():void{
            let randIndex:number = MathUtil.randomRange(0,this.arrString.length-1);
            let skin:string = this.arrString[randIndex];
            let img:Laya.Image=this.getImg();
            if(!img){
                img=new Laya.Image();
                img.anchorX=img.anchorY=0.5;
                img.skin= skin;
                this.arrImg.push(img);
            }
            img.x=0;img.y=0;
            this.addChild(img);

            let randY:number = MathUtil.randomRange(this.minY,this.maxY);
            let randX:number = MathUtil.randomRange(this.minX,this.maxX);
            randX= MathUtil.randomRange(0,1)==0?randX:-randX;
            img.x=MathUtil.randomRange(0,this.minX>>2);
            img.x= MathUtil.randomRange(0,1)==0?img.x:-img.x;
            Laya.Tween.to(img,{y:randY,rotation:this.needRotation*0.4},this.oneShowTime*0.3,Laya.Ease.cubicOut,Laya.Handler.create(this,()=>{
                
                Laya.Tween.to(img,{x:randX>>1,y:randY+50,rotation:this.needRotation*0.7},this.oneShowTime*0.4,Laya.Ease.cubicIn,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(img,{x:randX,y:0,rotation:this.needRotation},this.oneShowTime*0.3,Laya.Ease.cubicIn,Laya.Handler.create(this,()=>{
                        Laya.Tween.clearAll(img);
                        img.removeSelf();
                    }));
                }));
            }));
        }

        private getImg():Laya.Image{
            let ret:Laya.Image=null;
            for(let img of this.arrImg){
                if(img && !img.parent){
                    ret=img;
                    //console.log("缓存");
                    break;
                }
            }//console.log("arrImg.length",this.arrImg.length);
            return ret;
        }

        /**停止特效 */
        public stop():void{
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            super.stop();
            
            while(this.arrImg.length>0){
                let img:Laya.Image=this.arrImg.shift();
                Laya.Tween.clearAll(img);
                img.removeSelf();
            }
        }
    }
}