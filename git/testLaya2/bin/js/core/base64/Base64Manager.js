var game;
(function (game) {
    var base64;
    (function (base64_1) {
        /*
        * 2019-04-28 andy
        BASE64图集管理器
        */
        class Base64Manager {
            constructor() {
                this.loadIndex = 0;
                if (Base64Manager._ins != null)
                    throw new Error("Base64Manager is single!");
                this.arrLoadAtlas = [];
            }
            static get ins() {
                if (!this._ins)
                    Base64Manager._ins = new Base64Manager();
                return this._ins;
            }
            init() {
            }
            /**
             * 加载BASE64图集
             * @param arrAtlas 图集数组
             * @param callBack
             * @param progress
             */
            loadAtlas(arrAtlas, callBack, progress) {
                if (!arrAtlas || arrAtlas.length == 0) {
                    if (callBack) {
                        callBack.run();
                    }
                    return;
                }
                console.log("开始加载BASE64图集....共计：" + arrAtlas.length);
                this.arrLoadAtlas = arrAtlas;
                this.callBack = callBack;
                this.progress = progress;
                this.loadIndex = 0;
                this.parseAtlasNext();
            }
            parseAtlasNext() {
                //2019-09-17 andy 如果progress默认执行一次就销毁，会出问题
                if (this.progress && this.progress.caller != this) {
                    this.progress.runWith({ data: this.loadIndex / this.arrLoadAtlas.length });
                }
                if (this.loadIndex >= this.arrLoadAtlas.length) {
                    if (this.callBack) {
                        this.callBack.run();
                    }
                    return;
                }
                this.parseAtlas(this.arrLoadAtlas[this.loadIndex++]);
            }
            /**
             * 解析BASE64图集
             * @param base64Type
             */
            parseAtlas(base64Type) {
                //console.log("parse路径:",base64Type.id);
                if (base64Type.base64Img == null || base64Type.base64Img == "") {
                    this.cacheBase64Json(base64Type);
                    return;
                }
                if (base64Type.base64Json == null || base64Type.base64Json == "") {
                    this.cacheBase64Img(base64Type);
                    return;
                }
                //base64解密获得json字符串
                let json = this.base64ToJson(base64Type.base64Json);
                //"meta":{"image":"frame.png,frame1.png","prefix":"frame/"}
                let atlasName = json.meta.prefix;
                console.log("atlasName:", atlasName);
                //切图 【laya2专用】
                Laya.loader.load(base64Type.base64Img, Laya.Handler.create(this, () => {
                    let imgBig = Laya.Loader.getRes(base64Type.base64Img);
                    let frame = null;
                    for (let key in json.frames) {
                        frame = json.frames[key].frame;
                        //console.log("key",key,"value",JSON.stringify(json.frames[key]));
                        if (imgBig.bitmap instanceof Laya.Texture || imgBig.bitmap instanceof Laya.Texture2D) {
                            let texture = Laya.Texture.create(imgBig.bitmap, frame.x, frame.y, frame.w, frame.h);
                            //缓存到LAYA资源管理
                            Laya.Loader.cacheRes(atlasName + key, texture);
                        }
                        else {
                            console.log("图集->" + key + " 不存在");
                        }
                    }
                    this.parseAtlasNext();
                }));
            }
            /**
             * 预先需要加载的单张图片，比如spine动画
             * @param base64Type
             */
            cacheBase64Img(base64Type) {
                //【laya2专用】
                Laya.loader.load(base64Type.base64Img, Laya.Handler.create(this, () => {
                    let imgBig = Laya.Loader.getRes(base64Type.base64Img);
                    //缓存到LAYA资源管理
                    Laya.Loader.cacheRes(base64Type.id, imgBig);
                    this.parseAtlasNext();
                }));
            }
            /**
             * 加载Json
             * @param base64Type
             */
            cacheBase64Json(base64Type) {
                let json = this.base64ToJson(base64Type.base64Json);
                Laya.loader.cacheRes(base64Type.id, json);
                this.parseAtlasNext();
            }
            /**
             * 检测图片
             * @param img
             * @param skinName 图集图片，传入此值，img.skin不需要赋值
             * @param base64Type 不是图集的图片，需要传入此值
             */
            checkImg(img, base64Type) {
                if (!img) {
                    console.error("参数为空");
                    return;
                }
                // if(img instanceof Laya.Image || img instanceof Laya.ProgressBar || img instanceof Laya.Button){
                //     //console.log("img",img);
                // }else{
                //     console.error("不是有效的Laya.Image 或者 Laya.ScrollBar 或者 Laya.Button");
                //     return;
                // }
                if (Base64Manager.isUseBase64) {
                    if (base64Type) {
                        img.skin = base64Type.base64Img;
                        // Laya.loader.load(base64Type.base64Img,Laya.Handler.create(this,(res)=>{
                        // }))                  
                    }
                    else {
                    }
                }
                else {
                    if (base64Type) {
                        img.skin = base64Type.id;
                    }
                    else {
                    }
                }
            }
            /**
             * 自动检测视频
             * @param video
             * @param base64Type
             */
            checkVideo(video, base64Type) {
                if (!video) {
                    console.error("参数为空");
                    return;
                }
                if (Base64Manager.isUseBase64) {
                    if (base64Type) {
                        video.src = base64Type.base64Img;
                    }
                    else {
                    }
                }
                else {
                    if (base64Type) {
                        video.src = base64Type.id;
                    }
                    else {
                    }
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
            base64ToUint8Array(base64String) {
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
             * ByteArray -> Base64
             * @param buffer
             */
            arrayBufferToBase64(buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            }
            /**
             * 加载BASE64资源 【laya2专用】
             * @param arrAtlas 资源数组
             * @param callBack
             * @param progress
             */
            load(arrAtlas, callBack, progress) {
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
                    //console.log("fileType:",fileType,base64type.id);
                    switch (fileType) {
                        case "ls":
                            Laya.loader.cacheRes(base64type.id, Laya.Scene3D.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lh":
                            Laya.loader.cacheRes(base64type.id, Laya.Sprite3D.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lmat":
                            Laya.loader.cacheRes(base64type.id, Laya.BaseMaterial.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lav":
                            Laya.loader.cacheRes(base64type.id, Laya.Avatar._parse(this.base64ToJson(base64type.base64Json)));
                            break;
                        case "lm": //二进制，模型数据文件，相当于FBX格式的转换，可用MeshSprite3D类加载
                            Laya.loader.cacheRes(base64type.id, Laya.Mesh.load(this.base64ToJson(base64type.base64Json), null));
                            break;
                        case "lani": //二进制，动画数据文件,包含骨骼或帧动画信息
                            Laya.loader.cacheRes(base64type.id, Laya.AnimationClip.load(this.base64ToJson(base64type.base64Json), null));
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
                    }));
                }
                else {
                    Laya.Texture2D.load(game.Define.CDN + "/atlas/" + bt.id, Laya.Handler.create(this, (tex) => {
                        if (mat instanceof Laya.BlinnPhongMaterial) {
                            mat.albedoTexture = tex;
                            if (color) {
                                mat.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
                            }
                        }
                    }));
                }
            }
        }
        /**是否使用BASE64图片 */
        Base64Manager.isUseBase64 = false;
        base64_1.Base64Manager = Base64Manager;
        /*
        * 2019-04-28 andy
        BASE64 图片类型
        */
        class Base64Type {
            /**
             *
             * @param id
             * @param name
             * @param base64Json
             * @param base64Img
             * @param paramStr
             * @param paramNum
             */
            constructor(id, name, base64Json = "", base64Img = "", paramStr = "", paramNum = 0) {
                this.id = id;
                this.name = name;
                this.base64Json = base64Json;
                this.base64Img = base64Img;
                this.paramStr = paramStr;
                this.paramNum = paramNum;
            }
        }
        base64_1.Base64Type = Base64Type;
    })(base64 = game.base64 || (game.base64 = {}));
})(game || (game = {}));
//# sourceMappingURL=Base64Manager.js.map