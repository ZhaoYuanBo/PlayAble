var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-04-16 andy
            场景管理
        */
        var SceneManager = /** @class */ (function () {
            function SceneManager() {
                this.lastScreenMode = -1;
                this.lastClientWidth = -1;
                /**横屏时指定缩放模式*/
                this.sacleModeH = null;
                /**竖屏时指定缩放模式*/
                this.sacleModeV = null;
                /**横屏时logo图片 */
                this.imgLogo = null;
                /**横屏时下载按钮 */
                this.imgDownload = null;
                if (SceneManager._ins != null)
                    throw new Error("SceneManager is single!");
            }
            Object.defineProperty(SceneManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SceneManager._ins = new SceneManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            SceneManager.prototype.init = function () {
                this.arrMap = [];
                KingManager.ins.init();
                BoneManager.ins.init();
                this.imgDefault = new Laya.Image();
                common.LayerManager.ins.addChild(this.imgDefault, common.LayerName.scene_map);
                Laya.stage.on(Laya.Event.FOCUS, this, this.onFocus);
                Laya.stage.on(Laya.Event.BLUR, this, this.onBlur);
                Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
                common.EventManager.ins.on(common.NoticeEvent.GAME_RES_LOAD_FINISH, this, this.GAME_RES_LOAD_FINISH);
                this.initStage();
            };
            //场景初始化
            SceneManager.prototype.initStage = function () {
                var _this = this;
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_HORIZONTAL, this, this.SCREEN_HORIZONTAL);
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_VERTICAL, this, this.SCREEN_VERTICAL);
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SCREEN_HORIZONTAL_ONSIZE);
                common.EventManager.ins.on(common.NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SCREEN_VERTICAL);
                //stage横竖屏
                Laya.stage.screenMode = Stage.SCREEN_NONE; //默认
                //Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;//横屏
                //Laya.stage.screenMode = Stage.SCREEN_VERTICAL;//竖屏
                //stage缩放适配
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;//stage等于屏幕宽高，不会有滚动条
                //Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;//stage等于设计宽高，可能会有滚动条
                Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT; //铺满全屏
                // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;//最小缩放比显示完整，两边可能会有空白
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//固定宽度 
                //手机和平板之前切换处理
                Laya.timer.frameLoop(1, this, function () {
                    if (_this.lastClientWidth != Laya.Browser.clientWidth) {
                        if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                            console.log("横屏", _this.lastClientWidth);
                            if (Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || _this.lastClientWidth == -1) {
                                common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_HORIZONTAL);
                                //Laya.stage.scaleMode = this.sacleModeH || Laya.Stage.SCALE_SHOWALL;
                            }
                        }
                        else {
                            console.log("竖屏", _this.lastClientWidth);
                            if (Laya.stage.scaleMode != Laya.Stage.SCALE_EXACTFIT || _this.lastClientWidth == -1) {
                                common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_VERTICAL);
                                //Laya.stage.scaleMode = this.sacleModeV || Laya.Stage.SCALE_EXACTFIT;
                            }
                        }
                        _this.lastClientWidth = Laya.Browser.clientWidth;
                        //console.log("this.lastClientWidth",this.lastClientWidth,Laya.Browser.clientHeight);
                        //console.log("Render.canvas.width",Render.canvas.width,Render.canvas.height);
                    }
                });
            };
            SceneManager.prototype.onResize = function () {
                if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                    //console.log("onResize 横屏");
                    common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE);
                }
                else {
                    //console.log("onResize 竖屏");
                    common.EventManager.ins.event(common.NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE);
                }
                //MatterManager.ins.onResize();
                //Laya.stage.mouseX获取的是在state的坐标 所有你要Laya.stage.clientScaleX *Laya.stage.mouseX或者用Laya.MouseManager.instance.mouseX
            };
            SceneManager.prototype.onFocus = function (e) {
                console.log("获得焦点");
                common.EventManager.ins.event(common.NoticeEvent.SYS_FOCUS, e);
            };
            SceneManager.prototype.onBlur = function (e) {
                console.log("失去焦点");
                common.EventManager.ins.event(common.NoticeEvent.SYS_BLUR, e);
            };
            SceneManager.prototype.GAME_RES_LOAD_FINISH = function (e) {
                this.createDownloadBtn();
            };
            //-------横竖屏自定义事件-------
            //横屏
            SceneManager.prototype.SCREEN_HORIZONTAL = function () {
                var div = document.getElementById("h_div");
                if (div) {
                    div.style.display = "";
                }
                if (this.imgLogo) {
                    this.imgLogo.visible = true;
                }
                if (this.imgDownload) {
                    this.imgDownload.visible = true;
                }
                common.LayerManager.ins.setScale(0.5);
            };
            //竖屏
            SceneManager.prototype.SCREEN_VERTICAL = function () {
                var div = document.getElementById("h_div");
                if (div) {
                    div.style.display = "none";
                }
                if (this.imgLogo) {
                    this.imgLogo.visible = false;
                }
                if (this.imgDownload) {
                    this.imgDownload.visible = false;
                }
                common.LayerManager.ins.setScale(1);
            };
            //横屏
            SceneManager.prototype.SCREEN_HORIZONTAL_ONSIZE = function () {
                // if(Laya.stage.clientScaleX==1)return;
                //this.createBodyDiv();
            };
            SceneManager.prototype.createBodyDiv = function () {
                var div = document.getElementById("h_div");
                if (!div) {
                    document.body.style.backgroundColor = BodyDiv.H_BODY_BACKGROUND_COLOR;
                    div = document.createElement("div");
                    div.id = "h_div";
                    //div.style.zIndex=0;
                    div.style.position = "absolute";
                    div.style.left = "0px";
                    div.style.bottom = "100px";
                    div.style.height = "100px";
                    document.body.appendChild(div);
                    if (BodyDiv.H_BASE64_LOGO != "") {
                        var imgLogo = document.createElement("img");
                        imgLogo.src = BodyDiv.H_BASE64_LOGO;
                        div.appendChild(imgLogo);
                    }
                    if (BodyDiv.H_BASE64_DOWNLOAD != "") {
                        var imgDownload = document.createElement("img");
                        imgDownload.id = "btnDownLoad";
                        imgDownload.src = BodyDiv.H_BASE64_DOWNLOAD;
                        //imgDownload.width=imgDownload.width*Laya.stage.clientScaleX;
                        //imgDownload.height=imgDownload.height*Laya.stage.clientScaleX;
                        Laya.timer.once(50, this, function () {
                            imgDownload.style.marginLeft = (Laya.Browser.clientWidth - imgDownload.width) + "px";
                        });
                        imgDownload.onclick = function () { HttpManager.ins.link(game.Define.DOWNLOAD_URL); };
                        div.appendChild(imgDownload);
                    }
                }
                else {
                    if (div) {
                        div.style.display = "";
                        var btnDownLoad = document.getElementById("btnDownLoad");
                        if (btnDownLoad) {
                            btnDownLoad.style.marginLeft = (Laya.Browser.clientWidth - btnDownLoad.width) + "px";
                        }
                    }
                }
            };
            SceneManager.prototype.createDownloadBtn = function () {
                if (!this.imgLogo) {
                    this.imgLogo = new Laya.Image();
                    this.imgLogo.skin = game.Define.langId == LangType.En ? "loading/logo.png" : "loading/logo.png";
                    this.imgLogo.x = 0;
                    this.imgLogo.y = 50;
                    var sacleX = (game.Define.DeviceW / 5) / this.imgLogo.width;
                    this.imgLogo.scaleX = sacleX;
                    common.LayerManager.ins.addChild(this.imgLogo, common.LayerName.root);
                    this.imgDownload = new Laya.Image();
                    this.imgDownload.skin = game.Define.langId == LangType.En ? "game/btnDownload.png" : "game/btnDownload_zh.png";
                    sacleX = (game.Define.DeviceW / 5) / this.imgDownload.width;
                    this.imgDownload.scaleX = sacleX;
                    this.imgDownload.x = (game.Define.DeviceW - this.imgDownload.width * sacleX);
                    this.imgDownload.y = game.Define.DeviceH - this.imgDownload.height - 50;
                    common.LayerManager.ins.addChild(this.imgDownload, common.LayerName.root);
                    this.imgDownload.mouseEnabled = true;
                    this.imgDownload.on(Laya.Event.CLICK, this, function () {
                        HttpManager.ins.link(game.Define.DOWNLOAD_URL);
                    });
                    this.onResize();
                }
            };
            /**
             * 设置地图背景
             * @param url 图片路径
             * @param x
             * @param y
             * @param w
             * @param h
             */
            SceneManager.prototype.setBackground = function (url, x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                if (x > 0 || y > 0 || w > 0 || h > 0) {
                    var map = new Laya.Image();
                    map.x = x;
                    map.y = y;
                    map.width = w;
                    map.height = h;
                    BASE64Manager.ins.autoCheck(map, url);
                    common.LayerManager.ins.addChild(map, common.LayerName.scene_map);
                    this.arrMap.push(map);
                }
                else {
                    BASE64Manager.ins.autoCheck(this.imgDefault, url);
                }
            };
            /**
             * 删除场景所有地图
             */
            SceneManager.prototype.clearMapAll = function () {
                for (var _i = 0, _a = this.arrMap; _i < _a.length; _i++) {
                    var map = _a[_i];
                    map.removeSelf();
                }
            };
            return SceneManager;
        }());
        common.SceneManager = SceneManager;
        /**
         * 横屏时左右两边留有空白，填充数据
         */
        var BodyDiv = /** @class */ (function () {
            function BodyDiv() {
            }
            /**横屏时Logo图片Base64数据，不填写则不处理 */
            BodyDiv.H_BASE64_LOGO = "";
            /**横屏时下载按钮Base64数据，不填写则不处理 */
            BodyDiv.H_BASE64_DOWNLOAD = "";
            /**横屏时背景色 */
            BodyDiv.H_BODY_BACKGROUND_COLOR = "#ffffff";
            return BodyDiv;
        }());
        common.BodyDiv = BodyDiv;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
