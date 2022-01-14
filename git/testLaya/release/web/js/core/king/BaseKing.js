var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var king;
    (function (king) {
        /**
         * 人物基类
         */
        var BaseKing = /** @class */ (function (_super) {
            __extends(BaseKing, _super);
            function BaseKing() {
                var _this = _super.call(this) || this;
                /**皮肤资源是否加载 */
                _this.isLoad = false;
                /**角色 速度 */
                _this.speed = 1;
                /**角色 生命 */
                _this.hp = 1;
                /**角色 魔法 */
                _this.mp = 1;
                /**角色 伤害*/
                _this.atk = 1;
                /**角色 伤害 暴击*/
                _this.atkcri = 1;
                /**角色 防御*/
                _this.def = 1;
                /**角色 命中率 最大值100,默认100*/
                _this.hitRate = 100;
                /**角色 暴击率 最大值10000,默认0*/
                _this.criRate = 0;
                /**攻击距离 */
                _this.atkDistance = 1;
                /**近身距离 要比攻击距离小*/
                _this.stopDistance = 0;
                _this.dicAction = new Dictionary();
                _this.on(Laya.Event.ADDED, _this, _this.onAdd);
                return _this;
            }
            BaseKing.prototype.onAdd = function (e) {
                this.off(Laya.Event.ADDED, this, this.onAdd);
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
                this.on(Laya.Event.LABEL, this, this.onLabel);
                this.on(Laya.Event.STOPPED, this, this.onStop);
                this.on(Laya.Event.COMPLETE, this, this.onComplete);
                this.onCreate();
            };
            BaseKing.prototype.onRemoved = function (e) {
                this.on(Laya.Event.ADDED, this, this.onAdd);
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
                this.off(Laya.Event.LABEL, this, this.onLabel);
                this.off(Laya.Event.STOPPED, this, this.onStop);
                this.off(Laya.Event.COMPLETE, this, this.onComplete);
                this.onRemove();
            };
            /**
             * 需在子类设置
             */
            BaseKing.prototype.init = function () {
            };
            /**
             * 设置皮肤
             * @param skinData 皮肤数据
             * @param isAdd    是否显示,默认是true
             */
            BaseKing.prototype.setSkin = function (skinData, isAdd) {
                if (isAdd === void 0) { isAdd = true; }
                this.isLoad = false;
                if (skinData) {
                    this.skinData = skinData;
                }
                else {
                    console.log("this.skinData is null!");
                }
                //Laya.loader.load(Define.CDN+"/atlas/"+this.skinData.atlasName+".atlas",Laya.Handler.create(this,()=>{
                if (this.skinData.arrAction && this.skinData.arrAction.length > 0) {
                    //创建零散动画【适合小游戏】
                    var action = void 0;
                    for (var i = 0; i < this.skinData.arrAction.length; i++) {
                        action = this.skinData.arrAction[i];
                        this.dicAction.add(action.actionName, action);
                        Laya.Animation.createFrames(this.aniUrls(action.actionName, action.frameCount), this.skinData.kingType + "_" + action.actionName);
                    }
                }
                else {
                    //创建动画模板
                    for (var i = 0; i < this.skinData.cutRow; i++) {
                        Laya.Animation.createFrames(this.aniUrls(i.toString(), this.skinData.cutCol), this.skinData.kingType + "_" + i);
                    }
                }
                this.isLoad = true;
                this.setActionType(this.curAticonType);
                if (isAdd) {
                    king.KingManager.ins.addKing(this);
                }
                //}));
            };
            /**
             * 注册此次动作播放完成后，下一个动作
             * @param atcionType
             * @param action
             */
            BaseKing.prototype.regNextAction = function (atcionType, actionNaxtType) {
                if (!this.arrNextAction) {
                    this.arrNextAction = [];
                }
                this.arrNextAction[atcionType] = actionNaxtType;
            };
            /**
             * 设置动作类型
             * @param at 动作类型
             * @param isLoop 是否循环,默认true
             */
            BaseKing.prototype.setActionType = function (at, isLoop) {
                if (isLoop === void 0) { isLoop = true; }
                if (at == undefined || at < 0) {
                    return;
                }
                if (this.isLoad) {
                    this.visible = true;
                    //2019-12-03 切换动作时，动作宽高尺寸不一致，修改锚点,角色的中心点设置脚下中心
                    var action = this.dicAction.get(at + "_" + this.curActionDirect);
                    if (action) {
                        isLoop = action.isLoop;
                        this.width = action.width;
                        this.height = action.height;
                        this.pivot((this.width >> 1) + action.pivotOffX, this.height + action.pivotOffY);
                    }
                    this.play(0, isLoop, this.skinData.kingType + "_" + at + "_" + this.curActionDirect);
                    this.curAticonType = at;
                    this.curAticonState = this.getActionState(at);
                }
            };
            /**
             * 2019-12-09 为了节约资源，角色8方向美术只做5个方向即可
             * @param at 动作类型 左右，左上右上，左下右下，对称即可
             */
            BaseKing.prototype.setActionDirect = function (at) {
                if (this.curDirect == at) {
                    return;
                }
                var isDirect = true;
                var tempAticonDirect = at;
                switch (at) {
                    case ActionDirect.Left:
                    case ActionDirect.Right:
                        tempAticonDirect = ActionDirect.Right;
                        break;
                    case ActionDirect.Up:
                        break;
                    case ActionDirect.Down:
                        break;
                    case ActionDirect.Left_up:
                    case ActionDirect.Right_up:
                        tempAticonDirect = ActionDirect.Right_up;
                        break;
                    case ActionDirect.Left_down:
                    case ActionDirect.Right_down:
                        tempAticonDirect = ActionDirect.Right_down;
                        break;
                    default:
                        isDirect = false;
                        break;
                }
                //设置当前动作方向
                if (isDirect) {
                    this.curDirect = at;
                    this.curActionDirect = tempAticonDirect;
                    if (at == ActionDirect.Left || at == ActionDirect.Left_up || at == ActionDirect.Left_down) {
                        this.skewY = 180;
                    }
                    else {
                        this.skewY = 0;
                    }
                }
            };
            BaseKing.prototype.getActionState = function (at) {
                var ret = null;
                ;
                switch (at) {
                    case ActionType.Wait:
                        ret = ActionState.NONE;
                        break;
                    case ActionType.WALK:
                    case ActionType.RUN:
                        ret = ActionState.MOVE;
                        break;
                    case ActionType.ATTACK:
                    case ActionType.SKILL1:
                    case ActionType.SKILL2:
                    case ActionType.SKILL3:
                    case ActionType.SKILL4:
                    case ActionType.SKILL5:
                    case ActionType.SKILL6:
                    case ActionType.SKILL7:
                    case ActionType.SKILL8:
                    case ActionType.SKILL9:
                    case ActionType.SKILL10:
                        ret = ActionState.ATTACK;
                        break;
                    case ActionType.ATTACKED:
                        ret = ActionState.ATTACKED;
                        break;
                    case ActionType.JUMP:
                    case ActionType.ROLL:
                        ret = ActionState.JUMP;
                        break;
                    case ActionType.DEAD:
                    case ActionType.DEADCRIT:
                        ret = ActionState.DEAD;
                        this.onDead();
                        break;
                    default:
                        break;
                }
                return ret;
            };
            /**
             * 设置动作状态
             * @param as 动作状态
             */
            BaseKing.prototype.setActionState = function (as) {
                this.curAticonState = as;
            };
            /**
             * 播放暂停事件
             * @param ev
             */
            BaseKing.prototype.onStop = function (ev) {
                console.log("onStop " + ev);
                this.visible = false;
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            };
            /**
             * 播放完成事件
             * @param ev
             */
            BaseKing.prototype.onComplete = function (ev) {
                //console.log(`onComplete ` + ev+this.isPlaying);
                if (this.isPlaying) {
                    //循环播放
                }
                else {
                    var actionType = -1;
                    if (this.arrNextAction && this.curAticonType < this.arrNextAction.length) {
                        actionType = this.arrNextAction[this.curAticonType];
                    }
                    if (actionType > -1) {
                        this.setActionType(actionType);
                    }
                    else {
                        //this.visible=false;
                    }
                }
                // if(this.callBack){
                // 	this.callBack.run();
                // }
            };
            /**
             * label事件 this.addLabel('AniPic1', 1);
             * @param ev
             */
            BaseKing.prototype.onLabel = function (ev) {
                console.log("complte " + ev);
            };
            /**
             * 创建一组动画的url数组（美术资源地址数组）
             * actionName  动作的名称，用于生成url
             * length   动画最后一帧的索引值，
             */
            BaseKing.prototype.aniUrls = function (actionName, length) {
                var urls = [];
                for (var i = 1; i <= length; i++) {
                    //动画资源路径要和动画图集打包前的资源命名对应起来
                    urls.push(this.skinData.atlasName + "/" + this.skinData.kingType + "_" + actionName + "_" + i + ".png");
                }
                return urls;
            };
            /**
             * 创建时调用
             */
            BaseKing.prototype.onCreate = function () {
            };
            /**
             * 移除时调用
             */
            BaseKing.prototype.onRemove = function () {
            };
            /**
             * 死亡时调用
             */
            BaseKing.prototype.onDead = function () {
            };
            return BaseKing;
        }(Laya.Animation));
        king.BaseKing = BaseKing;
        /**
         * 动作数据
         */
        var Action = /** @class */ (function () {
            /**
             *
             * @param actionType 动作类型
             * @param frameCount 动作帧数
             * @param isLoop     动作是否循环,默认是true
             */
            function Action(actionType, actionDirect, frameCount, width, height, pivotOffX, pivotOffY, isLoop) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (pivotOffX === void 0) { pivotOffX = 0; }
                if (pivotOffY === void 0) { pivotOffY = 0; }
                if (isLoop === void 0) { isLoop = true; }
                this.actionType = actionType;
                this.actionDirect = actionDirect;
                this._actionName = actionType + "_" + actionDirect;
                this.frameCount = frameCount;
                this.width = width;
                this.height = height;
                this.pivotOffX = pivotOffX;
                this.pivotOffY = pivotOffY;
                this.isLoop = isLoop;
            }
            Object.defineProperty(Action.prototype, "actionName", {
                /**
                 * 动作名字，只读
                 */
                get: function () {
                    return this._actionName;
                },
                enumerable: true,
                configurable: true
            });
            return Action;
        }());
        king.Action = Action;
        /**
         * 皮肤数据
         */
        var SkinData = /** @class */ (function () {
            function SkinData(atlasName, kingType, arrAction, cutRow, cutCol) {
                if (cutRow === void 0) { cutRow = 0; }
                if (cutCol === void 0) { cutCol = 0; }
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
            return SkinData;
        }());
        king.SkinData = SkinData;
        /*
        * 动作类型;0.Wait 1.Left 2.Right 3.Up 4.Down
        */
        var ActionType;
        (function (ActionType) {
            /**0 待机 */
            ActionType[ActionType["Wait"] = 0] = "Wait";
            /**1 走 */
            ActionType[ActionType["WALK"] = 1] = "WALK";
            /**2 跑 */
            ActionType[ActionType["RUN"] = 2] = "RUN";
            /**3 跳跃 */
            ActionType[ActionType["JUMP"] = 3] = "JUMP";
            /**4 翻滚 */
            ActionType[ActionType["ROLL"] = 4] = "ROLL";
            /**5 占位*/
            ActionType[ActionType["POS5"] = 5] = "POS5";
            /**5 占位*/
            ActionType[ActionType["POS6"] = 6] = "POS6";
            /**5 占位*/
            ActionType[ActionType["POS7"] = 7] = "POS7";
            /**5 占位*/
            ActionType[ActionType["POS8"] = 8] = "POS8";
            /**5 占位*/
            ActionType[ActionType["POS9"] = 9] = "POS9";
            /**5 占位*/
            ActionType[ActionType["POS10"] = 10] = "POS10";
            /**11 攻击 */
            ActionType[ActionType["ATTACK"] = 11] = "ATTACK";
            /**12 被攻击 */
            ActionType[ActionType["ATTACKED"] = 12] = "ATTACKED";
            /**13 死亡 */
            ActionType[ActionType["DEAD"] = 13] = "DEAD";
            /**14 死亡暴击 */
            ActionType[ActionType["DEADCRIT"] = 14] = "DEADCRIT";
            /**15 占位 */
            ActionType[ActionType["POS15"] = 15] = "POS15";
            /**16 占位 */
            ActionType[ActionType["POS16"] = 16] = "POS16";
            /**17 占位 */
            ActionType[ActionType["POS17"] = 17] = "POS17";
            /**18 占位 */
            ActionType[ActionType["POS18"] = 18] = "POS18";
            /**19 占位 */
            ActionType[ActionType["POS19"] = 19] = "POS19";
            /**20 占位 */
            ActionType[ActionType["POS20"] = 20] = "POS20";
            /**21 技能1 */
            ActionType[ActionType["SKILL1"] = 21] = "SKILL1";
            /**22 技能2 */
            ActionType[ActionType["SKILL2"] = 22] = "SKILL2";
            /**23 技能3 */
            ActionType[ActionType["SKILL3"] = 23] = "SKILL3";
            /**24 技能4 */
            ActionType[ActionType["SKILL4"] = 24] = "SKILL4";
            /**25 技能5 */
            ActionType[ActionType["SKILL5"] = 25] = "SKILL5";
            /**26 技能6 */
            ActionType[ActionType["SKILL6"] = 26] = "SKILL6";
            /**27 技能7 */
            ActionType[ActionType["SKILL7"] = 27] = "SKILL7";
            /**28 技能8 */
            ActionType[ActionType["SKILL8"] = 28] = "SKILL8";
            /**29 技能9 */
            ActionType[ActionType["SKILL9"] = 29] = "SKILL9";
            /**30 技能10 */
            ActionType[ActionType["SKILL10"] = 30] = "SKILL10";
        })(ActionType = king.ActionType || (king.ActionType = {}));
        /*
        * 动作方向 钟表0点，顺时针方向
        */
        var ActionDirect;
        (function (ActionDirect) {
            /**0 无 */
            ActionDirect[ActionDirect["None"] = 0] = "None";
            /**1 上 */
            ActionDirect[ActionDirect["Up"] = 1] = "Up";
            /**2 右上 */
            ActionDirect[ActionDirect["Right_up"] = 2] = "Right_up";
            /**3 右 */
            ActionDirect[ActionDirect["Right"] = 3] = "Right";
            /**4 右下 */
            ActionDirect[ActionDirect["Right_down"] = 4] = "Right_down";
            /**5 下 */
            ActionDirect[ActionDirect["Down"] = 5] = "Down";
            /**6 左下 */
            ActionDirect[ActionDirect["Left_down"] = 6] = "Left_down";
            /**7 左 */
            ActionDirect[ActionDirect["Left"] = 7] = "Left";
            /**8 左上 */
            ActionDirect[ActionDirect["Left_up"] = 8] = "Left_up";
        })(ActionDirect = king.ActionDirect || (king.ActionDirect = {}));
        /*
       * 动作状态;
       */
        var ActionState;
        (function (ActionState) {
            /**待机状态 */
            ActionState[ActionState["NONE"] = 0] = "NONE";
            /**移动状态 */
            ActionState[ActionState["MOVE"] = 1] = "MOVE";
            /**跳跃状态 */
            ActionState[ActionState["JUMP"] = 2] = "JUMP";
            /**攻击状态 */
            ActionState[ActionState["ATTACK"] = 3] = "ATTACK";
            /**被攻击状态 */
            ActionState[ActionState["ATTACKED"] = 4] = "ATTACKED";
            /**死亡状态 */
            ActionState[ActionState["DEAD"] = 5] = "DEAD";
        })(ActionState = king.ActionState || (king.ActionState = {}));
    })(king = game.king || (game.king = {}));
})(game || (game = {}));
