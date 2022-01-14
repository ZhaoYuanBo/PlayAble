namespace game.scene{
    /*
    * 2019-05-24 andy
        3D场景管理
    */
    export class Scene3DManager{
        //场景
        private scene3d:Laya.Scene;
        /**摄像机 */
        private camera : Laya.Camera;
        /**射线显示 */
        private debugSprites:Array<Laya.Sprite3D> = new Array<Laya.Sprite3D>();
        //坐标
        private tmpVector:Laya.Vector3;


        private static _ins:Scene3DManager;
        public static get ins():Scene3DManager{
            if(!this._ins)
                Scene3DManager._ins=new Scene3DManager();
            return this._ins;
        }
        constructor(){
            if(Scene3DManager._ins != null)
                throw new Error("Scene3DManager is single!");
            if (window["Laya3D"]){
                this.scene3d =LayerManager.ins.addChild(new Laya.Scene(),LayerName.scene_king)as Laya.Scene;
            }
        }
        /**初始化*/
        public init():void{
            this.initCamera();
        }

        private initCamera():void{
            //初始化照相机
            this.camera = this.scene3d.addChild(new Laya.Camera(Define.DeviceW/Define.DeviceH,0.1,1000))as Laya.Camera;
            this.camera.transform.translate(new Laya.Vector3(0,10,1));
            this.camera.transform.rotate(new Laya.Vector3(-5,0,0),true,false);
            this.camera.clearFlag=Laya.BaseCamera.CLEARFLAG_NONE;
            //this.camera.clearColor=null;
            //camera.addComponent(CameraMoveScript);
            //方向光
            let directionlight:Laya.DirectionLight = this.scene3d.addChild(new Laya.DirectionLight())as Laya.DirectionLight;
            directionlight.diffuseColor = new Laya.Vector3(0.6,0.6,0.6);
            //矩阵前向量变成了-1.0，-1.0，-1.0
            //不清楚是否识别01
            let mat = directionlight.transform.worldMatrix;
            mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
            directionlight.transform.worldMatrix = mat;
        }
        /**获得3D场景 */
        public getScene3D():Laya.Scene{
            if(!this.scene3d){
                //console.error("Scene3DManager 未进行初始化!");
            }
            return this.scene3d;
        }
        /**获得摄像机 */
        public getCamera():Laya.Camera{
            if(!this.camera){
                //console.error("Scene3DManager 未进行初始化!");
            }
            return this.camera;
        }
        
        /**
         * 绘制射线
         * @param from 起点
         * @param to   终点
         */
        public drawRayLine(from:Laya.Vector3,to:Laya.Vector3):void{
            if (this.debugSprites.length > 0) {
                for (let i = 0, n = this.debugSprites.length; i < n; i++)
                    this.debugSprites[i].destroy();
                this.debugSprites.length = 0;
            }
            // var lineSprite:Laya.PixelLineSprite3D = this.scene3d.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
            // //设置射线的起始点和颜色
            // lineSprite.addLine(from, to, Laya.Color.RED, Laya.Color.RED);
            // this.debugSprites.push(lineSprite);
        }

        private addBox():void
        {
            // var sX:number = Math.random()*0.75+0.25;
            // var sY:number = Math.random()*0.75+0.25;
            // var sZ:number = Math.random()*0.75+0.25;
            // //设置box模型
            // var box:Laya.MeshSprite3D = this.scene3d.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX,sY,sZ)))as Laya.MeshSprite3D;
            // //将box的模型赋予材质
            // box.meshRenderer.material = this.mat1;
            // //设置掉落位置
            // this.randPosition();
            // box.transform.position = this.tmpVector;
            // //设置旋转角度
            // this.tmpVector.setValue(Math.random()*360,Math.random()*360,Math.random()*360);
            // box.transform.rotationEuler = this.tmpVector;
            // //添加刚体组件
            // var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D);
            // var boxShape: Laya.BoxColliderShape = new Laya.BoxColliderShape(sX,sY,sZ);
            // rigidBody.colliderShape = boxShape;
            // //添加重力加速度
            // rigidBody.mass = 10;

            // this.setPhyzisController(box);
        }
        private addSphere():void
        {
            // var radius:number = Math.random() * 0.2 + 0.2;
            // var sphere: Laya.MeshSprite3D = this.scene3d.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(radius))) as Laya.MeshSprite3D;
            // sphere.meshRenderer.material = this.mat2;
            // this.randPosition();
            // sphere.transform.position = this.tmpVector;
            
            // var rigidBody:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
            // var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(radius);
            // rigidBody.colliderShape = sphereShape;
            // rigidBody.mass = 10;

            // this.setPhyzisController(sphere);
        }
        private addCapsule():void
        {
            // var raidius:number = Math.random() * 0.2 + 0.2;
            // var height:number = Math.random() * 0.5 + 0.8;
            // var capsule:Laya.MeshSprite3D = this.scene3d.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(raidius, height))) as Laya.MeshSprite3D;
            // capsule.meshRenderer.material = this.mat3;
            // this.randPosition();
            // capsule.transform.position = this.tmpVector;
            // this.tmpVector.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
            // capsule.transform.rotationEuler = this.tmpVector;
            
            // var rigidBody:Laya.Rigidbody3D = capsule.addComponent(Laya.Rigidbody3D);
            // var sphereShape:Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(raidius, height);
            // rigidBody.colliderShape = sphereShape;
            // rigidBody.mass = 10;
        }
        private addCone():void {
            // let raidius = Math.random() * 0.2 + 0.2;
            // let height = Math.random() * 0.5 + 0.8;
            // //创建圆锥MeshSprite3D
            // let cone = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCone(raidius, height));
            // this.scene3d.addChild(cone);
            // //设置材质
            // cone.meshRenderer.material = this.mat4;
            // //设置位置
            // this.randPosition();
            // cone.transform.position = this.tmpVector;
            // //创建刚体碰撞器
            // let rigidBody = cone.addComponent(Laya.Rigidbody3D);
            // //创建球型碰撞器
            // let coneShape = new Laya.ConeColliderShape(raidius, height);
            // //设置刚体碰撞器的形状
            // rigidBody.colliderShape = coneShape;
            // //设置刚体碰撞器的质量
            // rigidBody.mass = 10;	
        }
        private addCylinder():void {
            // let raidius = Math.random() * 0.2 + 0.2;
            // let height = Math.random() * 0.5 + 0.8;
            // //创建圆柱MeshSprite3D
            // let cylinder = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCylinder(raidius, height));
            // this.scene3d.addChild(cylinder);
            // //设置材质
            // cylinder.meshRenderer.material = this.mat5;
            // //设置位置
            // this.randPosition();
            // cylinder.transform.position = this.tmpVector;
            // //设置圆柱MeshSprite3D的欧拉角
            // this.tmpVector.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
            // cylinder.transform.rotationEuler = this.tmpVector;
            // //创建刚体碰撞器
            // let rigidBody = cylinder.addComponent(Laya.Rigidbody3D);
            // //创建球型碰撞器
            // let cylinderShape = new Laya.CylinderColliderShape(raidius, height);
            // //设置刚体碰撞器的形状
            // rigidBody.colliderShape = cylinderShape;
            // //设置刚体碰撞器的质量
            // rigidBody.mass = 10;
        } 
    }
}