import "./anime.card.view.js";
import { createAnimeViewModel } from "../viewmodels/anime.viewmodel.js";
import { View, define } from "./../../lib/yikes/view.js";
import ANIME_TEMPLATE from "./../templates/anime.template.js";

export default (createViewModel = createAnimeViewModel) => {
    
    class AnimeView extends View{
        constructor(){
            super(ANIME_TEMPLATE);
            const { loadAnime, animeList, loadingError, isLoading } = createViewModel();
            const listElement = this.findView(".anime_list");
            const loadingLabel = this.findView(".loading");
            
            isLoading.observe(() => {
                loadingLabel.textContent = isLoading.get() ? "Loading..." : "";
            });
    
            loadingError.observe((error) => {
                if(error){
                    alert(loadingError.get());
                }
            });
    
            animeList.observe(() => {
                const fragment = document.createDocumentFragment();
                
                for(let anime of animeList.get()){
                    const card = document.createElement('anime-card-view');
                    card.anime.set(anime);
                    fragment.appendChild(card);
                }
    
                listElement.innerHTML = "";
                listElement.append(fragment);
            });
    
            loadAnime();
        }
    }
    
    define("anime-view", AnimeView);
}