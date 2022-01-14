import { CustomWindow } from "../custom/ui/CustomWindow";
import GameManager from "./GameManager";
import GameUI from "./GameUI";



export default class RoleController extends Laya.Script3D {

    constructor() {
        super();
    }

    private scaleNum: number = 1;

    private roletype: number = 1; //1是红色，2是蓝色

    init(): void {

    }


    setStart(boo: boolean) {

    }
    onUpdate(): void {

    }
    onTriggerEnter(other: Laya.PhysicsCollider) {
        let _owner = other.owner as Laya.Sprite3D;
        console.error(_owner.name);
        switch (_owner.name) {
            case "redqiu":
                _owner.active = false;
                this.checkNum(2);
                break;
            case "blueqiu":
                _owner.active = false;
                this.checkNum(1);
                break;
            case "door_blue":
                GameManager.Instance.checkPlayerState(1);
                this.roletype = 1;
                break;
            case "door_red":
                GameManager.Instance.checkPlayerState(2);
                this.roletype = 2;
                break;
            case "end":
                GameManager.Instance.isend = true;
                GameManager.Instance.isStartBoss = true;
                GameManager.Instance.setEnd();
                break;
            case "baishu_up1":
                GameManager.Instance._myheadNum += 20;
                GameManager.Instance.setEffPeople(this.roletype);
                break;
            case "baishu_up2":
                GameManager.Instance._myheadNum += 25;
                GameManager.Instance.setEffPeople(this.roletype);
                break;
            case "baishu_up3":
                GameManager.Instance._myheadNum += 40;
                GameManager.Instance.setEffPeople(this.roletype);
                break;
            case "baishu_up4":
                GameManager.Instance._myheadNum += 20;
                GameManager.Instance.setEffPeople(this.roletype);
                break;
            case "ispk":
                setTimeout(() => {
                    GameManager.Instance.ispk = true;
                }, 1000);
                break;

            case "enemy":
                // let anim = _owner.getComponent(Laya.Animator) as Laya.Animator;
                // anim.play("die");
                _owner.active = false;
                GameManager.Instance.enemyIndex++;
                this.checkNum(2);

                //GameManager.Instance.gesilas.splice(0, 1);
                break;

        }
    }

    /**
     * 根据状态增加数值
     * @param balltype 
     */
    checkNum(balltype: number): void {

        let wnd: GameUI = UIManager.ins.getWindow(CustomWindow.game);
        var num = GameManager.Instance._myheadNum;
        this.scaleNum = GameManager.Instance.role.transform.localScaleX;
        if (this.roletype == 1) {
            if (balltype == 1) {
                GameManager.Instance._myheadNum++;
                this.scaleNum += 0.05;
                wnd.ui.ui_roleshow.y -= 5;
                GameManager.Instance.role.transform.localScale = new Laya.Vector3(this.scaleNum, this.scaleNum, this.scaleNum);
            }
            else if (balltype == 2) {
                GameManager.Instance._myheadNum--;
                this.scaleNum -= 0.05;
                wnd.ui.ui_roleshow.y += 5;
                GameManager.Instance.role.transform.localScale = new Laya.Vector3(this.scaleNum, this.scaleNum, this.scaleNum);
                if (num <= 0) {
                    GameManager.Instance._myheadNum = 0;
                    GameManager.Instance.isend = true;
                    UIManager.ins.openWindow(CustomWindow.fail);
                }
            }
        }
        else if (this.roletype == 2) {
            if (balltype == 1) {
                GameManager.Instance._myheadNum--;
                this.scaleNum -= 0.05;
                wnd.ui.ui_roleshow.y += 5;
                GameManager.Instance.role.transform.localScale = new Laya.Vector3(this.scaleNum, this.scaleNum, this.scaleNum);
                if (num <= 0) {
                    GameManager.Instance._myheadNum = 0;
                    GameManager.Instance.isend = true;
                    UIManager.ins.openWindow(CustomWindow.fail);
                }
            }
            else if (balltype == 2) {
                GameManager.Instance._myheadNum++;
                this.scaleNum += 0.05;
                wnd.ui.ui_roleshow.y -= 5;
                GameManager.Instance.role.transform.localScale = new Laya.Vector3(this.scaleNum, this.scaleNum, this.scaleNum);
            }
        }
    }
}