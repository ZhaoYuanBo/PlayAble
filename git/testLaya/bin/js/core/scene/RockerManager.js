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
