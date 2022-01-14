import { CustomDefine } from "./../custom/CustomDefine";
import { DataConfig } from "./../custom/config/DataConfig";
import { Cfg_HitItem, Cfg_Level } from "../custom/config/Struct";
import { ui } from "../ui/layaMaxUI";
import GameUI from "./GameUI";

/*
* 2019-06-12 andy
游戏控制
*/
export class GameCtrl{
	/** 场景 */
	private scene3d:Laya.Scene3D;
	/**目标材质1 */
	private itemMat1:Laya.BlinnPhongMaterial;
	/**目标材质2 */
	private itemMat2:Laya.BlinnPhongMaterial;
	/**目标材质3 */
	private itemMat3:Laya.BlinnPhongMaterial;
	/**射击目标缓存*/
	public arrHitItem:Array<Array<Laya.MeshSprite3D>>;
	private arrCurHitItem:Array<Laya.MeshSprite3D>=null;
	private cfgLevel:Cfg_Level=null;
	
	//临时坐标
	private tmpPos:Laya.Vector3=new Laya.Vector3();
	//底板坐标
	public gameUI:GameUI;
	//
	public isFail:boolean=false;
	//
	public isGameOver:boolean=false;
	
    private static _ins:GameCtrl;
    public static get ins():GameCtrl{
		if(!this._ins)
			GameCtrl._ins=new GameCtrl();
		return this._ins;
	}
	constructor(){
		if(GameCtrl._ins != null)
			throw new Error("GameCtrl is single!");
	}
	public initGameLang(ui:ui.GameUI):void{
		if(!ui){
			return;
		}
		if(Define.langId == LangType.Zh){
			// ui.txtGuideStart.text="点击开始";
			// ui.txtGuideSkill.text="点击加速";
			// ui.txtNewFarm.text="创建田地";
			ui.btnDownload.skin="game/btnDownload_zh.png";
			//ui.imgGameName.skin="game/imgGameName_zh.png";
		}else{
			// ui.txtGuideStart.text="TAP TO START";
			// ui.txtGuideSkill.text="CLICK TO SPEED UP";
			// ui.txtNewFarm.text="NEW SHAFT";
		}
	}
	public initDownloadLang(ui:ui.DownLoadUI):void{
		if(!ui){
			return;
		}
		if(Define.langId == LangType.Zh){
			ui.btnDownload.skin="game/btn_continue_zh.png";
		}else{

		}
	}

	public init():void{
		this.scene3d =Scene3DManager.ins.scene3D;
		//初始化资源
        this.itemMat1 = new Laya.BlinnPhongMaterial();
       // Base64Manager.ins.checkMaterial(this.itemMat1,CustomBase64.target1);
        this.itemMat2 = new Laya.BlinnPhongMaterial();
        //Base64Manager.ins.checkMaterial(this.itemMat2,CustomBase64.target2);
		this.itemMat3 = new Laya.BlinnPhongMaterial();
		//Base64Manager.ins.checkMaterial(this.itemMat3,CustomBase64.target3);
		
		this.arrCurHitItem=[];
		this.arrHitItem=[];
		let cfg:Cfg_HitItem=DataConfig.ins.getHitItem(1);
		for(let i=0;i<20;i++){
			//this.createItem(this.itemMat1,cfg);
		}
		cfg=DataConfig.ins.getHitItem(2);
		for(let i=0;i<40;i++){
			this.createItem(this.itemMat2,cfg);
		}
		cfg=DataConfig.ins.getHitItem(3);
		for(let i=0;i<18;i++){
			this.createItem(this.itemMat3,cfg);
		}
	}

	public createItem(mat:Laya.Material,cfg:Cfg_HitItem):Laya.MeshSprite3D {
		let raidius = cfg.radis;
		let long=cfg.long;
		let width = cfg.width;
		let height = cfg.height;
		
		let mesh:Laya.Mesh=null;
		let colliderShape:Laya.ColliderShape=null;
		if(cfg.type==1){//圆柱
			mesh=Laya.PrimitiveMesh.createCylinder(raidius, height);
			colliderShape=new Laya.CylinderColliderShape(raidius, height);
		}else if(cfg.type==2){//长方体
			mesh=Laya.PrimitiveMesh.createBox(long, height,width);
			colliderShape=new Laya.BoxColliderShape(long, height,width);
		}else{
			console.error("没有这种形状的物体："+cfg.type);
		}
        //创建3D对象
        let sprite3D:Laya.MeshSprite3D = new Laya.MeshSprite3D(mesh);
        sprite3D.meshRenderer.material = mat;
        this.scene3d.addChild(sprite3D);
        //增加刚体
        let rigidBody:Laya.Rigidbody3D = sprite3D.addComponent(Laya.Rigidbody3D);
        rigidBody.colliderShape = colliderShape;
        rigidBody.mass = cfg.mass;
        rigidBody.friction=cfg.mass;
        rigidBody.restitution=cfg.restitution;
        rigidBody.isKinematic=false;
        
        //增加碰撞
		sprite3D.addComponent(Laya.PhysicsCollider);
		if(!this.arrHitItem[cfg.id]){
			this.arrHitItem[cfg.id]=new Array<Laya.MeshSprite3D>();
		}
		sprite3D.active=false;
		this.arrHitItem[cfg.id].push(sprite3D);
        return sprite3D;
	}
	
	public getHitIem(type:number):Laya.MeshSprite3D{
		let sprite3D:Laya.MeshSprite3D;
		let arr:Array<Laya.MeshSprite3D>=this.arrHitItem[type];
		for(let i=0;i<arr.length;i++){
			sprite3D=arr[i];
			if(!sprite3D.active){
				break;
			}
		}
		return sprite3D;
	}
	/**
	 * 创建射击目标阵型
	 * @param level 等级
	 */
	public createHitShape(level:number):void{
		let obj:Laya.MeshSprite3D;
		let cfg:Cfg_HitItem=null;
		let off:number=0.5;
		//let lastY:number=this.gameUI.planeY+(this.gameUI.planeH>>1);
		this.arrCurHitItem=[];
		this.cfgLevel= DataConfig.ins.getLevel(level);
		let rowNumber:number=6;
		let rowIndex:number=0;
		let rowRemain:number=0;
        if(level==1){
			// let arrType:Array<number>=[
			// 	3,3,3,3,3,3,
			// 	2,2,2,2,2,2,
			// 	2,2,2,2,2,2,
			// 	3,3,2,2,3,3,
			// 	3,3,2,2,3,3,
			// 	2,2,2,2,2,2,
			// 	3,2,2,3
			// ];
			let arrType:Array<number>=[
				2,2,2,2,2,2,
				2,2,2,2,2,2,
				2,2,2,2,2,2,
				2,2,2,2,2,2,
				2,2,2,2,2,2,
				2,2,2,2,2,2,
				2,2,2,2
			];
            for(let i=0;i<this.cfgLevel.hitItemCount;i++){
				//设置位置
				if(i%rowNumber==0){
					//lastY+=cfg?cfg.height*0.5:0;
					cfg=DataConfig.ins.getHitItem(arrType[i]);
					//lastY+=cfg.height*0.5+off;
					rowIndex=0;
					let temp:number=this.cfgLevel.hitItemCount-i;
					rowRemain=temp>=rowNumber?rowNumber:temp;
				}
				obj=this.getHitIem(arrType[i]);
				//this.tmpPos.setValue((rowIndex-rowRemain/2+0.5) * (cfg.radis>0?cfg.radis*2:cfg.long), lastY, this.gameUI.planeZ);
				rowIndex++;
                // if(i<6){
				// 	obj=this.getHitIem(1);
				// 	cfg=DataConfig.ins.getHitItem(1);
				// 	lastY=startY+cfg.height*0.5+off;
				// 	this.tmpPos.setValue((i-2.5) * cfg.radis*2, lastY, this.gameUI.planeZ);
                // }else if(i<12){
				// 	if(i==6){
				// 		lastY+=cfg.height*0.5;
				// 		cfg=DataConfig.ins.getHitItem(2);
				// 		lastY+=cfg.height*0.5;
				// 	}
				// 	obj=this.getHitIem(2);
                //     this.tmpPos.setValue((i-8.5) * cfg.long, lastY, this.gameUI.planeZ);
                // }else if(i<18){
				// 	if(i==12){
				// 		lastY+=cfg.height*0.5;
				// 		cfg=DataConfig.ins.getHitItem(3);
				// 		lastY+=cfg.height*0.5;
				// 	}
				// 	obj=this.getHitIem(3);
                //     this.tmpPos.setValue((i-14.5) * cfg.long, lastY, this.gameUI.planeZ);
                // }else if(i<24){
				// 	if(i==18){
				// 		lastY+=cfg.height*0.5;
				// 		cfg=DataConfig.ins.getHitItem(2);
				// 		lastY+=cfg.height*0.5;
				// 	}
				// 	obj=this.getHitIem(2);
                //     this.tmpPos.setValue((i-20.5) * cfg.long, lastY, this.gameUI.planeZ);
				// }else if(i<28){
				// 	if(i==24){
				// 		lastY+=cfg.height*0.5;
				// 		cfg=DataConfig.ins.getHitItem(2);
				// 		lastY+=cfg.height*0.5;
				// 	}
				// 	obj=this.getHitIem(1);
                //     this.tmpPos.setValue((i-25.5) * cfg.long, lastY, this.gameUI.planeZ);
				// }else{

				// }
				obj.active=true;
				let rigidBody:Laya.Rigidbody3D=obj.getComponent(Laya.Rigidbody3D);
				rigidBody.clearForces();
				// rigidBody.angularFactor = new Laya.Vector3(0,0,0);
				rigidBody.isKinematic=true;
                obj.transform.position = this.tmpPos;
				obj.transform.rotationEuler=new Laya.Vector3(0,0,0);
				rigidBody.isKinematic=false;
				
				this.arrCurHitItem.push(obj);
            }
        }else if(level==2){
			// for(let i=0;i<this.cfgLevel.hitItemCount;i++){
			// 	obj=this.getHitIem(2);
			// 	cfg=DataConfig.ins.getHitItem(2);
            //     //设置位置
            //     if(i<4){
			// 		obj=this.getHitIem(1);
			// 		cfg=DataConfig.ins.getHitItem(1);
            //         this.tmpPos.setValue((i-1.5) * cfg.radis*2, startY+cfg.height*0.5+off, this.gameUI.planeZ);
            //     }else if(i<7){
					
            //         this.tmpPos.setValue((i-5) * cfg.long, startY+cfg.height*1.5+off, this.gameUI.planeZ);
            //     }else if(i<9){
            //         this.tmpPos.setValue((i-7.5) * cfg.long, startY+cfg.height*2.5+off, this.gameUI.planeZ);
            //     }else{
            //         this.tmpPos.setValue(0, startY+cfg.height*3.5, this.gameUI.planeZ);
			// 	}
			// 	obj.active=true;
			// 	let rigidBody:Laya.Rigidbody3D=obj.getComponent(Laya.Rigidbody3D);
			// 	rigidBody.clearForces();
			// 	//rigidBody.angularFactor = new Laya.Vector3(0,0,0);
			// 	//obj.getComponent(Laya.Rigidbody3D).isKinematic=true;
            //     obj.transform.position = this.tmpPos;
			// 	obj.transform.rotationEuler=new Laya.Vector3(0,0,0);
			// 	//obj.getComponent(Laya.Rigidbody3D).isKinematic=false;
				
			// 	this.arrCurHitItem.push(obj);
            // }
        }else{
			// for(let i=0;i<this.cfgLevel.hitItemCount;i++){
			// 	obj=this.getHitIem(1);
			// 	cfg=DataConfig.ins.getHitItem(1);
            //     //设置位置
            //     if(i<4){
            //         this.tmpPos.setValue((i-1.5) * cfg.radis*2, startY+cfg.height*0.5+off, this.gameUI.planeZ);
            //     }else if(i<7){
            //         this.tmpPos.setValue((i-5) * cfg.radis*2, startY+cfg.height*1.5+off, this.gameUI.planeZ);
            //     }else if(i<9){
            //         this.tmpPos.setValue((i-7.5) * cfg.radis*2, startY+cfg.height*2.5+off, this.gameUI.planeZ);
            //     }else{
            //         this.tmpPos.setValue(0, startY+cfg.height*3.5, this.gameUI.planeZ);
			// 	}
			// 	obj.active=true;
			// 	let rigidBody:Laya.Rigidbody3D=obj.getComponent(Laya.Rigidbody3D);
			// 	rigidBody.clearForces();
			// 	// rigidBody.angularFactor = new Laya.Vector3(0,0,0);
			// 	rigidBody.isKinematic=true;
            //     obj.transform.position = this.tmpPos;
			// 	obj.transform.rotationEuler=new Laya.Vector3(0,0,0);
			// 	rigidBody.isKinematic=false;
				
			// 	this.arrCurHitItem.push(obj);
            // }
        }
	}

	/**重置 */
    public reset():void{
        let obj:Laya.MeshSprite3D;
        for(let i=0;i<this.arrCurHitItem.length;i++){
            obj=this.arrCurHitItem[i];
            if(obj){
                obj.active=false;
            }
        }
	}
	

	/**射击目标是否都掉下来，都掉下来需要重置射击目标 */
    public checkReset():boolean{
        let obj:Laya.MeshSprite3D;
        let dropCount:number=0;
        for(let i=0;i<this.arrCurHitItem.length;i++){
            obj=this.arrCurHitItem[i];
            // if(obj.transform.position.y<0 || obj.transform.position.y>(this.gameUI.planeY+15)){
            //     dropCount++;
            // }
        }
        if(dropCount==this.arrCurHitItem.length){
            return true;
        }else{
            return false;
        }
    }
}