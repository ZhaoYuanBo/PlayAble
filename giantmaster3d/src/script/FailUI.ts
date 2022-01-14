import { ui } from "../ui/layaMaxUI"
import EffectTool from "../util/EffectTool";
import GameManager from "./GameManager";


export default class FailUI extends BaseWindow {

    public ui: ui.failviewUI;
    constructor() {
        super(ui.failviewUI);
    }


    public init(): void {

        this.ui = this.view as ui.failviewUI;
        Laya.timer.loop(100, this, this.creatEffect);
        Laya.timer.loop(1,this,this.update);

    }

    public open(): void {
        Laya.stage.on(Laya.Event.CLICK, this, this.stageClick);
        Laya.timer.loop(1000, this.ui.txt_badluck, () => {

            Laya.Tween.to(this.ui.txt_badluck, { scaleX: 0.5, scaleY: 0.5 }, 500, null, Laya.Handler.create(this.ui.txt_badluck, () => {

                Laya.Tween.to(this.ui.txt_badluck, { scaleX: 1, scaleY: 1 }, 500, null, Laya.Handler.create(this.ui.txt_badluck, () => {

                    Laya.Tween.clearAll(this.ui.txt_badluck);
                }))
            }))
        })
    }

    public close(): void {
        Laya.stage.off(Laya.Event.CLICK, this, this.stageClick);
    }


    private update() {
        let camera = GameManager.Instance._camera;
        if (camera) {
            let role = GameManager.Instance._uiPoint;
            let point = EffectTool.WorldToScreen2(camera, role.position);

            // this.ui.ui_center.y =point.y-(220*role.localScaleX*0.9);
       
                this.ui.x = point.x - 360;


        }
    }
    private stageClick(): void {

        HttpManager.ins.link(Define.DOWNLOAD_URL);
    }

    private creatEffect() {
        var img: Laya.Image = new Laya.Image("game/lose.png");
        this.ui.img_faildb.addChild(img);
        let ranScale = MathUtil.randomRange(1, 6);
        img.scale(ranScale / 10, ranScale / 10);
        img.pos(MathUtil.randomRange(0, 720), 0);
        Laya.Tween.to(img, { alpha: 0 }, 1000, null, Laya.Handler.create(img, () => {
            //    Laya.Tween.clearAll(img);
        }));
        Laya.Tween.to(img, { y: 1500 }, 2000, null);


    }
}