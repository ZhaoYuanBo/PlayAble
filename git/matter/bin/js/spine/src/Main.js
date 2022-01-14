/*
* name;
*/
var Main = /** @class */ (function () {
    function Main() {
        //初始化微信小游戏
        Laya.MiniAdpter.init(true);
        //初始化引擎
        if (window["Laya3D"])
            Laya3D.init(Define.DeviceW, Define.DeviceH);
        else
            Laya.init(Define.DeviceW, Define.DeviceH, Laya.WebGL);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT; //Laya.Stage.SCALE_FIXED_WIDTH;
        //设置横竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //开启统计信息
        // Laya.Stat.show();
        // //设置版本控制类型为使用文件名映射的方式
        // Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        // //加载版本信息文件
        // Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.init));        
        Laya.URL.basePath = "";
        Laya.stage.bgColor = "ffffff";
        EventManager.ins.once(NoticeEvent.PLATFORM_INIT_OVER, this, this.PLATFORM_INIT_OVER);
        EventManager.ins.once(NoticeEvent.PLATFORM_LOGIN_SUCCESS, this, this.PLATFORM_LOGIN_SUCCESS);
        LayerManager.ins.init();
        SceneManager.ins.init();
        UIManager.ins.init();
        PlatformManager.ins.init({
            getRandomShare: Laya.Handler.create(ServerConfig.ins, ServerConfig.ins.getRandomShareUnit, null, false)
        });
    }
    Main.prototype.PLATFORM_INIT_OVER = function (e) {
        UIManager.ins.openWindow(CustomWindow.loading);
    };
    Main.prototype.PLATFORM_LOGIN_SUCCESS = function (e) {
        Game.ins.init();
    };
    return Main;
}());
new Main();
/*module laya
{
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Render = Laya.Render;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;
    
    export class Physics_Slingshot
    {
        private stageWidth:number = 800;
        private stageHeight:number = 600;
        
        private Matter:any = Browser.window.Matter;
        private LayaRender:any = Browser.window.LayaRender;
        
        private mouseConstraint:any;
        private engine:any;
        
        constructor()
        {
            Laya.init(this.stageWidth, this.stageHeight);
            
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            
            Laya.stage.scaleMode = "showall";
            
            this.setup();
        }
        
        private setup():void
        {
            this.initMatter();
            this.initWorld();
            
            Laya.stage.on("resize", this, this.onResize);
        }
        
        private initMatter():void
        {
            var gameWorld:Sprite = new Sprite();
            Laya.stage.addChild(gameWorld);
            
            // 初始化物理引擎
            this.engine = Matter.Engine.create({enableSleeping: true});
            Matter.Engine.run(this.engine);
            
            var render = this.LayaRender.create({engine: this.engine, width: 800, height: 600, options: {background: 'res/physics/img/background.png', wireframes: false}});
            this.LayaRender.run(render);
            
            this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {constraint: {angularStiffness: 0.1, stiffness: 2}, element: Render.canvas});
            Matter.World.add(this.engine.world, this.mouseConstraint);
            render.mouse = this.mouseConstraint.mouse;
        }
        
        private initWorld():void
        {
            var ground:any = Matter.Bodies.rectangle(395, 600, 815, 50, {isStatic: true, render: {visible: false}}), rockOptions:any = {density: 0.004, render: {sprite: {texture: 'res/physics/img/rock.png', xOffset: 23.5, yOffset: 23.5}}}, rock:any = Matter.Bodies.polygon(170, 450, 8, 20, rockOptions), anchor:any = {x: 170, y: 450}, elastic:any = Matter.Constraint.create({pointA: anchor, bodyB: rock, stiffness: 0.05, render: {lineWidth: 5, strokeStyle: '#dfa417'}});
            
            var pyramid:any = Matter.Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y, column):any
            {
                var texture:any = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
                return Matter.Bodies.rectangle(x, y, 25, 40, {render: {sprite: {texture: texture, xOffset: 20.5, yOffset: 28}}});
            });
            
            var ground2:any = Matter.Bodies.rectangle(610, 250, 200, 20, {isStatic: true, render: {fillStyle: '#edc51e', strokeStyle: '#b5a91c'}});
            
            var pyramid2:any = Matter.Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y, column):any
            {
                var texture:any = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
                return Matter.Bodies.rectangle(x, y, 25, 40, {render: {sprite: {texture: texture, xOffset: 20.5, yOffset: 28}}});
            });
            
            Matter.World.add(this.engine.world, [this.mouseConstraint, ground, pyramid, ground2, pyramid2, rock, elastic]);
            
            Matter.Events.on(this.engine, 'afterUpdate', function():any
            {
                if (this.mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430))
                {
                    rock = Matter.Bodies.polygon(170, 450, 7, 20, rockOptions);
                    Matter.World.add(this.engine.world, rock);
                    elastic.bodyB = rock;
                }
            }.bind(this));
        }
        
        private onResize():void
        {
            // 设置鼠标的坐标缩放
            // Laya.stage.clientScaleX代表舞台缩放
            // Laya.stage._canvasTransform代表画布缩放
            Matter.Mouse.setScale(this.mouseConstraint.mouse, {x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d)});
        }
    }
}
new laya.Physics_Slingshot();*/ 
