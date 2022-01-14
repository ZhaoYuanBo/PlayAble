/*
* 瓶子;
*/
class Bottle extends Laya.Sprite {

    public speed: number = 2;
    public bottleImg: Laya.Image;
    public hpShow: Laya.Image;
    public hp: number = 100;
    public isBoom: boolean = false;
    public bottleCfg: any = null;
    public id: number = 0;
    private broken: BaseBone;
    public hpImg: Laya.Image;
    public hpDb: Laya.Image;
    constructor() {
        super();

        this.bottleImg = new Laya.Image();
        this.bottleImg.anchorX = 0.5;
        this.bottleImg.anchorY = 0.5;
        this.addChild(this.bottleImg);
    }

    public init(id: number): void {
        this.width = 150, this.height = 120;
        let randId: number = MathUtil.randomRange(101, 103);
        this.bottleImg.skin = "king/" + randId + ".png";

        /**碎瓶子特效 */
        // switch (randId) {
        //     case 101:
        //         this.broken = BoneManager.ins.addBone(CustomBase64.bone_broken, false, false);
        //         break;
        //     case 102:
        //         this.broken = BoneManager.ins.addBone(CustomBase64.bone_broken2, false, false);
        //         break;
        //     case 103:
        //         this.broken = BoneManager.ins.addBone(CustomBase64.bone_broken3, false, false);
        //         break;
        //     case undefined:
        //         break;
        // }
        LayerManager.ins.addChild(this, LayerName.scene_map);

        /**绘制血条*/
        this.hpDb = new Laya.Image();
        this.hpDb.skin = "game/hp1.png";
        this.hpImg = new Laya.Image();
        this.hpImg.skin = "game/hp2.png";
        this.hpImg.width = 100, this.hpImg.height = 10;
        this.hpImg.x = -50, this.hpImg.y = this.y - 200;
        this.hpDb.x = this.hpImg.x, this.hpDb.y = this.hpImg.y, this.hpDb.width = 100, this.hpDb.height = 10;
        this.addChild(this.hpDb);
        this.hpImg.anchorX = 0;
        this.addChild(this.hpImg);
        this.hpDb.visible = false;
        this.hpImg.visible = false;

    }

    /**命中 */
    public beHit(num: number, x: number = 0, y: number = 0): void {
        var dh: Laya.Image = new Laya.Image();
        dh.skin = "game/gunPoint.png";
        // dh.graphics.drawCircle(this.bottleImg.x+x,this.bottleImg.y-y,15,"#db6f57");
        dh.anchorX = dh.anchorY = 0.5;
        dh.x = this.bottleImg.x + x;
        dh.y = this.bottleImg.y + y + 60;
        this.addChild(dh);
        this.hp -= num;
        this.hpImg.width -= num;
        this.hpDb.visible = true;
        this.hpImg.visible = true;
        TipManager.ins.showWord(num.toString(), this.x, this.y, 80, 50, "#d5d892");
        if (this.hp <= 0) {
            // SoundManager.ins.playSound(CustomBase64.sound_glass);
            // SoundManager.ins.vibration(50);
            this.broken.x = this.x;
            this.broken.y = this.y;
            this.broken.play();
            this.isBoom = true;
            this.visible = false;
           
        }
    }
    public update(): void {
        let gWnd: GameWin = UIManager.ins.getWindow(CustomWindow.game);
     
        if (this.isBoom)
            return;

        this.x += this.speed;
        
    }

    public boomEffect(): void {
    }
}