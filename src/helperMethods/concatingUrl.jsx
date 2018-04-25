export const concatingUrl = location => {
    const lastDashIndex = location.lastIndexOf("/");
    const locationName = location.slice(lastDashIndex+1, location.length);
    return locationName;
}
        