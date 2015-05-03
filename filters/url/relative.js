/**
 * Skip relative urls
 * 
 * @param  {string} url 
 * @return {bool}   Returns true if the url is valid/unfiltered
 */
function validUrl(url) {

    // @todo dont skip "//bla.org/" style urls. Introduce modifier?
    if (url.charAt(0) == "/") {
        return false;
    }

    return true;
}

module.exports = {
    'validUrl' : validUrl
}