namespace game.util{
    /*
    *2019-03-11 andy 
    公用工具方法
    */
    export class PubUtil{
        constructor(){

        }
        /** 
         * 2019-03-11 得到今天的年月日
        */
        public static GetTodayDateStr():string{
            var date:Date = new Date();
            return date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();
        }

        /**
         * 创建灰色滤镜
         * return Laya.ColorFilter
         */
        public static getGrayFilter():Laya.ColorFilter{
            //颜色滤镜矩阵,灰色
            let colorMatrix =[
            0.3086, 0.6094, 0.0820, 0, 0, //R
            0.3086, 0.6094, 0.0820, 0, 0, //G
            0.3086, 0.6094, 0.0820, 0, 0, //B
            0, 0, 0, 1, 0, //A
            ];
            //创建灰色颜色滤镜
            let ColorFilter:Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
            return ColorFilter;
        }
        /**
         * 创建红色滤镜 2020-11-09
         * return Laya.ColorFilter
         */
        public static getRedFilter():Laya.ColorFilter{
            let colorMatrix =[
            1, 0, 0, 0, 255,//R
            0, 0, 0, 0, 0,//G
            0, 0, 0, 0, 0,//B
            0, 0, 0, 1, 0,//A
            ];
            //创建灰色颜色滤镜
            let ColorFilter:Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
            return ColorFilter;
        }
        /**
         * 设置数值
         * @param arrNumber 
         * @param index 
         * @param defaultValue 
         */
        public static setNumber(arrNumber:Array<number>,index:number,defaultValue:number):number{
            return arrNumber && arrNumber.length>index?arrNumber[index]:(arrNumber[index]=defaultValue);
        }
        /**
         * 设置字符
         * @param arrString 
         * @param index 
         * @param defaultValue 
         */
        public static setString(arrString:Array<string>,index:number,defaultValue:string):string{
            return arrString && arrString.length>index?arrString[index]:(arrString[index]=defaultValue);
        }

        /**
         * 是否为空或空格
         * @param input 
         */
        public static isEmpty(input:string):boolean{
            let myreg=/^[ ]*$/;
            if (myreg.test(input)) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 是否为数字
         * @param input 
         */
        public static isNumber(input:string):boolean{
            let myreg=/^[0-9]+.?[0-9]*$/;
            if (myreg.test(input)) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 是否是电话号码
         * @param input 
         */
        public static isTel(input:string):boolean{
            let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (myreg.test(input)) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 是否是邮箱地址
         * @param input 
         */
        public static isMail(input:string):boolean{
            let myreg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (myreg.test(input)) {
                return true;
            } else {
                return false;
            }
        }

         
    }
}