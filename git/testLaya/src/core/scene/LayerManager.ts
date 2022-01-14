namespace game.scene{
    /*
    * 2019-04-07 andy
        层级管理
    */
    export class LayerManager{
        private dicLayer:Dictionary<Laya.Node>;

        private static _ins:LayerManager;
        public static get ins():LayerManager{
            if(!this._ins)
                LayerManager._ins=new LayerManager();
            return this._ins;
        }
        constructor(){
            if(LayerManager._ins != null)
                throw new Error("LayerManager is single!");
        }

        public init(): void {
            Global.root=Laya.stage.addChild(new Laya.Sprite()) as Sprite;
           
            //初始化层级
            this.dicLayer=new Dictionary<Laya.Sprite>();
            this.dicLayer.add(LayerName.root,Global.root);
            this.dicLayer.add(LayerName.scene,Global.root.addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.main,Global.root.addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.ui,Global.root.addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.top,Global.root.addChild(new Laya.Sprite()));

            this.dicLayer.add(LayerName.scene_map,this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.scene_king,this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.scene_effect,this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.ui_window,this.dicLayer.get(LayerName.ui).addChild(new Laya.Sprite()));
            this.dicLayer.add(LayerName.ui_effect,this.dicLayer.get(LayerName.ui).addChild(new Laya.Sprite()));

            EffectManager.ins.init();
        }
        /**
         * 此方法暂时不对外
         * @param scale 
         */
        public setScale(scale:number=1):void{
            SceneManager.ins.fillScale=scale;
            if(Define.isVertitalGame){//竖屏游戏
                //设置X坐标
                this.getLayer(LayerName.root).scaleX=scale;

                //横屏时Y是否同比缩放               
                if(Define.isSameScale){
                    if(scale==1){
                        this.getLayer(LayerName.root).scaleY=1;
                        let camera:Laya.Camera=Scene3DManager.ins.getCamera();
                        if(camera){
                            camera.aspectRatio=Define.DeviceW/Define.DeviceH;
                        }
                    }else{
                        let rate:number= SceneManager.ins.fillRate;
                        this.getLayer(LayerName.root).scaleY=scale*rate;

                        let camera:Laya.Camera=Scene3DManager.ins.getCamera();
                        if(camera){
                            camera.aspectRatio=scale*rate;
                        }                       
                    }
                }else{
                    //非等比剧中显示,x屏幕一半，y铺满，
                    this.getLayer(LayerName.root).x=(1-scale)*Define.DeviceW>>1;
                }      
            }else{//横屏游戏
                this.getLayer(LayerName.root).scaleY=scale;
                //this.getLayer(LayerName.root).y=(1-scale)*Define.DeviceH>>1;

                //横屏时Y是否同比缩放
                if(Define.isSameScale){
                    if(scale==1){
                        this.getLayer(LayerName.root).scaleX=1;
                        let camera:Laya.Camera=Scene3DManager.ins.getCamera();
                        if(camera){
                            camera.aspectRatio=Define.DeviceW/Define.DeviceH;
                        }
                    }else{
                        let rate:number= SceneManager.ins.fillRate;
                        this.getLayer(LayerName.root).scaleX=scale*rate;

                        let camera:Laya.Camera=Scene3DManager.ins.getCamera();
                        if(camera){
                            camera.aspectRatio=scale*rate;
                        }                       
                    }                   
                }else{
                    //非等比剧中显示,y屏幕一半，x铺满，
                    this.getLayer(LayerName.root).y=(1-scale)*Define.DeviceH>>1;
                }
            }
        }
        /**
         * 此方法暂时不对外
         * @param scale 
         */
        public setScaleY(rate:number=0):void{
            if(rate!=1){
                this.getLayer(LayerName.scene).scaleY*=rate;
                this.getLayer(LayerName.main).scaleY*=rate;
                this.getLayer(LayerName.ui).scaleY*=rate;
                this.getLayer(LayerName.top).scaleY*=rate;
            }else{
                this.getLayer(LayerName.scene).scaleY=1;
                this.getLayer(LayerName.main).scaleY=1;
                this.getLayer(LayerName.ui).scaleY=1;
                this.getLayer(LayerName.top).scaleY=1;
            }
        }
        
        /**
         * 添加显示对象
         * @param child 
         * @param layerNum 
         */
        public addChild(child: laya.ui.View|any,layerNum:LayerName = LayerName.root):any{
            if(layerNum == LayerName.root){
                return Global.root.addChild(child);
            } else {
                return this.dicLayer.get(layerNum).addChild(child); 
            }
        }
        /**
         * 删除显示对象
         * @param child 
         * @param layerNum 
         */
        public removeChild(child: laya.ui.View|any,layerNum:LayerName = LayerName.root):laya.display.Node{
            if(layerNum == LayerName.root){
                return Global.root.removeChild(child);
            } else {
                return this.dicLayer.get(layerNum).removeChild(child); 
            }
        }
        /**
         * 删除某层的全部对象
         * @param layerNum
         */
        public removeLayerAllChild(layerNum:LayerName):void{
            if(layerNum == LayerName.root){
                Global.root.removeChildren(4);
            } else {
                this.dicLayer.get(layerNum).removeChildren(); 
            }
        }

        /**
         * 添加显示对象
         * @param child 
         * @param layerNum 
         */
        public getLayer(layerNum:LayerName = LayerName.root):Laya.Sprite{
            if(layerNum == LayerName.root){
                return Global.root;
            } else {
                return this.dicLayer.get(layerNum) as Laya.Sprite; 
            }
        }
        /**
         *  在画布外面用原生js绘制一个DIV
         */
        public createBodyDiv():void{
        //     var div:any = document.getElementById("h_div");
        //     if (!div){
        //         document.body.style.backgroundColor=BodyDiv.H_BODY_BACKGROUND_COLOR;
        //         div = document.createElement("div");
        //         div.id = "h_div";
        //         //div.style.zIndex=0;
        //         div.style.position ="absolute";div.style.left ="0px";div.style.bottom ="100px";div.style.height ="100px";
        //         document.body.appendChild(div);
        //         if(BodyDiv.H_BASE64_LOGO!=""){
        //             var imgLogo:any = document.createElement("img");
        //             imgLogo.src= BodyDiv.H_BASE64_LOGO;
        //             div.appendChild(imgLogo);
        //         }
                
        //         if(BodyDiv.H_BASE64_DOWNLOAD!=""){
        //             var imgDownload:any = document.createElement("img");
        //             imgDownload.id="btnDownLoad";
        //             imgDownload.src= BodyDiv.H_BASE64_DOWNLOAD;
        //             //imgDownload.width=imgDownload.width*Laya.stage.clientScaleX;
        //             //imgDownload.height=imgDownload.height*Laya.stage.clientScaleX;
        //             Laya.timer.once(50,this,()=>{
        //                 imgDownload.style.marginLeft=(Laya.Browser.clientWidth-imgDownload.width)+"px";
        //             })
                    
        //             imgDownload.onclick= function (){HttpManager.ins.link(Define.DOWNLOAD_URL);};
        //             div.appendChild(imgDownload);
        //         }
        //     }else{
        //         if(div){
        //             div.style.display = "";
        //             var btnDownLoad:any = document.getElementById("btnDownLoad");
        //             if(btnDownLoad){
        //                 btnDownLoad.style.marginLeft=(Laya.Browser.clientWidth-btnDownLoad.width)+"px";
        //             }
        //         }
        //     }
        }
    }

    export enum LayerName{
        root,
        scene,
        scene_map,
        scene_king,
        scene_effect,
        main,
        ui,
        ui_window,
        ui_effect,
        top
    }

}
