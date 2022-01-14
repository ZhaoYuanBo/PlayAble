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
        var skill;
        (function (skill) {
            /**
             * 2020-01-14 andy
             * 普通攻击技能
             */
            var AttackSkill = /** @class */ (function (_super) {
                __extends(AttackSkill, _super);
                function AttackSkill() {
                    return _super.call(this) || this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                AttackSkill.prototype.setData = function (skillData) {
                    _super.prototype.setData.call(this, skillData);
                };
                /**
                 * 播放技能
                 */
                AttackSkill.prototype.play = function () {
                    //攻击特效
                    if (this.atkTarget) {
                        if (this.atkEft) {
                            this.atkEft.x = this.cfgSkill.atkX;
                            this.atkEft.y = this.cfgSkill.atkY;
                            //this.atkEft.pivot(0,0);
                            this.atkEft.playFrame(false, this.atkTarget.spBody);
                        }
                        else {
                            this.atkCallBack();
                        }
                    }
                };
                /**攻击特效播放完成 */
                AttackSkill.prototype.atkCallBack = function () {
                    var _this = this;
                    //目标受击特效
                    if (this.atkedTarget && this.atkedTarget.curActionState != ActionState.DEAD) {
                        if (this.atkedEft) {
                            this.atkedEft.x = this.atkedTarget.atkedX;
                            this.atkedEft.y = this.atkedTarget.atkedY;
                            this.atkedEft.playFrame(false, this.atkedTarget.spEft);
                        }
                        //目标掉血
                        if (this.cfgSkill.atkedDelay > 0) {
                            Laya.timer.once(this.cfgSkill.atkedDelay, this, function () {
                                _this.atkedTarget.attacked(_this.atkTarget);
                            });
                        }
                        else {
                            this.atkedTarget.attacked(this.atkTarget);
                        }
                    }
                };
                return AttackSkill;
            }(skill.BaseSkill));
            skill.AttackSkill = AttackSkill;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
