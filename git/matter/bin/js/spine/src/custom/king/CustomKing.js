/*
* name;
*/
var CustomKing = /** @class */ (function () {
    function CustomKing() {
    }
    /**开箱子 */
    CustomKing.baoxiang = new BoneType("baoxiang", Define.CDN + "/spine/kaixiangzi.sk", 0);
    /**小怪物 */
    CustomKing.alien = new BoneType("alien", Define.CDN + "/spine/alien.sk", 0);
    /**飞龙 */
    CustomKing.dragon = new BoneType("dragon", Define.CDN + "/spine/dragon.sk", 0);
    CustomKing.armorgirl = new BoneType("armorgirl", Define.CDN + "/spine/armorgirl.sk", 0);
    /**绿色女孩 */
    CustomKing.greengirl = new BoneType("greengirl", Define.CDN + "/spine/greengirl.sk", 0);
    /**桔色女孩 */
    CustomKing.orangegirl = new BoneType("orangegirl", Define.CDN + "/spine/orangegirl.sk", 0);
    /**spineboy */
    CustomKing.spineboy = new BoneType("spineboy", Define.CDN + "/spine/spineboy.sk", 0);
    /**霸王龙 */
    CustomKing.raptor = new BoneType("raptor", Define.CDN + "/spine/raptor.sk", 0);
    /**坦克 */
    CustomKing.tank = new BoneType("tank", Define.CDN + "/spine/tank.sk", 0);
    CustomKing.transforms = new BoneType("transforms", Define.CDN + "/spine/transforms.sk", 0); //有问题
    /** 蔓藤伸展动画*/
    CustomKing.vine = new BoneType("vine", Define.CDN + "/spine/vine.sk", 0);
    return CustomKing;
}());
