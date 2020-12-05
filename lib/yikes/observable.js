export class Observable{
    static create(value){
        return new Observable(value);
    }

    constructor(value){
        this._observers = new Set();
        this._value = value;
    }

    set(value){
        if(value != this._value){
            this._value = value;
            this._notify();
        }
    }

    get(){
        return this._value;
    }

    _notify(){
        this._observers.forEach(observer => {
            try{
                observer(this._value);
            }catch(err){
                console.error(err);
            }
        })
    }

    observe(observer){
        this._observers.add(observer);
        observer(this._value);
        return () => this.observers.delete(observer);
    }
}

export function observable(val){
    return Observable.create(val);
}