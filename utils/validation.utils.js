export const isLatitude = (lat) => {
    return isFinite(lat) && Math.abs(lat) <= 90;
}

export const isLongitude = (lon) => {
    return isFinite(lon) && Math.abs(lon) <= 180;
}