
/*
2019-05-20 andy
* 游戏界面
*/
class GameWin extends BaseWindow{
    private world:CANNON.World;

    private sphereShape;
    private sphereBody;
    private physicsMaterial;
    private walls=[];
    private  balls=[];
    private  ballMeshes=[];boxes=[];
    private  boxMeshes=[];

    private camera;
    private scene;
    private renderer;
    private geometry;
    private material;
    private mesh;
    //炮
    private dt = 1/60;
    private ballShape = new CANNON.Sphere(0.2);
    private ballGeometry = null;
    private shootDirection = new THREE.Vector3();
    private shootVelo = 15;
    private projector = new THREE.Projector();
    private label: Laya.Label;

    private isDownload:boolean=false;
    public ui:GameUI;
    constructor(){
        super(GameUI);
    }

    protected init():void{
        super.init();
        this.ui=this.view as GameUI;
    }

    public open():void{   
        this.ballGeometry = new THREE.SphereGeometry(this.ballShape.radius, 32, 32);

        Laya.timer.frameLoop(1,this,this.update);
        this.ui.stage.on(Laya.Event.CLICK,this,this.stageClick);
        UIManager.ins.closeWindow(CustomWindow.main);

        this.initCannon();
        this.initScene();
    }


    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnDownload":
                //this.isDownload=true;
                //2019-05-01 跳到下载页面，并未下载，直接返回，这时还能继续游戏
                Laya.timer.once(2000,this,()=>{
                    //this.isDownload=false;
                })
                HttpManager.ins.link(CustomDefine.downloadUrl);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
            break;
            case "btnCreateFarm":
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
            break;
            default:
            break;
        }
    }
     //点击场景
    private stageClick(e:MouseEvent):void{
        this.playFireEffect();
    }
    


    private playFireEffect():void{
        // TweenManager.ins.play(false,"fire");
        // let oldY:number=this.cannon.position.y;
        // Tween.to(this.cannon.position,{y:oldY+100},100,null,Laya.Handler.create(this,()=>{
        //     Tween.to(this.cannon.position,{y:oldY},200);
        // }));

        // if (this._outHitInfo.distance !== -1) {
        //     Laya.Vector3.add(this._outHitInfo.position, this._offsetVector3, this._vector3);
        //     Laya.Tween.to(this._position, { x: this._vector3.x, y: this._vector3.y, z: this._vector3.z }, 300/**,Ease.circIn*/);
        // }

        var x = this.sphereBody.position.x;
        var y = this.sphereBody.position.y;
        var z = this.sphereBody.position.z;
        var ballBody = new CANNON.Body({ mass: 1 });
        ballBody.addShape(this.ballShape);
        var ballMesh = new THREE.Mesh( this.ballGeometry, this.material );
        this.world.addBody(ballBody);
        this.scene.add(ballMesh);
        ballMesh.castShadow = true;
        ballMesh.receiveShadow = true;
        this.balls.push(ballBody);
        this.ballMeshes.push(ballMesh);
        this.getShootDir(this.shootDirection);
        ballBody.velocity.set(  this.shootDirection.x * this.shootVelo,
                                this.shootDirection.y * this.shootVelo,
                                this.shootDirection.z * this.shootVelo);

        // Move the ball outside the player sphere
        x += this.shootDirection.x * (this.sphereShape.radius*1.02 + this.ballShape.radius);
        y += this.shootDirection.y * (this.sphereShape.radius*1.02 + this.ballShape.radius);
        z += this.shootDirection.z * (this.sphereShape.radius*1.02 + this.ballShape.radius);
        ballBody.position.set(x,y,z);
        ballMesh.position.set(x,y,z);
    }
    

    /**
     * 动力驱动
     */
    private update():void{
        
    }
    private SYS_FOCUS(e:any):void{
        this.isDownload=false;
        console.log("this.isDownload=false;");
    }
    private clear():void{
    }

    public close():void{

    }

    private initCannon(){
        // Setup our world
        let world:CANNON.World = new CANNON.World();
        this.world=world;
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        var solver = new CANNON.GSSolver();

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 7;
        solver.tolerance = 0.1;
        var split = true;
        if(split)
            world.solver = new CANNON.SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0,-20,0);
        world.broadphase = new CANNON.NaiveBroadphase();

        // Create a slippery material (friction coefficient = 0.0)
        let physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
                                                                physicsMaterial
                                                                // 0.0, // friction coefficient
                                                                // 0.3  // restitution
                                                                );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        // Create a sphere
        var mass = 5, radius = 1.3;
        let sphereShape = new CANNON.Sphere(radius);
        let sphereBody = new CANNON.Body({ mass: mass });
        sphereBody.addShape(sphereShape);
        sphereBody.position.set(0,5,0);
        sphereBody.linearDamping = 0.9;
        world.addBody(sphereBody);

        // Create a plane
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        world.addBody(groundBody);
    }

    private initScene() {
        let world=this.world;
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        let scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x000000, 0, 500 );

        var ambient = new THREE.AmbientLight( 0x111111 );
        scene.add( ambient );

        let light = new THREE.SpotLight( 0xffffff );
        light.position.set( 10, 30, 20 );
        light.target.position.set( 0, 0, 0 );
        if(true){
            light.castShadow = true;

            light.shadowCameraNear = 20;
            light.shadowCameraFar = 50;//camera.far;
            light.shadowCameraFov = 40;

            // light.shadowMapBias = 0.1;
            // light.shadowMapDarkness = 0.7;
            light.shadowMapWidth = 2*512;
            light.shadowMapHeight = 2*512;

            //light.shadowCameraVisible = true;
        }
        scene.add( light );



        let controls = new PointerLockControls( camera , sphereBody );
        scene.add( controls.getObject() );

        // floor
        let geometry = new THREE.PlaneGeometry( 300, 300, 50, 50 );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

        let material = new THREE.MeshLambertMaterial( { color: 0xdddddd } );

        let mesh = new THREE.Mesh( geometry, material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add( mesh );

        let renderer = new THREE.WebGLRenderer();
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( scene.fog.color, 1 );

        document.body.appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );

        // Add boxes
        var halfExtents = new CANNON.Vec3(1,1,1);
        var boxShape = new CANNON.Box(halfExtents);
        var boxGeometry = new THREE.BoxGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);
        for(var i=0; i<7; i++){
            var x = (Math.random()-0.5)*20;
            var y = 1 + (Math.random()-0.5)*1;
            var z = (Math.random()-0.5)*20;
            var boxBody = new CANNON.Body({ mass: 5 });
            boxBody.addShape(boxShape);
            var boxMesh = new THREE.Mesh( boxGeometry, material );
            world.addBody(boxBody);
            scene.add(boxMesh);
            boxBody.position.set(x,y,z);
            boxMesh.position.set(x,y,z);
            boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;
            boxes.push(boxBody);
            boxMeshes.push(boxMesh);
        }


        // Add linked boxes
        var size = 0.5;
        var he = new CANNON.Vec3(size,size,size*0.1);
        var boxShape = new CANNON.Box(he);
        var mass = 0;
        var space = 0.1 * size;
        var N = 5, last;
        var boxGeometry = new THREE.BoxGeometry(he.x*2,he.y*2,he.z*2);
        for(var i=0; i<N; i++){
            var boxbody = new CANNON.Body({ mass: mass });
            boxbody.addShape(boxShape);
            var boxMesh = new THREE.Mesh(boxGeometry, material);
            boxbody.position.set(5,(N-i)*(size*2+2*space) + size*2+space,0);
            boxbody.linearDamping = 0.01;
            boxbody.angularDamping = 0.01;
            // boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;
            world.addBody(boxbody);
            scene.add(boxMesh);
            boxes.push(boxbody);
            boxMeshes.push(boxMesh);

            if(i!=0){
                // Connect this body to the last one
                var c1 = new CANNON.PointToPointConstraint(boxbody,new CANNON.Vec3(-size,size+space,0),last,new CANNON.Vec3(-size,-size-space,0));
                var c2 = new CANNON.PointToPointConstraint(boxbody,new CANNON.Vec3(size,size+space,0),last,new CANNON.Vec3(size,-size-space,0));
                world.addConstraint(c1);
                world.addConstraint(c2);
            } else {
                mass=0.3;
            }
            last = boxbody;
        }
    }

            // private onWindowResize() {
            //     camera.aspect = window.innerWidth / window.innerHeight;
            //     camera.updateProjectionMatrix();
            //     renderer.setSize( window.innerWidth, window.innerHeight );
            // }

           
            private animate() {
                requestAnimationFrame( animate );
                if(controls.enabled){
                    world.step(dt);

                    // Update ball positions
                    for(var i=0; i<balls.length; i++){
                        ballMeshes[i].position.copy(balls[i].position);
                        ballMeshes[i].quaternion.copy(balls[i].quaternion);
                    }

                    // Update box positions
                    for(var i=0; i<boxes.length; i++){
                        boxMeshes[i].position.copy(boxes[i].position);
                        boxMeshes[i].quaternion.copy(boxes[i].quaternion);
                    }
                }

                controls.update( Date.now() - time );
                renderer.render( scene, camera );
                time = Date.now();

            }

            
            private getShootDir(targetVec){
                var vector = targetVec;
                targetVec.set(0,0,1);
                projector.unprojectVector(vector, camera);
                var ray = new THREE.Ray(sphereBody.position, vector.sub(sphereBody.position).normalize() );
                targetVec.copy(ray.direction);
            }

}