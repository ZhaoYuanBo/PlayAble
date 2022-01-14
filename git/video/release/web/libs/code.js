var game;
(function (game) {
    var util;
    (function (util) {
        /*
        *2019-03-11 andy
        公用工具方法
        */
        var PubUtil = /** @class */ (function () {
            function PubUtil() {
            }
            /**
             * 2019-03-11 得到今天的年月日
            */
            PubUtil.GetTodayDateStr = function () {
                var date = new Date();
                return date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            };
            /**
             * 创建灰色滤镜
             * return Laya.ColorFilter
             */
            PubUtil.getGrayFilter = function () {
                //颜色滤镜矩阵,灰色
                var colorMatrix = [
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0,
                ];
                //创建灰色颜色滤镜
                var GrayFilter = new Laya.ColorFilter(colorMatrix);
                return GrayFilter;
            };
            /**
             * 设置数值
             * @param arrNumber
             * @param index
             * @param defaultValue
             */
            PubUtil.setNumber = function (arrNumber, index, defaultValue) {
                return arrNumber && arrNumber.length > index ? arrNumber[index] : (arrNumber[index] = defaultValue);
            };
            /**
             * 设置字符
             * @param arrString
             * @param index
             * @param defaultValue
             */
            PubUtil.setString = function (arrString, index, defaultValue) {
                return arrString && arrString.length > index ? arrString[index] : (arrString[index] = defaultValue);
            };
            /**
             * 是否为空或空格
             * @param input
             */
            PubUtil.isEmpty = function (input) {
                var myreg = /^[ ]*$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 是否为数字
             * @param input
             */
            PubUtil.isNumber = function (input) {
                var myreg = /^[0-9]+.?[0-9]*$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 是否是电话号码
             * @param input
             */
            PubUtil.isTel = function (input) {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 是否是邮箱地址
             * @param input
             */
            PubUtil.isMail = function (input) {
                var myreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (myreg.test(input)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return PubUtil;
        }());
        util.PubUtil = PubUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * 属性代理
        2019-08-14 andy
        */
        var ProxyUtil = /** @class */ (function () {
            function ProxyUtil() {
            }
            /**
             * 属性增加事件
             * @param target   目标
             * @param propName 属性名字
             * @param callBack 回调函数
             */
            ProxyUtil.regProxy = function (target, propName, callBack) {
                Object.defineProperty(target, propName, {
                    get: function () {
                        //console.log('get:'+target[propName]);
                        return target[propName];
                    },
                    set: function (v) {
                        //console.log('set:修改后的值'+v);
                        var old = target[propName];
                        target[propName] = v;
                        if (callBack) {
                            callBack(old, v);
                        }
                    }
                });
            };
            ;
            return ProxyUtil;
        }());
        util.ProxyUtil = ProxyUtil;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

var game;
(function (game) {
    var util;
    (function (util) {
        /*
        * name;
        */
        var MathUtil = /** @class */ (function () {
            function MathUtil() {
            }
            /**
             * 随机产生一个范围的值
             * @param min 最小值
             * @param max 最大值
             */
            MathUtil.randomRange = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            /**
             * 判断两个矩形是否有重叠区域
             * @param rect1 矩形1
             * @param rect2 矩形2
             */
            MathUtil.isOverlap = function (rect1, rect2) {
                var startX1 = rect1.x, startY1 = rect1.y, endX1 = startX1 + rect1.width, endY1 = startY1 + rect1.height;
                var startX2 = rect2.x, startY2 = rect2.y, endX2 = startX2 + rect2.width, endY2 = startY2 + rect2.height;
                return !(endY2 < startY1 || endY1 < startY2 || startX1 > endX2 || startX2 > endX1);
            };
            ;
            /**
             * 角度转成弧度
             * @param angle 角度
             */
            MathUtil.angleToRadian = function (angle) {
                return angle * Math.PI / 180;
            };
            /**
             * 弧度转成角度
             * @param radian 弧度
             */
            MathUtil.radianToAngle = function (radian) {
                return radian * 180 / Math.PI;
            };
            /**
             * 得到两个点的角度，以目标点看角度
             * @param fromX
             * @param fromY
             * @param toX
             * @param toY
             */
            MathUtil.getTwoPointAngle = function (fromX, fromY, toX, toY) {
                var radian = Math.atan2(fromY - toY, fromX - toX);
                var angle = MathUtil.radianToAngle(radian);
                //从左到右 -135 -45  135 45
                return angle;
            };
            /**
             * 得到两个点的角度，以目标点看角度，转成Laya角度
             * @param fromAngle
             */
            MathUtil.getFromAngle = function (fromAngle) {
                return fromAngle + 180;
            };
            /**
             * 把一般角度转换成0-360度
             * @param angle 角度
             */
            MathUtil.changeAngle360 = function (angle) {
                angle = angle % 360;
                if (angle < 0) {
                    angle += 360;
                }
                return angle;
            };
            /**
             * 得到八方向,箭头向右为0
             * @param rotate 旋转角度
             */
            MathUtil.getDirByRotate = function (rotate) {
                var ret = ActionDirect.Right;
                if (rotate > 22.5 && rotate <= 67.5) {
                    ret = ActionDirect.Right_down;
                }
                else if (rotate > 67.5 && rotate <= 112.5) {
                    ret = ActionDirect.Down;
                }
                else if (rotate > 112.5 && rotate <= 157.5) {
                    ret = ActionDirect.Left_down;
                }
                else if (rotate > 157.5 && rotate <= 202.5) {
                    ret = ActionDirect.Left;
                }
                else if (rotate > 202.5 && rotate <= 247.5) {
                    ret = ActionDirect.Left_up;
                }
                else if (rotate > 247.5 && rotate <= 292.5) {
                    ret = ActionDirect.Up;
                }
                else if (rotate > 292.5 && rotate <= 337.5) {
                    ret = ActionDirect.Right_up;
                }
                else {
                    ret = ActionDirect.Right;
                }
                return ret;
            };
            /**
             * 创建贝塞尔曲线
             * @param anchorpoints 点
             * @param pointsAmount
             */
            MathUtil.CreateBezierPoints = function (anchorpoints, pointsAmount) {
                var points = [];
                for (var i = 0; i < pointsAmount; i++) {
                    var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                    points.push(point);
                }
                return points;
            };
            MathUtil.MultiPointBezier = function (points, t) {
                var len = points.length;
                var x = 0, y = 0;
                for (var i = 0; i < len; i++) {
                    var point = points[i];
                    x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                    y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                }
                return { x: x, y: y };
            };
            MathUtil.erxiangshi = function (start, end) {
                var cs = 1, bcs = 1;
                while (end > 0) {
                    cs *= start;
                    bcs *= end;
                    start--;
                    end--;
                }
                return (cs / bcs);
            };
            /**
             * 得到两个点之间的直线距离
             * @param p1 第一个点
             * @param p2 第二个点
             */
            MathUtil.getDistance = function (p1, p2) {
                var dx = p2.x - p1.x;
                var dy = p2.y - p1.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                return distance;
            };
            return MathUtil;
        }());
        util.MathUtil = MathUtil;
        /**
         * 数据类 X Y W H
         */
        var Size = /** @class */ (function () {
            function Size(x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }
            return Size;
        }());
        util.Size = Size;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

/**
* name
*/
var game;
(function (game) {
    var util;
    (function (util) {
        var Dictionary = /** @class */ (function () {
            function Dictionary() {
                this._container = new Object();
                this._length = 0;
            }
            Object.defineProperty(Dictionary.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "length", {
                get: function () {
                    return this._length;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 添加元素
             * @param key
             * @param value
             *
             */
            Dictionary.prototype.add = function (key, value) {
                //如果是新添加才增加length
                if (!this.hasKey(key))
                    this._length++;
                this._container[key] = value;
                return value;
            };
            Dictionary.prototype.forEach = function (func) {
                var boo;
                for (var i in this._container) {
                    boo = func(this._container[i]);
                    if (!boo) {
                        return;
                    }
                }
            };
            Dictionary.prototype.forIn = function (func) {
                for (var i in this._container) {
                    func(i);
                }
            };
            Dictionary.prototype.valueOf = function () {
                var values = [];
                for (var i in this._container) {
                    values.push(this._container[i]);
                }
                return values;
            };
            /**
             * 根据键值获取对象
             * @param key
             * @return
             *
             */
            Dictionary.prototype.get = function (key) {
                return this._container[key];
            };
            /**
             * 重新设置
             * @param key
             * @param value
             *
             */
            Dictionary.prototype.reset = function (key, value) {
                if (this.hasKey(key)) {
                    this._container[key] = value;
                }
                else {
                    console.log("ObjDictionary: warning you reset a not exist key");
                }
            };
            /**
             * 是否包含键
             * @param key
             * @return
             *
             */
            Dictionary.prototype.hasKey = function (key) {
                return this._container.hasOwnProperty(key);
            };
            /**
             * 移除键
             * @param key
             *
             */
            Dictionary.prototype.remove = function (key) {
                if (this._container.hasOwnProperty(key)) {
                    var value = this._container[key];
                    this._container[key] = null;
                    delete this._container[key];
                    this._length--;
                    return value;
                }
                return null;
            };
            /**
             *清除操作
             *
             */
            Dictionary.prototype.clear = function () {
                this._length = 0;
                this._container = null;
                this._container = new Object();
            };
            return Dictionary;
        }());
        util.Dictionary = Dictionary;
    })(util = game.util || (game.util = {}));
})(game || (game = {}));

var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * name;
        */
        var UIType = /** @class */ (function () {
            function UIType(v, v2) {
                this.name = v;
                this.path = v2;
            }
            return UIType;
        }());
        ui.UIType = UIType;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        *2019-06-19 andy
            屏幕缩放 UI适配
        */
        var UIScaleManager = /** @class */ (function () {
            function UIScaleManager() {
                if (UIScaleManager._ins != null)
                    throw new Error("UIScaleManager is single!");
            }
            Object.defineProperty(UIScaleManager, "ins", {
                get: function () {
                    if (!this._ins)
                        UIScaleManager._ins = new UIScaleManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * UI屏幕缩放适配初始化
             */
            UIScaleManager.prototype.init = function () {
                this.dicWindow = new Dictionary();
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_HORIZONTAL_ONSIZE, this, this.SYS_SCREEN_HORIZONTAL_ONSIZE);
                EventManager.ins.on(NoticeEvent.SYS_SCREEN_VERTICAL_ONSIZE, this, this.SYS_SCREEN_VERTICAL_ONSIZE);
                this.autoScale();
            };
            /**
             * 注册横竖屏时事件
             * @param name 窗体名字
             * @param scaleH 缩放UI横屏回调
             * @param scaleV 缩放UI竖屏回调
             */
            UIScaleManager.prototype.regUI = function (name, scaleH, scaleV) {
                if (!this.dicWindow) {
                    console.error("UIScaleManager.ts 未进行初始化！");
                    return;
                }
                var arrFunc = this.dicWindow.get(name);
                if (!arrFunc) {
                    arrFunc = new Array();
                    this.dicWindow.add(name, arrFunc);
                }
                arrFunc[0] = scaleH;
                arrFunc[1] = scaleV;
            };
            /**
             * 可以手动调用
             */
            UIScaleManager.prototype.autoScale = function () {
                if (game.Define.isVertitalState) {
                    this.SYS_SCREEN_VERTICAL_ONSIZE();
                }
                else {
                    this.SYS_SCREEN_HORIZONTAL_ONSIZE();
                }
            };
            UIScaleManager.prototype.SYS_SCREEN_HORIZONTAL_ONSIZE = function () {
                for (var _i = 0, _a = this.dicWindow.valueOf(); _i < _a.length; _i++) {
                    var arrFunc = _a[_i];
                    if (arrFunc) {
                        if (arrFunc[0]) {
                            arrFunc[0]();
                        }
                    }
                }
            };
            UIScaleManager.prototype.SYS_SCREEN_VERTICAL_ONSIZE = function () {
                for (var _i = 0, _a = this.dicWindow.valueOf(); _i < _a.length; _i++) {
                    var arrFunc = _a[_i];
                    if (arrFunc) {
                        if (arrFunc[1]) {
                            arrFunc[1]();
                        }
                    }
                }
            };
            return UIScaleManager;
        }());
        ui.UIScaleManager = UIScaleManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var game;
(function (game) {
    var ui;
    (function (ui) {
        /*
        * 2019-02-27 andy
            界面管理
        */
        var UIManager = /** @class */ (function () {
            function UIManager() {
                if (UIManager._ins != null)
                    throw new Error("UIManager is single!");
            }
            Object.defineProperty(UIManager, "ins", {
                get: function () {
                    if (!this._ins)
                        UIManager._ins = new UIManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            UIManager.prototype.init = function () {
                //窗体顶层
                this.topView = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                this.topMask = new Laya.Sprite();
                this.topView.addChild(this.topMask);
                //初始化界面
                this.dicWindow = new Dictionary();
                //
                ui.UIScaleManager.ins.init();
            };
            UIManager.prototype.getWindow = function (uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (!win) {
                    var cls = uiType.path;
                    win = new cls();
                    win.uiType = uiType;
                    this.dicWindow.add(uiType.name, win);
                }
                return win;
            };
            UIManager.prototype.openWindow = function (uiType) {
                var win = this.getWindow(uiType);
                if (win.isOpen()) {
                    //console.log("窗体已经打开");
                }
                else {
                    LayerManager.ins.addChild(win, LayerName.ui_window);
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
            };
            UIManager.prototype.closeWindow = function (uiType) {
                var win = this.dicWindow.get(uiType.name);
                if (win) {
                    win.removeSelf();
                }
            };
            /**
             * 将窗体显示对象,增加到窗体最顶层
             * @param sp 显示对象
             */
            UIManager.prototype.addTop = function (sp) {
                this.topView.addChild(sp);
            };
            /**
             * 绘制一个镂空的巨型区域，用于高亮引导
             * @param size {x:0,y:0,w:1,h:1} null清除
             * @param alpha 透明度
             */
            UIManager.prototype.drawTopMask = function (size, alpha) {
                if (alpha === void 0) { alpha = 0.5; }
                var topMask = this.topMask;
                if (!size) {
                    topMask.graphics.clear();
                    return;
                }
                var x = size.x;
                var y = size.y;
                var w = size.w;
                var h = size.h;
                topMask.graphics.drawRect(0, 0, game.Define.DeviceW, y, "#000000");
                topMask.graphics.drawRect(0, y, x, h, "#000000");
                topMask.graphics.drawRect(x + w, y, game.Define.DeviceW - (x + w), h, "#000000");
                topMask.graphics.drawRect(0, y + h, game.Define.DeviceW, game.Define.DeviceH - (y + h), "#000000");
                topMask.alpha = alpha;
            };
            /**
             * 将声音按钮,增加到窗体最顶层
             * @param btnSound 按钮
             */
            UIManager.prototype.addTopBtnSound = function (btnSound) {
                if (!btnSound) {
                    return;
                }
                LayerManager.ins.addChild(btnSound, LayerName.top);
                btnSound.on(Laya.Event.CLICK, this, function () {
                    if (btnSound.gray) {
                        btnSound.gray = false;
                        SoundManager.ins.setOn(true);
                    }
                    else {
                        btnSound.gray = true;
                        SoundManager.ins.setOn(false);
                    }
                });
            };
            return UIManager;
        }());
        ui.UIManager = UIManager;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        2019-04-01 andy
        * 触摸管理器
        监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:ActionDirect,startP:Laya.Point,endP:Laya.Point}
        */
        var TouchManager = /** @class */ (function () {
            function TouchManager() {
                /**移动事件触发的距离 默认1*/
                this.mouseSpeed = 1;
                /**移动事件最大次数，默认0，不限制 */
                this.maxMoveCount = 0;
                /**触摸开关 默认true*/
                this._isCanTouch = true;
                /**是否触摸中 */
                this._isTouch = false;
                if (TouchManager._ins != null)
                    throw new Error("TouchManager is single!");
                TouchManager._ins = this;
                this._startPoint = new Laya.Point();
                this._curPoint = new Laya.Point();
            }
            Object.defineProperty(TouchManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new TouchManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            TouchManager.prototype.init = function () {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                this.AngleToDirectionMap = [ActionDirect.Right, ActionDirect.Down, ActionDirect.Left, ActionDirect.Up, ActionDirect.Right];
            };
            Object.defineProperty(TouchManager.prototype, "isCanTouch", {
                /**
                 * 是否能触摸
                 * @param v
                 */
                get: function () {
                    return this._isCanTouch;
                },
                /**
                 * 是否能触摸
                 * @param v
                 */
                set: function (v) {
                    this._isCanTouch = v;
                    if (!this._isCanTouch && this._isTouch) {
                        this.onMouseUp(null);
                    }
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(TouchManager.prototype, "isTouch", {
                /**
                 * 是否触摸中
                 * @param v
                 */
                get: function () {
                    return this._isTouch;
                },
                enumerable: false,
                configurable: true
            });
            TouchManager.prototype.onMouseDown = function (t) {
                if (!this._isCanTouch) {
                    return;
                }
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._moveCount = 0;
                this._isTouch = true;
                this._startPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
                EventManager.ins.event(NoticeEvent.TOUCH, { state: 1 });
            };
            TouchManager.prototype.onMouseMove = function (t) {
                if (this._isTouch) {
                    this._curPoint.x = Laya.stage.mouseX;
                    this._curPoint.y = Laya.stage.mouseY;
                    var distance = this._startPoint.distance(this._curPoint.x, this._curPoint.y);
                    if ((this.maxMoveCount == 0 || this._moveCount < this.maxMoveCount) && distance >= this.mouseSpeed) {
                        var radian = Math.atan2(this._curPoint.y - this._startPoint.y, this._curPoint.x - this._startPoint.x);
                        var angle = MathUtil.radianToAngle(radian);
                        angle = MathUtil.changeAngle360(angle);
                        EventManager.ins.event(NoticeEvent.TOUCH_DIRECTOR, { angle: angle.toFixed(2), radian: radian.toFixed(2), dir: this.getSwipeDirection(angle) });
                        this._moveCount++;
                        this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
                    }
                }
            };
            TouchManager.prototype.onMouseUp = function (t) {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._isTouch = false;
                EventManager.ins.event(NoticeEvent.TOUCH, { state: 0 });
            };
            TouchManager.prototype.getSwipeDirection = function (angle) {
                if (angle > 45 && angle < 135) {
                    return ActionDirect.Down;
                }
                else if (angle >= 135 && angle < 225) {
                    return ActionDirect.Left;
                }
                else if (angle >= 225 && angle < 315) {
                    return ActionDirect.Up;
                }
                else {
                    return ActionDirect.Right;
                }
            };
            return TouchManager;
        }());
        scene.TouchManager = TouchManager;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var game;
(function (game) {
    var scene;
    (function (scene) {
        var skill;
        (function (skill_1) {
            /*
            * 2019-12-09 andy
                技能管理
            */
            var SkillManager = /** @class */ (function () {
                function SkillManager() {
                    if (SkillManager._ins != null)
                        throw new Error("SkillManager is single!");
                    this.dicSkill = new Dictionary();
                    this.dicKingSkill = new Dictionary();
                }
                Object.defineProperty(SkillManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            SkillManager._ins = new SkillManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                SkillManager.prototype.init = function () {
                };
                /**
                 * 初始化技能数据
                 * @param data
                 */
                SkillManager.prototype.initData = function (data) {
                    var skills = data;
                    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                        var skill_2 = skills_1[_i];
                        if (skill_2.atkingCount == 0)
                            skill_2.atkingCount = 1;
                        //不是散射的情况下，散射角度强制设置为0
                        if (skill_2.atkingCount == 1) {
                            skill_2.atkingRotation = 0;
                        }
                        ;
                        this.dicSkill.add(skill_2.skillId, skill_2);
                        if (!this.dicKingSkill.hasKey(skill_2.skin)) {
                            var arr = [];
                            this.dicKingSkill.add(skill_2.skin, arr);
                        }
                        this.dicKingSkill.get(skill_2.skin).push(skill_2);
                    }
                    console.log("Cfg_Skill 初始化完成");
                };
                /**获得技能配置唯一 */
                SkillManager.prototype.getCfg = function (skillId) {
                    return this.dicSkill.get(skillId);
                };
                /**获得技能配置 */
                SkillManager.prototype.getCfgs = function () {
                    return this.dicSkill.valueOf();
                };
                /**获得生物技能列表 */
                SkillManager.prototype.getKingCfg = function (skin) {
                    return this.dicKingSkill.get(skin);
                };
                /**
                 * 获得技能
                 * @param skillData
                 */
                SkillManager.prototype.getSkill = function (skillData) {
                    var bs = null;
                    switch (skillData.cfg_Skill.skillType) {
                        case skill_1.SkillType.ATTACK:
                            bs = new skill_1.AttackSkill();
                            break;
                        case skill_1.SkillType.BULLET:
                            bs = new skill_1.BulletSkill();
                            break;
                        case skill_1.SkillType.GROUP_SKILL:
                            bs = new skill_1.GroupKillSkill();
                            break;
                        default:
                            console.error("EffectName not exist!");
                            break;
                    }
                    if (bs)
                        bs.setData(skillData);
                    return bs;
                };
                return SkillManager;
            }());
            skill_1.SkillManager = SkillManager;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

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
                /**横屏时屏幕等比缩放实际可视宽度 */
                this.fillRateWidth = 0;
                /**横屏时屏幕等比缩放实际可视长度 */
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
                Laya.stage.bgColor = game.Define.BACKGROUND_COLOR;
                this.isGameResLoaded = true;
                //2020-02-11
                this.checkScreenDirection();
            };
            //-------横竖屏自定义事件-------
            //定时器检测设备尺寸
            SceneManager.prototype.checkSize = function () {
                if (this.lastClientWidth != Laya.Browser.clientWidth) {
                    if (Laya.Browser.clientWidth > Laya.Browser.clientHeight) {
                        console.log("横屏:" + Laya.Browser.clientWidth);
                        // if(Laya.stage.scaleMode != Laya.Stage.SCALE_SHOWALL || this.lastClientWidth==-1){
                        game.Define.isVertitalState = false;
                        EventManager.ins.event(NoticeEvent.SYS_SCREEN_HORIZONTAL);
                        //Laya.stage.scaleMode = this.sacleModeH || Laya.Stage.SCALE_SHOWALL;
                        // }
                    }
                    else {
                        console.log("竖屏:" + Laya.Browser.clientWidth);
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
                imgDownload.skin = game.Define.langId == LangType.En ? "game/btn_download" + right + ".png" : "game/btn_download" + right + "_zh.png";
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

var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        * 2019-05-24 andy
            3D场景管理
        */
        var Scene3DManager = /** @class */ (function () {
            function Scene3DManager() {
                /**射线显示 */
                this.debugSprites = new Array();
                if (Scene3DManager._ins != null)
                    throw new Error("Scene3DManager is single!");
                if (window["Laya3D"]) {
                    this.scene3d = scene.LayerManager.ins.addChild(new Laya.Scene(), scene.LayerName.scene_king);
                }
            }
            Object.defineProperty(Scene3DManager, "ins", {
                get: function () {
                    if (!this._ins)
                        Scene3DManager._ins = new Scene3DManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**初始化*/
            Scene3DManager.prototype.init = function () {
                this.initCamera();
            };
            Scene3DManager.prototype.initCamera = function () {
                //初始化照相机
                this.camera = this.scene3d.addChild(new Laya.Camera(game.Define.DeviceW / game.Define.DeviceH, 0.1, 1000));
                this.camera.transform.translate(new Laya.Vector3(0, 10, 1));
                this.camera.transform.rotate(new Laya.Vector3(-5, 0, 0), true, false);
                this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_NONE;
                //this.camera.clearColor=null;
                //camera.addComponent(CameraMoveScript);
                //方向光
                var directionlight = this.scene3d.addChild(new Laya.DirectionLight());
                directionlight.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
                //矩阵前向量变成了-1.0，-1.0，-1.0
                //不清楚是否识别01
                var mat = directionlight.transform.worldMatrix;
                mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
                directionlight.transform.worldMatrix = mat;
            };
            /**获得3D场景 */
            Scene3DManager.prototype.getScene3D = function () {
                if (!this.scene3d) {
                    //console.error("Scene3DManager 未进行初始化!");
                }
                return this.scene3d;
            };
            /**获得摄像机 */
            Scene3DManager.prototype.getCamera = function () {
                if (!this.camera) {
                    //console.error("Scene3DManager 未进行初始化!");
                }
                return this.camera;
            };
            /**
             * 绘制射线
             * @param from 起点
             * @param to   终点
             */
            Scene3DManager.prototype.drawRayLine = function (from, to) {
                if (this.debugSprites.length > 0) {
                    for (var i = 0, n = this.debugSprites.length; i < n; i++)
                        this.debugSprites[i].destroy();
                    this.debugSprites.length = 0;
                }
                // var lineSprite:Laya.PixelLineSprite3D = this.scene3d.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
                // //设置射线的起始点和颜色
                // lineSprite.addLine(from, to, Laya.Color.RED, Laya.Color.RED);
                // this.debugSprites.push(lineSprite);
            };
            Scene3DManager.prototype.addBox = function () {
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
            };
            Scene3DManager.prototype.addSphere = function () {
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
            };
            Scene3DManager.prototype.addCapsule = function () {
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
            };
            Scene3DManager.prototype.addCone = function () {
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
            };
            Scene3DManager.prototype.addCylinder = function () {
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
            };
            return Scene3DManager;
        }());
        scene.Scene3DManager = Scene3DManager;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var game;
(function (game) {
    var scene;
    (function (scene) {
        /*
        2019-12-17 andy
        * 摇杆管理器
        监听NoticeEvent.ROCKER_DIRECTOR,返回{angle,radian}
        */
        var RockerManager = /** @class */ (function () {
            function RockerManager() {
                /**移动事件触发的距离 默认1*/
                this.mouseSpeed = 1;
                /**移动事件最大次数，默认0，不限制 */
                this.maxMoveCount = 0;
                /**触摸开关 默认true*/
                this.isCanTouch = true;
                /**是否触摸中 */
                this._isTouch = false;
                /**摇杆旋转半径 */
                this.radis = 0;
                /**摇杆是否跟随鼠标点击位置 */
                this.isFollow = false;
                /**上次计时 */
                this.lastTime = 0;
                if (RockerManager._ins != null)
                    throw new Error("RockerManager is single!");
                RockerManager._ins = this;
                this.initPoint = new Laya.Point();
                this.startPoint = new Laya.Point();
                this.curPoint = new Laya.Point();
                this.lastPoint = new Laya.Point();
                this.rockerArea = new Laya.Image();
                this.rockerArea.mouseEnabled = true;
                this.rockerArea.alpha = 0;
                this.rockerArea.anchorX = this.rockerArea.anchorY = 0.5;
            }
            Object.defineProperty(RockerManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new RockerManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 摇杆初始化
             * @param rocker
             * @param rockerBg
             * @param rockerRadis  摇杆旋转半径，默认0,使用摇杆背景图直径
             * @param rockerArea  滑动区域数组：长度为1，表示半径；长度为2，表示矩形。 默认[0]，区域为摇杆背景
             * @param isFollow    整个摇杆是否跟随鼠标点击位置,默认：false
             */
            RockerManager.prototype.init = function (rocker, rockerBg, rockerRadis, rockerArea, isFollow) {
                if (rockerRadis === void 0) { rockerRadis = 0; }
                if (rockerArea === void 0) { rockerArea = [0]; }
                if (isFollow === void 0) { isFollow = false; }
                this.isFollow = isFollow;
                if (rocker instanceof Laya.Image) {
                    this.rocker = rocker;
                }
                else {
                    this.rocker = new Laya.Image(rocker);
                    scene.LayerManager.ins.addChild(this.rocker, scene.LayerName.ui_window);
                }
                this.rocker.anchorX = this.rocker.anchorY = 0.5;
                this.rocker.mouseEnabled = false;
                if (rockerBg instanceof Laya.Image) {
                    this.rockerBg = rockerBg;
                }
                else {
                    this.rockerBg = new Laya.Image(rockerBg);
                    scene.LayerManager.ins.addChild(this.rockerBg, scene.LayerName.ui_window);
                }
                this.rockerBg.anchorX = this.rockerBg.anchorY = 0.5;
                this.rockerBg.mouseEnabled = false;
                this.rockerParent = this.rocker.parent;
                this.rockerParent.addChildAt(this.rockerArea, this.rockerParent.getChildIndex(this.rockerBg));
                //初始化坐标
                this.initPoint.setTo(this.rockerBg.x, this.rockerBg.y);
                this.rocker.x = this.rockerArea.x = this.rockerBg.x;
                this.rocker.y = this.rockerArea.y = this.rockerBg.y;
                //摇杆半径
                this.radis = rockerRadis == 0 ? this.rockerBg.width >> 1 : rockerRadis;
                //2020-04-22 滑动区域
                var hitArea = new Laya.HitArea();
                var graphics = new Laya.Graphics();
                if (!rockerArea || rockerArea.length == 1) {
                    var areaRadis = rockerArea && rockerArea[0] == 0 ? this.rockerBg.width >> 1 : rockerArea[0];
                    graphics.drawCircle(0, 0, areaRadis, "#ffffff");
                }
                else {
                    //2020-04-22 默认屏幕宽度
                    var areaX = rockerArea[0] == 0 ? game.Define.DeviceW : rockerArea[0];
                    var areaY = rockerArea[1] == 0 ? game.Define.DeviceH : rockerArea[1];
                    //全屏滑动区域坐标 和 指定滑动区域坐标
                    graphics.drawRect(rockerArea[0] == 0 ? -this.rockerArea.x : (-areaX) >> 1, rockerArea[1] == 0 ? -this.rockerArea.y : (-areaY) >> 1, areaX, areaY, "#ffffff");
                }
                hitArea.hit = graphics;
                this.rockerArea.hitArea = hitArea;
                this.rockerArea.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            };
            Object.defineProperty(RockerManager.prototype, "isTouch", {
                /**是否触摸中 */
                get: function () {
                    return this._isTouch;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(RockerManager.prototype, "isMove", {
                /**是否触摸移动中 */
                get: function () {
                    if (this.isTouch && Laya.timer.currTimer - this.lastTime < 80) {
                        return true;
                    }
                    return false;
                },
                enumerable: false,
                configurable: true
            });
            RockerManager.prototype.onMouseDown = function (evt) {
                evt.stopPropagation();
                if (!this.isCanTouch) {
                    return;
                }
                //2020-04-22 不能超出初始半径
                var localMousePoint = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
                this.rockerParent.globalToLocal(localMousePoint);
                this.rockerArea.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                this.rockerArea.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                this.rockerArea.on(Laya.Event.ROLL_OUT, this, this.onMouseUp);
                this.moveCount = 0;
                this._isTouch = true;
                if (this.isFollow) {
                    this.rocker.x = this.rockerBg.x = localMousePoint.x;
                    this.rocker.y = this.rockerBg.y = localMousePoint.y;
                }
                this.startPoint.setTo(localMousePoint.x, localMousePoint.y);
                this.lastPoint.setTo(localMousePoint.x, localMousePoint.y);
            };
            RockerManager.prototype.onMouseMove = function (t) {
                if (this._isTouch) {
                    this.lastTime = Laya.timer.currTimer;
                    this.curPoint.x = Laya.stage.mouseX;
                    this.curPoint.y = Laya.stage.mouseY;
                    var distance = this.lastPoint.distance(this.curPoint.x, this.curPoint.y);
                    if ((this.maxMoveCount == 0 || this.moveCount < this.maxMoveCount) && distance >= this.mouseSpeed) {
                        var radian = Math.atan2(this.curPoint.y - this.startPoint.y, this.curPoint.x - this.startPoint.x);
                        var angle = MathUtil.radianToAngle(radian);
                        angle = MathUtil.changeAngle360(angle);
                        //
                        this.rocker.x = this.rockerBg.x + Math.cos(radian) * this.radis;
                        this.rocker.y = this.rockerBg.y + Math.sin(radian) * this.radis;
                        EventManager.ins.event(NoticeEvent.ROCKER_DIRECTOR, { angle: angle.toFixed(2), radian: radian.toFixed(2) });
                        this.lastPoint.setTo(this.curPoint.x, this.curPoint.y);
                        this.moveCount++;
                    }
                }
            };
            RockerManager.prototype.onMouseUp = function (t) {
                this.rockerArea.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                this.rockerArea.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                this.rockerArea.off(Laya.Event.ROLL_OUT, this, this.onMouseUp);
                this._isTouch = false;
                //摇杆恢复到初始位置
                this.rocker.x = this.rockerBg.x = this.initPoint.x;
                this.rocker.y = this.rockerBg.y = this.initPoint.y;
            };
            return RockerManager;
        }());
        scene.RockerManager = RockerManager;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

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

var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            /*
            * 2020-03-03 andy
              Npc管理
            */
            var NpcManager = /** @class */ (function () {
                function NpcManager() {
                    /**生物NPC编号 创建时系统自动增加 */
                    this.npcCreateIndex = 0;
                    if (NpcManager._ins != null)
                        throw new Error("NpcManager is single!");
                    this._dicNpc = new Dictionary();
                    this._dicPool = new Dictionary();
                }
                Object.defineProperty(NpcManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            NpcManager._ins = new NpcManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 初始化
                 */
                NpcManager.prototype.init = function () {
                };
                Object.defineProperty(NpcManager.prototype, "npcs", {
                    /**
                     * 当前场景所有NPC
                     */
                    get: function () {
                        return this._dicNpc.valueOf();
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 创建NPC
                 * @param npc
                 */
                NpcManager.prototype.createNpc = function (cls) {
                    // if(typeof(cls)!='Npc'){
                    //     return null;
                    // }
                    var npc = null;
                    var clsName = cls.name;
                    var arrNpc = this._dicPool.get(clsName);
                    if (!arrNpc) {
                        arrNpc = [];
                        this._dicPool.add(clsName, arrNpc);
                    }
                    if (arrNpc.length > 0) {
                        npc = arrNpc.pop();
                        npc.reset();
                        //console.log("从缓存池取出后剩余:",clsName,npc.name,arrNpc.length);
                    }
                    else {
                        npc = new cls();
                        this.npcCreateIndex++;
                        npc.objId = this.npcCreateIndex;
                        npc.name = "npc_" + npc.objId;
                        npc.clsName = clsName;
                        //console.log("创建新生物:",clsName,npc.name);
                    }
                    return npc;
                };
                /**
                 * 增加Npc
                 * @param npc
                 */
                NpcManager.prototype.addNpc = function (npc) {
                    if (npc instanceof king.Npc) {
                        this._dicNpc.add(npc.objId, npc);
                    }
                    scene.LayerManager.ins.addChild(npc, scene.LayerName.scene_king);
                    //console.log("显示NPC，当前可见数量:",npc.clsName,npc.name,this._dicNpc.length);
                    return npc;
                };
                /**
                 * 移除生物
                 * @param clsName
                 * @param npcID
                 */
                NpcManager.prototype.removeNpc = function (npcID) {
                    var npc = this._dicNpc.get(npcID);
                    if (npc) {
                        this._dicNpc.remove(npc.objId);
                        var arrNpc = this._dicPool.get(npc.clsName);
                        if (arrNpc) {
                            arrNpc.push(npc);
                            //console.log("放入缓存池:",npc.clsName,npc.name,arrNpc.length);
                        }
                        else {
                            //console.log("放入缓存池失败 未知类型:",npc.clsName,npc.name);
                        }
                        npc.removeSelf();
                    }
                };
                return NpcManager;
            }());
            king.NpcManager = NpcManager;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king_1) {
            /*
            * 2019-04-07 andy
                人物管理
            */
            var KingManager = /** @class */ (function () {
                function KingManager() {
                    /**生物创建编号 创建时系统自动增加 */
                    this.kingCreateIndex = 0;
                    if (KingManager._ins != null)
                        throw new Error("KingManager is single!");
                    this._dicKing = new Dictionary();
                    this._dicPool = new Dictionary();
                }
                Object.defineProperty(KingManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            KingManager._ins = new KingManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 初始化
                 */
                KingManager.prototype.init = function () {
                };
                /**
                 * 初始化生物
                 * @param actions
                 */
                KingManager.prototype.initData = function (actions) {
                    this.dicAction = new Dictionary();
                    this.dicActionSkin = new Dictionary();
                    for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                        var cfg = actions_1[_i];
                        this.dicAction.add(cfg.skin + "_" + cfg.actionType + "_" + cfg.actionDirect, cfg);
                        if (this.dicActionSkin.hasKey(cfg.skin)) {
                            this.dicActionSkin.get(cfg.skin).push(cfg);
                        }
                        else {
                            var arr = [];
                            arr.push(cfg);
                            this.dicActionSkin.add(cfg.skin, arr);
                        }
                    }
                    console.log("Cfg_Action 初始化完成");
                };
                /**获得动作配置唯一 */
                KingManager.prototype.getCfg = function (skin, actionType, actionDirect) {
                    return this.dicAction.get(skin + "_" + actionType + "_" + actionDirect);
                };
                /**获得动作配置集合 */
                KingManager.prototype.getCfgBySkin = function (skin) {
                    if (!this.dicActionSkin.hasKey(skin)) {
                        console.warn("请检查动作配置表：" + skin + "是否配置！");
                    }
                    return this.dicActionSkin.get(skin);
                };
                /**获得动作配置集合 */
                KingManager.prototype.getActionBySkin = function (skin) {
                    var arrAction = [];
                    var arrCfg = this.getCfgBySkin(skin);
                    for (var _i = 0, arrCfg_1 = arrCfg; _i < arrCfg_1.length; _i++) {
                        var cfg = arrCfg_1[_i];
                        //待机,行走,奔跑，为循环播放
                        arrAction.push(new king_1.Action(cfg, cfg.actionType == king_1.ActionType.Wait || cfg.actionType == king_1.ActionType.WALK || cfg.actionType == king_1.ActionType.RUN));
                    }
                    return arrAction;
                };
                Object.defineProperty(KingManager.prototype, "kings", {
                    /**
                     * 当前场景所有敌人
                     */
                    get: function () {
                        return this._dicKing.valueOf();
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 创建生物
                 * @param king
                 */
                KingManager.prototype.createKing = function (cls) {
                    // if(typeof(cls)!='BaseKing'){
                    //     return null;
                    // }
                    var king = null;
                    var clsName = cls.name;
                    var arrKing = this._dicPool.get(clsName);
                    if (!arrKing) {
                        arrKing = [];
                        this._dicPool.add(clsName, arrKing);
                    }
                    if (arrKing.length > 0) {
                        king = arrKing.pop();
                        king.reset();
                        //console.log("从缓存池取出后剩余:",clsName,king.name,arrKing.length);
                    }
                    else {
                        king = new cls();
                        this.kingCreateIndex++;
                        king.objId = this.kingCreateIndex;
                        king.name = "king_" + king.objId;
                        king.clsName = clsName;
                        //console.log("创建新生物:",clsName,king.name);
                    }
                    return king;
                };
                /**
                 * 增加生物
                 * @param king
                 */
                KingManager.prototype.addKing = function (king) {
                    if (king instanceof king_1.King) {
                        this._dicKing.add(king.objId, king);
                    }
                    scene.LayerManager.ins.addChild(king, scene.LayerName.scene_king);
                    //console.log("显示生物，当前可见数量:",king.clsName,king.name,this._dicKing.length);
                    return king;
                };
                /**
                 * 移除生物
                 * @param clsName
                 * @param kingID
                 */
                KingManager.prototype.removeKing = function (kingID) {
                    var king = this._dicKing.get(kingID);
                    if (king) {
                        this._dicKing.remove(king.objId);
                        var arrKing = this._dicPool.get(king.clsName);
                        if (arrKing) {
                            arrKing.push(king);
                            //console.log("放入缓存池:",king.clsName,king.name,arrKing.length);
                        }
                        else {
                            //console.log("放入缓存池失败 未知类型:",king.clsName,king.name);
                        }
                        king.removeSelf();
                    }
                };
                return KingManager;
            }());
            king_1.KingManager = KingManager;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            var Templet = Laya.Templet;
            /*
            * 2019-04-07 andy
                骨骼动画管理
            */
            var BoneManager = /** @class */ (function () {
                function BoneManager() {
                    /**唯一标识ID */
                    this.boneIndex = 10000;
                    if (BoneManager._ins != null)
                        throw new Error("BoneManager is single!");
                }
                Object.defineProperty(BoneManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            BoneManager._ins = new BoneManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                BoneManager.prototype.init = function () {
                    //模板
                    this.dicTemp = new Dictionary();
                    //缓存池
                    this.dicBonePool = new Dictionary();
                    this.dicBone = new Dictionary();
                };
                /**
                 * 创建骨骼动画
                 * @param Base64Type paramNum:模板创建类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装
                 */
                BoneManager.prototype.createBone = function (base64Type) {
                    var temp = null;
                    var boneName = base64Type.name;
                    var cacheType = base64Type.paramNum;
                    //模板
                    if (this.dicTemp.hasKey(boneName)) {
                        temp = this.dicTemp.get(boneName);
                    }
                    else {
                        temp = new Templet();
                        this.dicTemp.add(boneName, temp);
                    }
                    var bone = null;
                    var objId = 0;
                    //模板已经解析
                    if (temp.isParserComplete) {
                        if (this.dicBonePool.hasKey(boneName)) {
                            var arrSk = this.dicBonePool.get(boneName);
                            if (arrSk && arrSk.length > 0) {
                                bone = arrSk.shift();
                                console.log("从缓存池取出：" + boneName + " 取出后还剩：" + arrSk.length);
                            }
                        }
                        //缓存池没有，则创建新的
                        if (!bone) {
                            bone = new king.BaseBone(boneName, cacheType);
                        }
                    }
                    else {
                        bone = new king.BaseBone(base64Type.name, base64Type.paramNum);
                        //已经在加载模板了，请等待
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
                };
                BoneManager.prototype.onError = function (err) {
                    console.log("error", err);
                };
                //模板加载完成
                BoneManager.prototype.parseComplete = function (data) {
                    console.log("spine动画模板：" + data + " 加载完成！");
                    EventManager.ins.event(NoticeEvent.BONE_TEMP_LOAD_FINISH, data);
                };
                /**
                 * 根据骨头名字获得骨头模板
                 * @param boneName 骨头名字
                 */
                BoneManager.prototype.getTemp = function (boneName) {
                    if (this.dicTemp.hasKey(boneName)) {
                        return this.dicTemp.get(boneName);
                    }
                    return null;
                };
                /**
                 * 根据唯一标识ID获得骨骼对象
                 * @param objId 唯一标识ID
                 */
                BoneManager.prototype.getBone = function (objId) {
                    if (this.dicBone.hasKey(objId)) {
                        return this.dicBone.get(objId);
                    }
                    return null;
                };
                BoneManager.prototype.addBone = function (bone) {
                    BoneManager.ins.dicBone.add(bone.objId, bone);
                };
                BoneManager.prototype.removeBone = function (bone) {
                    if (!bone) {
                        return;
                    }
                    if (this.dicBone.hasKey(bone.objId)) {
                        this.dicBone.remove(bone.objId);
                        //console.log("回收："+bone.kingType+" 活动个数："+this.dicBone.length);
                    }
                    //放回缓存池
                    var arrSk = null;
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
                };
                /**
                 * 移除所有骨骼动画
                 */
                BoneManager.prototype.removeBoneAll = function () {
                    for (var _i = 0, _a = this.dicBone.valueOf(); _i < _a.length; _i++) {
                        var bone = _a[_i];
                        this.removeBone(bone);
                    }
                };
                return BoneManager;
            }());
            king.BoneManager = BoneManager;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-04-09 andy
        网络通讯管理
        */
        var NetManager = /** @class */ (function () {
            function NetManager() {
                if (NetManager._ins != null)
                    throw new Error("NetManager is single!");
                NetManager._ins = this;
                this._socketDataEvent = new Dictionary();
            }
            Object.defineProperty(NetManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new NetManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**初始化 */
            NetManager.prototype.init = function () {
                console.log("serverIP", game.Define.serverIP, "serverPort", game.Define.serverPort);
                this.socket = io.connect(game.Define.serverIP + ":" + game.Define.serverPort);
                // 当接收到消息并且不是本机时生成聊天气泡
                this.socket.on(SocketIoEvent.message, this.onMessageReveived);
                //连接成功
                this.socket.on(SocketIoEvent.connect, this.onSocketOpen);
                //连接断开
                this.socket.on(SocketIoEvent.disconnect, this.onSocketClose);
                //错误
                this.socket.on(SocketIoEvent.error, this.onConnectError);
            };
            NetManager.prototype.onSocketOpen = function (e) {
                if (e === void 0) { e = null; }
                console.log("与服务器连接成功");
                EventManager.ins.event(SocketIoEvent.connect, e);
            };
            NetManager.prototype.onSocketClose = function (e) {
                if (e === void 0) { e = null; }
                console.log("与服务器连接断开");
                EventManager.ins.event(SocketIoEvent.disconnect, e);
            };
            NetManager.prototype.onMessageReveived = function (message) {
                if (message === void 0) { message = null; }
                console.log("收到服务端message");
                if (message) {
                    console.log(message);
                }
                else if (message) {
                    console.log(new Laya.Byte(message).readUTFBytes());
                }
                //this.socket.input.clear();
                EventManager.ins.event(SocketIoEvent.message, message);
            };
            NetManager.prototype.onConnectError = function (e) {
                if (e === void 0) { e = null; }
                console.log("error");
                EventManager.ins.event(SocketIoEvent.error, e);
            };
            /**
             * 发送message
             * @param data
             * @param fn
             */
            NetManager.prototype.send = function (data, fn) {
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                this.socket.send(data, fn);
            };
            /**
             * 发送emit
             * @param eventName
             * @param args
             */
            NetManager.prototype.emit = function (eventName) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (!this.socket) {
                    console.error("NetManager 未初始化！");
                    return;
                }
                this.socket.emit(eventName, args);
            };
            /**
             * 添加网络事件观察者
             * @param eventName
             * @param _callback
             */
            NetManager.prototype.registerNetEvent = function (eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    this._socketDataEvent.get(eventName).push(_callback);
                }
                else {
                    this._socketDataEvent.add(eventName, [_callback]);
                }
                this.socket.on(eventName, _callback.method.bind(_callback.caller));
            };
            /**
             * 删除网络事件观察者
             * @param eventName
             * @param _callback
             */
            NetManager.prototype.unregisterNetEvent = function (eventName, _callback) {
                if (this._socketDataEvent.hasKey(eventName)) {
                    var arr = this._socketDataEvent.get(eventName);
                    if (arr.indexOf(_callback) >= 0) {
                        arr.splice(arr.indexOf(_callback));
                    }
                }
            };
            NetManager.prototype.update = function () {
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
            };
            return NetManager;
        }());
        net.NetManager = NetManager;
        /**
         * socke.io系统事件
         */
        var SocketIoEvent = /** @class */ (function () {
            function SocketIoEvent() {
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
            return SocketIoEvent;
        }());
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

var game;
(function (game) {
    var net;
    (function (net) {
        /*
        * 2019-03-07 andy
        HTTP请求管理
        */
        var HttpManager = /** @class */ (function () {
            function HttpManager() {
                if (HttpManager._ins != null)
                    throw new Error("HttpManager is single!");
                this.xhr = new Laya.HttpRequest;
                this.xhr.http.timeout = 50000;
                this.xhr.on(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
            }
            Object.defineProperty(HttpManager, "ins", {
                get: function () {
                    if (!this._ins)
                        HttpManager._ins = new HttpManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 跳转到网页
             * @param url 跳转地址
             */
            HttpManager.prototype.link = function (url) {
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
                    case PlatformID.Tj:
                        if (PlatformManager.mraid) {
                            console.log("调用 mraid.click");
                            PlatformManager.mraid.click();
                        }
                        else {
                            TipManager.ins.showWord("tapjoy does not support window.TJ_API!");
                            Laya.Browser.window.location.href = url;
                        }
                        break;
                    case PlatformID.mtg:
                        PlatformManager.ins.actionCallBack(PlatformAction.GameEnd);
                        PlatformManager.ins.actionCallBack(PlatformAction.DownLoad);
                        break;
                    default:
                        break;
                }
            };
            /**
             * HTTP GET 访问
             * @param url
             * @param caller
             * @param callback
             */
            HttpManager.prototype.get = function (url, caller, callback) {
                this.caller = caller;
                this.callback = callback;
                this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
                this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
                this.xhr.send(url, null, 'get', 'text');
                return this;
            };
            /**
             * HTTP POST 访问
             * @param url
             * @param data
             * @param contentType
             * @param caller
             * @param callback
             */
            HttpManager.prototype.post = function (url, data, contentType, caller, callback) {
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
            };
            HttpManager.prototype.onHttpRequestProgress = function (e) {
                console.log("onHttpRequestProgress" + e);
                EventManager.ins.event(NoticeEvent.HTTP_PROGRESS, e);
            };
            HttpManager.prototype.onHttpRequestError = function (e) {
                console.log("onHttpRequestError");
                this.callback.apply(this.caller, [{ state: 500, msg: e }]);
            };
            HttpManager.prototype.onHttpRequestComplete = function (e) {
                //console.log("onHttpRequestComplete");
                this.callback.apply(this.caller, [{ state: 200, data: this.xhr.data }]);
            };
            return HttpManager;
        }());
        net.HttpManager = HttpManager;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));

var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 2019-12-27 andy
            序列帧管理
        */
        var FrameManager = /** @class */ (function () {
            function FrameManager() {
                if (FrameManager._ins != null)
                    throw new Error("FrameManager is single!");
                this.dicFrame = new Dictionary();
                this.dicFrameSkin = new Dictionary();
            }
            Object.defineProperty(FrameManager, "ins", {
                get: function () {
                    if (!this._ins)
                        FrameManager._ins = new FrameManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 初始化数据
             * @param data 表中配置数据，JSON
             */
            FrameManager.prototype.init = function (frames) {
                for (var _i = 0, frames_1 = frames; _i < frames_1.length; _i++) {
                    var cfg = frames_1[_i];
                    this.dicFrame.add(cfg.id, cfg);
                    this.dicFrameSkin.add(cfg.skin, cfg);
                }
                console.log("Cfg_Frame 初始化完成");
            };
            /**
             * 获得序列帧所有配置
             */
            FrameManager.prototype.getCfgs = function () {
                return this.dicFrame.valueOf();
            };
            /**
             * 获得序列帧配置
             * @param id   序列帧编号
             */
            FrameManager.prototype.getCfg = function (id) {
                return this.dicFrame.get(id);
            };
            /**
             * 获得序列帧配置
             * @param skin   序列帧皮肤
             */
            FrameManager.prototype.getCfgBySkin = function (skin) {
                return this.dicFrameSkin.get(skin);
            };
            /**
             * 获得序列帧对象
             * @param id         序列帧编号
             * @param callBack   回调函数
             */
            FrameManager.prototype.getFrame = function (id, callBack) {
                if (callBack === void 0) { callBack = null; }
                var cfg = this.getCfg(id);
                if (cfg) {
                    return new effect.BaseFrame(cfg, callBack);
                }
                return null;
            };
            /**
             * 获得序列帧对象
             * @param skin   序列帧皮肤
             * @param callBack   回调函数
             */
            FrameManager.prototype.getFrameBySkin = function (skin, callBack) {
                if (callBack === void 0) { callBack = null; }
                var cfg = this.getCfgBySkin(skin);
                if (cfg) {
                    return new effect.BaseFrame(cfg, callBack);
                }
                return null;
            };
            /**
             * 显示序列帧动画
             * @param frame
             */
            FrameManager.prototype.addFrame = function (frame, layer) {
                if (layer === void 0) { layer = LayerName.main; }
                // var win:BaseWindow = this.getWindow(uiType) as BaseWindow;
                // if(win.isOpen()){
                //     console.log("窗体已经打开");
                // }else{
                LayerManager.ins.addChild(frame, layer);
                // }
                return frame;
            };
            /**
             * 删除序列帧动画
             * @param frame
             */
            FrameManager.prototype.removeFrame = function (frame) {
                // var win:BaseWindow = this.dicWindow.get(uiType.name);
                // if(win){
                frame.removeSelf();
                // }
            };
            /**
             * 注册动画 2020-08-21
             * @param skinName
             */
            FrameManager.prototype.regAnimation = function (skinName) {
                var cfg = this.getCfgBySkin(skinName);
                if (!cfg) {
                    console.log("FrameManager.ts 注册动画失败,请检查Frame表：" + skinName);
                    return;
                }
                //创建动画模板
                var arr = BaseAnimation.aniUrls(cfg.skin, cfg.count);
                Laya.Animation.createFrames(arr, skinName);
            };
            return FrameManager;
        }());
        effect.FrameManager = FrameManager;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 2019-07-17 andy
            特效管理
        */
        var EffectManager = /** @class */ (function () {
            function EffectManager() {
                if (EffectManager._ins != null)
                    throw new Error("EffectManager is single!");
            }
            Object.defineProperty(EffectManager, "ins", {
                get: function () {
                    if (!this._ins)
                        EffectManager._ins = new EffectManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            EffectManager.prototype.init = function () {
                //特效层级 界面上
                this.topWindow = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.ui_effect);
                //特效层级 场景上
                this.topScene = LayerManager.ins.addChild(new Laya.Sprite(), LayerName.scene_effect);
            };
            /**
             * 获得特效
             * @param en   EffectName
             * @param arrSprite
             * @param arrNumber
             * @param arrString
             * @param isScene   是否显示在场景层，默认为true，若为false则显示在界面层上面
             */
            EffectManager.prototype.getEffect = function (en, effectData, isScene) {
                if (isScene === void 0) { isScene = true; }
                var be = null;
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
                    case EffectName.out_gold:
                        be = new effect.OutGoldEft(isScene);
                        break;
                    case EffectName.air_drop:
                        be = new effect.AirDropEft(isScene);
                        break;
                    case EffectName.waiting:
                        be = new effect.WaitingEft(isScene);
                        break;
                    case EffectName.out_star:
                        be = new effect.OutStarEft(isScene);
                        break;
                    default:
                        console.error("EffectName not exist!");
                        break;
                }
                if (be)
                    be.setData(effectData);
                return be;
            };
            /**
             * 添加特效
             * @param be
             * @param layer
             */
            EffectManager.prototype.addEffect = function (be, layer) {
                if (layer === void 0) { layer = LayerName.main; }
                LayerManager.ins.addChild(be, layer);
            };
            return EffectManager;
        }());
        effect.EffectManager = EffectManager;
        var EffectName;
        (function (EffectName) {
            /**Boss来袭*/
            EffectName[EffectName["boss_warning"] = 0] = "boss_warning";
            /**水纹点击*/
            EffectName[EffectName["guide_click"] = 1] = "guide_click";
            /**喷泉*/
            EffectName[EffectName["Fountain"] = 2] = "Fountain";
            /**图片切换*/
            EffectName[EffectName["change_img"] = 3] = "change_img";
            /**喷出金币*/
            EffectName[EffectName["out_gold"] = 4] = "out_gold";
            /**空投*/
            EffectName[EffectName["air_drop"] = 5] = "air_drop";
            /**等待加载*/
            EffectName[EffectName["waiting"] = 6] = "waiting";
            /**喷出一圈小星星*/
            EffectName[EffectName["out_star"] = 7] = "out_star";
        })(EffectName = effect.EffectName || (effect.EffectName = {}));
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var game;
(function (game) {
    var config;
    (function (config) {
        /**技能配置 */
        var Cfg_Skill = /** @class */ (function () {
            function Cfg_Skill() {
                /**攻击值 */
                this.atk = 0;
                /**攻击距离 */
                this.atkDistance = 100;
                /**攻击CD */
                this.atkCD = 0;
                /**攻击X */
                this.atkX = 0;
                /**攻击Y */
                this.atkY = 0;
                /**发射特效ID 子弹,弓箭 */
                this.atkingEft = 0;
                /**发射X */
                this.atkingX = 0;
                /**发射Y */
                this.atkingY = 0;
                /**发射运行速度 默认100,越小越快*/
                this.atkingSpeed = 100;
                /**发射数量 默认1*/
                this.atkingCount = 1;
                /**发射角度 */
                this.atkingRotation = 0;
            }
            return Cfg_Skill;
        }());
        config.Cfg_Skill = Cfg_Skill;
        /*
        * 动作表
        */
        var Cfg_Action = /** @class */ (function () {
            function Cfg_Action() {
            }
            return Cfg_Action;
        }());
        config.Cfg_Action = Cfg_Action;
        /*
        * 序列帧特效表
        */
        var Cfg_Frame = /** @class */ (function () {
            function Cfg_Frame() {
            }
            return Cfg_Frame;
        }());
        config.Cfg_Frame = Cfg_Frame;
        /*
        * 道具
        */
        var Cfg_Item = /** @class */ (function () {
            function Cfg_Item() {
            }
            return Cfg_Item;
        }());
        config.Cfg_Item = Cfg_Item;
        /*
        * 等级经验表
        */
        var Cfg_Level = /** @class */ (function () {
            function Cfg_Level() {
            }
            return Cfg_Level;
        }());
        config.Cfg_Level = Cfg_Level;
        /*
        * 怪物表
        */
        var Cfg_Monster = /** @class */ (function () {
            function Cfg_Monster() {
            }
            return Cfg_Monster;
        }());
        config.Cfg_Monster = Cfg_Monster;
        /*
        * Npc表
        */
        var Cfg_Npc = /** @class */ (function () {
            function Cfg_Npc() {
            }
            return Cfg_Npc;
        }());
        config.Cfg_Npc = Cfg_Npc;
    })(config = game.config || (game.config = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        *2019-04-28 andy
        Tween管理类
        */
        var TweenManager = /** @class */ (function () {
            function TweenManager() {
                if (TweenManager._ins != null)
                    throw new Error("TweenManager is single!");
                this.dicTween = new Dictionary();
            }
            Object.defineProperty(TweenManager, "ins", {
                get: function () {
                    if (!this._ins)
                        TweenManager._ins = new TweenManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 注册twwen
             * @param tt
             * @param isReplace 如果键值已经存在，是否替换，默认true
             */
            TweenManager.prototype.regTween = function (tt, isReplace) {
                if (isReplace === void 0) { isReplace = true; }
                if (!tt) {
                    return;
                }
                if (this.dicTween.hasKey(tt.id)) {
                    var ttNow = this.dicTween.get(tt.id);
                    ttNow = tt;
                }
                else {
                    this.dicTween.add(tt.id, tt);
                }
            };
            /**
             * 播放动画
             * @param loop
             * @param name
             */
            TweenManager.prototype.play = function (loop, name) {
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.play(loop);
                }
            };
            /**
             * 停止动画
             * @param name
             * @param isHide 是否隐藏,默认为true
             */
            TweenManager.prototype.stop = function (name, isHide) {
                if (isHide === void 0) { isHide = true; }
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop(isHide);
                }
            };
            /**
             * 停止所有动画
             */
            TweenManager.prototype.clearAll = function () {
                for (var _i = 0, _a = this.dicTween.valueOf(); _i < _a.length; _i++) {
                    var tt = _a[_i];
                    if (tt) {
                        tt.stop();
                        Laya.timer.clearAll(tt);
                    }
                }
            };
            /**
             * 创建属性集合
             * @param tpt 属性集合类型
             * @param param param 可在枚举 TweenPropType查看
             */
            TweenManager.prototype.creatProp = function (tpt, param) {
                if (param === void 0) { param = null; }
                var ret = [];
                switch (tpt) {
                    case TweenPropType.PING_PANG:
                        PubUtil.setNumber(param, 0, 30);
                        PubUtil.setNumber(param, 1, 200);
                        ret = [new TweenProp(param[1], 0, 0, -1, param[0]), new TweenProp(param[1] * 0.75, 0, 0, -1, -param[0]), new TweenProp(param[1] * 0.75, 0, 0, -1, param[0]), new TweenProp(param[1] * 0.5, 0, 0, -1, -(param[0] >> 1)), new TweenProp(param[1] * 0.5, 0, 0, -1, (param[0] >> 2)), new TweenProp(param[1] * 0.4, 0, 0, -1, 0)];
                        break;
                    case TweenPropType.PING_PANG_1:
                        PubUtil.setNumber(param, 0, 100);
                        PubUtil.setNumber(param, 1, 200);
                        ret = [new TweenProp(param[1], 0, 0), new TweenProp(param[1] * 0.75, 0, -param[0]), new TweenProp(param[1] * 0.75, 0, param[0]), new TweenProp(param[1] * 0.5, 0, -(param[0] >> 1)), new TweenProp(param[1] * 0.5, 0, (param[0] >> 2)), new TweenProp(param[1] * 0.4, 0, 0)];
                        break;
                    case TweenPropType.PING_PANG_2:
                        PubUtil.setNumber(param, 0, 100);
                        PubUtil.setNumber(param, 1, 200);
                        ret = [new TweenProp(param[1], 0, 0), new TweenProp(param[1] * 0.75, 0, -param[0]), new TweenProp(param[1] * 0.75, 0, param[0]), new TweenProp(param[1] * 0.5, 0, (param[0] >> 1)), new TweenProp(param[1] * 0.5, 0, (param[0] >> 2)), new TweenProp(param[1] * 0.4, 0, 0)];
                        break;
                    case TweenPropType.PING_PANG_3:
                        PubUtil.setNumber(param, 0, 100);
                        PubUtil.setNumber(param, 1, 200);
                        ret = [new TweenProp(param[1], 0, 0), new TweenProp(param[1], 0, -param[0]), new TweenProp(param[1], 0, 0), new TweenProp(param[1], 0, param[0]), new TweenProp(param[1], 0, 0)];
                        break;
                    case TweenPropType.GUIDE_SLID:
                        PubUtil.setNumber(param, 0, 500);
                        PubUtil.setNumber(param, 1, 100);
                        PubUtil.setNumber(param, 2, 100);
                        ret = [new TweenProp(param[0], 0, 0, 1), new TweenProp(0, param[1], param[2], 1), new TweenProp(0, 0, 0, 0)];
                        break;
                    case TweenPropType.GUIDE_SLID_1:
                        PubUtil.setNumber(param, 0, 500);
                        PubUtil.setNumber(param, 1, 100);
                        ret = [new TweenProp(param[0], 0, 0, 1), new TweenProp(0, param[1], 0, 1), new TweenProp(0, 0, 0, 0)];
                        break;
                    case TweenPropType.GUIDE_SLID_2:
                        PubUtil.setNumber(param, 0, 500);
                        PubUtil.setNumber(param, 1, 100);
                        ret = [new TweenProp(param[0], 0, 0, 1), new TweenProp(0, 0, param[1], 1), new TweenProp(0, 0, 0, 0)];
                        break;
                    case TweenPropType.GUIDE_CLICK:
                        PubUtil.setNumber(param, 0, 20);
                        ret = [new TweenProp(100, 0, param[0]), new TweenProp(100, 0, param[0] >> 1), new TweenProp(100, 0, param[0]), new TweenProp(100, 0, param[0]), new TweenProp(80, 0, 0)];
                        break;
                    case TweenPropType.LIGHT_STAR:
                        PubUtil.setNumber(param, 0, 100);
                        PubUtil.setNumber(param, 1, 0);
                        PubUtil.setNumber(param, 2, 1);
                        ret = [new TweenProp(param[0], 0, 0, param[2]), new TweenProp(param[0], 0, 0, param[1]), new TweenProp(param[0], 0, 0, param[2])];
                        break;
                    case TweenPropType.SMALL_BIG:
                        PubUtil.setNumber(param, 0, 1);
                        PubUtil.setNumber(param, 1, 1.2);
                        PubUtil.setNumber(param, 2, 1000);
                        PubUtil.setNumber(param, 3, 1000);
                        ret = [new TweenProp(param[3], 0, 0, 1, 0, param[0], param[0]), new TweenProp(param[2], 0, 0, 1, 0, param[1], param[1]), new TweenProp(param[3], 0, 0, 1, 0, param[0], param[0])];
                        break;
                    default:
                        break;
                }
                return ret;
            };
            /**
             * 重置动画对象
             * @param name 缓动名字，唯一标识
             * @param target  动画对象
             */
            TweenManager.prototype.resetTarget = function (name, target) {
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop();
                    tt.resetTarget(target);
                    tt.play(tt.isLoop);
                }
            };
            /**
             * 重置动画位置
             * @param name   动画标识名字
             * @param x      目标x
             * @param y      目标y
             * @param isPlay 是否播放，默认true
             */
            TweenManager.prototype.resetTargetPos = function (name, x, y, isPlay) {
                if (isPlay === void 0) { isPlay = true; }
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.stop();
                    tt.target.x = x;
                    tt.target.y = y;
                    tt.resetTarget(tt.target);
                    if (isPlay) {
                        tt.play(tt.isLoop);
                    }
                }
            };
            /**
             * 重置动画属性
             * @param name 缓动名字，唯一标识
             * @param tpt  属性类型
             * @param param  参数
             * @param delayTime 延时时间
             */
            TweenManager.prototype.resetProp = function (name, arrProp, delayTime) {
                if (arrProp === void 0) { arrProp = null; }
                if (delayTime === void 0) { delayTime = -1; }
                var tt = this.dicTween.get(name);
                if (tt) {
                    tt.resetProp(arrProp, delayTime);
                }
            };
            /**
             * 重置动画属性
             * @param name 缓动名字，唯一标识
             * @param tpt  属性类型
             * @param param  参数
             * @param delayTime 延时时间
             */
            TweenManager.prototype.resetPropByType = function (name, tpt, param, delayTime) {
                if (param === void 0) { param = null; }
                if (delayTime === void 0) { delayTime = -1; }
                var tt = this.dicTween.get(name);
                if (tt) {
                    var arrProp = this.creatProp(tpt, param);
                    tt.resetProp(arrProp, delayTime);
                }
            };
            return TweenManager;
        }());
        common.TweenManager = TweenManager;
        var TweenTarget = /** @class */ (function () {
            function TweenTarget(id, target, arrProp, delayTime, callBack) {
                if (callBack === void 0) { callBack = null; }
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
            TweenTarget.prototype.play = function (isLoop) {
                if (isLoop === void 0) { isLoop = true; }
                this.target.visible = true;
                Laya.Tween.clearAll(this.target);
                this.isLoop = isLoop;
                this.isPlay = true;
                this.propIndex = 0;
                this.playNext();
            };
            TweenTarget.prototype.playNext = function () {
                var _this = this;
                if (!this.isPlay) {
                    return;
                }
                var propFrom = this.arrProp[this.propIndex++];
                var propTo = null;
                if (this.propIndex < this.arrProp.length) {
                    propTo = this.arrProp[this.propIndex];
                    this.curProp.x = this.targetX + propTo.x;
                    this.curProp.y = this.targetY + propTo.y;
                    this.curProp.alpha = propTo.alpha == -1 ? this.target.alpha : propTo.alpha;
                    this.curProp.rotation = propTo.rotation;
                    this.curProp.scaleX = propTo.scaleX == -1 ? this.target.scaleX : propTo.scaleX;
                    this.curProp.scaleY = propTo.scaleY == -1 ? this.target.scaleY : propTo.scaleY;
                }
                else {
                    if (this.isLoop) {
                        Laya.timer.once(this.delayTime, this, function () {
                            _this.propIndex = 0;
                            _this.playNext();
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
                this.target.alpha = propFrom.alpha == -1 ? this.target.alpha : propFrom.alpha;
                this.target.rotation = propFrom.rotation;
                this.target.scaleX = propFrom.scaleX == -1 ? this.target.scaleX : propFrom.scaleX;
                this.target.scaleY = propFrom.scaleY == -1 ? this.target.scaleY : propFrom.scaleY;
                Laya.Tween.to(this.target, this.curProp, propFrom.duration, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                    _this.playNext();
                }));
            };
            /**
             * 停止动画
             * @param isHide 默认为true
             */
            TweenTarget.prototype.stop = function (isHide) {
                if (isHide === void 0) { isHide = true; }
                if (isHide) {
                    this.target.visible = false;
                }
                this.isPlay = false;
                Laya.Tween.clearAll(this.target);
                Laya.timer.clearAll(this);
            };
            /**
             * 重置缓动对象
             * @param target
             */
            TweenTarget.prototype.resetTarget = function (target) {
                this.target = target;
                if (target) {
                    this.targetX = target.x;
                    this.targetY = target.y;
                }
            };
            /**
             * 重置缓动属性
             * @param arrProp
             * @param delayTime
             */
            TweenTarget.prototype.resetProp = function (arrProp, delayTime) {
                if (delayTime === void 0) { delayTime = -1; }
                if (arrProp) {
                    this.arrProp = arrProp;
                }
                if (delayTime >= 0) {
                    this.delayTime = delayTime;
                }
            };
            return TweenTarget;
        }());
        common.TweenTarget = TweenTarget;
        /*
        * 2019-04-29 andy
        Tween缓动属性
        */
        var TweenProp = /** @class */ (function () {
            function TweenProp(duration, x, y, alpha, rotation, scaleX, scaleY) {
                if (x === void 0) { x = -1; }
                if (y === void 0) { y = -1; }
                if (alpha === void 0) { alpha = -1; }
                if (rotation === void 0) { rotation = 0; }
                if (scaleX === void 0) { scaleX = -1; }
                if (scaleY === void 0) { scaleY = -1; }
                this.duration = duration;
                this.x = x;
                this.y = y;
                this.alpha = alpha;
                this.rotation = rotation;
                this.scaleX = scaleX;
                this.scaleY = scaleY;
            }
            return TweenProp;
        }());
        common.TweenProp = TweenProp;
        /*
        * 2019-05-07 andy
        Tween缓动属性集合类型
        */
        var TweenPropType;
        (function (TweenPropType) {
            /**不倒翁晃动 1.角度 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG"] = 0] = "PING_PANG";
            /**乒乓球上下晃动 1.Y偏差 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG_1"] = 1] = "PING_PANG_1";
            /**乒乓球左右晃动 1.X偏差 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG_2"] = 2] = "PING_PANG_2";
            /**匀速上下晃动 1.Y偏差 2.晃动速度 默认200毫秒*/
            TweenPropType[TweenPropType["PING_PANG_3"] = 3] = "PING_PANG_3";
            /**横向滑动 1.持续时间 2.x 3.y*/
            TweenPropType[TweenPropType["GUIDE_SLID"] = 4] = "GUIDE_SLID";
            /**横向滑动 1.持续时间 2.X偏差*/
            TweenPropType[TweenPropType["GUIDE_SLID_1"] = 5] = "GUIDE_SLID_1";
            /**竖向滑动 1.持续时间 2.Y偏差*/
            TweenPropType[TweenPropType["GUIDE_SLID_2"] = 6] = "GUIDE_SLID_2";
            /**点击效果 1.Y偏差 默认20*/
            TweenPropType[TweenPropType["GUIDE_CLICK"] = 7] = "GUIDE_CLICK";
            /**亮晶晶效果 1.持续时间2.最小透明度3.最大透明度*/
            TweenPropType[TweenPropType["LIGHT_STAR"] = 8] = "LIGHT_STAR";
            /**缩小放大效果 1.最小比例 2.最大比例 3.变小时间单位毫秒 4.变大时间单位毫秒*/
            TweenPropType[TweenPropType["SMALL_BIG"] = 9] = "SMALL_BIG";
        })(TweenPropType = common.TweenPropType || (common.TweenPropType = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-03 andy
        提示信息管理
        */
        var TipManager = /** @class */ (function () {
            function TipManager() {
                if (TipManager._ins != null)
                    throw new Error("TipManager is single!");
            }
            Object.defineProperty(TipManager, "ins", {
                get: function () {
                    if (!this._ins)
                        TipManager._ins = new TipManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 图片提示
             * @param url 图片或连接
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
             * @param style 显示风格 0.竖直缓动 1.垂直先大后小 默认0
             */
            TipManager.prototype.showImg = function (url, x, y, offH, style) {
                var _this = this;
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (offH === void 0) { offH = -50; }
                if (style === void 0) { style = 0; }
                var imgEfct;
                if (url instanceof Laya.Image) {
                    imgEfct = url;
                }
                else {
                    imgEfct = new Laya.Image(url);
                }
                imgEfct.x = x == 0 ? (game.Define.DeviceW >> 1) : x;
                imgEfct.y = y == 0 ? (game.Define.DeviceH >> 1) : y;
                imgEfct.anchorX = imgEfct.anchorY = 0.5;
                if (!imgEfct.parent) {
                    LayerManager.ins.addChild(imgEfct, LayerName.top);
                }
                switch (style) {
                    case 0:
                        Laya.Tween.to(imgEfct, { y: imgEfct.y + offH }, 500, null, Laya.Handler.create(this, function () {
                            imgEfct.removeSelf();
                            imgEfct = null;
                        }));
                        break;
                    case 1:
                        Laya.Tween.to(imgEfct, { y: imgEfct.y + (offH >> 1), scaleX: 1.2, scaleY: 1.2 }, 200, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(imgEfct, { y: imgEfct.y + offH, scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200, null, Laya.Handler.create(_this, function () {
                                imgEfct.removeSelf();
                                imgEfct.destroy();
                                imgEfct = null;
                            }), 300);
                        }));
                        break;
                    default:
                        break;
                }
            };
            /**
             * 文字提示
             * @param msg 文字
             * @param x 默认为0，X轴居中显示
             * @param y 默认为0，Y轴居中显示
             * @param offH Y轴浮动距离，默认为-50
             * @param fontSize 字体大小，默认为40
             * @param fontColor 字体颜色，默认为黑色
             * @param stroke 描边宽度，默认为0
             * @param strokeColor 描边颜色，默认为ffffff
             * @param style 显示风格 0.竖直缓动 1.垂直先大后小 默认0
             */
            TipManager.prototype.showWord = function (msg, x, y, offH, fontSize, fontColor, stroke, strokeColor, style) {
                var _this = this;
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (offH === void 0) { offH = -50; }
                if (fontSize === void 0) { fontSize = 40; }
                if (fontColor === void 0) { fontColor = "#000000"; }
                if (stroke === void 0) { stroke = 0; }
                if (strokeColor === void 0) { strokeColor = ""; }
                if (style === void 0) { style = 0; }
                var lbl = new Laya.Label();
                lbl.anchorX = 0.5;
                lbl.anchorY = 0.5;
                lbl.color = fontColor;
                lbl.fontSize = fontSize;
                lbl.align = "center";
                if (stroke > 0) {
                    lbl.stroke = stroke;
                    lbl.strokeColor = strokeColor;
                }
                lbl.text = msg;
                lbl.x = x == 0 ? (game.Define.DeviceW >> 1) : x;
                lbl.y = y == 0 ? (game.Define.DeviceH >> 1) : y;
                if (game.Define.screenMode == 0) {
                    lbl.y = lbl.y / (SceneManager.ins.fillRate * SceneManager.ins.fillScale);
                }
                LayerManager.ins.addChild(lbl, LayerName.top);
                switch (style) {
                    case 0:
                        Laya.Tween.to(lbl, { y: lbl.y + offH }, 700, null, Laya.Handler.create(this, function () {
                            lbl.removeSelf();
                            lbl = null;
                        }));
                        break;
                    case 1:
                        Laya.Tween.to(lbl, { y: lbl.y + (offH >> 1), scaleX: 2, scaleY: 2 }, 200, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(lbl, { y: lbl.y + offH, scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200, null, Laya.Handler.create(_this, function () {
                                lbl.removeSelf();
                                lbl = null;
                            }), 500);
                        }));
                        break;
                    default:
                        break;
                }
            };
            /**
             * 显示数字图片
             * @param num  显示数字
             * @param x    显示X
             * @param y    显示Y
             * @param offH Y轴浮动距离，默认为-50
             * @param style 0.竖直缓动 1.垂直先大后小 默认0
             * @param path 数字图片路径，默认game/img_number
             * @param numW 数字图片宽度，默认30
             * @param numW 数字图片容器，默认 null
             */
            TipManager.prototype.showNumber = function (num, x, y, offH, style, path, numW, sp) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (offH === void 0) { offH = -50; }
                if (style === void 0) { style = 0; }
                if (path === void 0) { path = "game/img_number"; }
                if (numW === void 0) { numW = 30; }
                if (sp === void 0) { sp = null; }
                sp = this.numberToImg(num, path, numW, sp);
                this.showImg(sp, x, y, offH, style);
            };
            /**
             * 数字转成图片
             * @param num  显示数字
             * @param path 数字图片路径，默认game/img_number
             * @param numW 数字图片宽度，默认30
             * @param numW 数字图片容器，默认 null
             */
            TipManager.prototype.numberToImg = function (num, path, numW, sp) {
                if (path === void 0) { path = "game/img_number"; }
                if (numW === void 0) { numW = 30; }
                if (sp === void 0) { sp = null; }
                var numL = num.toString().length;
                //2020-07-22 可以外部传入一个显示容器
                if (sp) {
                    while (sp.numChildren > 0) {
                        sp.removeChildAt(0);
                    }
                }
                else {
                    sp = new Laya.Image();
                }
                for (var i = 0; i < numL; i++) {
                    var img = new Laya.Image();
                    var nNmu = Math.pow(10, i);
                    img.skin = path + Math.floor((num / nNmu % 10)) + ".png";
                    img.x = (numL - i - 1) * numW;
                    img.anchorY = 0.5;
                    sp.addChild(img);
                }
                sp.width = i * numW;
                return sp;
            };
            return TipManager;
        }());
        common.TipManager = TipManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        声音管理器
        */
        var SoundManager = /** @class */ (function () {
            function SoundManager() {
                /**声音是否播放 */
                this.isOn = true;
                /**是否震动 */
                this.isShake = true;
                if (SoundManager._ins != null)
                    throw new Error("SoundManager is single!");
                Laya.SoundManager.musicMuted = false;
                //2019-07-15 物理静音，需要使用webAudio，否则无效
                if (Laya.Browser.onIOS) {
                    Laya.SoundManager.useAudioMusic = false;
                }
                //2020-09-04 applovin渠道默认进来静音，获得焦点时在播放
                if (PlatformManager.alPlatform != null) {
                    this.setOn(false);
                    console.log("Applovin默认静音");
                }
            }
            Object.defineProperty(SoundManager, "ins", {
                get: function () {
                    if (!this._ins)
                        SoundManager._ins = new SoundManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**预加载声音 */
            SoundManager.prototype.preload = function (arr, callBack, progress) {
                Laya.loader.load(arr, callBack, progress);
            };
            SoundManager.prototype.init = function (callBack) {
            };
            /**设置声音开关 */
            SoundManager.prototype.setOn = function (v) {
                this.isOn = v;
                laya.media.SoundManager.muted = !v;
                //let volueme= v?1:0;
                //laya.media.SoundManager.setMusicVolume(volueme);
            };
            /**播放背景声音 */
            SoundManager.prototype.playMusic = function (bt) {
                if (!bt) {
                    console.log("播放背景声音参数不能为空！");
                    return;
                }
                game.Define.SOUND_MAIN = bt;
                if (Base64Manager.isUseBase64) {
                    laya.media.SoundManager.playMusic(bt.base64Img);
                }
                else {
                    laya.media.SoundManager.playMusic(bt.id);
                }
            };
            /**播放声音 */
            SoundManager.prototype.playSound = function (bt) {
                if (!bt) {
                    console.log("播放声音参数不能为空！");
                    return;
                }
                if (this.isOn) {
                    if (Base64Manager.isUseBase64) {
                        laya.media.SoundManager.playSound(bt.base64Img);
                    }
                    else {
                        laya.media.SoundManager.playSound(bt.id);
                    }
                }
            };
            /**终止声音 */
            SoundManager.prototype.stopSound = function (soundName) {
                laya.media.SoundManager.stopSound(game.Define.CDN + soundName);
            };
            /**
             * 调用手机震动
             * @param para 1.若为number 震动时间 2.若为数组 震5秒，停0.3秒，在震4秒
             */
            SoundManager.prototype.vibration = function (para) {
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
            };
            return SoundManager;
        }());
        common.SoundManager = SoundManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-02-28 andy
        资源管理器
        */
        var ResManager = /** @class */ (function () {
            function ResManager() {
                if (ResManager._ins != null)
                    throw new Error("ResManager is single!");
            }
            Object.defineProperty(ResManager, "ins", {
                get: function () {
                    if (!this._ins)
                        ResManager._ins = new ResManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            ResManager.prototype.preload = function (arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            };
            ResManager.prototype.init = function (arrUrl, callBack, progress) {
                Laya.loader.load(arrUrl, callBack, progress);
            };
            return ResManager;
        }());
        common.ResManager = ResManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-05 andy
        微信开放数据管理
        */
        var OpenManager = /** @class */ (function () {
            function OpenManager() {
                if (OpenManager._ins != null)
                    throw new Error("OpenManager is single!");
                OpenManager._ins = this;
                this.isDrawOpenView = false;
                this.wx = Laya.Browser.window.wx;
                this.init();
            }
            Object.defineProperty(OpenManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new OpenManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            OpenManager.prototype.init = function () {
                this.resizeStage();
            };
            //----------------------主域调用-----------------
            OpenManager.prototype.postMsg = function (cmd, data) {
                if (this.wx) {
                    var openDataContext = this.wx.getOpenDataContext();
                    openDataContext.postMessage({ cmd: cmd, data: data });
                }
            };
            OpenManager.prototype.resizeStage = function () {
                if (Laya.Browser.window.sharedCanvas) {
                    var scw = 663;
                    var sch = 726;
                    Laya.Browser.window.sharedCanvas.width = scw;
                    Laya.Browser.window.sharedCanvas.height = sch;
                    this.postMsg(common.NoticeEvent.ZY_RESIZE, { width: scw, height: sch, matrix: Laya.stage._canvasTransform });
                    this.initOpenView();
                }
            };
            OpenManager.prototype.setLogin = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Login,{openId:Global.roleData.openid,gameId:DEFINE.gameId,isGame1:DEFINE.isGame1,isGame2:DEFINE.isGame2,isGame3:DEFINE.isGame3,cdn:DEFINE.cdn});
            };
            OpenManager.prototype.setShareTicket = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_ShareTicket,DEFINE.shareTicket);
            };
            OpenManager.prototype.updateScore = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Score,{score:Math.floor(Global.roleData.runDistance)});
            };
            OpenManager.prototype.showRankView = function (type) {
                this.postMsg(common.NoticeEvent.ZY_RANK, null);
            };
            OpenManager.prototype.showOverView = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_Over,{score:Math.floor(Global.roleData.runDistance)});
            };
            OpenManager.prototype.showBeOverView = function () {
                //Global.platform.postMsg(NoticeEvent.Zy_BeOver,null);
            };
            OpenManager.prototype.noticeUILoaded = function (data) {
                //Global.platform.postMsg(NoticeEvent.Zy_UILoaded,data);
            };
            /**
             * name
             */
            OpenManager.prototype.initOpenView = function () {
                if (Laya.Browser.window.sharedCanvas) {
                    this.openSp = new Laya.Sprite();
                    this.openSp.on(Laya.Event.REMOVED, this, this.onRemoveOpenSp);
                    this.openSp.pos(0, 0);
                    // Laya.timer.loop(5000,this,this.drawOpenView);
                    // this.drawOpenView();
                }
            };
            OpenManager.prototype.onRemoveOpenSp = function () {
                this.isDrawOpenView = false;
            };
            OpenManager.prototype.changeOpenParent = function (parent, x, y) {
                if (!Laya.Browser.window.sharedCanvas) {
                    return;
                }
                this.isDrawOpenView = false;
                this.openSp.removeSelf();
                this.openSp.pos(x, y);
                if (parent) {
                    Laya.timer.once(1500, this, this.delayAddOpenSp, [parent]);
                }
            };
            OpenManager.prototype.updateOpenView = function () {
                Laya.timer.once(2000, this, this.drawOpenView);
            };
            OpenManager.prototype.delayAddOpenSp = function (parent) {
                parent.addChild(this.openSp);
                this.isDrawOpenView = true;
                this.drawOpenView();
                this.updateOpenView();
            };
            OpenManager.prototype.drawOpenView = function () {
                if (this.isDrawOpenView) {
                    this.openSp.graphics.clear();
                    if (this.openTex)
                        this.openTex.destroy();
                    this.openTex = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                    // this.openTex.bitmap.alwaysChange = true;//小程序使用，非常费，这个参数可以根据自己的需求适当调整，如果内容不变可以不用设置成true
                    this.openSp.graphics.drawTexture(this.openTex, 0, 0, this.openTex.width, this.openTex.height);
                    // this.openTex.bitmap.reloadCanvasData();
                }
            };
            return OpenManager;
        }());
        common.OpenManager = OpenManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var common;
    (function (common) {
        /*
        *2019-05-05 andy
        Matter 2D物理引擎管理类
        */
        var MatterManager = /** @class */ (function () {
            function MatterManager() {
                this.Matter = Laya.Browser.window.Matter;
                this.LayaRender = Laya.Browser.window.LayaRender;
                if (MatterManager._ins != null)
                    throw new Error("MatterManager is single!");
            }
            Object.defineProperty(MatterManager, "ins", {
                get: function () {
                    if (!this._ins)
                        MatterManager._ins = new MatterManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(MatterManager.prototype, "mouseConstraint", {
                /**
                 * 获得Matter.MouseConstraint
                 */
                get: function () {
                    return this._mouseConstraint;
                },
                enumerable: false,
                configurable: true
            });
            MatterManager.prototype.init = function () {
                // 初始化物理引擎 enableSleeping: true睡眠模式
                this.engine = Matter.Engine.create({ enableSleeping: true });
                Matter.Engine.run(this.engine);
                //采用Laya渲染
                this.gameWorld = new Sprite();
                Laya.stage.addChild(this.gameWorld);
                this.render = this.LayaRender.create({ engine: this.engine, container: this.gameWorld.stage, width: game.Define.DeviceW, height: game.Define.DeviceH, options: { background: 'res/physics/img/background.png', wireframes: false } });
                this.LayaRender.run(this.render);
                //鼠标控制
                this.initMouse();
            };
            MatterManager.prototype.initMouse = function () {
                this._mouseConstraint = Matter.MouseConstraint.create(this.engine, { constraint: { id: 0, render: this.render } });
                this.addWord(this._mouseConstraint);
                this.render.mouse = this._mouseConstraint.mouse;
                // if (!this.mouseConstraint) {
                //     if (this.engine && this.engine.render && this.engine.render.canvas) {
                //         this.mouseConstraint = Matter.MouseConstraint.create(this.engine.render.canvas);
                //     } else if (options && options.element) {
                //         mouse = Mouse.create(options.element);
                //     } else {
                //         mouse = Mouse.create();
                //         Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
                //     }
                // }
            };
            /**
             * 添加到世界
             * @param arr
             */
            MatterManager.prototype.addWord = function (body) {
                if (!this.engine) {
                    console.error("Matter engine 未初始化！");
                    return;
                }
                Matter.World.add(this.engine.world, body);
            };
            /**
             * 引擎注册事件
             * @param eventName
             * @param callBack
             */
            MatterManager.prototype.regEvent = function (eventName, callBack) {
                Matter.Events.on(this.engine, eventName, callBack);
            };
            /**
             * 场景尺寸发生改变
             */
            MatterManager.prototype.onResize = function () {
                if (!this.engine) {
                    return;
                }
                // 设置鼠标的坐标缩放
                // Laya.stage.clientScaleX代表舞台缩放
                // Laya.stage._canvasTransform代表画布缩放
                Matter.Mouse.setScale(this._mouseConstraint.mouse, { x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d) });
            };
            return MatterManager;
        }());
        common.MatterManager = MatterManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var game;
(function (game) {
    var base64;
    (function (base64_1) {
        /*
        * 2019-04-28 andy
        BASE64图集管理器
        */
        var Base64Manager = /** @class */ (function () {
            function Base64Manager() {
                this.loadIndex = 0;
                if (Base64Manager._ins != null)
                    throw new Error("Base64Manager is single!");
                this.arrLoadAtlas = [];
            }
            Object.defineProperty(Base64Manager, "ins", {
                get: function () {
                    if (!this._ins)
                        Base64Manager._ins = new Base64Manager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            Base64Manager.prototype.init = function () {
            };
            /**
             * 加载BASE64图集
             * @param arrAtlas 图集数组
             * @param callBack
             * @param progress
             */
            Base64Manager.prototype.loadAtlas = function (arrAtlas, callBack, progress) {
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
            };
            Base64Manager.prototype.parseAtlasNext = function () {
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
            };
            /**
             * 解析BASE64图集
             * @param base64Type
             */
            Base64Manager.prototype.parseAtlas = function (base64Type) {
                var _this = this;
                //console.log("parse路径:",base64Type.id);
                if (base64Type.base64Img == null || base64Type.base64Img == "") {
                    this.cacheBase64Json(base64Type);
                    return;
                }
                if (base64Type.base64Json == null || base64Type.base64Json == "") {
                    this.cacheBase64Img(base64Type);
                    return;
                }
                //Base64字符串得到json对象
                var json = this.base64ToJson(base64Type.base64Json);
                //"meta":{"image":"frame.png,frame1.png","prefix":"frame/"}
                var atlasName = json.meta.prefix;
                //console.log("atlasName:",atlasName);
                //切图
                // Laya.loader.load(base64Type.base64Img,Laya.Handler.create(this,()=>{
                //     let imgBig:Laya.Texture=Laya.Loader.getRes(base64Type.base64Img);
                //     let frame:any=null;
                //     for(let key in json.frames){
                //         frame=json.frames[key].frame;
                //         //console.log("key",key,"value",JSON.stringify(json.frames[key]));
                //         let texture:Laya.Texture=Laya.Texture.create(imgBig.bitmap,frame.x,frame.y,frame.w,frame.h);
                //         //缓存到LAYA资源管理
                //         Laya.Loader.cacheRes(atlasName+key,texture);
                //     }
                //     this.parseAtlasNext();
                // }))
                var img = new Laya.Image();
                img.skin = base64Type.base64Img;
                img.loadImage(base64Type.base64Img, 0, 0, 0, 0, Laya.Handler.create(this, function () {
                    var imgBig = Laya.Loader.getRes(base64Type.base64Img);
                    var frame = null;
                    for (var key in json.frames) {
                        frame = json.frames[key].frame;
                        //console.log("key",key,"value",JSON.stringify(json.frames[key]));
                        var texture = Laya.Texture.create(imgBig.bitmap, frame.x, frame.y, frame.w, frame.h);
                        //缓存到LAYA资源管理
                        Laya.Loader.cacheRes(atlasName + key, texture);
                    }
                    _this.parseAtlasNext();
                }));
            };
            /**
             * 预先需要加载的单张图片，比如spine动画
             * @param base64Type
             */
            Base64Manager.prototype.cacheBase64Img = function (base64Type) {
                var _this = this;
                var img = new Laya.Image();
                img.skin = base64Type.base64Img;
                img.loadImage(base64Type.base64Img, 0, 0, 0, 0, Laya.Handler.create(this, function () {
                    var imgBig = Laya.Loader.getRes(base64Type.base64Img);
                    //缓存到LAYA资源管理
                    Laya.Loader.cacheRes(base64Type.id, imgBig);
                    _this.parseAtlasNext();
                }));
            };
            /**
             * 加载Json
             * @param base64Type
             */
            Base64Manager.prototype.cacheBase64Json = function (base64Type) {
                var json = this.base64ToJson(base64Type.base64Json);
                Laya.loader.cacheRes(base64Type.id, json);
                this.parseAtlasNext();
            };
            /**
             * 自动检测图片
             * @param img
             * @param skinName 图集图片，传入此值，img.skin不需要赋值
             * @param base64Type 不是图集的图片，需要传入此值
             */
            Base64Manager.prototype.checkImg = function (img, base64Type) {
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
            };
            /**
             * 自动检测视频
             * @param video
             * @param base64Type
             */
            Base64Manager.prototype.checkVideo = function (img, base64Type) {
                if (!img) {
                    console.error("参数为空");
                    return;
                }
                if (Base64Manager.isUseBase64) {
                    if (base64Type) {
                        img.src = base64Type.base64Img;
                    }
                    else {
                    }
                }
                else {
                    if (base64Type) {
                        img.src = base64Type.id;
                    }
                    else {
                    }
                }
            };
            /**
             * base64 -> Json
             * @param base64Data
             */
            Base64Manager.prototype.base64ToJson = function (base64) {
                //base64解密获得json字符串
                var jsonStr = window.atob(base64);
                //console.log("jsonStr",jsonStr);
                //将json字符串转成json对象
                var json = JSON.parse(jsonStr);
                return json;
            };
            /**
             * Base64 -> ByteArray
             * @param base64String
             */
            Base64Manager.prototype.base64ToUint8Array = function (base64String) {
                var padding = '='.repeat((4 - base64String.length % 4) % 4);
                var base64 = (base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/');
                var rawData = window.atob(base64);
                var outputArray = new Uint8Array(rawData.length);
                for (var i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            };
            /**
             * ByteArray -> Base64
             * @param buffer
             */
            Base64Manager.prototype.arrayBufferToBase64 = function (buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            };
            /**是否使用BASE64图片 */
            Base64Manager.isUseBase64 = false;
            return Base64Manager;
        }());
        base64_1.Base64Manager = Base64Manager;
        /*
        * 2019-04-28 andy
        BASE64 图片类型
        */
        var Base64Type = /** @class */ (function () {
            /**
             *
             * @param id
             * @param name
             * @param base64Json
             * @param base64Img
             * @param paramStr
             * @param paramNum
             */
            function Base64Type(id, name, base64Json, base64Img, paramStr, paramNum) {
                if (base64Json === void 0) { base64Json = ""; }
                if (base64Img === void 0) { base64Img = ""; }
                if (paramStr === void 0) { paramStr = ""; }
                if (paramNum === void 0) { paramNum = 0; }
                this.id = id;
                this.name = name;
                this.base64Json = base64Json;
                this.base64Img = base64Img;
                this.paramStr = paramStr;
                this.paramNum = paramNum;
            }
            return Base64Type;
        }());
        base64_1.Base64Type = Base64Type;
    })(base64 = game.base64 || (game.base64 = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var common;
    (function (common) {
        /*
        * 2019-03-01 andy
        事件分发器
        */
        var EventManager = /** @class */ (function (_super) {
            __extends(EventManager, _super);
            function EventManager() {
                var _this = _super.call(this) || this;
                if (EventManager._ins != null)
                    throw new Error("EventManager is single!");
                return _this;
            }
            Object.defineProperty(EventManager, "ins", {
                get: function () {
                    if (!this._ins)
                        EventManager._ins = new EventManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            EventManager.prototype.init = function () {
            };
            EventManager.prototype.event = function (type, data) {
                _super.prototype.on;
                return _super.prototype.event.call(this, type, new NoticeEvent(type, data));
            };
            return EventManager;
        }(Laya.EventDispatcher));
        common.EventManager = EventManager;
        var NoticeEvent = /** @class */ (function () {
            function NoticeEvent(type, data) {
                this.type = type;
                this.data = data;
            }
            /**平台初始化完成 */
            NoticeEvent.PLATFORM_INIT_OVER = "PLATFORM_INIT_OVER";
            /**平台登录成功 */
            NoticeEvent.PLATFORM_LOGIN_SUCCESS = "PLATFORM_LOGIN_SUCCESS";
            /**平台登录失败 */
            NoticeEvent.PLATFORM_LOGIN_FAIL = "GAME_RES_LOAD_FINISH";
            /**资源加载完成 */
            NoticeEvent.GAME_RES_LOAD_FINISH = "GAME_RES_LOAD_FINISH";
            /**http请求进度 */
            NoticeEvent.HTTP_PROGRESS = "HTTP_PROGRESS";
            /**触摸事件 state 1.按下 2.弹起*/
            NoticeEvent.TOUCH = "TOUCH";
            /**触摸方向事件 */
            NoticeEvent.TOUCH_DIRECTOR = "TOUCH_DIRECTOR";
            /**摇杆方向事件 */
            NoticeEvent.ROCKER_DIRECTOR = "ROCKER_DIRECTOR";
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
            /**游戏分数变化事件 */
            NoticeEvent.GAME_SCORE_UPDATE = "GAME_SCORE_UPDATE";
            /**游戏金币变化事件 */
            NoticeEvent.GAME_GOLD_UPDATE = "GAME_GOLD_UPDATE";
            /**游戏等级变化事件 */
            NoticeEvent.GAME_LEVEL_UPDATE = "GAME_LEVEL_UPDATE";
            /**游戏结束事件 */
            NoticeEvent.GAME_OVER = "GAME_OVER";
            /**游戏再来一次事件 */
            NoticeEvent.GAME_AGIN = "GAME_AGIN";
            /**游戏下一关事件 */
            NoticeEvent.GAME_NEXT = "GAME_NEXT";
            /**游戏警告事件 */
            NoticeEvent.GAME_WARNING = "GAME_WARNING";
            /**空投结束事件 */
            NoticeEvent.EFT_AIR_DROP_OVER = "EFT_AIR_DROP_OVER";
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
            return NoticeEvent;
        }());
        common.NoticeEvent = NoticeEvent;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var display;
    (function (display) {
        /**
         * 2019-12-18
         * 所有显示基类
         */
        var BaseDisplay = /** @class */ (function (_super) {
            __extends(BaseDisplay, _super);
            function BaseDisplay() {
                var _this = _super.call(this) || this;
                _this._isDisplay = false;
                _this._isInit = false;
                _this.on(Laya.Event.ADDED, _this, _this.ADDED);
                return _this;
            }
            BaseDisplay.prototype.ADDED = function (event) {
                if (!this._isInit) {
                    this._isInit = true;
                    this.init();
                }
                this._isDisplay = true;
                this.off(Laya.Event.ADDED, this, this.ADDED);
                this.on(Laya.Event.REMOVED, this, this.REMOVED);
                this.onAdd();
            };
            BaseDisplay.prototype.REMOVED = function (event) {
                this._isDisplay = false;
                this.on(Laya.Event.ADDED, this, this.ADDED);
                this.off(Laya.Event.REMOVED, this, this.REMOVED);
                // UIScaleManager.ins.regUI(this.uiType.name,null,null);
                this.onRemove();
            };
            /**
             * 创建时调用
             */
            BaseDisplay.prototype.onAdd = function () {
            };
            /**
             * 移除时调用
             */
            BaseDisplay.prototype.onRemove = function () {
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
            };
            /**执行一次 */
            BaseDisplay.prototype.init = function () {
            };
            Object.defineProperty(BaseDisplay.prototype, "isDisplay", {
                /**是否显示 */
                get: function () {
                    return this._isDisplay;
                },
                enumerable: false,
                configurable: true
            });
            return BaseDisplay;
        }(Laya.Sprite));
        display.BaseDisplay = BaseDisplay;
    })(display = game.display || (game.display = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var display;
    (function (display) {
        /**
         * 2019-12-19 andy
         * 动画基类 生物，序列帧
         */
        var BaseAnimation = /** @class */ (function (_super) {
            __extends(BaseAnimation, _super);
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
            function BaseAnimation() {
                var _this = _super.call(this) || this;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                _this.anim = new Laya.Animation();
                _this.addChild(_this.anim);
                return _this;
            }
            BaseAnimation.prototype.onAdd = function () {
                this.anim.on(Laya.Event.LABEL, this, this.onLabel);
                this.anim.on(Laya.Event.STOPPED, this, this.onStop);
                this.anim.on(Laya.Event.COMPLETE, this, this.onComplete);
            };
            BaseAnimation.prototype.onRemove = function () {
                this.anim.off(Laya.Event.LABEL, this, this.onLabel);
                this.anim.off(Laya.Event.STOPPED, this, this.onStop);
                this.anim.off(Laya.Event.COMPLETE, this, this.onStop);
                Laya.timer.clearAll(this.anim);
                Laya.timer.clearAll(this);
            };
            /**
             * 设置皮肤
             */
            BaseAnimation.prototype.setSkin = function (skinData, isAdd) {
                if (isAdd === void 0) { isAdd = true; }
            };
            /**
             * 设置帧频
             */
            BaseAnimation.prototype.setInterval = function (count) {
                if (count === void 0) { count = 50; }
                this.anim.interval = count;
            };
            /**
             * 播放动画
             */
            BaseAnimation.prototype.play = function () {
                this.anim.play();
            };
            /**
             * 停止动画
             */
            BaseAnimation.prototype.stop = function () {
                this.anim.stop();
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseAnimation.prototype.onLabel = function (ev) {
                //console.log(`onLabel ` + ev);
            };
            /**
             * 播放暂停事件
             * @param ev
             */
            BaseAnimation.prototype.onStop = function (ev) {
                //console.log(`onStop ` + ev);
            };
            /**
             * 播放完成事件
             * @param ev
             */
            BaseAnimation.prototype.onComplete = function (ev) {
                //console.log(`onComplete ` + ev);
            };
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * skinName 皮肤名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            BaseAnimation.aniUrls = function (skinName, length) {
                var urls = [];
                for (var i = 1; i <= length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(skinName + "_" + i + ".png");
                }
                return urls;
            };
            return BaseAnimation;
        }(display.BaseDisplay));
        display.BaseAnimation = BaseAnimation;
    })(display = game.display || (game.display = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var display;
    (function (display) {
        /*
        2019-02-27 andy
        * UI基类 窗体
        */
        var BaseUI = /** @class */ (function (_super) {
            __extends(BaseUI, _super);
            function BaseUI() {
                var _this = _super.call(this) || this;
                _this.dicInitPosition = new Dictionary();
                return _this;
            }
            BaseUI.prototype.onAdd = function () {
                _super.prototype.onAdd.call(this);
                this.open();
            };
            BaseUI.prototype.onRemove = function () {
                _super.prototype.onRemove.call(this);
                this.close();
            };
            BaseUI.prototype.open = function () {
            };
            BaseUI.prototype.close = function () {
            };
            BaseUI.prototype.detory = function () {
            };
            /**UI是否显示 */
            BaseUI.prototype.isOpen = function () {
                return this != null && this.parent != null;
            };
            /**横屏时布局设置 */
            BaseUI.prototype.scaleH = function () {
            };
            /**竖屏时布局设置 */
            BaseUI.prototype.scaleV = function () {
            };
            /**
             * 记录初始坐标
             */
            BaseUI.prototype.recordInitPosition = function (ui) {
                if (ui instanceof Laya.View) {
                    this.recordViewPosition(ui);
                }
                else {
                    this.dicInitPosition.add(ui.name, new Laya.Point(ui.x, ui.y));
                }
            };
            BaseUI.prototype.recordViewPosition = function (sp) {
                for (var _i = 0, _a = sp._childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.name != "") {
                        this.dicInitPosition.add(child.name, new Laya.Point(child.x, child.y));
                    }
                    if (child instanceof Laya.Sprite) {
                        this.recordViewPosition(child);
                    }
                }
            };
            /**
             * 得到显示对象初始位置
             * @param name 显示对象
             */
            BaseUI.prototype.getInitPosition = function (name) {
                var point = this.dicInitPosition.get(name);
                if (!point) {
                    point = new Laya.Point();
                    //this.dicInitPosition.add(name,point);
                }
                return point;
            };
            /**
             * 得到两个显示对象的初始位置偏差X
             * @param sp1 显示对象1
             * @param sp2 显示对象2
             */
            BaseUI.prototype.getInitPositionOffX = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return 0;
                }
                var p1 = this.getInitPosition(sp1.name);
                var p2 = this.getInitPosition(sp2.name);
                return p2.x - p1.x;
            };
            /**
             * 得到两个显示对象的初始位置偏差Y
             * @param sp1 显示对象1
             * @param sp2 显示对象2
             */
            BaseUI.prototype.getInitPositionOffY = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return 0;
                }
                var p1 = this.getInitPosition(sp1.name);
                var p2 = this.getInitPosition(sp2.name);
                return p2.y - p1.y;
            };
            /**
             * 还原初始位置
             * @param sp 显示对象
             */
            BaseUI.prototype.resetInitPosition = function (sp) {
                var point = this.dicInitPosition.get(sp.name);
                if (point) {
                    sp.x = point.x;
                    sp.y = point.y;
                }
            };
            /**
             * 根据两个初始的位置偏差X,设置现在的位置X
             * @param sp1 参考对象1
             * @param sp2 得到对象2
             */
            BaseUI.prototype.setPositionByOffX = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return;
                }
                var offX = this.getInitPositionOffX(sp1, sp2);
                sp2.x = sp1.x + offX;
            };
            /**
             * 根据两个初始的位置偏差Y,设置现在的位置Y
             * @param sp1 参考对象1
             * @param sp2 得到对象2
             */
            BaseUI.prototype.setPositionByOffY = function (sp1, sp2) {
                if (!sp1 || !sp2) {
                    return;
                }
                var offY = this.getInitPositionOffY(sp1, sp2);
                sp2.y = sp1.y + offY;
            };
            return BaseUI;
        }(display.BaseDisplay));
        display.BaseUI = BaseUI;
    })(display = game.display || (game.display = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        var BaseUI = game.display.BaseUI;
        /*
        * 特效基类
        2019-07-17 andy
        */
        var BaseEffect = /** @class */ (function (_super) {
            __extends(BaseEffect, _super);
            function BaseEffect(isScene) {
                var _this = _super.call(this) || this;
                /**是否正在播放特效 */
                _this.isPlaying = false;
                return _this;
            }
            /**执行一次 */
            BaseEffect.prototype.init = function () {
            };
            /**窗体打开 */
            BaseEffect.prototype.open = function () {
                _super.prototype.open.call(this);
            };
            /**窗体关闭 */
            BaseEffect.prototype.close = function () {
                _super.prototype.close.call(this);
                this.isPlaying = false;
                Laya.Tween.clearAll(this);
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            BaseEffect.prototype.setData = function (effectData) {
                this.effectData = effectData;
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            BaseEffect.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                if (this.isPlaying) {
                    return;
                }
                if (!this.parent) {
                    if (parent instanceof Laya.Sprite) {
                        parent.addChild(this);
                    }
                    else {
                        effect.EffectManager.ins.addEffect(this, parent ? parent : LayerName.ui_effect);
                    }
                }
                this.isPlaying = true;
            };
            /**停止特效 */
            BaseEffect.prototype.stop = function () {
                this.removeSelf();
            };
            BaseEffect.prototype.lineMove = function (line, from, to, time1, time2, delayTime) {
                var _this = this;
                if (delayTime === void 0) { delayTime = 0; }
                line.x = from;
                Laya.Tween.to(line, { x: to }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(line, { x: from }, time2, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearAll(line);
                    }));
                }), delayTime);
            };
            return BaseEffect;
        }(BaseUI));
        effect.BaseEffect = BaseEffect;
        /*
        * 特效基类数据
        2020-01-03 andy
        */
        var BaseEffectData = /** @class */ (function () {
            function BaseEffectData() {
            }
            return BaseEffectData;
        }());
        effect.BaseEffectData = BaseEffectData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 空投掉落特效
        2020-01-03 andy
        */
        var AirDropEft = /** @class */ (function (_super) {
            __extends(AirDropEft, _super);
            function AirDropEft(isScene) {
                return _super.call(this, isScene) || this;
            }
            /**执行一次 */
            AirDropEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param data BaseEffectData
             */
            AirDropEft.prototype.setData = function (data) {
                _super.prototype.setData.call(this, data);
                this.data = data;
                if (this.data.shadowSkin) {
                    this.imgShadow = new Laya.Image(this.data.shadowSkin);
                    this.imgShadow.anchorX = this.imgShadow.anchorY = 0.5;
                    this.imgShadow.visible = false;
                    this.addChild(this.imgShadow);
                }
                if (this.data.parachuteSkin) {
                    this.imgParachute = new Laya.Image(this.data.parachuteSkin);
                    this.imgParachute.anchorX = this.imgParachute.anchorY = 0.5;
                    this.imgParachute.visible = false;
                    this.addChild(this.imgParachute);
                }
                if (this.data.planSkin) {
                    this.imgPlane = new Laya.Image(this.data.planSkin);
                    this.imgPlane.anchorX = this.imgPlane.anchorY = 0.5;
                    this.imgPlane.rotation = this.data.planeRotate;
                    this.imgPlane.visible = false;
                    this.addChild(this.imgPlane);
                }
                if (this.data.dropBoxSkin) {
                    this.imgDropBox = new Laya.Image(this.data.dropBoxSkin);
                    this.imgDropBox.anchorX = this.imgDropBox.anchorY = 0.5;
                    this.imgDropBox.visible = false;
                    this.addChild(this.imgDropBox);
                }
            };
            /**窗体关闭 */
            AirDropEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.imgPlane);
                Laya.Tween.clearAll(this.imgParachute);
                Laya.Tween.clearAll(this.imgShadow);
                Laya.Tween.clearAll(this.imgDropBox);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            AirDropEft.prototype.play = function (parent) {
                var _this = this;
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                if (this.imgPlane) {
                    this.imgPlane.x = this.data.planeStartPoint.x;
                    this.imgPlane.y = this.data.planeStartPoint.y;
                    this.imgPlane.visible = true;
                    Laya.Tween.to(this.imgPlane, { x: this.data.planeEndPoint.x, y: this.data.planeEndPoint.y }, this.data.planeFlyTime, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                        _this.imgPlane.visible = false;
                    }));
                }
                if (this.imgDropBox) {
                    this.imgDropBox.visible = false;
                }
                Laya.timer.once(this.data.parachuteDelayTime, this, function () {
                    _this.imgParachute.x = _this.data.parachuteStartPoint.x;
                    _this.imgParachute.y = _this.data.parachuteStartPoint.y;
                    _this.imgParachute.scaleX = _this.imgParachute.scaleY = _this.data.parachuteStartScale;
                    _this.imgParachute.visible = true;
                    Laya.Tween.to(_this.imgParachute, { x: _this.data.parachuteEndPoint.x, y: _this.data.parachuteEndPoint.y, scaleX: _this.data.parachuteEndScale, scaleY: _this.data.parachuteEndScale }, _this.data.parachuteFlyTime, Laya.Ease.linearIn, Laya.Handler.create(_this, function () {
                        _this.imgParachute.visible = false;
                        EventManager.ins.event(NoticeEvent.EFT_AIR_DROP_OVER);
                        //显示宝箱
                        if (_this.imgDropBox) {
                            _this.imgDropBox.x = _this.data.parachuteEndPoint.x;
                            _this.imgDropBox.y = _this.data.parachuteEndPoint.y;
                            _this.imgDropBox.visible = true;
                        }
                    }));
                    _this.imgShadow.x = _this.data.shadowStartPoint.x;
                    _this.imgShadow.y = _this.data.shadowStartPoint.y;
                    _this.imgShadow.scaleX = _this.imgShadow.scaleY = _this.data.shadowStartScale;
                    _this.imgShadow.visible = true;
                    Laya.Tween.to(_this.imgShadow, { x: _this.data.parachuteEndPoint.x, y: _this.data.parachuteEndPoint.y, scaleX: _this.data.shadowEndScale, scaleY: _this.data.shadowEndScale }, _this.data.parachuteFlyTime, Laya.Ease.linearIn, Laya.Handler.create(_this, function () {
                        _this.imgShadow.visible = false;
                    }));
                });
            };
            /**停止特效 */
            AirDropEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return AirDropEft;
        }(effect.BaseEffect));
        effect.AirDropEft = AirDropEft;
        /*
        * 空投数据
        2020-01-03 andy
        */
        var AirDropData = /** @class */ (function (_super) {
            __extends(AirDropData, _super);
            /**
             *
             * @param planSkin      飞机皮肤
             * @param parachuteSkin  降落伞皮肤
             * @param shadowSkin     降落伞皮肤
             * @param dropBoxSkin    掉落宝箱皮肤
             */
            function AirDropData(planSkin, parachuteSkin, shadowSkin, dropBoxSkin) {
                var _this = _super.call(this) || this;
                /**飞机飞行时间 默认1000毫秒*/
                _this.planeFlyTime = 1000;
                /**飞机旋转角度 默认0*/
                _this.planeRotate = 0;
                /**降落伞空投延时时间 默认500毫秒*/
                _this.parachuteDelayTime = 500;
                /**降落伞飞行时间 默认1000毫秒*/
                _this.parachuteFlyTime = 1000;
                /**降落伞起始缩放 默认1*/
                _this.parachuteStartScale = 1;
                /**降落伞目标缩放 默认1*/
                _this.parachuteEndScale = 1;
                /**降落伞影子起始缩放 默认1*/
                _this.shadowStartScale = 1;
                /**降落伞影子目标缩放 默认1*/
                _this.shadowEndScale = 1;
                _this.planSkin = planSkin;
                _this.parachuteSkin = parachuteSkin;
                _this.shadowSkin = shadowSkin;
                _this.dropBoxSkin = dropBoxSkin;
                _this.planeStartPoint = new Laya.Point(0, game.Define.DeviceH);
                _this.planeEndPoint = new Laya.Point(game.Define.DeviceW, 0);
                _this.parachuteStartPoint = new Laya.Point(game.Define.DeviceW >> 1, 0);
                _this.parachuteEndPoint = new Laya.Point(game.Define.DeviceW >> 1, game.Define.DeviceH >> 1);
                _this.shadowStartPoint = new Laya.Point(game.Define.DeviceW >> 1, game.Define.DeviceH);
                return _this;
            }
            return AirDropData;
        }(effect.BaseEffectData));
        effect.AirDropData = AirDropData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var effect;
    (function (effect) {
        var BaseAnimation = game.display.BaseAnimation;
        /**
         * 序列帧动画
         */
        var BaseFrame = /** @class */ (function (_super) {
            __extends(BaseFrame, _super);
            /**
             *
             * @param cfg  Cfg_Frame
             * @param callBack
             */
            function BaseFrame(cfg, callBack) {
                if (callBack === void 0) { callBack = null; }
                var _this = _super.call(this) || this;
                /**帧动画名字 */
                _this.skin = "";
                /**序列动画帧数 */
                _this.count = 1;
                /**是否循环播放 */
                _this.isLoop = false;
                /**是否自动删除 */
                _this.isRemove = true;
                if (cfg) {
                    _this.skin = cfg.skin;
                    _this.count = cfg.count;
                    _this.width = cfg.width;
                    _this.height = cfg.height;
                    _this.pivot(_this.width >> 1, _this.height >> 1);
                    _this.setInterval(cfg.rate);
                }
                else {
                    console.log("序列帧数据为空！");
                }
                _this.callBack = callBack;
                return _this;
            }
            /**
             * 需在子类设置
             */
            BaseFrame.prototype.init = function () {
            };
            /**
             *
             */
            BaseFrame.prototype.onAdd = function () {
                _super.prototype.onAdd.call(this);
                if (this.isLoad) {
                    this.playFrame(this.isLoop, null, this.isRemove);
                }
                else {
                    // if(BASE64Manager.isUseBase64){
                    // 	this.loadFinish();
                    // }else{
                    // Laya.loader.load(Define.CDN+"/atlas/"+this.atlasName+".atlas",Laya.Handler.create(this,()=>{
                    this.loadFinish();
                    // }));
                    // }  
                }
            };
            BaseFrame.prototype.loadFinish = function () {
                this.isLoad = true;
                //创建动画模板
                var arr = BaseAnimation.aniUrls(this.skin, this.count);
                Laya.Animation.createFrames(arr, this.skin);
                this.playFrame(this.isLoop, null, this.isRemove);
            };
            BaseFrame.prototype.setSkin = function (skin) {
                if (this.anim) {
                    this.skin = skin;
                    this.anim.play(0, this.isLoop, skin);
                }
            };
            /**
             * 播放序列帧动画
             * @param isLoop 是否循环，默认false
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             * @param isRemove 播放完成后是否移除,默认true
             */
            BaseFrame.prototype.playFrame = function (isLoop, parent, isRemove) {
                if (isLoop === void 0) { isLoop = false; }
                if (parent === void 0) { parent = null; }
                if (isRemove === void 0) { isRemove = true; }
                this.isLoop = isLoop;
                this.isRemove = isRemove;
                if (this.isDisplay) {
                    if (this.anim.isPlaying) {
                        return;
                    }
                    this.anim.play(0, this.isLoop, this.skin);
                }
                else {
                    if (parent instanceof Laya.Sprite) {
                        parent.addChild(this);
                    }
                    else {
                        effect.FrameManager.ins.addFrame(this, parent ? parent : LayerName.ui_effect);
                    }
                }
            };
            /**
             * 停止序列帧动画
             */
            BaseFrame.prototype.stopFrame = function () {
                _super.prototype.stop.call(this);
                if (this.isRemove) {
                    this.removeSelf();
                }
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseFrame.prototype.onLabel = function (ev) {
                //console.log(`onLabel ` + ev);
            };
            /**
             * 播放暂停事件
             * @param ev
             */
            BaseFrame.prototype.onStop = function (ev) {
                _super.prototype.onStop.call(this, ev);
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            };
            /**
             * 播放完成事件
             * @param ev
             */
            BaseFrame.prototype.onComplete = function (ev) {
                _super.prototype.onComplete.call(this, ev);
                if (!this.isLoop) {
                    this.stopFrame();
                }
                if (this.callBack) {
                    this.callBack.run();
                }
            };
            return BaseFrame;
        }(BaseAnimation));
        effect.BaseFrame = BaseFrame;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * Boss来袭出场特效
        2019-07-17 andy
        */
        var BossWarningEft = /** @class */ (function (_super) {
            __extends(BossWarningEft, _super);
            function BossWarningEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //交叉线1
                _this.imgLine1 = null;
                //交叉线2
                _this.imgLine2 = null;
                //交叉线3
                _this.imgLine3 = null;
                //交叉线4
                _this.imgLine4 = null;
                //交叉线5
                _this.imgLine5 = null;
                //Boss头像
                _this.imgBoss = null;
                //文字
                _this.lblWord = null;
                _this.imgLine1 = new Laya.Image();
                _this.addChild(_this.imgLine1);
                _this.imgLine2 = new Laya.Image();
                _this.addChild(_this.imgLine2);
                _this.imgLine3 = new Laya.Image();
                _this.addChild(_this.imgLine3);
                _this.imgLine4 = new Laya.Image();
                _this.addChild(_this.imgLine4);
                _this.imgLine5 = new Laya.Image();
                _this.addChild(_this.imgLine5);
                _this.imgBoss = new Laya.Image();
                _this.imgBoss.anchorX = 0.5;
                _this.addChild(_this.imgBoss);
                _this.lblWord = new Laya.Label();
                _this.lblWord.anchorX = 0.5;
                _this.lblWord.wordWrap = true;
                //this.lblWord.align = "center";  
                _this.addChild(_this.lblWord);
                return _this;
            }
            /**执行一次 */
            BossWarningEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            BossWarningEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                this.imgLine1.skin = this.data.line1Skin;
                this.imgLine2.skin = this.data.line2Skin;
                this.imgLine3.skin = this.data.line1Skin;
                this.imgLine4.skin = this.data.line2Skin;
                this.imgLine5.skin = this.data.line1Skin;
                this.imgLine1.y = -this.imgLine1.height - this.imgLine2.height - (this.imgLine3.height >> 1);
                this.imgLine2.y = this.imgLine1.y + this.imgLine1.height + this.data.linePadding;
                this.imgLine3.y = this.imgLine2.y + this.imgLine2.height + this.data.linePadding;
                this.imgLine4.y = this.imgLine3.y + this.imgLine3.height + this.data.linePadding;
                this.imgLine5.y = this.imgLine4.y + this.imgLine4.height + this.data.linePadding;
                this.imgBoss.skin = this.data.bossSkin;
                this.imgBoss.y = this.data.bossY;
                this.lblWord.text = this.data.word;
                this.lblWord.y = this.data.wordY;
                this.lblWord.width = this.data.wordW > 0 ? this.data.wordW : this.lblWord.displayWidth;
                this.lblWord.height = this.data.wordH > 0 ? this.data.wordH : this.lblWord.displayHeight;
                this.lblWord.fontSize = this.data.wordSize;
                this.lblWord.color = this.data.wordColor;
                this.lblWord.stroke = this.data.wordStroke;
                this.lblWord.strokeColor = this.data.wordStrokeColor;
            };
            /**窗体打开 */
            BossWarningEft.prototype.open = function () {
            };
            /**窗体关闭 */
            BossWarningEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.imgLine1);
                Laya.Tween.clearAll(this.imgLine2);
                Laya.Tween.clearAll(this.imgLine3);
                Laya.Tween.clearAll(this.imgLine4);
                Laya.Tween.clearAll(this.imgLine5);
                Laya.Tween.clearAll(this.imgBoss);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            BossWarningEft.prototype.play = function (parent) {
                var _this = this;
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                this.imgBoss.x = game.Define.DeviceH;
                Laya.Tween.to(this.imgBoss, { x: halfX }, 700, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(_this.imgBoss, { x: -_this.imgBoss.width }, 200, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearAll(_this.imgBoss);
                        _this.stop();
                    }), 800);
                }));
                if (this.lblWord.text != "") {
                    this.lblWord.x = game.Define.DeviceH;
                    Laya.Tween.to(this.lblWord, { x: halfX }, 700, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(_this.lblWord, { x: -_this.lblWord.width }, 200, null, Laya.Handler.create(_this, function () {
                            Laya.Tween.clearAll(_this.lblWord);
                        }), 800);
                    }));
                }
                var time1 = 600, time2 = 600;
                this.lineMove(this.imgLine1, game.Define.DeviceH, -this.imgLine1.width, time1, time2, 100);
                this.lineMove(this.imgLine2, -this.imgLine2.width, game.Define.DeviceH, time1, time2, 200);
                this.lineMove(this.imgLine3, game.Define.DeviceH, -this.imgLine3.width, time1, time2, 300);
                this.lineMove(this.imgLine4, -this.imgLine4.width, game.Define.DeviceH, time1, time2, 400);
                this.lineMove(this.imgLine5, game.Define.DeviceH, -this.imgLine5.width, time1, time2, 500);
            };
            /**停止特效 */
            BossWarningEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return BossWarningEft;
        }(effect.BaseEffect));
        effect.BossWarningEft = BossWarningEft;
        /*
        * Boss来袭数据
        2020-01-10 andy
        */
        var BossWarningData = /** @class */ (function (_super) {
            __extends(BossWarningData, _super);
            function BossWarningData(bossSkin, line1Skin, line2Skin, word) {
                var _this = _super.call(this) || this;
                /**交叉线皮肤 垂直间距 默认20*/
                _this.linePadding = 20;
                /**Boss皮肤 Y坐标*/
                _this.bossY = 0;
                /**文字 Y坐标*/
                _this.wordY = 0;
                /**文字 宽*/
                _this.wordW = 0;
                /**文字 高*/
                _this.wordH = 0;
                /**文字 大小 默认30*/
                _this.wordSize = 30;
                /**文字 颜色 默认#ffffff*/
                _this.wordColor = "#ffffff";
                /**文字 描边 默认0*/
                _this.wordStroke = 0;
                /**文字 描边颜色 默认#ffffff*/
                _this.wordStrokeColor = "#ffffff";
                _this.bossSkin = bossSkin;
                _this.line1Skin = line1Skin;
                _this.line2Skin = line2Skin;
                _this.word = word;
                return _this;
            }
            return BossWarningData;
        }(effect.BaseEffectData));
        effect.BossWarningData = BossWarningData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 图片切换特效
        2019-09-24 andy
        */
        var ChangeImageEft = /** @class */ (function (_super) {
            __extends(ChangeImageEft, _super);
            function ChangeImageEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                /**图片列表*/
                _this.arrImg = null;
                /**图片数量*/
                _this.imgCount = 0;
                //
                _this.curIndex = 0;
                //
                _this.curImg = null;
                return _this;
            }
            /**执行一次 */
            ChangeImageEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            ChangeImageEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                var img = null;
                this.arrImg = [];
                //显示图片
                for (var _i = 0, _a = this.data.arrString; _i < _a.length; _i++) {
                    var skin = _a[_i];
                    img = new Laya.Image();
                    img.anchorX = img.anchorY = 0.5;
                    img.skin = skin;
                    this.addChild(img);
                    this.arrImg.push(img);
                }
                this.imgCount = this.data.arrString.length;
                //显示坐标
                this.x = game.Define.DeviceW >> 1;
                this.y = game.Define.DeviceH >> 1;
                if (this.data.changeTime <= 0)
                    this.data.changeTime = 1000;
            };
            /**窗体关闭 */
            ChangeImageEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.curImg);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            ChangeImageEft.prototype.play = function (parent) {
                var _this = this;
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                if (!this.isPlaying) {
                    return;
                }
                Laya.timer.loop(this.data.changeTime, this, function () {
                    _this.curIndex++;
                    if (_this.curIndex >= _this.imgCount) {
                        _this.curIndex = 0;
                    }
                    var img;
                    for (var i = 0; i < _this.imgCount; i++) {
                        img = _this.arrImg[i];
                        img.visible = i == _this.curIndex;
                        if (img.visible) {
                            _this.curImg = img;
                        }
                    }
                    _this.curImg.scaleX = _this.curImg.scaleY = 0.2;
                    Laya.Tween.to(_this.curImg, { scaleX: 1.2, scaleY: 1.2 }, 200, Laya.Ease.linearInOut, Laya.Handler.create(_this, function () {
                        Laya.Tween.to(_this.curImg, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.linearInOut, Laya.Handler.create(_this, function () {
                        }));
                    }));
                });
            };
            /**停止特效 */
            ChangeImageEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return ChangeImageEft;
        }(effect.BaseEffect));
        effect.ChangeImageEft = ChangeImageEft;
        /*
        * 喷泉数据
        2020-01-10 andy
        */
        var ChangeImageData = /** @class */ (function (_super) {
            __extends(ChangeImageData, _super);
            function ChangeImageData() {
                var _this = _super.call(this) || this;
                /**切换时间 单位毫秒,默认1000*/
                _this.changeTime = 1000;
                return _this;
            }
            return ChangeImageData;
        }(effect.BaseEffectData));
        effect.ChangeImageData = ChangeImageData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 喷泉特效
        2019-07-26 andy
        */
        var FountainEft = /** @class */ (function (_super) {
            __extends(FountainEft, _super);
            function FountainEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                _this.arrImg = [];
                return _this;
            }
            /**执行一次 */
            FountainEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            FountainEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                //单个皮肤，多种皮肤，直接使用arrString
                if (this.data.imgSkin) {
                    this.arrString = [];
                    this.arrString.push(this.data.imgSkin);
                }
            };
            /**窗体打开 */
            FountainEft.prototype.open = function () {
            };
            /**窗体关闭 */
            FountainEft.prototype.close = function () {
                _super.prototype.close.call(this);
                for (var _i = 0, _a = this.arrImg; _i < _a.length; _i++) {
                    var img = _a[_i];
                    Laya.Tween.clearAll(img);
                }
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            FountainEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                Laya.timer.loop(this.data.oneSendTime, this, this.launch);
            };
            FountainEft.prototype.launch = function () {
                var _this = this;
                var randIndex = MathUtil.randomRange(0, this.arrString.length - 1);
                var skin = this.arrString[randIndex];
                var img = this.getImg(skin);
                this.addChild(img);
                //设置初始值
                img.x = MathUtil.randomRange(0, this.data.minX >> 2);
                img.x = MathUtil.randomRange(0, 1) == 0 ? img.x : -img.x;
                img.y = 0;
                img.scaleX = img.scaleY = 0.8;
                img.alpha = 0.6;
                //设置随机值
                var randX = MathUtil.randomRange(this.data.minX, this.data.maxX);
                randX = MathUtil.randomRange(0, 1) == 0 ? randX : -randX;
                var randY = MathUtil.randomRange(this.data.minY, this.data.maxY);
                Laya.Tween.to(img, { y: randY, rotation: this.data.needRotation * 0.4, scaleX: 1, scaleY: 1, alpha: 1 }, this.data.oneShowTime * 0.3, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(img, { x: randX >> 1, y: randY + 50, rotation: _this.data.needRotation * 0.7 }, _this.data.oneShowTime * 0.4, Laya.Ease.cubicIn, Laya.Handler.create(_this, function () {
                        Laya.Tween.to(img, { x: randX, y: 0, rotation: _this.data.needRotation }, _this.data.oneShowTime * 0.3, Laya.Ease.cubicIn, Laya.Handler.create(_this, function () {
                            Laya.Tween.clearAll(img);
                            img.removeSelf();
                        }));
                    }));
                }));
            };
            FountainEft.prototype.getImg = function (skin) {
                var ret = null;
                for (var _i = 0, _a = this.arrImg; _i < _a.length; _i++) {
                    var img = _a[_i];
                    if (img && !img.parent) {
                        ret = img;
                        //console.log("缓存");
                        break;
                    }
                } //console.log("arrImg.length",this.arrImg.length);
                if (!ret) {
                    ret = new Laya.Image();
                    ret.anchorX = ret.anchorY = 0.5;
                    ret.skin = skin;
                    this.arrImg.push(ret);
                }
                return ret;
            };
            /**停止特效 */
            FountainEft.prototype.stop = function () {
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
                _super.prototype.stop.call(this);
            };
            return FountainEft;
        }(effect.BaseEffect));
        effect.FountainEft = FountainEft;
        /*
        * 喷泉数据
        2020-01-10 andy
        */
        var FountainData = /** @class */ (function (_super) {
            __extends(FountainData, _super);
            function FountainData(imgSkin) {
                var _this = _super.call(this) || this;
                /**发射的时间间隔 默认10毫秒*/
                _this.oneSendTime = 10;
                /**飞行的时间间隔 默认200毫秒*/
                _this.oneShowTime = 200;
                /**喷出最小X*/
                _this.minX = 0;
                /**喷出最大X*/
                _this.maxX = 0;
                /**喷出最小Y*/
                _this.minY = 0;
                /**喷出最大Y*/
                _this.maxY = 0;
                /**旋转度数*/
                _this.needRotation = 0;
                _this.imgSkin = imgSkin;
                _this.maxX = game.Define.DeviceW;
                _this.maxY = game.Define.DeviceH;
                return _this;
            }
            return FountainData;
        }(effect.BaseEffectData));
        effect.FountainData = FountainData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 引导点击特效
        2019-07-19 andy
        */
        var GuideClickEft = /** @class */ (function (_super) {
            __extends(GuideClickEft, _super);
            function GuideClickEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //圆形水纹
                _this.imgWater = null;
                //手指
                _this.imgHand = null;
                _this.imgWater = new Laya.Image();
                _this.imgWater.anchorX = _this.imgWater.anchorY = 0.5;
                _this.addChild(_this.imgWater);
                _this.imgHand = new Laya.Image();
                _this.addChild(_this.imgHand);
                return _this;
            }
            /**执行一次 */
            GuideClickEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            GuideClickEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                this.imgWater.alpha = this.data.waterAlphaStart;
                this.imgWater.graphics.clear();
                this.imgWater.graphics.drawCircle(0, 0, this.data.waterRadis, this.data.waterColor);
                this.imgHand.skin = this.data.handSkin;
                if (this.data.handCenter != 0) {
                    this.imgHand.anchorX = this.imgHand.anchorY = 0.5;
                }
            };
            /**窗体关闭 */
            GuideClickEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this.imgWater);
                Laya.Tween.clearAll(this.imgHand);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            GuideClickEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                this.big(this.imgWater, this.imgHand);
            };
            GuideClickEft.prototype.big = function (sp, hand) {
                var _this = this;
                if (!this.isPlaying) {
                    return;
                }
                Laya.Tween.to(hand, { scaleX: 0.5, scaleY: 0.5 }, 350, null, Laya.Handler.create(this, function () {
                    Laya.Tween.clearTween(hand);
                    Laya.Tween.to(hand, { scaleX: 1, scaleY: 1 }, 350, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearTween(hand);
                        _this.big(sp, hand);
                    }));
                }));
                Laya.timer.once(200, this, function () {
                    sp.scaleX = 1;
                    sp.scaleY = 1;
                    sp.alpha = _this.data.waterAlphaStart;
                    Laya.Tween.to(sp, { scaleX: _this.data.waterRadisRate, scaleY: _this.data.waterRadisRate, alpha: _this.data.waterAlphaEnd }, 300, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearTween(sp);
                    }));
                });
            };
            /**停止特效 */
            GuideClickEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return GuideClickEft;
        }(effect.BaseEffect));
        effect.GuideClickEft = GuideClickEft;
        /*
        * Boss来袭数据
        2020-01-10 andy
        */
        var GuideClickData = /** @class */ (function (_super) {
            __extends(GuideClickData, _super);
            function GuideClickData(handSkin) {
                var _this = _super.call(this) || this;
                /**手型皮肤*/
                _this.handSkin = "";
                /**手型是否剧中 默认0 不居中*/
                _this.handCenter = 0;
                /**水纹半径 */
                _this.waterRadis = 50;
                /**水纹半径放大比例*/
                _this.waterRadisRate = 2;
                /**水纹透明度开始值，默认1*/
                _this.waterAlphaStart = 1;
                /**水纹透明度结束值，默认0*/
                _this.waterAlphaEnd = 0;
                /**水纹颜色*/
                _this.waterColor = "#ffffff";
                _this.handSkin = handSkin;
                return _this;
            }
            return GuideClickData;
        }(effect.BaseEffectData));
        effect.GuideClickData = GuideClickData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 满屏金币掉落特效
        2019-12-19 andy
        */
        var OutGoldEft = /** @class */ (function (_super) {
            __extends(OutGoldEft, _super);
            function OutGoldEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //圆形水纹
                _this.arrGold = null;
                _this.arrGold = [];
                return _this;
            }
            /**执行一次 */
            OutGoldEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            OutGoldEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                for (var i = 0; i < this.data.count; i++) {
                    var img = new Laya.Image(this.data.imgSkin);
                    this.arrGold.push(img);
                    img.anchorX = img.anchorY = 0.5;
                    this.addChild(img);
                }
            };
            /**窗体关闭 */
            OutGoldEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this);
                Laya.Tween.clearAll(this);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            OutGoldEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                var _loop_1 = function (i) {
                    var img = this_1.arrGold[i];
                    img.visible = true;
                    img.scaleX = img.scaleY = MathUtil.randomRange(this_1.data.minScale, this_1.data.maxScale) / 100;
                    img.x = MathUtil.randomRange(this_1.data.minX, this_1.data.maxX);
                    img.y = MathUtil.randomRange(this_1.data.minY, this_1.data.maxY);
                    var toX = img.x + (Math.random() < 0.5 ? 1 : -1) * this_1.data.dropOffx;
                    Laya.Tween.to(img, { x: toX, y: this_1.data.dropY }, this_1.data.dropTime, Laya.Ease.backIn, Laya.Handler.create(this_1, function () {
                        img.visible = false;
                    }, [img]), i * 5);
                };
                var this_1 = this;
                for (var i = 0; i < this.data.count; i++) {
                    _loop_1(i);
                }
            };
            /**停止特效 */
            OutGoldEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return OutGoldEft;
        }(effect.BaseEffect));
        effect.OutGoldEft = OutGoldEft;
        /*
        * 喷金币数据
        2020-01-10 andy
        */
        var OutGoldData = /** @class */ (function (_super) {
            __extends(OutGoldData, _super);
            function OutGoldData(imgSkin, count) {
                var _this = _super.call(this) || this;
                /**金币皮肤*/
                _this.imgSkin = "";
                /**产生数量*/
                _this.count = 0;
                /**产生最小X*/
                _this.minX = 0;
                /**产生最大X*/
                _this.maxX = 0;
                /**产生最小Y*/
                _this.minY = 0;
                /**产生最大Y*/
                _this.maxY = 0;
                /**掉下X偏移*/
                _this.dropOffx = 0;
                /**掉下Y*/
                _this.dropY = 0;
                /**掉下时间 默认500毫秒*/
                _this.dropTime = 500;
                /**最小缩放 范围1-100*/
                _this.minScale = 50;
                /**最大缩放 范围1-100*/
                _this.maxScale = 100;
                _this.imgSkin = imgSkin;
                _this.count = count;
                _this.maxX = game.Define.DeviceW;
                _this.maxY = game.Define.DeviceH >> 1;
                _this.dropY = game.Define.DeviceH;
                return _this;
            }
            return OutGoldData;
        }(effect.BaseEffectData));
        effect.OutGoldData = OutGoldData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 喷出星星特效
        2020-08-11 andy
        */
        var OutStarEft = /** @class */ (function (_super) {
            __extends(OutStarEft, _super);
            function OutStarEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //星星数组
                _this.arrStar = null;
                _this.arrStar = [];
                return _this;
            }
            /**执行一次 */
            OutStarEft.prototype.init = function () {
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            OutStarEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                for (var i = 0; i < this.data.count; i++) {
                    var img = new Laya.Image(this.data.imgSkin);
                    this.arrStar.push(img);
                    img.anchorX = img.anchorY = 0.5;
                    this.addChild(img);
                }
            };
            /**窗体关闭 */
            OutStarEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this);
                Laya.Tween.clearAll(this);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            OutStarEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
                var halfX = game.Define.DeviceW >> 1;
                var radis = 0;
                var showCount = this.data.count;
                var _loop_1 = function (i) {
                    var img = this_1.arrStar[i];
                    img.visible = true;
                    img.scaleX = img.scaleY = this_1.data.minScale;
                    var radian = MathUtil.angleToRadian((360 / showCount) * i);
                    img.x = Math.cos(radian) * this_1.data.minRadis;
                    img.y = Math.sin(radian) * this_1.data.minRadis;
                    var toX = 0;
                    var toY = 0;
                    if (this_1.data.isRandRadis) {
                        var randRadis = MathUtil.randomRange(this_1.data.minRadis, this_1.data.maxRadis);
                        toX = Math.cos(radian) * randRadis;
                        toY = Math.cos(radian) * randRadis;
                    }
                    else {
                        toX = Math.cos(radian) * this_1.data.maxRadis;
                        toY = Math.sin(radian) * this_1.data.maxRadis;
                    }
                    Laya.Tween.to(img, { x: toX, y: toY, alpha: 0, rotation: this_1.data.rotation, scaleX: this_1.data.maxScale, scaleY: this_1.data.maxScale }, this_1.data.flyTime, Laya.Ease.backIn, Laya.Handler.create(this_1, function () {
                        img.visible = false;
                    }, [img]), i * 5);
                };
                var this_1 = this;
                for (var i = 0; i < showCount; i++) {
                    _loop_1(i);
                }
            };
            /**停止特效 */
            OutStarEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            return OutStarEft;
        }(effect.BaseEffect));
        effect.OutStarEft = OutStarEft;
        /*
        * 喷出星星数据
        2020-08-11 andy
        */
        var OutStarData = /** @class */ (function (_super) {
            __extends(OutStarData, _super);
            function OutStarData(imgSkin, count) {
                var _this = _super.call(this) || this;
                /**金币皮肤*/
                _this.imgSkin = "";
                /**产生数量 默认8个*/
                _this.count = 8;
                /**产生最小半径*/
                _this.minRadis = 0;
                /**产生最大半径 默认100*/
                _this.maxRadis = 100;
                /**是否随机半径*/
                _this.isRandRadis = false;
                /**旋转度数*/
                _this.rotation = 0;
                /**飞行时间 默认500毫秒*/
                _this.flyTime = 500;
                /**最小缩放 范围1*/
                _this.minScale = 1;
                /**最大缩放 范围1*/
                _this.maxScale = 1;
                _this.imgSkin = imgSkin;
                _this.count = count;
                return _this;
            }
            return OutStarData;
        }(effect.BaseEffectData));
        effect.OutStarData = OutStarData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var effect;
    (function (effect) {
        /*
        * 等待特效
        2020-05-21 andy
        */
        var WaitingEft = /** @class */ (function (_super) {
            __extends(WaitingEft, _super);
            function WaitingEft(isScene) {
                var _this = _super.call(this, isScene) || this;
                //旋转图片
                _this.arrImg = null;
                //缩放计时器
                _this.zoomTimer = 0;
                //图片数量
                _this.count = 0;
                _this.radis = 0;
                _this.angle = 0;
                _this.arrImg = [];
                return _this;
            }
            /**执行一次 */
            WaitingEft.prototype.init = function () {
                Laya.timer.loop(1, this, this.update);
            };
            /**
             * 设置数据
             * @param effectData BaseEffectData
             */
            WaitingEft.prototype.setData = function (effectData) {
                _super.prototype.setData.call(this, effectData);
                this.data = effectData;
                this.count = this.data.arrNumber.length >> 1;
                var radis = 0;
                var angle = 0;
                var arr;
                for (var i = 0; i < this.count; i++) {
                    radis = this.data.arrNumber[i * 2];
                    angle = this.data.arrNumber[i * 2 + 1];
                    var img = new Laya.Image(this.data.skin + (i % this.data.skinCount + 1) + ".png");
                    this.arrImg.push(img);
                    img.anchorX = img.anchorY = 0.5;
                    arr = this.getPosByAngle(radis, angle);
                    img.x = arr[0];
                    img.y = arr[1];
                    this.addChild(img);
                }
            };
            /**窗体关闭 */
            WaitingEft.prototype.close = function () {
                _super.prototype.close.call(this);
                Laya.Tween.clearAll(this);
                Laya.Tween.clearAll(this);
            };
            /**
             * 播放特效
             * @param parent 父节点，可传对象或者LayerName,默认为UI特效层
             */
            WaitingEft.prototype.play = function (parent) {
                if (parent === void 0) { parent = null; }
                _super.prototype.play.call(this, parent);
            };
            /**停止特效 */
            WaitingEft.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            WaitingEft.prototype.update = function () {
                var _this = this;
                if (this.isPlaying) {
                    if (this.isZoom) {
                    }
                    else {
                        this.zoomTimer++;
                        if (this.zoomTimer >= this.data.zoomTime) {
                            this.isZoom = true;
                            this.zoomTimer = 0;
                        }
                        var arr_1;
                        for (var i = 0; i < this.count; i++) {
                            arr_1 = this.addRotation(i, this.data.rotationSpeed);
                            var img = this.arrImg[i];
                            img.x = arr_1[0];
                            img.y = arr_1[1];
                            if (this.isZoom) {
                                Laya.Tween.to(img, { x: 0, y: 0, scaleX: 0.5, scaleY: 0.5 }, this.data.zoomSpeed, null, Laya.Handler.create(this, function (img) {
                                    var index = _this.arrImg.indexOf(img);
                                    arr_1 = _this.addRotation(index, 90);
                                    Laya.Tween.to(img, { x: arr_1[0], y: arr_1[1], scaleX: 1, scaleY: 1 }, _this.data.zoomSpeed, null, Laya.Handler.create(_this, function (index) {
                                        if (index + 1 == _this.count) {
                                            _this.isZoom = false;
                                        }
                                    }, [index]));
                                }, [img]), i * 5);
                            }
                        }
                    }
                }
            };
            WaitingEft.prototype.addRotation = function (index, rotation) {
                var radis = this.data.arrNumber[index * 2];
                var angle = this.data.arrNumber[index * 2 + 1];
                angle += rotation;
                this.data.arrNumber[index * 2 + 1] = angle;
                return this.getPosByAngle(radis, angle);
            };
            WaitingEft.prototype.getPosByAngle = function (radis, angle) {
                //计算弧度
                var radian = MathUtil.angleToRadian(angle);
                var x = Math.cos(radian) * radis;
                var y = Math.sin(radian) * radis;
                return [x, y];
            };
            return WaitingEft;
        }(effect.BaseEffect));
        effect.WaitingEft = WaitingEft;
        /*
        * 等待加载数据
        2020-05-21 andy
        */
        var WaitingData = /** @class */ (function (_super) {
            __extends(WaitingData, _super);
            function WaitingData(skin, skinCount, rotationSpeed, zoomSpeed, zoomTime) {
                if (skinCount === void 0) { skinCount = 1; }
                if (rotationSpeed === void 0) { rotationSpeed = 1; }
                if (zoomSpeed === void 0) { zoomSpeed = 200; }
                if (zoomTime === void 0) { zoomTime = 1000; }
                var _this = _super.call(this) || this;
                /** 皮肤 */
                _this.skin = "";
                /** 皮肤数量 */
                _this.skinCount = 0;
                /**旋转速度 */
                _this.rotationSpeed = 0;
                /**缩放速度,单位毫秒，默认200 */
                _this.zoomSpeed = 0;
                /**缩放周期,单位毫秒，默认1000 */
                _this.zoomTime = 0;
                _this.skin = skin;
                _this.skinCount = skinCount;
                _this.rotationSpeed = rotationSpeed;
                _this.zoomSpeed = zoomSpeed;
                _this.zoomTime = zoomTime;
                return _this;
            }
            return WaitingData;
        }(effect.BaseEffectData));
        effect.WaitingData = WaitingData;
    })(effect = game.effect || (game.effect = {}));
})(game || (game = {}));

var game;
(function (game) {
    var platform;
    (function (platform_1) {
        /*
        * 2019-03-06 andy
        平台管理
        */
        var PlatformManager = /** @class */ (function () {
            function PlatformManager() {
                if (PlatformManager._ins != null)
                    throw new Error("PlatformManager is single!");
                PlatformManager._ins = this;
            }
            Object.defineProperty(PlatformManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new PlatformManager();
                    return this._ins;
                },
                enumerable: false,
                configurable: true
            });
            /**先初始化平台 */
            PlatformManager.prototype.init = function (data) {
                //初始化平台
                var platform;
                var isLocal = false;
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
                else if (Laya.Browser.window.tapjoy) {
                    PlatformManager.mraid = Laya.Browser.window.TJ_API;
                    platform = PlatformManager.tjPlatform = new platform_1.TapjoyPlatform();
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
            };
            Object.defineProperty(PlatformManager.prototype, "HttpConfig", {
                /**获取游戏配置 */
                get: function () {
                    return {}; //PlatformAPI.getConfig();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PlatformManager, "wx", {
                get: function () {
                    return Laya.Browser.window.wx;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PlatformManager, "window", {
                get: function () {
                    return Laya.Browser.window;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PlatformManager, "fileSysMgr", {
                get: function () {
                    if (!this.wx)
                        return null;
                    return this.wx.getFileSystemManager();
                },
                enumerable: false,
                configurable: true
            });
            /**
             * 平台动作，暂时只有MTG调用
             * @param pa PlatformAction
             * @param para 参数
             */
            PlatformManager.prototype.actionCallBack = function (action, para) {
                if (para === void 0) { para = null; }
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
                    var NUC = Laya.Browser.window.NUC;
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
                else if (game.Global.platformId == PlatformID.Tj) {
                    switch (action) {
                        case PlatformAction.DownLoad:
                            break;
                        case PlatformAction.GameStart:
                            if (PlatformManager.mraid && PlatformManager.mraid.setPlayableAPI) {
                                PlatformManager.mraid.setPlayableAPI({ skipAd: function () { } });
                                console.log("调用 window.TJ_API.setPlayableAPI");
                            }
                            else {
                                TipManager.ins.showWord("Tapjoy does not support window.TJ_API.setPlayableAPI!");
                            }
                            break;
                        case PlatformAction.GameReady:
                            break;
                        case PlatformAction.GameEnd:
                            if (PlatformManager.mraid && PlatformManager.mraid.objectiveComplete) {
                                PlatformManager.mraid.objectiveComplete();
                                console.log("调用 window.TJ_API.objectiveComplete");
                            }
                            else {
                                TipManager.ins.showWord("Tapjoy does not support window.TJ_API.objectiveComplete!");
                            }
                            if (PlatformManager.mraid && PlatformManager.mraid.gameplayFinished) {
                                PlatformManager.mraid.gameplayFinished();
                                console.log("调用 window.TJ_API.gameplayFinished");
                            }
                            else {
                                TipManager.ins.showWord("Tapjoy does not support window.TJ_API.gameplayFinished!");
                            }
                            break;
                        case PlatformAction.GameCustom:
                            break;
                    }
                }
                else {
                    //console.log("当前为本地测试 无用户行为追踪！");
                }
            };
            return PlatformManager;
        }());
        platform_1.PlatformManager = PlatformManager;
        var PlatformID;
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
            /**Tapjoy */
            PlatformID[PlatformID["Tj"] = 9] = "Tj";
            /**MTG */
            PlatformID[PlatformID["mtg"] = 10] = "mtg";
        })(PlatformID = platform_1.PlatformID || (platform_1.PlatformID = {}));
        var LangType;
        (function (LangType) {
            /**中文 */
            LangType[LangType["Zh"] = 0] = "Zh";
            /**英文 */
            LangType[LangType["En"] = 1] = "En";
        })(LangType = platform_1.LangType || (platform_1.LangType = {}));
        var PlatformAction;
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

var game;
(function (game) {
    var platform;
    (function (platform) {
        var EventManager = game.common.EventManager;
        var NoticeEvent = game.common.NoticeEvent;
        /*
        * name;
        */
        var LocalPlatform = /** @class */ (function () {
            function LocalPlatform() {
                this.window = platform.PlatformManager.window;
                this.fileSysMgr = platform.PlatformManager.fileSysMgr;
                game.Global.platformId = platform.PlatformID.None;
                game.Define.langId = platform.LangType.En;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                game.Define.isLocal = true;
                //2018-12-13 在进入游戏前，需要提前准备的东西
                EventManager.ins.init();
            }
            LocalPlatform.prototype.init = function (data) {
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
                //2020-02-21 andy 游戏结束
                EventManager.ins.on(NoticeEvent.GAME_OVER, this, function () {
                    platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameEnd);
                });
            };
            LocalPlatform.prototype.initSkinGame = function () {
                // if(Define.isDebug){
                //     Define.cdn = "../res/";
                // }else{
                //     Define.cdn = "res/";
                // }
            };
            LocalPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            LocalPlatform.prototype.loginSuccess = function () {
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            LocalPlatform.prototype.getUserInfo = function () {
                return this.userInfo;
            };
            LocalPlatform.prototype.initItem = function () {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.saveItem = function (ID, count, type) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.scoreUp = function (rank, score) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.share = function (func, queryKey) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.createBannerAd = function (posKey) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.showBannerAd = function (isShow) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.destroyBannerAd = function () {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.createVideoAd = function (posKey, success) {
                console.log("创建广告：" + posKey);
            };
            LocalPlatform.prototype.addMoreGameBtn = function (parent) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.createBrandSprite = function (parent, x, y) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.postMsg = function (postName, obj) {
                console.log("需要平台实现此功能 微信独有");
            };
            LocalPlatform.prototype.shake = function (isShort, delay) {
                console.log("需要平台实现此功能");
            };
            LocalPlatform.prototype.saveImageToPhotosAlbum = function (url) {
                console.log("保存图片接口没有实现");
            };
            LocalPlatform.prototype.setUserCloudStorage = function (key, value) {
                console.log("云端保存数据接口没有实现");
            };
            LocalPlatform.prototype.getLocalImage = function (type) {
                console.log("需要平台实现此功能");
            };
            /**获得焦点时，前台运行 */
            LocalPlatform.prototype.onShowCallBack = function (res) {
                console.log("小游戏获得焦点，进入前台运行");
                //SoundManager.ins.setOn(true);
            };
            /**失去焦点时，后台运行 */
            LocalPlatform.prototype.onHideCallBack = function () {
                console.log("小游戏失去焦点，进入后台运行");
                //SoundManager.ins.setOn(false);
                Laya.SoundManager.stopMusic();
            };
            return LocalPlatform;
        }());
        platform.LocalPlatform = LocalPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * AdColony
        2019-11-11 andy
        */
        var AdColonyPlatform = /** @class */ (function (_super) {
            __extends(AdColonyPlatform, _super);
            function AdColonyPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Ac;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            AdColonyPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SoundManager.ins.setOn(false);
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            AdColonyPlatform.prototype.initGameSkin = function () {
            };
            AdColonyPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            AdColonyPlatform.prototype.loginSuccess = function () {
                console.log("AdColony 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            AdColonyPlatform.prototype.getSwitchState = function () {
                return true;
            };
            AdColonyPlatform.prototype.initItem = function () {
            };
            AdColonyPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            AdColonyPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            AdColonyPlatform.prototype.firstUp = function () {
            };
            return AdColonyPlatform;
        }(platform.LocalPlatform));
        platform.AdColonyPlatform = AdColonyPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Applovin
        2019-05-01 andy
        */
        var ApplovinPlatform = /** @class */ (function (_super) {
            __extends(ApplovinPlatform, _super);
            function ApplovinPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Al;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            ApplovinPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            ApplovinPlatform.prototype.initGameSkin = function () {
            };
            ApplovinPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            ApplovinPlatform.prototype.loginSuccess = function () {
                console.log("Applovin 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            ApplovinPlatform.prototype.getSwitchState = function () {
                return true;
            };
            ApplovinPlatform.prototype.initItem = function () {
            };
            ApplovinPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            ApplovinPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            ApplovinPlatform.prototype.firstUp = function () {
            };
            return ApplovinPlatform;
        }(platform.LocalPlatform));
        platform.ApplovinPlatform = ApplovinPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * facebook
        2018-12-08 andy
        */
        var FaceBookPlatform = /** @class */ (function (_super) {
            __extends(FaceBookPlatform, _super);
            function FaceBookPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Fb;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            FaceBookPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            FaceBookPlatform.prototype.initGameSkin = function () {
            };
            FaceBookPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            FaceBookPlatform.prototype.loginSuccess = function () {
                console.log("FaceBook 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            FaceBookPlatform.prototype.getSwitchState = function () {
                return true;
            };
            FaceBookPlatform.prototype.initItem = function () {
            };
            FaceBookPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            FaceBookPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            FaceBookPlatform.prototype.firstUp = function () {
            };
            return FaceBookPlatform;
        }(platform.LocalPlatform));
        platform.FaceBookPlatform = FaceBookPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Google
        2019-06-24 andy
        */
        var GooglePlatform = /** @class */ (function (_super) {
            __extends(GooglePlatform, _super);
            function GooglePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Gg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            GooglePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            GooglePlatform.prototype.initGameSkin = function () {
            };
            GooglePlatform.prototype.login = function () {
                this.loginSuccess();
            };
            GooglePlatform.prototype.loginSuccess = function () {
                console.log("Google 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            GooglePlatform.prototype.getSwitchState = function () {
                return true;
            };
            GooglePlatform.prototype.initItem = function () {
            };
            GooglePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            GooglePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            GooglePlatform.prototype.firstUp = function () {
            };
            return GooglePlatform;
        }(platform.LocalPlatform));
        platform.GooglePlatform = GooglePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * IronSource 以色列投放广告平台
        2019-05-01 andy
        */
        var IronSourcePlatform = /** @class */ (function (_super) {
            __extends(IronSourcePlatform, _super);
            function IronSourcePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Is;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            IronSourcePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            IronSourcePlatform.prototype.initGameSkin = function () {
            };
            IronSourcePlatform.prototype.login = function () {
                this.loginSuccess();
            };
            IronSourcePlatform.prototype.loginSuccess = function () {
                console.log("IronSource 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            IronSourcePlatform.prototype.getSwitchState = function () {
                return true;
            };
            IronSourcePlatform.prototype.initItem = function () {
            };
            IronSourcePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            IronSourcePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            IronSourcePlatform.prototype.firstUp = function () {
            };
            return IronSourcePlatform;
        }(platform.LocalPlatform));
        platform.IronSourcePlatform = IronSourcePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * MTG 国内平台 https://www.mintegral.com
        2019-05-16 andy
        */
        var MTGPlatform = /** @class */ (function (_super) {
            __extends(MTGPlatform, _super);
            function MTGPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.mtg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            MTGPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                Laya.Browser.window.gameStart = function () { platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart); };
            };
            MTGPlatform.prototype.initGameSkin = function () {
            };
            MTGPlatform.prototype.login = function () {
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameReady);
                this.loginSuccess();
            };
            MTGPlatform.prototype.loginSuccess = function () {
                console.log("MTG 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            MTGPlatform.prototype.getSwitchState = function () {
                return true;
            };
            MTGPlatform.prototype.initItem = function () {
            };
            MTGPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            MTGPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            MTGPlatform.prototype.firstUp = function () {
            };
            return MTGPlatform;
        }(platform.LocalPlatform));
        platform.MTGPlatform = MTGPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Tapjoy
        2020-02-21 andy
        */
        var TapjoyPlatform = /** @class */ (function (_super) {
            __extends(TapjoyPlatform, _super);
            function TapjoyPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Tj;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            TapjoyPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                platform.PlatformManager.ins.actionCallBack(platform.PlatformAction.GameStart);
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            TapjoyPlatform.prototype.initGameSkin = function () {
            };
            TapjoyPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            TapjoyPlatform.prototype.loginSuccess = function () {
                console.log("Tapjoy 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            TapjoyPlatform.prototype.getSwitchState = function () {
                return true;
            };
            TapjoyPlatform.prototype.initItem = function () {
            };
            TapjoyPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            TapjoyPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
            };
            return TapjoyPlatform;
        }(platform.LocalPlatform));
        platform.TapjoyPlatform = TapjoyPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Unity
        2019-06-13 andy
        */
        var UnityPlatform = /** @class */ (function (_super) {
            __extends(UnityPlatform, _super);
            function UnityPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Ut;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            UnityPlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            UnityPlatform.prototype.initGameSkin = function () {
            };
            UnityPlatform.prototype.login = function () {
                this.loginSuccess();
            };
            UnityPlatform.prototype.loginSuccess = function () {
                console.log("Unity 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            UnityPlatform.prototype.getSwitchState = function () {
                return true;
            };
            UnityPlatform.prototype.initItem = function () {
            };
            UnityPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            UnityPlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            UnityPlatform.prototype.firstUp = function () {
            };
            return UnityPlatform;
        }(platform.LocalPlatform));
        platform.UnityPlatform = UnityPlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var platform;
    (function (platform) {
        /*
        * Vungle
        2019-10-23 andy
        */
        var VunglePlatform = /** @class */ (function (_super) {
            __extends(VunglePlatform, _super);
            function VunglePlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Vg;
                game.Define.langId = platform.LangType.En;
                game.Define.isLocal = true;
                game.Define.serverHttp = "http://192.168.2.104:3000/";
                return _this;
            }
            VunglePlatform.prototype.init = function () {
                _super.prototype.init.call(this, {});
                this.initGameSkin();
                //SceneManager.ins.sacleModeH= Laya.Stage.SCALE_FIXED_WIDTH;
                EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
            };
            VunglePlatform.prototype.initGameSkin = function () {
            };
            VunglePlatform.prototype.login = function () {
                this.loginSuccess();
            };
            VunglePlatform.prototype.loginSuccess = function () {
                console.log("Vungle 登录成功！");
                EventManager.ins.event(NoticeEvent.PLATFORM_LOGIN_SUCCESS);
            };
            /**
             * 获取过审状态
             */
            VunglePlatform.prototype.getSwitchState = function () {
                return true;
            };
            VunglePlatform.prototype.initItem = function () {
            };
            VunglePlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            VunglePlatform.prototype.scoreUp = function (rank, score) {
                _super.prototype.scoreUp.call(this, rank, score);
                if (rank == 1) {
                    Laya.timer.once(200, this, this.firstUp);
                }
            };
            VunglePlatform.prototype.firstUp = function () {
            };
            return VunglePlatform;
        }(platform.LocalPlatform));
        platform.VunglePlatform = VunglePlatform;
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        var WxPlatform = /** @class */ (function (_super) {
            __extends(WxPlatform, _super);
            function WxPlatform() {
                var _this = _super.call(this) || this;
                game.Global.platformId = platform.PlatformID.Wx;
                game.Define.langId = platform.LangType.Zh;
                game.Define.isLocal = false;
                game.Define.serverHttp = "http://192.168.2.104:3000/"; //
                //Define.CDN = "https://cdn.h5haowan.top/paoku3d/res"+Define.gameVersion+"/";
                _this.wx = Laya.Browser.window.wx;
                return _this;
            }
            WxPlatform.prototype.init = function (data) {
                var _this = this;
                _super.prototype.init.call(this, data);
                //初始化微信相关
                this.initSysInfo();
                var th = this;
                this.wx.onShow(function (res) {
                    _this.onShowCallBack(res);
                });
                this.wx.onHide(function () {
                    _this.onHideCallBack();
                });
                //显示转发按钮
                this.wx.showShareMenu({
                    withShareTicket: true,
                    success: function (e) {
                        //e.showShareMenuCallBack();
                        console.log("wx.showShareMenu成功");
                    },
                    fail: function (e) {
                        console.log("wx.showShareMenu失敗");
                    }
                });
                //是否授权
                this.wx.getSetting({
                    success: function (res) {
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
                                success: function (res) {
                                    if (res.confirm) {
                                        th.wx.openSetting({
                                            success: function (res) {
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
                                success: function () {
                                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                                    th.getWxUserInfo();
                                },
                                fail: function () {
                                    th.getWxUserInfo();
                                }
                            });
                        }
                    }
                });
                // Laya.MiniAdpter.remove(Define.cdn+"atlas/game.bin");
                this.initSkinGame();
            };
            WxPlatform.prototype.getWxUserInfo = function () {
                var _this = this;
                var th = this;
                //2018-12-19 andy 点击主界面右上角分享
                this.wx.onShareAppMessage(function () {
                    var data = _this.getRandomShareFunc ? _this.getRandomShareFunc.run() : { title: "分享测试", imageUrl: "" };
                    var query = "openid=" + game.Global.openId + "&uid=" + game.Global.UID;
                    console.log("wx.onShareAppMessage openId=" + game.Global.openId + " uid=" + game.Global.UID);
                    return {
                        title: data.title,
                        imageUrl: data.imageUrl,
                        query: query,
                        success: function (res) {
                            game.Global.shareTicket = res.shareTickets;
                            console.log("wx.onShareAppMessage success!shareTicket=" + game.Global.openId);
                        }
                    };
                });
                this.wx.getUserInfo({
                    success: function (res) {
                        th.userInfo = res.userInfo;
                        EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                    },
                    fail: function () {
                        //测试版本和开发版本取不到此信息
                        EventManager.ins.event(NoticeEvent.PLATFORM_INIT_OVER);
                    }
                });
            };
            /**换皮游戏时，需要设置 */
            WxPlatform.prototype.initSkinGame = function () {
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
            };
            WxPlatform.prototype.login = function () {
                var ths = this;
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
            };
            WxPlatform.prototype.loginSuccess = function () {
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
            };
            WxPlatform.prototype.initItem = function () {
            };
            WxPlatform.prototype.saveItem = function (ID, count, type) {
                //HttpManager.ins.updateItem(ID,count,type);
            };
            WxPlatform.prototype.share = function (func, queryKey) {
                var _this = this;
                this.shareAppSuccess = func;
                var data = this.getRandomShareFunc ? this.getRandomShareFunc.run() : { title: "分享一个好玩的游戏", imageUrl: "res/atlas/not/share.jpg" };
                var query = "openid=" + game.Global.openId + "&uid=" + game.Global.UID;
                if (queryKey != null) {
                    query += "&" + queryKey;
                }
                this.wx.updateShareMenu({
                    //withShareTicket:true,
                    success: function (e) {
                        _this.wx.shareAppMessage({
                            title: data.title,
                            imageUrl: data.imageUrl,
                            query: query,
                            success: function (res) {
                                //console.log("shareAppMessage成功！res="+res);
                            }
                        });
                        console.log("分享标题：" + data.title + " 分享内容图片：" + data.imageUrl + " query=" + query);
                    },
                });
            };
            WxPlatform.prototype.createBannerAd = function (adName) {
                var _this = this;
                if (this.bannerAd) {
                    this.bannerAd.destroy();
                }
                var ad = this.getAdDataFunc ? this.getAdDataFunc.runWith(adName) : null;
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
                this.bannerAd.onError(function (err) {
                    console.log(err);
                });
                this.bannerAd.onLoad(function () {
                    console.log('banner 广告加载成功');
                });
                this.bannerAd.onResize(function (res) {
                    var width = res.width, height = res.height;
                    _this.bannerAd.style.top = window.innerHeight - height;
                    //this.bannerAd.style.width = 400;
                });
                this.showBannerAd(true);
            };
            WxPlatform.prototype.showBannerAd = function (isShow) {
                if (!this.bannerAd) {
                    return;
                }
                if (isShow) {
                    this.bannerAd.show();
                }
                else {
                    this.bannerAd.hide();
                }
            };
            WxPlatform.prototype.destroyBannerAd = function () {
                if (this.bannerAd) {
                    this.bannerAd.offError();
                    this.bannerAd.offLoad();
                    this.bannerAd.offResize();
                    this.bannerAd.destroy();
                    this.bannerAd = null;
                }
            };
            WxPlatform.prototype.createVideoAd = function (adName, callBack) {
                var _this = this;
                var ad = this.getAdVideoDataFunc ? this.getAdVideoDataFunc.runWith(adName) : null;
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
                this.videoAd.onClose(function (res) {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        callBack && callBack.run();
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        _this.wx.showModal({
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
                    .then(function () {
                    _this.wx.hideLoading();
                    return _this.videoAd.show();
                }).catch(function (err) {
                    console.log(err);
                    _this.wx.hideLoading();
                    _this.wx.showModal({
                        title: "提示",
                        content: "视频加载失败, 请稍后再试"
                    });
                });
            };
            WxPlatform.prototype.shake = function (isShort, delay) {
                console.log("调用微信手机震动");
                if (isShort) {
                    this.wx.vibrateShort(delay);
                }
                else {
                    this.wx.vibrateLong(delay);
                }
            };
            WxPlatform.prototype.saveImageToPhotosAlbum = function (filePath) {
                var file = Laya.MiniAdpter.getFileInfo(Laya.URL.basePath + filePath);
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
            };
            WxPlatform.prototype.getLocalImage = function (type) {
                var _this = this;
                var that = this;
                this.wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: function (res) {
                        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来 
                        //app.startOperating("保存中") 
                        var filePath = res.tempFilePaths[0];
                        var session_key = _this.wx.getStorageSync('session_key');
                        //获取base64
                        var base64 = _this.wx.getFileSystemManager().readFileSync(filePath, "base64");
                        var data = {};
                        data["image"] = base64;
                        var url = "";
                        var access_token = "24.3fa0c0561fbfacf7b51cdca51328247e.2592000.1554966363.282335-15738709";
                        if (type == 0) {
                            url = "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=" + access_token;
                            data["id_card_side"] = "front";
                        }
                        else if (type == 1) {
                            url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + access_token;
                        }
                        _this.wx.request({
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
            };
            WxPlatform.prototype.setUserCloudStorage = function (key, value) {
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
            };
            /** 主域调用*/
            WxPlatform.prototype.postMsg = function (cmd, data) {
                var openDataContext = this.wx.getOpenDataContext();
                openDataContext.postMessage({ cmd: cmd, data: data });
            };
            WxPlatform.prototype.onShowCallBack = function (res) {
                _super.prototype.onShowCallBack.call(this, res);
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
            };
            WxPlatform.prototype.onHideCallBack = function () {
                _super.prototype.onHideCallBack.call(this);
            };
            WxPlatform.prototype.initSysInfo = function () {
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
            };
            WxPlatform.prototype.showModal = function (title, content, isCancel) {
                this.wx.showModal({
                    title: title,
                    content: content,
                    showCancel: isCancel
                });
            };
            WxPlatform.prototype.removeUserCloudStorage = function (key) {
                this.wx.removeUserCloudStorage({
                    KVDataList: [key],
                    success: function () {
                        console.log("托管数据" + key + "删除成功");
                    },
                    fail: function () {
                        console.log("托管数据" + key + "删除失败");
                    }
                });
            };
            return WxPlatform;
        }(platform.LocalPlatform));
        platform.WxPlatform = WxPlatform;
        var WeChatCall;
        (function (WeChatCall) {
            WeChatCall[WeChatCall["FAIL"] = 0] = "FAIL";
            WeChatCall[WeChatCall["SUCCESS"] = 1] = "SUCCESS";
            WeChatCall[WeChatCall["NO_MINI"] = 2] = "NO_MINI";
        })(WeChatCall || (WeChatCall = {}));
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            var BaseDisplay = game.display.BaseDisplay;
            /**
             * 2019-04-21 andy
             * 骨骼基类
             */
            var BaseBone = /** @class */ (function (_super) {
                __extends(BaseBone, _super);
                /**
                 * 构造
                 * @param type       骨骼名字
                 * @param cacheType  模板类型
                 */
                function BaseBone(type, cacheType) {
                    if (cacheType === void 0) { cacheType = 0; }
                    var _this = _super.call(this) || this;
                    /**唯一标识ID */
                    _this._objId = 0;
                    /**缓存类型 */
                    _this.cacheType = 0;
                    /**骨骼类型  */
                    _this.kingType = "boy";
                    /**是否循环播放 */
                    _this.isLoop = false;
                    /**显示层级 */
                    _this.layerName = null;
                    /**骨骼动画索引 */
                    _this._randIndex = 0;
                    /**骨骼动画名字 */
                    _this._randName = "";
                    /**皮肤资源是否加载 */
                    _this.isLoad = false;
                    _this._objId = king.BoneManager.ins.boneIndex++;
                    _this.kingType = type;
                    _this.cacheType = cacheType;
                    return _this;
                }
                Object.defineProperty(BaseBone.prototype, "objId", {
                    /**
                     * 唯一标识ID
                     */
                    get: function () {
                        return this._objId;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 执行一次
                 */
                BaseBone.prototype.init = function () {
                };
                BaseBone.prototype.onAdd = function () {
                    king.BoneManager.ins.addBone(this);
                    EventManager.ins.on(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
                    if (this.isLoad) {
                        this.playByNameOrIndex();
                    }
                    else {
                    }
                };
                BaseBone.prototype.onRemove = function () {
                    king.BoneManager.ins.dicBone.remove(this.objId);
                    king.BoneManager.ins.removeBone(this);
                    EventManager.ins.off(NoticeEvent.BONE_TEMP_LOAD_FINISH, this, this.BONE_TEMP_LOAD_FINISH);
                };
                BaseBone.prototype.BONE_TEMP_LOAD_FINISH = function (evt) {
                    if (evt.data == this.kingType && !this._sk) {
                        this.setSkin(this.kingType, this.cacheType);
                    }
                };
                /**
                 * 设置sk
                 * @param boneName 模板名字
                 * @param cacheType 缓存类型
                 */
                BaseBone.prototype.setSkin = function (boneName, cacheType) {
                    if (cacheType === void 0) { cacheType = 0; }
                    var temp = king.BoneManager.ins.getTemp(boneName);
                    if (!temp) {
                        return;
                    }
                    var sk = temp.buildArmature(cacheType);
                    if (sk) {
                        this._sk = sk;
                        this._sk.on(Laya.Event.STOPPED, this, this.onStop);
                        this._sk.on(Laya.Event.COMPLETE, this, this.onComplete);
                        this.addChild(this._sk);
                        this.isLoad = true;
                    }
                    this.playByNameOrIndex();
                };
                BaseBone.prototype.playByNameOrIndex = function () {
                    if (this._randName == "") {
                        if (this._randIndex >= this._sk.getAnimNum()) {
                            this._randIndex = 0;
                        }
                        this._sk.play(this._randIndex++, this.isLoop);
                    }
                    else {
                    }
                };
                /**
                 * 播放序列帧动画
                 * @param isLoop 是否循环，默认false
                 * @param parent 父节点，可传对象或者LayerName,默认LayerName.scene_king
                 */
                BaseBone.prototype.play = function (isLoop, parent) {
                    if (isLoop === void 0) { isLoop = false; }
                    if (parent === void 0) { parent = null; }
                    this.isLoop = isLoop;
                    this._randName = "";
                    if (this.isDisplay) {
                    }
                    else {
                        if (parent instanceof Laya.Sprite) {
                            parent.addChild(this);
                        }
                        else {
                            scene.LayerManager.ins.addChild(this, parent ? parent : scene.LayerName.scene_king);
                        }
                    }
                };
                /**
                 * 停止播放
                 */
                BaseBone.prototype.stop = function () {
                    if (this._sk) {
                        this._sk.stop();
                    }
                    this.removeSelf();
                    king.BoneManager.ins.removeBone(this);
                };
                /**
                 * 设置动作类型
                 * @param at 动作类型
                 */
                BaseBone.prototype.setActionType = function (at) {
                    this.curActionType = at;
                    if (this._sk) {
                        if (at < this._sk.getAnimNum()) {
                            this._sk.play(at, true);
                        }
                    }
                };
                /**
                 * 设置动作状态
                 * @param as 动作状态
                 */
                BaseBone.prototype.setActionState = function (as) {
                    this.curActionState = as;
                };
                /**
                 * 播放暂停事件
                 * @param ev
                 */
                BaseBone.prototype.onStop = function (ev) {
                    console.log("Bone onStop " + ev);
                    // if(this.callBack){
                    // 	this.callBack.run();
                    // }
                };
                /**
                 * 播放完成事件
                 * @param ev
                 */
                BaseBone.prototype.onComplete = function (ev) {
                    console.log("Bone onComplete " + ev);
                    if (!this.isLoop) {
                    }
                    if (this.callBack) {
                        this.callBack.run();
                    }
                };
                return BaseBone;
            }(BaseDisplay));
            king.BaseBone = BaseBone;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            var BaseAnimation = game.display.BaseAnimation;
            /**
             * 生物基类
             */
            var BaseKing = /** @class */ (function (_super) {
                __extends(BaseKing, _super);
                function BaseKing() {
                    var _this = _super.call(this) || this;
                    /**生物全局唯一标识ID */
                    _this.objId = 0;
                    /**生物CLASS名字 */
                    _this.clsName = "";
                    /**皮肤资源是否加载 */
                    _this.isLoad = false;
                    _this.dicAction = new Dictionary();
                    _this.spFoot = new Laya.Sprite();
                    _this.addChild(_this.spFoot);
                    _this.spBody = new Laya.Sprite();
                    _this.addChild(_this.spBody);
                    _this.spBody.addChild(_this.anim);
                    _this.spHead = new Laya.Sprite();
                    _this.addChild(_this.spHead);
                    _this.spEft = new Laya.Sprite();
                    _this.addChild(_this.spEft);
                    return _this;
                }
                /**
                 * 需在子类设置
                 */
                BaseKing.prototype.init = function () { };
                /**
                 * 设置皮肤
                 * @param skinData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                BaseKing.prototype.setSkin = function (skinData, isAdd) {
                    if (isAdd === void 0) { isAdd = true; }
                    this.isLoad = false;
                    if (skinData) {
                        this.skinData = skinData;
                    }
                    else {
                        console.log("this.skinData is null!");
                    }
                    //Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
                    if (this.skinData.arrAction && this.skinData.arrAction.length > 0) {
                        //创建零散动画【适合小游戏】
                        var action = void 0;
                        this.dicAction = new Dictionary();
                        for (var i = 0; i < this.skinData.arrAction.length; i++) {
                            action = this.skinData.arrAction[i];
                            this.dicAction.add(action.actionName, action);
                            Laya.Animation.createFrames(this.aniUrls(action.actionName, action.frameCount), this.skinData.kingType + "_" + action.actionName);
                        }
                    }
                    else {
                        //创建动画模板
                        for (var i = 0; i < this.skinData.cutRow; i++) {
                            Laya.Animation.createFrames(this.aniUrls(i.toString(), this.skinData.cutCol), this.skinData.kingType + "_" + i);
                        }
                    }
                    this.isLoad = true;
                    this.setActionType(this.curActionType);
                    if (isAdd) {
                        king.KingManager.ins.addKing(this);
                    }
                    //}));
                };
                /**
                 * 注册此次动作播放完成后，下一个动作
                 * @param atcionType
                 * @param action
                 */
                BaseKing.prototype.regNextAction = function (atcionType, actionNaxtType) {
                    if (!this.arrNextAction) {
                        this.arrNextAction = [];
                    }
                    this.arrNextAction[atcionType] = actionNaxtType;
                };
                /**
                 * 设置动作类型
                 * @param at 动作类型
                 * @param isLoop 是否循环,默认true
                 */
                BaseKing.prototype.setActionType = function (at, isLoop) {
                    if (isLoop === void 0) { isLoop = true; }
                    if (at == undefined || at < 0 || this.curActionState == ActionState.DEAD) {
                        return;
                    }
                    var actionName = this.skinData.kingType + "_" + at + "_" + this.curActionDirect;
                    if (Laya.Animation.framesMap[actionName] == null) {
                        console.log("请检查动作表：" + actionName + " 是否存在！");
                        //2020-03-19 andy 如果没有死亡动作,则标记为死亡状态
                        if (at == ActionType.DEAD || at == ActionType.DEADCRIT) {
                            this.curActionState = ActionState.DEAD;
                        }
                        return;
                    }
                    if (this.isLoad) {
                        this.visible = true;
                        //2019-12-03 切换动作时，动作宽高尺寸不一致，修改锚点,角色的中心点设置脚下中心
                        var action = this.dicAction.get(at + "_" + this.curActionDirect);
                        if (action) {
                            isLoop = action.isLoop;
                            this.spBody.width = action.width;
                            this.spBody.height = action.height;
                            this.spBody.pivot(action.pivotX, action.pivotY);
                            this.setInterval(action.frameRate);
                        }
                        this.anim.play(0, isLoop, actionName);
                        this.curActionType = at;
                        this.curActionState = this.getActionState(at);
                    }
                };
                /**
                 * 2019-12-09 为了节约资源，角色8方向美术只做5个方向即可
                 * @param at 动作类型 左右，左上右上，左下右下，对称即可
                 */
                BaseKing.prototype.setActionDirect = function (at) {
                    if (this.curDirect == at) {
                        return false;
                    }
                    var isDirect = true;
                    var tempAticonDirect = at;
                    switch (at) {
                        case ActionDirect.Left:
                        case ActionDirect.Right:
                            tempAticonDirect = ActionDirect.Right;
                            break;
                        case ActionDirect.Up:
                            break;
                        case ActionDirect.Down:
                            break;
                        case ActionDirect.Left_up:
                        case ActionDirect.Right_up:
                            tempAticonDirect = ActionDirect.Right_up;
                            break;
                        case ActionDirect.Left_down:
                        case ActionDirect.Right_down:
                            tempAticonDirect = ActionDirect.Right_down;
                            break;
                        default:
                            isDirect = false;
                            break;
                    }
                    //设置当前动作方向
                    if (isDirect) {
                        this.curDirect = at;
                        this.curActionDirect = tempAticonDirect;
                        if (at == ActionDirect.Left || at == ActionDirect.Left_up || at == ActionDirect.Left_down) {
                            this.spBody.skewY = 180;
                        }
                        else {
                            this.spBody.skewY = 0;
                        }
                    }
                    return true;
                };
                BaseKing.prototype.getActionState = function (at) {
                    var ret = null;
                    switch (at) {
                        case ActionType.Wait:
                            ret = ActionState.NONE;
                            break;
                        case ActionType.SHOW:
                            ret = ActionState.SHOW;
                            break;
                        case ActionType.WALK:
                        case ActionType.RUN:
                            ret = ActionState.MOVE;
                            break;
                        case ActionType.ATTACK:
                        case ActionType.ATTACK1:
                        case ActionType.ATTACK2:
                        case ActionType.ATTACK3:
                        case ActionType.ATTACK4:
                        case ActionType.ATTACK5:
                        case ActionType.ATTACK6:
                        case ActionType.ATTACK7:
                        case ActionType.ATTACK8:
                        case ActionType.ATTACK9:
                        case ActionType.ATTACK10:
                        case ActionType.SKILL1:
                        case ActionType.SKILL2:
                        case ActionType.SKILL3:
                        case ActionType.SKILL4:
                        case ActionType.SKILL5:
                        case ActionType.SKILL6:
                        case ActionType.SKILL7:
                        case ActionType.SKILL8:
                        case ActionType.SKILL9:
                        case ActionType.SKILL10:
                            ret = ActionState.ATTACK;
                            break;
                        case ActionType.ATTACKED:
                            ret = ActionState.ATTACKED;
                            break;
                        case ActionType.JUMP:
                        case ActionType.ROLL:
                        case ActionType.SHOW:
                            ret = ActionState.JUMP;
                            break;
                        case ActionType.DEAD:
                        case ActionType.DEADCRIT:
                            ret = ActionState.DEAD;
                            break;
                        default:
                            break;
                    }
                    return ret;
                };
                /**
                 * 设置动作状态
                 * @param as 动作状态
                 */
                BaseKing.prototype.setActionState = function (as) {
                    this.curActionState = as;
                };
                /**
                 * label事件 this.addLabel('AniPic1', 1);
                 * @param ev
                 */
                BaseKing.prototype.onLabel = function (ev) {
                    console.log("complte " + ev);
                };
                /**
                 * 播放暂停事件
                 * @param ev
                 */
                BaseKing.prototype.onStop = function (ev) {
                    console.log("onStop " + ev);
                    this.visible = false;
                    // if(this.callBack){
                    // 	this.callBack.run();
                    // }
                };
                /**
                 * 播放完成事件
                 * @param ev
                 */
                BaseKing.prototype.onComplete = function (ev) {
                    //console.log(`onComplete ` + ev+this.isPlaying);
                    if (this.anim.isPlaying) {
                        //循环播放
                    }
                    else {
                        var actionType = -1;
                        if (this.arrNextAction && this.curActionType < this.arrNextAction.length) {
                            actionType = this.arrNextAction[this.curActionType];
                        }
                        if (actionType > -1) {
                            this.setActionType(actionType);
                        }
                        else {
                            //this.visible=false;
                        }
                    }
                    // if(this.callBack){
                    // 	this.callBack.run();
                    // }
                };
                BaseKing.prototype.aniUrls = function (actionName, length) {
                    actionName = this.skinData.atlasName + "/" + this.skinData.kingType + "_" + actionName;
                    return BaseAnimation.aniUrls(actionName, length);
                };
                return BaseKing;
            }(BaseAnimation));
            king.BaseKing = BaseKing;
            /**
             * 动作数据
             */
            var Action = /** @class */ (function () {
                /**
                 *
                 * @param cfg  动作配置
                 * @param isLoop     动作是否循环,默认是true
                 */
                function Action(cfg, isLoop) {
                    if (isLoop === void 0) { isLoop = true; }
                    this.actionType = cfg.actionType;
                    this.actionDirect = cfg.actionDirect;
                    this._actionName = cfg.actionType + "_" + cfg.actionDirect;
                    this.frameCount = cfg.frameCount;
                    this.frameRate = cfg.frameRate <= 0 ? 50 : cfg.frameRate;
                    this.width = cfg.width;
                    this.height = cfg.height;
                    this.pivotX = cfg.offX;
                    this.pivotY = cfg.offY;
                    this.isLoop = isLoop;
                }
                Object.defineProperty(Action.prototype, "actionName", {
                    /**
                     * 动作名字，只读
                     */
                    get: function () {
                        return this._actionName;
                    },
                    enumerable: false,
                    configurable: true
                });
                return Action;
            }());
            king.Action = Action;
            /**
             * 皮肤数据
             */
            var SkinData = /** @class */ (function () {
                function SkinData(atlasName, kingType, arrAction, cutRow, cutCol) {
                    if (cutRow === void 0) { cutRow = 0; }
                    if (cutCol === void 0) { cutCol = 0; }
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
                return SkinData;
            }());
            king.SkinData = SkinData;
            /*
            * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
            */
            var ActionType;
            (function (ActionType) {
                /**0 待机 */
                ActionType[ActionType["Wait"] = 0] = "Wait";
                /**1 走 */
                ActionType[ActionType["WALK"] = 1] = "WALK";
                /**2 跑 */
                ActionType[ActionType["RUN"] = 2] = "RUN";
                /**3 跳跃 */
                ActionType[ActionType["JUMP"] = 3] = "JUMP";
                /**4 翻滚 */
                ActionType[ActionType["ROLL"] = 4] = "ROLL";
                /**5 出场*/
                ActionType[ActionType["SHOW"] = 5] = "SHOW";
                /**5 占位*/
                ActionType[ActionType["POS6"] = 6] = "POS6";
                /**5 占位*/
                ActionType[ActionType["POS7"] = 7] = "POS7";
                /**5 占位*/
                ActionType[ActionType["POS8"] = 8] = "POS8";
                /**5 占位*/
                ActionType[ActionType["POS9"] = 9] = "POS9";
                /**5 占位*/
                ActionType[ActionType["POS10"] = 10] = "POS10";
                /**11 攻击 */
                ActionType[ActionType["ATTACK"] = 11] = "ATTACK";
                /**12 被攻击 */
                ActionType[ActionType["ATTACKED"] = 12] = "ATTACKED";
                /**13 死亡 */
                ActionType[ActionType["DEAD"] = 13] = "DEAD";
                /**14 死亡暴击 */
                ActionType[ActionType["DEADCRIT"] = 14] = "DEADCRIT";
                /**15 占位 */
                ActionType[ActionType["POS15"] = 15] = "POS15";
                /**16 占位 */
                ActionType[ActionType["POS16"] = 16] = "POS16";
                /**17 占位 */
                ActionType[ActionType["POS17"] = 17] = "POS17";
                /**18 占位 */
                ActionType[ActionType["POS18"] = 18] = "POS18";
                /**19 占位 */
                ActionType[ActionType["POS19"] = 19] = "POS19";
                /**20 占位 */
                ActionType[ActionType["POS20"] = 20] = "POS20";
                /**21 攻击1 */
                ActionType[ActionType["ATTACK1"] = 21] = "ATTACK1";
                /**22 攻击2 */
                ActionType[ActionType["ATTACK2"] = 22] = "ATTACK2";
                /**23 攻击3 */
                ActionType[ActionType["ATTACK3"] = 23] = "ATTACK3";
                /**24 攻击4 */
                ActionType[ActionType["ATTACK4"] = 24] = "ATTACK4";
                /**25 攻击5 */
                ActionType[ActionType["ATTACK5"] = 25] = "ATTACK5";
                /**26 攻击6 */
                ActionType[ActionType["ATTACK6"] = 26] = "ATTACK6";
                /**27 攻击7 */
                ActionType[ActionType["ATTACK7"] = 27] = "ATTACK7";
                /**28 攻击8 */
                ActionType[ActionType["ATTACK8"] = 28] = "ATTACK8";
                /**29 攻击9 */
                ActionType[ActionType["ATTACK9"] = 29] = "ATTACK9";
                /**30 攻击10 */
                ActionType[ActionType["ATTACK10"] = 30] = "ATTACK10";
                /**31 技能1 */
                ActionType[ActionType["SKILL1"] = 31] = "SKILL1";
                /**32 技能2 */
                ActionType[ActionType["SKILL2"] = 32] = "SKILL2";
                /**33 技能3 */
                ActionType[ActionType["SKILL3"] = 33] = "SKILL3";
                /**34 技能4 */
                ActionType[ActionType["SKILL4"] = 34] = "SKILL4";
                /**35 技能5 */
                ActionType[ActionType["SKILL5"] = 35] = "SKILL5";
                /**36 技能6 */
                ActionType[ActionType["SKILL6"] = 36] = "SKILL6";
                /**37 技能7 */
                ActionType[ActionType["SKILL7"] = 37] = "SKILL7";
                /**38 技能8 */
                ActionType[ActionType["SKILL8"] = 38] = "SKILL8";
                /**39 技能9 */
                ActionType[ActionType["SKILL9"] = 39] = "SKILL9";
                /**40 技能10 */
                ActionType[ActionType["SKILL10"] = 40] = "SKILL10";
            })(ActionType = king.ActionType || (king.ActionType = {}));
            /*
            * 动作方向 钟表0点，顺时针方向
            */
            var ActionDirect;
            (function (ActionDirect) {
                /**0 无 */
                ActionDirect[ActionDirect["None"] = 0] = "None";
                /**1 上 */
                ActionDirect[ActionDirect["Up"] = 1] = "Up";
                /**2 右上 */
                ActionDirect[ActionDirect["Right_up"] = 2] = "Right_up";
                /**3 右 */
                ActionDirect[ActionDirect["Right"] = 3] = "Right";
                /**4 右下 */
                ActionDirect[ActionDirect["Right_down"] = 4] = "Right_down";
                /**5 下 */
                ActionDirect[ActionDirect["Down"] = 5] = "Down";
                /**6 左下 */
                ActionDirect[ActionDirect["Left_down"] = 6] = "Left_down";
                /**7 左 */
                ActionDirect[ActionDirect["Left"] = 7] = "Left";
                /**8 左上 */
                ActionDirect[ActionDirect["Left_up"] = 8] = "Left_up";
            })(ActionDirect = king.ActionDirect || (king.ActionDirect = {}));
            /*
           * 动作状态;
           */
            var ActionState;
            (function (ActionState) {
                /**待机状态 */
                ActionState[ActionState["NONE"] = 0] = "NONE";
                /**展示状态 */
                ActionState[ActionState["SHOW"] = 1] = "SHOW";
                /**移动状态 */
                ActionState[ActionState["MOVE"] = 2] = "MOVE";
                /**跳跃状态 */
                ActionState[ActionState["JUMP"] = 3] = "JUMP";
                /**攻击状态 */
                ActionState[ActionState["ATTACK"] = 4] = "ATTACK";
                /**被攻击状态 */
                ActionState[ActionState["ATTACKED"] = 5] = "ATTACKED";
                /**死亡状态 */
                ActionState[ActionState["DEAD"] = 6] = "DEAD";
            })(ActionState = king.ActionState || (king.ActionState = {}));
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king_1) {
            /*
            *  生物基类 2019-12-03 andy
            */
            var King = /** @class */ (function (_super) {
                __extends(King, _super);
                function King() {
                    var _this = _super.call(this) || this;
                    /**攻击距离 */
                    _this.atkDistance = 1;
                    /**是否触发暴击 */
                    _this.isAtkCri = false;
                    /**是否触发被暴击 */
                    _this.isAtkedCri = false;
                    /**物理攻击延时，主要针对第一次敌人攻击*/
                    _this.atkDelay = 0;
                    /**物理攻击第几个*/
                    _this.atkIndex = 0;
                    /**角色 攻击CD,默认1000毫秒*/
                    _this.atkCD = 1000;
                    /**角色 上次物理攻击时间 */
                    _this.lastAtkTime = 0;
                    /**受击半径,默认50*/
                    _this.atkedRadis = 50;
                    /**被攻击点X*/
                    _this.atkedX = 0;
                    /**被攻击点Y*/
                    _this.atkedY = 0;
                    /**角色 移动速度 */
                    _this.moveSpeed = 1;
                    /**角色 等级 */
                    _this.lvl = 1;
                    /**角色 生命 */
                    _this.hp = 1;
                    /**角色 生命上限 */
                    _this.hpMax = 100;
                    /**角色 魔法 */
                    _this.mp = 1;
                    /**角色 基础伤害*/
                    _this.atkBasic = 0;
                    /**角色 技能伤害*/
                    _this.atkSkill = 0;
                    /**角色 装备伤害*/
                    _this.atkEquip = 0;
                    /**角色 暴击伤害*/
                    _this.cri = 0;
                    /**角色 防御*/
                    _this.def = 1;
                    /**角色 命中率 最大值100,默认100*/
                    _this.hitRate = 100;
                    /**角色 暴击率 最大值10000,默认0*/
                    _this.criRate = 0;
                    /**角色 阵营 0.自己 1.敌人 默认1*/
                    _this.camp = 1;
                    /** 帧数*/
                    _this.curFrame = 0;
                    /** 当前固定点索引 */
                    _this.curFixedIndex = 0;
                    _this.hpBar = new Laya.ProgressBar();
                    _this.hpBar.anchorX = _this.hpBar.anchorY = 0.5;
                    _this.spHead.addChild(_this.hpBar);
                    _this.spDebug = new Laya.Sprite();
                    _this.addChild(_this.spDebug);
                    _this.startPoint = new Laya.Point();
                    _this.endPoint = new Laya.Point();
                    _this.arrAtkId = [];
                    _this.arrSkillId = [];
                    _this.dicCD = new Dictionary();
                    _this.arrFixedPoint = [];
                    return _this;
                    //this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
                }
                King.prototype.init = function () {
                    _super.prototype.init.call(this);
                };
                /**
                 * 设置皮肤
                 * @param skinData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                King.prototype.setSkin = function (skinData, isAdd) {
                    if (isAdd === void 0) { isAdd = true; }
                    _super.prototype.setSkin.call(this, skinData, isAdd);
                    var arrSkillConfig = SkillManager.ins.getKingCfg(this.skinData.kingType);
                    if (arrSkillConfig) {
                        //物理
                        var cfgAtk = null;
                        //技能
                        var cfgSkill = null;
                        this.arrAtkId = [];
                        for (var _i = 0, arrSkillConfig_1 = arrSkillConfig; _i < arrSkillConfig_1.length; _i++) {
                            var cfg = arrSkillConfig_1[_i];
                            if (!cfg)
                                continue;
                            if (cfg.skillType == 0) {
                                this.arrAtkId.push(cfg.skillId);
                                cfgAtk = cfg;
                            }
                            else {
                                this.arrSkillId.push(cfg.skillId);
                                //主角的不用赋值
                                if (this.camp == 1)
                                    cfgSkill = cfg;
                            }
                        }
                        //物理攻击没有的情况下，看下技能
                        if (!cfgAtk) {
                            cfgAtk = cfgSkill;
                        }
                        if (cfgAtk) {
                            this.atkSkill = cfgAtk.atk;
                            this.atkDistance = cfgAtk.atkDistance;
                            this.atkCD = cfgAtk.atkCD;
                        }
                    }
                };
                /** */
                King.prototype.update = function () {
                    if (this.curActionState != king_1.ActionState.DEAD) {
                        if (this.curActionState != king_1.ActionState.NONE) {
                            this.startPoint.setTo(this.x, this.y);
                        }
                        this.getNextPoint();
                    }
                    this.curFrame++;
                };
                /** 行走 */
                King.prototype.move = function () {
                    if (game.Define.gameType == game.GameType.over_look) { //俯视角度
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.endPoint.x, this.endPoint.y);
                        this.spBody.rotation = MathUtil.getFromAngle(angle);
                        var radian = MathUtil.angleToRadian(this.spBody.rotation);
                        this.x += Math.cos(radian) * this.moveSpeed;
                        this.y += Math.sin(radian) * this.moveSpeed;
                        if (!this.isMoveByDistance()) {
                            //2020-04-17 如果刚刚攻击过，正处于CD状态，此时再由行走切换到攻击，攻击状态设置无效，会一直走到目标点
                            this.curActionState = king_1.ActionState.ATTACK;
                            if (this.arrAtkId.length > 0) {
                                this.attack(this.atkTarget);
                            }
                            else if (this.arrSkillId.length > 0) {
                                this.playSkill(this.atkTarget, this.arrSkillId[0]);
                            }
                            else {
                            }
                        }
                    }
                    else if (game.Define.gameType == game.GameType.h_game) { //横板
                        this.x < this.atkTarget.x ? this.setActionDirect(king_1.ActionDirect.Right) : this.x > this.atkTarget.x ? this.setActionDirect(king_1.ActionDirect.Left) : null;
                        if (this.curDirect == king_1.ActionDirect.Left) {
                            if (this.x - this.moveSpeed - this.atkDistance > this.atkTarget.x) {
                                this.pos(this.x - this.moveSpeed, this.y);
                            }
                            else {
                                //this.curAticonState = ActionState.ATTACK;
                                this.attack(this.atkTarget);
                            }
                        }
                        else if (this.curDirect == king_1.ActionDirect.Right) {
                            if (this.x + this.moveSpeed + this.atkDistance < this.atkTarget.x) {
                                this.pos(this.x + this.moveSpeed, this.y);
                            }
                            else {
                                // this.curAticonState = ActionState.ATTACK;
                                this.attack(this.atkTarget);
                            }
                        }
                        else {
                            //console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.v_game) { //竖版
                        this.y < this.atkTarget.y ? this.setActionDirect(king_1.ActionDirect.Down) : this.y > this.atkTarget.y ? this.setActionDirect(king_1.ActionDirect.Up) : null;
                        if (this.curDirect == king_1.ActionDirect.Up) {
                            if (this.y - this.moveSpeed - this.atkDistance > this.atkTarget.y) {
                                this.pos(this.x, this.y - this.moveSpeed);
                            }
                            else {
                                //this.curAticonState = ActionState.ATTACK;
                                this.attack(this.atkTarget);
                            }
                        }
                        else if (this.curDirect == king_1.ActionDirect.Down) {
                            if (this.y + this.moveSpeed + this.atkDistance < this.atkTarget.y) {
                                this.pos(this.x, this.y + this.moveSpeed);
                            }
                            else {
                                //this.curAticonState = ActionState.ATTACK;
                                this.attack(this.atkTarget);
                            }
                        }
                        else {
                            //console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.rpg) { //RPG
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.endPoint.x, this.endPoint.y);
                        var realAngle = MathUtil.getFromAngle(angle);
                        var dir = MathUtil.getDirByRotate(realAngle);
                        if (this.setActionDirect(dir)) {
                            this.setActionType(this.curActionType);
                        }
                        var radian = MathUtil.angleToRadian(realAngle);
                        this.x += Math.cos(radian) * this.moveSpeed;
                        this.y += Math.sin(radian) * this.moveSpeed;
                        if (!this.isMoveByDistance()) {
                            //2020-04-17 如果刚刚攻击过，正处于CD状态，此时再由行走切换到攻击，攻击状态设置无效，会一直走到目标点
                            this.curActionState = king_1.ActionState.ATTACK;
                            if (this.arrAtkId.length > 0) {
                                this.attack(this.atkTarget);
                            }
                            else if (this.arrSkillId.length > 0) {
                                this.playSkill(this.atkTarget, this.arrSkillId[0]);
                            }
                            else {
                            }
                        }
                    }
                    else {
                    }
                };
                King.prototype.getNextPoint = function () {
                    var toX = 0, toY = 0;
                    if (this.arrFixedPoint && this.curFixedIndex < this.arrFixedPoint.length) {
                        toX = this.arrFixedPoint[this.curFixedIndex][0];
                        toY = this.arrFixedPoint[this.curFixedIndex][1];
                    }
                    else if (this.atkTarget) {
                        toX = this.atkTarget.x;
                        toY = this.atkTarget.y;
                    }
                    this.endPoint.setTo(toX, toY);
                    return this.endPoint;
                };
                /**是否需要移动,目标超出攻击距离则需要*/
                King.prototype.isMoveByDistance = function () {
                    var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                    if (this.arrFixedPoint && this.curFixedIndex < this.arrFixedPoint.length) {
                        if (distance <= this.moveSpeed) {
                            this.curFixedIndex++;
                        }
                        if (this.curFixedIndex == this.arrFixedPoint.length) {
                            return this.atkTarget ? true : false;
                        }
                        return true;
                    }
                    else if (this.atkTarget) {
                        return distance > this.atkDistance + this.moveSpeed;
                    }
                    else {
                        return false;
                    }
                };
                /**
                 * 计算行走方向
                 * @param fromX
                 * @param fromY
                 * @param toX
                 * @param toY
                 * @param isEightDir 是否八方向,默认true
                 */
                King.prototype.checkMoveDir = function (fromX, fromY, toX, toY, isEightDir) {
                    if (isEightDir === void 0) { isEightDir = true; }
                    var radian = Math.atan2(fromY - toY, fromX - toX);
                    var angle = MathUtil.radianToAngle(radian);
                    //从左到右 -135 -45  135 45
                    // console.log(this.name,fromX,fromY,toX,toY,angle);
                    if (isEightDir) {
                        return 0;
                    }
                    else {
                        return angle;
                    }
                };
                /**
                 * 物理攻击
                 * @param king 目标生物
                 */
                King.prototype.attack = function (king) {
                    if (king === void 0) { king = null; }
                    //2020-03-05 物理攻击间隔时间
                    return this.playSkill(king);
                };
                /**
                 * 释放技能
                 * @param target  目标生物
                 * @param skillId 技能ID,默认-1，随机物理技能
                 */
                King.prototype.playSkill = function (target, skillId) {
                    if (skillId === void 0) { skillId = -1; }
                    if (this.curActionState == king_1.ActionState.DEAD) {
                        return;
                    }
                    if (skillId == -1) {
                        skillId = this.getRandAtkIndex();
                    }
                    var skillConfig = SkillManager.ins.getCfg(skillId);
                    if (!skillConfig) {
                        console.warn("King.ts playSkill ：技能ID " + skillId + " 找不到配置！");
                        return false;
                    }
                    //物理攻击，公用一个CD,key是skill_0
                    var key = "skill_" + (skillConfig.skillType > 0 ? skillId : 0);
                    if (this.dicCD.hasKey(key)) {
                        this.lastAtkTime = this.dicCD.get(key);
                    }
                    else {
                        this.lastAtkTime = Laya.timer.currTimer - skillConfig.atkCD + this.atkDelay;
                        this.dicCD.add(key, Laya.timer.currTimer);
                    }
                    if (Laya.timer.currTimer - this.lastAtkTime >= skillConfig.atkCD) {
                        this.dicCD.add(key, Laya.timer.currTimer);
                        //生物展示动作
                        this.setActionType(skillConfig.actionType, false);
                        //上次物理攻击时间
                        this.lastAtkTime = Laya.timer.currTimer;
                        //是否出发暴击
                        var rate = MathUtil.randomRange(1, 10000);
                        if (this.criRate >= rate) {
                            this.isAtkCri = true;
                            if (target)
                                target.isAtkedCri = true;
                            if (this && this.eftAtkCri) {
                                this.eftAtkCri.playFrame(false, this);
                            }
                        }
                        else {
                            this.isAtkCri = false;
                            if (target)
                                target.isAtkedCri = false;
                            if (this && this.eftAtk) {
                                this.eftAtk.playFrame(false, this);
                            }
                        }
                        //播放技能特效
                        var skillData = new SkillData(skillConfig, this, target);
                        var skill_1 = SkillManager.ins.getSkill(skillData);
                        skill_1.play();
                        return true;
                    }
                    else {
                        //技能CD冷却中
                        return false;
                    }
                };
                /**
                 * 收到攻击
                 * @param king 攻击者
                 * @param skillId 技能ID,默认是0
                 * @param extraAtk 额外伤害,默认是0
                 */
                King.prototype.attacked = function (king, skillId, extraAtk) {
                    if (skillId === void 0) { skillId = 0; }
                    if (extraAtk === void 0) { extraAtk = 0; }
                    if (this.curActionState == king_1.ActionState.DEAD || (king && king.curActionState == king_1.ActionState.DEAD)) {
                        return;
                    }
                    if (this.isAtkedCri) {
                        if (this.eftAtkedCri) {
                            this.eftAtkedCri.playFrame(false, this);
                        }
                    }
                    else {
                        if (this.eftAtked) {
                            this.eftAtked.playFrame(false, this);
                        }
                    }
                };
                /**
                 * 设置生命
                 * @param hp
                 */
                King.prototype.setHp = function (hp) {
                    this.hp += hp;
                    this.hp = this.hp < 0 ? 0 : this.hp;
                    this.hpBar.value = this.hp / this.hpMax;
                    if (this.hp == 0 && this.curActionState != king_1.ActionState.DEAD) {
                        this.setActionType(this.isAtkedCri ? king_1.ActionType.DEADCRIT : king_1.ActionType.DEAD);
                        this.onDead();
                    }
                };
                Object.defineProperty(King.prototype, "atk", {
                    /**总攻击力 */
                    get: function () {
                        return this.atkBasic + this.atkEquip + this.atkSkill;
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 死亡时调用
                 */
                King.prototype.onDead = function () {
                    if (this.eftDead) {
                        this.eftDead.playFrame(false, this);
                    }
                };
                /**
                 * 死亡消失时调用
                 */
                King.prototype.onDeadDisappear = function () {
                    king_1.KingManager.ins.removeKing(this.objId);
                };
                /**得到随机物理攻击ID */
                King.prototype.getRandAtkIndex = function () {
                    //let randIndex:number= MathUtil.randomRange(0,this.arrAtkId.length-1);
                    if (this.atkIndex >= this.arrAtkId.length) {
                        this.atkIndex = 0;
                    }
                    return this.arrAtkId[this.atkIndex++];
                };
                /**发射特效旋转角度,俯视游戏方向角度为0,跟着生物旋转 */
                King.prototype.getAtkingEftRotation = function () {
                    //方向角度
                    var dirRotation = 0;
                    switch (this.curDirect) {
                        case king_1.ActionDirect.Up:
                            dirRotation = -90;
                            break;
                        case king_1.ActionDirect.Right_up:
                            dirRotation = -45;
                            break;
                        case king_1.ActionDirect.Right:
                            dirRotation = 0;
                            break;
                        case king_1.ActionDirect.Right_down:
                            dirRotation = 45;
                            break;
                        case king_1.ActionDirect.Down:
                            dirRotation = 90;
                            break;
                        case king_1.ActionDirect.Left_down:
                            dirRotation = 135;
                            break;
                        case king_1.ActionDirect.Left:
                            dirRotation = 180;
                            break;
                        case king_1.ActionDirect.Left_up:
                            dirRotation = -135;
                            break;
                        default: break;
                    }
                    //2020-06-01 andy rpg如果有射击目标
                    if (game.Define.gameType == game.GameType.rpg && this.atkTarget) {
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.atkTarget.x, this.atkTarget.y);
                        return MathUtil.getFromAngle(angle);
                    }
                    return this.spBody.rotation + dirRotation;
                };
                /**重置数据 */
                King.prototype.reset = function () {
                    this.curActionState = king_1.ActionState.NONE;
                    this.curActionType = king_1.ActionType.Wait;
                    this.hpBar.visible = true;
                    this.rotation = 0;
                    this.alpha = 1;
                    this.dicCD = new Dictionary();
                    this.curFixedIndex = 0;
                };
                return King;
            }(king_1.BaseKing));
            king_1.King = King;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            /*
            *  Npc基类 2020-03-03 andy
            */
            var Npc = /** @class */ (function (_super) {
                __extends(Npc, _super);
                function Npc() {
                    var _this = _super.call(this) || this;
                    /**攻击距离 */
                    _this.atkDistance = 1;
                    /**角色 移动速度 */
                    _this.moveSpeed = 1;
                    _this.curPointIndex = 0;
                    /**是否自动循环行走 */
                    _this.isMoveLoop = true;
                    _this.hpBar = new Laya.ProgressBar();
                    _this.hpBar.anchorX = _this.hpBar.anchorY = 0.5;
                    _this.spHead.addChild(_this.hpBar);
                    _this.spDebug = new Laya.Sprite();
                    _this.addChild(_this.spDebug);
                    _this.startPoint = new Laya.Point();
                    _this.endPoint = new Laya.Point();
                    return _this;
                    //this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
                }
                Npc.prototype.init = function () {
                    _super.prototype.init.call(this);
                };
                /**
                 * 设置皮肤
                 * @param skinData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                Npc.prototype.setSkin = function (skinData, isAdd) {
                    if (isAdd === void 0) { isAdd = true; }
                    _super.prototype.setSkin.call(this, skinData, isAdd);
                };
                /** */
                Npc.prototype.update = function () {
                    this.startPoint.setTo(this.x, this.y);
                };
                /**
                 * 设置行走位置数组
                 * @param arr
                 */
                Npc.prototype.setMovePoint = function (arr) {
                    this.arrPoint = arr;
                    this.curPointIndex = 0;
                    this.nextPoint();
                };
                /** 行走 */
                Npc.prototype.move = function () {
                    if (game.Define.gameType == game.GameType.over_look) {
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.atkTarget.x, this.atkTarget.y);
                        this.spBody.rotation = MathUtil.getFromAngle(angle);
                        var radian = MathUtil.angleToRadian(this.spBody.rotation);
                        this.x += Math.cos(radian) * this.moveSpeed;
                        this.y += Math.sin(radian) * this.moveSpeed;
                        this.endPoint.setTo(this.atkTarget.x, this.atkTarget.y);
                        var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                        if (distance < this.atkDistance) {
                            this.setActionState(king.ActionState.ATTACK);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.h_game) {
                        //没有位置
                        if (!this.curPoint) {
                            return;
                        }
                        //根据目标，自动切换左右行走方向
                        this.x < this.curPoint.x ? this.setActionDirect(king.ActionDirect.Right) : this.x > this.curPoint.x ? this.setActionDirect(king.ActionDirect.Left) : null;
                        if (this.curDirect == king.ActionDirect.Left) {
                            if (this.x - this.moveSpeed - this.atkDistance > this.curPoint.x) {
                                this.pos(this.x - this.moveSpeed, this.y);
                            }
                            else {
                                this.nextPoint();
                            }
                        }
                        else if (this.curDirect == king.ActionDirect.Right) {
                            if (this.x + this.moveSpeed + this.atkDistance < this.curPoint.x) {
                                this.pos(this.x + this.moveSpeed, this.y);
                            }
                            else {
                                this.nextPoint();
                            }
                        }
                        else {
                            //console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.v_game) {
                    }
                    else {
                    }
                };
                Npc.prototype.nextPoint = function () {
                    if (this.curPointIndex >= this.arrPoint.length) {
                        if (this.isMoveLoop) {
                            this.curPointIndex = 0;
                        }
                        else {
                            return null;
                        }
                    }
                    this.curPoint = this.arrPoint[this.curPointIndex];
                    this.curPointIndex++;
                    return this.curPoint;
                };
                /**
                 * 计算行走方向
                 * @param fromX
                 * @param fromY
                 * @param toX
                 * @param toY
                 * @param isEightDir 是否八方向,默认true
                 */
                Npc.prototype.checkMoveDir = function (fromX, fromY, toX, toY, isEightDir) {
                    if (isEightDir === void 0) { isEightDir = true; }
                    var radian = Math.atan2(fromY - toY, fromX - toX);
                    var angle = MathUtil.radianToAngle(radian);
                    //从左到右 -135 -45  135 45
                    // console.log(this.name,fromX,fromY,toX,toY,angle);
                    if (isEightDir) {
                        return 0;
                    }
                    else {
                        return angle;
                    }
                };
                /**
                 * 死亡时调用
                 */
                Npc.prototype.onDead = function () {
                    if (this.eftDead) {
                        this.eftDead.playFrame(false, this);
                    }
                };
                /**
                 * 死亡消失时调用
                 */
                Npc.prototype.onDeadDisappear = function () {
                    king.NpcManager.ins.removeNpc(this.objId);
                };
                /**重置 */
                Npc.prototype.reset = function () {
                    this.curActionState = king.ActionState.NONE;
                    this.curActionType = king.ActionType.Wait;
                    this.hpBar.visible = true;
                    this.rotation = 0;
                    this.alpha = 1;
                };
                return Npc;
            }(king.BaseKing));
            king.Npc = Npc;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var skill;
        (function (skill) {
            var BaseDisplay = game.display.BaseDisplay;
            /**
             * 技能基类
             */
            var BaseSkill = /** @class */ (function (_super) {
                __extends(BaseSkill, _super);
                function BaseSkill() {
                    var _this = _super.call(this) || this;
                    _this.startPoint = new Laya.Point();
                    _this.endPoint = new Laya.Point();
                    _this.curPoint = new Laya.Point();
                    return _this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                BaseSkill.prototype.setData = function (skillData) {
                    this.skillData = skillData;
                    this.cfgSkill = skillData.cfg_Skill;
                    this.atkTarget = skillData.atkTarget;
                    this.atkedTarget = skillData.atkedTarget;
                    if (this.atkTarget) {
                        this.atkTarget.atkSkill = this.cfgSkill ? this.cfgSkill.atk : 0;
                    }
                    //攻击特效
                    this.atkEft = FrameManager.ins.getFrame(this.cfgSkill.atkEft, Laya.Handler.create(this, this.atkCallBack, null, false));
                    if (this.atkEft)
                        this.atkEft.name = "atkEft";
                    //发射特效
                    this.atkingEft = FrameManager.ins.getFrame(this.cfgSkill.atkingEft, Laya.Handler.create(this, null, null, false));
                    //受击特效
                    this.atkedEft = FrameManager.ins.getFrame(this.cfgSkill.atkedEft, Laya.Handler.create(this, this.atkedCallBack, null, false));
                };
                /**
                 * 播放技能
                 */
                BaseSkill.prototype.play = function () {
                    console.log("子类未实现");
                };
                /**
                 * 停止技能
                 */
                BaseSkill.prototype.stop = function () {
                    //console.log("子类未实现");
                };
                /**攻击特效播放完成 */
                BaseSkill.prototype.atkCallBack = function () {
                };
                /**发射结束 */
                BaseSkill.prototype.atkingCallBack = function () {
                };
                /**受击特效播放完成 */
                BaseSkill.prototype.atkedCallBack = function () {
                };
                return BaseSkill;
            }(BaseDisplay));
            skill.BaseSkill = BaseSkill;
            /**
             * 技能数据
             */
            var SkillData = /** @class */ (function () {
                function SkillData(Cfg_Skill, atkTarget, atkedTarget) {
                    this.cfg_Skill = Cfg_Skill;
                    this.atkTarget = atkTarget;
                    this.atkedTarget = atkedTarget;
                }
                return SkillData;
            }());
            skill.SkillData = SkillData;
            /**技能类型 */
            var SkillType;
            (function (SkillType) {
                /**物理攻击 */
                SkillType[SkillType["ATTACK"] = 0] = "ATTACK";
                /**子弹类型 */
                SkillType[SkillType["BULLET"] = 1] = "BULLET";
                /**群杀类型 */
                SkillType[SkillType["GROUP_SKILL"] = 2] = "GROUP_SKILL";
            })(SkillType = skill.SkillType || (skill.SkillType = {}));
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var scene;
    (function (scene) {
        var skill;
        (function (skill) {
            /**
             * 2020-01-14 andy
             * 普通攻击技能
             */
            var AttackSkill = /** @class */ (function (_super) {
                __extends(AttackSkill, _super);
                function AttackSkill() {
                    return _super.call(this) || this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                AttackSkill.prototype.setData = function (skillData) {
                    _super.prototype.setData.call(this, skillData);
                };
                /**
                 * 播放技能
                 */
                AttackSkill.prototype.play = function () {
                    //攻击特效
                    if (this.atkTarget) {
                        if (this.atkEft) {
                            this.atkEft.x = this.cfgSkill.atkX;
                            this.atkEft.y = this.cfgSkill.atkY;
                            //this.atkEft.pivot(0,0);
                            this.atkEft.playFrame(false, this.atkTarget.spBody);
                        }
                        else {
                            this.atkCallBack();
                        }
                    }
                };
                /**攻击特效播放完成 */
                AttackSkill.prototype.atkCallBack = function () {
                    var _this = this;
                    //目标受击特效
                    if (this.atkedTarget && this.atkedTarget.curActionState != ActionState.DEAD) {
                        if (this.atkedEft) {
                            this.atkedEft.x = this.atkedTarget.atkedX;
                            this.atkedEft.y = this.atkedTarget.atkedY;
                            this.atkedEft.playFrame(false, this.atkedTarget.spEft);
                        }
                        //目标掉血
                        if (this.cfgSkill.atkedDelay > 0) {
                            Laya.timer.once(this.cfgSkill.atkedDelay, this, function () {
                                _this.atkedTarget.attacked(_this.atkTarget);
                            });
                        }
                        else {
                            this.atkedTarget.attacked(this.atkTarget);
                        }
                    }
                };
                return AttackSkill;
            }(skill.BaseSkill));
            skill.AttackSkill = AttackSkill;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var skill;
        (function (skill) {
            /**
             * 2019-12-20 andy
             * 子弹技能
             */
            var BulletSkill = /** @class */ (function (_super) {
                __extends(BulletSkill, _super);
                function BulletSkill() {
                    var _this = _super.call(this) || this;
                    /**自动导航*/
                    _this._autoCheck = false;
                    Laya.timer.frameLoop(1, _this, _this.update);
                    _this.arrBullet = [];
                    return _this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                BulletSkill.prototype.setData = function (skillData) {
                    _super.prototype.setData.call(this, skillData);
                    if (skillData && skillData.cfg_Skill) {
                        if (!skillData.cfg_Skill.atkDistance || skillData.cfg_Skill.atkDistance == 0)
                            console.error("技能ID:" + skillData.cfg_Skill.skillId + " 子弹攻击距离atkDistance为0，请检查技能表配置");
                        if (!skillData.cfg_Skill.atkingSpeed || skillData.cfg_Skill.atkingSpeed == 0)
                            console.error("技能ID:" + skillData.cfg_Skill.skillId + " 子弹飞行速度atkingSpeed为0，请检查技能表配置");
                    }
                };
                /**
                 * 播放技能
                 */
                BulletSkill.prototype.play = function () {
                    if (this.atkTarget) {
                        if (this.atkEft) {
                            this.atkEft.x = this.cfgSkill.atkX;
                            this.atkEft.y = this.cfgSkill.atkY;
                            this.atkEft.playFrame(false, this.atkTarget.spBody);
                        }
                        if (this.atkingEft) {
                            var bulletCount = this.cfgSkill.atkingCount;
                            var bulletRotation = this.cfgSkill.atkingRotation;
                            var minRotation = this.atkTarget.getAtkingEftRotation() - (bulletRotation >> 1);
                            var addRotation = 0;
                            if (bulletCount > 1) {
                                addRotation = bulletRotation / (bulletCount - 1);
                            }
                            var bf = null;
                            for (var i = 0; i < bulletCount; i++) {
                                bf = FrameManager.ins.getFrame(this.cfgSkill.atkingEft, Laya.Handler.create(this, null, null, false));
                                this.createBullet(bf, minRotation + addRotation * i);
                                this.arrBullet.push(bf);
                            }
                        }
                    }
                };
                BulletSkill.prototype.createBullet = function (bullet, rotation) {
                    var _this = this;
                    //子弹旋转角度
                    bullet.rotation = rotation;
                    //子弹场景发出坐标
                    var radian = MathUtil.angleToRadian(bullet.rotation);
                    bullet.x = this.atkTarget.x + this.cfgSkill.atkingX * Math.cos(radian);
                    bullet.y = this.atkTarget.y + this.cfgSkill.atkingX * Math.sin(radian);
                    bullet.playFrame(true, scene.LayerName.scene_effect);
                    //子弹自动导航，强制清空攻击目标
                    this._autoCheck = true;
                    this.atkedTarget = null;
                    var toX = this.atkTarget.x + this.cfgSkill.atkDistance * Math.cos(radian);
                    var toY = this.atkTarget.y + this.cfgSkill.atkDistance * Math.sin(radian);
                    //匀速射击，根据距离计算射击时间
                    this.startPoint.setTo(bullet.x, bullet.y);
                    this.endPoint.setTo(toX, toY);
                    var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                    Laya.Tween.to(bullet, { x: toX, y: toY, scaleX: 0.6, scaleY: 0.6 }, distance * this.cfgSkill.atkingSpeed / 100, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                        //子弹飞行结束
                        _this.atkingFinish(bullet, _this.atkedTarget);
                    }));
                };
                BulletSkill.prototype.update = function () {
                    //子弹飞行中，自动检测是否击中目标
                    if (this._autoCheck) {
                        var distance = 0;
                        //子弹剩余未击中目标数量
                        var bulletCount = 0;
                        for (var _i = 0, _a = this.arrBullet; _i < _a.length; _i++) {
                            var bullet = _a[_i];
                            if (bullet.parent) {
                                bulletCount++;
                            }
                            else {
                                continue;
                            }
                            this.curPoint.setTo(bullet.x, bullet.y);
                            for (var _b = 0, _c = KingManager.ins.kings; _b < _c.length; _b++) {
                                var enemy = _c[_b];
                                if (enemy.curActionState != ActionState.DEAD && this.atkTarget.camp != enemy.camp) {
                                    distance = MathUtil.getDistance(enemy.startPoint, this.curPoint);
                                    if (distance < enemy.atkedRadis) {
                                        //2020-04-20 被攻击者应绑定到子弹上
                                        //this.atkedTarget = enemy;
                                        Laya.Tween.clearAll(bullet);
                                        this.atkingFinish(bullet, enemy);
                                        break;
                                    }
                                }
                            }
                        }
                        if (bulletCount == 0) {
                            this._autoCheck = false;
                        }
                    }
                };
                /**攻击特效播放完成 */
                BulletSkill.prototype.atkCallBack = function () {
                };
                /**发射结束 */
                BulletSkill.prototype.atkingFinish = function (bullet, enemy) {
                    if (enemy === void 0) { enemy = null; }
                    //发射结束
                    if (this.atkEft)
                        this.atkEft.stopFrame();
                    if (bullet)
                        bullet.stopFrame();
                    if (enemy) {
                        //受击特效
                        this.atkedEft = FrameManager.ins.getFrame(this.cfgSkill.atkedEft, null);
                        if (this.atkedEft) {
                            this.atkedEft.x = enemy.atkedX;
                            this.atkedEft.y = enemy.atkedY;
                            this.atkedEft.playFrame(false, enemy.spEft);
                        }
                        //目标掉血
                        enemy.attacked(this.atkTarget);
                        ;
                    }
                };
                /**受击特效播放完成 */
                BulletSkill.prototype.atkedCallBack = function () {
                };
                return BulletSkill;
            }(skill.BaseSkill));
            skill.BulletSkill = BulletSkill;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var skill;
        (function (skill) {
            /**
             * 2019-12-30 andy
             * 群杀技能
             */
            var GroupKillSkill = /** @class */ (function (_super) {
                __extends(GroupKillSkill, _super);
                function GroupKillSkill() {
                    return _super.call(this) || this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                GroupKillSkill.prototype.setData = function (skillData) {
                    _super.prototype.setData.call(this, skillData);
                };
                /**
                 * 播放技能
                 */
                GroupKillSkill.prototype.play = function () {
                    var _this = this;
                    if (this.atkTarget) {
                        if (this.atkEft) {
                            this.atkEft.x = this.cfgSkill.atkX;
                            this.atkEft.y = this.cfgSkill.atkY;
                            this.atkEft.playFrame(false, this.atkTarget.spBody);
                        }
                        if (this.atkingEft) {
                            //子弹旋转角度
                            this.atkingEft.rotation = this.atkTarget.rotation;
                            //子弹场景发出坐标
                            var radian = MathUtil.angleToRadian(this.atkingEft.rotation);
                            this.atkingEft.x = this.atkTarget.x + this.cfgSkill.atkingX * Math.cos(radian);
                            this.atkingEft.y = this.atkTarget.y + this.cfgSkill.atkingX * Math.sin(radian);
                            this.atkingEft.playFrame(true, scene.LayerName.scene_effect);
                            var toX = this.atkedTarget ? this.atkedTarget.x : this.atkTarget.x + game.Define.DeviceW * Math.cos(radian);
                            var toY = this.atkedTarget ? this.atkedTarget.y : this.atkTarget.y + game.Define.DeviceW * Math.sin(radian);
                            //匀速射击，根据距离计算射击时间
                            this.startPoint.setTo(this.atkingEft.x, this.atkingEft.y);
                            this.endPoint.setTo(toX, toY);
                            var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                            Laya.Tween.to(this.atkingEft, { x: toX, y: toY }, distance * this.cfgSkill.atkingSpeed / 100, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                                //发射结束
                                if (_this.atkEft)
                                    _this.atkEft.stopFrame();
                                if (_this.atkingEft)
                                    _this.atkingEft.stopFrame();
                                if (_this.atkedTarget) {
                                    //受击特效
                                    if (_this.atkedEft) {
                                        _this.atkedEft.x = _this.atkedTarget.spBody.pivotX + _this.atkedTarget.atkedX;
                                        _this.atkedEft.y = _this.atkedTarget.spBody.pivotY + _this.atkedTarget.atkedY;
                                        _this.atkedEft.playFrame(false, _this.atkedTarget.spBody);
                                    }
                                    //目标掉血
                                    _this.atkedTarget.setHp(-_this.cfgSkill.atk);
                                }
                            }));
                        }
                        else {
                            var distance = 0;
                            for (var _i = 0, _a = KingManager.ins.kings; _i < _a.length; _i++) {
                                var king_1 = _a[_i];
                                if (king_1.curActionState != ActionState.DEAD) {
                                    distance = king_1.startPoint.distance(this.atkTarget.x, this.atkTarget.y);
                                    if (this.cfgSkill.atkDistance == 0 || distance < this.cfgSkill.atkDistance) {
                                        //king.attacked(this.atkTarget,this.cfgSkill.atk);
                                        //目标掉血
                                        king_1.setHp(-this.cfgSkill.atk);
                                    }
                                }
                            }
                        }
                    }
                };
                return GroupKillSkill;
            }(skill.BaseSkill));
            skill.GroupKillSkill = GroupKillSkill;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var ui;
    (function (ui) {
        var BaseUI = game.display.BaseUI;
        /*
        * 窗体基类
        */
        var BaseWindow = /** @class */ (function (_super) {
            __extends(BaseWindow, _super);
            function BaseWindow(viewCls) {
                var _this = _super.call(this) || this;
                /** 窗体类型 */
                _this.uiType = null;
                /** Laya生成的UI */
                _this.view = null;
                _this.view = new viewCls();
                _this.root = LayerManager.ins.getLayer(LayerName.root);
                _this.addChild(_this.view);
                return _this;
            }
            /**执行一次 */
            BaseWindow.prototype.init = function () {
            };
            /**窗体打开 */
            BaseWindow.prototype.open = function () {
                var _this = this;
                this.view.on(Laya.Event.CLICK, this, this.mouseClick);
                ui.UIScaleManager.ins.regUI(this.uiType.name, function () { _this.scaleH(); }, function () { _this.scaleV(); });
            };
            /**窗体关闭 */
            BaseWindow.prototype.close = function () {
                //console.log("窗体已关闭");
                this.view.off(Laya.Event.CLICK, this, this.mouseClick);
                ui.UIScaleManager.ins.regUI(this.uiType.name, null, null);
            };
            /**
             * UI点击事件
             * @param event
             */
            BaseWindow.prototype.mouseClick = function (event) {
                event.stopPropagation();
                var btn = event.target;
                if (btn instanceof Laya.Sprite) {
                    //按钮增加点击效果，view,list除外
                    if (btn.name == "" || btn instanceof BaseWindow || btn instanceof laya.ui.Box || btn instanceof laya.ui.ProgressBar
                        || btn instanceof laya.ui.ScrollBar || btn instanceof laya.ui.Slider || btn instanceof laya.ui.ComboBox) {
                    }
                    else {
                        if (btn instanceof laya.ui.Button) {
                            laya.utils.Tween.from(btn, { scaleX: 0.8, scaleY: 0.8 }, 80);
                        }
                        //SoundManager.ins.playSound(Define.SOUND_BTN);
                        this.viewClick(btn);
                    }
                }
            };
            /**窗体点击事件 */
            BaseWindow.prototype.viewClick = function (sp) {
                var spName = sp.name;
                //console.log("点击按钮："+spName);
                switch (spName) {
                    case "btnClose":
                        ui.UIManager.ins.closeWindow(this.uiType);
                        break;
                    default:
                        break;
                }
            };
            return BaseWindow;
        }(BaseUI));
        ui.BaseWindow = BaseWindow;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var game;
    (function (game) {
        var GameUI = /** @class */ (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                return _super.call(this) || this;
            }
            GameUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameUI.uiView);
            };
            GameUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "imgBg", "name": "imgBg" } }, { "type": "Button", "props": { "y": 17, "x": 19, "var": "btnBack", "stateNum": 1, "skin": "game/btn_fh.png", "name": "btnBack" } }, { "type": "Label", "props": { "y": 37, "x": 167, "width": 134, "var": "txtScoe", "text": "0", "name": "txtScoe", "height": 40, "fontSize": 40, "color": "#ffffff", "align": "left" } }, { "type": "Image", "props": { "y": 577, "width": 100, "var": "imgEfct", "name": "imgEfct", "height": 50, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }] };
            return GameUI;
        }(View));
        game.GameUI = GameUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameOverUI = /** @class */ (function (_super) {
            __extends(GameOverUI, _super);
            function GameOverUI() {
                return _super.call(this) || this;
            }
            GameOverUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameOverUI.uiView);
            };
            GameOverUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 434, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 438, "x": 628, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 437, "text": "游戏结束", "fontSize": 24, "color": "#ffffff", "centerX": 0 } }, { "type": "Button", "props": { "y": 665, "x": 158, "width": 177, "var": "btnAgin", "skin": "common/button.png", "name": "btnAgin", "labelSize": 40, "label": "再来一次", "height": 77 } }, { "type": "Button", "props": { "y": 661, "x": 388, "width": 177, "var": "btnMain", "skin": "common/button.png", "name": "btnMain", "labelSize": 40, "label": "返回主页", "height": 77 } }, { "type": "Label", "props": { "y": 531, "x": 207, "text": "本次得分", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 531, "x": 369, "width": 100, "var": "txtScore", "text": "0", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 576, "x": 207, "text": "最高得分", "fontSize": 24, "font": "SimSun", "color": "#000000" } }, { "type": "Label", "props": { "y": 576, "x": 369, "width": 100, "var": "txtScoreMax", "text": "0", "fontSize": 24, "font": "SimSun", "color": "#000000" } }] };
            return GameOverUI;
        }(View));
        game.GameOverUI = GameOverUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        LoadingUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }, { "type": "Image", "props": { "y": 306, "width": 190, "var": "imgLogo", "name": "imgLogo", "height": 190, "centerX": 0 } }, { "type": "Text", "props": { "y": 1153, "x": 0, "wordWrap": true, "width": 736, "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", "leading": 15, "height": 93, "fontSize": 28, "font": "SimSun", "color": "#000000", "bold": false, "align": "left" } }, { "type": "ProgressBar", "props": { "y": 1004, "x": 74, "width": 500, "var": "bar", "height": 30 } }, { "type": "Label", "props": { "y": 520, "width": 341, "text": "乐帆游戏 快乐远行", "height": 54, "fontSize": 40, "font": "SimSun", "color": "#000000", "centerX": 0 } }] };
        return LoadingUI;
    }(View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var BagUI = /** @class */ (function (_super) {
            __extends(BagUI, _super);
            function BagUI() {
                return _super.call(this) || this;
            }
            BagUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.BagUI.uiView);
            };
            BagUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 434, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 400, "centerX": 0 } }, { "type": "Button", "props": { "y": 439, "x": 576, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 437, "x": 340, "text": "背包", "fontSize": 24 } }] };
            return BagUI;
        }(View));
        main.BagUI = BagUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainUI = /** @class */ (function (_super) {
            __extends(MainUI, _super);
            function MainUI() {
                return _super.call(this) || this;
            }
            MainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainUI.uiView);
            };
            MainUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "imgBg", "height": 1280 } }, { "type": "Button", "props": { "y": 961, "x": 45, "width": 177, "var": "btnBag", "skin": "common/button.png", "name": "btnBag", "labelSize": 40, "label": "背包", "height": 77 } }, { "type": "Button", "props": { "y": 852, "x": 255, "width": 177, "var": "btnStart", "skin": "common/button.png", "name": "btnStart", "labelSize": 40, "label": "开始游戏", "height": 77 } }, { "type": "Button", "props": { "y": 963, "x": 257, "width": 177, "var": "btnShare", "skin": "common/button.png", "name": "btnShare", "labelSize": 40, "label": "分享", "height": 77 } }, { "type": "Button", "props": { "y": 961, "x": 482, "width": 177, "var": "btnRank", "skin": "common/button.png", "name": "btnRank", "labelSize": 40, "label": "排行榜", "height": 77 } }] };
            return MainUI;
        }(View));
        main.MainUI = MainUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var RankUI = /** @class */ (function (_super) {
            __extends(RankUI, _super);
            function RankUI() {
                return _super.call(this) || this;
            }
            RankUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.RankUI.uiView);
            };
            RankUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Sprite", "props": { "width": 720, "height": 1280, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "width": 720, "lineWidth": 1, "height": 1280, "fillColor": "#000000" } }] }, { "type": "Image", "props": { "y": 234, "width": 600, "skin": "common/bg.png", "sizeGrid": "40,4,4,4", "height": 700, "centerX": 0 } }, { "type": "Button", "props": { "y": 238, "x": 625, "var": "btnClose", "skin": "common/btn_close.png", "name": "btnClose" } }, { "type": "Label", "props": { "y": 238, "x": 334, "text": "排行榜", "fontSize": 24, "color": "#000000" } }] };
            return RankUI;
        }(View));
        main.RankUI = RankUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));

var game;
(function (game) {
    var LangType = game.platform.LangType;
    var ScreenFillType = game.scene.ScreenFillType;
    /**
     * 游戏类型
     */
    var GameType;
    (function (GameType) {
        /**默认 */
        GameType[GameType["default"] = 0] = "default";
        /**俯视角度 */
        GameType[GameType["over_look"] = 1] = "over_look";
        /**横板游戏 比如：拳皇格斗*/
        GameType[GameType["h_game"] = 2] = "h_game";
        /**竖版游戏 比如：打飞机*/
        GameType[GameType["v_game"] = 3] = "v_game";
        /**RPG游戏*/
        GameType[GameType["rpg"] = 4] = "rpg";
    })(GameType = game.GameType || (game.GameType = {}));
    /*
    * 2019-02-28 andy
    全局游戏常量定义
    */
    var Define = /** @class */ (function () {
        function Define() {
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
        /**场景布局类型 0.不改变 1.自动竖屏 2.自动横屏 默认0*/
        Define.screenMode = 0;
        /**是否竖屏游戏 */
        Define.isVertitalGame = true;
        /**是否竖屏状态 */
        Define.isVertitalState = true;
        /**横竖屏转换时，是否等比缩放,默认是false，若为true需要自己处理逻辑 */
        Define.isSameScale = false;
        /**横竖屏转换时，背景图是否全屏,默认为true,会缩放 */
        Define.isSameBackgroundScale = true;
        /**竖屏游戏-横屏时填充模式 或者 横屏游戏-竖屏时填充模式*/
        Define.screenFillType = ScreenFillType.default;
        /**游戏类型 比如：俯视 横板 竖版 */
        Define.gameType = GameType.default;
        /**微信APPID */
        Define.appId = "wx659ae0df220d382f";
        /**点击按钮时的声音 */
        Define.SOUND_BTN = "";
        /**游戏的背景声音 */
        Define.SOUND_MAIN = null;
        /**游戏下载地址 */
        Define.DOWNLOAD_URL = "";
        /**游戏背景颜色 */
        Define.BACKGROUND_COLOR = "";
        return Define;
    }());
    game.Define = Define;
    /**广告配置 */
    var AdConfig = /** @class */ (function () {
        function AdConfig() {
        }
        return AdConfig;
    }());
    game.AdConfig = AdConfig;
})(game || (game = {}));

var game;
(function (game) {
    var PlatformID = game.platform.PlatformID;
    /*
    * 2019-02-27 andy
    全局基类
    */
    var Global = /** @class */ (function () {
        function Global() {
        }
        /**平台ID */
        Global.platformId = PlatformID.None;
        return Global;
    }());
    game.Global = Global;
})(game || (game = {}));

console.log("game.core version: 2020-09-04 1.0.0");
//全局定义
var Define = game.Define;
var Global = game.Global;
var GameType = game.GameType;
//通用
var EventManager = game.common.EventManager;
var NoticeEvent = game.common.NoticeEvent;
var ResManager = game.common.ResManager;
var SoundManager = game.common.SoundManager;
var TipManager = game.common.TipManager;
var OpenManager = game.common.OpenManager;
var TweenManager = game.common.TweenManager;
var TweenTarget = game.common.TweenTarget;
var TweenProp = game.common.TweenProp;
var TweenPropType = game.common.TweenPropType;
var MatterManager = game.common.MatterManager;
//显示
var BaseDisplay = game.display.BaseDisplay;
var BaseUI = game.display.BaseUI;
var BaseAnimation = game.display.BaseAnimation;
//界面
var BaseWindow = game.ui.BaseWindow;
var UIManager = game.ui.UIManager;
var UIScaleManager = game.ui.UIScaleManager;
var UIType = game.ui.UIType;
//特效
var BaseFrame = game.effect.BaseFrame;
var FrameManager = game.effect.FrameManager;
var BaseEffect = game.effect.BaseEffect;
var BaseEffectData = game.effect.BaseEffectData;
var EffectManager = game.effect.EffectManager;
var EffectName = game.effect.EffectName;
var BossWarningEft = game.effect.BossWarningEft;
var BossWarningData = game.effect.BossWarningData;
var GuideClickEft = game.effect.GuideClickEft;
var GuideClickData = game.effect.GuideClickData;
var FountainEft = game.effect.FountainEft;
var FountainData = game.effect.FountainData;
var ChangeImageEft = game.effect.ChangeImageEft;
var ChangeImageData = game.effect.ChangeImageData;
var OutGoldEft = game.effect.OutGoldEft;
var OutGoldData = game.effect.OutGoldData;
var AirDropEft = game.effect.AirDropEft;
var AirDropData = game.effect.AirDropData;
var WaitingEft = game.effect.WaitingEft;
var WaitingData = game.effect.WaitingData;
var OutStarEft = game.effect.OutStarEft;
var OutStarData = game.effect.OutStarData;
//场景
var LayerManager = game.scene.LayerManager;
var LayerName = game.scene.LayerName;
var SceneManager = game.scene.SceneManager;
var ScreenFillType = game.scene.ScreenFillType;
var TouchManager = game.scene.TouchManager;
var RockerManager = game.scene.RockerManager;
//精灵
var BaseKing = game.scene.king.BaseKing;
var SkinData = game.scene.king.SkinData;
var Action = game.scene.king.Action;
var King = game.scene.king.King;
var Npc = game.scene.king.Npc;
var KingManager = game.scene.king.KingManager;
var NpcManager = game.scene.king.NpcManager;
var ActionType = game.scene.king.ActionType;
var ActionDirect = game.scene.king.ActionDirect;
var ActionState = game.scene.king.ActionState;
var BaseBone = game.scene.king.BaseBone;
var BoneManager = game.scene.king.BoneManager;
//技能
var BaseSkill = game.scene.skill.BaseSkill;
var SkillData = game.scene.skill.SkillData;
var SkillType = game.scene.skill.SkillType;
var SkillManager = game.scene.skill.SkillManager;
var NetManager = game.net.NetManager;
var SocketIoEvent = game.net.SocketIoEvent;
var HttpManager = game.net.HttpManager;
//BASE64
var Base64Manager = game.base64.Base64Manager;
var Base64Type = game.base64.Base64Type;
//工具
var MathUtil = game.util.MathUtil;
var Size = game.util.Size;
var PubUtil = game.util.PubUtil;
var Dictionary = game.util.Dictionary;
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
var UnityPlatform = game.platform.UnityPlatform;
var GooglePlatform = game.platform.GooglePlatform;
var MTGPlatform = game.platform.MTGPlatform;
var VunglePlatform = game.platform.VunglePlatform;
var AdColonyPlatform = game.platform.AdColonyPlatform;
//配置
var Cfg_Skill = game.config.Cfg_Skill;
var Cfg_Frame = game.config.Cfg_Frame;
var Cfg_Action = game.config.Cfg_Action;
var Cfg_Item = game.config.Cfg_Item;
var Cfg_Level = game.config.Cfg_Level;
var Cfg_Monster = game.config.Cfg_Monster;
var Cfg_Npc = game.config.Cfg_Npc;
//Laya核心类
var Stage = Laya.Stage;
var Render = Laya.Render;
var Sprite = Laya.Sprite;
var EventData = Laya.EventData;
var Skeleton = Laya.Skeleton;
var Templet = Laya.Templet;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var Stat = Laya.Stat;
var Tween = Laya.Tween;
var WebGL = Laya.WebGL;
