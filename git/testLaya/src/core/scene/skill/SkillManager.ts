namespace game.scene.skill{
    /*
    * 2019-12-09 andy
        技能管理
    */
    export class SkillManager{
        /**技能配置表 */
        public dicSkill:Dictionary<Cfg_Skill>;
        /**技能配置表 生物*/
        public dicKingSkill:Dictionary<Array<Cfg_Skill>>;

        private static _ins:SkillManager;
        public static get ins():SkillManager{
            if(!this._ins)
                SkillManager._ins=new SkillManager();
            return this._ins;
        }
        constructor(){
            if(SkillManager._ins != null)
                throw new Error("SkillManager is single!");
            this.dicSkill=new Dictionary<Cfg_Skill>();
            this.dicKingSkill=new Dictionary<Array<Cfg_Skill>>();
        }

        public init(): void {

        }
        /**
         * 初始化技能数据
         * @param data 
         */
        public initData(data:any): void {
            let skills:Array<Cfg_Skill>=data;
            for(let skill of skills){
                if(skill.atkingCount==0)skill.atkingCount=1;
                //不是散射的情况下，散射角度强制设置为0
                if(skill.atkingCount==1){skill.atkingRotation=0};
                this.dicSkill.add(skill.skillId,skill);
                if(!this.dicKingSkill.hasKey(skill.skin)){
                    let arr:Array<Cfg_Skill>=[];
                    this.dicKingSkill.add(skill.skin,arr);
                }
                this.dicKingSkill.get(skill.skin).push(skill);
            }
            console.log("Cfg_Skill 初始化完成");
        }
        /**获得技能配置唯一 */
        public getCfg(skillId:number):Cfg_Skill{
            return this.dicSkill.get(skillId);
        }
        /**获得技能配置 */
        public getCfgs():Array<Cfg_Skill>{
            return this.dicSkill.valueOf();
        }

        /**获得生物技能列表 */
        public getKingCfg(skin:string):Array<Cfg_Skill>{
            return this.dicKingSkill.get(skin);
        }
        /**
         * 获得技能
         * @param skillData 
         */
        public getSkill(skillData:SkillData):BaseSkill{
            let bs:BaseSkill=null;
            switch(skillData.cfg_Skill.skillType){
                case SkillType.ATTACK:
                    bs=new AttackSkill();
                break;
                case SkillType.BULLET:
                    bs=new BulletSkill();
                break;
                case SkillType.GROUP_SKILL:
                    bs=new GroupKillSkill();
                break;
                default:
                    console.error("EffectName not exist!");
                break;
            }
            if(bs)
                bs.setData(skillData);
            return bs;
        }

    }

}
