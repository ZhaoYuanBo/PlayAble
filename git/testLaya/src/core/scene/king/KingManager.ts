namespace game.scene.king{
    /*
    * 2019-04-07 andy
        人物管理
    */
    export class KingManager{
        /**动作配置表 */
        public dicAction:Dictionary<Cfg_Action>;
        /**动作配置表 皮肤集合*/
        public dicActionSkin:Dictionary<Array<Cfg_Action>>;
        /**生物列表 */
        private _dicKing:Dictionary<King>;
        /**缓存池 */
        private _dicPool:Dictionary<Array<BaseKing>>;

        /**生物创建编号 创建时系统自动增加 */
        public kingCreateIndex:number=0;

        private static _ins:KingManager;
        public static get ins():KingManager{
            if(!this._ins)
                KingManager._ins=new KingManager();
            return this._ins;
        }
        constructor(){
            if(KingManager._ins != null)
                throw new Error("KingManager is single!");
            this._dicKing=new Dictionary<King>();
            this._dicPool=new Dictionary<Array<BaseKing>>();
        }
        /**
         * 初始化 
         */
        public init():void{
            
        }
        /**
         * 初始化生物
         * @param actions 
         */
        public initData(actions:Array<Cfg_Action>):void{
            this.dicAction=new Dictionary<Cfg_Action>();
            this.dicActionSkin=new Dictionary<Array<Cfg_Action>>();
            for(let cfg of actions){
                this.dicAction.add(cfg.skin+"_"+cfg.actionType+"_"+cfg.actionDirect,cfg);
                if(this.dicActionSkin.hasKey(cfg.skin)){
                    this.dicActionSkin.get(cfg.skin).push(cfg);
                }else{
                    let arr:Array<Cfg_Action>=[];
                    arr.push(cfg);
                    this.dicActionSkin.add(cfg.skin,arr);
                }
            }
            console.log("Cfg_Action 初始化完成");
        }
        /**获得动作配置唯一 */
        public getCfg(skin:string,actionType:ActionType,actionDirect:ActionDirect):Cfg_Action{
            return this.dicAction.get(skin+"_"+actionType+"_"+actionDirect);
        }
        
        /**获得动作配置集合 */
        public getCfgBySkin(skin:string):Array<Cfg_Action>{
            if(!this.dicActionSkin.hasKey(skin)){
                console.warn("请检查动作配置表："+skin+"是否配置！")
            }
            return this.dicActionSkin.get(skin);
        }
        /**获得动作配置集合 */
        public getActionBySkin(skin:string):Array<Action>{
            let arrAction:Array<Action>=[];
            let arrCfg:Array<Cfg_Action> = this.getCfgBySkin(skin);
            for(let cfg of arrCfg){
                //待机,行走,奔跑，为循环播放
                arrAction.push(new Action(cfg,cfg.actionType== ActionType.Wait ||cfg.actionType== ActionType.WALK ||cfg.actionType== ActionType.RUN));
            }
            return arrAction;
        }
        /**
         * 当前场景所有敌人
         */
        public get kings():Array<King>{
            return this._dicKing.valueOf();
        }
        /**
         * 创建生物
         * @param king 
         */
        public createKing(cls:any):King{
            // if(typeof(cls)!='BaseKing'){
            //     return null;
            // }
            let king:King = null;
            let clsName:string = cls.name;
            let arrKing:Array<BaseKing> = this._dicPool.get(clsName);
            if(!arrKing){
                arrKing = [];
                this._dicPool.add(clsName,arrKing);
            }
            if(arrKing.length>0){
                king = arrKing.pop() as King;
                king.reset();
                //console.log("从缓存池取出后剩余:",clsName,king.name,arrKing.length);
            }else{
                king = new cls();
                this.kingCreateIndex++;
                king.objId = this.kingCreateIndex;
                king.name= "king_"+king.objId;
                king.clsName = clsName;
                //console.log("创建新生物:",clsName,king.name);
            }
            return king;
        }
        /**
         * 增加生物
         * @param king 
         */
        public addKing(king:BaseKing):BaseKing{
            if(king instanceof King){
                this._dicKing.add(king.objId,king);
            }
            
            LayerManager.ins.addChild(king,LayerName.scene_king);
            //console.log("显示生物，当前可见数量:",king.clsName,king.name,this._dicKing.length);
            return king;
        }
        /**
         * 移除生物
         * @param clsName 
         * @param kingID 
         */
        public removeKing(kingID:number):void{
            let king:BaseKing=this._dicKing.get(kingID);
            if(king){
                this._dicKing.remove(king.objId);
                let arrKing:Array<BaseKing>=this._dicPool.get(king.clsName);
                if(arrKing){
                    arrKing.push(king);
                    //console.log("放入缓存池:",king.clsName,king.name,arrKing.length);
                }else{
                    //console.log("放入缓存池失败 未知类型:",king.clsName,king.name);
                }
                king.removeSelf();
            }
        }
    }

}
