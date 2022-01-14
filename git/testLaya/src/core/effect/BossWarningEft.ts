namespace game.effect{
    /*
    * Boss来袭出场特效
    2019-07-17 andy
    */
    export class BossWarningEft extends BaseEffect{
        private data:BossWarningData;
        //交叉线1
        private imgLine1:Laya.Image=null;
        //交叉线2
        private imgLine2:Laya.Image=null;
        //交叉线3
        private imgLine3:Laya.Image=null;
        //交叉线4
        private imgLine4:Laya.Image=null;
        //交叉线5
        private imgLine5:Laya.Image=null;
        //Boss头像
        private imgBoss:Laya.Image=null;
        //文字
        private lblWord:Laya.Label=null;

        constructor(isScene:boolean){
            super(isScene);
            this.imgLine1= new Laya.Image();
            this.addChild(this.imgLine1);
            this.imgLine2= new Laya.Image();
            this.addChild(this.imgLine2);
            this.imgLine3= new Laya.Image();
            this.addChild(this.imgLine3);
            this.imgLine4= new Laya.Image();
            this.addChild(this.imgLine4);
            this.imgLine5= new Laya.Image();
            this.addChild(this.imgLine5);
            this.imgBoss= new Laya.Image();
            this.imgBoss.anchorX=0.5;
            this.addChild(this.imgBoss);
            this.lblWord=new Laya.Label();
            this.lblWord.anchorX=0.5;
            this.lblWord.wordWrap=true;
            //this.lblWord.align = "center";  
            this.addChild(this.lblWord);
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
            this.data = effectData as BossWarningData;
    

            this.imgLine1.skin=this.data.line1Skin;
            this.imgLine2.skin=this.data.line2Skin;   
            this.imgLine3.skin=this.data.line1Skin;
            this.imgLine4.skin=this.data.line2Skin;
            this.imgLine5.skin=this.data.line1Skin;
            
            this.imgLine1.y=-this.imgLine1.height-this.imgLine2.height-(this.imgLine3.height>>1);
            this.imgLine2.y=this.imgLine1.y+this.imgLine1.height+this.data.linePadding;
            this.imgLine3.y=this.imgLine2.y+this.imgLine2.height+this.data.linePadding;
            this.imgLine4.y=this.imgLine3.y+this.imgLine3.height+this.data.linePadding;
            this.imgLine5.y=this.imgLine4.y+this.imgLine4.height+this.data.linePadding;
            
            this.imgBoss.skin=this.data.bossSkin;
            this.imgBoss.y= this.data.bossY;
            this.lblWord.text = this.data.word;
            this.lblWord.y= this.data.wordY;
            this.lblWord.width=this.data.wordW>0?this.data.wordW:this.lblWord.displayWidth;
            this.lblWord.height=this.data.wordH>0?this.data.wordH:this.lblWord.displayHeight;
            this.lblWord.fontSize= this.data.wordSize;
            this.lblWord.color = this.data.wordColor;
            this.lblWord.stroke= this.data.wordStroke;
            this.lblWord.strokeColor= this.data.wordStrokeColor;
        }
        
        /**窗体打开 */
        public open():void{
            
        }
        /**窗体关闭 */
        public close():void{
            super.close();
            Laya.Tween.clearAll(this.imgLine1);
            Laya.Tween.clearAll(this.imgLine2);
            Laya.Tween.clearAll(this.imgLine3);
            Laya.Tween.clearAll(this.imgLine4);
            Laya.Tween.clearAll(this.imgLine5);
            Laya.Tween.clearAll(this.imgBoss);
        }

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            super.play(parent);
            let halfX:number = Define.DeviceW>>1;
            this.imgBoss.x=Define.DeviceH;
            Laya.Tween.to(this.imgBoss,{x:halfX},700,null,Laya.Handler.create(this,()=>{
                Laya.Tween.to(this.imgBoss,{x:-this.imgBoss.width},200,null,Laya.Handler.create(this,()=>{
                    Laya.Tween.clearAll(this.imgBoss);
                    this.stop();
                }),800);
            }));
            if(this.lblWord.text!=""){
                this.lblWord.x=Define.DeviceH;
                Laya.Tween.to(this.lblWord,{x:halfX},700,null,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(this.lblWord,{x:-this.lblWord.width},200,null,Laya.Handler.create(this,()=>{
                        Laya.Tween.clearAll(this.lblWord);
                    }),800);
                }));
            }
            
            let time1:number=600,time2:number=600;
            this.lineMove(this.imgLine1,Define.DeviceH,-this.imgLine1.width,time1,time2,100);
            this.lineMove(this.imgLine2,-this.imgLine2.width,Define.DeviceH,time1,time2,200);
            this.lineMove(this.imgLine3,Define.DeviceH,-this.imgLine3.width,time1,time2,300);
            this.lineMove(this.imgLine4,-this.imgLine4.width,Define.DeviceH,time1,time2,400);
            this.lineMove(this.imgLine5,Define.DeviceH,-this.imgLine5.width,time1,time2,500);
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
    export class BossWarningData extends BaseEffectData{
        /**交叉线1皮肤 */
        public line1Skin:string;
        /**交叉线2皮肤 */
        public line2Skin:string;
        /**交叉线皮肤 垂直间距 默认20*/
        public linePadding:number=20;
        /**Boss皮肤 */
        public bossSkin:string;
        /**Boss皮肤 Y坐标*/
        public bossY:number=0;

        /**文字 */
        public word:string;
        /**文字 Y坐标*/
        public wordY:number=0;
        /**文字 宽*/
        public wordW:number=0;
        /**文字 高*/
        public wordH:number=0;
        /**文字 大小 默认30*/
        public wordSize:number=30;
        /**文字 颜色 默认#ffffff*/
        public wordColor:string="#ffffff";
        /**文字 描边 默认0*/
        public wordStroke:number=0;
        /**文字 描边颜色 默认#ffffff*/
        public wordStrokeColor:string="#ffffff";

        constructor(bossSkin:string,line1Skin:string,line2Skin:string,word:string){
            super();
            this.bossSkin = bossSkin;
            this.line1Skin = line1Skin;
            this.line2Skin = line2Skin;
            this.word = word;
        }
    }
}