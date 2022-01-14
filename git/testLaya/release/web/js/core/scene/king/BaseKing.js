var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    var scene;
    (function (scene) {
        var king;
        (function (king) {
            var BaseAnimation = game.display.BaseAnimation;
            /**
             * 生物基类
             */
            var BaseKing = /** @class */ (function (_super) {
                __extends(BaseKing, _super);
                function BaseKing() {
                    var _this = _super.call(this) || this;
                    /**生物全局唯一标识ID */
                    _this.objId = 0;
                    /**生物CLASS名字 */
                    _this.clsName = "";
                    /**皮肤资源是否加载 */
                    _this.isLoad = false;
                    _this.dicAction = new Dictionary();
                    _this.spFoot = new Laya.Sprite();
                    _this.addChild(_this.spFoot);
                    _this.spBody = new Laya.Sprite();
                    _this.addChild(_this.spBody);
                    _this.spBody.addChild(_this.anim);
                    _this.spHead = new Laya.Sprite();
                    _this.addChild(_this.spHead);
                    _this.spEft = new Laya.Sprite();
                    _this.addChild(_this.spEft);
                    return _this;
                }
                /**
                 * 需在子类设置
                 */
                BaseKing.prototype.init = function () { };
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
                        this.dicAction = new Dictionary();
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
                    this.setActionType(this.curActionType);
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
                    if (at == undefined || at < 0 || this.curActionState == ActionState.DEAD) {
                        return;
                    }
                    var actionName = this.skinData.kingType + "_" + at + "_" + this.curActionDirect;
                    if (Laya.Animation.framesMap[actionName] == null) {
                        console.log("请检查动作表：" + actionName + " 是否存在！");
                        //2020-03-19 andy 如果没有死亡动作,则标记为死亡状态
                        if (at == ActionType.DEAD || at == ActionType.DEADCRIT) {
                            this.curActionState = ActionState.DEAD;
                        }
                        return;
                    }
                    if (this.isLoad) {
                        this.visible = true;
                        //2019-12-03 切换动作时，动作宽高尺寸不一致，修改锚点,角色的中心点设置脚下中心
                        var action = this.dicAction.get(at + "_" + this.curActionDirect);
                        if (action) {
                            isLoop = action.isLoop;
                            this.spBody.width = action.width;
                            this.spBody.height = action.height;
                            this.spBody.pivot(action.pivotX, action.pivotY);
                            this.setInterval(action.frameRate);
                        }
                        this.anim.play(0, isLoop, actionName);
                        this.curActionType = at;
                        this.curActionState = this.getActionState(at);
                    }
                };
                /**
                 * 2019-12-09 为了节约资源，角色8方向美术只做5个方向即可
                 * @param at 动作类型 左右，左上右上，左下右下，对称即可
                 */
                BaseKing.prototype.setActionDirect = function (at) {
                    if (this.curDirect == at) {
                        return false;
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
                            this.spBody.skewY = 180;
                        }
                        else {
                            this.spBody.skewY = 0;
                        }
                    }
                    return true;
                };
                BaseKing.prototype.getActionState = function (at) {
                    var ret = null;
                    switch (at) {
                        case ActionType.Wait:
                            ret = ActionState.NONE;
                            break;
                        case ActionType.SHOW:
                            ret = ActionState.SHOW;
                            break;
                        case ActionType.WALK:
                        case ActionType.RUN:
                            ret = ActionState.MOVE;
                            break;
                        case ActionType.ATTACK:
                        case ActionType.ATTACK1:
                        case ActionType.ATTACK2:
                        case ActionType.ATTACK3:
                        case ActionType.ATTACK4:
                        case ActionType.ATTACK5:
                        case ActionType.ATTACK6:
                        case ActionType.ATTACK7:
                        case ActionType.ATTACK8:
                        case ActionType.ATTACK9:
                        case ActionType.ATTACK10:
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
                        case ActionType.SHOW:
                            ret = ActionState.JUMP;
                            break;
                        case ActionType.DEAD:
                        case ActionType.DEADCRIT:
                            ret = ActionState.DEAD;
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
                    this.curActionState = as;
                };
                /**
                 * label事件 this.addLabel('AniPic1', 1);
                 * @param ev
                 */
                BaseKing.prototype.onLabel = function (ev) {
                    console.log("complte " + ev);
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
                    if (this.anim.isPlaying) {
                        //循环播放
                    }
                    else {
                        var actionType = -1;
                        if (this.arrNextAction && this.curActionType < this.arrNextAction.length) {
                            actionType = this.arrNextAction[this.curActionType];
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
                BaseKing.prototype.aniUrls = function (actionName, length) {
                    actionName = this.skinData.atlasName + "/" + this.skinData.kingType + "_" + actionName;
                    return BaseAnimation.aniUrls(actionName, length);
                };
                return BaseKing;
            }(BaseAnimation));
            king.BaseKing = BaseKing;
            /**
             * 动作数据
             */
            var Action = /** @class */ (function () {
                /**
                 *
                 * @param cfg  动作配置
                 * @param isLoop     动作是否循环,默认是true
                 */
                function Action(cfg, isLoop) {
                    if (isLoop === void 0) { isLoop = true; }
                    this.actionType = cfg.actionType;
                    this.actionDirect = cfg.actionDirect;
                    this._actionName = cfg.actionType + "_" + cfg.actionDirect;
                    this.frameCount = cfg.frameCount;
                    this.frameRate = cfg.frameRate <= 0 ? 50 : cfg.frameRate;
                    this.width = cfg.width;
                    this.height = cfg.height;
                    this.pivotX = cfg.offX;
                    this.pivotY = cfg.offY;
                    this.isLoop = isLoop;
                }
                Object.defineProperty(Action.prototype, "actionName", {
                    /**
                     * 动作名字，只读
                     */
                    get: function () {
                        return this._actionName;
                    },
                    enumerable: false,
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
                /**5 出场*/
                ActionType[ActionType["SHOW"] = 5] = "SHOW";
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
                /**21 攻击1 */
                ActionType[ActionType["ATTACK1"] = 21] = "ATTACK1";
                /**22 攻击2 */
                ActionType[ActionType["ATTACK2"] = 22] = "ATTACK2";
                /**23 攻击3 */
                ActionType[ActionType["ATTACK3"] = 23] = "ATTACK3";
                /**24 攻击4 */
                ActionType[ActionType["ATTACK4"] = 24] = "ATTACK4";
                /**25 攻击5 */
                ActionType[ActionType["ATTACK5"] = 25] = "ATTACK5";
                /**26 攻击6 */
                ActionType[ActionType["ATTACK6"] = 26] = "ATTACK6";
                /**27 攻击7 */
                ActionType[ActionType["ATTACK7"] = 27] = "ATTACK7";
                /**28 攻击8 */
                ActionType[ActionType["ATTACK8"] = 28] = "ATTACK8";
                /**29 攻击9 */
                ActionType[ActionType["ATTACK9"] = 29] = "ATTACK9";
                /**30 攻击10 */
                ActionType[ActionType["ATTACK10"] = 30] = "ATTACK10";
                /**31 技能1 */
                ActionType[ActionType["SKILL1"] = 31] = "SKILL1";
                /**32 技能2 */
                ActionType[ActionType["SKILL2"] = 32] = "SKILL2";
                /**33 技能3 */
                ActionType[ActionType["SKILL3"] = 33] = "SKILL3";
                /**34 技能4 */
                ActionType[ActionType["SKILL4"] = 34] = "SKILL4";
                /**35 技能5 */
                ActionType[ActionType["SKILL5"] = 35] = "SKILL5";
                /**36 技能6 */
                ActionType[ActionType["SKILL6"] = 36] = "SKILL6";
                /**37 技能7 */
                ActionType[ActionType["SKILL7"] = 37] = "SKILL7";
                /**38 技能8 */
                ActionType[ActionType["SKILL8"] = 38] = "SKILL8";
                /**39 技能9 */
                ActionType[ActionType["SKILL9"] = 39] = "SKILL9";
                /**40 技能10 */
                ActionType[ActionType["SKILL10"] = 40] = "SKILL10";
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
                /**展示状态 */
                ActionState[ActionState["SHOW"] = 1] = "SHOW";
                /**移动状态 */
                ActionState[ActionState["MOVE"] = 2] = "MOVE";
                /**跳跃状态 */
                ActionState[ActionState["JUMP"] = 3] = "JUMP";
                /**攻击状态 */
                ActionState[ActionState["ATTACK"] = 4] = "ATTACK";
                /**被攻击状态 */
                ActionState[ActionState["ATTACKED"] = 5] = "ATTACKED";
                /**死亡状态 */
                ActionState[ActionState["DEAD"] = 6] = "DEAD";
            })(ActionState = king.ActionState || (king.ActionState = {}));
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
