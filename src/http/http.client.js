export function createHttpClient(baseUrl, fetch = window.fetch){
    const get = async (path) => {
        const response = await fetch(baseUrl+path);
        return await response.json();
    }
    return { get };
}