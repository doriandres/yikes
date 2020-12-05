import { observable } from "./../../lib/yikes/observable.js"

export function createCounterViewModel(){
    const value = observable(0);

    const increase = () => {
        const next = value.get() + 1;
        value.set(next);
    };

    return { value, increase };
}