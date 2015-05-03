/**
 * Skip YouTube content
 * 
 * @param  {string} url 
 * @return {bool}   Returns true if the url is valid/unfiltered
 */
function validUrl(url) {
    if(url.search('.youtube.') != -1) {
        return false;
    }

    return true;
}

module.exports = {
    'validUrl' : validUrl
}