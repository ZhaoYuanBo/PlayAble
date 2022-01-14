/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 人物基类 【laya2专用】
         */
        class BaseKing extends Laya.Animation {
            constructor() {
                super();
                /**当前运动速度 */
                this.speed = 1;
                /**皮肤资源是否加载 */
                this.isLoad = false;
            }
            /**
             * 需在子类设置
             */
            init() {
                this._dicActionTypeNext = new Dictionary();
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                this.on(Laya.Event.STOPPED, this, this.onStop);
                this.on(Laya.Event.COMPLETE, this, this.onComplete);
            }
            /**
             * 设置皮肤
             * @param skinData 皮肤数据
             * @param isAdd    是否显示,默认是true
             */
            setSkin(skinData, isAdd = true) {
                if (skinData) {
                    this.skinData = skinData;
                }
                else {
                    console.log("this.skinData is null!");
                }
                //Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
                if (this.skinData.arrAction && this.skinData.arrAction.length > 0) {
                    //创建零散动画【适合小游戏】
                    let action;
                    for (let i = 0; i < this.skinData.arrAction.length; i++) {
                        action = this.skinData.arrAction[i];
                        Laya.Animation.createFrames(this.aniUrls(action.actionType.toString(), action.frameCount), this.skinData.kingType + "_" + action.actionType);
                    }
                }
                else {
                    //创建动画模板
                    for (let i = 0; i < this.skinData.cutRow; i++) {
                        Laya.Animation.createFrames(this.aniUrls(i.toString(), this.skinData.cutCol), this.skinData.kingType + "_" + i);
                    }
                }
                this.isLoad = true;
                this.setActionType(this.curAticonType);
                if (isAdd) {
                    king.KingManager.ins.addKing(this);
                }
                //}));
            }
            /**
             * 设置动作类型
             * @param at 动作类型
             * @param isLoop 是否循环
             */
            setActionType(at, isLoop = true) {
                this.curAticonType = at;
                if (this.isLoad) {
                    if (at != undefined && at >= 0) {
                        this.play(0, isLoop, this.skinData.kingType + "_" + at);
                        this.curAticonState = this.getActionState(at);
                    }
                }
            }
            getActionState(at) {
                let ret = null;
                ;
                switch (at) {
                    case ActionType.Left:
                    case ActionType.Right:
                    case ActionType.Up:
                    case ActionType.Down:
                    case ActionType.Left_up:
                    case ActionType.Left_down:
                    case ActionType.Right_up:
                    case ActionType.Right_down:
                        ret = ActionState.MOVE;
                        break;
                    case ActionType.JUMP:
                        ret = ActionState.JUMP;
                        break;
                    case ActionType.ROLL:
                        ret = ActionState.ROLL;
                        break;
                    case ActionType.DEAD:
                        ret = ActionState.DEAD;
                        break;
                    default:
                        break;
                }
                return ret;
            }
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            setActionState(as) {
                this.curAticonState = as;
            }
            /**
             * 注册这个动作完成后，下个动作该做啥动作
             * @param at
             * @param atNext
             */
            regAtcionTypeNext(at, atNext) {
                this._dicActionTypeNext.add(at, atNext);
            }
            /**
             * update
             */
            update() {
            }
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            onLabel(ev) {
                console.log(`complte ` + ev);
            }
            /**
             * 只播放一次
             * @param ev
             */
            onStop(ev) {
                //console.log(`onStop ` + ev);
                // this.visible=false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            }
            /**
             * 循环播放，每次播放完成事件
             * @param ev
             */
            onComplete(ev) {
                //console.log(`onComplete ` + ev);
                if (this._dicActionTypeNext.hasKey(this.curAticonType)) {
                    this.setActionType(this._dicActionTypeNext.get(this.curAticonType));
                }
            }
            onRemoved(e) {
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.isLoad = false;
            }
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * actionName  动作的名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            aniUrls(actionName, length) {
                var urls = [];
                for (var i = 1; i <= length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(this.skinData.atlasName + "/" + this.skinData.kingType + "_" + actionName + "_" + i + ".png");
                }
                return urls;
            }
        }
        king.BaseKing = BaseKing;
        /**
         * 动作数据
         */
        class Action {
            /**
             *
             * @param actionType 动作类型
             * @param frameCount 动作帧数
             */
            constructor(actionType, frameCount) {
                this.actionType = actionType;
                this.frameCount = frameCount;
            }
        }
        king.Action = Action;
        /**
         * 皮肤数据
         */
        class SkinData {
            constructor(atlasName, kingType, arrAction, cutRow = 0, cutCol = 0) {
                /**图集名字 */
                this.atlasName = "";
                /**角色类型 */
                this.kingType = "";
                /**图集动画行数 */
                this.cutRow = 1;
                /**图集动画列数 */
                this.cutCol = 1;
                this.atlasName = atlasName;
                this.kingType = kingType;
                this.cutRow = cutRow;
                this.cutCol = cutCol;
                this.arrAction = arrAction;
            }
        }
        king.SkinData = SkinData;
        /*
        * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
        */
        let ActionType;
        (function (ActionType) {
            /**0 待机 */
            ActionType[ActionType["Wait"] = 0] = "Wait";
            /**1 左移 */
            ActionType[ActionType["Left"] = 1] = "Left";
            /**2 右移 */
            ActionType[ActionType["Right"] = 2] = "Right";
            /**3 上移 */
            ActionType[ActionType["Up"] = 3] = "Up";
            /**4 下移 */
            ActionType[ActionType["Down"] = 4] = "Down";
            /**5 左上移 */
            ActionType[ActionType["Left_up"] = 5] = "Left_up";
            /**6 左下移 */
            ActionType[ActionType["Left_down"] = 6] = "Left_down";
            /**7 右上移 */
            ActionType[ActionType["Right_up"] = 7] = "Right_up";
            /**8 右下移 */
            ActionType[ActionType["Right_down"] = 8] = "Right_down";
            /**9 跳跃 */
            ActionType[ActionType["JUMP"] = 9] = "JUMP";
            /**10 翻滚 */
            ActionType[ActionType["ROLL"] = 10] = "ROLL";
            /**11 攻击 */
            ActionType[ActionType["ATTACK"] = 11] = "ATTACK";
            /**12 被攻击 */
            ActionType[ActionType["ATTACKED"] = 12] = "ATTACKED";
            /**13 死亡 */
            ActionType[ActionType["DEAD"] = 13] = "DEAD";
        })(ActionType = king.ActionType || (king.ActionType = {}));
        /*
       * 动作状态;
       */
        let ActionState;
        (function (ActionState) {
            /**待机状态 */
            ActionState[ActionState["NONE"] = 0] = "NONE";
            /**移动状态 */
            ActionState[ActionState["MOVE"] = 1] = "MOVE";
            /**跳跃状态 */
            ActionState[ActionState["JUMP"] = 2] = "JUMP";
            /**翻滚状态 */
            ActionState[ActionState["ROLL"] = 3] = "ROLL";
            /**攻击状态 */
            ActionState[ActionState["ATTACK"] = 4] = "ATTACK";
            /**死亡状态 */
            ActionState[ActionState["DEAD"] = 5] = "DEAD";
        })(ActionState = king.ActionState || (king.ActionState = {}));
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseKing.js.map