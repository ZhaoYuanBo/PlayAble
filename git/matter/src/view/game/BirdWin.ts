

/*
2019-05-05 andy
* 奋斗的小鸟
*/
class BirdWin extends BaseWindow{

    public ui:BirdUI;
    constructor(){
        super(BirdUI);
    }

    protected init():void{
        super.init();       
        this.ui=this.view as BirdUI;    
    }

    public open():void{
	
        this.initWorld();
		//this.initWord2();

		UIManager.ins.closeWindow(CustomWindow.main);
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;

        switch(spName){
            case "btnBack":
                UIManager.ins.openWindow(CustomWindow.main);
				UIManager.ins.closeWindow(CustomWindow.bird);
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
		let wt:number=200;
		let centerX:number=Define.DeviceW>>1;
		var ground:any = Bodies.rectangle(Define.DeviceW>>1, 600, wt, 30, {isStatic: true, render: {visible: true}}),
		//摇杆 
		rockOptions:any = {density: 0.004, render: {sprite: {texture: 'res/physics/img/rock.png', xOffset: 23.5, yOffset: 23.5}}}, 
		rock:any = Bodies.polygon(170, 450, 6, 20, rockOptions), 
		anchor:any = {x: 170, y: 450},
		elastic:any = Constraint.create({pointA: anchor, bodyB: rock, stiffness: 0.05, render: {visible:true,lineWidth: 5, strokeStyle: '#dfa417'}});

		//障碍物
		var pyramid:any = Composites.pyramid(centerX-wt/2, 300, 5, 10, 0, 0, function(x, y, column):any
		{
			var texture:any = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
			return Bodies.rectangle(x, y, 25, 40, {render: {sprite: {texture: texture,xScale:1,yScale:1}}});
		});
		
		//
		
		MatterManager.ins.addWord([ground, pyramid,  rock,elastic]);
		MatterManager.ins.regEvent('afterUpdate',()=>
		{
			if (MatterManager.ins.mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430))
			{
				rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
				MatterManager.ins.addWord(rock);
				elastic.bodyB = rock;
			}
		});
	}

	private initWord2():void{
		/**创建刚体
		 * Bodies.rectangle = function(x, y, width, height, options)
		 * x,y 分别表示矩形中心点的坐标，坐标的原点(0,0)在 Canvas(画布)的左上角
		 * width,height 分别表示矩形的宽和高
		 * options：描述矩形的参数，是一个 json 对象
		 * @type {body}
		 */
		var boxA:any = Bodies.rectangle(250, 0, 80, 80);//绘制矩形。
		var circle:any = Bodies.circle(300, 50, 25);//绘制圆。（300,50）表示圆心坐标点，25 表示半径
		var polygon:any = Bodies.polygon(350, 100, 5, 25);//绘制多边形。(350,100)表示多边形中心点，5表示多边形边数，25表示半径
		var trapezoid:any = Bodies.trapezoid(500, 100, 50, 80, 1);//绘制梯形。(500,100)表示梯形中心坐标，50表示宽，80表示高，1表示斜坡率(slope)

		//创建矩形作为陆地,isStatic=true 表示物体静止
		var ground:any = Bodies.rectangle(400, 30, 800, 60, {isStatic: true,render:{fillStyle: '#edc51e', strokeStyle: '#b5a91c'}});

		//将所有物体添加到世界中
		MatterManager.ins.addWord([boxA, circle, polygon, trapezoid,  ground]);
	}

}