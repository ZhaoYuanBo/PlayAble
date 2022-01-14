/**
* name 
*/
module game.scene.skill{
	import BaseDisplay=game.display.BaseDisplay;
	/**
	 * 技能基类
	 */
	export class BaseSkill extends BaseDisplay{
		/**技能数据 */
		public skillData:SkillData;
		/**技能配置 */
		public cfgSkill:Cfg_Skill;
		/**攻击者 */
		public atkTarget:King;
		/**被攻击者 */
		public atkedTarget:King;
		
		/**攻击特效 */
		public atkEft:BaseFrame;
		/**攻击中特效 */
		public atkingEft:BaseFrame;
		/**受击特效 */
		public atkedEft:BaseFrame;
		/**暴击特效 */
		public critEft:BaseFrame;

		/**开始点 */
		public startPoint:Laya.Point;
		/**结束点 */
		public endPoint:Laya.Point;
		/**当前点 */
		public curPoint:Laya.Point;

		constructor(){
			super();
			this.startPoint=new Laya.Point();
			this.endPoint=new Laya.Point();	
			this.curPoint=new Laya.Point();	
		}

		/**
		 * 设置皮肤
		 * @param skillData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setData(skillData:SkillData):void{
			this.skillData = skillData;
			this.cfgSkill = skillData.cfg_Skill;
			this.atkTarget = skillData.atkTarget;
			this.atkedTarget = skillData.atkedTarget;
			if(this.atkTarget){
				this.atkTarget.atkSkill = this.cfgSkill?this.cfgSkill.atk:0;
				//2020-10-26 攻击者设置目标
				this.atkTarget.atkTarget = this.atkedTarget;
			}

			//攻击特效
			this.atkEft = FrameManager.ins.getFrame(this.cfgSkill.atkEft,Laya.Handler.create(this,this.atkCallBack,null,false));
			if(this.atkEft)this.atkEft.name="atkEft";
			//发射特效
			this.atkingEft = FrameManager.ins.getFrame(this.cfgSkill.atkingEft,Laya.Handler.create(this,null,null,false));
			//受击特效
			this.atkedEft = FrameManager.ins.getFrame(this.cfgSkill.atkedEft,Laya.Handler.create(this,this.atkedCallBack,null,false));
		}
		/**
		 * 播放技能
		 */
		public play():void{
			console.log("子类未实现");
		}
		/**
		 * 停止技能
		 */
		public stop():void{
			//console.log("子类未实现");
		}

		/**攻击特效播放完成 */
		public atkCallBack():void{

		}
		/**发射结束 */
		public atkingCallBack():void{

		}
		/**受击特效播放完成 */
		public atkedCallBack():void{

		}
	}
	/**
	 * 技能数据
	 */
	export class SkillData{
		/**配置数据 */
		public cfg_Skill:Cfg_Skill;
		/**攻击者 */
		public atkTarget:King;
		/**被攻击者 */
		public atkedTarget:King;
		
		constructor(Cfg_Skill:Cfg_Skill,atkTarget:King,atkedTarget:King){
			this.cfg_Skill = Cfg_Skill;
			this.atkTarget = atkTarget;
			this.atkedTarget = atkedTarget;
		}
	}
	
	/**技能类型 */
    export enum SkillType{
		/**物理攻击 */
        ATTACK,
        /**子弹类型 */
        BULLET,
		/**群杀类型 */
        GROUP_SKILL
    }
    
}