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
        (function (king) {
            /*
            *  Npc基类 2020-03-03 andy
            */
            var Npc = /** @class */ (function (_super) {
                __extends(Npc, _super);
                function Npc() {
                    var _this = _super.call(this) || this;
                    /**攻击距离 */
                    _this.atkDistance = 1;
                    /**角色 移动速度 */
                    _this.moveSpeed = 1;
                    _this.curPointIndex = 0;
                    /**是否自动循环行走 */
                    _this.isMoveLoop = true;
                    _this.hpBar = new Laya.ProgressBar();
                    _this.hpBar.anchorX = _this.hpBar.anchorY = 0.5;
                    _this.spHead.addChild(_this.hpBar);
                    _this.spDebug = new Laya.Sprite();
                    _this.addChild(_this.spDebug);
                    _this.startPoint = new Laya.Point();
                    _this.endPoint = new Laya.Point();
                    return _this;
                    //this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
                }
                Npc.prototype.init = function () {
                    _super.prototype.init.call(this);
                };
                /**
                 * 设置皮肤
                 * @param skinData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                Npc.prototype.setSkin = function (skinData, isAdd) {
                    if (isAdd === void 0) { isAdd = true; }
                    _super.prototype.setSkin.call(this, skinData, isAdd);
                };
                /** */
                Npc.prototype.update = function () {
                    this.startPoint.setTo(this.x, this.y);
                };
                /**
                 * 设置行走位置数组
                 * @param arr
                 */
                Npc.prototype.setMovePoint = function (arr) {
                    this.arrPoint = arr;
                    this.curPointIndex = 0;
                    this.nextPoint();
                };
                /** 行走 */
                Npc.prototype.move = function () {
                    if (game.Define.gameType == game.GameType.over_look) {
                        var angle = MathUtil.getTwoPointAngle(this.x, this.y, this.atkTarget.x, this.atkTarget.y);
                        this.spBody.rotation = MathUtil.getFromAngle(angle);
                        var radian = MathUtil.angleToRadian(this.spBody.rotation);
                        this.x += Math.cos(radian) * this.moveSpeed;
                        this.y += Math.sin(radian) * this.moveSpeed;
                        this.endPoint.setTo(this.atkTarget.x, this.atkTarget.y);
                        var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                        if (distance < this.atkDistance) {
                            this.setActionState(king.ActionState.ATTACK);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.h_game) {
                        //没有位置
                        if (!this.curPoint) {
                            return;
                        }
                        //根据目标，自动切换左右行走方向
                        this.x < this.curPoint.x ? this.setActionDirect(king.ActionDirect.Right) : this.x > this.curPoint.x ? this.setActionDirect(king.ActionDirect.Left) : null;
                        if (this.curDirect == king.ActionDirect.Left) {
                            if (this.x - this.moveSpeed - this.atkDistance > this.curPoint.x) {
                                this.pos(this.x - this.moveSpeed, this.y);
                            }
                            else {
                                this.nextPoint();
                            }
                        }
                        else if (this.curDirect == king.ActionDirect.Right) {
                            if (this.x + this.moveSpeed + this.atkDistance < this.curPoint.x) {
                                this.pos(this.x + this.moveSpeed, this.y);
                            }
                            else {
                                this.nextPoint();
                            }
                        }
                        else {
                            //console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
                        }
                    }
                    else if (game.Define.gameType == game.GameType.v_game) {
                    }
                    else {
                    }
                };
                Npc.prototype.nextPoint = function () {
                    if (this.curPointIndex >= this.arrPoint.length) {
                        if (this.isMoveLoop) {
                            this.curPointIndex = 0;
                        }
                        else {
                            return null;
                        }
                    }
                    this.curPoint = this.arrPoint[this.curPointIndex];
                    this.curPointIndex++;
                    return this.curPoint;
                };
                /**
                 * 计算行走方向
                 * @param fromX
                 * @param fromY
                 * @param toX
                 * @param toY
                 * @param isEightDir 是否八方向,默认true
                 */
                Npc.prototype.checkMoveDir = function (fromX, fromY, toX, toY, isEightDir) {
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
                 * 死亡时调用
                 */
                Npc.prototype.onDead = function () {
                    if (this.eftDead) {
                        this.eftDead.playFrame(false, this);
                    }
                };
                /**
                 * 死亡消失时调用
                 */
                Npc.prototype.onDeadDisappear = function () {
                    king.NpcManager.ins.removeNpc(this.objId);
                };
                /**重置 */
                Npc.prototype.reset = function () {
                    this.curActionState = king.ActionState.NONE;
                    this.curActionType = king.ActionType.Wait;
                    this.hpBar.visible = true;
                    this.rotation = 0;
                    this.alpha = 1;
                };
                return Npc;
            }(king.BaseKing));
            king.Npc = Npc;
        })(king = scene.king || (scene.king = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
