export class View extends HTMLElement{
    constructor(template){
        super();
        this.view = this.attachShadow({ mode: 'open' });
        this.view.append(buildTemplate(template));
    }
    findView(selector){
        return this.view.querySelector(selector);
    }
}

export function define(tagname, Constructor){
    if(!customElements.get(tagname)){
        customElements.define(tagname, Constructor);
    }
}

export function buildTemplate(htmlString){
    return document.createRange().createContextualFragment(htmlString);
}