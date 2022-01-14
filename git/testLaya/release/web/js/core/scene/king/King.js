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
var game;
(function (game) {
    var scene;
    (function (scene) {
        var king;
        (function (king_1) {
            /*
            *  生物基类 2019-12-03 andy
            */
            var King = /** @class */ (function (_super) {
                __extends(King, _super);
                function King() {
                    var _this = _super.call(this) || this;
                    /**攻击距离 */
                    _this.atkDistance = 1;
                    /**是否触发暴击 */
                    _this.isAtkCri = false;
                    /**是否触发被暴击 */
                    _this.isAtkedCri = false;
                    /**物理攻击延时，主要针对第一次敌人攻击*/
                    _this.atkDelay = 0;
                    /**物理攻击第几个*/
                    _this.atkIndex = 0;
                    /**角色 攻击CD,默认1000毫秒*/
                    _this.atkCD = 1000;
                    /**角色 上次物理攻击时间 */
                    _this.lastAtkTime = 0;
                    /**受击半径,默认50*/
                    _this.atkedRadis = 50;
                    /**被攻击点X*/
                    _this.atkedX = 0;
                    /**被攻击点Y*/
                    _this.atkedY = 0;
                    /**角色 移动速度 */
                    _this.moveSpeed = 1;
                    /**是否远程攻击 */
                    _this._isLongAtk = false;
                    /**角色 等级 */
                    _this.lvl = 1;
                    /**角色 生命 */
                    _this.hp = 1;
                    /**角色 生命上限 */
                    _this.hpMax = 100;
                    /**角色 魔法 */
                    _this.mp = 1;
                    /**角色 基础伤害*/
                    _this.atkBasic = 0;
                    /**角色 技能伤害*/
                    _this.atkSkill = 0;
                    /**角色 装备伤害*/
                    _this.atkEquip = 0;
                    /**角色 暴击伤害*/
                    _this.cri = 0;
                    /**角色 防御*/
                    _this.def = 1;
                    /**角色 命中率 最大值100,默认100*/
                    _this.hitRate = 100;
                    /**角色 暴击率 最大值10000,默认0*/
                    _this.criRate = 0;
                    /**角色 阵营 0.自己 1.敌人 默认1*/
                    _this.camp = 1;
                    /** 帧数*/
                    _this.curFrame = 0;
                    /** 当前固定点索引 */
                    _this.curFixedIndex = 0;
                    _this.hpBar = new Laya.ProgressBar();
                    _this.hpBar.anchorX = _this.hpBar.anchorY = 0.5;
                    _this.spHead.addChild(_this.hpBar);
                    _this.spDebug = new Laya.Sprite();
                    _this.addChild(_this.spDebug);
                    _this.startPoint = new Laya.Point();
                    _this.endPoint = new Laya.Point();
                    _this._atkedPoint = new Laya.Point();
                    _this.arrAtkId = [];
                    _this.arrSkillId = [];
                    _this.dicCD = new Dictionary();
                    _this.arrFixedPoint = [];
                    return _this;
                    //this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
                }
                King.prototype.init = function () {
                    _super.prototype.init.call(this);
                };
                /**
                 * 设置皮肤
                 * @param skinData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                King.prototype.setSkin = function (skinData, isAdd) {
                    if (isAdd === void 0) { isAdd = true; }
                    _super.prototype.setSkin.call(this, skinData, isAdd);
                    var arrSkillConfig = SkillManager.ins.getKingCfg(this.skinData.kingType);
                    if (arrSkillConfig) {
                        //物理
                        var cfgAtk = null;
                        //技能
                        var cfgSkill = null;
                        this.arrAtkId = [];
                        for (var _i = 0, arrSkillConfig_1 = arrSkillConfig; _i < arrSkillConfig_1.length; _i++) {
                            var cfg = arrSkillConfig_1[_i];
                            if (!cfg)
                                continue;
                            if (cfg.skillType == 0) {
                                this.arrAtkId.push(cfg.skillId);
                                cfgAtk = cfg;
                            }
                            else {
                                this.arrSkillId.push(cfg.skillId);
                                //2020-10-28 andy 是否远程攻击
                                this._isLongAtk = cfg.skillType == 1;
                                //主角的不用赋值
                                if (this.camp == 1)
                                    cfgSkill = cfg;
                            }
                        }
                        //物理攻击没有的情况下，看下技能
                        if (!cfgAtk) {
                            cfgAtk = cfgSkill;
                        }
                        if (cfgAtk) {
                            this.atkSkill = cfgAtk.atk;
                            this.atkDistance = cfgAtk.atkDistance;
                            this.atkCD = cfgAtk.atkCD;
                        }
                    }
                };
                /** */
                King.prototype.update = function () {
                    if (this.curActionState != king_1.ActionState.DEAD) {
                        if (this.curActionState != king_1.ActionState.NONE) {
                            this.startPoint.setTo(this.x, this.y);
                        }
                        this.getNextPoint();
                    }
                    this.curFrame++;
                };
                /** 行走 */
                King.prototype.move = function () {
                    if (game.Define.gameType == game.GameType.over_look) { //俯视角度
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.endPoint.x, this.endPoint.y);
                        this.spBody.rotation = MathUtil.getFromAngle(angle);
                        var radian = MathUtil.angleToRadian(this.spBody.rotation);
                        this.x += Math.cos(radian) * this.moveSpeed;
                        this.y += Math.sin(radian) * this.moveSpeed;
                        if (!this.isMoveByDistance()) {
                            this.attack(this.atkTarget);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.h_game) { //横板
                        this.x < this.atkTarget.x ? this.setActionDirect(king_1.ActionDirect.Right) : this.x > this.atkTarget.x ? this.setActionDirect(king_1.ActionDirect.Left) : null;
                        //2020-10-27 y轴
                        var toY = this.y;
                        if (Math.abs(this.y - this.atkTarget.y) > this.moveSpeed) {
                            toY = this.y < this.atkTarget.y ? this.y + this.moveSpeed : this.y - this.moveSpeed;
                        }
                        if (this.curDirect == king_1.ActionDirect.Left) {
                            if (this.x - this.moveSpeed - this.atkDistance > this.atkTarget.x) {
                                this.pos(this.x - this.moveSpeed, toY);
                            }
                            else if (toY != this.y && !this._isLongAtk) {
                                //2020-10-28 andy 加上Y轴判断,远程攻击不用移动Y轴
                                this.pos(this.x, toY);
                            }
                            else {
                                this.attack();
                            }
                        }
                        else if (this.curDirect == king_1.ActionDirect.Right) {
                            if (this.x + this.moveSpeed + this.atkDistance < this.atkTarget.x) {
                                this.pos(this.x + this.moveSpeed, toY);
                            }
                            else if (toY != this.y && !this._isLongAtk) {
                                this.pos(this.x, toY);
                            }
                            else {
                                // this.curAticonState = ActionState.ATTACK;
                                this.attack(this.atkTarget);
                            }
                        }
                        else {
                            //console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.v_game) { //竖版
                        this.y < this.atkTarget.y ? this.setActionDirect(king_1.ActionDirect.Down) : this.y > this.atkTarget.y ? this.setActionDirect(king_1.ActionDirect.Up) : null;
                        if (this.curDirect == king_1.ActionDirect.Up) {
                            if (this.y - this.moveSpeed - this.atkDistance > this.atkTarget.y) {
                                this.pos(this.x, this.y - this.moveSpeed);
                            }
                            else {
                                this.attack();
                            }
                        }
                        else if (this.curDirect == king_1.ActionDirect.Down) {
                            if (this.y + this.moveSpeed + this.atkDistance < this.atkTarget.y) {
                                this.pos(this.x, this.y + this.moveSpeed);
                            }
                            else {
                                this.attack();
                            }
                        }
                        else {
                            //console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.rpg) { //RPG
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.endPoint.x, this.endPoint.y);
                        var realAngle = MathUtil.getFromAngle(angle);
                        var dir = MathUtil.getDirByRotate(realAngle);
                        if (this.setActionDirect(dir)) {
                            this.setActionType(this.curActionType);
                        }
                        var radian = MathUtil.angleToRadian(realAngle);
                        this.x += Math.cos(radian) * this.moveSpeed;
                        this.y += Math.sin(radian) * this.moveSpeed;
                        if (!this.isMoveByDistance()) {
                            this.attack();
                        }
                    }
                    else {
                    }
                };
                King.prototype.getNextPoint = function () {
                    var toX = 0, toY = 0;
                    if (this.arrFixedPoint && this.curFixedIndex < this.arrFixedPoint.length) {
                        toX = this.arrFixedPoint[this.curFixedIndex][0];
                        toY = this.arrFixedPoint[this.curFixedIndex][1];
                    }
                    else if (this.atkTarget) {
                        toX = this.atkTarget.x;
                        toY = this.atkTarget.y;
                    }
                    this.endPoint.setTo(toX, toY);
                    return this.endPoint;
                };
                /**是否需要移动,目标超出攻击距离则需要*/
                King.prototype.isMoveByDistance = function () {
                    var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                    if (this.arrFixedPoint && this.curFixedIndex < this.arrFixedPoint.length) {
                        if (distance <= this.moveSpeed) {
                            this.curFixedIndex++;
                        }
                        if (this.curFixedIndex == this.arrFixedPoint.length) {
                            return this.atkTarget ? true : false;
                        }
                        return true;
                    }
                    else if (this.atkTarget) {
                        return distance > this.atkDistance + this.moveSpeed;
                    }
                    else {
                        return false;
                    }
                };
                /**
                 * 计算行走方向
                 * @param fromX
                 * @param fromY
                 * @param toX
                 * @param toY
                 * @param isEightDir 是否八方向,默认true
                 */
                King.prototype.checkMoveDir = function (fromX, fromY, toX, toY, isEightDir) {
                    if (isEightDir === void 0) { isEightDir = true; }
                    var radian = Math.atan2(fromY - toY, fromX - toX);
                    var angle = MathUtil.radianToAngle(radian);
                    //从左到右 -135 -45  135 45
                    // console.log(this.name,fromX,fromY,toX,toY,angle);
                    if (isEightDir) {
                        return 0;
                    }
                    else {
                        return angle;
                    }
                };
                /**
                 * 物理攻击 2020-03-05
                 * @param king 目标生物
                 */
                King.prototype.attack = function (king) {
                    if (king === void 0) { king = null; }
                    //2020-04-17 如果刚刚攻击过，正处于CD状态，此时再由行走切换到攻击，攻击状态设置无效，会一直走到目标点
                    var tempActionState = this.curActionState;
                    this.curActionState = king_1.ActionState.ATTACK;
                    var ret = false;
                    if (this.arrAtkId.length > 0) {
                        ret = this.playSkill(!king ? this.atkTarget : king);
                    }
                    else if (this.arrSkillId.length > 0) {
                        ret = this.playSkill(!king ? this.atkTarget : king, this.arrSkillId[0]);
                    }
                    else {
                    }
                    // if(!ret){
                    // 	this.curActionState = tempActionState;
                    // }
                    return ret;
                };
                /**
                 * 释放技能
                 * @param target  目标生物
                 * @param skillId 技能ID,默认-1，随机物理技能
                 */
                King.prototype.playSkill = function (target, skillId) {
                    if (skillId === void 0) { skillId = -1; }
                    if (this.curActionState == king_1.ActionState.DEAD) {
                        return;
                    }
                    if (skillId == -1) {
                        skillId = this.getRandAtkIndex();
                    }
                    var skillConfig = SkillManager.ins.getCfg(skillId);
                    if (!skillConfig) {
                        console.warn("King.ts playSkill ：技能ID " + skillId + " 找不到配置！");
                        return false;
                    }
                    //物理攻击，公用一个CD,key是skill_0
                    var key = "skill_" + (skillConfig.skillType > 0 ? skillId : 0);
                    if (this.dicCD.hasKey(key)) {
                        this.lastAtkTime = this.dicCD.get(key);
                    }
                    else {
                        this.lastAtkTime = Laya.timer.currTimer - skillConfig.atkCD + this.atkDelay;
                        this.dicCD.add(key, Laya.timer.currTimer);
                    }
                    if (Laya.timer.currTimer - this.lastAtkTime >= skillConfig.atkCD) {
                        this.dicCD.add(key, Laya.timer.currTimer);
                        //生物展示动作
                        this.setActionType(skillConfig.actionType, false);
                        //上次物理攻击时间
                        this.lastAtkTime = Laya.timer.currTimer;
                        //是否出发暴击
                        var rate = MathUtil.randomRange(1, 10000);
                        if (this.criRate >= rate) {
                            this.isAtkCri = true;
                            if (target)
                                target.isAtkedCri = true;
                            if (this && this.eftAtkCri) {
                                this.eftAtkCri.playFrame(false, this);
                            }
                        }
                        else {
                            this.isAtkCri = false;
                            if (target)
                                target.isAtkedCri = false;
                            if (this && this.eftAtk) {
                                this.eftAtk.playFrame(false, this);
                            }
                        }
                        //播放技能特效
                        var skillData = new SkillData(skillConfig, this, target);
                        var skill_1 = SkillManager.ins.getSkill(skillData);
                        skill_1.play();
                        return true;
                    }
                    else {
                        //技能CD冷却中
                        return false;
                    }
                };
                /**
                 * 收到攻击
                 * @param king 攻击者
                 * @param skillId 技能ID,默认是0
                 * @param extraAtk 额外伤害,默认是0
                 */
                King.prototype.attacked = function (king, skillId, extraAtk) {
                    if (skillId === void 0) { skillId = 0; }
                    if (extraAtk === void 0) { extraAtk = 0; }
                    if (this.curActionState == king_1.ActionState.DEAD || (king && king.curActionState == king_1.ActionState.DEAD)) {
                        return;
                    }
                    if (this.isAtkedCri) {
                        if (this.eftAtkedCri) {
                            this.eftAtkedCri.playFrame(false, this);
                        }
                    }
                    else {
                        if (this.eftAtked) {
                            this.eftAtked.playFrame(false, this);
                        }
                    }
                };
                /**
                 * 设置生命
                 * @param hp
                 */
                King.prototype.setHp = function (hp) {
                    this.hp += hp;
                    this.hp = this.hp < 0 ? 0 : this.hp;
                    this.hpBar.value = this.hp / this.hpMax;
                    if (this.hp == 0 && this.curActionState != king_1.ActionState.DEAD) {
                        this.setActionType(this.isAtkedCri ? king_1.ActionType.DEADCRIT : king_1.ActionType.DEAD);
                        this.onDead();
                    }
                };
                /**
                 * 设置位置
                 * @param x
                 * @param y
                 */
                King.prototype.setPosition = function (x, y) {
                    this.x = x;
                    this.y = y;
                    this.startPoint.setTo(x, y);
                };
                Object.defineProperty(King.prototype, "atk", {
                    /**总攻击力 */
                    get: function () {
                        return this.atkBasic + this.atkEquip + this.atkSkill;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(King.prototype, "atkedPoint", {
                    /**受击点 */
                    get: function () {
                        return this._atkedPoint.setTo(this.startPoint.x + this.atkedX, this.startPoint.y + this.atkedY);
                    },
                    enumerable: false,
                    configurable: true
                });
                /**
                 * 死亡时调用
                 */
                King.prototype.onDead = function () {
                    if (this.eftDead) {
                        this.eftDead.playFrame(false, this);
                    }
                };
                /**
                 * 死亡消失时调用
                 */
                King.prototype.onDeadDisappear = function () {
                    king_1.KingManager.ins.removeKing(this.objId);
                };
                /**得到随机物理攻击ID */
                King.prototype.getRandAtkIndex = function () {
                    //let randIndex:number= MathUtil.randomRange(0,this.arrAtkId.length-1);
                    if (this.atkIndex >= this.arrAtkId.length) {
                        this.atkIndex = 0;
                    }
                    return this.arrAtkId[this.atkIndex++];
                };
                /**
                 * 获得射击特效旋转角度,比如子弹，箭
                 * 俯视游戏方向角度为0,跟着生物旋转
                 * @param atkingX  子弹在角色的x偏差,默认为0
                 * @param atkingY  子弹在角色的Y偏差,默认为0
                 *
                 */
                King.prototype.getAtkingEftRotation = function (atkingX, atkingY) {
                    if (atkingX === void 0) { atkingX = 0; }
                    if (atkingY === void 0) { atkingY = 0; }
                    //方向角度
                    var dirRotation = 0;
                    switch (this.curDirect) {
                        case king_1.ActionDirect.Up:
                            dirRotation = -90;
                            break;
                        case king_1.ActionDirect.Right_up:
                            dirRotation = -45;
                            break;
                        case king_1.ActionDirect.Right:
                            dirRotation = 0;
                            break;
                        case king_1.ActionDirect.Right_down:
                            dirRotation = 45;
                            break;
                        case king_1.ActionDirect.Down:
                            dirRotation = 90;
                            break;
                        case king_1.ActionDirect.Left_down:
                            dirRotation = 135;
                            break;
                        case king_1.ActionDirect.Left:
                            dirRotation = 180;
                            break;
                        case king_1.ActionDirect.Left_up:
                            dirRotation = -135;
                            break;
                        default: break;
                    }
                    //2020-06-01 andy rpg如果有射击目标
                    if (game.Define.gameType != game.GameType.over_look && this.atkTarget) {
                        //2020-10-26 子弹方向为射击目标受伤特效点
                        var angle = MathUtil.getTwoPointAngle(this.x + atkingX, this.y + atkingY, this.atkTarget.x + this.atkTarget.atkedX, this.atkTarget.y + this.atkTarget.atkedY);
                        return MathUtil.getFromAngle(angle);
                    }
                    return this.spBody.rotation + dirRotation;
                };
                /**重置数据 */
                King.prototype.reset = function () {
                    this.curActionState = king_1.ActionState.NONE;
                    this.curActionType = king_1.ActionType.Wait;
                    this.hpBar.visible = true;
                    this.rotation = 0;
                    this.alpha = 1;
                    this.dicCD = new Dictionary();
                    this.curFixedIndex = 0;
                };
                return King;
            }(king_1.BaseKing));
            king_1.King = King;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
