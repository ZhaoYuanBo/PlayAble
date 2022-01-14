
enum fBoxType {
    mine,
    defult,
    other
}


class LineImg extends Laya.Sprite {

    public lineImg: Laya.Image;
    public id: number = 0;
    super(id: number) {
        this.id = id;
        this.lineImg = new Laya.Image();
    }
    public init() {
        //遮罩线条
        this.lineImg.skin = "game/arrow.png";
        this.lineImg.anchorX = 0;
        this.lineImg.anchorY = 0.5;
        this.lineImg.width = 500;
        let lineMask: Laya.Image = new Laya.Image("game/arrow.png");
        this.lineImg.mask = lineMask;
        this.lineImg.visible = false;
        LayerManager.ins.addChild(this.lineImg, LayerName.ui_window);
    }

}
/*
* 小房子;
*/
class FBox extends Laya.Sprite {

    public pTouchRect: MyTouchRect = null;
    public id: number = 0;
    public mPos: number = 0;
    public mUpNumber: number = 0;
    public clickImg: Laya.Image; //点击图片
    public boxImg: Laya.Image;  //图片
    public boxTextUpnumber: Laya.Text;

    public boxTextID: Laya.Text; //id显示
    public boxType: fBoxType;

    public line: Laya.Sprite;

    public pLineRect: MyTouchRect = null;


    /**是否绑定 */
    public isBinding: boolean = false;
    public isBinding2: boolean = false;

    /**是否被点击住 */
    public isClick: boolean = false;

    /**敌方盒子 */
    public targetBox: FBox = null;
    public targetBox2: FBox = null;

    /**子弹数组 */
    public vBullets: Bullet[] = [];

    public effUp: BaseFrame;  //升级特效

    /**升级毫秒 */
    public upTime: number = 1000;//ms

    /**线条遮罩 */
    public lineImg: Laya.Image;

    /**线条遮罩2 */
    public lineImg2: Laya.Image;

    public boxImg2: Laya.Image;

    /**检测是否划过 */
    public checkThough: boolean;

    /**圆形显示仪器 */
    public pointshowImg: Laya.Image;
    /**圆形数量 */
    public pointNum: number;
    /**图片集合 */
    public vPnImgs: Laya.Image[];

    constructor(pos: number) {
        super();
        this.mPos = pos;
        this.boxImg = new Laya.Image();
        this.boxTextUpnumber = new Laya.Text();
        this.boxTextID = new Laya.Text();
        this.clickImg = new Laya.Image();
        this.lineImg = new Laya.Image();
        this.lineImg2 = new Laya.Image();
        this.boxImg2 = new Laya.Image();

        this.effUp = FrameManager.ins.getFrame(13);
        this.setLineNum(1);
        this.addChild(this.boxImg);

    }

    public init(id: number, type: fBoxType) {
        this.boxImg.width = 200;
        this.boxImg.height = 200;
        // this.boxImg.alpha = 0.2;
        this.id = id;
        this.boxType = type;


        this.boxImg2.scale(1.3, 1.3);
        if (this.id == 4) {
            this.boxImg2.pos(257, 554);
        }
        else if (this.id == 5) {
            this.boxImg2.pos(20, 371);
        }
        else if (this.id == 6) {
            this.boxImg2.pos(486, 368);
        }
        else if (this.id == 3) {
            this.boxImg2.pos(248, 181);
        }
        switch (type) {
            case fBoxType.mine:
                this.upTime = 400;
                if (this.id == 4) {
                    this.mUpNumber = 19;
                }
                else {
                    this.mUpNumber = 0;
                }
                break;
            case fBoxType.other:
                this.mUpNumber = 29;
                this.upTime = 500;
                break;
            case fBoxType.defult:
                this.mUpNumber = 5;
                break;
        }
        this.setSkin(this.boxType, this.mUpNumber);
        this.line = new Laya.Sprite();
        this.boxTextUpnumber.width = 128;
        this.boxTextUpnumber.height = 52;
        this.boxTextUpnumber.pos(37, 25);
        this.boxTextUpnumber.fontSize = 50;
        this.boxTextUpnumber.bold = true;
        this.boxTextUpnumber.align = "center";
        this.boxTextUpnumber.color = "#f8f4f4";

        this.boxTextID.width = 128;
        this.boxTextID.height = 52;
        this.boxTextID.pos(37, 100);
        this.boxTextID.fontSize = 30;
        this.boxTextID.align = "center";
        this.boxTextID.color = "#010f1d";

        //遮罩线条
        this.lineImg.skin = "game/arrow.png";
        this.lineImg.anchorX = 0;
        this.lineImg.anchorY = 0.5;
        this.lineImg.width = 420;
        this.lineImg.height = 60;
        let lineMask: Laya.Image = new Laya.Image("game/arrow.png");
        this.lineImg.mask = lineMask;
        lineMask.width = 420;
        lineMask.height = 60;
        this.lineImg.visible = false;


        this.clickImg.skin = "game/ui_circle.png";


        this.clickImg.pos(this.x - 50, this.y - 50);
        this.clickImg.alpha = 0.6;

        LayerManager.ins.addChild(this.clickImg, LayerName.ui_window);

        LayerManager.ins.addChild(this.lineImg, LayerName.ui_window);
        LayerManager.ins.addChild(this.lineImg2, LayerName.main);
        LayerManager.ins.addChild(this.boxImg2, LayerName.ui_window);

        this.lineImg2.skin = "game/arrow.png";
        this.lineImg2.anchorX = 0;
        this.lineImg2.anchorY = 0.5;
        this.lineImg2.width = 420;
        this.lineImg2.height = 60;
        let lineMask2: Laya.Image = new Laya.Image("game/arrow.png");
        this.lineImg2.mask = lineMask2;
        lineMask2.width = 420;
        lineMask2.height = 60;
        this.lineImg2.visible = false;


        this.boxImg.addChild(this.boxTextUpnumber);
        this.scale(1, 1);


        this.addChild(this.effUp);
        this.effUp.pos(103, 101);
        Laya.timer.clearAll(this);

        Laya.timer.loop(this.upTime, this, () => {
            if (!GameCtrl.isStart)
                return;
            switch (this.boxType) {
                case fBoxType.defult:
                    break;
                case fBoxType.mine:
                case fBoxType.other:
                    this.mUpNumber++;
                    if (this.mUpNumber >= 65)
                        this.mUpNumber = 65;
                    if (this.id == 3) {

                        if (this.mUpNumber == 35) {
                            this.boxImg2.skin = "game/mtop2.png";
                            this.effUp.playFrame(false, this, true);
                        }
                        else if (this.mUpNumber == 40) {
                            this.boxImg2.skin = "game/mtop2.png";
                            this.effUp.playFrame(false, this, true);
                        }

                    }

                    //数值增长逻辑  65封顶
                    //连一条打一个勾1-9为1个圆点；10-29为2个圆点；30-65为3个圆点
                    break;
                default:
                    break;
            }

            if (this.isBinding) {
                this.shot(this.targetBox, 90);
            }
            if (this.isBinding2) {
                this.shot(this.targetBox2, 90);
            }
        })
    }

    public setSkin(type: fBoxType, num: number): void {
        switch (type) {
            case fBoxType.mine:
                if (this.id == 4) {
                    this.boxImg2.skin = "game/bottom1.png";
                }
                else if (this.id == 5) {
                    this.boxImg2.skin = "game/left1.png";
                }
                else if (this.id == 6) {
                    this.boxImg2.skin = "game/right1.png";
                }
                break;
            case fBoxType.other:
                this.boxImg2.skin = "game/mtop1.png";

                break;
            case fBoxType.defult:
                if (this.id == 5) {
                    this.boxImg2.skin = "game/left-1.png";
                }
                else if (this.id == 6) {
                    this.boxImg2.skin = "game/right-1.png";
                }
                break;
        }
    }

    /**设置线条长度 */
    public setLineNum(num: number): void {
        var pnImgs: Laya.Image[] = [];
        pnImgs.splice(0);
        pnImgs.forEach(element => {
            element.removeSelf();
        });
        var sNum: number = 0;
        for (var i = 0; i < num; i++) {
            var pnImg: Laya.Image = new Laya.Image;
            sNum++;
            pnImgs.push(pnImg);
            this.boxImg2.addChild(pnImg);
            pnImg.x = 60 + 40 * i;
            if (this.boxType == fBoxType.other) {
                pnImg.y = 125;
            }
            else {
                pnImg.y = 140;

            }
        }
        this.vPnImgs = pnImgs;

    }
    /**
     * 设置点击的区域
     * @param x 
     * @param y 
     * @param width 
     * @param height 
     */
    public setTouchRect(x: number, y: number, width: number, height: number, type: number = 0) {
        this.pTouchRect = new MyTouchRect(x, y, width, height);

        if (type == 1) {
            this.pLineRect = new MyTouchRect(x, y, width, height);
        }
    }

    /**
     * 子弹射击
     */
    public shot(target: FBox, rotation: number): void {
        var bullet: Bullet = new Bullet(this.x, this.y);
        bullet.bulletInit(target, this.boxType);
        bullet.x += target.boxImg.width / 2;
        bullet.y += target.boxImg.height / 2;

        this.vBullets.push(bullet);
        // this.mUpNumber--;

        if (target.isBinding) {
            target.shot(target.targetBox, 90);
        }
        LayerManager.ins.addChild(bullet, LayerName.main);

    }

    /**盒子受伤 */
    public would(num: number) {

        if (this.boxType == fBoxType.defult) {
            this.mUpNumber--;
            if (this.mUpNumber <= 0) {
                this.init(this.id, fBoxType.mine);

                //监听重置
                // GameModel.ins.gameRegistReset();

                var gamewnd: GameWin = UIManager.ins.getWindow(CustomWindow.game);
                if (this.id == 5) {
                    this.effUp.playFrame(false, this, true);

                    gamewnd.startTips(2);

                }
                else if (this.id == 6) {
                    this.effUp.playFrame(false, this, true);
                    gamewnd.startTips(3);
                }
            }
        }
        else if (this.boxType == fBoxType.mine) {
            this.mUpNumber++;

        }
        else if (this.boxType == fBoxType.other) {
            this.mUpNumber--;
            if (this.mUpNumber <= 30) {
                this.init(this.id, fBoxType.mine);

                console.error("获胜");
                EventManager.ins.event(CustomDefine.EVENT_GAME_OVER);
            }
        }

    }
    /**
     * 绘制线条
     * @param sX 
     * @param sY 
     * @param eX 
     * @param eY 
     */
    public drawLine(sX: number, sY: number, eX: number, eY: number) {
        // this.line.graphics.clear();

        // var gameUi:GameWin = UIManager.ins.getWindow(CustomWindow.game);

        // this.line.graphics.drawLine(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2, eX, eY, "#1E90FF", 30); //改遮罩

        this.lineImg.visible = true;
        LayerManager.ins.addChild(this.lineImg, LayerName.main);
        this.lineImg.pos(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2);
        this.lineImg.mask.width = MathUtil.getDistance(new Laya.Point(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2), new Laya.Point(eX, eY));

        this.lineImg.rotation = GameCtrl.ins.getRotationWithTwoPoint(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2, eX, eY);
    }

    /**
    * 绘制线条
    * @param sX 
    * @param sY 
    * @param eX 
    * @param eY 
    */
    public drawLine2(sX: number, sY: number, eX: number, eY: number) {
        // this.line.graphics.clear();

        // var gameUi:GameWin = UIManager.ins.getWindow(CustomWindow.game);

        // this.line.graphics.drawLine(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2, eX, eY, "#1E90FF", 30);

        this.lineImg2.visible = true;

        this.lineImg2.pos(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2);
        this.lineImg2.mask.width = MathUtil.getDistance(new Laya.Point(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2), new Laya.Point(eX, eY));

        this.lineImg2.rotation = GameCtrl.ins.getRotationWithTwoPoint(sX + this.boxImg.width / 2, sY + this.boxImg.height / 2, eX, eY);
    }
    /**
     * 子弹更新
     */
    public update(): void {
        this.boxTextUpnumber.text = this.mUpNumber.toString();
        this.boxTextID.text = "ID:" + this.id.toString();

        this.checkThough == true ? this.clickImg.visible = true : this.clickImg.visible = false;
        if (this.vBullets.length) {
            for (var i = 0; i < this.vBullets.length; i++) {
                if (this.vBullets[i].visible)
                    this.vBullets[i].update();
            }
        }

        if (this.isBinding) {
            this.vPnImgs[0].skin = "game/point2.png";
        }
        else {
            this.vPnImgs[0].skin = "game/point1.png";
        }

        if (this.vPnImgs.length == 2) {
            if (this.isBinding2) {
                this.vPnImgs[1].skin = "game/point2.png";
            }
            else {
                this.vPnImgs[1].skin = "game/point1.png";
            }
        }

    }

    public disappear() {
        Laya.timer.clearAll(this);
        this.line.graphics.clear();
        this.removeSelf();
    }
}