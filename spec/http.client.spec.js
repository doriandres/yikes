import { createHttpClient } from "./../src/http/http.client.js";

describe("http client", () => {
    let httpClient;
    let fetchSpy;
    let jsonSpy;
    let baseUrl;
    let result;
    let expectedResult;
    let endpoint;

    beforeAll(() => {
        baseUrl = "https://someurl.com/api";
        endpoint = "/some/endpoint"
        expectedResult = {};
        
        fetchSpy = jasmine.createSpy();
        jsonSpy = jasmine.createSpy();

        httpClient = createHttpClient(baseUrl, fetchSpy);

        jsonSpy.and.resolveTo(expectedResult);
        fetchSpy.and.resolveTo({ json: jsonSpy });
    });

    beforeAll(async () => result = await httpClient.get(endpoint));

    it("should have called fetch with endpoint", () => expect(fetchSpy).toHaveBeenCalledOnceWith(baseUrl+endpoint));
    it("should have called json", () => expect(jsonSpy).toHaveBeenCalled());
    it("should have returned expected result", () => expect(result).toBe(expectedResult));
});