var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        * 2019-04-07 andy
            层级管理
        */
        var LayerManager = /** @class */ (function () {
            function LayerManager() {
                if (LayerManager._ins != null)
                    throw new Error("LayerManager is single!");
            }
            Object.defineProperty(LayerManager, "ins", {
                get: function () {
                    if (!this._ins)
                        LayerManager._ins = new LayerManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            LayerManager.prototype.init = function () {
                game.Global.root = Laya.stage.addChild(new Laya.Sprite());
                //初始化层级
                this.dicLayer = new Dictionary();
                this.dicLayer.add(LayerName.root, game.Global.root);
                this.dicLayer.add(LayerName.scene, game.Global.root.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.main, game.Global.root.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.ui, game.Global.root.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.top, game.Global.root.addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.scene_map, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.scene_king, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.scene_effect, this.dicLayer.get(LayerName.scene).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.ui_window, this.dicLayer.get(LayerName.ui).addChild(new Laya.Sprite()));
                this.dicLayer.add(LayerName.ui_effect, this.dicLayer.get(LayerName.ui).addChild(new Laya.Sprite()));
                EffectManager.ins.init();
            };
            /**
             * 此方法暂时不对外
             * @param scale
             */
            LayerManager.prototype.setScale = function (scale) {
                if (scale === void 0) { scale = 1; }
                scene.SceneManager.ins.fillScale = scale;
                if (game.Define.isVertitalGame) { //竖屏游戏
                    //设置X坐标
                    this.getLayer(LayerName.root).scaleX = scale;
                    //横屏时Y是否同比缩放               
                    if (game.Define.isSameScale) {
                        if (scale == 1) {
                            this.getLayer(LayerName.root).scaleY = 1;
                            var camera = scene.Scene3DManager.ins.getCamera();
                            if (camera) {
                                camera.aspectRatio = game.Define.DeviceW / game.Define.DeviceH;
                            }
                        }
                        else {
                            var rate = scene.SceneManager.ins.fillRate;
                            this.getLayer(LayerName.root).scaleY = scale * rate;
                            var camera = scene.Scene3DManager.ins.getCamera();
                            if (camera) {
                                camera.aspectRatio = scale * rate;
                            }
                        }
                    }
                    else {
                        //非等比剧中显示,x屏幕一半，y铺满，
                        this.getLayer(LayerName.root).x = (1 - scale) * game.Define.DeviceW >> 1;
                    }
                }
                else { //横屏游戏
                    this.getLayer(LayerName.root).scaleY = scale;
                    //this.getLayer(LayerName.root).y=(1-scale)*Define.DeviceH>>1;
                    //横屏时Y是否同比缩放
                    if (game.Define.isSameScale) {
                        if (scale == 1) {
                            this.getLayer(LayerName.root).scaleX = 1;
                            var camera = scene.Scene3DManager.ins.getCamera();
                            if (camera) {
                                camera.aspectRatio = game.Define.DeviceW / game.Define.DeviceH;
                            }
                        }
                        else {
                            var rate = scene.SceneManager.ins.fillRate;
                            this.getLayer(LayerName.root).scaleX = scale * rate;
                            var camera = scene.Scene3DManager.ins.getCamera();
                            if (camera) {
                                camera.aspectRatio = scale * rate;
                            }
                        }
                    }
                    else {
                        //非等比剧中显示,y屏幕一半，x铺满，
                        this.getLayer(LayerName.root).y = (1 - scale) * game.Define.DeviceH >> 1;
                    }
                }
            };
            /**
             * 此方法暂时不对外
             * @param scale
             */
            LayerManager.prototype.setScaleY = function (rate) {
                if (rate === void 0) { rate = 0; }
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
            };
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.addChild = function (child, layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.root.addChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).addChild(child);
                }
            };
            /**
             * 删除显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.removeChild = function (child, layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.root.removeChild(child);
                }
                else {
                    return this.dicLayer.get(layerNum).removeChild(child);
                }
            };
            /**
             * 删除某层的全部对象
             * @param layerNum
             */
            LayerManager.prototype.removeLayerAllChild = function (layerNum) {
                if (layerNum == LayerName.root) {
                    game.Global.root.removeChildren(4);
                }
                else {
                    this.dicLayer.get(layerNum).removeChildren();
                }
            };
            /**
             * 添加显示对象
             * @param child
             * @param layerNum
             */
            LayerManager.prototype.getLayer = function (layerNum) {
                if (layerNum === void 0) { layerNum = LayerName.root; }
                if (layerNum == LayerName.root) {
                    return game.Global.root;
                }
                else {
                    return this.dicLayer.get(layerNum);
                }
            };
            /**
             *  在画布外面用原生js绘制一个DIV
             */
            LayerManager.prototype.createBodyDiv = function () {
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
            };
            return LayerManager;
        }());
        scene.LayerManager = LayerManager;
        var LayerName;
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
