var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        * 2019-04-16 andy
            场景管理
        */
        var SceneManager = /** @class */ (function () {
            function SceneManager() {
                /** 最后一次设备宽度 */
                this.lastClientWidth = 0;
                /**资源是否加载完成*/
                this.isGameResLoaded = false;
                /**横屏时装饰容器 2019-06-17*/
                this.spBody = null;
                /**横屏时屏幕缩放适度比例，一般竖屏游戏横屏时为0.5 */
                this.fillScale = 0.5;
                /**横屏时屏幕宽高比例 */
                this.fillRate = 0;
                /**横屏时屏幕等比缩放实际可视宽度,相对于Stage */
                this.fillRateWidth = 0;
                /**横屏时屏幕等比缩放实际可视长度,相对于Stage */
                this.fillRateHeight = 0;
                /** 2020-09-04 是否第一次点击场景 */
                this.firstClick = true;
                this.isLoopMap = false;
                this.loopMapCount = 0;
                this.loopMapWidth = 0;
                this.loopMapIndex = 0;
                if (SceneManager._ins != null)
                    throw new Error("SceneManager is single!");
            }
            Object.defineProperty(SceneManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SceneManager._ins = new SceneManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            SceneManager.prototype.init = function () {
                //2020-11-20
                Laya.stage.bgColor = game.Define.BACKGROUND_COLOR;
                this.scene = scene.LayerManager.ins.getLayer(scene.LayerName.scene);
                this.mapRoot = scene.LayerManager.ins.getLayer(scene.LayerName.scene_map);
                this.arrMap = [];
                KingManager.ins.init();
                BoneManager.ins.init();
                this.imgDefault = new Laya.Image();
                //2020-02-21 andy 设备屏幕转换不缩放,全屏
                if (game.Define.isSameBackgroundScale) {
                    scene.LayerManager.ins.addChild(this.imgDefault, scene.LayerName.scene_map);
                }
                else {
                    Laya.stage.addChildAt(this.imgDefault, 0);
                }
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
                Laya.stage.on(Laya.Event.FOCUS, this, this.onFocus);
                Laya.stage.on(Laya.Event.BLUR, this, this.onBlur);
                Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
                Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.onVisibilityChange);
                EventManager.ins.on(NoticeEvent.GAME_RES_LOAD_FINISH, this, this.GAME_RES_LOAD_FINISH);
                this.initStage();
            };
            //场景初始化
            SceneManager.prototype.initStage = function () {
                var _this = this;
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL, this, this.SCREEN_HORIZONTAL);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL, this, this.SCREEN_VERTICAL);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SCREEN_HORIZONTAL_ONSIZE);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SCREEN_VERTICAL);
                //stage横竖屏
                Laya.stage.screenMode = game.Define.screenMode == 1 ? Stage.SCREEN_VERTICAL : game.Define.screenMode == 2 ? Stage.SCREEN_HORIZONTAL : Stage.SCREEN_NONE;
                //stage缩放适配
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;//stage等于屏幕宽高，不会有滚动条
                //Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;//stage等于设计宽高，可能会有滚动条
                Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT; //铺满全屏
                // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;//最小缩放比显示完整，两边可能会有空白
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//固定宽度
                this.checkSize();
                //手机和平板之前切换处理，定时器检测
                Laya.timer.frameLoop(1, this, function () {
                    _this.checkSize();
                    _this.checkLoopMap();
                });
            };
            //-------Laya系统事件-------
            SceneManager.prototype.onResize = function () {
                if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                    //console.log("onResize 横屏");
                    game.Define.isVertitalState = false;
                    EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE);
                }
                else {
                    //console.log("onResize 竖屏");
                    game.Define.isVertitalState = true;
                    EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE);
                }
                //2020-08-18 andy ios的定时横竖屏事件有时不准，采用onsize
                if (Laya.Browser.onIOS) {
                    this.checkSize();
                }
                //Laya.stage.mouseX获取的是在state的坐标 所有你要Laya.stage.clientScaleX *Laya.stage.mouseX或者用Laya.MouseManager.instance.mouseX
            };
            //场景点击事件
            SceneManager.prototype.onClick = function (e) {
                if (this.firstClick) {
                    console.log("第一次点击场景");
                    //第一次进入试玩，系统会获得一次焦点
                    this.firstClick = false;
                    //2020-09-04 applovin渠道获得焦点时才可以有声音
                    if (PlatformManager.alPlatform != null) {
                        SoundManager.ins.setOn(true);
                        SoundManager.ins.playMusic(game.Define.SOUND_MAIN);
                    }
                }
                else {
                }
            };
            SceneManager.prototype.onFocus = function (e) {
                console.log("获得焦点");
                EventManager.ins.event(NoticeEvent.SYS_FOCUS, e);
                Laya.stage.timer.once(200, this, function () {
                    SoundManager.ins.playMusic(game.Define.SOUND_MAIN);
                });
            };
            SceneManager.prototype.onBlur = function (e) {
                console.log("失去焦点");
                EventManager.ins.event(NoticeEvent.SYS_BLUR, e);
            };
            //2019-10-28 andy 当用手机电源键锁屏开机时，没有屏保密码直接进入系统，onfoucs和onBlur事件无法获得
            SceneManager.prototype.onVisibilityChange = function (e) {
                console.log("舞台是否可见：" + Laya.stage.isVisibility);
                if (Laya.stage.isVisibility) {
                    this.onFocus(e);
                }
                else {
                    this.onBlur(e);
                }
            };
            SceneManager.prototype.GAME_RES_LOAD_FINISH = function (e) {
                this.isGameResLoaded = true;
                //2020-02-11
                this.checkScreenDirection();
            };
            //-------横竖屏自定义事件-------
            //定时器检测设备尺寸
            SceneManager.prototype.checkSize = function () {
                if (this.lastClientWidth != Laya.Browser.clientWidth) {
                    if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                        console.log("横屏__:" + Laya.Browser.clientWidth);
                        // if(Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || this.lastClientWidth==-1){
                        game.Define.isVertitalState = false;
                        EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL);
                        //Laya.stage.scaleMode = this.sacleModeH || Laya.Stage.SCALE_SHOWALL;
                        // }
                    }
                    else {
                        console.log("竖屏__:" + Laya.Browser.clientWidth);
                        // if(Laya.stage.scaleMode != Laya.Stage.SCALE_EXACTFIT  || this.lastClientWidth==-1){
                        game.Define.isVertitalState = true;
                        EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL);
                        //Laya.stage.scaleMode = this.sacleModeV || Laya.Stage.SCALE_EXACTFIT;
                        // }                     
                    }
                    this.lastClientWidth = Laya.Browser.clientWidth;
                    //console.log("this.lastClientWidth",this.lastClientWidth,Laya.Browser.clientHeight);
                    //console.log("Render.canvas.width",Render.canvas.width,Render.canvas.height);
                }
            };
            //横屏
            SceneManager.prototype.SCREEN_HORIZONTAL = function () {
                this.fillRate = (Laya.Browser.clientWidth / game.Define.DeviceW) / (Laya.Browser.clientHeight / game.Define.DeviceH);
                this.checkScreenDirection();
                this.fillRateHeight = game.Define.DeviceH / (this.fillRate * this.fillScale);
                this.fillRateWidth = this.fillRateHeight * game.Define.DeviceH / game.Define.DeviceW;
            };
            //竖屏
            SceneManager.prototype.SCREEN_VERTICAL = function () {
                this.fillRate = (Laya.Browser.clientWidth / game.Define.DeviceW) / (Laya.Browser.clientHeight / game.Define.DeviceH);
                this.checkScreenDirection();
                this.fillRateHeight = game.Define.DeviceW / (this.fillRate * this.fillScale);
                this.fillRateWidth = this.fillRateHeight * game.Define.DeviceW / game.Define.DeviceH;
            };
            /**2020-11-04 andy
             * 竖屏游戏等比缩放，横屏时root相对于stage的实际X
             * @param x
             */
            SceneManager.prototype.getRootStageX = function (x) {
                return x * this.fillScale;
            };
            /**2020-11-04 andy
             * 竖屏游戏等比缩放，横屏时root相对于stage的实际Y
             * @param y
             */
            SceneManager.prototype.getRootStageY = function (y) {
                return y * this.fillRate * this.fillScale;
            };
            /**2019-12-02 增加横屏游戏，检查屏幕方向 */
            SceneManager.prototype.checkScreenDirection = function () {
                if (game.Define.screenMode == 1 || game.Define.screenMode == 2) {
                    return;
                }
                if (game.Define.isVertitalGame == game.Define.isVertitalState) {
                    if (this.spBody) {
                        this.spBody.visible = false;
                    }
                    scene.LayerManager.ins.setScale(1);
                }
                else {
                    if (this.spBody) {
                        this.spBody.visible = true;
                    }
                    else {
                        this.fill();
                    }
                    //2020-08-19 自动横竖屏模式，默认不需要填充时，设置缩放比例，且是等比缩放
                    if (game.Define.screenFillType == ScreenFillType.default) {
                        game.Define.isSameScale = true;
                        scene.LayerManager.ins.setScale(game.Define.isVertitalGame ? game.Define.DeviceW / game.Define.DeviceH : game.Define.DeviceH / game.Define.DeviceW);
                    }
                    else {
                        scene.LayerManager.ins.setScale(0.5);
                    }
                }
            };
            //横屏
            SceneManager.prototype.SCREEN_HORIZONTAL_ONSIZE = function () {
                // if(Laya.stage.clientScaleX==1)return;
            };
            //-------横竖屏自动填充-------
            SceneManager.prototype.fill = function () {
                //如果是横屏，且资源加载完的情况才初始化
                if (!this.isGameResLoaded) {
                    return;
                }
                if (game.Define.screenFillType == ScreenFillType.default) {
                    return;
                }
                if (!this.spBody) {
                    this.spBody = new Laya.Sprite();
                    //LayerManager.ins.addChild(this.spBody,LayerName.root);
                    Laya.stage.addChild(this.spBody);
                    if (game.Define.isVertitalGame) {
                        this.spBody.graphics.drawRect(0, 0, game.Define.DeviceW >> 2, game.Define.DeviceH, game.Define.BACKGROUND_COLOR);
                        this.spBody.graphics.drawRect(game.Define.DeviceW * 0.75, 0, game.Define.DeviceW >> 2, game.Define.DeviceH, game.Define.BACKGROUND_COLOR);
                    }
                    else {
                        this.spBody.graphics.drawRect(0, 0, game.Define.DeviceW, game.Define.DeviceH >> 2, game.Define.BACKGROUND_COLOR);
                        this.spBody.graphics.drawRect(game.Define.DeviceH * 0.75, 0, game.Define.DeviceW, game.Define.DeviceH >> 2, game.Define.BACKGROUND_COLOR);
                    }
                    if (game.Define.screenFillType == ScreenFillType.simple) {
                        this.fillSimple();
                    }
                    else if (game.Define.screenFillType == ScreenFillType.nice1) {
                        this.fillNice1();
                    }
                    else if (game.Define.screenFillType == ScreenFillType.nice2) {
                        this.fillNice2();
                    }
                    else {
                    }
                    this.onResize();
                }
            };
            //填充simple
            SceneManager.prototype.fillSimple = function () {
                var scaleX = 0;
                var scaleY = 0;
                if (game.Define.isVertitalGame) {
                    //logo
                    var imgLogo = this.createLogo();
                    imgLogo.x = game.Define.DeviceW / 8;
                    imgLogo.y = game.Define.DeviceH >> 1;
                    //download
                    var imgDownload = this.createDownload();
                    imgDownload.x = game.Define.DeviceW * 0.75 + game.Define.DeviceW / 8;
                    imgDownload.y = game.Define.DeviceH >> 1;
                }
                else {
                    //logo
                    var imgLogo = this.createLogo();
                    imgLogo.x = game.Define.DeviceW >> 1;
                    imgLogo.y = game.Define.DeviceH / 8;
                    //download
                    var imgDownload = this.createDownload();
                    imgDownload.x = game.Define.DeviceW >> 1;
                    imgDownload.y = game.Define.DeviceH * 0.75 + game.Define.DeviceH / 8;
                }
            };
            //填充nice1
            SceneManager.prototype.fillNice1 = function () {
                var scaleX = 0;
                var scaleY = 0;
                //装饰
                if (Laya.loader.getRes("game/img_nice.png")) {
                    //2019-06-17 增加装饰
                    var imgNice = new Laya.Image();
                    imgNice.skin = "game/img_nice.png";
                    scaleX = (game.Define.DeviceW / 5) / imgNice.width;
                    scaleY = scaleX * this.fillRate;
                    imgNice.scaleX = scaleX;
                    imgNice.scaleY = scaleY;
                    imgNice.x = game.Define.DeviceW / 40;
                    imgNice.y = game.Define.DeviceH - imgNice.height * scaleY;
                    this.spBody.addChild(imgNice);
                    imgNice = new Laya.Image();
                    imgNice.skin = "game/img_nice.png";
                    imgNice.scaleX = scaleX;
                    imgNice.scaleY = scaleY;
                    imgNice.x = game.Define.DeviceW * 0.75 + game.Define.DeviceW / 40;
                    imgNice.y = game.Define.DeviceH - imgNice.height * scaleY;
                    this.spBody.addChild(imgNice);
                }
                this.fillSimple();
            };
            //填充nice2
            SceneManager.prototype.fillNice2 = function () {
                var scaleX = 0;
                var scaleY = 0;
                if (Laya.loader.getRes("game/img_nice.png")) {
                    //2019-06-17 左边
                    var imgNice = new Laya.Image();
                    imgNice.skin = "game/img_nice.png";
                    scaleX = 0.7; //(Define.DeviceW/4)/imgNice.width;
                    // scaleY= scaleX*rate;
                    imgNice.scaleX = scaleX;
                    // imgNice.scaleY=scaleY;
                    imgNice.x = imgNice.width * (1 - scaleX) / 2;
                    imgNice.y = 0;
                    this.spBody.addChild(imgNice);
                    //右边
                    imgNice = new Laya.Image();
                    imgNice.skin = "game/img_nice.png";
                    imgNice.scaleX = scaleX;
                    // imgNice.scaleY=scaleY;
                    imgNice.x = game.Define.DeviceW * 0.75 + imgNice.width * (1 - scaleX) / 2;
                    imgNice.y = 0;
                    this.spBody.addChild(imgNice);
                }
                this.fillSimple();
            };
            /**创建logo */
            SceneManager.prototype.createLogo = function () {
                var scaleX = 0;
                var scaleY = 0;
                var imgLogo = new Laya.Image();
                imgLogo.skin = game.Define.langId == LangType.En ? "loading/img_logo.png" : "loading/img_logo.png";
                imgLogo.anchorX = imgLogo.anchorY = 0.5;
                scaleX = (game.Define.DeviceW / 5) / imgLogo.width;
                scaleY = scaleX * this.fillRate;
                imgLogo.scaleX = scaleX;
                imgLogo.scaleY = scaleY;
                imgLogo.x = game.Define.DeviceW / 8;
                imgLogo.y = 0;
                this.spBody.addChild(imgLogo);
                return imgLogo;
            };
            /**创建download */
            SceneManager.prototype.createDownload = function (right) {
                if (right === void 0) { right = ""; }
                var scaleX = 0;
                var scaleY = 0;
                var imgDownload = new Laya.Image();
                imgDownload.skin = game.Define.langId == LangType.En ? "game/btn_download" + right + ".png" : "game/btn_download" + right + ".png";
                imgDownload.anchorX = imgDownload.anchorY = 0.5;
                scaleX = (game.Define.DeviceW / 5) / imgDownload.width;
                scaleY = scaleX * this.fillRate;
                imgDownload.scaleX = scaleX;
                imgDownload.scaleY = scaleY;
                imgDownload.x = game.Define.DeviceW / 8;
                imgDownload.y = 0;
                this.spBody.addChild(imgDownload);
                imgDownload.mouseEnabled = true;
                imgDownload.on(Laya.Event.CLICK, this, function () {
                    HttpManager.ins.link(game.Define.DOWNLOAD_URL);
                });
                return imgDownload;
            };
            //------场景扩展功能-------
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
                if (w === void 0) { w = -1; }
                if (h === void 0) { h = -1; }
                if (x > 0 || y > 0 || w > 0 || h > 0) {
                    var map = new Laya.Image();
                    map.x = x;
                    map.y = y;
                    if (w != -1)
                        map.width = w;
                    if (h != -1)
                        map.height = h;
                    Base64Manager.ins.checkImg(map, url);
                    //2020-02-21 andy 设备屏幕转换不缩放,全屏
                    if (game.Define.isSameBackgroundScale) {
                        scene.LayerManager.ins.addChild(map, scene.LayerName.scene_map);
                    }
                    else {
                        Laya.stage.addChildAt(map, 0);
                    }
                    this.arrMap.push(map);
                }
                else {
                    Base64Manager.ins.checkImg(this.imgDefault, url);
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
                while (this.mapRoot.numChildren > 0) {
                    this.mapRoot.getChildAt(0).removeSelf();
                }
                this.mapRoot.addChild(this.imgDefault);
            };
            /**
             * 设置地图块自动循环
             * @param isLoop
             */
            SceneManager.prototype.setLoopMap = function (isLoop) {
                this.isLoopMap = isLoop;
                this.loopMapCount = this.arrMap.length;
                this.loopMapWidth = this.arrMap[0].width;
            };
            SceneManager.prototype.checkLoopMap = function () {
                if (this.isLoopMap) {
                    var tempIndex = Math.ceil(this.scene.x / this.loopMapWidth);
                    if (tempIndex < this.loopMapIndex) {
                        this.loopMapIndex = tempIndex;
                        //地图像左
                        var firstMap = this.arrMap.shift();
                        this.arrMap.push(firstMap);
                        firstMap.x = (this.loopMapCount - tempIndex - 1) * this.loopMapWidth;
                    }
                    else if (tempIndex > this.loopMapIndex) {
                        this.loopMapIndex = tempIndex;
                        //地图像右
                        var lastMap = this.arrMap.pop();
                        this.arrMap.unshift(lastMap);
                        lastMap.x = (-tempIndex) * this.loopMapWidth;
                    }
                    else {
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
            };
            return SceneManager;
        }());
        scene.SceneManager = SceneManager;
        /**
         * 横屏时空白区域填充模式
         */
        var ScreenFillType;
        (function (ScreenFillType) {
            /**不填充 */
            ScreenFillType[ScreenFillType["default"] = 0] = "default";
            /**只有logo和下载按钮 */
            ScreenFillType[ScreenFillType["simple"] = 1] = "simple";
            /**logo，下载，两边各增加一个装饰图 */
            ScreenFillType[ScreenFillType["nice1"] = 2] = "nice1";
            /**logo，下载，两边全面填充 */
            ScreenFillType[ScreenFillType["nice2"] = 3] = "nice2";
        })(ScreenFillType = scene.ScreenFillType || (scene.ScreenFillType = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
