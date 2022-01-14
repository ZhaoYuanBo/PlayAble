/*
* 子弹;
*/
class Bullet extends Laya.Sprite {

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.firePoint = new Laya.Point(this.x, this.y);
    }

    /**速度 */
    public speed: number = 10;
    /**皮肤 */
    public bulletImg: Laya.Image;
    /**半径 */
    public bulletR: number = 6;
    /**旋转角度 */
    public b_Cov: number = 0;
    /**目标敌人 */
    public target: FBox;
    /**超出屏幕以外 */
    public isFarAway: boolean = false;
    /**命中敌方 */
    public isHit: boolean = false;
    /**发射扣 */
    public firePoint: Laya.Point = null;


    public bulletInit(target: FBox, type: fBoxType = 1): void {
        this.target = target;
        this.bulletImg = new Laya.Image();
        if (type == fBoxType.mine) {
            this.bulletImg.skin = "game/people.png";
        }
        else if (type == fBoxType.other) {
            this.bulletImg.skin = "game/bullet2.png";
        }
        this.bulletImg.anchorX = 0.5;
        this.bulletImg.anchorY = 0.5;
        this.bulletImg.scaleX = this.bulletImg.scaleY = 1;
    
        this.addChild(this.bulletImg);
    }

    public update() {
        if (this.visible)
            this.OnLoop();
    }

    /**目标点与本身的偏差*/
    public GetCov(x: number, y: number) {
        if (Math.abs(x) + Math.abs(y) <= 0.01) {
            return 0;
        }
        var roi: number = Math.atan2(x, y) * 180 / Math.PI;
        return roi;
    }

    /**寻路移动循环 */
    public OnLoop() {
        var point: Laya.Point = this.getFrameTransition((this.target.x + this.target.boxImg.width / 2) - this.x, (this.target.y + this.target.boxImg.height / 2) - this.y, this.speed);
        this.x += point.x;
        this.y += point.y;
        
        this.bulletImg.rotation =90- this.GetCov(this.target.x+this.target.boxImg.width/2 - this.x, this.target.y+this.target.boxImg.height/2 - this.y);

        var dis: number = MathUtil.getDistance(new Laya.Point(this.x, this.y), new Laya.Point(this.target.x + this.target.boxImg.width / 2, this.target.y + this.target.boxImg.height / 2));
        if (dis <= 50) {
            // this.target.wound(num);
            this.visible = false;
            this.isHit = true;

            this.target.would(1);
        }
    }

    /**
     * 返回每一帧的偏差值
     * @param deltaX 
     * @param deltaY 
     * @param speed 
     */
    public getFrameTransition(deltaX: number, deltaY: number, speed: number): Laya.Point {
        var x: number;
        var y: number;
        var num: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        x = (speed / num) * deltaX;
        y = (speed / num) * deltaY;
        return new Laya.Point(x, y);
    }
    public disappear() {
        this.removeSelf();
        this.destroy();
    }
}