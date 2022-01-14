/*
* 鱼类
*/
class Fish extends Laya.Sprite {
    public isCatch: boolean = false;
    public isDead: boolean = false;
    public kingType: string;
    public speed: number = 2;

    public fishImg: Laya.Image;
    private lastTime: number = 0;

    private fishIdText: Laya.Text;
    public curAticonType: ActionType;
    private fishPay: number = 0;

    constructor() {
        super();
        this.fishImg = new Laya.Image();
        this.fishIdText = new Laya.Text();

        this.fishImg.anchorY = 0.5;
        this.fishImg.anchorX = 0.3;

        this.addChild(this.fishImg);
        // this.addChild(this.fishIdText);

    }
    public init(id: number): void {
        this.isDead = false;
        this.width = 150, this.height = 120;
        this.fishIdText.fontSize = 80;
        this.fishImg.skin = "king/" + this.kingType + ".png";
        this.speed = MathUtil.randomRange(1, 3);
        this.fishIdText.text = this.kingType;
        if (id > 100 && id < 105) {
            this.fishPay = (id - 100) * 500;
        }
        else{ 
            this.fishPay = 10;
        }

        LayerManager.ins.addChild(this, LayerName.scene_map);
    }
    public setSkin(kt: string): void {
        this.kingType = kt;
        this.fishImg.skin = "king/" + this.kingType + ".png";
    }
    public setActionType(v: ActionType): void {
        this.curAticonType = v;
     
    }
    /**
     * 
     */
    public update(): void {
        if (this.isDead) {
            return;
        }
        if (this.isCatch) {

            if (Laya.timer.currTimer - this.lastTime >= 100) {
                this.lastTime = Laya.timer.currTimer;
                let randR: number = MathUtil.randomRange(0, 180);
                this.fishImg.rotation = randR;
            }
            return;
        }
      
        // this.checkPosition();
    }
    /**
     * 被抓到了
     */
    public catch(): void {
        SoundManager.ins.vibration(50);
        this.isCatch = true;
        this.fishImg.skewY = 10;
        let randCount: number = MathUtil.randomRange(0, 1);
        var globalPos: Laya.Point = this.fishImg.localToGlobal(new Laya.Point(0, this.fishImg.height >> 1));

        TipManager.ins.showWord("+$" + this.fishPay, globalPos.x, globalPos.y + 120, 150, 70, "#fee238");
    }
    /**
     * 死亡
     */
    public dead(): void {
        this.isCatch = false;
        this.isDead = true;
        this.deadEffect();
    }

    private deadEffect(): void {
        this.x = 300;
        this.y = 600;
        this.fishImg.rotation = 90;
        let randX: number = MathUtil.randomRange(0, 50);
        let randY: number = MathUtil.randomRange(200, 350);
        Laya.Tween.to(this, { x: this.x + randX, y: this.y - randY, alpha: 0.5 }, 400, Laya.Ease.cubicInOut, Laya.Handler.create(this, () => {
            this.removeSelf();
            let randCount: number = MathUtil.randomRange(0, 1);
            // TipManager.ins.showWord(randCount==0?"+5":"+10",0,350,-120,60,"#ffffff");
            GameModel.ins.addScore(this.fishPay);
        }));
        this.visible = true;
    }

}