/*
* 3d对象缓存池
*/
export default class Sprite3DPools {

    private static _instance: Sprite3DPools = null;

    private poolsDict: { [key: string]: Laya.Sprite3D[] } = {};

    public static Instance(): Sprite3DPools {
        if (this._instance == null)
            this._instance = new Sprite3DPools();
        return this._instance;
    }

    public GetPools(key: string, obj: Laya.Sprite3D = null): Laya.Sprite3D {
        if (this.poolsDict[key] && this.poolsDict[key].length > 0) {
            let temp: Laya.Sprite3D = this.poolsDict[key].pop();
            temp.active = true;
            return temp;
        }
        else {
            return Laya.Sprite3D.instantiate(obj);
        }
    }

    public SetPools(key: string, poolsObj: Laya.Sprite3D) {
        if (this.poolsDict[key] == null) {
            this.poolsDict[key] = [];
        }
        this.poolsDict[key].push(poolsObj);
        poolsObj.active = false;
    }



    private objDict: Laya.Sprite3D[] = [];

    public initPools() {
        this.objDict = [];
    }

    /**
     * 取出
     * @param key 
     * @param obj 
     */
    public popPools(obj?: Laya.Sprite3D): Laya.Sprite3D {


        if (this.objDict.length > 0) {
            let temp: Laya.Sprite3D = this.objDict.pop();
            temp.active = true;
            return temp;
        }
        else {
            if (obj)
                return Laya.Sprite3D.instantiate(obj);
        }
    }
    /**
     * 放入
     * @param key 
     * @param poolsObj 
     */
    public pushPools(poolsObj: Laya.Sprite3D) {
        if (this.objDict == null) {
            this.initPools;
        }
        this.objDict.push(poolsObj);
        poolsObj.active = false;
    }


}

