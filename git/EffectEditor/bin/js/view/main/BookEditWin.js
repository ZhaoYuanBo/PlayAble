var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
*2019-03-14 andy
课文编辑界面
*/
var BookEditWin = (function (_super) {
    __extends(BookEditWin, _super);
    function BookEditWin() {
        return _super.call(this, BookEditUI) || this;
    }
    BookEditWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        EventManager.ins.on(NoticeEvent.AI_IMAGE_TO_WORD, this, this.AI_IMAGE_TO_WORD);
    };
    BookEditWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnTakePhoto":
                Global.platform.getLocalImage(1);
                break;
            case "btnReadBook":
                UIManager.ins.openWindow(CustomWindow.book);
                break;
            case "btnSave":
                this.save();
                break;
            default:
                break;
        }
    };
    BookEditWin.prototype.AI_IMAGE_TO_WORD = function (ne) {
        var data = ne.data;
        var content = "";
        if (data.hasOwnProperty("words_result")) {
            for (var i = 0; i < data.words_result_num; i++) {
                content += data.words_result[i]["words"] + "\n";
            }
        }
        this.ui.txtContent.text = content;
    };
    BookEditWin.prototype.save = function () {
        var book = new Book();
        book.title = this.ui.txtTitle.text;
        var lines = this.ui.txtContent.text.split('\n');
        this.pinyin = "";
        this.hanzi = "";
        for (var i = 0; i < lines.length; i++) {
            if (i % 2 == 0) {
                this.pinyin += lines[i];
            }
            else {
                this.hanzi += lines[i] + "\n";
            }
        }
        book.pinyin = this.pinyin;
        book.hanzi = this.hanzi;
        LocalData.ins.setBook(book);
        TipManager.ins.showWord("保存成功", 0, 0);
    };
    return BookEditWin;
}(BaseWindow));
