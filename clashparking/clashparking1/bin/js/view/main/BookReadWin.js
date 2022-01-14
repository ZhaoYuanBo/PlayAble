var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
*2019-03-14 andy
课文阅读界面
*/
var BookReadWin = (function (_super) {
    __extends(BookReadWin, _super);
    function BookReadWin() {
        var _this = _super.call(this, BookReadUI) || this;
        _this.pinyin = "";
        _this.word = "";
        _this.wordW = 80;
        _this.wordH = 40;
        _this.notWordW = 40;
        _this.startPosX = 20;
        _this.startPosY = 80;
        _this.wordIndex = 0;
        return _this;
    }
    BookReadWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        this.arrLbl = [];
    };
    BookReadWin.prototype.open = function () {
        this.wordIndex = 0;
        this.showBook();
    };
    BookReadWin.prototype.close = function () {
        for (var _i = 0, _a = this.arrLbl; _i < _a.length; _i++) {
            var word = _a[_i];
            if (word) {
                word.removeSelf();
            }
        }
    };
    BookReadWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnWord":
                break;
            default:
                break;
        }
    };
    BookReadWin.prototype.showBook = function () {
        var book;
        if (UserSelfModel.ins.bookReadType > 0) {
            book = DataConfig.ins.getBook(UserSelfModel.ins.bookReadType, UserSelfModel.ins.bookReadIdx);
        }
        else {
            book = LocalData.ins.getBook(UserSelfModel.ins.bookReadIdx);
        }
        if (!book) {
            console.log("课文内容不存在");
            return;
        }
        this.ui.txtTitle.text = book.title;
        this.wordIndex = 0;
        var lbl;
        var rowIndex = 1;
        var colIndex = 0;
        var pinYinIndex = 0;
        var reg = /[\u4e00-\u9fa5]/;
        var regLine = /[\n]/;
        var isChinese = true;
        if (book.pinyin && book.pinyin.length > 0) {
            for (var i in book.arrHanzi) {
                if (regLine.exec(book.arrHanzi[i])) {
                    colIndex = 0;
                    rowIndex++;
                    rowIndex++;
                    continue;
                }
                if (reg.exec(book.arrHanzi[i])) {
                    isChinese = true;
                    this.createWord(book.arrPinyin[pinYinIndex], rowIndex, colIndex);
                    pinYinIndex++;
                }
                else {
                    isChinese = false;
                }
                this.createWord(book.arrHanzi[i], rowIndex + 1, colIndex, isChinese);
                if ((colIndex + 1) * this.wordW + this.startPosX > Define.DeviceW) {
                    colIndex = 0;
                    rowIndex++;
                    rowIndex++;
                }
                else {
                    colIndex++;
                }
            }
        }
        else {
            for (var i in book.arrHanzi) {
                this.createWord(book.arrHanzi[i], rowIndex, colIndex);
                if (colIndex * this.wordW + 50 > Define.DeviceW) {
                    colIndex = 0;
                    rowIndex++;
                }
                else {
                    colIndex++;
                }
            }
        }
    };
    BookReadWin.prototype.createWord = function (word, rowIndex, colIndex, isChinese) {
        if (isChinese === void 0) { isChinese = true; }
        if (word == undefined) {
            return null;
        }
        var lbl;
        if (this.wordIndex < this.arrLbl.length) {
            lbl = this.arrLbl[this.wordIndex];
        }
        else {
            lbl = new Laya.Label();
            lbl.fontSize = 30;
            lbl.name = "btnWord";
            this.arrLbl.push(lbl);
            lbl.on(Laya.Event.CLICK, lbl, this.clickWord, [word]);
        }
        lbl.text = word;
        if (isChinese) {
            lbl.x = colIndex * this.wordW + this.startPosX;
            lbl.y = rowIndex * this.wordH + this.startPosY;
        }
        else {
            lbl.x = colIndex * this.wordW + this.startPosX;
            lbl.y = rowIndex * this.wordH + this.startPosY;
        }
        this.ui.addChild(lbl);
        this.wordIndex++;
        return lbl;
    };
    BookReadWin.prototype.clickWord = function (e) {
        var hanzi = e;
        console.log("word=" + hanzi);
        LocalData.ins.setForgetWord(hanzi, "pinyin");
    };
    return BookReadWin;
}(BaseWindow));
