import GameManager from "./GameManager";


export default class CameraController extends Laya.Script3D {

    constructor() {
        super();
    }

    mysprite3d: Laya.Camera = null;
    trans: Laya.Transform3D = null;
    /**开关 */
    isStart: boolean = false;

    //初始的距离值
    distancepos: Laya.Vector3 = new Laya.Vector3(0, 0, 0);

    target: Laya.Transform3D;

    init() {
        this.mysprite3d = this.owner as Laya.Camera;
        this.trans = this.mysprite3d.transform;
        this.target = GameManager.Instance.role.transform;

        // Laya.Tween.from(this.mysprite3d.transform, { localPositionY: 1000 }, 5000, null, Laya.Handler.create(this.mysprite3d, () => {


        // }));

        //初始距离，用相机角色;
        Laya.Vector3.subtract(this.trans.position, this.target.position, this.distancepos);

        this.isStart = false;
    }

    setStart(boo: boolean) {
        this.isStart = boo;
    }

    onUpdate() {
        if (!this.isStart)
            return;

        let _targetpos = new Laya.Vector3();

        Laya.Vector3.add(this.target.position, this.distancepos, _targetpos);

        //非插值
        //this.trans.position = _targetpos;

        let tmpPos = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.lerp(this.trans.position, _targetpos, 0.8, tmpPos);
        this.trans.position = _targetpos;     //插值向量

        this.trans.position = new Laya.Vector3(0,_targetpos.y,_targetpos.z);
    }
}