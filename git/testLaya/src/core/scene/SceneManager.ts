namespace game.scene{
    /*
    * 2019-04-16 andy
        场景管理
    */
    export class SceneManager{
        /**地图父容器 */
        private scene:Laya.Sprite;
        /**默认一个背景图 */
        private imgDefault:Laya.Image;
        private arrMap:Array<Laya.Image>;
        /**地图父容器 */
        private mapRoot:Laya.Sprite;
        /** 最后一次设备宽度 */
        private lastClientWidth:number=0;

        /**资源是否加载完成*/
        public isGameResLoaded:boolean=false;
        /**横屏时装饰容器 2019-06-17*/
        private spBody:Laya.Sprite=null;
        /**横屏时屏幕缩放适度比例，一般竖屏游戏横屏时为0.5 */
        public fillScale:number=0.5;
        /**横屏时屏幕宽高比例 */
        public fillRate:number=0;
        /**横屏时屏幕等比缩放实际可视宽度,相对于Stage */
        public fillRateWidth:number=0;
        /**横屏时屏幕等比缩放实际可视长度,相对于Stage */
        public fillRateHeight:number=0;

        /** 2020-09-04 是否第一次点击场景 */
        private firstClick:boolean = true;

        private static _ins:SceneManager;
        public static get ins():SceneManager{
            if(!this._ins)
                SceneManager._ins=new SceneManager();
            return this._ins;
        }
        constructor(){
            if(SceneManager._ins != null)
                throw new Error("SceneManager is single!");
        }

        public init(): void {
            //2020-11-20
            Laya.stage.bgColor= Define.BACKGROUND_COLOR;
            this.scene=LayerManager.ins.getLayer(LayerName.scene);
            this.mapRoot=LayerManager.ins.getLayer(LayerName.scene_map);
            this.arrMap=[];
            KingManager.ins.init();
            BoneManager.ins.init();

            this.imgDefault=new Laya.Image();
            //2020-02-21 andy 设备屏幕转换不缩放,全屏
            if(Define.isSameBackgroundScale){
                LayerManager.ins.addChild(this.imgDefault,LayerName.scene_map);
            }else{
                Laya.stage.addChildAt(this.imgDefault,0);
            }
            
            Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onClick);
            Laya.stage.on(Laya.Event.FOCUS,this,this.onFocus);
            Laya.stage.on(Laya.Event.BLUR,this,this.onBlur);
            Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
            Laya.stage.on(Laya.Event.VISIBILITY_CHANGE,this,this.onVisibilityChange);
            EventManager.ins.on(NoticeEvent.GAME_RES_LOAD_FINISH,this,this.GAME_RES_LOAD_FINISH);
            this.initStage();
        }
        //场景初始化
        private initStage():void{
            EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL,this,this.SCREEN_HORIZONTAL);
            EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL,this,this.SCREEN_VERTICAL);
            EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE,this,this.SCREEN_HORIZONTAL_ONSIZE);
            EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE,this,this.SCREEN_VERTICAL);
            
            //stage横竖屏
            Laya.stage.screenMode = Define.screenMode==1?Stage.SCREEN_VERTICAL:Define.screenMode==2?Stage.SCREEN_HORIZONTAL:Stage.SCREEN_NONE;

            //stage缩放适配
            //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;//stage等于屏幕宽高，不会有滚动条
            //Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;//stage等于设计宽高，可能会有滚动条
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;//铺满全屏
            // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;//最小缩放比显示完整，两边可能会有空白
            //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//固定宽度

            this.checkSize(); 
           //手机和平板之前切换处理，定时器检测
           Laya.timer.frameLoop(1,this,()=>{
                this.checkSize();  
                this.checkLoopMap();       
           })
        }
        

        //-------Laya系统事件-------
        private onResize():void{  
            if(Laya.Browser.clientWidth>Laya.Browser.clientHeight){
                //console.log("onResize 横屏");
                Define.isVertitalState=false;
                EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE);  
            }else{
                //console.log("onResize 竖屏");
                Define.isVertitalState=true;
                EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE);
            }
            //2020-08-18 andy ios的定时横竖屏事件有时不准，采用onsize
            if(Laya.Browser.onIOS){
                this.checkSize();
            }
            //Laya.stage.mouseX获取的是在state的坐标 所有你要Laya.stage.clientScaleX *Laya.stage.mouseX或者用Laya.MouseManager.instance.mouseX
        }
        //场景点击事件
        private onClick(e:Event):void{
            
            if(this.firstClick){
                console.log("第一次点击场景");
                //第一次进入试玩，系统会获得一次焦点
                this.firstClick=false;
                //2020-09-04 applovin渠道获得焦点时才可以有声音
                if(PlatformManager.alPlatform!=null){
                    SoundManager.ins.setOn(true);
                    SoundManager.ins.playMusic(Define.SOUND_MAIN);
                }
            }else{
                
            }
        }
        private onFocus(e:Event):void{
            console.log("获得焦点");
            
            EventManager.ins.event(NoticeEvent.SYS_FOCUS,e);
            Laya.stage.timer.once(200,this,()=>{
                SoundManager.ins.playMusic(Define.SOUND_MAIN);
            })
        }
        private onBlur(e:Event):void{
            console.log("失去焦点");
            EventManager.ins.event(NoticeEvent.SYS_BLUR,e);
            
        }
        //2019-10-28 andy 当用手机电源键锁屏开机时，没有屏保密码直接进入系统，onfoucs和onBlur事件无法获得
        private onVisibilityChange(e:Event):void{
            console.log("舞台是否可见："+Laya.stage.isVisibility);
            if (Laya.stage.isVisibility){
			    this.onFocus(e);
			}else {
			    this.onBlur(e);
		    }
        }
        private GAME_RES_LOAD_FINISH(e:Event):void{
            
            this.isGameResLoaded=true;
            //2020-02-11
            this.checkScreenDirection();
        }

        //-------横竖屏自定义事件-------
        //定时器检测设备尺寸
        private checkSize():void{
            if(this.lastClientWidth!=Laya.Browser.clientWidth){
                if(Laya.Browser.clientWidth>Laya.Browser.clientHeight){
                    console.log("横屏__:"+Laya.Browser.clientWidth);
                    // if(Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || this.lastClientWidth==-1){
                        Define.isVertitalState=false;
                        EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL); 
                        //Laya.stage.scaleMode = this.sacleModeH || Laya.Stage.SCALE_SHOWALL;
                    // }
                }else{
                    console.log("竖屏__:"+Laya.Browser.clientWidth);
                    // if(Laya.stage.scaleMode != Laya.Stage.SCALE_EXACTFIT  || this.lastClientWidth==-1){
                        Define.isVertitalState=true;
                        EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL);
                        //Laya.stage.scaleMode = this.sacleModeV || Laya.Stage.SCALE_EXACTFIT;
                    // }                     
                }
                this.lastClientWidth=Laya.Browser.clientWidth;
                //console.log("this.lastClientWidth",this.lastClientWidth,Laya.Browser.clientHeight);
                //console.log("Render.canvas.width",Render.canvas.width,Render.canvas.height);
            } 
        }
        //横屏
        private SCREEN_HORIZONTAL():void{
            this.fillRate= (Laya.Browser.clientWidth/Define.DeviceW)/(Laya.Browser.clientHeight/Define.DeviceH);
            this.checkScreenDirection();
            
            this.fillRateHeight = Define.DeviceH/(this.fillRate*this.fillScale);   
            this.fillRateWidth = this.fillRateHeight*Define.DeviceH/Define.DeviceW;        
        }
        //竖屏
        private SCREEN_VERTICAL():void{
            this.fillRate= (Laya.Browser.clientWidth/Define.DeviceW)/(Laya.Browser.clientHeight/Define.DeviceH);
            this.checkScreenDirection();

            this.fillRateHeight = Define.DeviceW/(this.fillRate*this.fillScale);
            this.fillRateWidth = this.fillRateHeight*Define.DeviceW/Define.DeviceH;
        }
        /**2020-11-04 andy
         * 竖屏游戏等比缩放，横屏时root相对于stage的实际X
         * @param x 
         */
        public getRootStageX(x:number):number{
            return x*this.fillScale;
        }
        /**2020-11-04 andy
         * 竖屏游戏等比缩放，横屏时root相对于stage的实际Y
         * @param y 
         */
        public getRootStageY(y:number):number{
            return y*this.fillRate*this.fillScale;
        }
        /**2019-12-02 增加横屏游戏，检查屏幕方向 */
        private checkScreenDirection():void{
            if(Define.screenMode==1||Define.screenMode==2){
                return;
            }
            
            
            if(Define.isVertitalGame == Define.isVertitalState){
                if(this.spBody){
                    this.spBody.visible=false;
                }
                LayerManager.ins.setScale(1);
            }else{
                if(this.spBody){
                    this.spBody.visible=true;
                }else{
                    this.fill();
                }
                
                //2020-08-19 自动横竖屏模式，默认不需要填充时，设置缩放比例，且是等比缩放
                if(Define.screenFillType == ScreenFillType.default){
                    Define.isSameScale=true;
                    LayerManager.ins.setScale(Define.isVertitalGame?Define.DeviceW/Define.DeviceH:Define.DeviceH/Define.DeviceW);
                }else{
                    LayerManager.ins.setScale(0.5);
                }
            }
        }
        //横屏
        private SCREEN_HORIZONTAL_ONSIZE():void{
            // if(Laya.stage.clientScaleX==1)return;
            
        }

        //-------横竖屏自动填充-------
        private fill():void{
            //如果是横屏，且资源加载完的情况才初始化
            if(!this.isGameResLoaded){
                return;
            }
            if(Define.screenFillType == ScreenFillType.default){
                return;
            }
            if(!this.spBody){
                this.spBody=new Laya.Sprite();
                //LayerManager.ins.addChild(this.spBody,LayerName.root);
                Laya.stage.addChild(this.spBody); 
                if(Define.isVertitalGame){
                    this.spBody.graphics.drawRect(0,0,Define.DeviceW>>2,Define.DeviceH,Define.BACKGROUND_COLOR);
                    this.spBody.graphics.drawRect(Define.DeviceW*0.75,0,Define.DeviceW>>2,Define.DeviceH,Define.BACKGROUND_COLOR);
                }else{
                    this.spBody.graphics.drawRect(0,0,Define.DeviceW,Define.DeviceH>>2,Define.BACKGROUND_COLOR);
                    this.spBody.graphics.drawRect(Define.DeviceH*0.75,0,Define.DeviceW,Define.DeviceH>>2,Define.BACKGROUND_COLOR);
                }

                if(Define.screenFillType == ScreenFillType.simple){
                    this.fillSimple();
                }else if(Define.screenFillType == ScreenFillType.nice1){
                    this.fillNice1();
                }else if(Define.screenFillType == ScreenFillType.nice2){
                    this.fillNice2();
                }else{

                }
                this.onResize();
            }
        }
        //填充simple
        private fillSimple():void{
            let scaleX:number=0;let scaleY:number=0;
            if(Define.isVertitalGame){
                //logo
                let imgLogo:Laya.Image=this.createLogo();
                imgLogo.x= Define.DeviceW/8;
                imgLogo.y=Define.DeviceH>>1;
                
                //download
                let imgDownload:Laya.Image=this.createDownload();
                imgDownload.x= Define.DeviceW*0.75+Define.DeviceW/8;
                imgDownload.y=Define.DeviceH>>1;
            }else{
                //logo
                let imgLogo:Laya.Image=this.createLogo();
                imgLogo.x=Define.DeviceW>>1;
                imgLogo.y= Define.DeviceH/8;
                
                //download
                let imgDownload:Laya.Image=this.createDownload();
                imgDownload.x= Define.DeviceW>>1;
                imgDownload.y=Define.DeviceH*0.75+Define.DeviceH/8;
            }
            
        }
        //填充nice1
        private fillNice1():void{
            let scaleX:number=0;let scaleY:number=0;
            //装饰
            if(Laya.loader.getRes("game/img_nice.png")){
                //2019-06-17 增加装饰
                let imgNice:Laya.Image=new Laya.Image();
                imgNice.skin="game/img_nice.png";
                scaleX= (Define.DeviceW/5)/imgNice.width;
                scaleY= scaleX*this.fillRate;
                imgNice.scaleX=scaleX;
                imgNice.scaleY=scaleY;
                imgNice.x= Define.DeviceW/40;
                imgNice.y=Define.DeviceH-imgNice.height*scaleY;
                this.spBody.addChild(imgNice);

                imgNice=new Laya.Image();
                imgNice.skin="game/img_nice.png";
                imgNice.scaleX=scaleX;
                imgNice.scaleY=scaleY;
                imgNice.x= Define.DeviceW*0.75+Define.DeviceW/40;
                imgNice.y=Define.DeviceH-imgNice.height*scaleY;
                this.spBody.addChild(imgNice);
            }
            
            this.fillSimple();
        }
        //填充nice2
        private fillNice2():void{
            let scaleX:number=0;let scaleY:number=0;
            if(Laya.loader.getRes("game/img_nice.png")){
                //2019-06-17 左边
                let imgNice:Laya.Image=new Laya.Image();
                imgNice.skin="game/img_nice.png";
                scaleX= 0.7;//(Define.DeviceW/4)/imgNice.width;
                // scaleY= scaleX*rate;
                imgNice.scaleX=scaleX;
                // imgNice.scaleY=scaleY;
                imgNice.x= imgNice.width*(1-scaleX)/2;
                imgNice.y=0;
                this.spBody.addChild(imgNice);

                //右边
                imgNice=new Laya.Image();
                imgNice.skin="game/img_nice.png";
                imgNice.scaleX=scaleX;
                // imgNice.scaleY=scaleY;
                imgNice.x= Define.DeviceW*0.75+imgNice.width*(1-scaleX)/2;
                imgNice.y=0;
                this.spBody.addChild(imgNice);
            }
            this.fillSimple();
        }

        /**创建logo */
        private createLogo():Laya.Image{
            let scaleX:number=0;let scaleY:number=0;
            let imgLogo:Laya.Image=new Laya.Image();
            imgLogo.skin=Define.langId == LangType.En?"loading/img_logo.png":"loading/img_logo.png";
            imgLogo.anchorX = imgLogo.anchorY = 0.5;
            scaleX= (Define.DeviceW/5)/imgLogo.width;
            scaleY= scaleX*this.fillRate;
            imgLogo.scaleX=scaleX;
            imgLogo.scaleY=scaleY;
            imgLogo.x= Define.DeviceW/8;
            imgLogo.y=0;
            this.spBody.addChild(imgLogo);
            return imgLogo;
        }
        /**创建download */
        private createDownload(right:string=""):Laya.Image{
            let scaleX:number=0;let scaleY:number=0;
            let imgDownload:Laya.Image=new Laya.Image();
            imgDownload.skin=Define.langId == LangType.En?"game/btn_download"+right+".png":"game/btn_download"+right+".png";
            imgDownload.anchorX = imgDownload.anchorY = 0.5;
            scaleX=(Define.DeviceW/5)/imgDownload.width;
            scaleY= scaleX*this.fillRate;
            imgDownload.scaleX=scaleX;
            imgDownload.scaleY=scaleY;
            imgDownload.x= Define.DeviceW/8;
            imgDownload.y=0;
            this.spBody.addChild(imgDownload);
            imgDownload.mouseEnabled=true;
            imgDownload.on(Laya.Event.CLICK,this,()=>{
                HttpManager.ins.link(Define.DOWNLOAD_URL);
            });
            return imgDownload;
        }
        
        //------场景扩展功能-------
        /**
         * 设置地图背景
         * @param url 图片路径
         * @param x  
         * @param y 
         * @param w  
         * @param h 
         */
        public setBackground(url:Base64Type,x:number=0,y:number=0,w:number=-1,h:number=-1):void{
            if(x>0 || y>0 || w>0 || h>0){
                let map:Laya.Image=new Laya.Image();
                map.x=x;
                map.y=y;
                if(w!=-1)map.width=w;
                if(h!=-1)map.height=h;
                Base64Manager.ins.checkImg(map,url);
                
                //2020-02-21 andy 设备屏幕转换不缩放,全屏
                if(Define.isSameBackgroundScale){
                    LayerManager.ins.addChild(map,LayerName.scene_map);
                }else{
                    Laya.stage.addChildAt(map,0);
                }
                this.arrMap.push(map);
            }else{
                Base64Manager.ins.checkImg(this.imgDefault,url);
            }
        }
        /**
         * 删除场景所有地图
         */
        public clearMapAll():void{
            for(let map of this.arrMap){
                map.removeSelf();
            }
            
            while(this.mapRoot.numChildren>0){
                this.mapRoot.getChildAt(0).removeSelf();
            }
            this.mapRoot.addChild(this.imgDefault);
        }
        private isLoopMap:boolean=false;
        private loopMapCount:number = 0;
        private loopMapWidth:number = 0;
        private loopMapIndex:number = 0;
        /**
         * 设置地图块自动循环
         * @param isLoop 
         */
        public setLoopMap(isLoop:boolean):void{
            this.isLoopMap=isLoop;
            this.loopMapCount = this.arrMap.length;
            this.loopMapWidth = this.arrMap[0].width;
        
        }
        private checkLoopMap():void{
            if(this.isLoopMap){
                let tempIndex:number = Math.ceil(this.scene.x/this.loopMapWidth);
                if(tempIndex <this.loopMapIndex){
                    this.loopMapIndex = tempIndex;
                    //地图像左
                    let firstMap:Laya.Image = this.arrMap.shift();
                    this.arrMap.push(firstMap);
                    firstMap.x = (this.loopMapCount-tempIndex-1)*this.loopMapWidth;
                    
                }else if(tempIndex >this.loopMapIndex){
                    this.loopMapIndex = tempIndex;
                     //地图像右
                    let lastMap:Laya.Image = this.arrMap.pop();
                    this.arrMap.unshift(lastMap);
                    lastMap.x = (-tempIndex)*this.loopMapWidth;
                }else{

                }
                

                // let tempIndex:number = Math.ceil(this.scene.x/this.loopMapWidth);
                // let showIndex:number = tempIndex% this.loopMapCount;
                // //地图像左
                // let isLeft:boolean;
                // if (tempIndex != this.loopMapIndex) {
                //     isLeft = tempIndex>this.loopMapIndex;
                //     this.loopMapIndex = tempIndex;
                    
                //     showIndex = Math.abs(tempIndex % this.loopMapCount);
                //     console.log("tempIndex",tempIndex);
                //     console.log("showIndex",showIndex);
                // }
                // else {
                //     return;
                // }
                // let lastMap:Laya.Image;
                // for(let i=showIndex;i<this.loopMapCount;i++){
                //     lastMap= this.arrMap[i];
                //     lastMap.x = (-tempIndex+i)*this.loopMapWidth;
                // }
                // for(let i=0;i<showIndex;i++){
                //     lastMap= this.arrMap[i];
                //     lastMap.x = (-tempIndex+(this.loopMapCount-showIndex))*this.loopMapWidth;
                // }
            }
        }

    }
    
    /**
     * 横屏时空白区域填充模式
     */
    export enum ScreenFillType{
        /**不填充 */
        default,
        /**只有logo和下载按钮 */
        simple,
        /**logo，下载，两边各增加一个装饰图 */
        nice1,
        /**logo，下载，两边全面填充 */
        nice2
    }
}
