//import Animation=Laya.Animation;
/*
* SPINE动画界面
2020-01-08 andy
*/
class SpineWin extends BaseWindow{
    private isBgWhite:boolean=true;
    
    private startx:number=20;
    private starty:number=300;
    private curBone:BaseBone;
    private curBoneName:string="";

    public ui:SpineUI;
    constructor(){
        super(SpineUI);
    }

    protected init():void{
        super.init();       
        this.ui=this.view as SpineUI;
        //SceneManager.ins.setBackground(Define.CDN+"/atlas/not/bg_game.jpg");
       //this.ui.spBgColor.alpha=0;
    }

    public open():void{
        super.open();

        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,(evt)=>{
        //     this.broken.x= Laya.stage.mouseX;
        //     this.broken.y= Laya.stage.mouseY;
        //     this.broken.play(true);
        // });
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        if(this.curBoneName==spName){
            if(this.curBone){
                this.curBone.play(true);
            }
            return;
        }else{
            this.curBoneName=spName;
        }
        // BoneManager.ins.removeBoneAll();
        if(this.curBone){
            this.curBone.stop();
        }
        
        switch(spName){
            case "btnClose":
               UIManager.ins.closeWindow(CustomWindow.frame);
            break;
            case "btnBgColor":
                this.isBgWhite = !this.isBgWhite;
                this.ui.spBgColor.graphics.drawRect(0,0,Define.DeviceW,Define.DeviceH,this.isBgWhite?"#ffffff":"#000000");
            break;
            case "btnAlien":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_alien);
            break;
            case "btnDragon":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_dragon);
            break;
            case "btnArmorgirl":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_armorgirl);
            break;
            case "btnGreengirl":
               this.curBone=BoneManager.ins.createBone(CustomBase64.bone_greengirl);
            break;
            case "btnOrangegirl":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_orangegirl);
            break;
            case "btnSpineboy":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_spineboy);
            break;
            case "btnRaptor":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_raptor);
            break;
            case "btnTank":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_tank);
            break;
            case "btnTransforms":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_transforms);
            break;
            case "btnVine":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_vine);
            break;
            case "btnBroken":
                this.curBone=BoneManager.ins.createBone(CustomBase64.bone_broken);
            break;
            default:
            break;
        }
        if(this.curBone){
            this.curBone.x=400;
            this.curBone.y=1000;
            this.curBone.scaleX=this.curBone.scaleY=0.5;
            this.curBone.play(true,LayerName.ui_effect);
        }
    }
    
    
    public close():void{

    }
}