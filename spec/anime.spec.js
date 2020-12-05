import { createAnimeService } from "./../src/services/anime.service.js";
import animeSettings from "./../src/settings/anime.settings.js";
import { createAnimeViewModel } from "./../src/viewmodels/anime.viewmodel.js";
import "./../src/views/anime.card.view.js";
import defineAnimeView from "./../src/views/anime.view.js";

describe("anime service", () => {
    let service;
    let getSpy;
    let expectedResult;
    let result;

    beforeAll(() => {
        expectedResult = [];
        getSpy = jasmine.createSpy();
        getSpy.and.resolveTo({ data: expectedResult });
        service = createAnimeService({ get: getSpy });
    });

    beforeAll(async () => result = await service.getTrending());

    it("should have called http get using settings endpoint", () => expect(getSpy).toHaveBeenCalledOnceWith(animeSettings.TRENDING_ENDPOINT));
    it("should have returned expected result", () => expect(result).toBe(expectedResult));
});


describe("anime viewmodel", () => {
    let viewModel;
    let getTrendingSpy;
    let expectedList;
    let isLoadingSpy;

    beforeAll(() => {
        expectedList = [];
        getTrendingSpy = jasmine.createSpy();
        isLoadingSpy = jasmine.createSpy();
        getTrendingSpy.and.resolveTo(expectedList);
        viewModel = createAnimeViewModel({ getTrending: getTrendingSpy });
        viewModel.isLoading.observe(isLoadingSpy);
    });

    beforeAll(() => viewModel.loadAnime());

    it("should have anime list equal to expected", () => expect(viewModel.animeList.get()).toBe(expectedList));
    it("should have changed loading 3 times", () => expect(isLoadingSpy).toHaveBeenCalledTimes(3));
    it("should not be loading", () => expect(viewModel.isLoading.get()).toBe(false));
});

describe("anime-card-view", () => {
    let animeCardView;
    let title;
    let desc;
    let img;

    beforeAll(() => {
        title = "Some title";
        desc = "Some desc";
        img = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
        animeCardView = document.createElement("anime-card-view");
    });

    beforeAll(() => animeCardView.anime.set({
        attributes: {
            titles: { en: title },
            coverImage: { tiny: img },
            description: desc
        }
    }));

    it("should display expected title", () => expect(animeCardView.findView(".anime_card_title").textContent).toBe(title));
    it("should display expected description", () => expect(animeCardView.findView(".anime_card_desc").textContent).toBe(desc));
    it("should display expected image", () => expect(animeCardView.findView(".anime_card_image").src).toBe(img));
});

describe("anime-view", () => {
    let animeList;
    let getTrendingSpy;
    let animeView;

    beforeAll(() => {
        animeList = [{
            attributes: {
                titles: { en: "title 1" },
                coverImage: { tiny: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
                description: "desc 1"
            }
        },
        {
            attributes: {
                titles: { en: "title 2" },
                coverImage: { tiny: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
                description: "desc 2"
            }
        }];
        getTrendingSpy = jasmine.createSpy();
        getTrendingSpy.and.resolveTo(animeList);
        defineAnimeView(() => createAnimeViewModel({ getTrending: getTrendingSpy }))
    })

    beforeAll(() => animeView = document.createElement("anime-view"));

    it("should have 2 elements in list", () => expect(animeView.findView(".anime_list").childElementCount).toBe(2));
    it("should have anime-card-view children", () => expect([...animeView.findView(".anime_list").children].every(n => n.localName === "anime-card-view")).toBe(true));
    it("should have anime-card-view children with anime data", () => expect([...animeView.findView(".anime_list").children].every((n, i) => n.anime.get() === animeList[i])).toBe(true));
});