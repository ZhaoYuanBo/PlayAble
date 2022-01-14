module game.scene.skill{
	import BaseDisplay=game.display.BaseDisplay;
	/**
	 * 2020-01-14 andy
	 * 普通攻击技能
	 */
	export class AttackSkill extends BaseSkill{
		constructor(){
			super();	
		}

		/**
		 * 设置皮肤
		 * @param skillData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setData(skillData:SkillData):void{
			super.setData(skillData);
		}

		/**
		 * 播放技能
		 */
		public play():void{
			//攻击特效
			if(this.atkTarget){
				if(this.atkEft){
					this.atkEft.x = this.cfgSkill.atkX;
					this.atkEft.y= this.cfgSkill.atkY;
					//this.atkEft.pivot(0,0);
					this.atkEft.playFrame(false,this.atkTarget.spBody);
				}else{
					this.atkCallBack();
				}
			}
		}
		/**攻击特效播放完成 */
		public atkCallBack():void{
			//目标受击特效
			if(this.atkedTarget && this.atkedTarget.curActionState != ActionState.DEAD){
				if(this.atkedEft){
					this.atkedEft.x = this.atkedTarget.atkedX;
					this.atkedEft.y = this.atkedTarget.atkedY;
					this.atkedEft.playFrame(false,this.atkedTarget.spEft);
				}
				//目标掉血
				if(this.cfgSkill.atkedDelay>0){
					Laya.timer.once(this.cfgSkill.atkedDelay,this,()=>{
						this.atkedTarget.attacked(this.atkTarget);
					})
				}else{
					this.atkedTarget.attacked(this.atkTarget);
				}
				
				
			}
		}
	}

    
}