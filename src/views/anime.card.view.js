import { observable } from "../../lib/yikes/observable.js";
import { View, define } from "./../../lib/yikes/view.js";
import ANIME_CARD_TEMPLATE from "./../templates/anime.card.template.js";

class AnimeCardView extends View{
    constructor(){
        super(ANIME_CARD_TEMPLATE, ['./src/styles/anime.card.style.css']);
        this.anime = observable(null);

        const cardTitle = this.findView('.anime_card_title');
        const cardImage = this.findView('.anime_card_image');
        const cardDesc = this.findView('.anime_card_desc');

        this.anime.observe(anime => {
            if(!anime) return;
            
            cardTitle.textContent = anime.attributes.titles.en;
            cardImage.src = anime.attributes.coverImage.tiny;
            cardDesc.textContent = anime.attributes.description;
        });
    }
}

define("anime-card-view", AnimeCardView);