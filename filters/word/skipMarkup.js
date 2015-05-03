/**
 * Skip German stopwords
 * 
 * @param  {string} word 
 * @return {bool}   Returns true if the word is valid/unfiltered
 */

exports.list = [
    "background-image",
    "background-color",
    "typetextjavascript",
    "cdata",
    "undefined",
    "afocus",
    "ahover",
    "border-color",
    "float",
    "rgba",
    "ease-in-out"
];

function validWord(word) {
    if(exports.list.indexOf(word) != -1) { 
        return false;
    }

    return true;
}

module.exports = {
    'validWord' : validWord,
}