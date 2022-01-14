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