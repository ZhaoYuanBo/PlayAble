namespace game.common{
    /*
    *2019-05-05 andy 
    Matter 2D物理引擎管理类
    */
    export class MatterManager{
        private Matter:any = Laya.Browser.window.Matter;
        private LayaRender:any = Laya.Browser.window.LayaRender;
        /**鼠标控制实例 */
        private _mouseConstraint:Matter.MouseConstraint;
        private engine:any;
        private render:any;
        private gameWorld:Sprite;

        private static _ins:MatterManager;
        public static get ins():MatterManager{
            if(!this._ins)
                MatterManager._ins=new MatterManager();
            return this._ins;
        }
        constructor(){
            if(MatterManager._ins != null)
                throw new Error("MatterManager is single!");
        }
        /**
         * 获得Matter.MouseConstraint
         */
        public get mouseConstraint():Matter.MouseConstraint{
            return this._mouseConstraint;
        }

        public init():void{
            // 初始化物理引擎 enableSleeping: true睡眠模式
            this.engine = Matter.Engine.create({enableSleeping: true});
            Matter.Engine.run(this.engine);
            //采用Laya渲染
            this.gameWorld = new Sprite();
            Laya.stage.addChild(this.gameWorld);
            this.render = this.LayaRender.create({engine: this.engine,container:this.gameWorld.stage, width: Define.DeviceW, height: Define.DeviceH, options: {background: 'res/physics/img/background.png', wireframes: false}});
            this.LayaRender.run(this.render);
            
            //鼠标控制
            this.initMouse();
        }
        private initMouse():void{
            this._mouseConstraint = Matter.MouseConstraint.create(this.engine, {constraint:{id:0,render:this.render}});
            this.addWord(this._mouseConstraint);
            this.render.mouse = this._mouseConstraint.mouse;

            // if (!this.mouseConstraint) {
            //     if (this.engine && this.engine.render && this.engine.render.canvas) {
            //         this.mouseConstraint = Matter.MouseConstraint.create(this.engine.render.canvas);
            //     } else if (options && options.element) {
            //         mouse = Mouse.create(options.element);
            //     } else {
            //         mouse = Mouse.create();
            //         Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
            //     }
            // }
        }
        /**
         * 添加到世界
         * @param arr 
         */
        public addWord(body:any):void{
            if(!this.engine){
                console.error("Matter engine 未初始化！");
                return;
            }
       
            Matter.World.add(this.engine.world, body);
        }
        /**
         * 引擎注册事件
         * @param eventName 
         * @param callBack 
         */
        public regEvent(eventName:string,callBack:any):void{
            Matter.Events.on(this.engine, eventName, callBack);
        }
        /**
         * 场景尺寸发生改变
         */
        public onResize():void{
            if(!this.engine){
                return;
            }
            // 设置鼠标的坐标缩放
            // Laya.stage.clientScaleX代表舞台缩放
            // Laya.stage._canvasTransform代表画布缩放
            Matter.Mouse.setScale(this._mouseConstraint.mouse, {x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d)});
	
        }

        /**
         * collisionFilter 碰撞过滤 group -1不碰撞 1碰撞，category 类型，mask是组

         * 
         * 
         * Composites.pyramid 金字塔  Composites.stack 堆叠
         * 摩擦力 friction 空气摩擦力 frictionAir 静止摩擦力 frictionStatic
         */
    }     
}