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