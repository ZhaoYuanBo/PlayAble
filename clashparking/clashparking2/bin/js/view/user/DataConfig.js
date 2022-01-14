/*
* 2019-03-15 andy
游戏配置数据
*/
var DataConfig = (function () {
    function DataConfig() {
        if (DataConfig._ins != null)
            throw new Error("DataConfig is single!");
    }
    Object.defineProperty(DataConfig, "ins", {
        get: function () {
            if (!this._ins)
                DataConfig._ins = new DataConfig();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    DataConfig.prototype.init = function (http) {
        console.log("DataConfig:" + http);
        this.arrBook = [];
        var table = http.Items;
        var books = table.Cfg_Book;
        for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
            var book = books_1[_i];
            if (!this.arrBook[book.type]) {
                this.arrBook[book.type] = new Array();
            }
            this.arrBook[book.type].push(book);
        }
        var words = table.Cfg_Word;
        this.arrWord = [];
        for (var _a = 0, words_1 = words; _a < words_1.length; _a++) {
            var word = words_1[_a];
            this.arrWord.push(word);
        }
    };
    /**获得课文 */
    DataConfig.prototype.getBook = function (type, bookIndex) {
        if (!this.arrBook) {
            this.arrBook = [];
        }
        if (bookIndex <= this.arrBook[type].length) {
            var book = this.arrBook[type][bookIndex];
            if (book.hanzi && book.hanzi.length > 0 && (!book.arrHanzi || book.arrHanzi.length == 0)) {
                book.arrHanzi = book.hanzi.split('');
                book.arrPinyin = book.pinyin.split(' ');
            }
            return book;
        }
        else {
            return null;
        }
    };
    /**获得系统自带的课文 */
    DataConfig.prototype.getBooks = function (type) {
        return this.arrBook[type];
    };
    /**获得系统自带的课文 */
    DataConfig.prototype.getWords = function () {
        return this.arrWord;
    };
    return DataConfig;
}());
