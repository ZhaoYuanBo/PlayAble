namespace game.effect{
    /*
    * 空投掉落特效
    2020-01-03 andy
    */
    export class AirDropEft extends BaseEffect{
        private data:AirDropData;
        /**飞机皮肤 */
        public imgPlane:Laya.Image;
        /**降落伞皮肤 */
        public imgParachute:Laya.Image;
        /**降落伞影子皮肤 */
        public imgShadow:Laya.Image;
        /**掉落宝箱皮肤 */
        public imgDropBox:Laya.Image;

        constructor(isScene:boolean){
            super(isScene);
        }
        /**执行一次 */
        protected init():void{
            
        }

        /**
         * 设置数据
         * @param data BaseEffectData 
         */
        public setData(data:BaseEffectData):void{
            super.setData(data);
            this.data=data as AirDropData;
            
            if(this.data.shadowSkin){
                this.imgShadow = new Laya.Image(this.data.shadowSkin);
                this.imgShadow.anchorX = this.imgShadow.anchorY=0.5;
                this.imgShadow.visible=false;
                this.addChild(this.imgShadow);
            }
            if(this.data.parachuteSkin){
                this.imgParachute = new Laya.Image(this.data.parachuteSkin);
                this.imgParachute.anchorX = this.imgParachute.anchorY=0.5;
                this.imgParachute.visible=false;
                this.addChild(this.imgParachute);
            }
            if(this.data.planSkin){
                this.imgPlane = new Laya.Image(this.data.planSkin);
                this.imgPlane.anchorX = this.imgPlane.anchorY=0.5;
                this.imgPlane.rotation = this.data.planeRotate;
                this.imgPlane.visible=false;
                this.addChild(this.imgPlane);
            }
            
            if(this.data.dropBoxSkin){
                this.imgDropBox = new Laya.Image(this.data.dropBoxSkin);
                this.imgDropBox.anchorX = this.imgDropBox.anchorY=0.5;
                this.imgDropBox.visible=false;
                this.addChild(this.imgDropBox);
            }
        }
        /**窗体关闭 */
        public close():void{
            super.close();
            Laya.Tween.clearAll(this.imgPlane);
            Laya.Tween.clearAll(this.imgParachute);
            Laya.Tween.clearAll(this.imgShadow);
            Laya.Tween.clearAll(this.imgDropBox);
        }

        /**
         * 播放特效
         * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
         */
        public play(parent:any=null):void{
            super.play(parent);
            if(this.imgPlane){
                this.imgPlane.x= this.data.planeStartPoint.x;
                this.imgPlane.y= this.data.planeStartPoint.y;
                this.imgPlane.visible=true;
                Laya.Tween.to(this.imgPlane,{x:this.data.planeEndPoint.x,y:this.data.planeEndPoint.y},this.data.planeFlyTime,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    this.imgPlane.visible=false;
                }));
            }
            if(this.imgDropBox){
                this.imgDropBox.visible=false;
            }
            Laya.timer.once(this.data.parachuteDelayTime,this,()=>{
                this.imgParachute.x= this.data.parachuteStartPoint.x;
                this.imgParachute.y= this.data.parachuteStartPoint.y;
                this.imgParachute.scaleX = this.imgParachute.scaleY = this.data.parachuteStartScale;
                this.imgParachute.visible=true;
                Laya.Tween.to(this.imgParachute,{x:this.data.parachuteEndPoint.x,y:this.data.parachuteEndPoint.y,scaleX:this.data.parachuteEndScale,scaleY:this.data.parachuteEndScale},this.data.parachuteFlyTime,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    this.imgParachute.visible=false;
                    EventManager.ins.event(NoticeEvent.EFT_AIR_DROP_OVER);
                    //显示宝箱
                    if(this.imgDropBox){
                        this.imgDropBox.x=this.data.parachuteEndPoint.x;
                        this.imgDropBox.y=this.data.parachuteEndPoint.y;
                        this.imgDropBox.visible=true;
                    }
                }));

                this.imgShadow.x= this.data.shadowStartPoint.x;
                this.imgShadow.y= this.data.shadowStartPoint.y;
                this.imgShadow.scaleX = this.imgShadow.scaleY = this.data.shadowStartScale;
                this.imgShadow.visible=true;
                Laya.Tween.to(this.imgShadow,{x:this.data.parachuteEndPoint.x,y:this.data.parachuteEndPoint.y,scaleX:this.data.shadowEndScale,scaleY:this.data.shadowEndScale},this.data.parachuteFlyTime,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    this.imgShadow.visible=false;
                }));
            })
        }
        
        /**停止特效 */
        public stop():void{
            super.stop();
        }
    }


    /*
    * 空投数据
    2020-01-03 andy
    */
    export class AirDropData extends BaseEffectData{
        /**飞机皮肤 */
        public planSkin:string;
        /**飞机起始点 */
        public planeStartPoint:Laya.Point;
        /**飞机目标点 */
        public planeEndPoint:Laya.Point;
        /**飞机飞行时间 默认1000毫秒*/
        public planeFlyTime:number=1000;
        /**飞机旋转角度 默认0*/
        public planeRotate:number=0;

        /**降落伞皮肤 */
        public parachuteSkin:string;
        /**降落伞起始点 */
        public parachuteStartPoint:Laya.Point;
        /**降落伞目标点 影子，掉落宝箱公用 */
        public parachuteEndPoint:Laya.Point;
        /**降落伞空投延时时间 默认500毫秒*/
        public parachuteDelayTime:number=500;
        /**降落伞飞行时间 默认1000毫秒*/
        public parachuteFlyTime:number=1000;
        /**降落伞起始缩放 默认1*/
        public parachuteStartScale:number=1;
        /**降落伞目标缩放 默认1*/
        public parachuteEndScale:number=1;

        /**降落伞影子皮肤 */
        public shadowSkin:string;
        /**降落伞影子起始点 */
        public shadowStartPoint:Laya.Point;
        /**降落伞影子起始缩放 默认1*/
        public shadowStartScale:number=1;
        /**降落伞影子目标缩放 默认1*/
        public shadowEndScale:number=1;

        /**掉落宝箱皮肤 */
        public dropBoxSkin:string;

        /**
         * 
         * @param planSkin      飞机皮肤
         * @param parachuteSkin  降落伞皮肤
         * @param shadowSkin     降落伞皮肤
         * @param dropBoxSkin    掉落宝箱皮肤
         */
        constructor(planSkin:string,parachuteSkin:string,shadowSkin:string,dropBoxSkin:string){
            super();
            this.planSkin = planSkin;
            this.parachuteSkin = parachuteSkin;
            this.shadowSkin = shadowSkin;
            this.dropBoxSkin = dropBoxSkin;
            
            this.planeStartPoint = new Laya.Point(0,Define.DeviceH);
            this.planeEndPoint = new Laya.Point(Define.DeviceW,0);

            this.parachuteStartPoint = new Laya.Point(Define.DeviceW>>1,0);
            this.parachuteEndPoint = new Laya.Point(Define.DeviceW>>1,Define.DeviceH>>1);
            this.shadowStartPoint = new Laya.Point(Define.DeviceW>>1,Define.DeviceH);
        }
    }

}