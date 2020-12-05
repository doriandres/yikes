import { observable } from "./../../lib/yikes/observable.js"
import { createAnimeService } from "../services/anime.service.js";

export function createAnimeViewModel(animeService = createAnimeService()){
    const animeList = observable([]);
    const loadingError = observable(null);
    const isLoading = observable(false);

    const loadAnime = async () => {
        isLoading.set(true);
        try{
            animeList.set(await animeService.getTrending())
        }catch(error){
            loadingError.set(error.message);
        }finally{
            isLoading.set(false);
        }
    };

    return { 
        animeList, 
        loadingError,
        isLoading,
        loadAnime 
    };
};