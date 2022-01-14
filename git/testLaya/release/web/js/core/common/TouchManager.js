var game;
(function (game) {
    var common;
    (function (common) {
        /*
        2019-04-01 andy
        * 触摸管理器
        监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:SwipeDirection,startP:Laya.Point,endP:Laya.Point}
        */
        var TouchManager = /** @class */ (function () {
            function TouchManager() {
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
            Object.defineProperty(TouchManager, "ins", {
                get: function () {
                    if (!this._ins)
                        new TouchManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            TouchManager.prototype.init = function () {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            };
            /**
             * 设置触摸是否有效
             * @param v
             */
            TouchManager.prototype.setTouch = function (v) {
                this._isCanTouch = v;
            };
            Object.defineProperty(TouchManager.prototype, "isTouch", {
                /**
                 * 是否触摸中
                 * @param v
                 */
                get: function () {
                    return this._isTouch;
                },
                enumerable: true,
                configurable: true
            });
            TouchManager.prototype.onMouseDown = function (t) {
                if (!this._isCanTouch) {
                    return;
                }
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._moveCount = 0, this._isTouch = true, this._startPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
            };
            TouchManager.prototype.onMouseMove = function (t) {
                if (this._isTouch && (this._curPoint.x = Laya.stage.mouseX, this._curPoint.y = Laya.stage.mouseY,
                    !this._isPushEvent)) {
                    var e = this._startPoint.distance(this._curPoint.x, this._curPoint.y), i = 18;
                    if (this._moveCount > 0 && (i = 20), e >= i) {
                        var n = new Laya.Vector2(this._curPoint.x - this._startPoint.x, this._curPoint.y - this._startPoint.y), r = this.GetSwipeDirection(n, 1);
                        common.EventManager.ins.event(common.NoticeEvent.TOUCH_DIRECTOR, { dir: r, startP: this._startPoint, endP: this._curPoint });
                        this._isPushEvent = true, this.StartRelesePushEvent(), this._moveCount++;
                    }
                    this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
                }
            };
            TouchManager.prototype.onMouseUp = function (t) {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
                this._isTouch = false, this.EndRelesePushEvent();
            };
            TouchManager.prototype.GetSwipeDirection = function (t, i) {
                var n = MathUtil.changeAngle360(MathUtil.radianToAngle(Math.atan2(t.y, t.x)));
                for (var r = 0; r < this.AngleToDirectionMap.length; ++r) {
                    var startAngle = this.moveAnagle[r][0], endAngle = this.moveAnagle[r][1];
                    if (n >= startAngle && n <= endAngle)
                        return this.AngleToDirectionMap[r];
                }
                return SwipeDirection.Non;
            };
            TouchManager.prototype.UpdateRelesePushEvent = function () {
                //this._isRelesePushEvent && (this._relesePushTime += Global.timeDelta, this._relesePushTime >= this.RELESE_PUSH_TIME && this.EndRelesePushEvent());
            };
            TouchManager.prototype.StartRelesePushEvent = function () {
                this._relesePushTime = 0, this._isRelesePushEvent = true;
            };
            TouchManager.prototype.EndRelesePushEvent = function () {
                this._isRelesePushEvent = false, this._isPushEvent = false, this._startPoint.setTo(this._curPoint.x, this._curPoint.y);
            };
            return TouchManager;
        }());
        common.TouchManager = TouchManager;
        /*
        * 滑动方向;
        */
        var SwipeDirection;
        (function (SwipeDirection) {
            SwipeDirection[SwipeDirection["Non"] = 0] = "Non";
            SwipeDirection[SwipeDirection["Left"] = 1] = "Left";
            SwipeDirection[SwipeDirection["Right"] = 2] = "Right";
            SwipeDirection[SwipeDirection["Up"] = 3] = "Up";
            SwipeDirection[SwipeDirection["Down"] = 4] = "Down";
        })(SwipeDirection = common.SwipeDirection || (common.SwipeDirection = {}));
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
