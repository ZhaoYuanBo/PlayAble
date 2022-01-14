namespace game.scene{
    /*
    * 2019-04-16 andy
        场景管理
    */
    export class SceneManager{
        /**默认一个背景图 */
        private imgDefault:Laya.Image;
        private arrMap:Array<Laya.Image>;
        /**地图父容器 */
        private mapRoot:Laya.Sprite;
        
        private lastClientWidth:number=0;

        /**资源是否加载完成*/
        public isGameResLoaded:boolean=false;
        /**横屏时装饰容器 2019-06-17*/
        private spBody:Laya.Sprite=null;
        /**横屏时屏幕缩放适度比例，一般竖屏游戏横屏时为0.5 */
        public fillScale:number=0.5;
        /**横屏时屏幕宽高比例 */
        public fillRate:number=0;
        /**横屏时屏幕等比缩放实际可视长度 */
        public fillRateLength:number=0;

        private static _ins:SceneManager;
        public static get ins():SceneManager{
            if(!this._ins)
                SceneManager._ins=new SceneManager();
            return this._ins;
        }
        constructor(){
            if(SceneManager._ins != null)
                throw new Error("SceneManager is single!");
            this.imgDefault=new Laya.Image();
            LayerManager.ins.addChild(this.imgDefault,LayerName.scene_map);
        }

        public init(): void {
            this.mapRoot=LayerManager.ins.getLayer(LayerName.scene_map);
            this.arrMap=[];
            KingManager.ins.init();
            BoneManager.ins.init();

            Laya.stage.on(Laya.Event.FOCUS,this,this.onFocus);
            Laya.stage.on(Laya.Event.BLUR,this,this.onBlur);
            Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
            Laya.stage.on(Laya.Event.VISIBILITY_CHANGE,this,SceneManager.ins.onVisibilityChange);
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
            Laya.stage.screenMode = Stage.SCREEN_NONE;//默认
            //Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;//横屏
            //Laya.stage.screenMode = Stage.SCREEN_VERTICAL;//竖屏

            //stage缩放适配
            //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;//stage等于屏幕宽高，不会有滚动条
            //Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;//stage等于设计宽高，可能会有滚动条
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;//铺满全屏
            //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;//最小缩放比显示完整，两边可能会有空白
            //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//固定宽度 

            //布局
            Laya.stage.alignH=Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV=Laya.Stage.ALIGN_MIDDLE;

           //手机和平板之前切换处理
           Laya.timer.frameLoop(1,this,()=>{
               if(this.lastClientWidth!=Laya.Browser.clientWidth){
                    if(Laya.Browser.clientWidth>Laya.Browser.clientHeight){
                        console.log("横屏",this.lastClientWidth);
                        // if(Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || this.lastClientWidth==-1){
                            Define.isVertitalState=false;
                            EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL);  
                            //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                        // }
                    }else{
                        console.log("竖屏",this.lastClientWidth);
                        // if(Laya.stage.scaleMode != Laya.Stage.SCALE_EXACTFIT  || this.lastClientWidth==-1){
                            //Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
                            Define.isVertitalState=true;
                            EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL);
                        // }                     
                    }
                    this.lastClientWidth=Laya.Browser.clientWidth;
                    //console.log("this.lastClientWidth",this.lastClientWidth,Laya.Browser.clientHeight);
                    //console.log("Render.canvas.width",Render.canvas.width,Render.canvas.height);
               }           
           })
        }
        
        private onResize():void{  
            if(Laya.Browser.clientWidth>Laya.Browser.clientHeight){
                //console.log("onResize 横屏");
                EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE);  
            }else{
                //console.log("onResize 竖屏");
                EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE);
            }
            //MatterManager.ins.onResize();
            //Laya.stage.mouseX获取的是在state的坐标 所有你要Laya.stage.clientScaleX *Laya.stage.mouseX或者用Laya.MouseManager.instance.mouseX
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
            Laya.stage.bgColor= Define.BACKGROUND_COLOR;
            this.isGameResLoaded=true;
            this.fill();
        }

        //-------横竖屏自定义事件-------
        //横屏
        private SCREEN_HORIZONTAL():void{
            this.fillRate= (Laya.Browser.clientWidth/Define.DeviceW)/(Laya.Browser.clientHeight/Define.DeviceH);

            var div:any = document.getElementById("h_div");
            if (div){
                div.style.display = "";
            }
            if(this.spBody){
                this.spBody.visible=true;
            }else{
                this.fill();
            }
            if(Define.isVertitalGame){
                LayerManager.ins.setScale(0.5);
            }else{
                LayerManager.ins.setScale(1);
            }
            this.fillRateLength = Define.DeviceH/(this.fillRate*this.fillScale);
        }
        //竖屏
        private SCREEN_VERTICAL():void{
            this.fillRate= (Laya.Browser.clientWidth/Define.DeviceW)/(Laya.Browser.clientHeight/Define.DeviceH);
            
            var div:any = document.getElementById("h_div");
            if (div){
                div.style.display = "none";
            }
            if(this.spBody){
                this.spBody.visible=false;
            }
            
            if(Define.isVertitalGame){
                LayerManager.ins.setScale(1);
            }else{
                LayerManager.ins.setScale(0.5);
            }
            this.fillRateLength = Define.DeviceW/(this.fillRate*this.fillScale);
        }
        //横屏
        private SCREEN_HORIZONTAL_ONSIZE():void{
            //if(Laya.stage.clientScaleX==1)return;
            //LayerManager.ins.createBodyDiv(); 
        }
        private fill():void{
            //如果是横屏，且资源加载完的情况才初始化
            if(!this.isGameResLoaded || Laya.Browser.clientWidth<Laya.Browser.clientHeight){
                return;
            }
            if(!this.spBody){
                this.spBody=new Laya.Sprite();
                LayerManager.ins.addChild(this.spBody,LayerName.root);
                this.spBody.graphics.drawRect(0,0,Define.DeviceW>>2,Define.DeviceH,Define.BACKGROUND_COLOR);
                this.spBody.graphics.drawRect(Define.DeviceW*0.75,0,Define.DeviceW>>2,Define.DeviceH,Define.BACKGROUND_COLOR);

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
            //logo
            let imgLogo:Laya.Image=this.createLogo();
            //download
            let imgDownload:Laya.Image=this.createDownload();
            imgDownload.x= imgLogo.x;//(Define.DeviceW-imgDownload.width*sacleX);
            imgDownload.y=Define.DeviceH-imgDownload.height*scaleY-50;
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
            
            //logo
            let imgLogo:Laya.Image=this.createLogo();
            //download
            let imgDownload:Laya.Image=this.createDownload();
            imgDownload.x= imgLogo.x;
            imgDownload.y=Define.DeviceH-imgDownload.height*imgDownload.scaleY-50;

            //download 右边
            if((Define.langId == LangType.En && Laya.loader.getRes("game/btn_download2.png"))|| (Define.langId == LangType.Zh && Laya.loader.getRes("game/btn_download2_zh.png"))){
                imgDownload=this.createDownload("2");
                imgDownload.x= Define.DeviceW*0.75+Define.DeviceW/40;
                imgDownload.y=Define.DeviceH-imgDownload.height*imgDownload.scaleY-50;
            }
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
            //logo
            let imgLogo:Laya.Image=this.createLogo();
            imgLogo.y=(Define.DeviceH>>1)-(imgLogo.height*imgLogo.scaleY)/2;
            
            //download
            let imgDownload:Laya.Image=this.createDownload();
            imgDownload.x= Define.DeviceW*0.75+Define.DeviceW/40;
            imgDownload.y=(Define.DeviceH>>1)-(imgDownload.height*imgDownload.scaleY)/2;
        }

        /**创建logo */
        private createLogo():Laya.Image{
            let scaleX:number=0;let scaleY:number=0;
            let imgLogo:Laya.Image=new Laya.Image();
            imgLogo.skin=Define.langId == LangType.En?"loading/img_logo.png":"loading/img_logo.png";
            scaleX= (Define.DeviceW/5)/imgLogo.width;
            scaleY= scaleX*this.fillRate;
            imgLogo.scaleX=scaleX;
            imgLogo.scaleY=scaleY;
            imgLogo.x= Define.DeviceW/40;
            imgLogo.y=0;
            this.spBody.addChild(imgLogo);
            return imgLogo;
        }
        /**创建download */
        private createDownload(right:string=""):Laya.Image{
            let scaleX:number=0;let scaleY:number=0;
            let imgDownload:Laya.Image=new Laya.Image();
            imgDownload.skin=Define.langId == LangType.En?"game/btn_download"+right+".png":"game/btn_download"+right+"_zh.png";
            scaleX=(Define.DeviceW/5)/imgDownload.width;
            scaleY= scaleX*this.fillRate;
            imgDownload.scaleX=scaleX;
            imgDownload.scaleY=scaleY;
            imgDownload.x= Define.DeviceW/40;
            imgDownload.y=0;
            this.spBody.addChild(imgDownload);
            imgDownload.mouseEnabled=true;
            imgDownload.on(Laya.Event.CLICK,this,()=>{
                HttpManager.ins.link(Define.DOWNLOAD_URL);
            });
            return imgDownload;
        }
    
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
                
                LayerManager.ins.addChild(map,LayerName.scene_map);
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
