import GameUI from "./GameUI";

export default class GameMono extends Laya.Script3D {
    public transform : Laya.Transform3D = null;
    protected rigidbody : Laya.Rigidbody3D = null;

    public gameUI:GameUI;
    public isFire:boolean=false;
    public vecForce:Laya.Vector3=new Laya.Vector3();
    public vecImpulse:Laya.Vector3=new Laya.Vector3();


    private out:Laya.Vector3=new Laya.Vector3();
    private outRate:Laya.Vector3=new Laya.Vector3(300,300,300);
    private out2:Laya.Vector3=new Laya.Vector3();
    private out2Rate:Laya.Vector3=new Laya.Vector3(50,50,50);
    private lastTime:number=0;

    public  onAwake():void {
        this.transform=(this.owner as Laya.Sprite3D).transform;
        this.rigidbody = this.owner.getComponent(Laya.Rigidbody3D);
    }
    public onStart() : void{
        this.rigidbody.clearForces();
        this.rigidbody.angularFactor = new Laya.Vector3(0,0,0)
    }
    public onUpdate() :void{
        if(this.isFire){
            this.rigidbody.applyForce(this.vecForce);
            this.rigidbody.applyImpulse(this.vecImpulse);
            if((this.transform.position.z<-200 || this.transform.position.y<-10) && Laya.timer.currTimer-this.lastTime>50){
                //console.log("关闭作用力 update",Laya.timer.currTimer-this.lastTime,this.transform.position);
                this.isFire=false;
                this.owner.active=false;
                this.rigidbody.clearForces();
                //this.gameUI.fireEnd(false);
            }
        }     
    }
    public onCollisionEnter(collision:Laya.Collision):void {
        //console.log('碰撞了');
        if(this.isFire){
            //console.log("关闭作用力 onCollisionEnter",Laya.timer.currTimer-this.lastTime,this.transform.position);
            this.isFire=false;
           // this.gameUI.fireEnd(true);
        }
    }

    
    public setGameUI(v:GameUI):void{
        this.gameUI= v;
    }
    public fire():void{
        // this.rigidbody.clearForces();
        // this.rigidbody.angularFactor = new Laya.Vector3(0,0,0);
        //console.log("启用作用力",this.transform.position);
        this.lastTime=Laya.timer.currTimer;
        this.isFire=true;
        this.owner.active=true;
    }
    /**
     * 设置作用力
     * @param v 
     */
    public setForce(v:Laya.Vector3):void{
        //console.log("射击方向",v);
        Laya.Vector3.multiply(v,this.outRate,this.out);
        this.vecForce=this.out;

        Laya.Vector3.multiply(v,this.out2Rate,this.out2);
        this.vecImpulse=this.out2;
    }
}