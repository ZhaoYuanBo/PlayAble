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
             * 2019-12-30 andy
             * 群杀技能
             */
            var GroupKillSkill = /** @class */ (function (_super) {
                __extends(GroupKillSkill, _super);
                function GroupKillSkill() {
                    return _super.call(this) || this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                GroupKillSkill.prototype.setData = function (skillData) {
                    _super.prototype.setData.call(this, skillData);
                };
                /**
                 * 播放技能
                 */
                GroupKillSkill.prototype.play = function () {
                    var _this = this;
                    if (this.atkTarget) {
                        if (this.atkEft) {
                            this.atkEft.x = this.cfgSkill.atkX;
                            this.atkEft.y = this.cfgSkill.atkY;
                            this.atkEft.playFrame(false, this.atkTarget.spBody);
                        }
                        if (this.atkingEft) {
                            //子弹旋转角度
                            this.atkingEft.rotation = this.atkTarget.rotation;
                            //子弹场景发出坐标
                            var radian = MathUtil.angleToRadian(this.atkingEft.rotation);
                            this.atkingEft.x = this.atkTarget.x + this.cfgSkill.atkingX * Math.cos(radian);
                            this.atkingEft.y = this.atkTarget.y + this.cfgSkill.atkingX * Math.sin(radian);
                            this.atkingEft.playFrame(true, scene.LayerName.scene_effect);
                            var toX = this.atkedTarget ? this.atkedTarget.x : this.atkTarget.x + game.Define.DeviceW * Math.cos(radian);
                            var toY = this.atkedTarget ? this.atkedTarget.y : this.atkTarget.y + game.Define.DeviceW * Math.sin(radian);
                            //匀速射击，根据距离计算射击时间
                            this.startPoint.setTo(this.atkingEft.x, this.atkingEft.y);
                            this.endPoint.setTo(toX, toY);
                            var distance = MathUtil.getDistance(this.startPoint, this.endPoint);
                            Laya.Tween.to(this.atkingEft, { x: toX, y: toY }, distance * this.cfgSkill.atkingSpeed / 100, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                                //发射结束
                                if (_this.atkEft)
                                    _this.atkEft.stopFrame();
                                if (_this.atkingEft)
                                    _this.atkingEft.stopFrame();
                                if (_this.atkedTarget) {
                                    //受击特效
                                    if (_this.atkedEft) {
                                        _this.atkedEft.x = _this.atkedTarget.spBody.pivotX + _this.atkedTarget.atkedX;
                                        _this.atkedEft.y = _this.atkedTarget.spBody.pivotY + _this.atkedTarget.atkedY;
                                        _this.atkedEft.playFrame(false, _this.atkedTarget.spBody);
                                    }
                                    //目标掉血
                                    _this.atkedTarget.setHp(-_this.cfgSkill.atk);
                                }
                            }));
                        }
                        else {
                            var distance = 0;
                            for (var _i = 0, _a = KingManager.ins.kings; _i < _a.length; _i++) {
                                var king_1 = _a[_i];
                                if (king_1.curActionState != ActionState.DEAD) {
                                    distance = king_1.startPoint.distance(this.atkTarget.x, this.atkTarget.y);
                                    if (this.cfgSkill.atkDistance == 0 || distance < this.cfgSkill.atkDistance) {
                                        //king.attacked(this.atkTarget,this.cfgSkill.atk);
                                        //目标掉血
                                        king_1.setHp(-this.cfgSkill.atk);
                                    }
                                }
                            }
                        }
                    }
                };
                return GroupKillSkill;
            }(skill.BaseSkill));
            skill.GroupKillSkill = GroupKillSkill;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
