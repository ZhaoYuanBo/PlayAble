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
                    }
                    if (this.callBack)
                        this.callBack();
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
