

/*
2019-05-05 andy
* 跷跷板
*/
class SeesawWin extends BaseWindow{

    public ui:SeesawUI;
    constructor(){
        super(SeesawUI);
    }

    protected init():void{
        super.init();       
        this.ui=this.view as SeesawUI;    
    }

    public open():void{
		MatterManager.ins.init();
        this.initWorld();

		UIManager.ins.closeWindow(CustomWindow.main);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;

        switch(spName){
            case "btnBack":
                UIManager.ins.openWindow(CustomWindow.main);
				UIManager.ins.closeWindow(CustomWindow.seesaw);
            break;
            default:
            break;
        }
    }
    
    
    public close():void{

    }
	
	private initWorld():void
	{
		//地面
		var ground:any = Bodies.rectangle(395, 600, 815, 50, {isStatic: true, render: {visible: false}});

		var rectA=Bodies.rectangle(400,Define.DeviceH-100,40,200,{ isStatic:true,render:{ fillStyle:"#f00"},collisionFilter:{group:-1,mask:0,category:0}});
		var rectB=Bodies.rectangle(400,Define.DeviceH-180,400,40,{ render:{ fillStyle:"#00f" },collisionFilter:{group:-1,mask:0,category:0}});
		var rotate=Constraint.create({
				bodyA:rectA,
				pointA:{x:0,y:-80},
				bodyB:rectB,
				length:0,
				stiffness:0.9
	    });

var stack_rect=Composites.stack(100,100,4,3,0,0,function(x,y){ return Bodies.rectangle(x,y,100,40); }); 
		var stack_circle=Composites.stack(600,100,1,5,2,3,function (x,y) { return Bodies.circle(x,y,30); });
		
		MatterManager.ins.addWord([ground,stack_rect,stack_circle,rectA,rectB,MatterManager.ins.mouseConstraint,rotate]);
	}


}