namespace game.scene.king{
    /*
    * 2020-03-03 andy
      Npc管理
    */
    export class NpcManager{
        /**NPC列表 */
        private _dicNpc:Dictionary<Npc>;
        /**NPC缓存池 */
        private _dicPool:Dictionary<Array<Npc>>;

        /**生物NPC编号 创建时系统自动增加 */
        public npcCreateIndex:number=0;

        private static _ins:NpcManager;
        public static get ins():NpcManager{
            if(!this._ins)
                NpcManager._ins=new NpcManager();
            return this._ins;
        }
        constructor(){
            if(NpcManager._ins != null)
                throw new Error("NpcManager is single!");
            this._dicNpc=new Dictionary<Npc>();
            this._dicPool=new Dictionary<Array<Npc>>();
        }
        /**
         * 初始化 
         */
        public init():void{
            
        }
        /**
         * 当前场景所有NPC
         */
        public get npcs():Array<Npc>{
            return this._dicNpc.valueOf();
        }
        /**
         * 创建NPC
         * @param npc 
         */
        public createNpc(cls:any):Npc{
            // if(typeof(cls)!='Npc'){
            //     return null;
            // }
            let npc:Npc = null;
            let clsName:string = cls.name;
            let arrNpc:Array<Npc> = this._dicPool.get(clsName);
            if(!arrNpc){
                arrNpc = [];
                this._dicPool.add(clsName,arrNpc);
            }
            if(arrNpc.length>0){
                npc = arrNpc.pop() as Npc;
                npc.reset();
                //console.log("从缓存池取出后剩余:",clsName,npc.name,arrNpc.length);
            }else{
                npc = new cls();
                this.npcCreateIndex++;
                npc.objId = this.npcCreateIndex;
                npc.name= "npc_"+npc.objId;
                npc.clsName = clsName;
                //console.log("创建新生物:",clsName,npc.name);
            }
            return npc;
        }
        /**
         * 增加Npc
         * @param npc 
         */
        public addNpc(npc:Npc):Npc{
            if(npc instanceof Npc){
                this._dicNpc.add(npc.objId,npc);
            }
            LayerManager.ins.addChild(npc,LayerName.scene_king);
            //console.log("显示NPC，当前可见数量:",npc.clsName,npc.name,this._dicNpc.length);
            return npc;
        }
        /**
         * 移除生物
         * @param clsName 
         * @param npcID 
         */
        public removeNpc(npcID:number):void{
            let npc:Npc=this._dicNpc.get(npcID);
            if(npc){
                this._dicNpc.remove(npc.objId);
                let arrNpc:Array<Npc>=this._dicPool.get(npc.clsName);
                if(arrNpc){
                    arrNpc.push(npc);
                    //console.log("放入缓存池:",npc.clsName,npc.name,arrNpc.length);
                }else{
                    //console.log("放入缓存池失败 未知类型:",npc.clsName,npc.name);
                }
                npc.removeSelf();
            }
        }
    }

}
