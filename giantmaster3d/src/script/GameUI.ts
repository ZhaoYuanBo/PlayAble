import { ui } from "./../ui/layaMaxUI";
import { CustomDefine } from "../custom/CustomDefine";
import { Cfg_Level } from "../custom/config/Struct";
import { GameCtrl } from "./GameCtrl";
import { DataConfig } from "../custom/config/DataConfig";
import { CustomWindow } from "../custom/ui/CustomWindow";
import GameManager from "./GameManager";
import EffectTool from "../util/EffectTool";
/**
 * 
 */
export default class GameUI extends BaseWindow {
    /**射线 */
    private ray: Laya.Ray;

    /**是否下载 */
    private isDownload: boolean = false;
    private mousePoint: Laya.Vector2;



    public ui: ui.GameUI;
    constructor() {
        super(ui.GameUI);
    }
    public init(): void {
        this.ui = this.view as ui.GameUI;

        // SceneManager.ins.setBackground(CustomBase64.bg_game); 

        // tt=new TweenTarget(CustomDefine.animGuideClick,this.ui.imgGuide,TweenManager.ins.creatProp(TweenPropType.GUIDE_CLICK,[this.ui.imgGuide.y]),500);
        // TweenManager.ins.regTween(tt);
        // TweenManager.ins.play(true,CustomDefine.animGuideClick);

        GameCtrl.ins.gameUI = this;
        this.loadScene();
        UIManager.ins.openWindow(CustomWindow.gameTouch);

       
    }

    public open(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.stageClick);
        Laya.timer.frameLoop(1, this, this.update);

        
        // //修正进入游戏时，背景图一闪留白情况
        // let sp: Sprite = new Sprite();

        // sp.graphics.drawRect(0, 0, Define.DeviceW, Define.DeviceH, "#000000");
        // LayerManager.ins.addChild(sp, LayerName.top);
        // Laya.timer.once(700, this, () => { sp.removeSelf(); });
    }
    public close(): void {
        Laya.stage.off(Laya.Event.CLICK, this, this.stageClick);
        Laya.timer.clearAll(this);
    }
    public viewClick(sp: Laya.Sprite): void {
        super.viewClick(sp);
        let spName: string = sp.name;
        switch (spName) {
            case "btnDownload":
                this.isDownload = true;
                //2019-05-01 跳到下载页面，并未下载，直接返回，这时还能继续游戏
                Laya.timer.once(2000, this, () => {
                    this.isDownload = false;
                })
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                break;
            case "btnCreateFarm":
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                break;
            default:
                break;
        }
    }

    private loadScene(): void {
        // let scene = Laya.loader.getRes(Define.CDN+"/3d/scene/LayaScene_PlayAble/Conventional/PlayAble.ls") as Laya.Scene3D;
        //  LayerManager.ins.addChild(scene,LayerName.scene_king);
        // GameManager.Instance.init(scene);
        // console.log(scene,"scene----------------")
        Laya.Scene3D.load(Define.CDN+"/3d/scene/LayaScene_PlayAble/Conventional/PlayAble.ls", Laya.Handler.create(null, (scene) => {
            // Scene3DManager.ins.init(scene);
           
            GameManager.Instance.init(scene,()=>{ 
                LayerManager.ins.addChild(scene, LayerName.scene);

            });
            console.log(scene, "scene----------------");
        }));
    }
    private update(): void {
        // GameManager.Instance.set2dPos(this.ui.ui_roleshow);
        this.ui.txt_my.text = GameManager.Instance._myheadNum.toString();
        if(GameManager.Instance.isStartBoss){ 
            this.ui.ui_roleshow.visible =false;
        }
        let camera = GameManager.Instance._camera;
        if(camera){ 
            let role = GameManager.Instance.role.transform;
            let point = EffectTool.WorldToScreen2(camera,role.position);
           
            this.ui.ui_roleshow.y =point.y-(230*role.localScaleX*0.9);
            this.ui.ui_roleshow.x = point.x;
           
        }
       
    }
    private stageClick(): void {
        // if(GameCtrl.ins.isGame){
        //     return;
        // }
        TweenManager.ins.stop(CustomDefine.animGuideClick);
        this.ui.lblGuide.visible = false;

        //this.gameMono.startGame();
        // //从屏幕空间生成射线
        // this.mousePoint = new Laya.Vector2();
        // this.mousePoint.x = Laya.MouseManager.instance.mouseX;//鼠标X坐标
        // this.mousePoint.y = Laya.MouseManager.instance.mouseY;//鼠标Y坐标
        // this.camera.viewportPointToRay(this.mousePoint, this.ray);//从摄像机到鼠标点击位置生成射线
        // //console.log("射线：",this.ray.origin,this.ray.direction);
        // this.scene3d.physicsSimulation.rayCast(this.ray, this._outHitInfo, 200);//生成射线
        // //console.log("射击：",this._outHitInfo.succeeded,this._outHitInfo.point);
        // // if (this._outHitInfo.succeeded) {
        //     //this.fire();
        // // }else{
        // //     this.isFire=false;
        // // } 
    }

    private gameOver(isFail: boolean): void {
        //GameCtrl.ins.isGameOver=true;
        UIManager.ins.openWindow(CustomWindow.download);
        this.reset();
    }

    /**重置数据 */
    private reset(): void {
        // GameCtrl.ins.isGame=false;
        GameCtrl.ins.reset();

    }


}