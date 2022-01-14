
/*
2019-04-24 andy
* 游戏下载界面
*/
class GameDownloadWin extends BaseWindow {
    public ui: GameDownloadUI;
    constructor() {
        super(GameDownloadUI);
    }

    protected init(): void {
        super.init();
        this.ui = this.view as GameDownloadUI;
        GameCtrl.ins.initDownloadLang(this.ui);
        // OpenManager.ins.postMsg(NoticeEvent.ZY_SCORE, UserSelfModel.ins.scoreMax);
        // this.ui.db.alpha = 1;


    }
    /**通过不同选择打开不同的界面 */
    public openByIndex(index: number) { //1 子弹没了，可以重玩 2，通关了进行下次下载

    }
    public isGuid1: boolean = false;
    public open(): void {
        super.open();

        // SoundManager.ins.playSound(CustomBase64.sound_jiatelin);
        // Laya.timer.loop(1000, this.ui.imgGuide, () => {
        //     Laya.Tween.to(this.ui.imgGuide, { scaleX: 0.2, scaleY: 0.2 }, 300, null, Laya.Handler.create(this, (evt) => {
        //         Laya.Tween.to(this.ui.imgGuide, { scaleX: 1, scaleY: 1 }, 600, null, Laya.Handler.create(this, (evt) => {
        //             this.ui.imgGuide.x = Define.DeviceW >> 1;
        //             Laya.Tween.clearAll(evt);
        //         }))
        //     }));
        // });
        let tt: TweenTarget = new TweenTarget(CustomDefine.animGuide, this.ui.btnDownload, TweenManager.ins.creatProp(TweenPropType.SMALL_BIG, [0.9, 1.1, 360, 746]), 100);
        tt.play();

        Laya.Tween.from(this.ui.ui_logo, { y: -444 }, 400, null, Laya.Handler.create(this.ui.ui_logo, () => {
            Laya.Tween.to(this.ui.ui_logo, { scaleX: 1.5, scaleY: 1.5 }, 150)
        }));

        // this.ui.stage.on(Laya.Event.MOUSE_DOWN, this, () => {
        //     HttpManager.ins.link(Define.DOWNLOAD_URL);
        // });

        Laya.timer.loop(300,this,this.CreateStar);

    }

    public CreateStar():void{ 

        var imgStar:Laya.Image = new Laya.Image("game/star.png");
        imgStar.anchorX = 0.5;
        imgStar.anchorY = 0.5;

        this.ui.spr.addChild(imgStar);
        imgStar.pos(360,1480);
        var randomPosX:number = MathUtil.randomRange(-300,1020);
        Laya.Tween.to(imgStar,{x:randomPosX,y:-200,alpha:0,rotation:600},1500,null,Laya.Handler.create(this,()=>{ 

         imgStar.alpha = 0 ;
        }));

    }
    public viewClick(sp: Laya.Sprite): void {
        super.viewClick(sp);
        let spName: string = sp.name;
        switch (spName) {
            case "btnAgin":
                UIManager.ins.closeWindow(this.uiType);
                break;
            case "btnDownload":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            case "btnDownload1":
                // this.reflishGame();
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            case "btnChoose1":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            case "btnChoose2":
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            default:
                break;
        }

    }

    /**
    * 展示页面的抖动效果
    * @param times 时间 
    * @param delay 延迟时间
    * @param fun 触发事件
    */
    public playAnimaByTimes(times: number, delay: number = 1000, fun: Function) {
        fun();
        Laya.Tween.to(this, {}, delay, null, Laya.Handler.create(this, () => {
            times--;
            if (times <= 0) {
                return;
            }
            this.playAnimaByTimes(times, delay, fun);
        }));
    }
    public reflishGame() {
        UIManager.ins.closeWindow(CustomWindow.gameDownload);
        var wnd: GameWin = UIManager.ins.getWindow(CustomWindow.game);
        wnd.close();
        wnd.open();
        Laya.timer.clearAll(this);
    }
    public close(): void {

    }
}