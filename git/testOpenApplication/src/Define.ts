
module CloudKey{
    export const score:string="score";
    export const upateTime:string="upateTime";
    export const keyList:string[] = [score,upateTime];
}

/*
* 云端数据;
*/
interface IUserGameData{
    openid:string;
    nickname:string;
    avatarUrl:string;
    KVDataList:any[];
}