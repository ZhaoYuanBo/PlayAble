import { base64_blue2 } from "../custom/res/blue2";
import { CustomBase64 } from "../custom/res/CustomBase64";
import EffectTool from "../util/EffectTool";
import { UtilTween3D } from "../util/tween3d";
import CameraController from "./CameraController";
import MoveController from "./MoveController";
import RoleController from "./RoleController";



export default class GameManager {
    static _instance: GameManager = null;
    static get Instance(): GameManager {
        if (this, this._instance == null)
            this._instance = new GameManager();

        return this._instance;
    }

    currentScene: Laya.Scene3D;
    _camera: Laya.Camera;
    _camraSp: Laya.Sprite3D;
    _camraSp2: Laya.Sprite3D;


    _uiPoint: Laya.Transform3D;
    /**角色父 */
    // roles: Laya.Sprite3D;
    /**左右移动的角色 */
    role: Laya.Sprite3D;
    /**角色模型 */
    rolemesh: Laya.SkinnedMeshSprite3D;
    /**角色动画 */
    animator: Laya.Animator;

    /**头上的显示number */
    _myheadNum: number = 1;

    /**移动的组件 */
    moveController: MoveController;

    /**相机组件 */
    cameraController: CameraController;

    isend: boolean = false;
    isStartBoss: boolean = false;


    effRoleLan: Laya.Sprite3D;
    effRoleHong: Laya.Sprite3D;

    //旋转
    private rotation: Laya.Vector3;

    //哥斯拉
    gesilas: Laya.Sprite3D[] = [];
    ispk: boolean = false;
    enemyIndex: number = 0;

    public init(scene: Laya.Scene3D, act: Function) {
        this.currentScene = scene as Laya.Scene3D;
        this._camera = this.currentScene.getChildByName("Main Camera") as Laya.Camera;
        this._camraSp = this.currentScene.getChildByName("Main Camera") as Laya.Sprite3D;
        this._camraSp2 = this.currentScene.getChildByName("Camera2") as Laya.Sprite3D;
        this._camera.enableHDR = false;//  某些型号的手机会黑屏
        this._camraSp2.active = false;
        let light = this.currentScene.getChildByName("Directional Light") as Laya.DirectionLight;
        // Use soft shadow.
        light.shadowMode = Laya.ShadowMode.Hard;
        // Set shadow max distance from camera.
        light.shadowDistance = 60;
        // Set shadow resolution.
        light.shadowResolution = 1024;
        // Set shadow cascade mode.
        light.shadowCascadesMode = Laya.ShadowCascadesMode.NoCascades;
        // Set shadow normal bias.
        // light.shadowNormalBias = 4;
        light.shadowStrength = 0.3;

        //地面材质
        // let floor = this.currentScene.getChildByName("floor") as Laya.MeshSprite3D;
        // let floor1 = floor.getChildByName("m_floorbox01") as Laya.MeshSprite3D;
        // floor1.meshRenderer.castShadow = true;
        // floor1.meshRenderer.receiveShadow = true;
        this.rotation = new Laya.Vector3(0, 0.01, 0);

        //擂台材质
        let boxStage = this.currentScene.getChildByName("zhangai").getChildByName("m_bossStage") as Laya.MeshSprite3D;
        let man2: Laya.Animator = this.currentScene.getChildByName("Man04").getComponent(Laya.Animator) as Laya.Animator;
        let man2Mesh: Laya.SkinnedMeshSprite3D = this.currentScene.getChildByName("Man04").getChildAt(3) as Laya.SkinnedMeshSprite3D;
        man2Mesh.skinnedMeshRenderer.castShadow = true;
        man2.play("combo");


        //角色材质
        this.role = this.currentScene.getChildByName("role") as Laya.Sprite3D;
        this._uiPoint = new Laya.Transform3D(this.role);
        this.rolemesh = this.role.getChildByName("Man04").getChildAt(3) as Laya.SkinnedMeshSprite3D;

        this.rolemesh.skinnedMeshRenderer.castShadow = true; //产生阴影

        // var rotation = 60;
        // Laya.timer.loop(1000,role,()=>{ 
        //     role.transform.rotate(new Laya.Vector3(0,rotation,0),false,false);  //旋转测试
        // })

        //两种人物特效
        this.effRoleLan = this.currentScene.getChildByName("role").getChildByName("roleLan") as Laya.Sprite3D;
        this.effRoleHong = this.currentScene.getChildByName("role").getChildByName("roleHong") as Laya.Sprite3D;
        this.effRoleHong.active = false;
        this.effRoleLan.active = false;


        let beishu1 = this.currentScene.getChildByName("zhangai").getChildByName("baishu_up1").getChildByName("Number") as Laya.MeshSprite3D;
        let beishu2 = this.currentScene.getChildByName("zhangai").getChildByName("baishu_up2").getChildByName("Number") as Laya.MeshSprite3D;
        let beishu3 = this.currentScene.getChildByName("zhangai").getChildByName("baishu_up3").getChildByName("Number") as Laya.MeshSprite3D;
        let beishu4 = this.currentScene.getChildByName("zhangai").getChildByName("baishu_up4").getChildByName("Number") as Laya.MeshSprite3D;
        console.error(beishu1);
        this.animator = this.role.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
        this.animator.play("combo");
        if (Base64Manager.isUseBase64) {


            //man2 
            // Base64Manager.ins.checkMaterial(floor1.meshRenderer.material, CustomBase64.plan);
            Base64Manager.ins.checkMaterial(this.rolemesh.skinnedMeshRenderer.material, CustomBase64.blue2);
            Base64Manager.ins.checkMaterial(boxStage.meshRenderer.material, CustomBase64.t_bossStage02);
            Base64Manager.ins.checkMaterial(man2Mesh.skinnedMeshRenderer.material, CustomBase64.blue2);
            Base64Manager.ins.checkMaterial(beishu1.meshRenderer.material, CustomBase64.shu20);
            Base64Manager.ins.checkMaterial(beishu2.meshRenderer.material, CustomBase64.shu25);
            Base64Manager.ins.checkMaterial(beishu3.meshRenderer.material, CustomBase64.shu40);
            Base64Manager.ins.checkMaterial(beishu4.meshRenderer.material, CustomBase64.shu20);

            //障碍材质
            for (var i = 0; i < 4; i++) {
                let beishu2 = this.currentScene.getChildByName("zhangai").getChildByName("baishu_up" + (i + 1).toString()).getChildByName("beishu") as Laya.MeshSprite3D;
                Base64Manager.ins.checkMaterial(beishu2.meshRenderer.material, CustomBase64.light);

            }

            for (var i = 0; i < this.currentScene.getChildByName("blue").numChildren; i++) {
                let mesh = this.currentScene.getChildByName("blue").getChildAt(i) as Laya.MeshSprite3D;
                mesh.meshRenderer.castShadow = true;
                Base64Manager.ins.checkMaterial(mesh.meshRenderer.material, CustomBase64.t_ice);

                Laya.timer.frameLoop(1, this, function () {
                    mesh.transform.rotate(this.rotation, false);
                });
            }

            for (var i = 0; i < this.currentScene.getChildByName("red").numChildren; i++) {
                let mesh = this.currentScene.getChildByName("red").getChildAt(i) as Laya.MeshSprite3D;

                mesh.meshRenderer.castShadow = true;
                Base64Manager.ins.checkMaterial(mesh.meshRenderer.material, CustomBase64.kt727);
                Laya.timer.frameLoop(1, this, function () {
                    mesh.transform.rotate(this.rotation, false);
                });
            }

            for (var i = 0; i < this.currentScene.getChildByName("doorred").numChildren; i++) {
                let mesh = this.currentScene.getChildByName("doorred").getChildAt(i) as Laya.MeshSprite3D;
                Base64Manager.ins.checkMaterial(mesh.meshRenderer.materials[1], CustomBase64.light);

                let eff: Laya.ShuriKenParticle3D = this.currentScene.getChildByName("doorred").getChildAt(i).getChildByName("effect2").getChildAt(0) as Laya.ShuriKenParticle3D;
                let effrender = eff.particleRenderer.material;
                Laya.loader.load(CustomBase64.t_s09081.base64Img, Laya.Handler.create(this, (e) => {
                    //console.log(e);
                    if (effrender instanceof Laya.ShurikenParticleMaterial) {
                        effrender.texture = e.bitmap;
                    }
                }
                ));
            }

            for (var i = 0; i < this.currentScene.getChildByName("doorblue").numChildren; i++) {
                let mesh = this.currentScene.getChildByName("doorblue").getChildAt(i) as Laya.MeshSprite3D;
                Base64Manager.ins.checkMaterial(mesh.meshRenderer.materials[1], CustomBase64.light);

                let eff: Laya.ShuriKenParticle3D = this.currentScene.getChildByName("doorblue").getChildAt(i).getChildByName("effect1").getChildAt(0) as Laya.ShuriKenParticle3D;
                let effrender = eff.particleRenderer.material;
                Laya.loader.load(CustomBase64.t_s09081.base64Img, Laya.Handler.create(this, (e) => {
                    //console.log(e);
                    if (effrender instanceof Laya.ShurikenParticleMaterial) {
                        effrender.texture = e.bitmap;
                    }
                }
                ));
            }

            //road
            let road = this.currentScene.getChildByName("road") as Laya.Sprite3D;
            let roadMesh = road as Laya.MeshSprite3D;
            roadMesh.meshRenderer.receiveShadow = true;
            Base64Manager.ins.checkMaterial(roadMesh.meshRenderer.material, CustomBase64.road_0);

            for (var i = 0; i < 30; i++) {
                let nRoad = Laya.Sprite3D.instantiate(road, this.currentScene) as Laya.Sprite3D;
                nRoad.transform.position = new Laya.Vector3(road.transform.position.x, road.transform.position.y, road.transform.position.z + (i * 8.7));
            }


            //哥斯拉
            let gesila = this.currentScene.getChildByName("enemy") as Laya.Sprite3D;
            let mesh = this.currentScene.getChildByName("enemy").getChildByName("m_qiutixiaoren") as Laya.SkinnedMeshSprite3D;
            //Base64Manager.ins.checkMaterial(mesh.skinnedMeshRenderer.material, CustomBase64.gsila);
            mesh.skinnedMeshRenderer.castShadow = true;

            this.gesilas.push(gesila);
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 3; j++) {
                    let cGesila = Laya.Sprite3D.instantiate(gesila, this.currentScene) as Laya.Sprite3D;
                    cGesila.transform.position = new Laya.Vector3(gesila.transform.position.x - (i * 0.6), gesila.transform.position.y, gesila.transform.position.z+(j*3));
                    this.gesilas.push(cGesila);
                }

            }

            Laya.timer.once(300, this, () => {
                act();    //延迟加载防止白屏
            })

        }
        this.rolemesh.skinnedMeshRenderer.castShadow = true; //产生阴影
    }

    /**
     * 初始化游戏
     */
    initGame(): void {
        let _roleCom = this.role.getComponent(MoveController) as MoveController;
        if (!_roleCom) {
            _roleCom = this.role.addComponent(MoveController) as MoveController;
            this.moveController = _roleCom;
        }

        _roleCom.init();
        _roleCom.setStart(true);

        //相机移动的组件
        let _camCom = this._camera.getComponent(CameraController) as CameraController;

        if (!_camCom) {
            _camCom = this._camera.addComponent(CameraController) as CameraController;
            this.cameraController = _camCom;
        }

        //角色碰撞组件
        let _rolesCom = this.role.getChildAt(0).getComponent(RoleController) as RoleController;
        if (!_rolesCom) {
            _rolesCom = this.role.getChildAt(0).addComponent(RoleController) as RoleController;
        }

        _camCom.init();
        _camCom.setStart(true);
        this.runGame();
    }

    /**
     * 游戏真正开始
     */
    runGame(): void {
        this.animator.play("running");
    }


    /**
     * 
     * @param ui
     */
    set2dPos(ui: any) {
        if (this._camera || this.role == null)
            return;
        let _outPos: Laya.Vector4 = new Laya.Vector4();
        this._camera.viewport.project(this.role.transform.position, this._camera.projectionViewMatrix, _outPos)
        ui.pos(_outPos.x, _outPos.y);
    }


    checkPlayerState(state: number): void {
        if (state == 1) {
            Base64Manager.ins.checkMaterial(this.rolemesh.skinnedMeshRenderer.material, CustomBase64.t_ice);
        }
        else if (state == 2) {
            Base64Manager.ins.checkMaterial(this.rolemesh.skinnedMeshRenderer.material, CustomBase64.kt727);
        }
    }
    setEnd() {
        console.log("相机移动");
        this.animator.play("combo");
        this.moveController.setStart(false);
        this.cameraController.setStart(false);
        UtilTween3D.to(this._camraSp, new Laya.Vector3(-18, 12, 204));
        // this._camraSp.active = false;
        // this._camraSp2.active = true;
        Laya.timer.loop(10, this._camraSp, () => {
            let newPosition = new Laya.Vector3(this.role.transform.position.x, this.role.transform.position.y + 2, this.role.transform.position.z + 2)
            this._camraSp.transform.lookAt(newPosition, new Laya.Vector3(0, 1, 0), true);

        })
    }

    // /**相机缓动移动到目标点 */
    // cameraRoateToLookAt(target:Laya.Transform,rotateSpeed:number){ 
    //    //取得目标体相对于相机的法向量
    //    let 
    // }
    setEffPeople(type: number) {  //1蓝，2红
        this.effRoleLan.active = type == 1 ? true : false;
        this.effRoleHong.active = type == 2 ? true : false;
        let rScale = this.role.transform.localScaleX;
        let nScale = 1 / rScale;
        Laya.timer.once(10, this.effRoleHong, () => {

            UtilTween3D.to(this.effRoleHong, new Laya.Vector3(0, 0, 0), "scale", 350, null, Laya.Handler.create(this.effRoleHong, () => {
                this.role.transform.localScaleX += 0.3;
                this.role.transform.localScaleY += 0.3;
                this.role.transform.localScaleZ += 0.3;
                this.effRoleLan.transform.localScale = this.effRoleHong.transform.localScale = new Laya.Vector3(nScale, nScale, nScale);
                this.effRoleHong.active = this.effRoleLan.active = false;
            }));
            UtilTween3D.to(this.effRoleLan, new Laya.Vector3(0, 0, 0), "scale", 350, null, Laya.Handler.create(this.effRoleHong, () => {
                this.role.transform.localScaleX += 0.3;
                this.role.transform.localScaleY += 0.3;
                this.role.transform.localScaleZ += 0.3;
                this.effRoleLan.transform.localScale = this.effRoleHong.transform.localScale = new Laya.Vector3(nScale, nScale, nScale);
                this.effRoleHong.active = this.effRoleLan.active = false;

            }));
        })
    }
}