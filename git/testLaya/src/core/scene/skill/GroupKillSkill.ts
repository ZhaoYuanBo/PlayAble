/**
* name 
*/
module game.scene.skill{
	import BaseDisplay=game.display.BaseDisplay;
	/**
	 * 2019-12-30 andy
	 * 群杀技能
	 */
	export class GroupKillSkill extends BaseSkill{
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
			if(this.atkTarget){
				if(this.atkEft){
					this.atkEft.x = this.cfgSkill.atkX;
					this.atkEft.y= this.cfgSkill.atkY;
					this.atkEft.playFrame(false,this.atkTarget.spBody);
				}
				if(this.atkingEft){	
					//子弹旋转角度
					this.atkingEft.rotation = this.atkTarget.rotation;
					//子弹场景发出坐标
					let radian:number = MathUtil.angleToRadian(this.atkingEft.rotation);
					this.atkingEft.x = this.atkTarget.x+this.cfgSkill.atkingX*Math.cos(radian);
					this.atkingEft.y = this.atkTarget.y+this.cfgSkill.atkingX*Math.sin(radian);
					this.atkingEft.playFrame(true,LayerName.scene_effect);
					
					let toX:number = this.atkedTarget?this.atkedTarget.x:this.atkTarget.x+Define.DeviceW*Math.cos(radian);
					let toY:number = this.atkedTarget?this.atkedTarget.y:this.atkTarget.y+Define.DeviceW*Math.sin(radian);				

					//匀速射击，根据距离计算射击时间
					this.startPoint.setTo(this.atkingEft.x,this.atkingEft.y);
					this.endPoint.setTo(toX,toY);
					let distance:number = MathUtil.getDistance(this.startPoint,this.endPoint);

					Laya.Tween.to(this.atkingEft,{x:toX,y:toY},distance*this.cfgSkill.atkingSpeed/100,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
						//发射结束
						if(this.atkEft)this.atkEft.stopFrame();
						if(this.atkingEft)this.atkingEft.stopFrame();
						if(this.atkedTarget){
							//受击特效
							if(this.atkedEft){
								this.atkedEft.x = this.atkedTarget.spBody.pivotX+this.atkedTarget.atkedX;
								this.atkedEft.y= this.atkedTarget.spBody.pivotY+this.atkedTarget.atkedY;
								this.atkedEft.playFrame(false,this.atkedTarget.spBody);
							}
							//目标掉血
							this.atkedTarget.setHp(-this.cfgSkill.atk);
						}
					}));
						
				}else{
					let distance:number=0;
					for(let king of KingManager.ins.kings){
						if(king.curActionState!=ActionState.DEAD){
							distance = king.startPoint.distance(this.atkTarget.x,this.atkTarget.y);
							if(this.cfgSkill.atkDistance==0 || distance<this.cfgSkill.atkDistance){
								//king.attacked(this.atkTarget,this.cfgSkill.atk);
								//目标掉血
								king.setHp(-this.cfgSkill.atk);
							}
						}
					}
				}	
			}
		}
	}
    
}