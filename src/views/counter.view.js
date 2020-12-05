import { View, define } from "./../../lib/yikes/view.js";
import { createCounterViewModel } from "./../viewmodels/counter.viewmodel.js";
import TEMPLATE from './../templates/counter.template.js';

class CounterView extends View{
    constructor(){
        super(TEMPLATE);
        const { value, increase } = createCounterViewModel();
        const paragraph = this.findView('p');
        const button = this.findView('button');

        value.observe(val => {
            paragraph.textContent = val;
        });
        
        button.addEventListener('click', increase);
    }
} 

define("counter-view", CounterView);