import { Game } from "../Game";
import GameManager from "./GameManager";


export default class MoveController extends Laya.Script3D {
    constructor() {
        super();
    }

    mysprite3d: Laya.Sprite3D = null;
    transfrom: Laya.Transform3D = null;

    /**开关 */
    isStart: boolean = false;

    speed: Laya.Vector3 = new Laya.Vector3(0, 0, 0.3);
    speed2: Laya.Vector3 = new Laya.Vector3(0, 0, -1.5);

    _speed: number = 0.2;
    _distance: number = 0;

    init() {
        this.mysprite3d = this.owner as Laya.Sprite3D;
        this.transfrom = this.mysprite3d.transform;
        this._distance = 0;
        this.isStart = false;
    }

    setStart(boo: boolean) {
        this.isStart = boo;
    }

    onUpdate() {
        //此处可以加一个开关判定  isplay
        if (GameManager.Instance.isend) {
            return;
        }
        if (!this.isStart) {
            return;
        }

        this._distance += this._speed;

        if (this._distance > 40) {
            this._distance = 0;
        }
        this.transfrom.translate(this.speed, false);
        let roleUi: Laya.Transform3D = GameManager.Instance._uiPoint;
        roleUi.translate(this.speed, false);
        let x: number = this.transfrom.position.x;
        let y: number = this.transfrom.position.y;
        let z: number = this.transfrom.position.z;
        GameManager.Instance.effRoleLan.transform.position = new Laya.Vector3(x, y + 0.8, z);
        GameManager.Instance.effRoleHong.transform.position = new Laya.Vector3(x, y + 0.8, z);

        this.updateEnemy();

    }

    updateEnemy() {
        let enemys = GameManager.Instance.gesilas;
        if (GameManager.Instance.ispk) {
            for (var i = 0; i < enemys.length; i++) {
                if (i == GameManager.Instance.enemyIndex) {
                    enemys[i].transform.lookAt(this.transfrom.position, new Laya.Vector3(0, 1, 0), true);
                    enemys[i].transform.translate(this.speed2, true);    //战斗pk
                    enemys[i].transform.rotation = new Laya.Quaternion(0, 180);
                }
            }
            if (GameManager.Instance.enemyIndex >= 31) {
                this.speed = new Laya.Vector3(0, 0, 0.3);
                GameManager.Instance.ispk = false;
                return;
            }
            else {
                this.speed = new Laya.Vector3(0, 0, 0.05);
            }
        }


    }
}