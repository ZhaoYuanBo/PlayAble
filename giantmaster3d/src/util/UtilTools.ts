/**
 * 常用数学计算
 */
export class UtilMath {
    /**
     * @method 随机整数 
     * @param {number} min 随机最小值 随机数包含最小值
     * @param {number} max 随机最大值 不包含
     * @return {number}
     */
    randomInt(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * @method 随机数
     * @param {number} min 最小随机数 包含
     * @param {number} max 最大随机数
     * @return {number}
     */
    randomNumber(min: number, max: number): number {
        return min + (max - min) * Math.random();
    }

    /**
    * @param {number} number  20 返回 -20 - +20
    * @return {number}   返回一个正负number范围值
    */
    randomBetween(number) {
        return number - this.randomNumber(0, number * 2);
    }





    /**
      * 产生随机数
      * 结果：x>=param1 && x<param2
      */
    public static randRange(param1: number, param2: number): number {
        let loc: number = Math.random() * (param2 - param1) + param1;
        return loc;
    }

    /**
     * 产生随机数
     * 结果：x>=param1 && x<=param2
     */
    public static randRangeInt(param1: number, param2: number): number {
        let loc: number = Math.random() * (param2 - param1 + 1) + param1;
        return Math.floor(loc);
    }

    /**
     * 从数组中产生随机数[-1,1,2]
     * 结果：-1/1/2中的一个
     */
    public static randRangeArray<T>(arr: Array<T>): T {
        if (arr.length == 0)
            return null;
        let loc: T = arr[UtilMath.randRangeInt(0, arr.length - 1)];
        return loc;
    }









    /**
     * @method 正弦函数
     * @param {number} angle 角度
     * @return {number}
     */
    sin(angle: number): number {
        return Math.sin(angle * Math.PI / 180);
    }

    /**
     *@method 余弦值 
     * @param {number} angle  角度
     * @return {number}
     */
    cos(angle: number): number {
        return Math.cos(angle * Math.PI / 180);
    }

    /**
     * @method 正切函数
     * @param {number} angle 角度
     * @return {number} 
     */
    tan(angle: number): number {
        return Math.tan(angle * Math.PI / 180);
    }

    /**
     * @method 角度转弧度
     * @param {number} angle 
     * @return {number}
     */
    angle2Radian(angle: number): number {
        return angle * Math.PI / 180;
    }

    /**
     * @method 弧度转角度
     * @param {number} radian
     * @return {number}
     */
    radian2Angle(radian: number): number {
        return radian * 180 / Math.PI;
    }

    /**  
     * @method 获取两个坐标间的角度 
     * @parama {} start: 起始点 
     * @parama {} end: 终点
    */
    angle(start: { x: number, y: number }, end: { x: number, y: number }) {
        return Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    }

    angle1(startX: number, startY: number, endX: number, endY: number) {
        return Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    }

    /**
     * @method 随机半径为r的圆周上
     * @param {number} r 圆的半径
     * @return {}
     */
    randomCircle(r: number): { x: number, y: number } {
        let radian = this.angle2Radian(Math.random() * 360);
        let x = r * Math.cos(radian);
        let y = r * Math.sin(radian);
        return {
            x,
            y
        };
    }

    /**
     * @method 生成一个随机种子
     * @param {number} seed
     * @return {number}
     */
    private rnd(seed) {
        seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
        return seed / (233280.0);
    }

    /**
     * @method 通过一个随机种子生成一个随机数
     * @param {number} num 随机数的控制范围
     * @param {number} seed 随机种子 
     * @return {number}
     */
    seedRandom(num: number, seed?: number) {
        if (!seed) {
            let today = new Date();
            seed = today.getTime();
        }
        return Math.ceil(this.rnd(seed) * num);
    }

    /**
     *  产生指定范围不重复的随机数
     *  参数一: 最小值    int
     *  参数二: 最大值    int
     *  参数三: 随机数量  int
     *  返回值: 结果数组  Array
    **/
    static getRandNumForRange(least, max, num): Array<number> {
        // 检查传值是否合法
        if (num > max - least) [];
        // 产生指定范围的所有数值
        let numList: Array<number> = [], numRandList: Array<number> = [], randId;
        for (let index = least; index <= max; index++)
            numList.push(index);

        // 产生记录次数
        for (let index = 0; index < num; index++) {
            randId = Math.floor(Math.random() * numList.length);    // 随机一个数组ID
            numRandList.push(numList[randId]);  // 获取这个值
            numList.splice(randId, 1);  // 删除这个成员 防止下次再次生成
        }

        return numRandList;
    }

    public static Clamp(value: number, min: number, max: number): number {
        var tempValue: number = 0;
        if (value < min) {
            tempValue = min;
        }
        else if (value > max) {
            tempValue = max;
        }
        else {
            tempValue = value;
        }
        return tempValue;
    }
}

/**
 * 常用字符串
 */
export class UtilString {
    /**
     * @method 截取名字
     * @param {String} str 被截取字符串
     * @param {number} n 截取字节长度
     * @return {String} 截取后的字符串
    */
    cutName(str: string, n: number = 10, isDot: boolean = true): string {
        const r = /[^\x00-\xff]/g;
        if (str.replace(r, 'mm').length <= n) { return str; }
        const m = Math.floor(n / 2);
        for (let i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, 'mm').length >= n) {
                return str.substr(0, i) + (isDot ? '...' : "");
            }
        }
        return str;
    };

    /**
     * @method numInsertComma 给数字插入逗号
     * @param {number} num 待转化的数值
     * @return {String} 返回转化后的字符串
    */
    numInsertComma(num: number): string {
        const str = num.toString();
        const len = str.length;
        if (len <= 4) {
            return str;
        }
        const r = len % 3;
        return r > 0 ? str.slice(0, r) + ',' + str.slice(r, len).match(/\d{3}/g).join(',') : str.slice(r, len).match(/\d{3}/g).join(',');
    };

    /**
     * @method dropRepeat 去除重复的字符
     * @param str 待去除的字符串
     * @return {String} 返回去除后的字符串
    */
    dropRepeat(str: string): string {
        var result = [];
        var hash = {};
        for (var i = 0, elem; i < str.length; i++) {
            elem = str[i];
            if (!hash[elem]) {
                hash[elem] = true;
                result = result + elem;
            }
        }
        return result.toString();
    }


    /**
     * 判断是否包含中文
     * @param str
     * @return {Boolean}
    */
    isChinese(str: string): boolean {
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        if (reg.test(str)) {
            return false;
        }
        return true;
    }

    str2Code(str: String): String {
        let outStr = "";
        for (let i = 0; i < str.length; i++) {
            outStr += str[i] + "=" + str.charCodeAt(i) + "\n";
        }

        return outStr;
    }

    /**
    * 字符串是否为空白 空白的定义如下： <br>
    * 1、为null <br>
    * 2、为不可见字符（如空格）<br>
    * 3、""<br>
    *
    * @param str 被检测的字符串
    * @return boolean 是否为空
    */
    isBlank(str): boolean {
        if (str == null || this.trim(str) == "") {
            return true;
        }
        return false;
    }
    /**
     * 字符串是否为非空白 空白的定义如下： <br>
     * 1、不为null <br>
     * 2、不为不可见字符（如空格）<br>
     * 3、不为""<br>
     *
     * @param str 被检测的字符串
     * @return boolean 是否为非空
     */
    isNotBlank(str) {
        // == 代表相同,=== 代表严格相同,https://www.cnblogs.com/nelson-hu/p/7922731.html
        return false === this.isBlank(str);
    }
    /**
     * 字符串是否为空，空的定义如下:<br>
     * 1、为null <br>
     * 2、为""<br>
     *
     * @param str 被检测的字符串
     * @return boolean 是否为空
     */
    isEmpty(str) {
        if (str == null || str == "") {
            return true;
        }
        return false;
    }
    /**
     * 字符串是否为非空白 空白的定义如下： <br>
     * 1、不为null <br>
     * 2、不为""<br>
     *
     * @param str 被检测的字符串
     * @return boolean 是否为非空
     */
    isNotEmpty(str) {
        return !this.isEmpty(str);
    }
    /**
     * 空对象转字符串
     *
     * @param str 被检查的字符串
     * @return 原字符串或者空串
     */
    nullToStr(str) {
        if (this.isEmpty(str)) {
            return "";
        }
        return str;
    }
    /**
     * 空格截取
     *
     * @param str 截取的字符串
     * @return 截取后的字符串
     */
    trim(str) {
        if (str == null) {
            return "";
        }
        return str.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "");
    }
    /**
     * 比较两个字符串（大小写敏感）
     *
     * @param str 字符串
     * @param that 比较的字符串
     * @return boolean
     */
    equals(str, that) {
        return str == that;
    }
    /**
     * 比较两个字符串（大小写不敏感）
     *
     * @param str 字符串
     * @param that 比较的字符串
     * @return boolean
     */
    equalsIgnoreCase(str, that) {
        return String(str).toUpperCase() === String(that).toUpperCase();
    }
    /**
     * 将字符串按指定字符分割
     *
     * @param str 字符串
     * @param sep 比较的字符串
     * @param maxLen 最大长度
     * @return 分割后的数组
     */
    split(str, sep, maxLen) {
        if (this.isEmpty(str)) {
            return null;
        }
        var value = String(str).split(sep);
        return maxLen ? value.slice(0, maxLen - 1) : value;
    }
    /**
     * 字符串格式化(%s )
     *
     * @param str 字符串
     * @return 格式化后的字符串
     */
    sprintf(str) {
        var args = arguments, flag = true, i = 1;
        str = str.replace(/%s/g, function () {
            var arg = args[i++];
            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    }
    /**
     * 判断字符串是否是以start开头
     *
     * @param str 字符串
     * @param start 开始的字符串
     * @return boolean
     */
    startWith(str, start) {
        var reg = new RegExp("^" + start);
        return reg.test(str);
    }
    /**
     * 判断字符串是否是以end结尾
     *
     * @param str 字符串
     * @param end 结尾的字符串
     * @return boolean
     */
    endWith(str, end) {
        var reg = new RegExp(end + "$");
        return reg.test(str);
    }
}

/**
 * 常用时间
 */
export class UtilTime {
    /**
     * @method 将数字时间转为格式化时间
     * @param t   待转化的时间
     * @param isHour true-> 00:59:59, false-> 59:59
     */
    timeToStamp(t: number, isHour: boolean = true): String {
        let hour = Math.floor(t / 3600);
        let shour = hour < 10 ? ("0" + hour) : ("" + hour);
        let min = Math.floor((t % 3600) / 60);
        let smin = min < 10 ? ("0" + min) : ("" + min);
        let sec = Math.floor(t % 60);
        let ssec = sec < 10 ? ("0" + sec) : ("" + sec);
        if (hour <= 0) {
            return (isHour ? shour + ":" : "") + smin + ":" + ssec;
        }
        return shour + ":" + smin + ":" + ssec;
    }

    timeToStampDay(t: number): String {
        let day = Math.floor(t / (24 * 3600));
        let hour = Math.floor((t % (24 * 3600)) / 3600);
        let min = Math.floor((t % 3600) / 60);
        let sec = Math.floor(t % 60);
        let stamp: String = "";
        if (day > 0) {
            stamp += day + "天 ";
        }
        return stamp + hour.toString() + ":" + min + ":" + sec;
    }

    /**
     * @method 计算两个日期时间相隔的天数 2019-09-10 23:59:00 - 2019-09-11 00:00:00 隔一天 
     * @param {number} oldUTC 
     * @param {number} newUTC 
    */
    dayDiff(oldUTC: number, newUTC: number): number {
        var old = new Date(oldUTC);
        var now = new Date(newUTC);

        return this.dayDiff2(old, now)
    }

    /**
     * @method 计算两个日期时间相隔的天数 2019-09-10 23:59:00 - 2019-09-11 00:00:00 隔一天 
     * @param {Date} date1 
     * @param {Date} date2 
    */
    dayDiff2(date1: Date, date2: Date): number {
        var month1 = date1.getMonth() + 1;
        var day1 = date1.getDate();
        var year1 = date1.getFullYear();

        var month2 = date2.getMonth() + 1;
        var day2 = date2.getDate();
        var year2 = date2.getFullYear();

        var dif = ((Date.parse(month2 + '/' + day2 + '/' + year2) - Date.parse(month1 + '/' + day1 + '/' + year1)) / 86400000);
        if (dif < 0) {
            // console.log('时间大小存在问题');
            return -1;
        }

        return parseInt(dif.toString());
    }

    /**
     * @method 简单获取两个时间间隔天数。不按日期计算
     * @param {number} oldUTCTime    
     * @param {number} newUTCTime 
    */
    timeDayDiff(oldUTCTime: number, newUTCTime: number): number {
        /*获取之间的天数*/
        var getd = Math.floor((newUTCTime - oldUTCTime) / (3600 * 24 * 1000));
        if (getd < 0) {
            // console.log("时间大小存在问题");
            return;
        }
        return getd;
    }

    /**
     * @method 计算经过一段时间后倒计时还剩多少时间
     * @param {number} oldTime 上一个恢复时间
     * @param {number} intervalTime 需要恢复的时间间隔
    */
    surplusTime(oldTime: number, intervalTime: number): number {
        let curTime = new Date().getTime();
        let goTime = (curTime - oldTime) / 1000;
        let ltime = intervalTime - goTime;
        return ltime;
    }

    /**
     * @method 返回之前一个函数到当前时间的间隔秒数
     * @param {number} oldtime 之前的时间
    */
    intervalNowTime(oldtime: number | Date): number {
        let curTime = new Date().getTime();
        let oldtimeUTC = 0;
        if (oldtime instanceof Date) {
            oldtimeUTC = oldtime.getTime();
        } else {
            oldtimeUTC = oldtime;
        }
        return (curTime - oldtimeUTC) / 1000;
    }

    rnd(seed) {
        seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
        return seed / (233280.0);
    }

    seedRandom(rand: number, seed?: number) {
        if (!seed) {
            let today = new Date();
            seed = today.getTime();
        }
        return Math.ceil(this.rnd(seed) * rand);
    }
}

/**
 * 常用数组
 */
export class UtilArray {
    /**
     * @method 数组遍历
     * @param arr  数组
     * @param fun 遍历函数
     */
    map(arr: Array<any>, fun: Function) {
        if (arr != null) {
            for (let i = 0; i < arr.length; i++) {
                fun && fun(arr[i], i);
            }
        }
    }

    /**
     * @method 打乱数组
     * @param {Array} arr 数组
    */
    randomArray(arr: Array<any>) {
        if (arr === null) return;
        let r = [-1, 0, 1];
        arr.sort(function (a, b) {
            let idx = Math.round(Math.random() * 2 + 0)
            return r[idx];
        });
    }

    // 移除数组内满足条件的项目
    remove(arr: Array<any>, fun: Function) {
        if (arr === null) return;
        let index = 0;
        for (let value of arr) {
            if (fun && fun(value)) {
                arr.splice(index, 1);
            }
            index++;
        }
    }

    /**
     * @method 删除重复的元素
     * @param arr 
     * @param compareFun 重复对比函数
    */
    unique(arr: Array<any>, compareFun?: Function): boolean {
        compareFun = compareFun || function (a, b) {
            if (a == b) {
                return true;
            }
            return false;
        };

        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (compareFun(arr[i], arr[j])) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return true;
    }
}

/**
 * 常用对象
 */
export class UtilObject {
    // 合并对象
    merge(obj: Object, src: Object) {
        if (!obj || !src) return;
        for (const key in src) {
            if ({}.hasOwnProperty.call(src, key)) {
                obj[key] = src[key];
            }
        }
    }

    /**
    * @method cloneDeep 深拷贝
    * @param obj
    */
    cloneDeep(obj) {
        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneDeep(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (let attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneDeep(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    /**
     * 拷贝对象
     * @return {object}  newObj  拷贝后新对象  
    */
    copyObject(obj) {
        if (obj === null) return null
        if (typeof obj !== 'object') return obj;
        if (obj.constructor === Date) return new Date(obj);
        if (obj.constructor === RegExp) return new RegExp(obj);
        var newObj = new obj.constructor();  //保持继承链
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
                var val = obj[key];
                newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
            }
        }
        return newObj;
    }

    /**
     * //拷贝简单对象
     * @param {object}  srcObj  源对象
     * @param {object}  desObj  目标对象 
     * 
     * @return {object} desObj 拷贝后新对象
    */
    copyObject2(srcObj, desObj) {
        var desObj = desObj || {}; //最初的时候给它一个初始值=它自己或者是一个json
        for (var name in srcObj) {
            if (typeof srcObj[name] === "object") { //先判断一下obj[name]是不是一个对象
                desObj[name] = (srcObj[name].constructor === Array) ? [] : {}; //我们让要复制的对象的name项=数组或者是json
                this.copyObject2(srcObj[name], desObj[name]); //然后来无限调用函数自己 递归思想
            } else {
                desObj[name] = srcObj[name];  //如果不是对象，直接等于即可，不会发生引用。
            }
        }
        return desObj; //然后在把复制好的对象给return出去
    }

    /**
     * 原生继承
     * 用法
     * 父类 father
     * function father(){}
     * father.prototype = {run: function(){}}
     * father.prototype.construct = father;
     * son(子类) 继承father
     * let son = objecth.extends(father);
    */
    extend(Child, Parent) {
        var F = function () { };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.uber = Parent.prototype;
    }
    // inherit = function(function () {
    //     var F = function () { };
    //     return function (Child, Parent) {
    //         F.prototype = Parent.prototype;
    //         Child.prototype = new F();
    //         Child.prototype.constructor = Child;
    //         Child.uber = Parent.prototype;
    //     };
    // }
    // )();
}

/**
 * 定时器
 */
export class UtilSchedule {
    private _onceList = {};
    private _intervalList = {};

    once(cb, interval) {
        let id = setTimeout(cb, interval);
        this._onceList[id] = id;
        return id;
    }

    stopOnce(id) {
        clearTimeout(id);
    }

    stopAllOnce() {
        for (let key in this._onceList) {
            this._onceList[key] && clearTimeout(this._onceList[key]);
        }
    }

    interval(cb, interval) {
        let id = setInterval(cb, interval);
        this._intervalList[id] = id;
        return id;
    }

    stopInterval(id) {
        for (let key in this._intervalList) {
            if (this._intervalList[key]) {
                clearInterval(this._intervalList[key]);
            }
        }
        this._intervalList = {};
    }

    stopAllInterval() {
        for (let key in this._intervalList) {
            clearInterval(this._intervalList[key]);
        }
        this._intervalList = {};
    }
}

// new  构造函数来模拟一个类

// 初始化的[0, 0, 0, 0, 0, 0, 9] --> 9 000 000 000 000 000 000 // [0, 999]
function _adjust_bit_value(bit_array) {
    for (var i = 0; i < bit_array.length; i++) {
        while (bit_array[i] >= 1000) {
            bit_array[i] -= 1000;
            if (i + 1 >= bit_array.length) {
                this.value_set.push(0);
            }
            bit_array[i + 1] = bit_array[i + 1] + 1;
        }
    }
}

function large_number(value_array) {
    this.value_set = value_array;
    _adjust_bit_value(this.value_set);
}

// 当前的对对象 + rhs 赋值给当前这个对下岗
large_number.prototype.large_add = function (rhs) {
    while (this.value_set.length < rhs.value_set.length) {
        this.value_set.push(0);
    }

    for (var i = 0; i < rhs.value_set.length; i++) {
        this.value_set[i] = this.value_set[i] + rhs.value_set[i];
    }

    _adjust_bit_value(this.value_set);
}

function _format_num(num) {
    if (num < 10) {
        return "00" + num;
    }
    else if (num < 100) {
        return "0" + num;
    }
    else {
        return "" + num;
    }
}

large_number.prototype.format_string = function () {
    var str_num = "" + this.value_set[this.value_set.length - 1];
    for (var i = this.value_set.length - 2; i >= 0; i--) {
        str_num = str_num + " " + _format_num(this.value_set[i])
    }

    return str_num
}

// test
/*var num1 = new large_number([0, 0, 0, 0, 0, 0, 9]);
var num2 = new large_number([0, 0, 0, 0, 0, 0, 8]);
num1.large_add(num2);
var num_str = num1.format_string();
console.log(num_str);*/
// end

const UtilTool = {
    Math: new UtilMath(),
    String: new UtilString(),
    Time: new UtilTime(),
    Array: new UtilArray(),
    Object: new UtilObject(),
    Schedule: new UtilSchedule(),
    LargeNum: large_number
};
export default UtilTool;