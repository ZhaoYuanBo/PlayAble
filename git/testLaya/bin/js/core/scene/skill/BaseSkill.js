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
            var BaseDisplay = game.display.BaseDisplay;
            /**
             * 技能基类
             */
            var BaseSkill = /** @class */ (function (_super) {
                __extends(BaseSkill, _super);
                function BaseSkill() {
                    var _this = _super.call(this) || this;
                    _this.startPoint = new Laya.Point();
                    _this.endPoint = new Laya.Point();
                    _this.curPoint = new Laya.Point();
                    return _this;
                }
                /**
                 * 设置皮肤
                 * @param skillData 皮肤数据
                 * @param isAdd    是否显示,默认是true
                 */
                BaseSkill.prototype.setData = function (skillData) {
                    this.skillData = skillData;
                    this.cfgSkill = skillData.cfg_Skill;
                    this.atkTarget = skillData.atkTarget;
                    this.atkedTarget = skillData.atkedTarget;
                    if (this.atkTarget) {
                        this.atkTarget.atkSkill = this.cfgSkill ? this.cfgSkill.atk : 0;
                        //2020-10-26 攻击者设置目标
                        this.atkTarget.atkTarget = this.atkedTarget;
                    }
                    //攻击特效
                    this.atkEft = FrameManager.ins.getFrame(this.cfgSkill.atkEft, Laya.Handler.create(this, this.atkCallBack, null, false));
                    if (this.atkEft)
                        this.atkEft.name = "atkEft";
                    //发射特效
                    this.atkingEft = FrameManager.ins.getFrame(this.cfgSkill.atkingEft, Laya.Handler.create(this, null, null, false));
                    //受击特效
                    this.atkedEft = FrameManager.ins.getFrame(this.cfgSkill.atkedEft, Laya.Handler.create(this, this.atkedCallBack, null, false));
                };
                /**
                 * 播放技能
                 */
                BaseSkill.prototype.play = function () {
                    console.log("子类未实现");
                };
                /**
                 * 停止技能
                 */
                BaseSkill.prototype.stop = function () {
                    //console.log("子类未实现");
                };
                /**攻击特效播放完成 */
                BaseSkill.prototype.atkCallBack = function () {
                };
                /**发射结束 */
                BaseSkill.prototype.atkingCallBack = function () {
                };
                /**受击特效播放完成 */
                BaseSkill.prototype.atkedCallBack = function () {
                };
                return BaseSkill;
            }(BaseDisplay));
            skill.BaseSkill = BaseSkill;
            /**
             * 技能数据
             */
            var SkillData = /** @class */ (function () {
                function SkillData(Cfg_Skill, atkTarget, atkedTarget) {
                    this.cfg_Skill = Cfg_Skill;
                    this.atkTarget = atkTarget;
                    this.atkedTarget = atkedTarget;
                }
                return SkillData;
            }());
            skill.SkillData = SkillData;
            /**技能类型 */
            var SkillType;
            (function (SkillType) {
                /**物理攻击 */
                SkillType[SkillType["ATTACK"] = 0] = "ATTACK";
                /**子弹类型 */
                SkillType[SkillType["BULLET"] = 1] = "BULLET";
                /**群杀类型 */
                SkillType[SkillType["GROUP_SKILL"] = 2] = "GROUP_SKILL";
            })(SkillType = skill.SkillType || (skill.SkillType = {}));
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
