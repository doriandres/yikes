export const styles = [];

export class View extends HTMLElement{
    constructor(template, viewstyles = []){
        super();
        this.view = this.attachShadow({ mode: 'open' });
        this.view.append(buildTemplate(`
        <style>
            ${[...styles,...viewstyles].map(style => `@import "${style}";`).join('\n')}
        </style>
        ${template}
        `));
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