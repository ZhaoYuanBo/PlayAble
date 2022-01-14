export default class EffectTool {

    /**
     * 改变3d模型的反照率强度
     * @param sprite 
     * @param num 倍数
     * @param boo 真，加倍数，假，除倍数
     */
    public static setSpriteAlp(sprite, num: number, boo: boolean) {
        let meshSprite = sprite as Laya.MeshSprite3D;
        let material = meshSprite.meshRenderer.material as Laya.BlinnPhongMaterial;

        if (boo) {
            let _num = material.albedoIntensity;
            material.albedoIntensity = _num * num;
        } else {
            let _num = material.albedoIntensity;
            material.albedoIntensity = _num / num;
        }
    }
    /**
     * 改变3d模型的反照率强度
     * @param sprite 
     * @param num 这里是固定设置值
     */
    public static addSpriteAlp(sprite, num: number) {
        let meshSprite = sprite as Laya.SkinnedMeshSprite3D;

        let _material = meshSprite.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial;
        // console.log("66666666666666666666", _material);
        _material.albedoIntensity = num;

    }


    /**
     * 设置反照率  透明度
     * @param sprite  
     * @param boo 是否开启透明
     * num  透明度
     */
    public static subSpriteAlp(sprite, boo: boolean, num: number) {
        let meshSprite = sprite as Laya.SkinnedMeshSprite3D;

        let _material = meshSprite.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial;
        // // console.log("66666666666666666666", _material);

        if (boo) {
            // _material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_CUTOUT;//RENDERMODE_TRANSPARENT
            _material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
            let _albedoColor = _material.albedoColor;
            _material.albedoColor = new Laya.Vector4(_albedoColor.x, _albedoColor.y, _albedoColor.z, num);
            // _material.albedoColor = new Laya.Vector4(0.1632,0.55, 0.3265, 1);


        } else {
            _material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
        }
    }


    /**
     * 设置反照率颜色，
     * @param sprite  
     * @param boo 
     */
    public static setSpriteCol(sprite, clo: Laya.Color) {
        let meshSprite = sprite as Laya.SkinnedMeshSprite3D;

        let _material = meshSprite.skinnedMeshRenderer.material as Laya.BlinnPhongMaterial;
        _material.albedoColor = new Laya.Vector4(clo.r, clo.g, clo.b, clo.a);
        // // console.log("66666666666666666666", _material);
        // _material.albedoColor = new Laya.Vector4(0.1632, 0.55, 0.3265, 1);

    }


    /**
            * 材质赋值 【laya2专用】
            * @param mat  Laya.BaseMaterial
            * @param bt   Base64Type
            * @param color  Laya.Vector4
            */
    public static checkMaterial(mat: Laya.BaseMaterial, bt: Base64Type, offset: Laya.Vector4): any {
        if (Base64Manager.isUseBase64) {
            var mater = new Laya.BlinnPhongMaterial();
            Laya.loader.load(bt.base64Img, Laya.Handler.create(this, (e) => {
                //console.log(e);
                mater.albedoTexture = e.bitmap;


                mater.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);


                //修改材质贴图的平铺和偏移
                // var tilingOffset: Laya.Vector4 = mater.tilingOffset;
                // tilingOffset.setValue(2, 2, 0, 0);
                mater.tilingOffset = offset;
                mat = mater;
            }))
        }
    }

    /**[SixGod]
      * 世界坐标转屏幕坐标
      * @param {Laya.Camera} camera   参照相机
      * @param {Laya.Vector3} point   需要转换的点
      */
    static WorldToScreen2(camera, point) {
        var pointA = this.InverseTransformPoint(camera.transform, point);
        var distance = pointA.z;

        var out = new Laya.Vector3();
        camera.viewport.project(point, camera.projectionViewMatrix, out);
        var value = new Laya.Vector3(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY, distance);
        return value;
    }/**[SixGod]
     * 屏幕坐标转世界坐标
     * @param {Laya.Camera} camera  参照相机
     * @param {Laya.Vector3} point  需要转换的点
     */
    static ScreenToWorld(camera, point) {
        var halfFOV = (camera.fieldOfView * 0.5) * Math.PI / 180;
        let height = point.z * Math.tan(halfFOV);
        let width = height * camera.aspectRatio;

        let lowerLeft = this.GetLowerLeft(camera.transform, point.z, width, height);
        let v = this.GetScreenScale(width, height);

        // 放到同一坐标系（相机坐标系）上计算相对位置
        var value = new Laya.Vector3();
        var lowerLeftA = this.InverseTransformPoint(camera.transform, lowerLeft);
        value = new Laya.Vector3(-point.x / v.x, point.y / v.y, 0);
        Laya.Vector3.add(lowerLeftA, value, value);
        // 转回世界坐标系
        value = this.TransformPoint(camera.transform, value);
        return value;
    }

    /**[SixGod]
     * 获取三维场景和屏幕比例
     * @param {Number} width     宽
     * @param {Number} height    长
     */
    static GetScreenScale(width, height) {
        var v = new Laya.Vector3();
        v.x = Laya.stage.width / width / 2;
        v.y = Laya.stage.height / height / 2;
        return v;
    }

    /**[SixGod]
     * 获取相机在 distance距离的截面右下角世界坐标位置
     * @param {Laya.Transform} transform    相机transfrom
     * @param {Number} distance     距离
     * @param {Number} width        宽度
     * @param {Number} height       长度
     */
    static GetLowerLeft(transform, distance, width, height) {
        // 相机在 distance距离的截面左下角世界坐标位置
        // LowerLeft
        var lowerLeft = new Laya.Vector3();

        // lowerLeft = transform.position - (transform.right * width);
        var right = new Laya.Vector3();
        transform.getRight(right);
        Laya.Vector3.normalize(right, right);
        var xx = new Laya.Vector3(right.x * width, right.y * width, right.z * width);
        Laya.Vector3.add(transform.position, xx, lowerLeft);

        // lowerLeft -= transform.up * height;
        var up = new Laya.Vector3();
        transform.getUp(up);
        Laya.Vector3.normalize(up, up);
        var yy = new Laya.Vector3(up.x * height, up.y * height, up.z * height);
        Laya.Vector3.subtract(lowerLeft, yy, lowerLeft);

        // lowerLeft += transform.forward * distance;
        var forward = new Laya.Vector3();
        transform.getForward(forward);
        Laya.Vector3.normalize(forward, forward);
        var zz = new Laya.Vector3(forward.x * distance, forward.y * distance, forward.z * distance);
        Laya.Vector3.subtract(lowerLeft, zz, lowerLeft);
        return lowerLeft;
    }

    /**[SixGod]
     * 世界坐标转相对坐标
     * @param {Laya.Transform} origin   camera.transform
     * @param {Laya.Vector3} point      需要转换的点
     */
    static InverseTransformPoint(origin, point) {
        var xx = new Laya.Vector3();
        origin.getRight(xx);
        var yy = new Laya.Vector3();
        origin.getUp(yy);
        var zz = new Laya.Vector3();
        origin.getForward(zz);
        var zz1 = new Laya.Vector3(-zz.x, -zz.y, -zz.z);
        var x = this.ProjectDistance(point, origin.position, xx);
        var y = this.ProjectDistance(point, origin.position, yy);
        var z = this.ProjectDistance(point, origin.position, zz1);
        var value = new Laya.Vector3(x, y, z);
        return value;
    }

    /**[SixGod]
     * 相对坐标转世界坐标
     * @param {Laya.Transform} origin   camera.transform
     * @param {Laya.Vector3} point      需要转换的点
     */
    static TransformPoint(origin, point) {
        var value = new Laya.Vector3();
        Laya.Vector3.transformQuat(point, origin.rotation, value);
        Laya.Vector3.add(value, origin.position, value);
        return value;
    }

    /**[SixGod]
     * 向量投影长度, 向量CA 在向量 CB 上的投影长度
     * @param {Laya.Vector3} A
     * @param {Laya.Vector3} C
     * @param {Laya.Vector3} B
     */
    static ProjectDistance(A, C, B) {
        var CA = new Laya.Vector3();
        Laya.Vector3.subtract(A, C, CA);
        var angle = this.Angle2(CA, B) * Math.PI / 180;
        var distance = Laya.Vector3.distance(A, C);
        distance *= Math.cos(angle);
        return distance;
    }

    /**[SixGod]
     * 向量夹角
     * @param {Laya.Vector3} ma 向量A
     * @param {Laya.Vector3} mb 向量B
     */
    static Angle2(ma, mb) {
        var v1 = (ma.x * mb.x) + (ma.y * mb.y) + (ma.z * mb.z);
        var ma_val = Math.sqrt(ma.x * ma.x + ma.y * ma.y + ma.z * ma.z);
        var mb_val = Math.sqrt(mb.x * mb.x + mb.y * mb.y + mb.z * mb.z);
        var cosM = v1 / (ma_val * mb_val);

        if (cosM < -1) cosM = -1;
        if (cosM > 1) cosM = 1;

        var angleAMB = Math.acos(cosM) * 180 / Math.PI;
        return angleAMB;
    }

}
