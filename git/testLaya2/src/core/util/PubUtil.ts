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
    }
}