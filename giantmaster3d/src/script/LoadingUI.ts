import { ui } from "./../ui/layaMaxUI";
import { LoadingCtrl } from "./LoadingCtrl";
import { CustomDefine } from "../custom/CustomDefine";
import { CustomBase64 } from "../custom/res/CustomBase64";

/**
 */
export default class LoadingUI extends BaseWindow {
    private loadIndex: number = 0;
    private progressHandler: Laya.Handler;

    private arrLoad: Array<Function>;
    public ui: ui.LoadingUI;
    constructor() {
        super(ui.LoadingUI);
    }

    protected init(): void {
        this.ui = this.view as ui.LoadingUI;
    }
    public open(): void {
        this.progressHandler = Laya.Handler.create(this, this.HTTP_PROGRESS, null, false);
        EventManager.ins.on(NoticeEvent.HTTP_PROGRESS, this, this.HTTP_PROGRESS);
        this.arrLoad = [this.loadRes, this.loadResBase64, this.loadDataConfig];
        this.loadIndex = 0;
        this.loadNext();
       
    }

    public loadNext(): void {
        //console.log("loadIndex="+this.loadIndex);
        if (this.loadIndex >= this.arrLoad.length) {
            //加载结束
            EventManager.ins.event(NoticeEvent.GAME_RES_LOAD_FINISH);
            Global.platform.login();
        } else {
            let func = this.arrLoad[this.loadIndex++];
            if (func) {
                func.call(this);
            }
        }
    }

    private loadDataConfig(): void {
        LoadingCtrl.ins.preloadDataConfig(Laya.Handler.create(this, this.loadNext));
    }

    private loadRes(): void {
        if (Base64Manager.isUseBase64) {
            let arrAtlas: Array<Base64Type> = [
                CustomBase64.atlas_game, CustomBase64.atlas_frame,
            ]
            Base64Manager.ins.loadAtlas(arrAtlas, Laya.Handler.create(this, this.loadNext), this.progressHandler);
   
        } else {
            let arr = [{
                url: Define.CDN + "/atlas/game.atlas",
                type: Laya.Loader.ATLAS
            }, {
                url: Define.CDN + "/atlas/frame.atlas",
                type: Laya.Loader.ATLAS
            }];
            ResManager.ins.preload(arr, Laya.Handler.create(this, this.loadNext), this.progressHandler);
        }

    }
    private loadResBase64(): void {
        if (Base64Manager.isUseBase64) {
            let arrAtlas: Array<Base64Type> = CustomBase64.arrLoad;
            this.load(arrAtlas, Laya.Handler.create(this, this.loadNext), this.progressHandler);
        } else {
            this.loadNext();
        }
    }
    private loadSound(): void {
        let arr = [{
            url: Define.CDN + CustomDefine.SOUND_MAIN,
            type: Laya.Loader.SOUND
        }];
        SoundManager.ins.preload(arr, Laya.Handler.create(this, this.loadNext), this.progressHandler)
    }


    public HTTP_PROGRESS(e: any): void {//console.log("Http_progress",e.data);
        let curProgress: number = Number(e.data);
        let progressValue: number = (this.loadIndex + curProgress)*2 / this.arrLoad.length;
        this.ui.bar.value = progressValue;
    }

    /**
         * 加载BASE64资源 【laya2专用】
         * @param arrAtlas 资源数组
         * @param callBack
         * @param progress
         */
    private load(arrAtlas, callBack, progress) {
        if (!arrAtlas || arrAtlas.length == 0) {
            if (callBack) {
                callBack.run();
            }
            return;
        }
        console.log("开始加载BASE64资源....共计：" + arrAtlas.length);
        for (let base64type of arrAtlas) {
            let fileType = base64type.id.substr(base64type.id.lastIndexOf(".") + 1, base64type.id.length);
            if (base64type.id.indexOf("Assets/") >= 0) {
                base64type.id = base64type.id.substring(base64type.id.indexOf("Assets/"), base64type.id.length);
            }
            console.log("fileType:", fileType, base64type.id);
            switch (fileType) {

                case "jpg":
                    this.cacheBase64Img(base64type);
                    console.log("---------jpg成功");
                    break;
                case "png":
                    this.cacheBase64Img(base64type);
                    console.log("---------png成功");
                    break;
                case "ls":
                    Laya.loader.cacheRes(base64type.id, Laya["Scene3DUtils"]["_parseScene"](this.base64ToJson(base64type.base64Json)));
                    console.log("----------ls成功")
                    break;
                case "lh":
                    Laya.loader.cacheRes(base64type.id, Laya["Scene3DUtils"]["_parse"](this.base64ToJson(base64type.base64Json)));
                    console.log("---------lh成功");
                    break;
                case "lmat":
                    Laya.loader.cacheRes(base64type.id, Laya.Material._parse(this.base64ToJson(base64type.base64Json)));
                    console.log("---------lmat成功");
                    break;
                case "lav":
                    Laya.loader.cacheRes(base64type.id, Laya.Avatar._parse(this.base64ToJson(base64type.base64Json)));
                    console.log("---------lav成功");
                    break;
                case "lm": //二进制，模型数据文件，相当于FBX格式的转换，可用MeshSprite3D类加载
                    Laya.loader.cacheRes(base64type.id, Laya["MeshReader"]["_parse"](this.base64ToUint8Array(base64type.base64Json)));
                    console.log("---------lm成功");
                    break;
                case "lani": //二进制，动画数据文件,包含骨骼或帧动画信息
                    Laya.loader.cacheRes(base64type.id, Laya["AnimationClip"]["_parse"](this.base64ToUint8Array(base64type.base64Json)));
                    console.log("---------lani成功");
                    break;
                default:
                    break;
            }
        }

        if (callBack) {
            callBack.run();
        }

    }

    /**
       * base64 -> Json
       * @param base64Data
       */
    base64ToJson(base64) {
        //base64解密获得json字符串
        let jsonStr = window.atob(base64);
        //console.log("jsonStr",jsonStr);
        //将json字符串转成json对象
        let json = JSON.parse(jsonStr);
        return json;
    }

    /**
       * Base64 -> ByteArray
       * @param base64String 
       */
    public base64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    /**
           * 预先需要加载的单张图片，比如spine动画
           * @param base64Type 
           */
    public cacheBase64Img(base64Type: Base64Type): void {
        //【laya2专用】
        Laya.loader.load(base64Type.base64Img, Laya.Handler.create(this, () => {
            let imgBig: Laya.Texture = Laya.Loader.getRes(base64Type.base64Img);
            //缓存到LAYA资源管理
            console.error("imgbig", imgBig);
            Laya.Loader.cacheRes(base64Type.id, imgBig);

        }))
    }

    /**
         * 材质赋值 【laya2专用】
         * @param mat  Laya.BaseMaterial
         * @param bt   Base64Type
         * @param color  Laya.Vector4
         */
    checkMaterial(mat, bt, color = null) {
        if (Base64Manager.isUseBase64) {
            Laya.loader.load(bt.base64Img, Laya.Handler.create(this, (e) => {
                //console.log(e);
                if (mat instanceof Laya.BlinnPhongMaterial) {
                    mat.albedoTexture = e.bitmap;
                    if (color) {
                        mat.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
                    }
                }
            }
            ));
        } else {
            Laya.Texture2D.load(game.Define.CDN + "/atlas/" + bt.id, Laya.Handler.create(this, (tex) => {
                if (mat instanceof Laya.BlinnPhongMaterial) {
                    mat.albedoTexture = tex;
                    if (color) {
                        mat.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
                    }
                }
            }
            ));
        }
    }
}