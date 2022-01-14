var View = Laya.View;
var Dialog = Laya.Dialog;
//# sourceMappingURL=layaUI.max.all.js.map
var game;
(function (game) {
    var util;
    (function (util) {
        /*
        *2019-03-11 andy
        公用工具方法
        */
        class PubUtil {
            constructor() {
            }
            /**
             * 2019-03-11 得到今天的年月日
            */
            static GetTodayDateStr() {
                var date = new Date();
                return date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            }
        }
        util.PubUtil = PubUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=PubUtil.js.map
var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * 属性代理
        2019-08-14 andy
        */
        class ProxyUtil {
            constructor() {
            }
            /**
             * 属性增加事件
             * @param target   目标
             * @param propName 属性名字
             * @param callBack 回调函数
             */
            static regProxy(target, propName, callBack) {
                Object.defineProperty(target, propName, {
                    get: () => {
                        //console.log('get:'+target[propName]);
                        return target[propName];
                    },
                    set: (v) => {
                        //console.log('set:修改后的值'+v);
                        let old = target[propName];
                        target[propName] = v;
                        if (callBack) {
                            callBack(old, v);
                        }
                    }
                });
            }
            ;
        }
        util.ProxyUtil = ProxyUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=ProxyUtil.js.map
var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * name;
        */
        class MathUtil {
            constructor() {
            }
            /**
             * 随机产生一个范围的值
             * @param min 最小值
             * @param max 最大值
             */
            static randomRange(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            /**
             * 判断两个矩形是否有重叠区域
             * @param rect1 矩形1
             * @param rect2 矩形2
             */
            static isOverlap(rect1, rect2) {
                const startX1 = rect1.x, startY1 = rect1.y, endX1 = startX1 + rect1.width, endY1 = startY1 + rect1.height;
                const startX2 = rect2.x, startY2 = rect2.y, endX2 = startX2 + rect2.width, endY2 = startY2 + rect2.height;
                return !(endY2 < startY1 || endY1 < startY2 || startX1 > endX2 || startX2 > endX1);
            }
            ;
            /**
             * 角度转成弧度
             * @param angle 角度
             */
            static angleToRadian(angle) {
                return angle * Math.PI / 180;
            }
            /**
             * 弧度转成角度
             * @param radian 弧度
             */
            static radianToAngle(radian) {
                return radian * 180 / Math.PI;
            }
            /**
             * 把一般角度转换成0-360度
             * @param angle 角度
             */
            static changeAngle360(angle) {
                if (angle % 360 < 0) {
                    angle += 360;
                }
                return angle;
            }
            /**
             * 创建贝塞尔曲线
             * @param anchorpoints 点
             * @param pointsAmount
             */
            static CreateBezierPoints(anchorpoints, pointsAmount) {
                var points = [];
                for (var i = 0; i < pointsAmount; i++) {
                    var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                    points.push(point);
                }
                return points;
            }
            static MultiPointBezier(points, t) {
                let len = points.length;
                let x = 0, y = 0;
                for (let i = 0; i < len; i++) {
                    let point = points[i];
                    x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                    y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                }
                return { x: x, y: y };
            }
            static erxiangshi(start, end) {
                let cs = 1, bcs = 1;
                while (end > 0) {
                    cs *= start;
                    bcs *= end;
                    start--;
                    end--;
                }
                return (cs / bcs);
            }
            /**
             * 得到两个点之间的直线距离
             * @param p1 第一个点
             * @param p2 第二个点
             */
            static getDistance(p1, p2) {
                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                return distance;
            }
        }
        util.MathUtil = MathUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=MathUtil.js.map
/**
* name
*/
var game;
(function (game) {
    var util;
    (function (util) {
        class Dictionary {
            constructor() {
                this._container = new Object();
                this._length = 0;
            }
            get container() {
                return this._container;
            }
            get length() {
                return this._length;
            }
            /**
             * 添加元素
             * @param key
             * @param value
             *
             */
            add(key, value) {
                //如果是新添加才增加length
                if (!this.hasKey(key))
                    this._length++;
                this._container[key] = value;
                return value;
            }
            forEach(func) {
                var boo;
                for (let i in this._container) {
                    boo = func(this._container[i]);
                    if (!boo) {
                        return;
                    }
                }
            }
            forIn(func) {
                for (let i in this._container) {
                    func(i);
                }
            }
            valueOf() {
                var values = [];
                for (let i in this._container) {
                    values.push(this._container[i]);
                }
                return values;
            }
            /**
             * 根据键值获取对象
             * @param key
             * @return
             *
             */
            get(key) {
                return this._container[key];
            }
            /**
             * 重新设置
             * @param key
             * @param value
             *
             */
            reset(key, value) {
                if (this.hasKey(key)) {
                    this._container[key] = value;
                }
                else {
                    console.log("ObjDictionary: warning you reset a not exist key");
                }
            }
            /**
             * 是否包含键
             * @param key
             * @return
             *
             */
            hasKey(key) {
                return this._container.hasOwnProperty(key);
            }
            /**
             * 移除键
             * @param key
             *
             */
            remove(key) {
                if (this._container.hasOwnProperty(key)) {
                    let value = this._container[key];
                    this._container[key] = null;
                    delete this._container[key];
                    this._length--;
                    return value;
                }
                return null;
            }
            /**
             *清除操作
             *
             */
            clear() {
                this._length = 0;
                this._container = null;
                this._container = new Object();
            }
        }
        util.Dictionary = Dictionary;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=Dictionary.js.map
var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * name;
        */
        class UIType {
            constructor(v, v2) {
                this.name = v;
                this.path = v2;
            }
        }
        ui.UIType = UIType;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=UIType.js.map
var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        *2019-06-19 andy
            屏幕缩放 UI适配
        */
        class UIScaleManager {
            constructor() {
                if (UIScaleManager._ins != null)
                    throw new Error("UIScaleManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    UIScaleManager._ins = new UIScaleManager();
                return this._ins;
            }
            /**
             * UI屏幕缩放适配初始化
             */
            init() {
                this.dicWindow = new Dictionary();
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SYS_SCREEN_HORIZONTAL_ONSIZE);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SYS_SCREEN_VERTICAL_ONSIZE);
                this.autoScale();
            }
            /**
             * 注册横竖屏时事件
             * @param name 窗体名字
             * @param scaleH 缩放UI横屏回调
             * @param scaleV 缩放UI竖屏回调
             */
            regUI(name, scaleH, scaleV) {
                if (!this.dicWindow) {
                    console.error("UIScaleManager.ts 未进行初始化！");
                    return;
                }
                let arrFunc = this.dicWindow.get(name);
                if (!arrFunc) {
                    arrFunc = new Array();
                    this.dicWindow.add(name, arrFunc);
                }
                arrFunc[0] = scaleH;
                arrFunc[1] = scaleV;
            }
            /**
             * 可以手动调用
             */
            autoScale() {
                if (game.Define.isVertitalState) {
                    this.SYS_SCREEN_VERTICAL_ONSIZE();
                }
                else {
                    this.SYS_SCREEN_HORIZONTAL_ONSIZE();
                }
            }
            SYS_SCREEN_HORIZONTAL_ONSIZE() {
                for (let arrFunc of this.dicWindow.valueOf()) {
                    if (arrFunc) {
                        if (arrFunc[0]) {
                            arrFunc[0]();
                        }
                    }
                }
            }
            SYS_SCREEN_VERTICAL_ONSIZE() {
                for (let arrFunc of this.dicWindow.valueOf()) {
                    if (arrFunc) {
                        if (arrFunc[1]) {
                            arrFunc[1]();
                        }
                    }
                }
            }
        }
        ui.UIScaleManager = UIScaleManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=UIScaleManager.js.map
var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 2019-02-27 andy
            界面管理
        */
        class UIManager {
            constructor() {
                if (UIManager._ins != null)
                    throw new Error("UIManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    UIManager._ins = new UIManager();
                return this._ins;
            }
            init() {
                //窗体顶层
                this.topView = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                this.topMask = new Laya.Sprite();
                this.topView.addChild(this.topMask);
                //初始化界面
                this.dicWindow = new Dictionary();
                //
                ui.UIScaleManager.ins.init();
            }
            getWindow(uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (!win) {
                    var cls = uiType.path;
                    win = new cls();
                    win.uiType = uiType;
                    this.dicWindow.add(uiType.name, win);
                }
                return win;
            }
            openWindow(uiType) {
                var win = this.getWindow(uiType);
                if (win.isOpen()) {
                    //console.log("窗体已经打开");
                }
                else {
                    LayerManager.ins.addChild(win.view, LayerName.ui_window);
                    if (uiType.name == "gameDownload") {
                        if (game.Global.platformId == PlatformID.Vg) {
                            if (parent) {
                                parent.postMessage('complete', '*');
                                console.log("vungle 调用 parent.postMessage('complete','*')");
                            }
                        }
                    }
                }
                return win;
            }
            closeWindow(uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (win) {
                    win.view.removeSelf();
                }
            }
            /**
             * 增加序列帧动画
             * @param frame
             */
            addFrameAnimation(frame, layer = LayerName.main) {
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(frame, layer);
                // }
                return frame;
            }
            /**
             * 删除序列帧动画
             * @param frame
             */
            removeFrameAnimation(frame) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                frame.removeSelf();
                // }
            }
            /**
             * 将窗体显示对象,增加到窗体最顶层
             * @param sp 显示对象
             */
            addTop(sp) {
                this.topView.addChild(sp);
            }
            /**
             * 绘制一个镂空的巨型区域，用于高亮引导
             * @param size {x:0,y:0,w:1,h:1} null清除
             * @param alpha 透明度
             */
            drawTopMask(size, alpha = 0.5) {
                let topMask = this.topMask;
                if (!size) {
                    topMask.graphics.clear();
                    return;
                }
                let x = size.x;
                let y = size.y;
                let w = size.w;
                let h = size.h;
                topMask.graphics.drawRect(0, 0, game.Define.DeviceW, y, "#000000");
                topMask.graphics.drawRect(0, y, x, h, "#000000");
                topMask.graphics.drawRect(x + w, y, game.Define.DeviceW - (x + w), h, "#000000");
                topMask.graphics.drawRect(0, y + h, game.Define.DeviceW, game.Define.DeviceH - (y + h), "#000000");
                topMask.alpha = alpha;
            }
            /**
             * 将声音按钮,增加到窗体最顶层
             * @param btnSound 按钮
             */
            addTopBtnSound(btnSound) {
                if (!btnSound) {
                    return;
                }
                LayerManager.ins.addChild(btnSound, LayerName.top);
                btnSound.on(Laya.Event.CLICK, this, () => {
                    if (btnSound.gray) {
                        btnSound.gray = false;
                        SoundManager.ins.setOn(true);
                    }
                    else {
                        btnSound.gray = true;
                        SoundManager.ins.setOn(false);
                    }
                });
            }
        }
        ui.UIManager = UIManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=UIManager.js.map
var game;
(function (game) {
    var ui;
    (function (ui_1) {
        /*
        2019-02-27 andy
        * UI基类
        */
        class BaseUI {
            constructor() {
                this.dicInitPosition = new Dictionary();
            }
            open() {
            }
            close() {
            }
            detory() {
            }
            /**
             * 记录初始坐标
             */
            recordInitPosition(ui) {
                if (ui instanceof Laya.View) {
                    for (let i = 0; i < ui.numChildren; i++) {
                        let child = ui.getChildAt(i);
                        this.dicInitPosition.add(child.name, new Laya.Point(child.x, child.y));
                    }
                }
                else {
                    this.dicInitPosition.add(ui.name, new Laya.Point(ui.x, ui.y));
                }
            }
            /**
             * 得到显示对象初始位置
             * @param name 显示对象
             */
            getInitPosition(name) {
                var point = this.dicInitPosition.get(name);
                if (!point) {
                    point = new Laya.Point();
                    //this.dicInitPosition.add(name,point);
                }
                return point;
            }
            /**
             * 得到两个显示对象的初始位置偏差X
             * @param sp1 显示对象1
             * @param sp2 显示对象2
             */
            getInitPositionOffX(sp1, sp2) {
                if (!sp1 || !sp2) {
                    return 0;
                }
                let p1 = this.getInitPosition(sp1.name);
                let p2 = this.getInitPosition(sp2.name);
                return p2.x - p1.x;
            }
            /**
             * 得到两个显示对象的初始位置偏差Y
             * @param sp1 显示对象1
             * @param sp2 显示对象2
             */
            getInitPositionOffY(sp1, sp2) {
                if (!sp1 || !sp2) {
                    return 0;
                }
                let p1 = this.getInitPosition(sp1.name);
                let p2 = this.getInitPosition(sp2.name);
                return p2.y - p1.y;
            }
            /**
             * 还原初始位置
             * @param sp 显示对象
             */
            resetInitPosition(sp) {
                var point = this.dicInitPosition.get(sp.name);
                if (point) {
                    sp.x = point.x;
                    sp.y = point.y;
                }
            }
            /**
             * 根据两个初始的位置偏差X,设置现在的位置X
             * @param sp1 参考对象1
             * @param sp2 得到对象2
             */
            setPositionByOffX(sp1, sp2) {
                if (!sp1 || !sp2) {
                    return;
                }
                let offX = this.getInitPositionOffX(sp1, sp2);
                sp2.x = sp1.x + offX;
            }
            /**
             * 根据两个初始的位置偏差Y,设置现在的位置Y
             * @param sp1 参考对象1
             * @param sp2 得到对象2
             */
            setPositionByOffY(sp1, sp2) {
                if (!sp1 || !sp2) {
                    return;
                }
                let offY = this.getInitPositionOffY(sp1, sp2);
                sp2.y = sp1.y + offY;
            }
        }
        ui_1.BaseUI = BaseUI;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseUI.js.map
var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        * 2019-04-16 andy
            场景管理
        */
        class SceneManager {
            constructor() {
                this.lastClientWidth = 0;
                /**资源是否加载完成*/
                this.isGameResLoaded = false;
                /**横屏时装饰容器 2019-06-17*/
                this.spBody = null;
                /**横屏时屏幕缩放适度比例，一般竖屏游戏横屏时为0.5 */
                this.fillScale = 0.5;
                /**横屏时屏幕宽高比例 */
                this.fillRate = 0;
                /**横屏时屏幕等比缩放实际可视长度 */
                this.fillRateLength = 0;
                if (SceneManager._ins != null)
                    throw new Error("SceneManager is single!");
                this.imgDefault = new Laya.Image();
                scene.LayerManager.ins.addChild(this.imgDefault, scene.LayerName.scene_map);
            }
            static get ins() {
                if (!this._ins)
                    SceneManager._ins = new SceneManager();
                return this._ins;
            }
            init() {
                this.mapRoot = scene.LayerManager.ins.getLayer(scene.LayerName.scene_map);
                this.arrMap = [];
                KingManager.ins.init();
                BoneManager.ins.init();
                Laya.stage.on(Laya.Event.FOCUS, this, this.onFocus);
                Laya.stage.on(Laya.Event.BLUR, this, this.onBlur);
                Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
                Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, SceneManager.ins.onVisibilityChange);
                EventManager.ins.on(NoticeEvent.GAME_RES_LOAD_FINISH, this, this.GAME_RES_LOAD_FINISH);
                this.initStage();
            }
            //场景初始化
            initStage() {
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL, this, this.SCREEN_HORIZONTAL);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL, this, this.SCREEN_VERTICAL);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SCREEN_HORIZONTAL_ONSIZE);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SCREEN_VERTICAL);
                //stage横竖屏
                Laya.stage.screenMode = Stage.SCREEN_NONE; //默认
                //Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;//横屏
                //Laya.stage.screenMode = Stage.SCREEN_VERTICAL;//竖屏
                //stage缩放适配
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;//stage等于屏幕宽高，不会有滚动条
                //Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;//stage等于设计宽高，可能会有滚动条
                Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT; //铺满全屏
                //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;//最小缩放比显示完整，两边可能会有空白
                //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//固定宽度 
                //布局
                Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
                Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
                //手机和平板之前切换处理
                Laya.timer.frameLoop(1, this, () => {
                    if (this.lastClientWidth != Laya.Browser.clientWidth) {
                        if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                            console.log("横屏", this.lastClientWidth);
                            // if(Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || this.lastClientWidth==-1){
                            game.Define.isVertitalState = false;
                            EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL);
                            //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                            // }
                        }
                        else {
                            console.log("竖屏", this.lastClientWidth);
                            // if(Laya.stage.scaleMode != Laya.Stage.SCALE_EXACTFIT  || this.lastClientWidth==-1){
                            //Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
                            game.Define.isVertitalState = true;
                            EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL);
                            // }                     
                        }
                        this.lastClientWidth = Laya.Browser.clientWidth;
                        //console.log("this.lastClientWidth",this.lastClientWidth,Laya.Browser.clientHeight);
                        //console.log("Render.canvas.width",Render.canvas.width,Render.canvas.height);
                    }
                });
            }
            onResize() {
                if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                    //console.log("onResize 横屏");
                    EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE);
                }
                else {
                    //console.log("onResize 竖屏");
                    EventManager.ins.event(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE);
                }
                //MatterManager.ins.onResize();
                //Laya.stage.mouseX获取的是在state的坐标 所有你要Laya.stage.clientScaleX *Laya.stage.mouseX或者用Laya.MouseManager.instance.mouseX
            }
            onFocus(e) {
                console.log("获得焦点");
                EventManager.ins.event(NoticeEvent.SYS_FOCUS, e);
                Laya.stage.timer.once(200, this, () => {
                    SoundManager.ins.playMusic(game.Define.SOUND_MAIN);
                });
            }
            onBlur(e) {
                console.log("失去焦点");
                EventManager.ins.event(NoticeEvent.SYS_BLUR, e);
            }
            //2019-10-28 andy 当用手机电源键锁屏开机时，没有屏保密码直接进入系统，onfoucs和onBlur事件无法获得
            onVisibilityChange(e) {
                console.log("舞台是否可见：" + Laya.stage.isVisibility);
                if (Laya.stage.isVisibility) {
                    this.onFocus(e);
                }
                else {
                    this.onBlur(e);
                }
            }
            GAME_RES_LOAD_FINISH(e) {
                Laya.stage.bgColor = game.Define.BACKGROUND_COLOR;
                this.isGameResLoaded = true;
                this.fill();
            }
            //-------横竖屏自定义事件-------
            //横屏
            SCREEN_HORIZONTAL() {
                this.fillRate = (Laya.Browser.clientWidth / game.Define.DeviceW) / (Laya.Browser.clientHeight / game.Define.DeviceH);
                var div = document.getElementById("h_div");
                if (div) {
                    div.style.display = "";
                }
                if (this.spBody) {
                    this.spBody.visible = true;
                }
                else {
                    this.fill();
                }
                if (game.Define.isVertitalGame) {
                    scene.LayerManager.ins.setScale(0.5);
                }
                else {
                    scene.LayerManager.ins.setScale(1);
                }
                this.fillRateLength = game.Define.DeviceH / (this.fillRate * this.fillScale);
            }
            //竖屏
            SCREEN_VERTICAL() {
                this.fillRate = (Laya.Browser.clientWidth / game.Define.DeviceW) / (Laya.Browser.clientHeight / game.Define.DeviceH);
                var div = document.getElementById("h_div");
                if (div) {
                    div.style.display = "none";
                }
                if (this.spBody) {
                    this.spBody.visible = false;
                }
                if (game.Define.isVertitalGame) {
                    scene.LayerManager.ins.setScale(1);
                }
                else {
                    scene.LayerManager.ins.setScale(0.5);
                }
                this.fillRateLength = game.Define.DeviceW / (this.fillRate * this.fillScale);
            }
            //横屏
            SCREEN_HORIZONTAL_ONSIZE() {
                //if(Laya.stage.clientScaleX==1)return;
                //LayerManager.ins.createBodyDiv(); 
            }
            fill() {
                //如果是横屏，且资源加载完的情况才初始化
                if (!this.isGameResLoaded || Laya.Browser.clientWidth < Laya.Browser.clientHeight) {
                    return;
                }
                if (!this.spBody) {
                    this.spBody = new Laya.Sprite();
                    scene.LayerManager.ins.addChild(this.spBody, scene.LayerName.root);
                    this.spBody.graphics.drawRect(0, 0, game.Define.DeviceW >> 2, game.Define.DeviceH, game.Define.BACKGROUND_COLOR);
                    this.spBody.graphics.drawRect(game.Define.DeviceW * 0.75, 0, game.Define.DeviceW >> 2, game.Define.DeviceH, game.Define.BACKGROUND_COLOR);
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
            }
            //填充simple
            fillSimple() {
                let scaleX = 0;
                let scaleY = 0;
                //logo
                let imgLogo = this.createLogo();
                //download
                let imgDownload = this.createDownload();
                imgDownload.x = imgLogo.x; //(Define.DeviceW-imgDownload.width*sacleX);
                imgDownload.y = game.Define.DeviceH - imgDownload.height * scaleY - 50;
            }
            //填充nice1
            fillNice1() {
                let scaleX = 0;
                let scaleY = 0;
                //装饰
                if (Laya.loader.getRes("game/img_nice.png")) {
                    //2019-06-17 增加装饰
                    let imgNice = new Laya.Image();
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
                //logo
                let imgLogo = this.createLogo();
                //download
                let imgDownload = this.createDownload();
                imgDownload.x = imgLogo.x;
                imgDownload.y = game.Define.DeviceH - imgDownload.height * imgDownload.scaleY - 50;
                //download 右边
                if ((game.Define.langId == LangType.En && Laya.loader.getRes("game/btn_download2.png")) || (game.Define.langId == LangType.Zh && Laya.loader.getRes("game/btn_download2_zh.png"))) {
                    imgDownload = this.createDownload("2");
                    imgDownload.x = game.Define.DeviceW * 0.75 + game.Define.DeviceW / 40;
                    imgDownload.y = game.Define.DeviceH - imgDownload.height * imgDownload.scaleY - 50;
                }
            }
            //填充nice2
            fillNice2() {
                let scaleX = 0;
                let scaleY = 0;
                if (Laya.loader.getRes("game/img_nice.png")) {
                    //2019-06-17 左边
                    let imgNice = new Laya.Image();
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
                //logo
                let imgLogo = this.createLogo();
                imgLogo.y = (game.Define.DeviceH >> 1) - (imgLogo.height * imgLogo.scaleY) / 2;
                //download
                let imgDownload = this.createDownload();
                imgDownload.x = game.Define.DeviceW * 0.75 + game.Define.DeviceW / 40;
                imgDownload.y = (game.Define.DeviceH >> 1) - (imgDownload.height * imgDownload.scaleY) / 2;
            }
            /**创建logo */
            createLogo() {
                let scaleX = 0;
                let scaleY = 0;
                let imgLogo = new Laya.Image();
                imgLogo.skin = game.Define.langId == LangType.En ? "loading/img_logo.png" : "loading/img_logo.png";
                scaleX = (game.Define.DeviceW / 5) / imgLogo.width;
                scaleY = scaleX * this.fillRate;
                imgLogo.scaleX = scaleX;
                imgLogo.scaleY = scaleY;
                imgLogo.x = game.Define.DeviceW / 40;
                imgLogo.y = 0;
                this.spBody.addChild(imgLogo);
                return imgLogo;
            }
            /**创建download */
            createDownload(right = "") {
                let scaleX = 0;
                let scaleY = 0;
                let imgDownload = new Laya.Image();
                imgDownload.skin = game.Define.langId == LangType.En ? "game/btn_download" + right + ".png" : "game/btn_download" + right + "_zh.png";
                scaleX = (game.Define.DeviceW / 5) / imgDownload.width;
                scaleY = scaleX * this.fillRate;
                imgDownload.scaleX = scaleX;
                imgDownload.scaleY = scaleY;
                imgDownload.x = game.Define.DeviceW / 40;
                imgDownload.y = 0;
                this.spBody.addChild(imgDownload);
                imgDownload.mouseEnabled = true;
                imgDownload.on(Laya.Event.CLICK, this, () => {
                    HttpManager.ins.link(game.Define.DOWNLOAD_URL);
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
            setBackground(url, x = 0, y = 0, w = -1, h = -1) {
                if (x > 0 || y > 0 || w > 0 || h > 0) {
                    let map = new Laya.Image();
                    map.x = x;
                    map.y = y;
                    if (w != -1)
                        map.width = w;
                    if (h != -1)
                        map.height = h;
                    Base64Manager.ins.checkImg(map, url);
                    scene.LayerManager.ins.addChild(map, scene.LayerName.scene_map);
                    this.arrMap.push(map);
                }
                else {
                    Base64Manager.ins.checkImg(this.imgDefault, url);
                }
            }
            /**
             * 删除场景所有地图
             */
            clearMapAll() {
                for (let map of this.arrMap) {
                    map.removeSelf();
                }
                while (this.mapRoot.numChildren > 0) {
                    this.mapRoot.getChildAt(0).removeSelf();
                }
                this.mapRoot.addChild(this.imgDefault);
            }
        }
        scene.SceneManager = SceneManager;
        /**
         * 横屏时空白区域填充模式
         */
        let ScreenFillType;
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
//# sourceMappingURL=SceneManager.js.map
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        /*
        * 2019-05-24 andy
            3D场景管理
        */
        class Scene3DManager {
            constructor() {
                /**射线显示 */
                this.debugSprites = new Array();
                if (Scene3DManager._ins != null)
                    throw new Error("Scene3DManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    Scene3DManager._ins = new Scene3DManager();
                return this._ins;
            }
            /**
             * 初始化3D场景
             * @param scene 摄像机名字设置为Unity默认名字： Main Camera
             */
            init(scene = null) {
                if (scene) {
                    this._scene3d = scene_1.LayerManager.ins.addChild(scene, scene_1.LayerName.scene_king);
                    this._camera = scene.getChildByName("Main Camera");
                    this._camera.aspectRatio = game.Define.DeviceW / game.Define.DeviceH;
                    this._light = scene.getChildByName("Directional Light");
                    console.log("使用Unity摄像机：", this._scene3d, this._camera, this._light);
                }
                else {
                    this._scene3d = scene_1.LayerManager.ins.addChild(new Laya.Scene3D(), scene_1.LayerName.scene_king);
                    //初始化照相机
                    this._camera = this._scene3d.addChild(new Laya.Camera(game.Define.DeviceW / game.Define.DeviceH, 0.1, 1000));
                    this._camera.transform.translate(new Laya.Vector3(0, 10, 1));
                    this._camera.transform.rotate(new Laya.Vector3(-5, 0, 0), true, false);
                    this._camera.clearFlag = Laya.BaseCamera.CLEARFLAG_NONE;
                    //this.camera.clearColor=null;
                    //camera.addComponent(CameraMoveScript);
                    //方向光
                    this._light = this._scene3d.addChild(new Laya.DirectionLight());
                    this._light.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
                    //矩阵前向量变成了-1.0，-1.0，-1.0
                    //不清楚是否识别01
                    let mat = this._light.transform.worldMatrix;
                    mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
                    this._light.transform.worldMatrix = mat;
                }
            }
            /**获得3D场景 */
            get scene3D() {
                if (!this._scene3d) {
                    console.error("Scene3DManager 未进行初始化!");
                }
                return this._scene3d;
            }
            /**获得摄像机 */
            get camera() {
                if (!this._camera) {
                    console.error("Scene3DManager 未进行初始化!");
                }
                return this._camera;
            }
            /**获得灯光 */
            get light() {
                if (!this._light) {
                    console.error("Scene3DManager 未进行初始化!");
                }
                return this._light;
            }
            /**
             * 绘制射线
             * @param from 起点
             * @param to   终点
             */
            drawRayLine(from, to) {
                if (this.debugSprites.length > 0) {
                    for (let i = 0, n = this.debugSprites.length; i < n; i++)
                        this.debugSprites[i].destroy();
                    this.debugSprites.length = 0;
                }
                var lineSprite = this._scene3d.addChild(new Laya.PixelLineSprite3D(1));
                //设置射线的起始点和颜色
                lineSprite.addLine(from, to, Laya.Color.RED, Laya.Color.RED);
                this.debugSprites.push(lineSprite);
            }
            addBox() {
                // var sX:number = Math.random()*0.75+0.25;
                // var sY:number = Math.random()*0.75+0.25;
                // var sZ:number = Math.random()*0.75+0.25;
                // //设置box模型
                // var box:Laya.MeshSprite3D = this.scene3d.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX,sY,sZ)))as Laya.MeshSprite3D;
                // //将box的模型赋予材质
                // box.meshRenderer.material = this.mat1;
                // //设置掉落位置
                // this.randPosition();
                // box.transform.position = this.tmpVector;
                // //设置旋转角度
                // this.tmpVector.setValue(Math.random()*360,Math.random()*360,Math.random()*360);
                // box.transform.rotationEuler = this.tmpVector;
                // //添加刚体组件
                // var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D);
                // var boxShape: Laya.BoxColliderShape = new Laya.BoxColliderShape(sX,sY,sZ);
                // rigidBody.colliderShape = boxShape;
                // //添加重力加速度
                // rigidBody.mass = 10;
                // this.setPhyzisController(box);
            }
            addSphere() {
                // var radius:number = Math.random() * 0.2 + 0.2;
                // var sphere: Laya.MeshSprite3D = this.scene3d.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(radius))) as Laya.MeshSprite3D;
                // sphere.meshRenderer.material = this.mat2;
                // this.randPosition();
                // sphere.transform.position = this.tmpVector;
                // var rigidBody:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
                // var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(radius);
                // rigidBody.colliderShape = sphereShape;
                // rigidBody.mass = 10;
                // this.setPhyzisController(sphere);
            }
            addCapsule() {
                // var raidius:number = Math.random() * 0.2 + 0.2;
                // var height:number = Math.random() * 0.5 + 0.8;
                // var capsule:Laya.MeshSprite3D = this.scene3d.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(raidius, height))) as Laya.MeshSprite3D;
                // capsule.meshRenderer.material = this.mat3;
                // this.randPosition();
                // capsule.transform.position = this.tmpVector;
                // this.tmpVector.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
                // capsule.transform.rotationEuler = this.tmpVector;
                // var rigidBody:Laya.Rigidbody3D = capsule.addComponent(Laya.Rigidbody3D);
                // var sphereShape:Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(raidius, height);
                // rigidBody.colliderShape = sphereShape;
                // rigidBody.mass = 10;
            }
            addCone() {
                // let raidius = Math.random() * 0.2 + 0.2;
                // let height = Math.random() * 0.5 + 0.8;
                // //创建圆锥MeshSprite3D
                // let cone = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCone(raidius, height));
                // this.scene3d.addChild(cone);
                // //设置材质
                // cone.meshRenderer.material = this.mat4;
                // //设置位置
                // this.randPosition();
                // cone.transform.position = this.tmpVector;
                // //创建刚体碰撞器
                // let rigidBody = cone.addComponent(Laya.Rigidbody3D);
                // //创建球型碰撞器
                // let coneShape = new Laya.ConeColliderShape(raidius, height);
                // //设置刚体碰撞器的形状
                // rigidBody.colliderShape = coneShape;
                // //设置刚体碰撞器的质量
                // rigidBody.mass = 10;	
            }
            addCylinder() {
                // let raidius = Math.random() * 0.2 + 0.2;
                // let height = Math.random() * 0.5 + 0.8;
                // //创建圆柱MeshSprite3D
                // let cylinder = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCylinder(raidius, height));
                // this.scene3d.addChild(cylinder);
                // //设置材质
                // cylinder.meshRenderer.material = this.mat5;
                // //设置位置
                // this.randPosition();
                // cylinder.transform.position = this.tmpVector;
                // //设置圆柱MeshSprite3D的欧拉角
                // this.tmpVector.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
                // cylinder.transform.rotationEuler = this.tmpVector;
                // //创建刚体碰撞器
                // let rigidBody = cylinder.addComponent(Laya.Rigidbody3D);
                // //创建球型碰撞器
                // let cylinderShape = new Laya.CylinderColliderShape(raidius, height);
                // //设置刚体碰撞器的形状
                // rigidBody.colliderShape = cylinderShape;
                // //设置刚体碰撞器的质量
                // rigidBody.mass = 10;
            }
        }
        scene_1.Scene3DManager = Scene3DManager;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=Scene3DManager.js.map
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
var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-04-09 andy
        网络通讯管理
        */
        class NetManager {
            constructor() {
                if (NetManager._ins != null)
                    throw new Error("NetManager is single!");
                NetManager._ins = this;
                this._socketDataEvent = new Dictionary();
            }
            static get ins() {
                if (!this._ins)
                    new NetManager();
                return this._ins;
            }
            /**初始化 */
            init() {
                console.log("serverIP", game.Define.serverIP, "serverPort", game.Define.serverPort);
                this.socket = io.connect(game.Define.serverIP + ":" + game.Define.serverPort);
                // 当接收到消息并且不是本机时生成聊天气泡
                this.socket.on(SocketIoEvent.message, this, this.onMessageReveived);
                //连接成功
                this.socket.on(SocketIoEvent.connect, this, this.onSocketOpen);
                //连接断开
                this.socket.on(SocketIoEvent.disconnect, this, this.onSocketClose);
                //错误
                this.socket.on(SocketIoEvent.error, this, this.onConnectError);
            }
            onSocketOpen(e = null) {
                console.log("与服务器连接成功");
                EventManager.ins.event(SocketIoEvent.connect, e);
            }
            onSocketClose(e = null) {
                console.log("与服务器连接断开");
                EventManager.ins.event(SocketIoEvent.disconnect, e);
            }
            onMessageReveived(message = null) {
                console.log("收到服务端message");
                if (message) {
                    console.log(message);
                }
                else if (message) {
                    console.log(new Laya.Byte(message).readUTFBytes());
                }
                //this.socket.input.clear();
                EventManager.ins.event(SocketIoEvent.message, message);
            }
            onConnectError(e = null) {
                console.log("error");
                EventManager.ins.event(SocketIoEvent.error, e);
            }
            /**
             * 发送message
             * @param data
             * @param fn
             */
            send(data, fn) {
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                this.socket.send(data);
            }
            /**
             * 发送emit
             * @param eventName
             * @param args
             */
            emit(eventName, ...args) {
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                // this.socket.emit(eventName,args);
            }
            /**
             * 添加网络事件观察者
             * @param eventName
             * @param _callback
             */
            registerNetEvent(eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    this._socketDataEvent.get(eventName).push(_callback);
                }
                else {
                    this._socketDataEvent.add(eventName, [_callback]);
                }
                this.socket.on(eventName, this, _callback.method.bind(_callback.caller));
            }
            /**
             * 删除网络事件观察者
             * @param eventName
             * @param _callback
             */
            unregisterNetEvent(eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    let arr = this._socketDataEvent.get(eventName);
                    if (arr.indexOf(_callback) >= 0) {
                        arr.splice(arr.indexOf(_callback));
                    }
                }
            }
            update() {
                while (this._socketDataEvent.length > 0) {
                    // 添加每帧处理封包数量上限【感觉应该根据帧频处理比较合理】
                    // if (this._socketDataEvent.length > 200)
                    // {     //大于200 加速处理
                    //     timesPerFrame = 360 / Define.frameRate;
                    // }
                    // else
                    // {
                    //     timesPerFrame = 180 / Define.frameRate;
                    // }
                    // if (processTimes <= timesPerFrame)
                    // {   //每秒处理180个包，帧率不一样每帧处理数量不同
                    //     processTimes++;
                    // }
                    // else
                    // {
                    //     processTimes = 0;
                    //     break;
                    // }
                    // lock (this._socketDataEvent)
                    // {
                    // this._socketDataEvent tmpNetMessageData = this._socketDataEvent.Dequeue();
                    // if (_socketDataEvent.ContainsKey(tmpNetMessageData.pid))
                    // {
                    //     _socketDataEvent[tmpNetMessageData.pid](tmpNetMessageData.data);
                    // }
                    // }
                }
            }
        }
        net.NetManager = NetManager;
        /**
         * socke.io系统事件
         */
        class SocketIoEvent {
        }
        /**连接成功 */
        SocketIoEvent.connect = "connect";
        /**连接失败 */
        SocketIoEvent.connect_error = "connect_error";
        /**连接超时 */
        SocketIoEvent.connect_timeout = "connect_timeout";
        /**重新连接成功 */
        SocketIoEvent.reconnect = "reconnect";
        /**失去连接 */
        SocketIoEvent.disconnect = "disconnect";
        /**发生错误 */
        SocketIoEvent.error = "error";
        /** */
        SocketIoEvent.message = "message";
        net.SocketIoEvent = SocketIoEvent;
        /**
         * // 发送给当前客户端
      socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    
      // 发送给所有客户端，除了发送者
      socket.broadcast.emit('broadcast', 'hello friends!');
    
      // 发送给同在 'game' 房间的所有客户端，除了发送者
      socket.to('game').emit('nice game', "let's play a game");
    
      // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
      socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");
    
      // 发送给同在 'game' 房间的所有客户端，包括发送者
      io.in('game').emit('big-announcement', 'the game will start soon');
    
      // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
      io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');
    
      // 发送给指定 socketid 的客户端（私密消息）
      socket.to(<socketid>).emit('hey', 'I just met you');
    
      // 包含回执的消息
      socket.emit('question', 'do you think so?', function (answer) {});
    
      // 不压缩，直接发送
      socket.compress(false).emit('uncompressed', "that's rough");
    
      // 如果客户端还不能接收消息，那么消息可能丢失
      socket.volatile.emit('maybe', 'do you really need it?');
    
      // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
      io.local.emit('hi', 'my lovely babies');
         */
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
//# sourceMappingURL=NetManager.js.map
var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-03-07 andy
        HTTP请求管理
        */
        class HttpManager {
            constructor() {
                if (HttpManager._ins != null)
                    throw new Error("HttpManager is single!");
                this.xhr = new Laya.HttpRequest;
                this.xhr.http.timeout = 50000;
                this.xhr.on(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
            }
            static get ins() {
                if (!this._ins)
                    HttpManager._ins = new HttpManager();
                return this._ins;
            }
            /**
             * 跳转到网页
             * @param url 跳转地址
             */
            link(url) {
                console.log("link-url:", url);
                switch (game.Global.platformId) {
                    case PlatformID.Wx:
                    case PlatformID.None:
                        Laya.Browser.window.location.href = url;
                        break;
                    case PlatformID.Al:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            TipManager.ins.showWord("Applovin does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Is:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.openStoreUrl");
                            PlatformManager.ins.actionCallBack(PlatformAction.DownLoad);
                            PlatformManager.mraid.openStoreUrl(url);
                        }
                        else {
                            TipManager.ins.showWord("IronSource does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Ut:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            TipManager.ins.showWord("Unity does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Gg:
                        if (Laya.Browser.window.ExitApi) {
                            Laya.Browser.window.ExitApi.exit();
                        }
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Fb:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            Laya.Browser.window.FbPlayableAd.onCTAClick();
                        }
                        else {
                            TipManager.ins.showWord("facebook does not support FbPlayableAd!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Vg:
                        if (parent) {
                            console.log("调用 parent.postMessage('download','*')");
                            parent.postMessage('download', '*');
                        }
                        else {
                            TipManager.ins.showWord("vungle does not support parent.postMessage!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.Ac:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.open");
                            PlatformManager.mraid.open(url);
                        }
                        else {
                            TipManager.ins.showWord("adcolony does not support mraid!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.mtg:
                        PlatformManager.ins.actionCallBack(PlatformAction.DownLoad);
                        break;
                    default:
                        break;
                }
            }
            /**
             * HTTP GET 访问
             * @param url
             * @param caller
             * @param callback
             */
            get(url, caller, callback) {
                this.caller = caller;
                this.callback = callback;
                this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
                this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
                this.xhr.send(url, null, 'get', 'text');
                return this;
            }
            /**
             * HTTP POST 访问
             * @param url
             * @param data
             * @param contentType
             * @param caller
             * @param callback
             */
            post(url, data, contentType, caller, callback) {
                this.caller = caller;
                this.callback = callback;
                this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
                this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
                if (contentType == null) {
                    this.xhr.send(url, data, 'post', 'text');
                }
                else {
                    this.xhr.send(url, data, 'post', 'text', ["content-type", contentType]);
                }
                return this;
            }
            onHttpRequestProgress(e) {
                console.log("onHttpRequestProgress" + e);
                EventManager.ins.event(NoticeEvent.HTTP_PROGRESS, e);
            }
            onHttpRequestError(e) {
                console.log("onHttpRequestError");
                this.callback.apply(this.caller, [{ state: 500, msg: e }]);
            }
            onHttpRequestComplete(e) {
                //console.log("onHttpRequestComplete");
                this.callback.apply(this.caller, [{ state: 200, data: this.xhr.data }]);
            }
        }
        net.HttpManager = HttpManager;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
//# sourceMappingURL=HttpManager.js.map
var game;
(function (game) {
    var king;
    (function (king_1) {
        /*
        * 2019-04-07 andy
            人物管理
        */
        class KingManager {
            constructor() {
                if (KingManager._ins != null)
                    throw new Error("KingManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    KingManager._ins = new KingManager();
                return this._ins;
            }
            init() {
                //初始化界面
                this.dicWindow = new Dictionary();
            }
            // public getWindow(uiType:UIType):any{
            //     var win:BaseWindow = this.dicWindow.get(uiType.name);
            //     if(!win){
            //         var cls = uiType.path;
            //         win = new cls();
            //         win.uiType=uiType;
            //         this.dicWindow.set(uiType.name,win);
            //     }
            //     return win;
            // }
            addKing(king) {
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(king, LayerName.scene_king);
                // }
                return king;
            }
            removeKing(king) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                king.removeSelf();
                // }
            }
        }
        king_1.KingManager = KingManager;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=KingManager.js.map
var game;
(function (game) {
    var king;
    (function (king) {
        var Templet = Laya.Templet;
        /*
        * 2019-04-07 andy
            骨骼动画管理
        */
        class BoneManager {
            constructor() {
                /**唯一标识ID */
                this.boneIndex = 10000;
                if (BoneManager._ins != null)
                    throw new Error("BoneManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    BoneManager._ins = new BoneManager();
                return this._ins;
            }
            init() {
                //模板
                this.dicTemp = new Dictionary();
                //缓存池
                this.dicBonePool = new Dictionary();
                this.dicBone = new Dictionary();
            }
            /**
             * 添加骨骼动画
             * @param Base64Type paramNum:模板创建类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装
             * @param isAutoPlay 是否自动播放，默认true
             * @param isLoop     是否循环播放，默认false
             * @param layerName  显示层级，默认scene_king
             */
            addBone(base64Type, isAutoPlay = true, isLoop = false, layerName = null) {
                let temp = null;
                if (this.dicTemp.hasKey(base64Type.name)) {
                    temp = this.dicTemp.get(base64Type.name);
                }
                else {
                    temp = new Templet();
                    this.dicTemp.add(base64Type.name, temp);
                }
                let bone = null;
                let objId = 0;
                if (temp.isParserComplete) {
                    bone = this.createBone(base64Type.name, base64Type.paramNum, isAutoPlay, isLoop, layerName);
                }
                else {
                    bone = new king.BaseBone(base64Type.name, base64Type.paramNum, isAutoPlay, isLoop, layerName);
                    //已经在加载了，请等待
                    if (temp.hasListener(Laya.Event.COMPLETE)) {
                        return bone;
                    }
                    if (Base64Manager.isUseBase64) {
                        Laya.loader.cacheRes(base64Type.id, Base64Manager.ins.base64ToUint8Array(base64Type.base64Json));
                    }
                    temp.on(Laya.Event.COMPLETE, this, this.parseComplete, [base64Type.name]);
                    temp.on(Laya.Event.ERROR, this, this.onError, [base64Type.paramNum]);
                    temp.loadAni(base64Type.id);
                }
                return bone;
            }
            onError(err) {
                console.log("error", err);
            }
            //模板加载完成
            parseComplete(data) {
                console.log("spine动画模板：" + data + " 加载完成！");
                EventManager.ins.event(NoticeEvent.BONE_TEMP_LOAD_FINISH, data);
            }
            createBone(boneName, cacheType = 0, isAutoPlay = true, isLoop = true, layerName = null) {
                let objId = 0;
                let bone = null;
                if (this.dicBonePool.hasKey(boneName)) {
                    let arrSk = this.dicBonePool.get(boneName);
                    if (arrSk && arrSk.length > 0) {
                        bone = arrSk.shift();
                        console.log("从缓存池取出：" + boneName + " 取出后还剩：" + arrSk.length);
                    }
                }
                //缓存池没有，则创建新的
                if (!bone) {
                    bone = new king.BaseBone(boneName, cacheType, isAutoPlay, isLoop, layerName);
                }
                LayerManager.ins.addChild(bone, LayerName.scene_king);
                return bone;
            }
            /**
             * 根据骨头名字获得骨头模板
             * @param boneName 骨头名字
             */
            getTemp(boneName) {
                if (this.dicTemp.hasKey(boneName)) {
                    return this.dicTemp.get(boneName);
                }
                return null;
            }
            /**
             * 根据唯一标识ID获得骨骼对象
             * @param objId 唯一标识ID
             */
            getBone(objId) {
                if (this.dicBone.hasKey(objId)) {
                    return this.dicBone.get(objId);
                }
                return null;
            }
            removeBone(bone) {
                if (!bone) {
                    return;
                }
                if (bone.parent) {
                    bone.removeSelf();
                }
                if (this.dicBone.hasKey(bone.objId)) {
                    this.dicBone.remove(bone.objId);
                    //console.log("回收："+bone.kingType+" 活动个数："+this.dicBone.length);
                }
                //放回缓存池
                let arrSk = null;
                if (this.dicBonePool.hasKey(bone.kingType)) {
                    arrSk = this.dicBonePool.get(bone.kingType);
                }
                else {
                    arrSk = new Array();
                    this.dicBonePool.add(bone.kingType, arrSk);
                }
                if (arrSk) {
                    arrSk.push(bone);
                    //console.log("放入缓存池："+bone.kingType+" 个数："+arrSk.length);
                }
            }
            /**
             * 移除所有骨骼动画
             */
            removeBoneAll() {
                for (let bone of this.dicBone.valueOf()) {
                    this.removeBone(bone);
                }
            }
        }
        king.BoneManager = BoneManager;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=BoneManager.js.map
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 2019-07-17 andy
            特效管理
        */
        class EffectManager {
            constructor() {
                if (EffectManager._ins != null)
                    throw new Error("EffectManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    EffectManager._ins = new EffectManager();
                return this._ins;
            }
            init() {
                //特效层级 界面上
                this.topWindow = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                //特效层级 场景上
                this.topScene = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.scene_effect);
            }
            /**
             * 获得特效
             * @param en   EffectName
             * @param arrSprite
             * @param arrNumber
             * @param arrString
             * @param isScene   是否显示在场景层，默认为true，若为false则显示在界面层上面
             */
            getEffect(en, arrSprite, arrNumber = null, arrString = null, isScene = true) {
                let be = null;
                switch (en) {
                    case EffectName.boss_warning:
                        be = new effect.BossWarningEft(isScene);
                        break;
                    case EffectName.guide_click:
                        be = new effect.GuideClickEft(isScene);
                        break;
                    case EffectName.Fountain:
                        be = new effect.FountainEft(isScene);
                        break;
                    case EffectName.change_img:
                        be = new effect.ChangeImageEft(isScene);
                        break;
                    default:
                        console.error("EffectName not exist!");
                        break;
                }
                if (be)
                    be.setData(arrSprite, arrNumber, arrString);
                return be;
            }
            addEffect(be, isScene) {
                if (isScene) {
                    this.topScene.addChild(be);
                }
                else {
                    this.topWindow.addChild(be);
                }
            }
        }
        effect.EffectManager = EffectManager;
        let EffectName;
        (function (EffectName) {
            /**[] [linepadding] [line1,line2,bosshead,y,word,y,w,h,size,color,stroke,strokecolor]*/
            EffectName[EffectName["boss_warning"] = 0] = "boss_warning";
            /**[] [] [skin...]*/
            EffectName[EffectName["guide_click"] = 1] = "guide_click";
            /**[] [oneSendTime,minx,max,miny,maxy,oneShowTime,needRotation] [skin...]*/
            EffectName[EffectName["Fountain"] = 2] = "Fountain";
            /**[parentContainer][x,y,changeTime] [skin...]*/
            EffectName[EffectName["change_img"] = 3] = "change_img";
        })(EffectName = effect.EffectName || (effect.EffectName = {}));
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectManager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        *2019-04-28 andy
        Tween管理类
        */
        class TweenManager {
            constructor() {
                if (TweenManager._ins != null)
                    throw new Error("TweenManager is single!");
                this.dicTween = new Dictionary();
            }
            static get ins() {
                if (!this._ins)
                    TweenManager._ins = new TweenManager();
                return this._ins;
            }
            /**
             * 注册twwen
             * @param tt
             */
            regTween(tt) {
                this.dicTween.add(tt.id, tt);
            }
            /**
             * 播放动画
             * @param loop
             * @param name
             */
            play(loop, name) {
                let tt = this.dicTween.get(name);
                if (tt) {
                    tt.play(loop);
                }
            }
            /**
             * 停止动画
             * @param name
             * @param isHide 是否隐藏,默认为true
             */
            stop(name, isHide = true) {
                let tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop(isHide);
                }
            }
            /**
             * 停止所有动画
             */
            clearAll() {
                for (let tt of this.dicTween.valueOf()) {
                    if (tt) {
                        tt.stop();
                        Laya.timer.clearAll(tt);
                    }
                }
            }
            /**
             * 创建属性集合
             * @param tpt 属性集合类型
             * @param param param 可在枚举 TweenPropType查看
             */
            creatProp(tpt, param = null) {
                let ret = [];
                switch (tpt) {
                    case TweenPropType.PING_PANG:
                        if (!param || param.length == 0) {
                            param = [30, 200];
                        }
                        ret = [new TweenProp(param[1], 0, 0, 1, param[0]), new TweenProp(param[1] * 0.75, 0, 0, 1, -param[0]), new TweenProp(param[1] * 0.75, 0, 0, 1, param[0]), new TweenProp(param[1] * 0.5, 0, 0, 1, -(param[0] >> 1)), new TweenProp(param[1] * 0.5, 0, 0, 1, (param[0] >> 2)), new TweenProp(param[1] * 0.4, 0, 0, 1, 0)];
                        break;
                    case TweenPropType.PING_PANG_1:
                        if (!param || param.length == 0) {
                            param = [100, 200];
                        }
                        ret = [new TweenProp(param[1], 0, 0), new TweenProp(param[1] * 0.75, 0, -param[0]), new TweenProp(param[1] * 0.75, 0, param[0]), new TweenProp(param[1] * 0.5, 0, -(param[0] >> 1)), new TweenProp(param[1] * 0.5, 0, (param[0] >> 2)), new TweenProp(param[1] * 0.4, 0, 0)];
                        break;
                    case TweenPropType.PING_PANG_2:
                        if (!param || param.length == 0) {
                            param = [100, 200];
                        }
                        ret = [new TweenProp(param[1], 0, 0), new TweenProp(param[1] * 0.75, 0, -param[0]), new TweenProp(param[1] * 0.75, 0, param[0]), new TweenProp(param[1] * 0.5, 0, (param[0] >> 1)), new TweenProp(param[1] * 0.5, 0, (param[0] >> 2)), new TweenProp(param[1] * 0.4, 0, 0)];
                        break;
                    case TweenPropType.GUIDE_SLID_1:
                        if (!param || param.length < 2) {
                            console.error("缓动横向滑动参数错误：必须是2个参数！");
                        }
                        else {
                            ret = [new TweenProp(param[0], 0, 0, 1), new TweenProp(0, param[1], 0, 1), new TweenProp(0, 0, 0, 0)];
                        }
                        break;
                    case TweenPropType.GUIDE_SLID_2:
                        if (!param || param.length < 2) {
                            console.error("缓动竖向滑动参数错误：必须是2个参数！");
                        }
                        else {
                            ret = [new TweenProp(param[0], 0, 0, 1), new TweenProp(0, 0, param[1], 1), new TweenProp(0, 0, 0, 0)];
                        }
                        break;
                    case TweenPropType.GUIDE_CLICK:
                        if (!param || param.length == 0) {
                            param = [20];
                        }
                        ret = [new TweenProp(100, 0, param[0]), new TweenProp(100, 0, param[0] >> 1), new TweenProp(100, 0, param[0]), new TweenProp(100, 0, param[0]), new TweenProp(80, 0, 0)];
                        break;
                    case TweenPropType.LIGHT_STAR:
                        if (!param || param.length == 0) {
                            param = [100];
                        }
                        ret = [new TweenProp(100, 0, 0, 1), new TweenProp(150, 0, 0, 1), new TweenProp(0, 0, 0, 0), new TweenProp(100, 0, 0, 1), new TweenProp(150, 0, 0, 1), new TweenProp(0, 0, -1, 0)];
                        break;
                    case TweenPropType.SMALL_BIG:
                        if (!param || param.length < 4) {
                            param = [1, 1.5, 1000, 1000];
                        }
                        ret = [new TweenProp(param[3], 0, 0, 1, 0, param[0], param[0]), new TweenProp(param[2], 0, 0, 1, 0, param[1], param[1]), new TweenProp(param[3], 0, 0, 1, 0, param[0], param[0])];
                        break;
                    default:
                        break;
                }
                return ret;
            }
            /**
             * 重置动画对象
             * @param name 缓动名字，唯一标识
             * @param target  动画对象
             */
            resetTarget(name, target) {
                let tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop();
                    tt.resetTarget(target);
                    tt.play(tt.isLoop);
                }
            }
            /**
             * 重置动画位置
             * @param name   动画标识名字
             * @param x      目标x
             * @param y      目标y
             */
            resetTargetPos(name, x, y) {
                let tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop();
                    tt.target.x = x;
                    tt.target.y = y;
                    tt.resetTarget(tt.target);
                    tt.play(tt.isLoop);
                }
            }
            /**
             * 重置动画属性
             * @param name 缓动名字，唯一标识
             * @param tpt  属性类型
             * @param param  参数
             * @param delayTime 延时时间
             */
            resetProp(name, arrProp = null, delayTime = -1) {
                let tt = this.dicTween.get(name);
                if (tt) {
                    tt.resetProp(arrProp, delayTime);
                }
            }
            /**
             * 重置动画属性
             * @param name 缓动名字，唯一标识
             * @param tpt  属性类型
             * @param param  参数
             * @param delayTime 延时时间
             */
            resetPropByType(name, tpt, param = null, delayTime = -1) {
                let tt = this.dicTween.get(name);
                if (tt) {
                    let arrProp = this.creatProp(tpt, param);
                    tt.resetProp(arrProp, delayTime);
                }
            }
        }
        common.TweenManager = TweenManager;
        class TweenTarget {
            constructor(id, target, arrProp, delayTime, callBack = null) {
                this.id = "";
                this.delayTime = 0;
                this.callBack = null;
                this.isLoop = true;
                this.propIndex = 0;
                this.isPlay = true;
                this.curProp = null;
                this.targetX = 0;
                this.targetY = 0;
                this.id = id;
                this.resetTarget(target);
                this.arrProp = arrProp;
                this.delayTime = delayTime;
                this.callBack = callBack;
                this.curProp = new TweenProp(0);
            }
            /**
             * 播放动画
             * @param isLoop 默认为true
             */
            play(isLoop = true) {
                this.target.visible = true;
                Laya.Tween.clearAll(this.target);
                this.isLoop = isLoop;
                this.isPlay = true;
                this.propIndex = 0;
                this.playNext();
            }
            playNext() {
                if (!this.isPlay) {
                    return;
                }
                let propFrom = this.arrProp[this.propIndex++];
                let propTo = null;
                if (this.propIndex < this.arrProp.length) {
                    propTo = this.arrProp[this.propIndex];
                    this.curProp.x = this.targetX + propTo.x;
                    this.curProp.y = this.targetY + propTo.y;
                    this.curProp.alpha = propTo.alpha;
                    this.curProp.rotation = propTo.rotation;
                    this.curProp.scaleX = propTo.scaleX;
                    this.curProp.scaleY = propTo.scaleY;
                }
                else {
                    if (this.isLoop) {
                        Laya.timer.once(this.delayTime, this, () => {
                            this.propIndex = 0;
                            this.playNext();
                        });
                    }
                    else {
                        if (this.callBack)
                            this.callBack();
                    }
                    return;
                }
                this.target.x = this.targetX + propFrom.x;
                this.target.y = this.targetY + propFrom.y;
                this.target.alpha = propFrom.alpha;
                this.target.rotation = propFrom.rotation;
                this.target.scaleX = propFrom.scaleX;
                this.target.scaleY = propFrom.scaleY;
                Laya.Tween.to(this.target, this.curProp, propFrom.duration, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
                    this.playNext();
                }));
            }
            /**
             * 停止动画
             * @param isHide 默认为true
             */
            stop(isHide = true) {
                if (isHide) {
                    this.target.visible = false;
                }
                this.isPlay = false;
                Laya.Tween.clearAll(this.target);
            }
            /**
             * 重置缓动对象
             * @param target
             */
            resetTarget(target) {
                this.target = target;
                this.targetX = target.x;
                this.targetY = target.y;
            }
            /**
             * 重置缓动属性
             * @param arrProp
             * @param delayTime
             */
            resetProp(arrProp, delayTime = -1) {
                if (arrProp) {
                    this.arrProp = arrProp;
                }
                if (delayTime >= 0) {
                    this.delayTime = delayTime;
                }
            }
        }
        common.TweenTarget = TweenTarget;
        /*
        * 2019-04-29 andy
        Tween缓动属性
        */
        class TweenProp {
            constructor(duration, x = -1, y = -1, alpha = 1, rotation = 0, scaleX = 1, scaleY = 1) {
                this.duration = duration;
                this.x = x;
                this.y = y;
                this.alpha = alpha;
                this.rotation = rotation;
                this.scaleX = scaleX;
                this.scaleY = scaleY;
            }
        }
        common.TweenProp = TweenProp;
        /*
        * 2019-05-07 andy
        Tween缓动属性集合类型
        */
        let TweenPropType;
        (function (TweenPropType) {
            /**不倒翁晃动 1.角度 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG"] = 0] = "PING_PANG";
            /**乒乓球上下晃动 1.Y偏差 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG_1"] = 1] = "PING_PANG_1";
            /**乒乓球左右晃动 1.X偏差 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG_2"] = 2] = "PING_PANG_2";
            /**横向滑动 1.持续时间 2.X偏差*/
            TweenPropType[TweenPropType["GUIDE_SLID_1"] = 3] = "GUIDE_SLID_1";
            /**竖向滑动 1.持续时间 2.Y偏差*/
            TweenPropType[TweenPropType["GUIDE_SLID_2"] = 4] = "GUIDE_SLID_2";
            /**点击效果 1.Y偏差 默认20*/
            TweenPropType[TweenPropType["GUIDE_CLICK"] = 5] = "GUIDE_CLICK";
            /**亮晶晶效果 */
            TweenPropType[TweenPropType["LIGHT_STAR"] = 6] = "LIGHT_STAR";
            /**缩小放大效果 1.最小比例 2.最大比例 3.变小时间单位毫秒 4.变大时间单位毫秒*/
            TweenPropType[TweenPropType["SMALL_BIG"] = 7] = "SMALL_BIG";
        })(TweenPropType = common.TweenPropType || (common.TweenPropType = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=TweenManager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        2019-04-01 andy
        * 触摸管理器
        监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:SwipeDirection,startP:Laya.Point,endP:Laya.Point}
        */
        class TouchManager {
            constructor() {
                /**触摸开关 */
                this._isCanTouch = true;
                this._isTouch = false;
                this._isPushEvent = false;
                this._isRelesePushEvent = false;
                this.RELESE_PUSH_TIME = .4;
                if (TouchManager._ins != null)
                    throw new Error("TouchManager is single!");
                TouchManager._ins = this;
                this.moveAnagle = [[0, 50], [50, 130], [130, 229], [230, 320], [320, 360]];
                this.AngleToDirectionMap = [SwipeDirection.Right, SwipeDirection.Down, SwipeDirection.Left, SwipeDirection.Up, SwipeDirection.Right];
                this._startPoint = new Laya.Point();
                this._curPoint = new Laya.Point();
            }
            static get ins() {
                if (!this._ins)
                    new TouchManager();
                return this._ins;
            }
            init() {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            }
            /**
             * 设置触摸是否有效
             * @param v
             */
            setTouch(v) {
                this._isCanTouch = v;
            }
            onMouseDown(t) {
                if (!this._isCanTouch) {
                    return;
                }
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._moveCount = 0, this._isTouch = true, this._startPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
            }
            onMouseMove(t) {
                if (this._isTouch && (this._curPoint.x = Laya.stage.mouseX, this._curPoint.y = Laya.stage.mouseY,
                    !this._isPushEvent)) {
                    let e = this._startPoint.distance(this._curPoint.x, this._curPoint.y), i = 18;
                    if (this._moveCount > 0 && (i = 20), e >= i) {
                        let n = new Laya.Vector2(this._curPoint.x - this._startPoint.x, this._curPoint.y - this._startPoint.y), r = this.GetSwipeDirection(n, 1);
                        common.EventManager.ins.event(common.NoticeEvent.TOUCH_DIRECTOR, { dir: r, startP: this._startPoint, endP: this._curPoint });
                        this._isPushEvent = true, this.StartRelesePushEvent(), this._moveCount++;
                    }
                    this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
                }
            }
            onMouseUp(t) {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._isTouch = false, this.EndRelesePushEvent();
            }
            GetSwipeDirection(t, i) {
                let n = MathUtil.changeAngle360(MathUtil.radianToAngle(Math.atan2(t.y, t.x)));
                for (let r = 0; r < this.AngleToDirectionMap.length; ++r) {
                    let startAngle = this.moveAnagle[r][0], endAngle = this.moveAnagle[r][1];
                    if (n >= startAngle && n <= endAngle)
                        return this.AngleToDirectionMap[r];
                }
                return SwipeDirection.Non;
            }
            UpdateRelesePushEvent() {
                //this._isRelesePushEvent && (this._relesePushTime += Global.timeDelta, this._relesePushTime >= this.RELESE_PUSH_TIME && this.EndRelesePushEvent());
            }
            StartRelesePushEvent() {
                this._relesePushTime = 0, this._isRelesePushEvent = true;
            }
            EndRelesePushEvent() {
                this._isRelesePushEvent = false, this._isPushEvent = false, this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
            }
        }
        common.TouchManager = TouchManager;
        /*
        * 滑动方向;
        */
        let SwipeDirection;
        (function (SwipeDirection) {
            SwipeDirection[SwipeDirection["Non"] = 0] = "Non";
            SwipeDirection[SwipeDirection["Left"] = 1] = "Left";
            SwipeDirection[SwipeDirection["Right"] = 2] = "Right";
            SwipeDirection[SwipeDirection["Up"] = 3] = "Up";
            SwipeDirection[SwipeDirection["Down"] = 4] = "Down";
        })(SwipeDirection = common.SwipeDirection || (common.SwipeDirection = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=TouchManager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-03 andy
        提示信息管理
        */
        class TipManager {
            constructor() {
                if (TipManager._ins != null)
                    throw new Error("TipManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    TipManager._ins = new TipManager();
                return this._ins;
            }
            /**
             * 图片提示
             * @param url 图片展示
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
             */
            showImg(url, x = 0, y = 0, offH = -50) {
                let imgEfct = new Laya.Image();
                imgEfct.skin = url;
                imgEfct.x = ((game.Define.DeviceW - imgEfct.width) / 2);
                imgEfct.x = x == 0 ? ((game.Define.DeviceW - imgEfct.width) / 2) : x;
                imgEfct.y = y == 0 ? ((game.Define.DeviceH - imgEfct.height) / 2) : y;
                LayerManager.ins.addChild(imgEfct, LayerName.top);
                Laya.Tween.to(imgEfct, { y: imgEfct.y + offH }, 500, null, Laya.Handler.create(this, () => {
                    imgEfct.removeSelf();
                    imgEfct = null;
                }));
            }
            /**
             * 文字提示
             * @param url 图片展示
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH Y轴浮动距离，默认为-50
             * @param fontSize 字体大小，默认为40
             * @param fontColor 字体颜色，默认为黑色
             */
            showWord(msg, x = 0, y = 0, offH = -50, fontSize = 40, fontColor = "#000000") {
                let lbl = new Laya.Label();
                lbl.color = fontColor;
                lbl.fontSize = fontSize;
                lbl.text = msg;
                lbl.x = x == 0 ? ((game.Define.DeviceW - lbl.width) / 2) : x;
                lbl.y = y == 0 ? ((game.Define.DeviceH - lbl.height) / 2) : y;
                LayerManager.ins.addChild(lbl, LayerName.top);
                Laya.Tween.to(lbl, { y: lbl.y + offH }, 700, null, Laya.Handler.create(this, () => {
                    lbl.removeSelf();
                    lbl = null;
                }));
            }
        }
        common.TipManager = TipManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=TipManager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        声音管理器
        */
        class SoundManager {
            constructor() {
                /**声音是否播放 */
                this.isOn = true;
                /**是否震动 */
                this.isShake = true;
                if (SoundManager._ins != null)
                    throw new Error("SoundManager is single!");
                //2019-07-15 物理静音，需要使用webAudio，否则无效
                if (Laya.Browser.onIOS) {
                    Laya.SoundManager.useAudioMusic = false;
                }
            }
            static get ins() {
                if (!this._ins)
                    SoundManager._ins = new SoundManager();
                return this._ins;
            }
            /**预加载声音 */
            preload(arr, callBack, progress) {
                Laya.loader.load(arr, callBack, progress);
            }
            init(callBack) {
            }
            /**设置声音 */
            setOn(v) {
                this.isOn = v;
                Laya.SoundManager.muted = !v;
                //let volueme= v?1:0;
                //Laya.SoundManager.setMusicVolume(volueme);
            }
            /**播放背景声音 */
            playMusic(bt) {
                if (!bt) {
                    console.log("播放背景声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (Base64Manager.isUseBase64) {
                        Laya.SoundManager.playMusic(bt.base64Img);
                    }
                    else {
                        Laya.SoundManager.playMusic(bt.id);
                    }
                }
            }
            /**播放声音 */
            playSound(bt) {
                if (!bt) {
                    console.log("播放声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (Base64Manager.isUseBase64) {
                        Laya.SoundManager.playSound(bt.base64Img);
                    }
                    else {
                        Laya.SoundManager.playSound(bt.id);
                    }
                }
            }
            /**终止声音 */
            stopSound(soundName) {
                Laya.SoundManager.stopSound(game.Define.CDN + soundName);
            }
            /**
             * 调用手机震动
             * @param para 1.若为number 震动时间 2.若为数组 震5秒，停0.3秒，在震4秒
             */
            vibration(para) {
                navigator.vibrate = navigator.vibrate
                    || navigator["webkitVibrate"]
                    || navigator["mozVibrate"]
                    || navigator["msVibrate"];
                if (navigator.vibrate) {
                    console.log("支持设备震动！vibrate");
                    navigator.vibrate(para);
                }
                else {
                    console.log("不支持设备震动！");
                }
            }
        }
        common.SoundManager = SoundManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=SoundManager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        资源管理器
        */
        class ResManager {
            constructor() {
                if (ResManager._ins != null)
                    throw new Error("ResManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    ResManager._ins = new ResManager();
                return this._ins;
            }
            preload(arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            }
            init(arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            }
        }
        common.ResManager = ResManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=ResManager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-05 andy
        微信开放数据管理
        */
        class OpenManager {
            constructor() {
                if (OpenManager._ins != null)
                    throw new Error("OpenManager is single!");
                OpenManager._ins = this;
                this.isDrawOpenView = false;
                this.wx = Laya.Browser.window.wx;
                this.init();
            }
            static get ins() {
                if (!this._ins)
                    new OpenManager();
                return this._ins;
            }
            init() {
                this.resizeStage();
            }
            //----------------------主域调用-----------------
            postMsg(cmd, data) {
                if (this.wx) {
                    var openDataContext = this.wx.getOpenDataContext();
                    openDataContext.postMessage({ cmd: cmd, data: data });
                }
            }
            resizeStage() {
                if (Laya.Browser.window.sharedCanvas) {
                    var scw = 663;
                    var sch = 726;
                    Laya.Browser.window.sharedCanvas.width = scw;
                    Laya.Browser.window.sharedCanvas.height = sch;
                    //this.postMsg(NoticeEvent.ZY_RESIZE,{width:scw,height:sch,matrix:Laya.stage._canvasTransform});
                    this.initOpenView();
                }
            }
            setLogin() {
                //Global.platform.postMsg(NoticeEvent.Zy_Login,{openId:Global.roleData.openid,gameId:DEFINE.gameId,isGame1:DEFINE.isGame1,isGame2:DEFINE.isGame2,isGame3:DEFINE.isGame3,cdn:DEFINE.cdn});
            }
            setShareTicket() {
                //Global.platform.postMsg(NoticeEvent.Zy_ShareTicket,DEFINE.shareTicket);
            }
            updateScore() {
                //Global.platform.postMsg(NoticeEvent.Zy_Score,{score:Math.floor(Global.roleData.runDistance)});
            }
            showRankView(type) {
                this.postMsg(common.NoticeEvent.ZY_RANK, null);
            }
            showOverView() {
                //Global.platform.postMsg(NoticeEvent.Zy_Over,{score:Math.floor(Global.roleData.runDistance)});
            }
            showBeOverView() {
                //Global.platform.postMsg(NoticeEvent.Zy_BeOver,null);
            }
            noticeUILoaded(data) {
                //Global.platform.postMsg(NoticeEvent.Zy_UILoaded,data);
            }
            /**
             * name
             */
            initOpenView() {
                if (Laya.Browser.window.sharedCanvas) {
                    this.openSp = new Laya.Sprite();
                    this.openSp.on(Laya.Event.REMOVED, this, this.onRemoveOpenSp);
                    this.openSp.pos(0, 0);
                    // Laya.timer.loop(5000,this,this.drawOpenView);
                    // this.drawOpenView();
                }
            }
            onRemoveOpenSp() {
                this.isDrawOpenView = false;
            }
            changeOpenParent(parent, x, y) {
                if (!Laya.Browser.window.sharedCanvas) {
                    return;
                }
                this.isDrawOpenView = false;
                this.openSp.removeSelf();
                this.openSp.pos(x, y);
                if (parent) {
                    Laya.timer.once(1500, this, this.delayAddOpenSp, [parent]);
                }
            }
            updateOpenView() {
                Laya.timer.once(2000, this, this.drawOpenView);
            }
            delayAddOpenSp(parent) {
                parent.addChild(this.openSp);
                this.isDrawOpenView = true;
                this.drawOpenView();
                this.updateOpenView();
            }
            drawOpenView() {
                if (this.isDrawOpenView) {
                    this.openSp.graphics.clear();
                    if (this.openTex)
                        this.openTex.destroy();
                    this.openTex = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                    // this.openTex.bitmap.alwaysChange = true;//小程序使用，非常费，这个参数可以根据自己的需求适当调整，如果内容不变可以不用设置成true
                    this.openSp.graphics.drawTexture(this.openTex, 0, 0, this.openTex.width, this.openTex.height);
                    // this.openTex.bitmap.reloadCanvasData();
                }
            }
        }
        common.OpenManager = OpenManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=OpenManager.js.map
var game;
(function (game) {
    var base64;
    (function (base64_1) {
        /*
        * 2019-04-28 andy
        BASE64图集管理器
        */
        class Base64Manager {
            constructor() {
                this.loadIndex = 0;
                if (Base64Manager._ins != null)
                    throw new Error("Base64Manager is single!");
                this.arrLoadAtlas = [];
            }
            static get ins() {
                if (!this._ins)
                    Base64Manager._ins = new Base64Manager();
                return this._ins;
            }
            init() {
            }
            /**
             * 加载BASE64图集
             * @param arrAtlas 图集数组
             * @param callBack
             * @param progress
             */
            loadAtlas(arrAtlas, callBack, progress) {
                if (!arrAtlas || arrAtlas.length == 0) {
                    if (callBack) {
                        callBack.run();
                    }
                    return;
                }
                console.log("开始加载BASE64图集....共计：" + arrAtlas.length);
                this.arrLoadAtlas = arrAtlas;
                this.callBack = callBack;
                this.progress = progress;
                this.loadIndex = 0;
                this.parseAtlasNext();
            }
            parseAtlasNext() {
                //2019-09-17 andy 如果progress默认执行一次就销毁，会出问题
                if (this.progress && this.progress.caller != this) {
                    this.progress.runWith({ data: this.loadIndex / this.arrLoadAtlas.length });
                }
                if (this.loadIndex >= this.arrLoadAtlas.length) {
                    if (this.callBack) {
                        this.callBack.run();
                    }
                    return;
                }
                this.parseAtlas(this.arrLoadAtlas[this.loadIndex++]);
            }
            /**
             * 解析BASE64图集
             * @param base64Type
             */
            parseAtlas(base64Type) {
                //console.log("parse路径:",base64Type.id);
                if (base64Type.base64Img == null || base64Type.base64Img == "") {
                    this.cacheBase64Json(base64Type);
                    return;
                }
                if (base64Type.base64Json == null || base64Type.base64Json == "") {
                    this.cacheBase64Img(base64Type);
                    return;
                }
                //base64解密获得json字符串
                let json = this.base64ToJson(base64Type.base64Json);
                //"meta":{"image":"frame.png,frame1.png","prefix":"frame/"}
                let atlasName = json.meta.prefix;
                console.log("atlasName:", atlasName);
                //切图 【laya2专用】
                Laya.loader.load(base64Type.base64Img, Laya.Handler.create(this, () => {
                    let imgBig = Laya.Loader.getRes(base64Type.base64Img);
                    let frame = null;
                    for (let key in json.frames) {
                        frame = json.frames[key].frame;
                        //console.log("key",key,"value",JSON.stringify(json.frames[key]));
                        if (imgBig.bitmap instanceof Laya.Texture || imgBig.bitmap instanceof Laya.Texture2D) {
                            let texture = Laya.Texture.create(imgBig.bitmap, frame.x, frame.y, frame.w, frame.h);
                            //缓存到LAYA资源管理
                            Laya.Loader.cacheRes(atlasName + key, texture);
                        }
                        else {
                            console.log("图集->" + key + " 不存在");
                        }
                    }
                    this.parseAtlasNext();
                }));
            }
            /**
             * 预先需要加载的单张图片，比如spine动画
             * @param base64Type
             */
            cacheBase64Img(base64Type) {
                //【laya2专用】
                Laya.loader.load(base64Type.base64Img, Laya.Handler.create(this, () => {
                    let imgBig = Laya.Loader.getRes(base64Type.base64Img);
                    //缓存到LAYA资源管理
                    Laya.Loader.cacheRes(base64Type.id, imgBig);
                    this.parseAtlasNext();
                }));
            }
            /**
             * 加载Json
             * @param base64Type
             */
            cacheBase64Json(base64Type) {
                let json = this.base64ToJson(base64Type.base64Json);
                Laya.loader.cacheRes(base64Type.id, json);
                this.parseAtlasNext();
            }
            /**
             * 检测图片
             * @param img
             * @param skinName 图集图片，传入此值，img.skin不需要赋值
             * @param base64Type 不是图集的图片，需要传入此值
             */
            checkImg(img, base64Type) {
                if (!img) {
                    console.error("参数为空");
                    return;
                }
                // if(img instanceof Laya.Image || img instanceof Laya.ProgressBar || img instanceof Laya.Button){
                //     //console.log("img",img);
                // }else{
                //     console.error("不是有效的Laya.Image 或者 Laya.ScrollBar 或者 Laya.Button");
                //     return;
                // }
                if (Base64Manager.isUseBase64) {
                    if (base64Type) {
                        img.skin = base64Type.base64Img;
                        // Laya.loader.load(base64Type.base64Img,Laya.Handler.create(this,(res)=>{
                        // }))                  
                    }
                    else {
                    }
                }
                else {
                    if (base64Type) {
                        img.skin = base64Type.id;
                    }
                    else {
                    }
                }
            }
            /**
             * 自动检测视频
             * @param video
             * @param base64Type
             */
            checkVideo(video, base64Type) {
                if (!video) {
                    console.error("参数为空");
                    return;
                }
                if (Base64Manager.isUseBase64) {
                    if (base64Type) {
                        video.src = base64Type.base64Img;
                    }
                    else {
                    }
                }
                else {
                    if (base64Type) {
                        video.src = base64Type.id;
                    }
                    else {
                    }
                }
            }
            /**
             * base64 -> Json
             * @param base64Data
             */
            base64ToJson(base64) {
                //base64解密获得json字符串
                let jsonStr = window.atob(base64);
                //console.log("jsonStr",jsonStr);
                //将json字符串转成json对象
                let json = JSON.parse(jsonStr);
                return json;
            }
            /**
             * Base64 -> ByteArray
             * @param base64String
             */
            base64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }
            /**
             * ByteArray -> Base64
             * @param buffer
             */
            arrayBufferToBase64(buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            }
            /**
             * 加载BASE64资源 【laya2专用】
             * @param arrAtlas 资源数组
             * @param callBack
             * @param progress
             */
            load(arrAtlas, callBack, progress) {
                if (!arrAtlas || arrAtlas.length == 0) {
                    if (callBack) {
                        callBack.run();
                    }
                    return;
                }
                console.log("开始加载BASE64资源....共计：" + arrAtlas.length);
                for (let base64type of arrAtlas) {
                    let fileType = base64type.id.substr(base64type.id.lastIndexOf(".") + 1, base64type.id.length);
                    if (base64type.id.indexOf("Assets/") >= 0) {
                        base64type.id = base64type.id.substring(base64type.id.indexOf("Assets/"), base64type.id.length);
                    }
                    //console.log("fileType:",fileType,base64type.id);
                    switch (fileType) {
                        case "ls":
                            Laya.loader.cacheRes(base64type.id, Laya.Scene3D.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lh":
                            Laya.loader.cacheRes(base64type.id, Laya.Sprite3D.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lmat":
                            Laya.loader.cacheRes(base64type.id, Laya.BaseMaterial.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lav":
                            Laya.loader.cacheRes(base64type.id, Laya.Avatar._parse(this.base64ToJson(base64type.base64Json)));
                            break;
                        case "lm": //二进制，模型数据文件，相当于FBX格式的转换，可用MeshSprite3D类加载
                            Laya.loader.cacheRes(base64type.id, Laya.Mesh.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lani": //二进制，动画数据文件,包含骨骼或帧动画信息
                            Laya.loader.cacheRes(base64type.id, Laya.AnimationClip.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        default:
                            break;
                    }
                }
                if (callBack) {
                    callBack.run();
                }
            }
            /**
             * 材质赋值 【laya2专用】
             * @param mat  Laya.BaseMaterial
             * @param bt   Base64Type
             * @param color  Laya.Vector4
             */
            checkMaterial(mat, bt, color = null) {
                if (Base64Manager.isUseBase64) {
                    Laya.loader.load(bt.base64Img, Laya.Handler.create(this, (e) => {
                        //console.log(e);
                        if (mat instanceof Laya.BlinnPhongMaterial) {
                            mat.albedoTexture = e.bitmap;
                            if (color) {
                                mat.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
                            }
                        }
                    }));
                }
                else {
                    Laya.Texture2D.load(game.Define.CDN + "/atlas/" + bt.id, Laya.Handler.create(this, (tex) => {
                        if (mat instanceof Laya.BlinnPhongMaterial) {
                            mat.albedoTexture = tex;
                            if (color) {
                                mat.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
                            }
                        }
                    }));
                }
            }
        }
        /**是否使用BASE64图片 */
        Base64Manager.isUseBase64 = false;
        base64_1.Base64Manager = Base64Manager;
        /*
        * 2019-04-28 andy
        BASE64 图片类型
        */
        class Base64Type {
            /**
             *
             * @param id
             * @param name
             * @param base64Json
             * @param base64Img
             * @param paramStr
             * @param paramNum
             */
            constructor(id, name, base64Json = "", base64Img = "", paramStr = "", paramNum = 0) {
                this.id = id;
                this.name = name;
                this.base64Json = base64Json;
                this.base64Img = base64Img;
                this.paramStr = paramStr;
                this.paramNum = paramNum;
            }
        }
        base64_1.Base64Type = Base64Type;
    })(base64 = game.base64 || (game.base64 = {}));
})(game || (game = {}));
//# sourceMappingURL=Base64Manager.js.map
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-01 andy
        事件分发器
        */
        class EventManager extends Laya.EventDispatcher {
            constructor() {
                super();
                if (EventManager._ins != null)
                    throw new Error("EventManager is single!");
            }
            static get ins() {
                if (!this._ins)
                    EventManager._ins = new EventManager();
                return this._ins;
            }
            init() {
            }
            event(type, data) {
                super.on;
                return super.event(type, new NoticeEvent(type, data));
            }
        }
        common.EventManager = EventManager;
        class NoticeEvent {
            constructor(type, data) {
                this.type = type;
                this.data = data;
            }
        }
        /**平台初始化完成 */
        NoticeEvent.PLATFORM_INIT_OVER = "PLATFORM_INIT_OVER";
        /**平台登录成功 */
        NoticeEvent.PLATFORM_LOGIN_SUCCESS = "PLATFORM_LOGIN_SUCCESS";
        /**平台登录失败 */
        NoticeEvent.PLATFORM_LOGIN_FAIL = "PLATFORM_LOGIN_FAIL";
        /**资源加载完成 */
        NoticeEvent.GAME_RES_LOAD_FINISH = "GAME_RES_LOAD_FINISH";
        /**http请求进度 */
        NoticeEvent.HTTP_PROGRESS = "HTTP_PROGRESS";
        /**触摸方向事件 */
        NoticeEvent.TOUCH_DIRECTOR = "TOUCH_DIRECTOR";
        /**龙骨动画模板加载完成事件 */
        NoticeEvent.BONE_TEMP_LOAD_FINISH = "BONE_TEMP_LOAD_FINISH";
        /**获得焦点事件 */
        NoticeEvent.SYS_FOCUS = "SYS_FOCUS";
        /**失去焦点事件 */
        NoticeEvent.SYS_BLUR = "SYS_BLUR";
        /**竖屏事件 */
        NoticeEvent.SYS_SCREEN_VERTICAL = "SYS_SCREEN_VERTICAL";
        /**横屏事件 */
        NoticeEvent.SYS_SCREEN_HORIZONTAL = "SYS_SCREEN_HORIZONTAL";
        /**竖屏事件,引擎已经执行完毕 */
        NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE = "SYS_SCREEN_VERTICAL_ONSIZE";
        /**横屏事件,引擎已经执行完毕 */
        NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE = "SYS_SCREEN_HORIZONTAL_ONSIZE";
        /**图片转文字 */
        NoticeEvent.AI_IMAGE_TO_WORD = "AI_IMAGE_TO_WORD";
        //子域
        /**尺寸发生变化 */
        NoticeEvent.ZY_RESIZE = "ZY_RESIZE";
        /**登录成功 */
        NoticeEvent.ZY_LOGIN = "ZY_LOGIN";
        /**显示排行 */
        NoticeEvent.ZY_RANK = "ZY_RANK";
        /**上报分数 */
        NoticeEvent.ZY_SCORE = "ZY_SCORE";
        common.NoticeEvent = NoticeEvent;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=EventManager.js.map
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 特效基类
        2019-07-17 andy
        */
        class BaseEffect extends Laya.Sprite {
            constructor(isScene) {
                super();
                /**是否正在播放特效 */
                this.isPlaying = false;
                /**指定父类容器 可以不指定*/
                this.parentContainer = null;
                /**是否添加到场景 */
                this.isScene = false;
                this.isInit = false;
                this.isScene = isScene;
                this.on(Laya.Event.ADDED, this, this.onAdd);
            }
            /**执行一次 */
            init() {
            }
            onAdd(event) {
                if (!this.isInit) {
                    this.init();
                    this.isInit = true;
                }
                this.on(Laya.Event.REMOVED, this, this.onRmove);
                this.open();
                // UIScaleManager.ins.regUI(this.uiType.name,()=>{this.scaleH();},()=>{this.scaleV();});
            }
            onRmove(event) {
                this.off(Laya.Event.REMOVED, this, this.onRmove);
                // UIScaleManager.ins.regUI(this.uiType.name,null,null);
                this.close();
            }
            /**窗体是否打开 */
            isOpen() {
                return this != null && this.parent != null;
            }
            /**窗体打开 */
            open() {
            }
            /**横屏时布局设置 */
            scaleH() {
            }
            /**竖屏时布局设置 */
            scaleV() {
            }
            /**窗体关闭 */
            close() {
                this.isPlaying = false;
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
            }
            /**
             * 设置数据
             * @param arrSprite
             * @param arrNumber
             * @param arrString
             */
            setData(arrSprite, arrNumber = null, arrString = null) {
                this.arrSprite = arrSprite;
                this.arrNumber = arrNumber;
                this.arrString = arrString;
            }
            /**播放特效 */
            play() {
                if (this.isPlaying) {
                    return;
                }
                if (!this.parent) {
                    if (this.parentContainer) {
                        this.parentContainer.addChild(this);
                    }
                    else {
                        effect.EffectManager.ins.addEffect(this, this.isScene);
                    }
                }
                this.isPlaying = true;
            }
            /**停止特效 */
            stop() {
                this.removeSelf();
            }
            lineMove(line, from, to, time1, time2, delayTime = 0) {
                line.x = from;
                Laya.Tween.to(line, { x: to }, time1, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(line, { x: from }, time2, null, Laya.Handler.create(this, () => {
                        Laya.Tween.clearAll(line);
                    }));
                }), delayTime);
            }
        }
        effect.BaseEffect = BaseEffect;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseEffect.js.map
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * Boss来袭出场特效
        2019-07-17 andy
        */
        class BossWarningEft extends effect.BaseEffect {
            constructor(isScene) {
                super(isScene);
                //交叉线1
                this.imgLine1 = null;
                //交叉线2
                this.imgLine2 = null;
                //交叉线3
                this.imgLine3 = null;
                //交叉线4
                this.imgLine4 = null;
                //交叉线5
                this.imgLine5 = null;
                //Boss头像
                this.imgBoss = null;
                //文字
                this.lblWord = null;
                this.linePadding = 30;
                this.imgLine1 = new Laya.Image();
                this.addChild(this.imgLine1);
                this.imgLine2 = new Laya.Image();
                this.addChild(this.imgLine2);
                this.imgLine3 = new Laya.Image();
                this.addChild(this.imgLine3);
                this.imgLine4 = new Laya.Image();
                this.addChild(this.imgLine4);
                this.imgLine5 = new Laya.Image();
                this.addChild(this.imgLine5);
                this.imgBoss = new Laya.Image();
                this.imgBoss.anchorX = 0.5;
                this.addChild(this.imgBoss);
                this.lblWord = new Laya.Label();
                this.lblWord.anchorX = 0.5;
                this.lblWord.wordWrap = true;
                this.addChild(this.lblWord);
            }
            /**执行一次 */
            init() {
            }
            /**
             * 设置数据
             * @param arrSprite
             * @param arrNumber [linepadding]
             * @param arrString [line1,line2,bosshead,y,word,y,w,h,size,color,stroke,strokecolor]
             */
            setData(arrSprite, arrNumber = null, arrString = null) {
                super.setData(arrSprite, arrNumber, arrString);
                if (arrNumber) {
                    this.linePadding = arrNumber.length > 0 ? arrNumber[0] : 20;
                }
                if (arrString) {
                    this.imgLine1.skin = arrString[0];
                    this.imgLine2.skin = arrString[1];
                    this.imgLine3.skin = arrString[0];
                    this.imgLine4.skin = arrString[1];
                    this.imgLine5.skin = arrString[0];
                    this.imgLine1.y = -this.imgLine1.height - this.imgLine2.height - (this.imgLine3.height >> 1);
                    this.imgLine2.y = this.imgLine1.y + this.imgLine1.height + this.linePadding;
                    this.imgLine3.y = this.imgLine2.y + this.imgLine2.height + this.linePadding;
                    this.imgLine4.y = this.imgLine3.y + this.imgLine3.height + this.linePadding;
                    this.imgLine5.y = this.imgLine4.y + this.imgLine4.height + this.linePadding;
                    this.imgBoss.skin = arrString.length > 2 ? arrString[2] : "";
                    this.imgBoss.y = arrString.length > 3 ? Number(arrString[3]) : 0;
                    this.lblWord.text = arrString.length > 4 ? arrString[4] : "";
                    this.lblWord.y = arrString.length > 5 ? Number(arrString[5]) : 0;
                    this.lblWord.width = arrString.length > 6 ? Number(arrString[6]) : this.lblWord.displayWidth;
                    this.lblWord.height = arrString.length > 7 ? Number(arrString[7]) : this.lblWord.displayHeight;
                    this.lblWord.fontSize = arrString.length > 8 ? Number(arrString[8]) : 30;
                    this.lblWord.color = arrString.length > 9 ? arrString[9] : "#ffffff";
                    this.lblWord.stroke = arrString.length > 10 ? Number(arrString[10]) : 0;
                    this.lblWord.strokeColor = arrString.length > 11 ? arrString[11] : "";
                }
            }
            /**窗体打开 */
            open() {
            }
            /**窗体关闭 */
            close() {
                super.close();
                Laya.Tween.clearAll(this.imgLine1);
                Laya.Tween.clearAll(this.imgLine2);
                Laya.Tween.clearAll(this.imgLine3);
                Laya.Tween.clearAll(this.imgLine4);
                Laya.Tween.clearAll(this.imgLine5);
                Laya.Tween.clearAll(this.imgBoss);
            }
            /**播放特效 */
            play() {
                super.play();
                let halfX = game.Define.DeviceW >> 1;
                this.imgBoss.x = game.Define.DeviceH;
                Laya.Tween.to(this.imgBoss, { x: halfX }, 700, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.imgBoss, { x: -this.imgBoss.width }, 200, null, Laya.Handler.create(this, () => {
                        Laya.Tween.clearAll(this.imgBoss);
                        this.isPlaying = false;
                        this.stop();
                    }), 800);
                }));
                if (this.lblWord.text != "") {
                    this.lblWord.x = game.Define.DeviceH;
                    Laya.Tween.to(this.lblWord, { x: halfX }, 700, null, Laya.Handler.create(this, () => {
                        Laya.Tween.to(this.lblWord, { x: -this.lblWord.width }, 200, null, Laya.Handler.create(this, () => {
                            Laya.Tween.clearAll(this.lblWord);
                        }), 800);
                    }));
                }
                let time1 = 600, time2 = 600;
                this.lineMove(this.imgLine1, game.Define.DeviceH, -this.imgLine1.width, time1, time2, 100);
                this.lineMove(this.imgLine2, -this.imgLine2.width, game.Define.DeviceH, time1, time2, 200);
                this.lineMove(this.imgLine3, game.Define.DeviceH, -this.imgLine3.width, time1, time2, 300);
                this.lineMove(this.imgLine4, -this.imgLine4.width, game.Define.DeviceH, time1, time2, 400);
                this.lineMove(this.imgLine5, game.Define.DeviceH, -this.imgLine5.width, time1, time2, 500);
            }
            /**停止特效 */
            stop() {
                super.stop();
            }
        }
        effect.BossWarningEft = BossWarningEft;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=BossWarningEft.js.map
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 图片切换特效
        2019-09-24 andy
        */
        class ChangeImageEft extends effect.BaseEffect {
            constructor(isScene) {
                super(isScene);
                /**图片列表*/
                this.arrImg = null;
                /**图片数量*/
                this.imgCount = 0;
                /**切换时间 单位：毫秒*/
                this.changeTime = 0;
                //
                this.curIndex = 0;
                //
                this.curImg = null;
            }
            /**执行一次 */
            init() {
            }
            /**
             * 设置数据
             * @param arrSprite 父类
             * @param arrNumber
             * @param arrString
             */
            setData(arrSprite, arrNumber = null, arrString = null) {
                super.setData(arrSprite, arrNumber, arrString);
                if (arrString && arrString.length > 0) {
                    let img = null;
                    this.arrImg = [];
                    //显示图片
                    for (let skin of arrString) {
                        img = new Laya.Image();
                        img.anchorX = img.anchorY = 0.5;
                        img.skin = skin;
                        this.addChild(img);
                        this.arrImg.push(img);
                    }
                    this.imgCount = arrString.length;
                    //显示坐标
                    this.x = arrNumber.length > 0 ? arrNumber[0] : game.Define.DeviceW >> 1;
                    this.y = arrNumber.length > 1 ? arrNumber[1] : game.Define.DeviceH >> 1;
                    this.changeTime = arrNumber.length > 2 ? arrNumber[2] : 1000;
                    if (this.changeTime <= 0)
                        this.changeTime = 1000;
                    //显示父类
                    if (arrSprite && arrSprite.length > 0 && arrSprite[0]) {
                        this.parentContainer = arrSprite[0];
                    }
                }
            }
            /**窗体关闭 */
            close() {
                super.close();
                Laya.Tween.clearAll(this.curImg);
            }
            /**播放特效 */
            play() {
                super.play();
                if (!this.isPlaying) {
                    return;
                }
                Laya.timer.loop(this.changeTime, this, () => {
                    this.curIndex++;
                    if (this.curIndex >= this.imgCount) {
                        this.curIndex = 0;
                    }
                    let img;
                    for (let i = 0; i < this.imgCount; i++) {
                        img = this.arrImg[i];
                        img.visible = i == this.curIndex;
                        if (img.visible) {
                            this.curImg = img;
                        }
                    }
                    this.curImg.scaleX = this.curImg.scaleY = 0.2;
                    Laya.Tween.to(this.curImg, { scaleX: 1.2, scaleY: 1.2 }, 200, Laya.Ease.linearInOut, Laya.Handler.create(this, () => {
                        Laya.Tween.to(this.curImg, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.linearInOut, Laya.Handler.create(this, () => {
                        }));
                    }));
                });
            }
            /**停止特效 */
            stop() {
                super.stop();
            }
        }
        effect.ChangeImageEft = ChangeImageEft;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=ChangeImageEft.js.map
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 喷泉特效
        2019-07-26 andy
        */
        class FountainEft extends effect.BaseEffect {
            constructor(isScene) {
                super(isScene);
                //喷出的时间间隔，单位毫秒
                this.oneSendTime = 0;
                //喷出的时间间隔，单位毫秒
                this.oneShowTime = 0;
                //喷出最小X
                this.minX = 0;
                //喷出最大X
                this.maxX = 0;
                //喷出最小Y
                this.minY = 0;
                //喷出最大Y
                this.maxY = 0;
                //旋转度数
                this.needRotation = 0;
                this.arrImg = [];
            }
            /**执行一次 */
            init() {
            }
            /**
             * 设置数据
             * @param arrSprite
             * @param arrNumber [oneSendTime,minx,max,miny,maxy,oneShowTime,needRotation]
             * @param arrString [skin...]
             */
            setData(arrSprite, arrNumber = null, arrString = null) {
                super.setData(arrSprite, arrNumber, arrString);
                if (arrNumber) {
                    this.oneSendTime = arrNumber.length > 0 ? arrNumber[0] : 10;
                    this.minX = arrNumber.length > 1 ? arrNumber[1] : 0;
                    this.maxX = arrNumber.length > 2 ? arrNumber[2] : 1;
                    this.minY = arrNumber.length > 3 ? arrNumber[3] : 0;
                    this.maxY = arrNumber.length > 4 ? arrNumber[4] : 1;
                    this.oneShowTime = arrNumber.length > 5 ? arrNumber[5] : 200;
                    this.needRotation = arrNumber.length > 6 ? arrNumber[6] : 0;
                }
            }
            /**窗体打开 */
            open() {
            }
            /**窗体关闭 */
            close() {
                super.close();
                for (let img of this.arrImg) {
                    Laya.Tween.clearAll(img);
                }
            }
            /**播放特效 */
            play() {
                super.play();
                let halfX = game.Define.DeviceW >> 1;
                Laya.timer.loop(this.oneSendTime, this, this.launch);
            }
            launch() {
                let randIndex = MathUtil.randomRange(0, this.arrString.length - 1);
                let skin = this.arrString[randIndex];
                let img = this.getImg();
                if (!img) {
                    img = new Laya.Image();
                    img.anchorX = img.anchorY = 0.5;
                    img.skin = skin;
                    this.arrImg.push(img);
                }
                img.x = 0;
                img.y = 0;
                this.addChild(img);
                let randY = MathUtil.randomRange(this.minY, this.maxY);
                let randX = MathUtil.randomRange(this.minX, this.maxX);
                randX = MathUtil.randomRange(0, 1) == 0 ? randX : -randX;
                img.x = MathUtil.randomRange(0, this.minX >> 2);
                img.x = MathUtil.randomRange(0, 1) == 0 ? img.x : -img.x;
                Laya.Tween.to(img, { y: randY, rotation: this.needRotation * 0.4 }, this.oneShowTime * 0.3, Laya.Ease.cubicOut, Laya.Handler.create(this, () => {
                    Laya.Tween.to(img, { x: randX >> 1, y: randY + 50, rotation: this.needRotation * 0.7 }, this.oneShowTime * 0.4, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
                        Laya.Tween.to(img, { x: randX, y: 0, rotation: this.needRotation }, this.oneShowTime * 0.3, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
                            Laya.Tween.clearAll(img);
                            img.removeSelf();
                        }));
                    }));
                }));
            }
            getImg() {
                let ret = null;
                for (let img of this.arrImg) {
                    if (img && !img.parent) {
                        ret = img;
                        //console.log("缓存");
                        break;
                    }
                } //console.log("arrImg.length",this.arrImg.length);
                return ret;
            }
            /**停止特效 */
            stop() {
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
                super.stop();
                while (this.arrImg.length > 0) {
                    let img = this.arrImg.shift();
                    Laya.Tween.clearAll(img);
                    img.removeSelf();
                }
            }
        }
        effect.FountainEft = FountainEft;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=FountainEft.js.map
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 引导点击特效
        2019-07-19 andy
        */
        class GuideClickEft extends effect.BaseEffect {
            constructor(isScene) {
                super(isScene);
                //圆形
                this.imgCirle = null;
                //手指
                this.imgHand = null;
                this.imgCirle = new Laya.Image();
                this.imgCirle.anchorX = this.imgCirle.anchorY = 0.5;
                this.imgCirle.alpha = 0.5;
                this.imgCirle.graphics.drawCircle(0, 0, 60, "#ffffff");
                this.addChild(this.imgCirle);
                this.imgHand = new Laya.Image();
                this.imgHand.anchorX = this.imgHand.anchorY = 0.5;
                this.addChild(this.imgHand);
            }
            /**执行一次 */
            init() {
            }
            /**
             * 设置数据
             * @param arrSprite
             * @param arrNumber
             * @param arrString
             */
            setData(arrSprite, arrNumber = null, arrString = null) {
                super.setData(arrSprite, arrNumber, arrString);
                this.imgHand.skin = arrString[0];
                this.imgHand.x = 20;
                this.imgHand.y = 20;
            }
            /**窗体关闭 */
            close() {
                super.close();
                Laya.Tween.clearAll(this.imgCirle);
                Laya.Tween.clearAll(this.imgHand);
            }
            /**播放特效 */
            play() {
                super.play();
                let halfX = game.Define.DeviceW >> 1;
                this.big(this.imgCirle, this.imgHand);
            }
            big(sp, hand) {
                if (!this.isPlaying) {
                    return;
                }
                Laya.Tween.to(hand, { scaleX: 0.5, scaleY: 0.5 }, 350, null, Laya.Handler.create(this, () => {
                    Laya.Tween.clearTween(hand);
                    Laya.Tween.to(hand, { scaleX: 1, scaleY: 1 }, 350, null, Laya.Handler.create(this, () => {
                        Laya.Tween.clearTween(hand);
                        this.big(sp, hand);
                    }));
                }));
                Laya.timer.once(200, this, () => {
                    sp.scaleX = 1;
                    sp.scaleY = 1;
                    sp.alpha = 0.5;
                    Laya.Tween.to(sp, { scaleX: 2.5, scaleY: 2.5, alpha: 0 }, 300, null, Laya.Handler.create(this, () => {
                        Laya.Tween.clearTween(sp);
                    }));
                });
            }
            /**停止特效 */
            stop() {
                super.stop();
            }
        }
        effect.GuideClickEft = GuideClickEft;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));
//# sourceMappingURL=GuideClickEft.js.map
/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 2019-04-21 andy
         * 骨骼基类
         */
        class BaseBone extends Laya.Sprite {
            /**
             * 构造
             * @param type       骨骼名字
             * @param cacheType  模板类型
             * @param isAutoPlay 是否自动播放，默认true
             * @param isLoop     是否循环播放，默认false
             * @param layerName  显示层级，默认scene_king
             */
            constructor(type, cacheType = 0, isAutoPlay = true, isLoop = false, layerName = null) {
                super();
                /**唯一标识ID */
                this._objId = 0;
                /**缓存类型 */
                this.cacheType = 0;
                /**骨骼类型  */
                this.kingType = "boy";
                /**是否自动播放 */
                this.isAutoPlay = true;
                /**是否循环播放 */
                this.isLoop = false;
                /**显示层级 */
                this.layerName = null;
                /**随机序列ID */
                this._randIndex = 0;
                /**皮肤资源是否加载 */
                this.isLoad = false;
                this._objId = king.BoneManager.ins.boneIndex++;
                this.kingType = type;
                this.cacheType = cacheType;
                this.isAutoPlay = isAutoPlay;
                this.isLoop = isLoop;
                this.layerName = layerName;
                this.on(Laya.Event.ADDED, this, this.onAdd);
                EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
            }
            onAdd(e) {
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                king.BoneManager.ins.dicBone.add(this.objId, this);
                this.init();
            }
            /**
             * 需在子类设置
             */
            init() {
                if (!this._sk) {
                    this.resetSkin();
                }
            }
            BONE_TEMP_LOAD_FINISH(evt) {
                if (evt.data == this.kingType && !this._sk) {
                    if (!this.layerName) {
                        this.layerName = LayerName.scene_king;
                    }
                    LayerManager.ins.addChild(this, this.layerName);
                }
            }
            /**
             * 设置sk
             * @param sk
             */
            resetSkin() {
                let temp = king.BoneManager.ins.getTemp(this.kingType);
                if (!temp) {
                    return;
                }
                let sk = temp.buildArmature(this.cacheType);
                if (sk) {
                    this._sk = sk;
                    this._sk.on(Laya.Event.STOPPED, this, this.onStop);
                    this._sk.on(Laya.Event.COMPLETE, this, this.onComplete);
                    this.addChild(this._sk);
                    this.isLoad = true;
                    EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
                    if (this.isAutoPlay) {
                        this.play(this.isLoop);
                    }
                }
            }
            /**
             * 唯一标识ID
             */
            get objId() {
                return this._objId;
            }
            /**
             * 按顺序播放动作类型
             * @param isLoop 是否循环播放,默认false
             */
            play(isLoop = false) {
                this.visible = true;
                if (this._sk) {
                    if (this._randIndex >= this._sk.getAnimNum()) {
                        this._randIndex = 0;
                    }
                    this._sk.play(this._randIndex++, isLoop);
                }
            }
            /**
             * 停止播放
             */
            stop() {
                if (this._sk) {
                    this._sk.stop();
                }
            }
            /**
             * 设置动作类型
             * @param at 动作类型
             */
            setActionType(at) {
                this.curAticonType = at;
                if (this._sk) {
                    if (at < this._sk.getAnimNum()) {
                        this._sk.play(at, true);
                    }
                }
            }
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            setActionState(as) {
                this.curAticonState = as;
            }
            /**
             * 播放暂停事件
             * @param ev
             */
            onStop(ev) {
                //console.log("onStop " + ev);
                this.visible = false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            }
            /**
             * 播放完成事件
             * @param ev
             */
            onComplete(ev) {
                //console.log("onComplete " + ev);
                if (!this.isLoop) {
                    this.visible = false;
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            }
            onRemoved(e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
            }
        }
        king.BaseBone = BaseBone;
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseBone.js.map
/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 人物基类 【laya2专用】
         */
        class BaseKing extends Laya.Animation {
            constructor() {
                super();
                /**当前运动速度 */
                this.speed = 1;
                /**皮肤资源是否加载 */
                this.isLoad = false;
            }
            /**
             * 需在子类设置
             */
            init() {
                this._dicActionTypeNext = new Dictionary();
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                this.on(Laya.Event.STOPPED, this, this.onStop);
                this.on(Laya.Event.COMPLETE, this, this.onComplete);
            }
            /**
             * 设置皮肤
             * @param skinData 皮肤数据
             * @param isAdd    是否显示,默认是true
             */
            setSkin(skinData, isAdd = true) {
                if (skinData) {
                    this.skinData = skinData;
                }
                else {
                    console.log("this.skinData is null!");
                }
                //Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
                if (this.skinData.arrAction && this.skinData.arrAction.length > 0) {
                    //创建零散动画【适合小游戏】
                    let action;
                    for (let i = 0; i < this.skinData.arrAction.length; i++) {
                        action = this.skinData.arrAction[i];
                        Laya.Animation.createFrames(this.aniUrls(action.actionType.toString(), action.frameCount), this.skinData.kingType + "_" + action.actionType);
                    }
                }
                else {
                    //创建动画模板
                    for (let i = 0; i < this.skinData.cutRow; i++) {
                        Laya.Animation.createFrames(this.aniUrls(i.toString(), this.skinData.cutCol), this.skinData.kingType + "_" + i);
                    }
                }
                this.isLoad = true;
                this.setActionType(this.curAticonType);
                if (isAdd) {
                    king.KingManager.ins.addKing(this);
                }
                //}));
            }
            /**
             * 设置动作类型
             * @param at 动作类型
             * @param isLoop 是否循环
             */
            setActionType(at, isLoop = true) {
                this.curAticonType = at;
                if (this.isLoad) {
                    if (at != undefined && at >= 0) {
                        this.play(0, isLoop, this.skinData.kingType + "_" + at);
                        this.curAticonState = this.getActionState(at);
                    }
                }
            }
            getActionState(at) {
                let ret = null;
                ;
                switch (at) {
                    case ActionType.Left:
                    case ActionType.Right:
                    case ActionType.Up:
                    case ActionType.Down:
                    case ActionType.Left_up:
                    case ActionType.Left_down:
                    case ActionType.Right_up:
                    case ActionType.Right_down:
                        ret = ActionState.MOVE;
                        break;
                    case ActionType.JUMP:
                        ret = ActionState.JUMP;
                        break;
                    case ActionType.ROLL:
                        ret = ActionState.ROLL;
                        break;
                    case ActionType.DEAD:
                        ret = ActionState.DEAD;
                        break;
                    default:
                        break;
                }
                return ret;
            }
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            setActionState(as) {
                this.curAticonState = as;
            }
            /**
             * 注册这个动作完成后，下个动作该做啥动作
             * @param at
             * @param atNext
             */
            regAtcionTypeNext(at, atNext) {
                this._dicActionTypeNext.add(at, atNext);
            }
            /**
             * update
             */
            update() {
            }
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            onLabel(ev) {
                console.log(`complte ` + ev);
            }
            /**
             * 只播放一次
             * @param ev
             */
            onStop(ev) {
                //console.log(`onStop ` + ev);
                // this.visible=false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            }
            /**
             * 循环播放，每次播放完成事件
             * @param ev
             */
            onComplete(ev) {
                //console.log(`onComplete ` + ev);
                if (this._dicActionTypeNext.hasKey(this.curAticonType)) {
                    this.setActionType(this._dicActionTypeNext.get(this.curAticonType));
                }
            }
            onRemoved(e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.isLoad = false;
            }
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * actionName  动作的名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            aniUrls(actionName, length) {
                var urls = [];
                for (var i = 1; i <= length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(this.skinData.atlasName + "/" + this.skinData.kingType + "_" + actionName + "_" + i + ".png");
                }
                return urls;
            }
        }
        king.BaseKing = BaseKing;
        /**
         * 动作数据
         */
        class Action {
            /**
             *
             * @param actionType 动作类型
             * @param frameCount 动作帧数
             */
            constructor(actionType, frameCount) {
                this.actionType = actionType;
                this.frameCount = frameCount;
            }
        }
        king.Action = Action;
        /**
         * 皮肤数据
         */
        class SkinData {
            constructor(atlasName, kingType, arrAction, cutRow = 0, cutCol = 0) {
                /**图集名字 */
                this.atlasName = "";
                /**角色类型 */
                this.kingType = "";
                /**图集动画行数 */
                this.cutRow = 1;
                /**图集动画列数 */
                this.cutCol = 1;
                this.atlasName = atlasName;
                this.kingType = kingType;
                this.cutRow = cutRow;
                this.cutCol = cutCol;
                this.arrAction = arrAction;
            }
        }
        king.SkinData = SkinData;
        /*
        * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
        */
        let ActionType;
        (function (ActionType) {
            /**0 待机 */
            ActionType[ActionType["Wait"] = 0] = "Wait";
            /**1 左移 */
            ActionType[ActionType["Left"] = 1] = "Left";
            /**2 右移 */
            ActionType[ActionType["Right"] = 2] = "Right";
            /**3 上移 */
            ActionType[ActionType["Up"] = 3] = "Up";
            /**4 下移 */
            ActionType[ActionType["Down"] = 4] = "Down";
            /**5 左上移 */
            ActionType[ActionType["Left_up"] = 5] = "Left_up";
            /**6 左下移 */
            ActionType[ActionType["Left_down"] = 6] = "Left_down";
            /**7 右上移 */
            ActionType[ActionType["Right_up"] = 7] = "Right_up";
            /**8 右下移 */
            ActionType[ActionType["Right_down"] = 8] = "Right_down";
            /**9 跳跃 */
            ActionType[ActionType["JUMP"] = 9] = "JUMP";
            /**10 翻滚 */
            ActionType[ActionType["ROLL"] = 10] = "ROLL";
            /**11 攻击 */
            ActionType[ActionType["ATTACK"] = 11] = "ATTACK";
            /**12 被攻击 */
            ActionType[ActionType["ATTACKED"] = 12] = "ATTACKED";
            /**13 死亡 */
            ActionType[ActionType["DEAD"] = 13] = "DEAD";
        })(ActionType = king.ActionType || (king.ActionType = {}));
        /*
       * 动作状态;
       */
        let ActionState;
        (function (ActionState) {
            /**待机状态 */
            ActionState[ActionState["NONE"] = 0] = "NONE";
            /**移动状态 */
            ActionState[ActionState["MOVE"] = 1] = "MOVE";
            /**跳跃状态 */
            ActionState[ActionState["JUMP"] = 2] = "JUMP";
            /**翻滚状态 */
            ActionState[ActionState["ROLL"] = 3] = "ROLL";
            /**攻击状态 */
            ActionState[ActionState["ATTACK"] = 4] = "ATTACK";
            /**死亡状态 */
            ActionState[ActionState["DEAD"] = 5] = "DEAD";
        })(ActionState = king.ActionState || (king.ActionState = {}));
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseKing.js.map
var game;
(function (game) {
    var platform;
    (function (platform_1) {
        /*
        * 2019-03-06 andy
        平台管理
        */
        class PlatformManager {
            constructor() {
                if (PlatformManager._ins != null)
                    throw new Error("PlatformManager is single!");
                PlatformManager._ins = this;
            }
            static get ins() {
                if (!this._ins)
                    new PlatformManager();
                return this._ins;
            }
            /**先初始化平台 */
            init(data) {
                //初始化平台
                var platform;
                let isLocal = false;
                PlatformManager.mraid = Laya.Browser.window.mraid;
                if (Laya.Browser.window.wx) {
                    platform = PlatformManager.wxPlatform = new platform_1.WxPlatform();
                }
                else if (Laya.Browser.window.facebook) {
                    PlatformManager.mraid = Laya.Browser.window.FbPlayableAd;
                    platform = PlatformManager.fbPlatform = new platform_1.FaceBookPlatform();
                }
                else if (Laya.Browser.window.applovin) {
                    platform = PlatformManager.alPlatform = new platform_1.ApplovinPlatform();
                }
                else if (Laya.Browser.window.ironsource) {
                    //2019-09-16 andy ironsource对自己的dapi支持较好
                    PlatformManager.mraid = Laya.Browser.window.dapi;
                    platform = PlatformManager.isPlatform = new platform_1.IronSourcePlatform();
                }
                else if (Laya.Browser.window.unity) {
                    platform = PlatformManager.utPlatform = new platform_1.UnityPlatform();
                }
                else if (Laya.Browser.window.google) {
                    platform = PlatformManager.ggPlatform = new platform_1.GooglePlatform();
                }
                else if (Laya.Browser.window.mtg) {
                    platform = PlatformManager.mtgPlatform = new platform_1.MTGPlatform();
                }
                else if (Laya.Browser.window.vungle) {
                    platform = PlatformManager.vgPlatform = new platform_1.VunglePlatform();
                }
                else if (Laya.Browser.window.adcolony) {
                    platform = PlatformManager.acPlatform = new platform_1.AdColonyPlatform();
                }
                else {
                    console.log("默认平台，请注意检查平台是否设置 window.applovin 或 window.ironsource");
                    platform = new platform_1.LocalPlatform();
                    isLocal = true;
                }
                //2019-09-27 打包渠道的自动设置为使用base64
                if (!isLocal) {
                    Base64Manager.isUseBase64 = true;
                }
                console.log("BASE64Manager.isUseBase64", Base64Manager.isUseBase64);
                game.Global.platform = platform;
                game.Global.platform.init(data);
            }
            /**获取游戏配置 */
            get HttpConfig() {
                return {}; //PlatformAPI.getConfig();
            }
            static get wx() {
                return Laya.Browser.window.wx;
            }
            static get window() {
                return Laya.Browser.window;
            }
            static get fileSysMgr() {
                if (!this.wx)
                    return null;
                return this.wx.getFileSystemManager();
            }
            /**
             * 平台动作，暂时只有MTG调用
             * @param pa PlatformAction
             * @param para 参数
             */
            actionCallBack(action, para = null) {
                if (game.Global.platformId == PlatformID.mtg) {
                    switch (action) {
                        case PlatformAction.DownLoad:
                            if (Laya.Browser.window.install) {
                                console.log("调用 window.install");
                                Laya.Browser.window.install();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.install!");
                            }
                            break;
                        case PlatformAction.GameStart:
                            console.log("MTG 主动调用gameStart！");
                            break;
                        case PlatformAction.GameReady:
                            if (Laya.Browser.window.gameReady) {
                                console.log("调用 window.gameReady");
                                Laya.Browser.window.gameReady();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.gameReady!");
                            }
                            break;
                        case PlatformAction.GameEnd:
                            if (Laya.Browser.window.gameEnd) {
                                console.log("调用 window.gameEnd");
                                Laya.Browser.window.gameEnd();
                            }
                            else {
                                TipManager.ins.showWord("MTG does not support window.gameEnd!");
                            }
                            break;
                        case PlatformAction.GameClose:
                            console.log("MTG 主动调用gameClose！");
                            break;
                    }
                }
                else if (game.Global.platformId == PlatformID.Is) {
                    let NUC = Laya.Browser.window.NUC;
                    if (!NUC) {
                        console.log("当前为IronSource渠道，NUC不存在，无法上报用户行为追踪！");
                        return;
                    }
                    switch (action) {
                        case PlatformAction.DownLoad:
                            if (NUC.trigger && NUC.trigger.convert) {
                                console.log("调用 NUC.trigger.convert");
                                NUC.trigger.convert();
                            }
                            else {
                                TipManager.ins.showWord("IronSourc does not support NUC.trigger.convert!");
                            }
                            break;
                        case PlatformAction.GameStart:
                            if (NUC.trigger && NUC.trigger.startLevel) {
                                console.log("调用 NUC.trigger.startLevel");
                                NUC.trigger.startLevel();
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support NUC.trigger.startLevel!");
                            }
                            break;
                        case PlatformAction.GameReady:
                            if (Laya.Browser.window.gameReady) {
                                console.log("调用 window.gameReady");
                                Laya.Browser.window.gameReady();
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support window.gameReady!");
                            }
                            break;
                        case PlatformAction.GameEnd:
                            if (NUC.trigger && NUC.trigger.endGame) {
                                console.log("调用 NUC.trigger.endGame");
                                NUC.trigger.endGame('win');
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support NUC.trigger.endGame!");
                            }
                            break;
                        case PlatformAction.GameCustom:
                            if (NUC.event && NUC.event.send) {
                                console.log("调用 NUC.event.send");
                                NUC.event.send("mouseclick", para);
                            }
                            else {
                                TipManager.ins.showWord("IronSource does not support NUC.event.send!");
                            }
                            break;
                    }
                }
                else if (game.Global.platformId == PlatformID.Vg) {
                    switch (action) {
                        case PlatformAction.DownLoad:
                            break;
                        case PlatformAction.GameStart:
                            break;
                        case PlatformAction.GameReady:
                            break;
                        case PlatformAction.GameEnd:
                            if (parent) {
                                console.log("调用 parent.postMessage('complete','*')");
                                parent.postMessage('complete', '*');
                            }
                            else {
                                TipManager.ins.showWord("Vungle does not support parent.postMessage!");
                            }
                            break;
                        case PlatformAction.GameCustom:
                            break;
                    }
                }
                else {
                    //console.log("当前为本地测试 无用户行为追踪！");
                }
            }
        }
        platform_1.PlatformManager = PlatformManager;
        let PlatformID;
        (function (PlatformID) {
            PlatformID[PlatformID["None"] = 0] = "None";
            /**微信 */
            PlatformID[PlatformID["Wx"] = 1] = "Wx";
            /**FaceBook */
            PlatformID[PlatformID["Fb"] = 2] = "Fb";
            /**APPLovin */
            PlatformID[PlatformID["Al"] = 3] = "Al";
            /**IronSource */
            PlatformID[PlatformID["Is"] = 4] = "Is";
            /**Unity */
            PlatformID[PlatformID["Ut"] = 5] = "Ut";
            /**Google ads */
            PlatformID[PlatformID["Gg"] = 6] = "Gg";
            /**Vungle */
            PlatformID[PlatformID["Vg"] = 7] = "Vg";
            /**AdColony */
            PlatformID[PlatformID["Ac"] = 8] = "Ac";
            /**MTG */
            PlatformID[PlatformID["mtg"] = 9] = "mtg";
        })(PlatformID = platform_1.PlatformID || (platform_1.PlatformID = {}));
        let LangType;
        (function (LangType) {
            /**中文 */
            LangType[LangType["Zh"] = 0] = "Zh";
            /**英文 */
            LangType[LangType["En"] = 1] = "En";
        })(LangType = platform_1.LangType || (platform_1.LangType = {}));
        let PlatformAction;
        (function (PlatformAction) {
            PlatformAction[PlatformAction["None"] = 0] = "None";
            /**下载 主动*/
            PlatformAction[PlatformAction["DownLoad"] = 1] = "DownLoad";
            /**GameEnd 主动必须*/
            PlatformAction[PlatformAction["GameEnd"] = 2] = "GameEnd";
            /**GameReady 主动*/
            PlatformAction[PlatformAction["GameReady"] = 3] = "GameReady";
            /**GameStart 被动调用*/
            PlatformAction[PlatformAction["GameStart"] = 4] = "GameStart";
            /**GameClose 被动调用*/
            PlatformAction[PlatformAction["GameClose"] = 5] = "GameClose";
            /**GameCustom 自定义点击行为*/
            PlatformAction[PlatformAction["GameCustom"] = 6] = "GameCustom";
        })(PlatformAction = platform_1.PlatformAction || (platform_1.PlatformAction = {}));
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=PlatformManager.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        /*
        * name;
        */
        class LocalPlatform {
            constructor() {
                this.window = platform.PlatformManager.window;
                this.fileSysMgr = platform.PlatformManager.fileSysMgr;
                game.Global.platformId = platform.PlatformID.None;
                game.Define.langId = platform.LangType.En;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                game.Define.isLocal = true;
                //2018-12-13 在进入游戏前，需要提前准备的东西
                EventManager.ins.init();
            }
            init(data) {
                if (data) {
                    this.getRandomShareFunc = data.getRandomShare;
                    this.isCanPlayVideoFunc = data.sCanPlayVideo;
                    this.getAdDataFunc = data.getAdData;
                    this.getAdVideoDataFunc = data.getAdVideoData;
                    console.log("平台初始化：" + data.getRandomShare);
                }
                if (game.Global.platformId == platform.PlatformID.None) {
                    EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                }
            }
            initSkinGame() {
                // if(Define.isDebug){
                //     Define.cdn = "../res/";
                // }else{
                //     Define.cdn = "res/";
                // }
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            getUserInfo() {
                return this.userInfo;
            }
            initItem() {
                console.log("需要平台实现此功能");
            }
            saveItem(ID, count, type) {
                console.log("需要平台实现此功能");
            }
            scoreUp(rank, score) {
                console.log("需要平台实现此功能");
            }
            share(func, queryKey) {
                console.log("需要平台实现此功能");
            }
            createBannerAd(posKey) {
                console.log("需要平台实现此功能");
            }
            showBannerAd(isShow) {
                console.log("需要平台实现此功能");
            }
            destroyBannerAd() {
                console.log("需要平台实现此功能");
            }
            createVideoAd(posKey, success) {
                console.log("创建广告：" + posKey);
            }
            addMoreGameBtn(parent) {
                console.log("需要平台实现此功能 微信独有");
            }
            createBrandSprite(parent, x, y) {
                console.log("需要平台实现此功能 微信独有");
            }
            postMsg(postName, obj) {
                console.log("需要平台实现此功能 微信独有");
            }
            shake(isShort, delay) {
                console.log("需要平台实现此功能");
            }
            saveImageToPhotosAlbum(url) {
                console.log("保存图片接口没有实现");
            }
            setUserCloudStorage(key, value) {
                console.log("云端保存数据接口没有实现");
            }
            getLocalImage(type) {
                console.log("需要平台实现此功能");
            }
            /**获得焦点时，前台运行 */
            onShowCallBack(res) {
                console.log("小游戏获得焦点，进入前台运行");
                //SoundManager.ins.setOn(true);
            }
            /**失去焦点时，后台运行 */
            onHideCallBack() {
                console.log("小游戏失去焦点，进入后台运行");
                //SoundManager.ins.setOn(false);
                Laya.SoundManager.stopMusic();
            }
        }
        platform.LocalPlatform = LocalPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=LocalPlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * AdColony
        2019-11-11 andy
        */
        class AdColonyPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Ac;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                //SoundManager.ins.setOn(false);
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("AdColony 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.AdColonyPlatform = AdColonyPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=AdColonyPlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Applovin
        2019-05-01 andy
        */
        class ApplovinPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Al;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("Applovin 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.ApplovinPlatform = ApplovinPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=ApplovinPlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * facebook
        2018-12-08 andy
        */
        class FaceBookPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Fb;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("FaceBook 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.FaceBookPlatform = FaceBookPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=FaceBookPlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Google
        2019-06-24 andy
        */
        class GooglePlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Gg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("Google 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.GooglePlatform = GooglePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=GooglePlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * IronSource 以色列投放广告平台
        2019-05-01 andy
        */
        class IronSourcePlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Is;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("IronSource 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.IronSourcePlatform = IronSourcePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=IronSourcePlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * MTG 国内平台 https://www.mintegral.com
        2019-05-16 andy
        */
        class MTGPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.mtg;
                game.Define.langId = platform.LangType.Zh;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                Laya.Browser.window.gameStart = () => { platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart); };
            }
            initGameSkin() {
            }
            login() {
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameReady);
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("MTG 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.MTGPlatform = MTGPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=MTGPlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Unity
        2019-06-13 andy
        */
        class UnityPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Ut;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("Unity 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.UnityPlatform = UnityPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=UnityPlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Vungle
        2019-10-23 andy
        */
        class VunglePlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Vg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
            }
            init() {
                super.init({});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            }
            initGameSkin() {
            }
            login() {
                this.loginSuccess();
            }
            loginSuccess() {
                console.log("Vungle 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            /**
             * 获取过审状态
             */
            getSwitchState() {
                return true;
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            scoreUp(rank, score) {
                super.scoreUp(rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            }
            firstUp() {
            }
        }
        platform.VunglePlatform = VunglePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=VunglePlatform.js.map
var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        var OpenManager = game.common.OpenManager;
        /*
        * 2019-03-06 andy
        微信平台
        */
        class WxPlatform extends platform.LocalPlatform {
            constructor() {
                super();
                game.Global.platformId = platform.PlatformID.Wx;
                game.Define.langId = platform.LangType.Zh;
                game.Define.isLocal = false;
                game.Define.serverHttp = "http://192.168.2.104:3000/"; //
                //Define.CDN = "https://cdn.h5haowan.top/paoku3d/res"+Define.gameVersion+"/";
                this.wx = Laya.Browser.window.wx;
            }
            init(data) {
                super.init(data);
                //初始化微信相关
                this.initSysInfo();
                let th = this;
                this.wx.onShow((res) => {
                    this.onShowCallBack(res);
                });
                this.wx.onHide(() => {
                    this.onHideCallBack();
                });
                //显示转发按钮
                this.wx.showShareMenu({
                    withShareTicket: true,
                    success: (e) => {
                        //e.showShareMenuCallBack();
                        console.log("wx.showShareMenu成功");
                    },
                    fail: (e) => {
                        console.log("wx.showShareMenu失敗");
                    }
                });
                //是否授权
                this.wx.getSetting({
                    success(res) {
                        var authSetting = res.authSetting;
                        if (authSetting['scope.userInfo'] === true) {
                            // 用户已授权，可以直接调用相关 API
                            console.log("用户已授权");
                            th.getWxUserInfo();
                        }
                        else if (authSetting['scope.userInfo'] === false) {
                            // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                            console.log("用户已拒绝授权");
                            th.wx.showModal({
                                title: '提示',
                                content: '继续游戏需要获得你的授权',
                                success(res) {
                                    if (res.confirm) {
                                        th.wx.openSetting({
                                            success(res) {
                                                th.getWxUserInfo();
                                            }
                                        });
                                    }
                                    else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                    else {
                                    }
                                }
                            });
                        }
                        else {
                            // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                            console.log("未询问过用户授权");
                            th.wx.authorize({
                                scope: 'scope.userInfo',
                                success() {
                                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                                    th.getWxUserInfo();
                                },
                                fail() {
                                    th.getWxUserInfo();
                                }
                            });
                        }
                    }
                });
                // Laya.MiniAdpter.remove(Define.cdn+"atlas/game.bin");
                this.initSkinGame();
            }
            getWxUserInfo() {
                let th = this;
                //2018-12-19 andy 点击主界面右上角分享
                this.wx.onShareAppMessage(() => {
                    var data = this.getRandomShareFunc ? this.getRandomShareFunc.run() : { title: "分享测试", imageUrl: "" };
                    var query = "openid=" + game.Global.openId + "&uid=" + game.Global.UID;
                    console.log("wx.onShareAppMessage openId=" + game.Global.openId + " uid=" + game.Global.UID);
                    return {
                        title: data.title,
                        imageUrl: data.imageUrl,
                        query: query,
                        success: (res) => {
                            game.Global.shareTicket = res.shareTickets;
                            console.log("wx.onShareAppMessage success!shareTicket=" + game.Global.openId);
                        }
                    };
                });
                this.wx.getUserInfo({
                    success(res) {
                        th.userInfo = res.userInfo;
                        EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                    },
                    fail() {
                        //测试版本和开发版本取不到此信息
                        EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                    }
                });
            }
            /**换皮游戏时，需要设置 */
            initSkinGame() {
                //2018-12-29 andy 获得gameId
                // if(Define.gameId==104){
                //     Define.isGame1=true;
                //     Define.gameIndex=1;
                //     Define.gameVersion="139";
                //     Define.gameHttpRoute="parkours";
                //     Define.appId="wx659ae0df220d382f";
                // }else if(Define.gameId==198){
                //     Define.isGame2=true;
                //     Define.gameIndex=2;
                //     Define.gameVersion="100";
                //     Define.gameHttpRoute="parkoura";
                //     Define.appId="wxde742b6565f3a16a";
                // }else{
                // }
                console.log("当前 GameID:" + game.Define.gameId + " AppID:" + game.Define.appId);
            }
            login() {
                let ths = this;
                this.wx.login({
                    timeout: 10000,
                    success: function (e) {
                        console.log("微信登录成功！ " + e.errMsg + "！code=" + e.code);
                        game.Global.code = e.code;
                        //HttpManager.ins.login(e.code,ths.userInfo.nickName,ths.userInfo.avatarUrl,"");
                        game.Global.platform.loginSuccess();
                    },
                    fail: function (e) {
                        console.log(e.errMsg + "！");
                    }
                });
            }
            loginSuccess() {
                // Global.roleData.code =  Global.code;
                // Global.UserInfo  = this.userInfo;
                // Global.roleData.nickname = this.userInfo.nickName;
                // Global.roleData.avatarUrl = this.userInfo.avatarUrl;
                //登录上传玩家数据
                // HttpManager.ins.profile();
                // HttpManager.ins.shareNum();
                // HttpManager.ins.initTask();
                // HttpManager.ins.rankList(RankType.Score);
                // HttpManager.ins.rankList(RankType.First);
                //HttpManager.ins.getShareList();
                var fromid;
                var query = game.Global.query;
                if (query) {
                    if (query.hasOwnProperty("openid")) {
                        if (query.hasOwnProperty("gold")) {
                            fromid = query.openid;
                        }
                    }
                    if (query.hasOwnProperty("signGold")) {
                        //Global.roleData.signGold = query.signGold;
                    }
                }
                OpenManager.ins.setLogin();
                // //激活分享链接
                // if(query && query.hasOwnProperty("uid")){
                //     HttpManager.ins.activeShare(query.uid);
                // }
                //进入游戏
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            }
            initItem() {
            }
            saveItem(ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            }
            share(func, queryKey) {
                this.shareAppSuccess = func;
                var data = this.getRandomShareFunc ? this.getRandomShareFunc.run() : { title: "分享一个好玩的游戏", imageUrl: "res/atlas/not/share.jpg" };
                var query = "openid=" + game.Global.openId + "&uid=" + game.Global.UID;
                if (queryKey != null) {
                    query += "&" + queryKey;
                }
                this.wx.updateShareMenu({
                    //withShareTicket:true,
                    success: (e) => {
                        this.wx.shareAppMessage({
                            title: data.title,
                            imageUrl: data.imageUrl,
                            query: query,
                            success(res) {
                                //console.log("shareAppMessage成功！res="+res);
                            }
                        });
                        console.log("分享标题：" + data.title + " 分享内容图片：" + data.imageUrl + " query=" + query);
                    },
                    // fail: function(e) {
                    //     console.log("updateShareMenu失败！"+JSON.stringify(e));
                    // }
                });
            }
            createBannerAd(adName) {
                if (this.bannerAd) {
                    this.bannerAd.destroy();
                }
                let ad = this.getAdDataFunc ? this.getAdDataFunc.runWith(adName) : null;
                if (!ad) {
                    console.log("未找到图片广告配置：" + ad.adName);
                    return;
                }
                this.bannerAd = this.wx.createBannerAd({
                    adUnitId: ad.adUnitId,
                    style: {
                        left: ad.left,
                        top: ad.top,
                        width: ad.width,
                        height: ad.height
                    }
                });
                this.bannerAd.onError(err => {
                    console.log(err);
                });
                this.bannerAd.onLoad(() => {
                    console.log('banner 广告加载成功');
                });
                this.bannerAd.onResize(res => {
                    let width = res.width, height = res.height;
                    this.bannerAd.style.top = window.innerHeight - height;
                    //this.bannerAd.style.width = 400;
                });
                this.showBannerAd(true);
            }
            showBannerAd(isShow) {
                if (!this.bannerAd) {
                    return;
                }
                if (isShow) {
                    this.bannerAd.show();
                }
                else {
                    this.bannerAd.hide();
                }
            }
            destroyBannerAd() {
                if (this.bannerAd) {
                    this.bannerAd.offError();
                    this.bannerAd.offLoad();
                    this.bannerAd.offResize();
                    this.bannerAd.destroy();
                    this.bannerAd = null;
                }
            }
            createVideoAd(adName, callBack) {
                let ad = this.getAdVideoDataFunc ? this.getAdVideoDataFunc.runWith(adName) : null;
                ;
                if (!ad) {
                    console.log("未找到视频广告配置：" + adName);
                    return;
                }
                if (ad.playCount >= ad.maxPlayCount) {
                    console.log("视频播放超过上限：" + adName);
                    return;
                }
                if (this.isCanPlayVideoFunc && !this.isCanPlayVideoFunc.runWith(adName)) {
                    return;
                }
                // if(this.videoAd){
                //     this.videoAd.destroy();
                // }
                this.videoAd = this.wx.createRewardedVideoAd({
                    adUnitId: ad.adUnitId
                });
                // this.videoAd.onError(err => {
                //     console.log(err);
                // })
                // this.videoAd.onLoad(() => {
                //     console.log('视频广告加载成功');
                // })
                this.videoAd.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        callBack && callBack.run();
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        this.wx.showModal({
                            title: "提示",
                            content: "视频未播放完"
                        });
                    }
                });
                this.wx.showLoading({
                    title: "视频加载中",
                    mask: true
                });
                this.videoAd.load()
                    .then(() => {
                    this.wx.hideLoading();
                    return this.videoAd.show();
                }).catch(err => {
                    console.log(err);
                    this.wx.hideLoading();
                    this.wx.showModal({
                        title: "提示",
                        content: "视频加载失败, 请稍后再试"
                    });
                });
            }
            shake(isShort, delay) {
                console.log("调用微信手机震动");
                if (isShort) {
                    this.wx.vibrateShort(delay);
                }
                else {
                    this.wx.vibrateLong(delay);
                }
            }
            saveImageToPhotosAlbum(filePath) {
                var file; //= Laya.MiniAdpter.getFileInfo(Laya.URL.basePath+filePath);
                var md5 = file.md5;
                var jdPath = ""; //Laya.MiniFileMgr.getFileNativePath(file.md5);
                this.wx.saveImageToPhotosAlbum({
                    filePath: jdPath,
                    success: function (res) {
                        console.log("保存图片成功");
                    },
                    fail: function (e) {
                        console.log("保存图片失败！" + JSON.stringify(e));
                    }
                });
            }
            getLocalImage(type) {
                var that = this;
                this.wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: res => {
                        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来 
                        //app.startOperating("保存中") 
                        var filePath = res.tempFilePaths[0];
                        var session_key = this.wx.getStorageSync('session_key');
                        //获取base64
                        var base64 = this.wx.getFileSystemManager().readFileSync(filePath, "base64");
                        let data = {};
                        data["image"] = base64;
                        let url = "";
                        let access_token = "24.3fa0c0561fbfacf7b51cdca51328247e.2592000.1554966363.282335-15738709";
                        if (type == 0) {
                            url = "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=" + access_token;
                            data["id_card_side"] = "front";
                        }
                        else if (type == 1) {
                            url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + access_token;
                        }
                        this.wx.request({
                            url: url,
                            data: data,
                            method: 'post',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            success: function (res) {
                                console.log(res.data);
                                EventManager.ins.event(NoticeEvent.AI_IMAGE_TO_WORD, res.data);
                            }
                        });
                    },
                    fail: function (error) {
                        console.error("调用本地相册文件时出错");
                        console.warn(error);
                    },
                    complete: function () { }
                });
            }
            setUserCloudStorage(key, value) {
                console.log("开始保存数据到云端！");
                var KVDataList = [{
                        key: key,
                        value: String(value)
                    }];
                this.wx.setUserCloudStorage({
                    KVDataList: KVDataList,
                    success: function () {
                        console.log("保存数据到云端！");
                    },
                    fail: function () {
                    }
                });
            }
            /** 主域调用*/
            postMsg(cmd, data) {
                var openDataContext = this.wx.getOpenDataContext();
                openDataContext.postMessage({ cmd: cmd, data: data });
            }
            onShowCallBack(res) {
                super.onShowCallBack(res);
                game.Global.query = res.query;
                game.Global.shareTicket = res.shareTicket;
                console.log("wx onShow! query=" + JSON.stringify(game.Global.query) + ",shareTicket=" + game.Global.shareTicket);
                //2018-12-19 andy 分享对象，完成分享任务
                // if(Global.query != null){
                //     let uid:string=Global.query["uid"];
                //     if(uid!=null && uid!=""){
                //         HttpManager.ins.activeShare(uid);
                //     }
                // }
                if (game.Global.shareTicket != null && game.Global.shareTicket != "") {
                    OpenManager.ins.setShareTicket();
                    console.log("微信转发已经提交服务器");
                }
                if (this.shareAppSuccess != null) {
                    this.shareAppSuccess();
                    this.shareAppSuccess = null;
                }
            }
            onHideCallBack() {
                super.onHideCallBack();
            }
            initSysInfo() {
                var res = this.wx.getSystemInfoSync();
                game.Global.BRAND = res.brand;
                game.Global.MODEL = res.model;
                game.Global.SYSTEM = res.system;
                //环境 手机型号 手机系统
                console.log("brand:" + game.Global.BRAND + ",model:" + game.Global.MODEL + ",system:" + game.Global.SYSTEM);
                if (this.wx.getUpdateManager instanceof Function) {
                    /**
                        小程序没有重启的概念
                        当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
                        在 iOS 上，当微信客户端在一定时间间隔内（目前是 5 秒）连续收到两次及以上系统内存告警时，会主动进行小程序的销毁，并提示用户 「该小程序可能导致微信响应变慢被终止」。
                        建议小程序在必要时使用 wx.onMemoryWarning 监听内存告警事件，进行必要的内存清理。
                        */
                    //全局唯一的版本更新管理器，用于管理小程序更新
                    var t = this.wx.getUpdateManager();
                    t.onCheckForUpdate(function (t) {
                        //微信在小程序冷启动时自动检查更新，微信自动下载，不需由开发者主动触发
                        console.log("小游戏是否有新版本：" + t.hasUpdate);
                    }), t.onUpdateReady(function () {
                        //新版本下载完成，强制小程序重启并使用新版本
                        t.applyUpdate();
                    }), t.onUpdateFailed(function () {
                        //新版本下载失败（可能是网络原因等）
                    });
                }
            }
            showModal(title, content, isCancel) {
                this.wx.showModal({
                    title: title,
                    content: content,
                    showCancel: isCancel
                });
            }
            removeUserCloudStorage(key) {
                this.wx.removeUserCloudStorage({
                    KVDataList: [key],
                    success: function () {
                        console.log("托管数据" + key + "删除成功");
                    },
                    fail: function () {
                        console.log("托管数据" + key + "删除失败");
                    }
                });
            }
        }
        platform.WxPlatform = WxPlatform;
        let WeChatCall;
        (function (WeChatCall) {
            WeChatCall[WeChatCall["FAIL"] = 0] = "FAIL";
            WeChatCall[WeChatCall["SUCCESS"] = 1] = "SUCCESS";
            WeChatCall[WeChatCall["NO_MINI"] = 2] = "NO_MINI";
        })(WeChatCall || (WeChatCall = {}));
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=WxPlatform.js.map
/**
* name
*/
var game;
(function (game) {
    var ui;
    (function (ui) {
        /**
         * 序列帧动画
         */
        class BaseFrame extends Laya.Animation {
            /**
             *
             * @param frameName
             * @param frameCount
             * @param isLoop
             * @param isAutoPlay
             * @param layer
             * @param atlasName
             * @param callBack
             */
            constructor(frameName, frameCount, isLoop = true, isAutoPlay = true, layer = null, atlasName = "frame", callBack = null) {
                super();
                /**帧动画名字 */
                this.frameName = "";
                /**序列动画帧数 */
                this.frameCount = 1;
                /**是否循环播放 */
                this.isLoop = false;
                /**是否加载后在动播放 */
                this.isAutoPlay = false;
                /**是否加载后在动添加到场景 */
                this.isAutoAdd = false;
                /**皮肤资源是否加载 */
                this.isLoad = false;
                this.frameName = frameName;
                this.frameCount = frameCount;
                this.isLoop = isLoop;
                this.isAutoPlay = isAutoPlay;
                this.layer = layer;
                this.atlasName = atlasName;
                this.callBack = callBack;
                this.on(Laya.Event.ADDED, this, this.onAdd);
            }
            onAdd() {
                this.off(Laya.Event.ADDED, this, this.onAdd);
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                this.on(Laya.Event.STOPPED, this, this.onStop);
                this.on(Laya.Event.COMPLETE, this, this.onComplete);
            }
            /**
             * 需在子类设置
             */
            init() {
            }
            /**
             * 加载动画图集
             */
            setAtlas() {
                // if(BASE64Manager.isUseBase64){
                // 	this.loadFinish();
                // }else{
                // Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
                this.loadFinish();
                // }));
                // }        	
            }
            loadFinish() {
                this.isLoad = true;
                //创建动画模板
                let arr = [];
                for (let i = 1; i <= this.frameCount; i++) {
                    arr.push(this.atlasName + "/" + this.frameName + "_" + i + ".png");
                }
                Laya.Animation.createFrames(arr, this.frameName);
                if (this.isAutoPlay) {
                    this.playFrame();
                }
                if (this.layer) {
                    ui.UIManager.ins.addFrameAnimation(this, this.layer);
                }
            }
            /**
             * 播放序列帧动画
             */
            playFrame() {
                if (this.isLoad) {
                    this.visible = true;
                    this.play(0, this.isLoop, this.frameName);
                }
            }
            /**
             * 停止序列帧动画
             */
            stopFrame() {
                this.visible = false;
                this.stop();
            }
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            onLabel(ev) {
                //console.log(`onLabel ` + ev);
            }
            /**
             * 只播放一次
             * @param ev
             */
            onStop(ev) {
                //console.log(`onStop ` + ev);
                this.visible = false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            }
            /**
             * 循环播放，每次播放完成事件
             * @param ev
             */
            onComplete(ev) {
                //console.log(`onComplete ` + ev);
                if (!this.isLoop) {
                    this.visible = false;
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            }
            onRemoved(e) {
                this.on(Laya.Event.ADDED, this, this.onAdd);
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.off(Laya.Event.STOPPED, this, this.onStop);
                this.off(Laya.Event.COMPLETE, this, this.onStop);
                Laya.timer.clearAll(this);
                this.isLoad = false;
            }
        }
        ui.BaseFrame = BaseFrame;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseFrame.js.map
var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 窗体基类
        */
        class BaseWindow extends ui.BaseUI {
            constructor(viewCls) {
                super();
                this.uiType = null;
                this.view = null;
                this.isInit = false;
                this.view = new viewCls();
                this.view.on(Laya.Event.ADDED, this, this.onAdd);
            }
            /**执行一次 */
            init() {
            }
            onAdd(event) {
                if (!this.isInit) {
                    this.isInit = true;
                    this.init();
                }
                this.view.on(Laya.Event.CLICK, this, this.mouseClick);
                this.view.on(Laya.Event.REMOVED, this, this.onRmove);
                ui.UIScaleManager.ins.regUI(this.uiType.name, () => { this.scaleH(); }, () => { this.scaleV(); });
                this.open();
            }
            onRmove(event) {
                this.view.off(Laya.Event.CLICK, this, this.mouseClick);
                this.view.off(Laya.Event.REMOVED, this, this.onRmove);
                ui.UIScaleManager.ins.regUI(this.uiType.name, null, null);
                this.close();
            }
            /**窗体是否打开 */
            isOpen() {
                return this.view != null && this.view.parent != null;
            }
            /**窗体打开 */
            open() {
            }
            /**横屏时布局设置 */
            scaleH() {
            }
            /**竖屏时布局设置 */
            scaleV() {
            }
            mouseClick(event) {
                let btn = event.target;
                if (btn instanceof Laya.Sprite) {
                    //按钮增加点击效果，view,list除外
                    if (btn.name == "" || btn instanceof BaseWindow || btn instanceof Laya.Box || btn instanceof Laya.ProgressBar
                        || btn instanceof Laya.ScrollBar || btn instanceof Laya.Slider || btn instanceof Laya.ComboBox) {
                    }
                    else {
                        if (btn instanceof Laya.Button) {
                            Laya.Tween.from(btn, { scaleX: 0.8, scaleY: 0.8 }, 80);
                        }
                        //SoundManager.ins.playSound(Define.SOUND_BTN);
                        this.viewClick(btn);
                    }
                }
            }
            /**窗体点击事件 */
            viewClick(sp) {
                let spName = sp.name;
                //console.log("点击按钮："+spName);
                switch (spName) {
                    case "btnClose":
                        ui.UIManager.ins.closeWindow(this.uiType);
                        break;
                    default:
                        break;
                }
            }
            /**窗体关闭 */
            close() {
                //console.log("窗体已关闭");
            }
        }
        ui.BaseWindow = BaseWindow;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseWindow.js.map
var game;
(function (game) {
    var LangType = game.platform.LangType;
    var ScreenFillType = game.scene.ScreenFillType;
    /*
    * 2019-02-28 andy
    全局游戏常量定义
    */
    class Define {
        constructor() {
        }
    }
    /**是否测试模式 */
    Define.isDebug = true;
    Define.DeviceW = 720;
    Define.DeviceH = 1280;
    /**游戏资源根目录 */
    Define.CDN = "res";
    /**服务端HTTP */
    Define.serverHttp = "http://127.0.0.1";
    /**服务端websocket地址 */
    Define.serverIP = "http://127.0.0.1";
    /**服务端websocket端口 */
    Define.serverPort = "3000";
    /**网关HTTP地址 */
    Define.serverConfigUrl = "res/config/serverConfig.json"; //"http://127.0.0.1:8090/webgame/config.html";//
    /**游戏ID */
    Define.gameId = 1;
    /**游戏版本号 */
    Define.gameVersion = "100";
    /**语言类型 */
    Define.langId = LangType.Zh;
    /**是否单机游戏 */
    Define.isLocal = true;
    /**是否竖屏游戏 */
    Define.isVertitalGame = true;
    /**是否竖屏状态 */
    Define.isVertitalState = true;
    /**横竖屏转换时，是否等比缩放,默认是false，若为true需要自己处理逻辑 */
    Define.isSameScale = false;
    /**横竖屏转换时，背景图是否等比缩放,默认是true，若为false一般背景图不会上下左右移动，固定背景 */
    Define.isSameBackgroundScale = true;
    /**竖屏游戏-横屏时填充模式 或者 横屏游戏-竖屏时填充模式*/
    Define.screenFillType = ScreenFillType.default;
    /**微信APPID */
    Define.appId = "wx659ae0df220d382f";
    /**点击按钮时的声音 */
    Define.SOUND_BTN = "";
    /**点击按钮时的声音 */
    Define.SOUND_MAIN = null;
    /**游戏下载地址 */
    Define.DOWNLOAD_URL = "";
    /**游戏背景颜色 */
    Define.BACKGROUND_COLOR = "";
    game.Define = Define;
    /**广告配置 */
    class AdConfig {
        constructor() { }
    }
    game.AdConfig = AdConfig;
})(game || (game = {}));
//# sourceMappingURL=Define.js.map
var game;
(function (game) {
    var PlatformID = game.platform.PlatformID;
    /*
    * 2019-02-27 andy
    全局基类
    */
    class Global {
        constructor() {
        }
    }
    /**平台ID */
    Global.platformId = PlatformID.None;
    game.Global = Global;
})(game || (game = {}));
//# sourceMappingURL=Global.js.map
console.log("game.core version: 2019-06-10 2.0.0");
//laya2和laya1 同步注意：Base64Manager SceneManager
//全局定义
var Define = game.Define;
var Global = game.Global;
Global;
//界面
var BaseUI = game.ui.BaseUI;
var BaseWindow = game.ui.BaseWindow;
var UIManager = game.ui.UIManager;
var UIScaleManager = game.ui.UIScaleManager;
var UIType = game.ui.UIType;
var BaseFrame = game.ui.BaseFrame;
//场景
var LayerManager = game.scene.LayerManager;
var LayerName = game.scene.LayerName;
var SceneManager = game.scene.SceneManager;
var Scene3DManager = game.scene.Scene3DManager;
var ScreenFillType = game.scene.ScreenFillType;
//工具
var MathUtil = game.util.MathUtil;
var PubUtil = game.util.PubUtil;
var Dictionary = game.util.Dictionary;
//通用
var EventManager = game.common.EventManager;
var NoticeEvent = game.common.NoticeEvent;
var ResManager = game.common.ResManager;
var SoundManager = game.common.SoundManager;
var TipManager = game.common.TipManager;
var OpenManager = game.common.OpenManager;
var TouchManager = game.common.TouchManager;
var SwipeDirection = game.common.SwipeDirection;
var TweenManager = game.common.TweenManager;
var TweenTarget = game.common.TweenTarget;
var TweenProp = game.common.TweenProp;
var TweenPropType = game.common.TweenPropType;
//精灵
var BaseKing = game.king.BaseKing;
var SkinData = game.king.SkinData;
var Action = game.king.Action;
var KingManager = game.king.KingManager;
var ActionType = game.king.ActionType;
var ActionState = game.king.ActionState;
var BaseBone = game.king.BaseBone;
var BoneManager = game.king.BoneManager;
//平台
var PlatformManager = game.platform.PlatformManager;
var PlatformID = game.platform.PlatformID;
var LangType = game.platform.LangType;
var PlatformAction = game.platform.PlatformAction;
var LocalPlatform = game.platform.LocalPlatform;
var WxPlatform = game.platform.WxPlatform;
var FaceBookPlatform = game.platform.FaceBookPlatform;
var ApplovinPlatform = game.platform.ApplovinPlatform;
var IronSourcePlatform = game.platform.IronSourcePlatform;
var MTGPlatform = game.platform.MTGPlatform;
//网络
//import Socket=socket.io.Socket;
var NetManager = game.net.NetManager;
var SocketIoEvent = game.net.SocketIoEvent;
var HttpManager = game.net.HttpManager;
//BASE64
var Base64Manager = game.base64.Base64Manager;
var Base64Type = game.base64.Base64Type;
//Laya核心类
var Stage = Laya.Stage;
var Render = Laya.Render;
var Sprite = Laya.Sprite;
var EventData = Laya.EventData;
var Skeleton = Laya.Skeleton;
var Templet = Laya.Templet;
var Browser = Laya.Browser;
var Stat = Laya.Stat;
var Tween = Laya.Tween;
var WebGL = Laya.WebGL;
//# sourceMappingURL=Main.js.map