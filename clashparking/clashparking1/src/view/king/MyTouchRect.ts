/*
* 拖动层;
*/
class MyTouchRect {
    constructor(x: number, y: number, w: number, h: number) {
        this.m_nPosX = x;
        this.m_nPosY = y;
        this.m_nWidth = w;
        this.m_nHeight = h;
    }
    public m_nPosX: number = 0;
    public m_nPosY: number = 0;
    public m_nWidth: number = 0;
    public m_nHeight: number = 0;

    public CheckTouch(x: number, y: number): boolean {
        if (x < this.m_nPosX || x > this.m_nPosX + this.m_nWidth)
            return false;
        if (y < this.m_nPosY || y > this.m_nPosY + this.m_nHeight)
            return false;
        return true;
    }
}




class GunObj extends Laya.Sprite {
    public pTouchRect: MyTouchRect = null;
    public id: number = 0;
    public mPos: number = 0;
    public gunImg: Laya.Image;
    public pBase: any;
    public lv: Laya.Text;
    public isTmp: boolean = false;
    public gunDb: Laya.Image;
    constructor(pos: number) {
        super();
        this.mPos = pos;
        this.gunImg = new Laya.Image();
        this.lv = new Laya.Text();
        this.width = this.height = 180;
        this.gunImg.scale(1.3, 1.3);
        this.gunImg.rotation = 45;
        this.gunImg.x = 35;
        this.gunImg.y = -30;
        this.lv.color = "#00000";
        this.lv.bold = true;
        this.lv.fontSize = 30;
        this.lv.y = this.height - 45;
        this.lv.x = 10;
        //db
        this.gunDb = new Laya.Image();
        this.gunDb.skin = "game/Db_lv.png";
        this.gunDb.x = -10;
        this.gunDb.y = this.height - 45;
        this.addChild(this.gunDb);
        this.addChild(this.gunImg);
        this.addChild(this.lv);
    }

    public init(id: number) {
        this.id = id;
        this.lv.text = (id - 100).toString();
        this.pBase = ConfigData.ins.gunCfg[id];
        this.gunImg.skin = this.pBase.skin;
        Laya.timer.clearAll(this);
        Laya.timer.loop(2000, this, () => {
            if (this.isTmp) {
                return;
            }
            var txt: Laya.Text = new Laya.Text();
            txt.pivotX = 0.5;
            txt.color = "#f8e072"; txt.fontSize = 30; txt.x = this.gunImg.width >> 1; txt.y = 0;
            txt.text = "+" + this.pBase.upGod;
            // this.addChild(txt);

            Laya.Tween.to(txt, { y: txt.y - 80, alpha: 0.1 }, 1000, null, Laya.Handler.create(txt, () => {
                txt.text = "";
                GameCtrl.ins.addScore(this.pBase.upGod);
            }))
        })
    }

    public update() {

    }
}