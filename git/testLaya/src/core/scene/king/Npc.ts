namespace game.scene.king{
    /*
    *  Npc基类 2020-03-03 andy
    */
    export class Npc extends BaseKing{
		/**死亡特效 */
        public eftDead:BaseFrame;
		/**头顶血条 */
        public hpBar:Laya.ProgressBar;
        /**攻击目标 */
        public atkTarget:King;
        /**攻击距离 */
        public atkDistance:number=1;
		/**被攻击点X*/
		public atkedX:number;
		/**被攻击点Y*/
		public atkedY:number;
        /**当前坐标 */
        public startPoint:Laya.Point;
        /**目标坐标 */
        public endPoint:Laya.Point;
        /**角色 移动速度 */
        public moveSpeed:number=1;

		/**NPC 移动位置数组 */
        public arrPoint:Array<Laya.Point>;
		private curPoint:Laya.Point;
		private curPointIndex:number=0;
		/**是否自动循环行走 */
		private isMoveLoop:boolean=true;

        constructor(){
            super();
            this.hpBar=new Laya.ProgressBar();
            this.hpBar.anchorX = this.hpBar.anchorY=0.5;	
            this.spHead.addChild(this.hpBar);

            this.spDebug=new Laya.Sprite();
            this.addChild(this.spDebug);

            this.startPoint = new Laya.Point();
            this.endPoint = new Laya.Point();
			
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
			
		}
        /** */
		public update():void{
			this.startPoint.setTo(this.x,this.y);
		}
		/**
		 * 设置行走位置数组
		 * @param arr 
		 */
		public setMovePoint(arr:Array<Laya.Point>):void{
			this.arrPoint = arr;
			this.curPointIndex=0;
			this.nextPoint();
		}
		/** 行走 */
		public move():void{
			if(Define.gameType == GameType.over_look){
				let angle:number=MathUtil.getTwoPointAngle(this.x,this.y,this.atkTarget.x,this.atkTarget.y);
				this.spBody.rotation = MathUtil.getFromAngle(angle);
				let radian:number = MathUtil.angleToRadian(this.spBody.rotation);
				this.x +=Math.cos(radian)*this.moveSpeed;
				this.y +=Math.sin(radian)*this.moveSpeed;
				
				this.endPoint.setTo(this.atkTarget.x,this.atkTarget.y);
				let distance:number = MathUtil.getDistance(this.startPoint,this.endPoint);
				if(distance <this.atkDistance){
					this.setActionState(ActionState.ATTACK);
				}
			}else if(Define.gameType == GameType.h_game){
				//没有位置
				if(!this.curPoint){
					return;
				}
				//根据目标，自动切换左右行走方向
				this.x <this.curPoint.x?this.setActionDirect(ActionDirect.Right):this.x >this.curPoint.x?this.setActionDirect(ActionDirect.Left):null;
				if(this.curDirect == ActionDirect.Left){
					if(this.x-this.moveSpeed-this.atkDistance>this.curPoint.x){
						this.pos(this.x-this.moveSpeed,this.y);
					}else{
						this.nextPoint();
					}
				}else  if(this.curDirect == ActionDirect.Right){
					if(this.x+this.moveSpeed+this.atkDistance<this.curPoint.x){
						this.pos(this.x+this.moveSpeed,this.y);
					}else{
						this.nextPoint();
					}
				}else{
					//console.log("EnemyKing Move 方向有误"+this.curAticonType+" "+this.name);
				}
        	}else if(Define.gameType == GameType.v_game){
				
        	}else{

			}
		}

		private nextPoint():Laya.Point{
			if(this.curPointIndex>=this.arrPoint.length){
				if(this.isMoveLoop){
					this.curPointIndex=0;
				}else{
					return null;
				}
			}
			this.curPoint = this.arrPoint[this.curPointIndex];
			this.curPointIndex++;
			return this.curPoint;
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
			NpcManager.ins.removeNpc(this.objId);
		}
		/**重置 */
		public reset():void{
			this.curActionState = ActionState.NONE;
			this.curActionType = ActionType.Wait;
			this.hpBar.visible=true;
			this.rotation=0;
			this.alpha=1;
			
		}
    }
}