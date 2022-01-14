/**
* name 
*/
module game.util{
	export class Dictionary<T>{
		private _strongType:T;     //要求存储对象为强类型
		private _container:Object;
		public get container():Object{
			return this._container;
		}
		
		private _length:number;
		public get length():number{
			return this._length;
		}

		constructor(){
			this._container = new Object();
			this._length = 0;
		}
		
		/**
		 * 添加元素 
		 * @param key
		 * @param value
		 * 
		 */		
		public add(key:any, value:T):T{
			//如果是新添加才增加length
			if(!this.hasKey(key))
				this._length++;
			this._container[key] = value;
			return value;
		}
		
		public forEach(func:Function):void{
			var boo:boolean;
			for (let i in this._container){
				boo = func(this._container[i]);
				if(!boo){
					return;
				}
			}
		}

		public forIn(func:Function):void{
			for (let i in this._container){
				func(i);
			}
		}

		public valueOf():T[]{
			var values:T[] = [];
			for (let i in this._container){
				values.push(this._container[i]);
			}
			return values;
		}

		/**
		 * 根据键值获取对象 
		 * @param key
		 * @return 
		 * 
		 */		
		public get(key:any):T{
			return this._container[key];
		}
		
		/**
		 * 重新设置 
		 * @param key
		 * @param value
		 * 
		 */		
		public reset(key:any, value:T):void{
			if(this.hasKey(key)){
				this._container[key] = value;
			} else {
				console.log("ObjDictionary: warning you reset a not exist key");
			}
		}
		
		/**
		 * 是否包含键 
		 * @param key
		 * @return 
		 * 
		 */		
		public hasKey(key:any):boolean{
			return this._container.hasOwnProperty(key);
		}
		
		/**
		 * 移除键 
		 * @param key
		 * 
		 */		
		public remove(key:any):T{
			if(this._container.hasOwnProperty(key)){
				let value:T = this._container[key];
				this._container[key] = null;
				delete this._container[key];
				this._length--;
				return value;
			}
			return null;
		}
		
		/**
		 *清除操作 
		 * 
		 */		
		public clear():void{
			this._length = 0;
			this._container = null;
			this._container = new Object();
		}
	}
}