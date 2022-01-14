


export default class UIManager {
    private static _Instance: UIManager = null;


    // private _panelArray: string[] = [];

    public static get Instance(): UIManager {
        if (this._Instance == null)
            this._Instance = new UIManager();
        return this._Instance;
    }


    private isHave(url: string): boolean {

        let _url: string = url;


        let _view = Laya.Scene.root;
        // console.log(_view);
        for (let i = 0; i < _view.numChildren; i++) {
            let _i = _view.getChildAt(i) as Laya.Scene;
            if (_i.url == _url) {
                return true;
            }

        }

        return false;
    }

    // private deleteOne(url: string) {
    //     let _url: string = url;

    //     for (let i = 0; i < this._panelArray.length; i++) {

    //         if (this._panelArray[i] == url) {
    //             this._panelArray.splice(i, 1);
    //             break;
    //         }

    //     }


    // }


    /**
     * 显示UI界面
     * @param url 
     * @param isclose 
     * @param param 
     */
    public openUI(url: string, isclose: boolean = false, param?: any): void {

        if (this.isHave(url)) {//已经存在

            console.log("已经打开了",
                //  url
            );


        } else {//不存在


            // this._panelArray.push(name);
            Laya.Scene.open(url, isclose, param,);


        }
    }

    /**
     * 关闭界面
     * @param url 
     */
    public closeUI(url: string, name?: string): boolean {


        // if (this.isHave(name)) {//存在
        //     this.deleteOne(name)

        // }

        let result = Laya.Scene.close(url, name);
        return result;


    }


}