import { styles } from "./../lib/yikes/view.js";
import defineCounterView from "./views/counter.view.js";
import defineAnimeView from "./views/anime.view.js";

styles.push('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css');
defineCounterView();
defineAnimeView();