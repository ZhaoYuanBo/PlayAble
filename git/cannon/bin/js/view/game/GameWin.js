var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
2019-05-20 andy
* 游戏界面
*/
var GameWin = /** @class */ (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super.call(this, GameUI) || this;
        _this.point = new Laya.Vector2();
        _this.isDownload = false;
        return _this;
    }
    GameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
    };
    GameWin.prototype.open = function () {
        //MatterManager.ins.init();   
        //this.initWorld(); 
        Laya.timer.frameLoop(1, this, this.update);
        this.ui.stage.on(Laya.Event.CLICK, this, this.stageClick);
        UIManager.ins.closeWindow(CustomWindow.main);
        this.initScene();
    };
    GameWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnDownload":
                //this.isDownload=true;
                //2019-05-01 跳到下载页面，并未下载，直接返回，这时还能继续游戏
                Laya.timer.once(2000, this, function () {
                    //this.isDownload=false;
                });
                HttpManager.ins.link(CustomDefine.downloadUrl);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
                break;
            case "btnCreateFarm":
                EventManager.ins.event(CustomDefine.EVENT_GUIDE);
                break;
            default:
                break;
        }
    };
    //点击场景
    GameWin.prototype.stageClick = function (e) {
        this.playFireEffect();
    };
    GameWin.prototype.initWorld = function () {
    };
    GameWin.prototype.initScene = function () {
    };
    GameWin.prototype.playFireEffect = function () {
        // TweenManager.ins.play(false,"fire");
        // let oldY:number=this.cannon.position.y;
        // Tween.to(this.cannon.position,{y:oldY+100},100,null,Laya.Handler.create(this,()=>{
        //     Tween.to(this.cannon.position,{y:oldY},200);
        // }));
        if (this._outHitInfo.distance !== -1) {
            Laya.Vector3.add(this._outHitInfo.position, this._offsetVector3, this._vector3);
            Laya.Tween.to(this._position, { x: this._vector3.x, y: this._vector3.y, z: this._vector3.z }, 300 /**,Ease.circIn*/);
        }
    };
    /**
     * 动力驱动
     */
    GameWin.prototype.update = function () {
        this.box.transform.position = this._position;
        //this.box.transform.rotate(this._rotateV3, true, false)
        //从屏幕空间生成射线
        this.point.elements[0] = Laya.MouseManager.instance.mouseX; //鼠标X坐标
        this.point.elements[1] = Laya.MouseManager.instance.mouseY; //鼠标Y坐标
        this.camera.viewportPointToRay(this.point, this.ray); //从摄像机到鼠标点击位置生成射线
        Laya.Physics.rayCast(this.ray, this._outHitInfo, 30, 0); //生成射线
    };
    GameWin.prototype.SYS_FOCUS = function (e) {
        this.isDownload = false;
        console.log("this.isDownload=false;");
    };
    GameWin.prototype.clear = function () {
    };
    GameWin.prototype.close = function () {
    };
    GameWin.prototype.initCannon = function () {
        // Setup our world
        var world = new CANNON.World();
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;
        var solver = new CANNON.GSSolver();
        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;
        solver.iterations = 7;
        solver.tolerance = 0.1;
        var split = true;
        if (split)
            world.solver = new CANNON.SplitSolver(solver);
        else
            world.solver = solver;
        world.gravity.set(0, -20, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        // Create a slippery material (friction coefficient = 0.0)
        var physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, 0.0, // friction coefficient
        0.3 // restitution
        );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);
        // Create a sphere
        var mass = 5, radius = 1.3;
        var sphereShape = new CANNON.Sphere(radius);
        var sphereBody = new CANNON.Body({ mass: mass });
        sphereBody.addShape(sphereShape);
        sphereBody.position.set(0, 5, 0);
        sphereBody.linearDamping = 0.9;
        world.addBody(sphereBody);
        // Create a plane
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.addBody(groundBody);
    };
    GameWin.prototype.init = function () {
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 0, 500);
        var ambient = new THREE.AmbientLight(0x111111);
        scene.add(ambient);
        var light = new THREE.SpotLight(0xffffff);
        light.position.set(10, 30, 20);
        light.target.position.set(0, 0, 0);
        if (true) {
            light.castShadow = true;
            light.shadowCameraNear = 20;
            light.shadowCameraFar = 50; //camera.far;
            light.shadowCameraFov = 40;
            light.shadowMapBias = 0.1;
            light.shadowMapDarkness = 0.7;
            light.shadowMapWidth = 2 * 512;
            light.shadowMapHeight = 2 * 512;
            //light.shadowCameraVisible = true;
        }
        scene.add(light);
        controls = new PointerLockControls(camera, sphereBody);
        scene.add(controls.getObject());
        // floor
        geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
        mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        renderer = new THREE.WebGLRenderer();
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(scene.fog.color, 1);
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        // Add boxes
        var halfExtents = new CANNON.Vec3(1, 1, 1);
        var boxShape = new CANNON.Box(halfExtents);
        var boxGeometry = new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);
        for (var i = 0; i < 7; i++) {
            var x = (Math.random() - 0.5) * 20;
            var y = 1 + (Math.random() - 0.5) * 1;
            var z = (Math.random() - 0.5) * 20;
            var boxBody = new CANNON.Body({ mass: 5 });
            boxBody.addShape(boxShape);
            var boxMesh = new THREE.Mesh(boxGeometry, material);
            world.addBody(boxBody);
            scene.add(boxMesh);
            boxBody.position.set(x, y, z);
            boxMesh.position.set(x, y, z);
            boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;
            boxes.push(boxBody);
            boxMeshes.push(boxMesh);
        }
        // Add linked boxes
        var size = 0.5;
        var he = new CANNON.Vec3(size, size, size * 0.1);
        var boxShape = new CANNON.Box(he);
        var mass = 0;
        var space = 0.1 * size;
        var N = 5, last;
        var boxGeometry = new THREE.BoxGeometry(he.x * 2, he.y * 2, he.z * 2);
        for (var i = 0; i < N; i++) {
            var boxbody = new CANNON.Body({ mass: mass });
            boxbody.addShape(boxShape);
            var boxMesh = new THREE.Mesh(boxGeometry, material);
            boxbody.position.set(5, (N - i) * (size * 2 + 2 * space) + size * 2 + space, 0);
            boxbody.linearDamping = 0.01;
            boxbody.angularDamping = 0.01;
            // boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;
            world.addBody(boxbody);
            scene.add(boxMesh);
            boxes.push(boxbody);
            boxMeshes.push(boxMesh);
            if (i != 0) {
                // Connect this body to the last one
                var c1 = new CANNON.PointToPointConstraint(boxbody, new CANNON.Vec3(-size, size + space, 0), last, new CANNON.Vec3(-size, -size - space, 0));
                var c2 = new CANNON.PointToPointConstraint(boxbody, new CANNON.Vec3(size, size + space, 0), last, new CANNON.Vec3(size, -size - space, 0));
                world.addConstraint(c1);
                world.addConstraint(c2);
            }
            else {
                mass = 0.3;
            }
            last = boxbody;
        }
    };
    return GameWin;
}(BaseWindow));
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
var dt = 1 / 60;
function animate() {
    requestAnimationFrame(animate);
    if (controls.enabled) {
        world.step(dt);
        // Update ball positions
        for (var i = 0; i < balls.length; i++) {
            ballMeshes[i].position.copy(balls[i].position);
            ballMeshes[i].quaternion.copy(balls[i].quaternion);
        }
        // Update box positions
        for (var i = 0; i < boxes.length; i++) {
            boxMeshes[i].position.copy(boxes[i].position);
            boxMeshes[i].quaternion.copy(boxes[i].quaternion);
        }
    }
    controls.update(Date.now() - time);
    renderer.render(scene, camera);
    time = Date.now();
}
var ballShape = new CANNON.Sphere(0.2);
var ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);
var shootDirection = new THREE.Vector3();
var shootVelo = 15;
var projector = new THREE.Projector();
function getShootDir(targetVec) {
    var vector = targetVec;
    targetVec.set(0, 0, 1);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Ray(sphereBody.position, vector.sub(sphereBody.position).normalize());
    targetVec.copy(ray.direction);
}
window.addEventListener("click", function (e) {
    if (controls.enabled == true) {
        var x = sphereBody.position.x;
        var y = sphereBody.position.y;
        var z = sphereBody.position.z;
        var ballBody = new CANNON.Body({ mass: 1 });
        ballBody.addShape(ballShape);
        var ballMesh = new THREE.Mesh(ballGeometry, material);
        world.addBody(ballBody);
        scene.add(ballMesh);
        ballMesh.castShadow = true;
        ballMesh.receiveShadow = true;
        balls.push(ballBody);
        ballMeshes.push(ballMesh);
        getShootDir(shootDirection);
        ballBody.velocity.set(shootDirection.x * shootVelo, shootDirection.y * shootVelo, shootDirection.z * shootVelo);
        // Move the ball outside the player sphere
        x += shootDirection.x * (sphereShape.radius * 1.02 + ballShape.radius);
        y += shootDirection.y * (sphereShape.radius * 1.02 + ballShape.radius);
        z += shootDirection.z * (sphereShape.radius * 1.02 + ballShape.radius);
        ballBody.position.set(x, y, z);
        ballMesh.position.set(x, y, z);
    }
});
