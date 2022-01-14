/**
* name 
*/
module game.scene.skill{
	import BaseDisplay=game.display.BaseDisplay;
	/**
	 * 2019-12-20 andy
	 * 子弹技能
	 */
	export class BulletSkill extends BaseSkill{
		/**自动导航*/
		private _autoCheck:boolean=false;
		private arrBullet:Array<BaseFrame>;
		constructor(){
			super();
			Laya.timer.frameLoop(1,this,this.update);
			this.arrBullet=[];
		}

		/**
		 * 设置皮肤
		 * @param skillData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setData(skillData:SkillData):void{
			super.setData(skillData);
			if(skillData &&  skillData.cfg_Skill){
				if(!skillData.cfg_Skill.atkDistance || skillData.cfg_Skill.atkDistance==0)
				console.error("技能ID:"+skillData.cfg_Skill.skillId+" 子弹攻击距离atkDistance为0，请检查技能表配置");
				if(!skillData.cfg_Skill.atkingSpeed || skillData.cfg_Skill.atkingSpeed==0)
				console.error("技能ID:"+skillData.cfg_Skill.skillId+" 子弹飞行速度atkingSpeed为0，请检查技能表配置");
			}
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
					let bulletCount:number = this.cfgSkill.atkingCount;
					let bulletRotation:number = this.cfgSkill.atkingRotation;

					let minRotation:number = this.atkTarget.getAtkingEftRotation(this.cfgSkill.atkingX,this.cfgSkill.atkingY)-(bulletRotation>>1);
					let addRotation:number = 0;
					if(bulletCount>1){
						addRotation = bulletRotation/(bulletCount-1);
					}
					
					let bf:BaseFrame=null;
					for(let i=0;i<bulletCount;i++){
						bf = FrameManager.ins.getFrame(this.cfgSkill.atkingEft,Laya.Handler.create(this,null,null,false));
						this.createBullet(bf,minRotation+addRotation*i);
						this.arrBullet.push(bf);
					}
					
						
				}	
			}
		}
		
		private createBullet(bullet:BaseFrame,rotation:number):void{
			//子弹旋转角度
			bullet.rotation = rotation;
			//子弹场景发出坐标
			let radian:number = MathUtil.angleToRadian(bullet.rotation);
			//2020-10-26 俯视子弹射出的坐标是一个圆
			if(Define.gameType == GameType.over_look){
				bullet.x = this.atkTarget.x+this.cfgSkill.atkingX*Math.cos(radian);
				bullet.y = this.atkTarget.y+this.cfgSkill.atkingX*Math.sin(radian);
			}else{
				bullet.x = this.atkTarget.x+this.cfgSkill.atkingX;
				bullet.y = this.atkTarget.y+this.cfgSkill.atkingY;
			}
			
			bullet.playFrame(true,LayerName.scene_effect);
			
			//子弹自动导航，强制清空攻击目标
			this._autoCheck= true;
			this.atkedTarget=null;
			let toX:number = bullet.x+this.cfgSkill.atkDistance*Math.cos(radian);
			let toY:number = bullet.y+this.cfgSkill.atkDistance*Math.sin(radian);

			//匀速射击，根据距离计算射击时间
			this.startPoint.setTo(bullet.x,bullet.y);
			this.endPoint.setTo(toX,toY);
			let distance:number = MathUtil.getDistance(this.startPoint,this.endPoint);

			Laya.Tween.to(bullet,{x:toX,y:toY,scaleX:0.6,scaleY:0.6},distance*this.cfgSkill.atkingSpeed/100,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
				//子弹飞行结束
				this.atkingFinish(bullet,this.atkedTarget);
			}));
		}

		private update():void{
			//子弹飞行中，自动检测是否击中目标
			if(this._autoCheck){
				let distance:number=0;
				//子弹剩余未击中目标数量
				let bulletCount:number=0;
				for(let bullet of this.arrBullet){
					if(bullet.parent){
						bulletCount++;
					}else{
						continue;
					}
					this.curPoint.setTo(bullet.x,bullet.y);
					for(let enemy of KingManager.ins.kings){
						if(enemy.curActionState != ActionState.DEAD && this.atkTarget.camp!=enemy.camp){
							distance = MathUtil.getDistance(enemy.atkedPoint,this.curPoint);
							if(distance<enemy.atkedRadis){
								//2020-04-20 被攻击者应绑定到子弹上
								//this.atkedTarget = enemy;
								Laya.Tween.clearAll(bullet);
								this.atkingFinish(bullet,enemy);
								break;
							}
						}
					}
				}
				if(bulletCount==0){
					this._autoCheck=false;
				}
			}
		}

		/**攻击特效播放完成 */
		public atkCallBack():void{

		}
		/**发射结束 */
		public atkingFinish(bullet:BaseFrame,enemy:King=null):void{
			//发射结束
			if(this.atkEft)this.atkEft.stopFrame();
			if(bullet)bullet.stopFrame();
			if(enemy){
				//受击特效
				this.atkedEft = FrameManager.ins.getFrame(this.cfgSkill.atkedEft,null);
				if(this.atkedEft){
					this.atkedEft.x = enemy.atkedX;
					this.atkedEft.y= enemy.atkedY;
					this.atkedEft.playFrame(false,enemy.spEft);
				}
				//目标掉血
				enemy.attacked(this.atkTarget);;
			}
		}
		/**受击特效播放完成 */
		public atkedCallBack():void{

		}
	}
    
}