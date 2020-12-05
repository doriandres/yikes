import animeSettings from "./../settings/anime.settings.js";
import { createHttpClient } from "./../http/http.client.js";

export function createAnimeService(httpClient = createHttpClient(animeSettings.API_URL)){
    const getTrending = async () => {
        try{
            const animeResponse = await httpClient.get(animeSettings.TRENDING_ENDPOINT);
            return animeResponse.data;
        }catch{
            throw new Error("Could not load animes");
        }
    };

    return { getTrending };
}