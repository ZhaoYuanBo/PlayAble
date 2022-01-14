var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
*2019-03-15 andy
汉字列表界面
*/
var WordWin = (function (_super) {
    __extends(WordWin, _super);
    function WordWin() {
        var _this = _super.call(this, WordUI) || this;
        _this.wordType = 0;
        return _this;
    }
    WordWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //EventManager.ins.on(NoticeEvent.AI_IMAGE_TO_WORD,this,this.AI_IMAGE_TO_WORD);
    };
    WordWin.prototype.open = function () {
        this.wordType = 1;
        this.ui.lstBook.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this.ui.lstBook.selectHandler = Laya.Handler.create(this, this.onListSelect, null, false);
        this.showWordList();
    };
    WordWin.prototype.close = function () {
        this.ui.lstBook.renderHandler = null;
        this.ui.lstBook.selectHandler = null;
    };
    WordWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnRead":
                break;
            default:
                break;
        }
    };
    WordWin.prototype.showWordList = function () {
        if (this.wordType == 0) {
            this.words = LocalData.ins.getForgetWord();
        }
        else {
            this.words = DataConfig.ins.getWords();
        }
        this.ui.lblBookCount.text = "总共有 " + this.words.length + " 汉字";
        this.ui.lstBook.array = this.words;
        //this.ui.lstBook.refresh();
    };
    WordWin.prototype.onListSelect = function (index) {
    };
    WordWin.prototype.onListRender = function (item, index) {
        var data = this.words[index];
        item.name = "bookItem_" + index;
        item.lblPinYin.text = data.pinyin;
        item.lblHanZi.text = data.hanzi;
        //item.btnEdit.on(Laya.Event.CLICK,item,this.btnEditItem)
    };
    WordWin.prototype.btnEditItem = function (e) {
        var target = e.target;
        var bookIndex = this.ui.lstBook.getChildIndex(target);
    };
    return WordWin;
}(BaseWindow));
