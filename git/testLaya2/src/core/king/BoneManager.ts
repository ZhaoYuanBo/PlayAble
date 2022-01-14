namespace game.king{
    import Skeleton  = Laya.Skeleton;
    import Templet   = Laya.Templet;
    /*
    * 2019-04-07 andy
        骨骼动画管理
    */
    export class BoneManager{
        //模板
        private dicTemp:Dictionary<Templet>;
        //骨骼列表
        private dicBonePool:Dictionary<Array<BaseBone>>;
        //骨骼列表
        public dicBone:Dictionary<BaseBone>;
        /**唯一标识ID */
        public boneIndex:number=10000;
        //骨骼列表
        public dicTempIsLoading:Dictionary<BaseBone>;

        private static _ins:BoneManager;
        public static get ins():BoneManager{
            if(!this._ins)
                BoneManager._ins=new BoneManager();
            return this._ins;
        }
        constructor(){
            if(BoneManager._ins != null)
                throw new Error("BoneManager is single!");
        }

        public init(): void {
            //模板
            this.dicTemp=new Dictionary<Templet>();
            //缓存池
            this.dicBonePool=new Dictionary<Array<BaseBone>>();
            this.dicBone=new Dictionary<BaseBone>();
            
        }
        /**
         * 添加骨骼动画
         * @param Base64Type paramNum:模板创建类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装
         * @param isAutoPlay 是否自动播放，默认true
         * @param isLoop     是否循环播放，默认false
         * @param layerName  显示层级，默认scene_king
         */
        public addBone(base64Type:Base64Type,isAutoPlay:boolean=true,isLoop:boolean=false,layerName:LayerName=null):BaseBone{
            let temp:Templet=null;
            if(this.dicTemp.hasKey(base64Type.name)){
                temp=this.dicTemp.get(base64Type.name);
            }else{
                temp = new Templet();
                this.dicTemp.add(base64Type.name,temp);
            }

            let bone:BaseBone=null;
            let objId:number=0;
            if(temp.isParserComplete){
                bone=this.createBone(base64Type.name,base64Type.paramNum,isAutoPlay,isLoop,layerName);
            }else{
                bone=new BaseBone(base64Type.name,base64Type.paramNum,isAutoPlay,isLoop,layerName);
                //已经在加载了，请等待
                if(temp.hasListener(Laya.Event.COMPLETE)){
                    return bone;
                }
                if(Base64Manager.isUseBase64){
                    Laya.loader.cacheRes(base64Type.id,Base64Manager.ins.base64ToUint8Array(base64Type.base64Json));
                }
                temp.on(Laya.Event.COMPLETE, this, this.parseComplete,[base64Type.name]);
                temp.on(Laya.Event.ERROR, this, this.onError,[base64Type.paramNum]);
                temp.loadAni(base64Type.id);
            }
            return bone;
        }
        
        private onError(err:any):void
        {
            console.log("error",err);
        }
        //模板加载完成
        private parseComplete(data:any):void {
            console.log("spine动画模板："+data+" 加载完成！");
            EventManager.ins.event(NoticeEvent.BONE_TEMP_LOAD_FINISH,data);
        }

        private createBone(boneName:string,cacheType:number=0,isAutoPlay:boolean=true,isLoop:boolean=true,layerName:LayerName=null):BaseBone{
            let objId:number=0;
            let bone:BaseBone=null;
            if(this.dicBonePool.hasKey(boneName)){
                let arrSk:Array<BaseBone>=this.dicBonePool.get(boneName);
                if(arrSk && arrSk.length>0){
                    bone= arrSk.shift();
                    console.log("从缓存池取出："+boneName+" 取出后还剩："+arrSk.length);
                }
            }
            //缓存池没有，则创建新的
            if(!bone){
                bone=new BaseBone(boneName,cacheType,isAutoPlay,isLoop,layerName);    
            }

            LayerManager.ins.addChild(bone,LayerName.scene_king);
            return bone;
        }

        /**
         * 根据骨头名字获得骨头模板
         * @param boneName 骨头名字
         */
        public getTemp(boneName:string):Templet{
            if(this.dicTemp.hasKey(boneName)){
                return this.dicTemp.get(boneName);
            }
            return null;
        }
        /**
         * 根据唯一标识ID获得骨骼对象
         * @param objId 唯一标识ID
         */
        public getBone(objId:number):BaseBone{
            if(this.dicBone.hasKey(objId)){
                return this.dicBone.get(objId);
            }
            return null;
        }

        public removeBone(bone:BaseBone):void{
            if(!bone){
                return;
            }
            if(bone.parent){
                bone.removeSelf();
            }
            if(this.dicBone.hasKey(bone.objId)){
                this.dicBone.remove(bone.objId);
                //console.log("回收："+bone.kingType+" 活动个数："+this.dicBone.length);
            }
            //放回缓存池
            let arrSk:Array<BaseBone>=null;
            if(this.dicBonePool.hasKey(bone.kingType)){
                arrSk=this.dicBonePool.get(bone.kingType);  
            }else{
                arrSk=new Array<BaseBone>();
                this.dicBonePool.add(bone.kingType,arrSk);
            }
            if(arrSk){
                arrSk.push(bone);
                //console.log("放入缓存池："+bone.kingType+" 个数："+arrSk.length);
            }
        }
        /**
         * 移除所有骨骼动画
         */
        public removeBoneAll():void{
            for(let bone of this.dicBone.valueOf()){
                this.removeBone(bone);
            }
        }

    }

   
}
