namespace game.base64{
    /*
    * 2019-04-28 andy
    BASE64图集管理器
    */
    export class Base64Manager{
        /**是否使用BASE64图片 */
        public static isUseBase64:boolean=false;

        private loadIndex:number=0;
        private arrLoadAtlas:Array<Base64Type>;
        private callBack:Laya.Handler;
        private progress:Laya.Handler;

        private static _ins:Base64Manager;
        public static get ins():Base64Manager{
            if(!this._ins)
                Base64Manager._ins=new Base64Manager();
            return this._ins;
        }
        constructor(){
            if(Base64Manager._ins != null)
                throw new Error("Base64Manager is single!");
            this.arrLoadAtlas=[];
        }

        public init():void{

        }
        /**
         * 加载BASE64图集
         * @param arrAtlas 图集数组
         * @param callBack 
         * @param progress 
         */
        public loadAtlas(arrAtlas:Array<Base64Type>,callBack:Laya.Handler,progress:Laya.Handler):void{
            if(!arrAtlas || arrAtlas.length==0){
                if(callBack){
                    callBack.run();
                }
                return;
            }
            console.log("开始加载BASE64图集....共计："+arrAtlas.length)
            this.arrLoadAtlas=arrAtlas;
            this.callBack=callBack;
            this.progress=progress;
            this.loadIndex=0;
            this.parseAtlasNext();
        }
        private parseAtlasNext():void{
            //2019-09-17 andy 如果progress默认执行一次就销毁，会出问题
            if(this.progress && this.progress.caller!=this){
                    this.progress.runWith({data:this.loadIndex/this.arrLoadAtlas.length});
                }
            if(this.loadIndex>=this.arrLoadAtlas.length){
                if(this.callBack){
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
        public parseAtlas(base64Type:Base64Type):void{
            //console.log("parse路径:",base64Type.id);
            if(base64Type.base64Img==null || base64Type.base64Img==""){
                this.cacheBase64Json(base64Type);
                return;
            }
            if(base64Type.base64Json==null || base64Type.base64Json==""){
                this.cacheBase64Img(base64Type);
                return;
            }

            //Base64字符串得到json对象
            let json:any=this.base64ToJson(base64Type.base64Json);
            //"meta":{"image":"frame.png,frame1.png","prefix":"frame/"}
            let atlasName:string=json.meta.prefix;
            //console.log("atlasName:",atlasName);
            //切图
            // Laya.loader.load(base64Type.base64Img,Laya.Handler.create(this,()=>{
            //     let imgBig:Laya.Texture=Laya.Loader.getRes(base64Type.base64Img);
            //     let frame:any=null;
            //     for(let key in json.frames){
            //         frame=json.frames[key].frame;
            //         //console.log("key",key,"value",JSON.stringify(json.frames[key]));
            //         let texture:Laya.Texture=Laya.Texture.create(imgBig.bitmap,frame.x,frame.y,frame.w,frame.h);
            //         //缓存到LAYA资源管理
            //         Laya.Loader.cacheRes(atlasName+key,texture);
            //     }
            //     this.parseAtlasNext();
            // }))
            let img:Laya.Image=new Laya.Image();
            img.skin=base64Type.base64Img;
            img.loadImage(base64Type.base64Img,0,0,0,0,Laya.Handler.create(this,()=>{
                let imgBig:Laya.Texture=Laya.Loader.getRes(base64Type.base64Img);
                let frame:any=null;
                for(let key in json.frames){
                    frame=json.frames[key].frame;
                    //console.log("key",key,"value",JSON.stringify(json.frames[key]));
                    let texture:Laya.Texture=Laya.Texture.create(imgBig.bitmap,frame.x,frame.y,frame.w,frame.h);
                    //缓存到LAYA资源管理
                    Laya.Loader.cacheRes(atlasName+key,texture);
                }
                this.parseAtlasNext();
            }))
        }
        /**
         * 预先需要加载的单张图片，比如spine动画
         * @param base64Type 
         */
        public cacheBase64Img(base64Type:Base64Type):void{
            let img:Laya.Image=new Laya.Image();
            img.skin=base64Type.base64Img;
            img.loadImage(base64Type.base64Img,0,0,0,0,Laya.Handler.create(this,()=>{
                let imgBig:Laya.Texture=Laya.Loader.getRes(base64Type.base64Img);
                //缓存到LAYA资源管理
                Laya.Loader.cacheRes(base64Type.id,imgBig);
                this.parseAtlasNext();
            }))
        }
        /**
         * 加载Json
         * @param base64Type 
         */
        public cacheBase64Json(base64Type:Base64Type):void{
            let json:any = this.base64ToJson(base64Type.base64Json);
			Laya.loader.cacheRes(base64Type.id,json);
            this.parseAtlasNext();
        }

        /**
         * 自动检测图片
         * @param img 
         * @param skinName 图集图片，传入此值，img.skin不需要赋值
         * @param base64Type 不是图集的图片，需要传入此值
         */
        public checkImg(img:any,base64Type:Base64Type):void{
            if(!img){
                console.error("参数为空");
                return;
            }
            // if(img instanceof Laya.Image || img instanceof Laya.ProgressBar || img instanceof Laya.Button){
            //     //console.log("img",img);
            // }else{
            //     console.error("不是有效的Laya.Image 或者 Laya.ScrollBar 或者 Laya.Button");
            //     return;
            // }
            if(Base64Manager.isUseBase64){
                if(base64Type){
                    img.skin=base64Type.base64Img;                   
                }else{

                }             
            }else{
                if(base64Type){
                    img.skin=base64Type.id;                 
                }else{
                    
                }   
            }
        }
        /**
         * 自动检测视频
         * @param video 
         * @param base64Type 
         */
        public checkVideo(img:any,base64Type:Base64Type):void{
            if(!img){
                console.error("参数为空");
                return;
            }
            if(Base64Manager.isUseBase64){
                if(base64Type){
                    img.src=base64Type.base64Img;                   
                }else{

                }             
            }else{
                if(base64Type){
                    img.src=base64Type.id;                 
                }else{
                    
                }   
            }
        }
        /**
         * base64 -> Json
         * @param base64Data 
         */
        public base64ToJson(base64:string):any{
            //base64解密获得json字符串
            let jsonStr:string=window.atob(base64);
            //console.log("jsonStr",jsonStr);
            //将json字符串转成json对象
            let json:any=JSON.parse(jsonStr);
            return json;
        }
        /**
         * Base64 -> ByteArray
         * @param base64String 
         */
        public base64ToUint8Array(base64String:string) {
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
        public arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
    }
    /*
    * 2019-04-28 andy
    BASE64 图片类型
    */
    export class Base64Type{
        /** 资源ID*/
        public id:string;
        /** 资源名字 */
        public name:string;
        /**base64 json */
        public base64Json:string;
        /**base64 img */
        public base64Img:string;
        /**param string */
        public paramStr:string;
        /**param number */
        public paramNum:number;
        
        /**
         * 
         * @param id 
         * @param name 
         * @param base64Json 
         * @param base64Img 
         * @param paramStr 
         * @param paramNum 
         */
        constructor(id:string,name:string,base64Json:string="",base64Img:string="",paramStr:string="",paramNum:number=0){
            this.id=id;
            this.name=name;
            this.base64Json=base64Json;
            this.base64Img=base64Img;
            this.paramStr=paramStr;
            this.paramNum=paramNum;
        }
    }
}