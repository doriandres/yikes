import { View, define } from "./../../lib/yikes/view.js";
import { createCounterViewModel } from "./../viewmodels/counter.viewmodel.js";
import TEMPLATE from './../templates/counter.template.js';

export default () => {
    class CounterView extends View{
        constructor(){
            super(TEMPLATE);
            const { value, increase } = createCounterViewModel();
            const counterValue = this.findView('.counter-value');
            const button = this.findView('button');
    
            value.observe(val => {
                counterValue.textContent = val;
            });
            
            button.addEventListener('click', increase);
        }
    } 
    
    define("counter-view", CounterView);
}