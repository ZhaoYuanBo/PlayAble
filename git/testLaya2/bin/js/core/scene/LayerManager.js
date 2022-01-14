var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        * 2019-04-07 andy
            层级管理
        */
        class LayerManager {
            constructor() {
                if (LayerManager._ins != null)
                    throw new Error("LayerManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    LayerManager._ins = new LayerManager();
                return this._ins;
            }
            init() {
                game.Global.uiRoot = Laya.stage.addChild(new Laya.Sprite());
                //初始化层级 【laya2专用】
                this.dicLayer = new Dictionary();
                this.dicLayer.add(LayerName.root, game.Global.uiRoot);
                this.dicLayer.add(LayerName.scene, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.main, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.ui, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.top, game.Global.uiRoot.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.scene_map, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.scene_king, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.scene_effect, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.ui_window, this.dicLayer.get(LayerName.ui).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.ui_effect, this.dicLayer.get(LayerName.ui).addChild(new Laya.Sprite()));
            }
            /**
             * 此方法暂时不对外
             * @param scale
             */
            setScale(scale = 1) {
                scene.SceneManager.ins.fillScale = scale;
                if (game.Define.isVertitalGame) { //竖屏游戏
                    this.getLayer(LayerName.scene_king).scaleX = scale;
                    this.getLayer(LayerName.scene_effect).scaleX = scale;
                    this.getLayer(LayerName.main).scaleX = scale;
                    this.getLayer(LayerName.ui).scaleX = scale;
                    this.getLayer(LayerName.top).scaleX = scale;
                    this.getLayer(LayerName.scene_king).x = (1 - scale) * game.Define.DeviceW >> 1;
                    this.getLayer(LayerName.scene_effect).x = (1 - scale) * game.Define.DeviceW >> 1;
                    this.getLayer(LayerName.main).x = (1 - scale) * game.Define.DeviceW >> 1;
                    this.getLayer(LayerName.ui).x = (1 - scale) * game.Define.DeviceW >> 1;
                    this.getLayer(LayerName.top).x = (1 - scale) * game.Define.DeviceW >> 1;
                    if (game.Define.screenFillType != scene.ScreenFillType.default) {
                        this.getLayer(LayerName.scene_map).scaleX = scale;
                        this.getLayer(LayerName.scene_map).x = (1 - scale) * game.Define.DeviceW >> 1;
                    }
                    //横屏时Y是否同比缩放
                    if (game.Define.isSameScale) {
                        if (scale == 1) {
                            this.getLayer(LayerName.scene_map).scaleY = 1;
                            this.getLayer(LayerName.scene_king).scaleY = 1;
                            this.getLayer(LayerName.scene_effect).scaleY = 1;
                            this.getLayer(LayerName.main).scaleY = 1;
                            this.getLayer(LayerName.ui).scaleY = 1;
                            this.getLayer(LayerName.top).scaleY = 1;
                            let camera = scene.Scene3DManager.ins.camera;
                            if (camera) {
                                camera.aspectRatio = game.Define.DeviceW / game.Define.DeviceH;
                            }
                        }
                        else {
                            let rate = scene.SceneManager.ins.fillRate;
                            if (game.Define.isSameBackgroundScale) {
                                this.getLayer(LayerName.scene_map).scaleY = scale * rate;
                            }
                            this.getLayer(LayerName.scene_king).scaleY = scale * rate;
                            this.getLayer(LayerName.scene_effect).scaleY = scale * rate;
                            this.getLayer(LayerName.main).scaleY = scale * rate;
                            this.getLayer(LayerName.ui).scaleY = scale * rate;
                            this.getLayer(LayerName.top).scaleY = scale * rate;
                            let camera = scene.Scene3DManager.ins.camera;
                            if (camera) {
                                camera.aspectRatio = scale * rate;
                            }
                        }
                    }
                }
                else { //横屏游戏
                }
            }
            /**
             * 此方法暂时不对外
             * @param scale
             */
            setScaleY(rate = 0) {
                if (rate != 1) {
                    this.getLayer(LayerName.scene).scaleY *= rate;
                    this.getLayer(LayerName.main).scaleY *= rate;
                    this.getLayer(LayerName.ui).scaleY *= rate;
                    this.getLayer(LayerName.top).scaleY *= rate;
                }
                else {
                    this.getLayer(LayerName.scene).scaleY = 1;
                    this.getLayer(LayerName.main).scaleY = 1;
                    this.getLayer(LayerName.ui).scaleY = 1;
                    this.getLayer(LayerName.top).scaleY = 1;
                }
            }
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            addChild(child, layerNum = LayerName.root) {
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot.addChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).addChild(child);
                }
            }
            /**
             * 删除显示对象
             * @param child
             * @param layerNum
             */
            removeChild(child, layerNum = LayerName.root) {
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot.removeChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).removeChild(child);
                }
            }
            /**
             * 删除某层的全部对象
             * @param layerNum
             */
            removeLayerAllChild(layerNum) {
                if (layerNum == LayerName.root) {
                    game.Global.uiRoot.removeChildren(4);
                }
                else {
                    this.dicLayer.get(layerNum).removeChildren();
                }
            }
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            getLayer(layerNum = LayerName.root) {
                if (layerNum == LayerName.root) {
                    return game.Global.uiRoot;
                }
                else {
                    return this.dicLayer.get(layerNum);
                }
            }
            /**
             *  在画布外面用原生js绘制一个DIV
             */
            createBodyDiv() {
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
        scene.LayerManager = LayerManager;
        let LayerName;
        (function (LayerName) {
            LayerName[LayerName["root"] = 0] = "root";
            LayerName[LayerName["scene"] = 1] = "scene";
            LayerName[LayerName["scene_map"] = 2] = "scene_map";
            LayerName[LayerName["scene_king"] = 3] = "scene_king";
            LayerName[LayerName["scene_effect"] = 4] = "scene_effect";
            LayerName[LayerName["main"] = 5] = "main";
            LayerName[LayerName["ui"] = 6] = "ui";
            LayerName[LayerName["ui_window"] = 7] = "ui_window";
            LayerName[LayerName["ui_effect"] = 8] = "ui_effect";
            LayerName[LayerName["top"] = 9] = "top";
        })(LayerName = scene.LayerName || (scene.LayerName = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=LayerManager.js.map