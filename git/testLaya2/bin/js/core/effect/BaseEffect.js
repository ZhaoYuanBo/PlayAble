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