namespace game.effect{
    /*
    * 图片切换特效
    2019-09-24 andy
    */
    export class ChangeImageEft extends BaseEffect{
        private data:ChangeImageData;
        /**图片列表*/
        private arrImg:Array<Laya.Image>=null;
        /**图片数量*/
        private imgCount:number=0;
        //
        private curIndex:number=0;
        //
        private curImg:Laya.Image=null;

        constructor(isScene:boolean){
            super(isScene);          
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
            this.data = effectData as ChangeImageData;

            let img:Laya.Image=null;
            this.arrImg=[];
            //显示图片
            for(let skin of this.data.arrString){
                img=new Laya.Image();
                img.anchorX=img.anchorY=0.5;
                img.skin= skin;
                this.addChild(img);
                this.arrImg.push(img);
            }
            this.imgCount= this.data.arrString.length;
            //显示坐标
            this.x= Define.DeviceW>>1;
            this.y= Define.DeviceH>>1;

            if(this.data.changeTime<=0)this.data.changeTime=1000;

        }
        /**窗体关闭 */
        public close():void{
            super.close();
            Laya.Tween.clearAll(this.curImg);
        }

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            super.play(parent);
            
            if(!this.isPlaying){
                return;
            }
            Laya.timer.loop(this.data.changeTime,this,()=>{
                this.curIndex++;
                if(this.curIndex>=this.imgCount){
                    this.curIndex=0;
                }
                let img:Laya.Image;
                for(let i=0;i<this.imgCount;i++){
                    img=this.arrImg[i];
                    img.visible= i==this.curIndex;
                    if(img.visible){
                        this.curImg=img;
                    }
                }
                this.curImg.scaleX=this.curImg.scaleY=0.2;
                Laya.Tween.to(this.curImg,{scaleX:1.2,scaleY:1.2},200,Laya.Ease.linearInOut,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(this.curImg,{scaleX:1,scaleY:1},100,Laya.Ease.linearInOut,Laya.Handler.create(this,()=>{
                    
                    }))
                }))
            })

        }
        /**停止特效 */
        public stop():void{
            super.stop();
        }
    }

    /*
    * 喷泉数据
    2020-01-10 andy
    */
    export class ChangeImageData extends BaseEffectData{
        /**切换时间 单位毫秒,默认1000*/
        public changeTime:number=1000;

        constructor(){
            super();
        }
    }
}