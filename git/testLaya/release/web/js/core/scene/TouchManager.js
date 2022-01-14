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
                /**移动事件最大次数，默认0，不限制;左右滑屏切换图片可设置为1 */
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
