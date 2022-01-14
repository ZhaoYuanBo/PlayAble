var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
*2019-03-14 andy
课文列表界面
*/
var BookWin = (function (_super) {
    __extends(BookWin, _super);
    function BookWin() {
        var _this = _super.call(this, BookUI) || this;
        _this.bookType = 0;
        return _this;
    }
    BookWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //EventManager.ins.on(NoticeEvent.AI_IMAGE_TO_WORD,this,this.AI_IMAGE_TO_WORD);
    };
    BookWin.prototype.open = function () {
        this.bookType = 1;
        this.ui.lstBook.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this.ui.lstBook.selectHandler = Laya.Handler.create(this, this.onListSelect, null, false);
        this.showBookList();
    };
    BookWin.prototype.close = function () {
        this.ui.lstBook.renderHandler = null;
        this.ui.lstBook.selectHandler = null;
    };
    BookWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnEditBook":
                this.bookType = 0;
                UIManager.ins.openWindow(CustomWindow.bookEdit);
                break;
            case "btnBook0":
            case "btnBook1":
            case "btnBook2":
                this.bookType = Number(spName.replace("btnBook", ""));
                this.showBookList();
                break;
            case "btnEdit":
                break;
            case "btnRead":
                var bookIndex = Number(sp.parent.name.replace("bookItem_", ""));
                console.log("bookIndex=" + bookIndex);
                UserSelfModel.ins.bookReadIdx = bookIndex;
                UserSelfModel.ins.bookReadType = this.bookType;
                UIManager.ins.openWindow(CustomWindow.bookRead);
                break;
            default:
                break;
        }
    };
    BookWin.prototype.showBookList = function () {
        if (this.bookType == 0) {
            this.books = LocalData.ins.getBooks();
        }
        else {
            this.books = DataConfig.ins.getBooks(this.bookType);
        }
        this.ui.lblBookCount.text = "总共有 " + this.books.length + " 课文";
        this.ui.lstBook.array = this.books;
        //this.ui.lstBook.refresh();
    };
    BookWin.prototype.onListSelect = function (index) {
    };
    BookWin.prototype.onListRender = function (item, index) {
        var data = this.books[index];
        item.name = "bookItem_" + index;
        item.lblTitle.text = data.title;
        if (data.type == 0) {
            item.btnEdit.visible = item.btnDel.visible = true;
        }
        else {
            item.btnEdit.visible = item.btnDel.visible = false;
        }
    };
    BookWin.prototype.btnEditItem = function (e) {
        var target = e.target;
        var bookIndex = this.ui.lstBook.getChildIndex(target);
    };
    return BookWin;
}(BaseWindow));
