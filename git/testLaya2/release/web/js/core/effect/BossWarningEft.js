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