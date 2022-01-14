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