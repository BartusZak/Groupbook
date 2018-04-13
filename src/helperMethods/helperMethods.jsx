export const concatingUrlTitle = (url) => {
    let result = url.pathname.lastIndexOf("/");
    result = url.pathname.slice(result, url.pathname.length);
    return result;
}