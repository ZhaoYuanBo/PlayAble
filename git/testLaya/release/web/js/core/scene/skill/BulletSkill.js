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
        var skill;
        (function (skill) {
            /**
             * 2019-12-20 andy
             * 子弹技能
             */
            var BulletSkill = /** @class */ (function (_super) {
                __extends(BulletSkill, _super);
                function BulletSkill() {
                    var _this = _super.call(this) || this;
                    /**自动导航*/
                    _this._autoCheck = false;
                    Laya.timer.frameLoop(1, _this, _this.update);
                    _this.arrBullet = [];
                    return _this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                BulletSkill.prototype.setData = function (skillData) {
                    _super.prototype.setData.call(this, skillData);
                    if (skillData && skillData.cfg_Skill) {
                        if (!skillData.cfg_Skill.atkDistance || skillData.cfg_Skill.atkDistance == 0)
                            console.error("技能ID:" + skillData.cfg_Skill.skillId + " 子弹攻击距离atkDistance为0，请检查技能表配置");
                        if (!skillData.cfg_Skill.atkingSpeed || skillData.cfg_Skill.atkingSpeed == 0)
                            console.error("技能ID:" + skillData.cfg_Skill.skillId + " 子弹飞行速度atkingSpeed为0，请检查技能表配置");
                    }
                };
                /**
                 * 播放技能
                 */
                BulletSkill.prototype.play = function () {
                    if (this.atkTarget) {
                        if (this.atkEft) {
                            this.atkEft.x = this.cfgSkill.atkX;
                            this.atkEft.y = this.cfgSkill.atkY;
                            this.atkEft.playFrame(false, this.atkTarget.spBody);
                        }
                        if (this.atkingEft) {
                            var bulletCount = this.cfgSkill.atkingCount;
                            var bulletRotation = this.cfgSkill.atkingRotation;
                            var minRotation = this.atkTarget.getAtkingEftRotation(this.cfgSkill.atkingX, this.cfgSkill.atkingY) - (bulletRotation >> 1);
                            var addRotation = 0;
                            if (bulletCount > 1) {
                                addRotation = bulletRotation / (bulletCount - 1);
                            }
                            var bf = null;
                            for (var i = 0; i < bulletCount; i++) {
                                bf = FrameManager.ins.getFrame(this.cfgSkill.atkingEft, Laya.Handler.create(this, null, null, false));
                                this.createBullet(bf, minRotation + addRotation * i);
                                this.arrBullet.push(bf);
                            }
                        }
                    }
                };
                BulletSkill.prototype.createBullet = function (bullet, rotation) {
                    var _this = this;
                    //子弹旋转角度
                    bullet.rotation = rotation;
                    //子弹场景发出坐标
                    var radian = MathUtil.angleToRadian(bullet.rotation);
                    //2020-10-26 俯视子弹射出的坐标是一个圆
                    if (game.Define.gameType == game.GameType.over_look) {
                        bullet.x = this.atkTarget.x + this.cfgSkill.atkingX * Math.cos(radian);
                        bullet.y = this.atkTarget.y + this.cfgSkill.atkingX * Math.sin(radian);
                    }
                    else {
                        bullet.x = this.atkTarget.x + this.cfgSkill.atkingX;
                        bullet.y = this.atkTarget.y + this.cfgSkill.atkingY;
                    }
                    bullet.playFrame(true, scene.LayerName.scene_effect);
                    //子弹自动导航，强制清空攻击目标
                    this._autoCheck = true;
                    this.atkedTarget = null;
                    var toX = bullet.x + this.cfgSkill.atkDistance * Math.cos(radian);
                    var toY = bullet.y + this.cfgSkill.atkDistance * Math.sin(radian);
                    //匀速射击，根据距离计算射击时间
                    this.startPoint.setTo(bullet.x, bullet.y);
                    this.endPoint.setTo(toX, toY);
                    var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                    Laya.Tween.to(bullet, { x: toX, y: toY, scaleX: 0.6, scaleY: 0.6 }, distance * this.cfgSkill.atkingSpeed / 100, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                        //子弹飞行结束
                        _this.atkingFinish(bullet, _this.atkedTarget);
                    }));
                };
                BulletSkill.prototype.update = function () {
                    //子弹飞行中，自动检测是否击中目标
                    if (this._autoCheck) {
                        var distance = 0;
                        //子弹剩余未击中目标数量
                        var bulletCount = 0;
                        for (var _i = 0, _a = this.arrBullet; _i < _a.length; _i++) {
                            var bullet = _a[_i];
                            if (bullet.parent) {
                                bulletCount++;
                            }
                            else {
                                continue;
                            }
                            this.curPoint.setTo(bullet.x, bullet.y);
                            for (var _b = 0, _c = KingManager.ins.kings; _b < _c.length; _b++) {
                                var enemy = _c[_b];
                                if (enemy.curActionState != ActionState.DEAD && this.atkTarget.camp != enemy.camp) {
                                    distance = MathUtil.getDistance(enemy.atkedPoint, this.curPoint);
                                    if (distance < enemy.atkedRadis) {
                                        //2020-04-20 被攻击者应绑定到子弹上
                                        //this.atkedTarget = enemy;
                                        Laya.Tween.clearAll(bullet);
                                        this.atkingFinish(bullet, enemy);
                                        break;
                                    }
                                }
                            }
                        }
                        if (bulletCount == 0) {
                            this._autoCheck = false;
                        }
                    }
                };
                /**攻击特效播放完成 */
                BulletSkill.prototype.atkCallBack = function () {
                };
                /**发射结束 */
                BulletSkill.prototype.atkingFinish = function (bullet, enemy) {
                    if (enemy === void 0) { enemy = null; }
                    //发射结束
                    if (this.atkEft)
                        this.atkEft.stopFrame();
                    if (bullet)
                        bullet.stopFrame();
                    if (enemy) {
                        //受击特效
                        this.atkedEft = FrameManager.ins.getFrame(this.cfgSkill.atkedEft, null);
                        if (this.atkedEft) {
                            this.atkedEft.x = enemy.atkedX;
                            this.atkedEft.y = enemy.atkedY;
                            this.atkedEft.playFrame(false, enemy.spEft);
                        }
                        //目标掉血
                        enemy.attacked(this.atkTarget);
                        ;
                    }
                };
                /**受击特效播放完成 */
                BulletSkill.prototype.atkedCallBack = function () {
                };
                return BulletSkill;
            }(skill.BaseSkill));
            skill.BulletSkill = BulletSkill;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
