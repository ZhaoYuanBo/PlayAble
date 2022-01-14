var game;
(function (game) {
    var scene;
    (function (scene) {
        var skill;
        (function (skill_1) {
            /*
            * 2019-12-09 andy
                技能管理
            */
            var SkillManager = /** @class */ (function () {
                function SkillManager() {
                    if (SkillManager._ins != null)
                        throw new Error("SkillManager is single!");
                    this.dicSkill = new Dictionary();
                    this.dicKingSkill = new Dictionary();
                }
                Object.defineProperty(SkillManager, "ins", {
                    get: function () {
                        if (!this._ins)
                            SkillManager._ins = new SkillManager();
                        return this._ins;
                    },
                    enumerable: false,
                    configurable: true
                });
                SkillManager.prototype.init = function () {
                };
                /**
                 * 初始化技能数据
                 * @param data
                 */
                SkillManager.prototype.initData = function (data) {
                    var skills = data;
                    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                        var skill_2 = skills_1[_i];
                        if (skill_2.atkingCount == 0)
                            skill_2.atkingCount = 1;
                        //不是散射的情况下，散射角度强制设置为0
                        if (skill_2.atkingCount == 1) {
                            skill_2.atkingRotation = 0;
                        }
                        ;
                        this.dicSkill.add(skill_2.skillId, skill_2);
                        if (!this.dicKingSkill.hasKey(skill_2.skin)) {
                            var arr = [];
                            this.dicKingSkill.add(skill_2.skin, arr);
                        }
                        this.dicKingSkill.get(skill_2.skin).push(skill_2);
                    }
                    console.log("Cfg_Skill 初始化完成");
                };
                /**获得技能配置唯一 */
                SkillManager.prototype.getCfg = function (skillId) {
                    return this.dicSkill.get(skillId);
                };
                /**获得技能配置 */
                SkillManager.prototype.getCfgs = function () {
                    return this.dicSkill.valueOf();
                };
                /**获得生物技能列表 */
                SkillManager.prototype.getKingCfg = function (skin) {
                    return this.dicKingSkill.get(skin);
                };
                /**
                 * 获得技能
                 * @param skillData
                 */
                SkillManager.prototype.getSkill = function (skillData) {
                    var bs = null;
                    switch (skillData.cfg_Skill.skillType) {
                        case skill_1.SkillType.ATTACK:
                            bs = new skill_1.AttackSkill();
                            break;
                        case skill_1.SkillType.BULLET:
                            bs = new skill_1.BulletSkill();
                            break;
                        case skill_1.SkillType.GROUP_SKILL:
                            bs = new skill_1.GroupKillSkill();
                            break;
                        default:
                            console.error("EffectName not exist!");
                            break;
                    }
                    if (bs)
                        bs.setData(skillData);
                    return bs;
                };
                return SkillManager;
            }());
            skill_1.SkillManager = SkillManager;
        })(skill = scene.skill || (scene.skill = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
