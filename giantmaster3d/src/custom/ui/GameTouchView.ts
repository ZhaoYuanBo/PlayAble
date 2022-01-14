import GameManager from "../../script/GameManager";
import { ui } from "../../ui/layaMaxUI";
import EffectTool from "../../util/EffectTool";
import { CustomWindow } from "./CustomWindow";


export default class GameTouchView extends BaseWindow {


    public ui: ui.GameTouchViewUI;
    constructor() {
        super(ui.GameTouchViewUI);
    }

    mouseDownX: number = 0;
    mouseDownY: number = 0;

    _touchId: number = -1;//当前的触摸id

    targetPos = new Laya.Vector3(0, 0, 0);
    protected init(): void {
        this.ui = this.view as ui.GameTouchViewUI;
        this.onAwake();
        Laya.timer.loop(1,this,this.update);
        Laya.timer.loop(1500,this.ui.imgGuide,()=>{ 

            Laya.Tween.to(this.ui.imgGuide,{x:15},750,null,Laya.Handler.create(this.ui.imgGuide,()=>{ 

                Laya.Tween.to(this.ui.imgGuide,{x:257},750,null,Laya.Handler.create(this.ui.imgGuide,()=>{ 
                    Laya.Tween.clearAll(this.ui.imgGuide);
                }))
            }));
           
        });

        Laya.timer.loop(600,this.ui.img_tap,()=>{ 
            if(GameManager.Instance.isStartBoss){ 
                this.ui.tapend.visible = true;
                Laya.Tween.to(this.ui.img_tap,{scaleX:0.8,scaleY:0.8},300,null,Laya.Handler.create(this.ui.img_tap,()=>{ 
                    Laya.Tween.to(this.ui.img_tap,{scaleX:0.5,scaleY:0.5},300,null,Laya.Handler.create(this.ui.img_tap,()=>{ 
                        Laya.Tween.clearAll(this.ui.img_tap);
                    }))
                }))
            }
        })

        this.ui.btn_download.on(Laya.Event.MOUSE_DOWN,this.ui.btn_download,()=>{ 

            HttpManager.ins.link(Define.DOWNLOAD_URL);
        })
    }
    onAwake() {
        this.ui.on(Laya.Event.MOUSE_DOWN, this, this.onBegin);
        this.ui.on(Laya.Event.MOUSE_UP, this, this.onEnd);
        this.ui.on(Laya.Event.MOUSE_OUT, this, this.onEnd);
    }

    onBegin(e: Laya.Event) {
        
        if(GameManager.Instance.isend){ 
            HttpManager.ins.link(Define.DOWNLOAD_URL);
            return;
        }
        if (this._touchId > 0) { //已经存在触摸了
            return;
        }
        
        this._touchId = e.touchId;

        this.ui.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove)
        this.mouseDownX = e.stageX;
        this.mouseDownY = e.stageY;
        GameManager.Instance.initGame(); //游戏开始
        this.ui.guide.visible=false;
    }
    
    private update():void{ 
        let camera = GameManager.Instance._camera;
        if(camera){ 
            let role = GameManager.Instance._uiPoint;
            let point = EffectTool.WorldToScreen2(camera,role.position);
           
            // this.ui.ui_center.y =point.y-(220*role.localScaleX*0.9);
            if(GameManager.Instance.isend){ 
                this.ui.x = point.x-410;
            }else{ 
                this.ui.x = point.x-360;
            }
           
        }
    }
    onMouseMove(e: Laya.Event) {
        if (e.touchId != this._touchId) {
            return;
        }

        let _mouseDownx = e.stageX;
        let _mouseDowny = e.stageY;

        let _currx = GameManager.Instance.role.transform.position.x;  //角色的坐标
        let _currz = GameManager.Instance.role.transform.position.z; //角色的前进坐标

        let _x: number = 0;
        let _t: number = 0.02;

        let angle: number = Math.atan2(_mouseDowny - this.mouseDownY, _mouseDownx - this.mouseDownX);  //弧度
        let turnRoation = Math.ceil(angle * 180 / Math.PI);  //弧度转成角度

        if (turnRoation < -90 || turnRoation > 90) {   //左侧
            _x = _currx + (this.mouseDownX - _mouseDownx) * _t;
        }
        else { //右侧 
            _x = _currx - (_mouseDownx - this.mouseDownX) * _t;
        }

        if (_x < -4) {
            _x = -4;
        } else if (_x > 4) {
            _x = 4;
        }

        this.targetPos.setValue(_x, 0,_currz );

        GameManager.Instance.role.transform.localPosition = this.targetPos;
        this.mouseDownX = _mouseDownx;
        this.mouseDownY = _mouseDowny;
    }

    onEnd(e: Laya.Event) {
        if (e.touchId != this._touchId) {
            return;
        }
        this.ui.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);

        this._touchId = -1;
    }
}