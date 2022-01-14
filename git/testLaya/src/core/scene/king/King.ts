namespace game.scene.king{
    /*
    *  生物基类 2019-12-03 andy
    */
    export class King extends BaseKing{
        /**攻击特效 */
        public eftAtk:BaseFrame;
		/**攻击暴击特效 */
        public eftAtkCri:BaseFrame;
        /**受击特效 */
        public eftAtked:BaseFrame;
		/**受击暴击特效 */
        public eftAtkedCri:BaseFrame;
        /**死亡特效 */
        public eftDead:BaseFrame;
		/**头顶血条 */
        public hpBar:Laya.ProgressBar;
        /**攻击目标 */
        public atkTarget:King;
        /**攻击距离 */
        public atkDistance:number=1;
        /**是否触发暴击 */
        public isAtkCri:boolean=false;
		/**是否触发被暴击 */
        public isAtkedCri:boolean=false;
        /**物理攻击列表 */
        public arrAtkId:Array<number>;
		/**技能攻击列表 */
        public arrSkillId:Array<number>;
		/**物理攻击延时，主要针对第一次敌人攻击*/
        public atkDelay:number=0;
		/**物理攻击第几个*/
        public atkIndex:number=0;
        /**角色 攻击CD,默认1000毫秒*/
        public atkCD:number=1000;
        /**角色 上次物理攻击时间 */
        public lastAtkTime:number=0;
		/**角色 技能CD */
		public dicCD:Dictionary<number>;
		/**受击半径,默认50*/
        public atkedRadis:number=50;
		/**被攻击点X*/
		public atkedX:number=0;
		/**被攻击点Y*/
		public atkedY:number=0;
        /**当前坐标 */
        public startPoint:Laya.Point;
        /**目标坐标 */
        public endPoint:Laya.Point;
        /**角色 移动速度 */
        public moveSpeed:number=1;
		
		/**受击坐标 */
        private _atkedPoint:Laya.Point;
		/**是否远程攻击 */
		private _isLongAtk:boolean=false;

        /**角色 等级 */
        public lvl:number=1;
        /**角色 生命 */
        public hp:number=1;
        /**角色 生命上限 */
        public hpMax:number=100;
        /**角色 魔法 */
        public mp:number=1;
		/**角色 基础伤害*/
        public atkBasic:number=0;
		/**角色 技能伤害*/
        public atkSkill:number=0;
		/**角色 装备伤害*/
        public atkEquip:number=0;
        /**角色 暴击伤害*/
        public cri:number=0;
        /**角色 防御*/
        public def:number=1;
        /**角色 命中率 最大值100,默认100*/
        public hitRate:number=100;
        /**角色 暴击率 最大值10000,默认0*/
        public criRate:number=0;
		/**角色 阵营 0.自己 1.敌人 默认1*/
        public camp:number=1;


		/** 帧数*/
        public curFrame:number=0;
		/** 行走固定点 */
        public arrFixedPoint:Array<Array<number>>;
		/** 当前固定点索引 */
		public curFixedIndex:number=0;

        constructor(){
            super();
            this.hpBar=new Laya.ProgressBar();
            this.hpBar.anchorX = this.hpBar.anchorY=0.5;	
            this.spHead.addChild(this.hpBar);

            this.spDebug=new Laya.Sprite();
            this.addChild(this.spDebug);

            this.startPoint = new Laya.Point();
            this.endPoint = new Laya.Point();
			this._atkedPoint = new Laya.Point();
            this.arrAtkId=[];
			this.arrSkillId=[];
			this.dicCD = new Dictionary<number>();
			this.arrFixedPoint=[];
			
            //this.spDebug.graphics.drawCircle(0,0,10,"#ff0000");
        }
        public init():void{
            super.init();
        }
		/**
		 * 设置皮肤
		 * @param skinData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setSkin(skinData:SkinData,isAdd:boolean=true):void{
			super.setSkin(skinData,isAdd);
			let arrSkillConfig:Array<Cfg_Skill> = SkillManager.ins.getKingCfg(this.skinData.kingType);
			if(arrSkillConfig){
				//物理
				let cfgAtk:Cfg_Skill =null;
				//技能
				let cfgSkill:Cfg_Skill =null;
				this.arrAtkId=[];
				for(let cfg of arrSkillConfig){
					if(!cfg)continue;
					if(cfg.skillType==0){
						this.arrAtkId.push(cfg.skillId);
						cfgAtk = cfg;
					}else{
						this.arrSkillId.push(cfg.skillId);
						//2020-10-28 andy 是否远程攻击
						this._isLongAtk = cfg.skillType==1;
						//主角的不用赋值
						if(this.camp==1)cfgSkill = cfg;
					}
				}
				//物理攻击没有的情况下，看下技能
				if(!cfgAtk){
					cfgAtk = cfgSkill;
				}
				if(cfgAtk){
					this.atkSkill = cfgAtk.atk;
					this.atkDistance = cfgAtk.atkDistance;
					this.atkCD = cfgAtk.atkCD;
				}
			}
			
		}
        /** */
		public update():void{
			if(this.curActionState != ActionState.DEAD){
				if(this.curActionState != ActionState.NONE){
					this.startPoint.setTo(this.x,this.y);
				}
				this.getNextPoint();
			}
			
			this.curFrame++;
		}
		
		/** 行走 */
		public move():void{
			if(Define.gameType == GameType.over_look){//俯视角度
				let angle:number=MathUtil.getTwoPointAngle(this.x,this.y,this.endPoint.x,this.endPoint.y);
				this.spBody.rotation = MathUtil.getFromAngle(angle);
				let radian:number = MathUtil.angleToRadian(this.spBody.rotation);
				this.x +=Math.cos(radian)*this.moveSpeed;
				this.y +=Math.sin(radian)*this.moveSpeed;
				
				if(!this.isMoveByDistance()){
					this.attack(this.atkTarget);
				}
			}else if(Define.gameType == GameType.h_game){//横板
				this.x <this.atkTarget.x?this.setActionDirect(ActionDirect.Right):this.x >this.atkTarget.x?this.setActionDirect(ActionDirect.Left):null;
				//2020-10-27 y轴
				let toY:number=this.y;
				if(Math.abs(this.y-this.atkTarget.y)>this.moveSpeed){
					toY=this.y<this.atkTarget.y?this.y+this.moveSpeed:this.y-this.moveSpeed;
				}
				if(this.curDirect == ActionDirect.Left){
					if(this.x-this.moveSpeed-this.atkDistance>this.atkTarget.x){
						
						this.pos(this.x-this.moveSpeed,toY);
					}else if(toY!=this.y && !this._isLongAtk){
						//2020-10-28 andy 加上Y轴判断,远程攻击不用移动Y轴
						this.pos(this.x,toY);
					}else{
						this.attack();
					}
				}else  if(this.curDirect == ActionDirect.Right){
					if(this.x+this.moveSpeed+this.atkDistance<this.atkTarget.x){
						this.pos(this.x+this.moveSpeed,toY);
					}else if(toY!=this.y && !this._isLongAtk){
						this.pos(this.x,toY);
					}else{
					// this.curAticonState = ActionState.ATTACK;
						this.attack(this.atkTarget);
					}
				}else{
					//console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
				}
        	}else if(Define.gameType == GameType.v_game){//竖版
				this.y <this.atkTarget.y?this.setActionDirect(ActionDirect.Down):this.y >this.atkTarget.y?this.setActionDirect(ActionDirect.Up):null;
				if(this.curDirect == ActionDirect.Up){
					if(this.y-this.moveSpeed-this.atkDistance>this.atkTarget.y){
						this.pos(this.x,this.y-this.moveSpeed);
					}else{
						this.attack();
					}
				}else  if(this.curDirect == ActionDirect.Down){
					if(this.y+this.moveSpeed+this.atkDistance<this.atkTarget.y){
						this.pos(this.x,this.y+this.moveSpeed);
					}else{
						this.attack();
					}
				}else{
					//console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
				}
        	}else if(Define.gameType == GameType.rpg){//RPG
				let angle:number=MathUtil.getTwoPointAngle(this.x,this.y,this.endPoint.x,this.endPoint.y);
				let realAngle:number = MathUtil.getFromAngle(angle);
				let dir:ActionDirect = MathUtil.getDirByRotate(realAngle);
				if(this.setActionDirect(dir)){
					this.setActionType(this.curActionType);
				}
				
				let radian:number = MathUtil.angleToRadian(realAngle);
				this.x +=Math.cos(radian)*this.moveSpeed;
				this.y +=Math.sin(radian)*this.moveSpeed;
				
				if(!this.isMoveByDistance()){
					this.attack();
				}
			}else{
				
        	}
		}
		public getNextPoint():Laya.Point{
			let toX:number = 0,toY:number = 0;
			if(this.arrFixedPoint && this.curFixedIndex<this.arrFixedPoint.length){
				toX = this.arrFixedPoint[this.curFixedIndex][0];
				toY = this.arrFixedPoint[this.curFixedIndex][1];
			}else if(this.atkTarget){
				toX = this.atkTarget.x;
				toY = this.atkTarget.y;
			}
			this.endPoint.setTo(toX,toY);
			return this.endPoint;
		}
		/**是否需要移动,目标超出攻击距离则需要*/
		public isMoveByDistance():boolean{
			let distance:number = MathUtil.getDistance(this.startPoint,this.endPoint);
			if(this.arrFixedPoint && this.curFixedIndex<this.arrFixedPoint.length){
				if(distance<=this.moveSpeed){
					this.curFixedIndex++;
				}
				if(this.curFixedIndex == this.arrFixedPoint.length){
					return this.atkTarget?true:false;
				}
				return true;
			}else if(this.atkTarget){
				return distance >this.atkDistance+this.moveSpeed;
			}else{
				return false;
			}
			
		}
		/**
		 * 计算行走方向
		 * @param fromX 
		 * @param fromY 
		 * @param toX 
		 * @param toY 
		 * @param isEightDir 是否八方向,默认true
		 */
		public checkMoveDir(fromX:number,fromY:number,toX:number,toY:number,isEightDir:boolean=true):number{
			let radian:number = Math.atan2(fromY-toY,fromX-toX);
			let angle:number = MathUtil.radianToAngle(radian);
			//从左到右 -135 -45  135 45
		// console.log(this.name,fromX,fromY,toX,toY,angle);
			if(isEightDir){
				return 0;
			}else{
				return angle;
			}
		}
		
		/**
		 * 物理攻击 2020-03-05 
		 * @param king 目标生物
		 */
		public attack(king:King=null):boolean{
			//2020-04-17 如果刚刚攻击过，正处于CD状态，此时再由行走切换到攻击，攻击状态设置无效，会一直走到目标点
			let tempActionState:ActionState = this.curActionState;

			this.curActionState = ActionState.ATTACK;
			let ret:boolean=false;
			if(this.arrAtkId.length>0){
				ret = this.playSkill(!king?this.atkTarget:king);
			}else if(this.arrSkillId.length>0){
				ret = this.playSkill(!king?this.atkTarget:king,this.arrSkillId[0])
			}else{
				
			}
			// if(!ret){
			// 	this.curActionState = tempActionState;
			// }
			
			return ret;
		}
		/**
		 * 释放技能
		 * @param target  目标生物
		 * @param skillId 技能ID,默认-1，随机物理技能
		 */
		public playSkill(target:King,skillId:number=-1):boolean{
			if(this.curActionState == ActionState.DEAD){
				return;
			}
			if(skillId==-1){
				 skillId = this.getRandAtkIndex();
			}
			let skillConfig:Cfg_Skill = SkillManager.ins.getCfg(skillId);
			if(!skillConfig){
				console.warn("King.ts playSkill ：技能ID "+skillId+" 找不到配置！");
				return false;
			}
			//物理攻击，公用一个CD,key是skill_0
			let key:string = "skill_"+(skillConfig.skillType>0?skillId:0);
		
			if(this.dicCD.hasKey(key)){
				this.lastAtkTime = this.dicCD.get(key);
			}else{
				this.lastAtkTime = Laya.timer.currTimer-skillConfig.atkCD+this.atkDelay;
				this.dicCD.add(key,Laya.timer.currTimer);
			}
			if(Laya.timer.currTimer - this.lastAtkTime>=skillConfig.atkCD){
				this.dicCD.add(key,Laya.timer.currTimer);
				//生物展示动作
				this.setActionType(skillConfig.actionType,false);
				
				//上次物理攻击时间
				this.lastAtkTime=Laya.timer.currTimer;
				//是否出发暴击
				let rate:number = MathUtil.randomRange(1,10000);
				if(this.criRate>=rate){
					this.isAtkCri=true;
					if(target)target.isAtkedCri=true;
					if(this && this.eftAtkCri){
						this.eftAtkCri.playFrame(false,this);
					}
				}else{
					this.isAtkCri=false;
					if(target)target.isAtkedCri=false;
					if(this && this.eftAtk){
						this.eftAtk.playFrame(false,this);
					}
				}
				//播放技能特效
				let skillData:SkillData = new SkillData(skillConfig,this,target);
				let skill:BaseSkill = SkillManager.ins.getSkill(skillData);
				skill.play();
				
				return true;
			}else{
				//技能CD冷却中
				return false;
			}
		}
		/**
		 * 收到攻击
		 * @param king 攻击者
		 * @param skillId 技能ID,默认是0
		 * @param extraAtk 额外伤害,默认是0
		 */
		public attacked(king:King,skillId:number=0,extraAtk:number=0):void{
			if(this.curActionState == ActionState.DEAD || (king && king.curActionState == ActionState.DEAD)){
				return;
			}
			if(this.isAtkedCri){
				if(this.eftAtkedCri){
					this.eftAtkedCri.playFrame(false,this);
				}
			}else{
				if(this.eftAtked){
					this.eftAtked.playFrame(false,this);
				}
			}
			
		}
		/**
		 * 设置生命
		 * @param hp 
		 */
		public setHp(hp:number):void{
			this.hp +=hp;
			this.hp = this.hp<0?0:this.hp;
			this.hpBar.value = this.hp/this.hpMax;
			if(this.hp==0 && this.curActionState != ActionState.DEAD){
				this.setActionType(this.isAtkedCri?ActionType.DEADCRIT:ActionType.DEAD);
                this.onDead();
			}
		}
		/**
		 * 设置位置
		 * @param x 
		 * @param y 
		 */
		public setPosition(x:number,y:number):void{
			this.x=x;
			this.y=y;
			this.startPoint.setTo(x,y);
		}
		/**总攻击力 */
		public get atk():number{
			return this.atkBasic+this.atkEquip+this.atkSkill;
		}
		/**受击点 */
		public get atkedPoint():Laya.Point{
			return this._atkedPoint.setTo(this.startPoint.x+this.atkedX,this.startPoint.y+this.atkedY);
		}
		/**
		 * 死亡时调用
		 */
		public onDead():void{
			
			if(this.eftDead){
				this.eftDead.playFrame(false,this);
			}
		}
		/**
		 * 死亡消失时调用
		 */
		public onDeadDisappear():void{
			KingManager.ins.removeKing(this.objId);
		}
		/**得到随机物理攻击ID */
		private getRandAtkIndex():number{
			//let randIndex:number= MathUtil.randomRange(0,this.arrAtkId.length-1);
			if(this.atkIndex>=this.arrAtkId.length){
				this.atkIndex=0;
			}
			return this.arrAtkId[this.atkIndex++];
		}

		/**
		 * 获得射击特效旋转角度,比如子弹，箭
		 * 俯视游戏方向角度为0,跟着生物旋转
		 * @param atkingX  子弹在角色的x偏差,默认为0
		 * @param atkingY  子弹在角色的Y偏差,默认为0
		 * 
		 */
		public getAtkingEftRotation(atkingX:number=0,atkingY:number=0):number{
			//方向角度
			let dirRotation:number = 0;
			switch(this.curDirect){
				case ActionDirect.Up:dirRotation=-90;break;
				case ActionDirect.Right_up:dirRotation=-45;break;
				case ActionDirect.Right:dirRotation=0;break;
				case ActionDirect.Right_down:dirRotation=45;break;
				case ActionDirect.Down:dirRotation=90;break;
				case ActionDirect.Left_down:dirRotation=135;break;
				case ActionDirect.Left:dirRotation=180;break;
				case ActionDirect.Left_up:dirRotation=-135;break;
				default:break;
			}
			//2020-06-01 andy rpg如果有射击目标
			if(Define.gameType != GameType.over_look && this.atkTarget){
				//2020-10-26 子弹方向为射击目标受伤特效点
				let angle:number =MathUtil.getTwoPointAngle(this.x+atkingX,this.y+atkingY,this.atkTarget.x+this.atkTarget.atkedX,this.atkTarget.y+this.atkTarget.atkedY);
				return MathUtil.getFromAngle(angle);
			}
			return this.spBody.rotation + dirRotation;
		}
		/**重置数据 */
		public reset():void{
			this.curActionState = ActionState.NONE;
			this.curActionType = ActionType.Wait;
			this.hpBar.visible=true;
			this.rotation=0;
			this.alpha=1;
			this.dicCD=new Dictionary<number>();
			this.curFixedIndex=0;
		}
    }
}