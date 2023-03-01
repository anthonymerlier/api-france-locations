/**
 * Check if `lat` is a valid decimal degree latitude
 * @param {*} lat Latitude
 */

export const isDecimalDegreeLatitude = (lat) => {
    return isFinite(lat) && Math.abs(lat) <= 90;
}

/**
 * Check if `lon` is a valid decimal degree longitude
 * @param {*} lon Longitude
 */

export const isDecimalDegreeLongitude = (lon) => {
    return isFinite(lon) && Math.abs(lon) <= 180;
}

/**
 * Replace all possibly accentuated characters, white spaces and hyphens to match partial MongoDB search.
 ** Example: `Saône-et-Loire` => `s[a,á,à,ä,â,ã][o,ó,ö,ò,õ,ô][n,ñ][e,é,ë,è,ê][ -][e,é,ë,è,ê]t[ -]l[o,ó,ö,ò,õ,ô][i,í,ï,ì,î]r[e,é,ë,è,ê]`
 * @param {*} text Text to convert
 */

export const convertStringToRegexp = (text) => {
    let regexp = '';
    const textNormalized = text
        .normalize('NFD') // returns the Unicode Normalization Form of the string
        .replace(/[\u0300-\u036f]/g, '') // remove all accents
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') // remove all regexp reserved char
        .toLowerCase(); // transform text to lowercase

    regexp = textNormalized
        .replace(/a/g, '[a,á,à,ä,â,ã]')
        .replace(/e/g, '[e,é,ë,è,ê]')
        .replace(/i/g, '[i,í,ï,ì,î]')
        .replace(/o/g, '[o,ó,ö,ò,õ,ô]')
        .replace(/u/g, '[u,ü,ú,ù,û]')
        .replace(/c/g, '[c,ç]')
        .replace(/n/g, '[n,ñ]')
        .replace(/[ªº°]/g, '[ªº°]')
        .replace(/-|\s/g, '[ -]') // replace spaces and hyphens
    return new RegExp(regexp, 'i'); // "i" -> ignore case
};

/**
 * Check if string contains only letter.
 * @param {*} string String to check
 */

export const containsOnlyLetters = (string) => {
    const regexp = new RegExp(/^[a-zA-Z]*$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains only numbers.
 * @param {*} string String to check
 */

export const containsOnlyNumbers = (string) => {
    const regexp = new RegExp(/^[0-9]*$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains special chars except dots.
 * @param {*} string String to check
 */

export const containsSpecialChars = (string) => {
    const regexp = new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Replace all special chars except hyphens and dots
 * @param {*} string String to sanitize
 */

export const sanitize = (string) => {
    const sanitized = string.replace(/[&\/\\#,+()$~%'":_*?<>{}]/g, '')
    return sanitized
}