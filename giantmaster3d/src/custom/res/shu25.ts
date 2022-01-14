/***2019-05-02 andy 工具生成*/
export class base64_shu25{
	constructor(){}
	public static base64json:string="";
	public static base64img:string="data:image/jpeg;base64,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";
}